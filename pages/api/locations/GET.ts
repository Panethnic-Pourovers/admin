import prisma from '@/prisma/prisma';
import { Location } from '@prisma/client';

export default async function getHandler(id?: string) {
  let locations: Location | Location[];
  if (id) {
    locations = await prisma.location.findUnique({
      where: {
        id
      }
    });
  } else {
    locations = await prisma.location.findMany();
  }
  return locations;
}
