import prisma from '@/prisma/prisma';
import { Book } from '@prisma/client';

export default async function getHandler(id?: string) {
  if (id) {
    return await prisma.book.findUnique({
      where: {
        id
      },
      include: {
        genres: true,
        regions: true,
        location: true
      }
    });
  } else {
    return await prisma.book.findMany({
      include: {
        genres: true,
        regions: true,
        location: true
      }
    });
  }
}
