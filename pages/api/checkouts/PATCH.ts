import prisma from "@/prisma/prisma";

type UpdateBody = {
  bookId: string;
};

export default async function updateHandler(body: UpdateBody) {
  const { bookId } = body;

  const checkout = await prisma.checkout.findFirstOrThrow({
    where: {
      bookId,
      checkinDate: {
        equals: null,
      },
    },
  });
  try {
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
          libraryMemberId: null,
        },
      }),
    ]);

    return transactionRes;
  } catch (e) {
    console.log(e);
  }
}
