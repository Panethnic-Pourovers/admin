import type { NextApiRequest, NextApiResponse } from 'next';
import getHandler from './GET';
import deleteHandler from './DELETE';
import postHandler from './POST';
import updateHandler from './UPDATE';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        if (!req.query.id) {
          const members = await getHandler();
          if (!members) {
            res.status(500).json({ message: 'Unable to retrieve members.' });
          } else {
            res.status(200).json(members);
          }
          return res;
        } else {
          const member = await getHandler(req.query.id.toString());
          if (!member) {
            res.status(404).json({ message: 'Member ID not found.' });
          } else {
            res.status(200).json(member);
          }
          return res;
        }
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
        const deletedMember = await deleteHandler(req.query.id.toString());
        if (!deletedMember) {
          res
            .status(404)
            .json({ message: 'Member ID not found, delete failed.' });
        } else {
          res.status(200).json(deletedMember);
        }
        return res;
      }
      case 'PATCH': {
        const updatedMember = await updateHandler(req.body);
        if (!updatedMember) {
          res.status(500).json({ message: 'Failed to update member.' });
        } else {
          res.status(200).json(updatedMember);
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
  }
}
