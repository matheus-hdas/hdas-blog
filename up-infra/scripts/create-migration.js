/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */

const { execSync } = require("child_process");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env.development"),
});

function run(cmd) {
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    console.error(`Erro ao executar: ${cmd}`);
    process.exit(1);
  }
}

run("pnpm services:up");
run("npx prisma migrate dev --create-only");
run("pnpm services:down");
