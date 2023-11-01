import prisma from '@/prisma/prisma';

type UpdateBody = {
  memberId: string;
  bookId: string;
};

export default async function updateHandler(body: UpdateBody) {
  const { memberId, bookId } = body;

  const checkout = await prisma.checkout.findFirstOrThrow({
    where: {
      memberId,
      bookId,
      checkinDate: {
        equals: null,
      },
    },
  });

  const transactionRes = await prisma.$transaction([
    prisma.checkout.update({
      where: {
        id: checkout.id,
      },

      data: {
        checkinDate: new Date(),
      },
    }),
    prisma.book.update({
      where: {
        barcodeId: bookId,
      },
      data: {
        checkedOut: false,
      },
    }),
  ]);

  return transactionRes;
}
