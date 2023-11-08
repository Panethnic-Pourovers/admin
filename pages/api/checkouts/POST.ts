import prisma from "@/prisma/prisma";

type PostBody = {
  memberId: string;
  bookId: string;
  dueDate: string;
};

export default async function postHandler(body: PostBody) {
  const { memberId, bookId, dueDate } = body;
  const dueDateObj = new Date(dueDate);
  const member = await prisma.libraryMember.findUnique({
    where: {
      id: memberId,
    },
  });

  if (!member) {
    return "memberNotFound";
  }

  let location = await prisma.location.findUnique({
    where: {
      name: "Checked Out",
    },
  });
  if (!location) {
    location = await prisma.location.create({
      data: { name: "Checked Out" },
    });
  }

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
        barcodeId: bookId,
      },
      data: {
        checkedOut: true,
        lastCheckedOut: new Date(),
        libraryMemberId: memberId,
        locationId: location.id,
      },
    }),
  ]);

  return transactionRes;
}
