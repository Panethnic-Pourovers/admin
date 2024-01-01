import prisma from '@/prisma/prisma';

export default async function getHandler(id?: string) {
  if (id) {
    return await prisma.region.findUnique({
      where: {
        id
      }
    });
  } else {
    return await prisma.region.findMany();
  }
}
