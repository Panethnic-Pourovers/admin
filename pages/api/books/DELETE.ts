import prisma from '@/prisma/prisma';

export default async function deleteHandler(id?: string, body?) {
  let deleted;
  if (id) {
    try {
      deleted = await prisma.book.delete({
        where: {
          id,
        },
      });
      return deleted;
    } catch {
      return;
    }
  } else if (body) {
    const { count } = await prisma.book.deleteMany({
      where: {
        id: {
          in: body.ids,
        },
      },
    });
    return {
      message: `${count} of ${body.ids.length} books were successfully deleted.`,
    };
  }
  return {
    message: 'Error, provide a single ID or a body with a list of IDs.',
  };
}
