import getHandler from '@/pages/api/books/GET';
import postHandler from '@/pages/api/books/POST';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const books = await getHandler();
        if (!books) {
          res
            .status(500)
            .json({ message: 'An error ocurred when fetching books' });
        }
        res.status(200).json(books);
        break;
      }
      case 'POST': {
        const message = await postHandler(req);
        if (!message) {
          res.status(500).json({ message: 'Something went wrong' });
        } else if (message.success === false) {
          res.status(500).json({ message });
        }
        res.status(200).json(message);
        break;
      }
      default: {
        res.status(405).json({ message: 'Method not allowed' });
        break;
      }
    }
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
