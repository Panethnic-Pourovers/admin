import prisma from '@/prisma/prisma';

export default function getHandler() {
  return prisma.book.findMany() || false;
}
