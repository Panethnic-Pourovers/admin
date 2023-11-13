import prisma from '@/prisma/prisma';
import { Genre } from '@prisma/client';

export default async function getHandler(id?: string) {
  let genres: Genre | Genre[];
  if (id) {
    genres = await prisma.genre.findUnique({
      where: {
        id
      }
    });
  } else {
    genres = await prisma.genre.findMany();
  }
  return genres;
}
