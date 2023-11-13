import prisma from '@/prisma/prisma';

export default async function getHandler(id?: string) {
  if (id) {
    const checkout = await prisma.checkout.findMany({
      where: {
        bookId: id
      }
    });

    return checkout;
  }
}
