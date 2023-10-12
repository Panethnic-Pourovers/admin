import type { NextApiRequest, NextApiResponse } from 'next';
import getHandler from './GET';
import postHandler from './POST';
import updateHandler from './PATCH';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const members = await getHandler(req.body);
        if (!members) {
          res.status(500).json({ message: 'Unable to retrieve members.' });
        } else {
          res.status(200).json(members);
        }
        return res;
      }
      case 'POST': {
        const newCheckout = await postHandler(req.body);
        if (!newCheckout) {
          res.status(500).json({ message: 'Checkout failed.' });
        }
        res.status(200).json(newCheckout);

        return res;
      }
      case 'PATCH': {
        const updatedCheckout = await updateHandler(req.body);
        if (!updatedCheckout) {
          res.status(500).json({ message: 'Checkout failed.' });
        }
        res.status(200).json(updatedCheckout);

        return res;
      }
      default: {
        res.status(500).json({ message: 'Method not allowed.' });
        return res;
      }
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
}
