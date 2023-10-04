import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/prisma';

export default async function getBookById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // test
  const { id } = req.query;
  const book = await prisma.book.findUnique({
    where: {
      id: String(id),
    },
  });
  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  res.status(200).json(book);
}
