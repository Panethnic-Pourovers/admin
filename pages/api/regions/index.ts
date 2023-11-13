import type { NextApiRequest, NextApiResponse } from 'next';
import postHandler from './POST';
import getHandler from './GET';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const regions = await getHandler();
        if (!regions) {
          res.status(500).json({ message: 'Unable to retrieve genres.' });
        } else {
          res.status(200).json(regions);
        }
        return res;
      }
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
