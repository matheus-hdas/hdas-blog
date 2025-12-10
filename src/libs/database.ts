import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { database: PrismaClient };
const database = globalForPrisma.database ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.database = database;
export default database;
