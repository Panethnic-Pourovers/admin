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
        const genres = await getHandler();
        if (!genres) {
          res.status(500).json({ message: 'Unable to retrieve genres.' });
        } else {
          res.status(200).json(genres);
        }
        return res;
      }
      case 'POST': {
        const newRegion = await postHandler(req.body);
        if (!newRegion) {
          res.status(500).json({ message: 'Region failed to be created.' });
        }
        res.status(200).json(newRegion);
        return res;
      }
    }
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
