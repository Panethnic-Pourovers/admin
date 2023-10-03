import type { NextApiRequest, NextApiResponse } from 'next';
import getHandler from './GET';
import deleteHandler from './DELETE';
import postHandler from './POST';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const members = await getHandler();
        if (!members) {
          res.status(500).json({ message: 'Unable to retrieve members.' });
        } else {
          res.status(200).json(members);
        }
        return res;
      }
      case 'POST': {
        const newMember = await postHandler(req.body);
        if (!newMember) {
          res.status(500).json({ message: 'Member failed to be created.' });
        }
        res.status(200).json(newMember);
        return res;
      }
      case 'DELETE': {
        const deleted = await deleteHandler();
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
  }
}
