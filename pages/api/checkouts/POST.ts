import prisma from '@/prisma/prisma';

type PostBody = {
  memberId: string;
  bookId: string;
  dueDate: string;
};

export default async function postHandler(body: PostBody) {
  const { memberId, bookId, dueDate } = body;
  const dueDateObj = new Date(dueDate);

  const transactionRes = await prisma.$transaction([
    prisma.checkout.create({
      data: {
        memberId,
        bookId,
        dueDate: dueDateObj,
        checkoutDate: new Date(),
      },
      include: {
        member: true,
      },
    }),
    prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        checkedOut: true,
        lastCheckedOut: new Date(),
      },
    }),
  ]);

  return transactionRes;
}
