import prisma from '@/prisma/prisma';

export default async function getHandler(id?: string) {
  console.log(id);

  if (id) {
    const checkout = await prisma.checkout.findMany({
      where: {
        bookId: id,
      },
    });

    return checkout;
  }
}
