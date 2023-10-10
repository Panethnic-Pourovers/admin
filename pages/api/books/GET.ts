import prisma from '@/prisma/prisma';

export default async function getHandler() {
  const books =
    (await prisma.book.findMany({
      include: {
        genres: true,
        regions: true,
      },
    })) || {};
  console.log(books);
  return { books };
}
