import type { NextApiRequest, NextApiResponse } from 'next';
import getHandler from './GET';
import postHandler from './POST';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const books = await getHandler();
        if (!books) {
          res.status(500).json({ message: 'Something went wrong' });
        }
        res.status(200).json(books);
        return;
      }
      case 'POST': {
        const message = await postHandler(req);
        if (!message) {
          res.status(500).json({ message: 'Something went wrong' });
        } else if (message.success === false) {
          res.status(500).json({ message });
        }
        res.status(200).json(message);
      }
    }
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
