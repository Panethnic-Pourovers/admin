import prisma from '@/prisma/prisma';

type UpdateBody = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
export default async function updateHandler(body: UpdateBody) {
  const { id, firstName, lastName, email, phone } = body;
  const updatedMember = await prisma.libraryMember.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      email,
      phone,
    },
  });
  return updatedMember;
}
