import prisma from '@/prisma/prisma';
import { Region } from '@prisma/client';

export default async function getHandler(id?: string) {
  let regions: Region | Region[];
  if (id) {
    regions = await prisma.region.findUnique({
      where: {
        id,
      },
    });
  } else {
    regions = await prisma.region.findMany();
  }
  return regions;
}
