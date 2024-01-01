import type { NextApiRequest, NextApiResponse } from 'next';
import deleteHandler from './DELETE';
import getHandler from './GET';
import updateHandler from './PATCH';

export default async function getBookById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id ? req.query.id.toString() : '';
  if (id === '') res.status(500).json({ message: 'Missing ID.' });
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
      case 'DELETE': {
        const deletedBook = await deleteHandler(id);
        if (!deletedBook) {
          res
            .status(404)
            .json({ message: 'Book ID not found, delete failed.' });
        } else {
          res.status(200).json(deletedBook);
        }
        return res;
      }
      case 'PATCH': {
        const updatedBook = await updateHandler(id, req.body);
        if (!updatedBook) {
          res.status(500).json({ message: 'Book ID not found, patch failed.' });
        } else {
          res.status(200).json(updatedBook);
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
