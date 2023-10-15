import prisma from '@/prisma/prisma';

type PostBody = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default async function postHandler(body: PostBody) {
  const { firstName, lastName, email, phone } = body;
  const newMember = await prisma.libraryMember.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      history: '',
    },
  });
  return newMember;
}
