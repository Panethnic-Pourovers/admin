import type { NextApiRequest, NextApiResponse } from 'next';
import deleteHandler from './DELETE';
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
          res.status(500).json({ message: 'Unable to retrieve books.' });
        } else {
          res.status(200).json(books);
        }
        return res;
      }
      case 'POST': {
        const newBook = await postHandler(req.body);
        if (!newBook) {
          res.status(500).json({ message: 'Book failed to be created.' });
        }
        res.status(200).json(newBook);
        return res;
      }
      case 'DELETE': {
        const deleted = await deleteHandler(null, req.body);
        if (!deleted) {
          res.status(500).json({ message: 'Members failed to be deleted.' });
        }
        res.status(200).json(deleted);
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
