import prisma from '@/prisma/prisma';

export default async function deleteHandler(id?: string) {
  let deletedMember;
  if (id) {
    try {
      deletedMember = await prisma.libraryMember.delete({
        where: {
          id,
        },
      });
      return deletedMember;
    } catch {
      return;
    }
  } else {
    await prisma.libraryMember.deleteMany({});
    return { message: 'All members were successfully deleted.' };
  }
}
