import prisma from '@/prisma/prisma';

export default async function postHandler() {
  console.log('POST');
  return { message: 'POST' };
}
