import prisma from '@/prisma/prisma';
import matchRelations from './helperFunctions';

type UpdateBody = {
  barcodeId: string;
  title: string;
  author: string;
  genres: string[];
  regions: string[];
  location: string;
};

export default async function updateHandler(id: string, body: UpdateBody) {
  const { barcodeId, title, author, genres, regions, location } = body;

  const [matchingGenres, matchingRegions, matchingLocation] =
    await matchRelations(genres, regions, location);

  // add locationId once schema changes are merged
  try {
    const updated = await prisma.book.update({
      where: {
        id,
      },
      data: {
        barcodeId,
        title,
        author,
        location: null, // change this once schema changes are merged
        genres: {
          set: [],
          connect: matchingGenres,
        },
        regions: {
          set: [],
          connect: matchingRegions,
        },
      },
      include: {
        genres: true,
        regions: true,
      },
    });
    return updated;
  } catch {
    return;
  }
}
