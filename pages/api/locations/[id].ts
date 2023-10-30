import prisma from '@/prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getBookById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // test
  const { id } = req.query;
  const location = await prisma.location.findUnique({
    where: {
      id: String(id)
    }
  });
  if (!location) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  res.status(200).json(location);
}
