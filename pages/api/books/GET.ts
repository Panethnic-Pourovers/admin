import prisma from '@/prisma/prisma';
import { Book } from '@prisma/client';

export default async function getHandler(id?: string) {
  let books: Book | Book[];
  if (id) {
    books = await prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        genres: true,
        regions: true,
      },
    });
  } else {
    books = await prisma.book.findMany({
      include: {
        genres: true,
        regions: true,
      },
    });
  }
  return books;
}
