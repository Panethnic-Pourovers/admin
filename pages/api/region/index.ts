import type { NextApiRequest, NextApiResponse } from 'next';
import postHandler from './POST';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'POST': {
        const newGenre = await postHandler(req.body);
        if (!newGenre) {
          res.status(500).json({ message: 'Genre failed to be created.' });
        }
        res.status(200).json(newGenre);
        return res;
      }
    }
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
