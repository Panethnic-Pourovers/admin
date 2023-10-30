import prisma from '@/prisma/prisma';

type PostBody = {
  name: string;
};

export default async function postHandler(body: PostBody) {
  const { name } = body;
  const newRegion = await prisma.region.create({
    data: {
      name
    }
  });
  return newRegion;
}
