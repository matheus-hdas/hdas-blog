/* eslint-disable @typescript-eslint/no-require-imports */

const { spawn } = require("node:child_process");

let servicesProcess;
let nextProcess;

process.env.NODE_ENV = "development";

require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env.development"),
});

const runCommand = (command, args, callback) => {
  const process = spawn(command, args, { stdio: "inherit", shell: true });

  process.on("close", (code) => {
    callback(code);
  });
};

const stopServices = () => {
  if (servicesProcess) {
    servicesProcess.kill();
  }
  runCommand("pnpm", ["run", "services:down"], () => {
    console.log("Services stopped.");
    process.exit();
  });
};

const runDev = () => {
  servicesProcess = runCommand("pnpm", ["run", "services:up"], (code) => {
    if (code !== 0) return;

    runCommand("pnpm", ["run", "db:migrate"], (code) => {
      if (code !== 0) return;

      nextProcess = runCommand("next", ["dev"], () => {
        stopServices();
      });

      process.on("SIGINT", () => {
        console.log("\nStopping services...");
        if (nextProcess) {
          nextProcess.kill();
        }
      });
    });
  });
};

runDev();
