import type { NextApiRequest, NextApiResponse } from 'next';
import getHandler from './GET';

export default async function getBookById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id ? req.query.id.toString() : '';
  if (!id) {
    res.status(400).json({ message: 'Missing book ID.' });
    return res;
  }
  try {
    switch (req.method) {
      case 'GET': {
        const book = await getHandler(id);
        if (!book) {
          res.status(404).json({ message: 'Book ID not found.' });
        } else {
          res.status(200).json(book);
        }
        return res;
      }

      default: {
        res.status(500).json({ message: 'Method not allowed.' });
        return res;
      }
    }
  } catch (e) {
    res.status(500).json({ message: e });
    return res;
  }
}
