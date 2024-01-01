import prisma from '@/prisma/prisma';

export default async function getHandler(id?: string) {
  if (id) {
    return await prisma.libraryMember.findUnique({
      where: {
        id
      }
    });
  } else {
    return await prisma.libraryMember.findMany();
  }
}
