import prisma from '@/prisma/prisma';

export default async function matchRelations(
  genres: string[],
  regions: string[],
  location: string
) {
  const matchingGenres = await prisma.genre.findMany({
    where: {
      name: {
        in: genres,
      },
    },
    select: {
      id: true,
    },
  });

  const matchingRegions = await prisma.region.findMany({
    where: {
      name: {
        in: regions,
      },
    },
    select: {
      id: true,
    },
  });

  const matchingLocation = await prisma.location.findFirst({
    where: {
      name: {
        equals: location,
      },
    },
    select: {
      id: true,
    },
  });

  return [matchingGenres, matchingRegions, matchingLocation];
}
