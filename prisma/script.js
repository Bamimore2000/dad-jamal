// scripts/getUserByEmail.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "leforscott00@gmail.com";

  try {
    const user = await getUserByEmail(email);

    console.log("User found:", user);
  } catch (err) {
    console.error("Error fetching user:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
