import prisma from '@/prisma/prisma';

type GetBody = {
  memberId: string;
  bookId: string;
};

// change the contents of the request body to filter by member or book,
// leave the body empty {} to get all

export default async function getHandler(body: GetBody) {
  const { memberId, bookId } = body;

  const checkout = await prisma.checkout.findMany({
    where: {
      memberId,
      bookId
    },
    include: {
      member: true,
      book: true
    }
  });

  return checkout;
}
