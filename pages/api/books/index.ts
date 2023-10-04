import type { NextApiRequest, NextApiResponse } from 'next';
import getHandler from './GET';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const books = await getHandler();
      if (!books) {
        res.status(500).json({ message: 'Something went wrong' });
      }
      res.status(200).json(books);
      return;
    }
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
