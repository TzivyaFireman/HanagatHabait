import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // בדיקת חיבור - שליפת כל המוסדות מה-DB
    const institutions = await prisma.institution.findMany();
    console.log("Institutions:", institutions);
  } catch (error) {
    console.error("Error connecting to database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
