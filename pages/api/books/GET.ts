import prisma from '@/prisma/prisma';

export default async function getHandler() {
  const books = await prisma.book.findMany();
  const schema = Object.keys(books[0]);
  return { books, schema };
}
