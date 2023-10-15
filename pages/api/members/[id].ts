import deleteHandler from '@/pages/api/members/DELETE';
import getHandler from '@/pages/api/members/GET';
import updateHandler from '@/pages/api/members/PATCH';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getBookById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id.toString();
  try {
    switch (req.method) {
      case 'GET': {
        const member = await getHandler(id);
        if (!member) {
          res.status(404).json({ message: 'Member ID not found.' });
        } else {
          res.status(200).json(member);
        }
        return res;
      }
      case 'DELETE': {
        const deletedMember = await deleteHandler(id);
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
        const updatedMember = await updateHandler(id, req.body);
        if (!updatedMember) {
          res
            .status(500)
            .json({ message: 'Member ID not found, patch failed.' });
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
