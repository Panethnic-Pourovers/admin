import type { NextApiRequest, NextApiResponse } from 'next';
import postHandler from './POST';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
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
