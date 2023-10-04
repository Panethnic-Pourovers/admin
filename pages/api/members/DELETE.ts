import prisma from '@/prisma/prisma';

export default async function deleteHandler(id?: string, body?) {
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
  } else if (body) {
    const { count } = await prisma.libraryMember.deleteMany({
      where: {
        id: {
          in: body.ids,
        },
      },
    });
    return {
      message: `${count} of ${body.ids.length} members were successfully deleted.`,
    };
  }
  return {
    message: 'Error, provide a single ID or a body with a list of IDs.',
  };
}
