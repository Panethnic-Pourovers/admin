import type { NextApiRequest, NextApiResponse } from 'next';
import getHandler from './GET';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const locations = await getHandler();
        if (!locations) {
          res.status(500).json({ message: 'Unable to retrieve genres.' });
        } else {
          res.status(200).json(locations);
        }
        return res;
      }
    }
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
