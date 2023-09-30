import prisma from '@/prisma/prisma';

export default async function deleteHandler(id: string) {
  const deletedMember = await prisma.libraryMember.delete({
    where: {
      id,
    },
  });
  return deletedMember;
}
