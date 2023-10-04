import prisma from '@/prisma/prisma';
import { LibraryMember } from '@prisma/client';

export default async function getHandler(id?: string) {
  let members: LibraryMember | LibraryMember[];
  if (id) {
    members = await prisma.libraryMember.findUnique({
      where: {
        id,
      },
    });
  } else {
    members = await prisma.libraryMember.findMany();
  }
  return members;
}
