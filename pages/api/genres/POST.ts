import prisma from '@/prisma/prisma';

type PostBody = {
  name: string;
};

export default async function postHandler(body: PostBody) {
  const { name } = body;
  const newGenre = await prisma.genre.create({
    data: {
      name,
    },
  });
  return newGenre;
}
