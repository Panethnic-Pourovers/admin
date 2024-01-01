import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global) throw new Error('Global object not found.');
  if (!(global as Record<string, any>).prisma) {
    (global as Record<string, any>).prisma = new PrismaClient();
  }
  prisma = (global as Record<string, any>).prisma;
}

export default prisma;
