import prisma from '@/prisma/prisma';

type UpdateBody = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default async function updateHandler(id: string, body: UpdateBody) {
  const { firstName, lastName, email, phone } = body;
  try {
    const updatedMember = await prisma.libraryMember.update({
      where: {
        id
      },
      data: {
        firstName,
        lastName,
        email,
        phone
      }
    });
    return updatedMember;
  } catch {
    return;
  }
}
