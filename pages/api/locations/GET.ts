import prisma from '@/prisma/prisma';

export default async function getHandler(id?: string) {
  if (id) {
    return await prisma.location.findUnique({
      where: {
        id
      }
    });
  } else {
    return await prisma.location.findMany();
  }
}
