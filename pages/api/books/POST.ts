import prisma from '@/prisma/prisma';
import { NextApiRequest } from 'next';

export default async function postHandler(req: NextApiRequest) {
  console.log('POST');
  console.log(req.body);
  return { message: 'POST' };
}
