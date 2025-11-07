import { PrismaClient } from "./generated/prisma/client"; // correct if client folder exists

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;
