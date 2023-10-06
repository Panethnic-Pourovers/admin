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

export default async function postHandler(body: UpdateBody) {
  const { barcodeId, title, author, genres, regions, location } = body;

  const [matchingGenres, matchingRegions, matchingLocation] =
    await matchRelations(genres, regions, location);

  try {
    const newBook = await prisma.book.create({
      data: {
        barcodeId,
        title,
        author,
        lastCheckedOut: new Date(), // should this be null on create?
        locationId: matchingLocation[0],
        genres: {
          connect: matchingGenres,
        },
        regions: {
          connect: matchingRegions,
        },
      },
      include: {
        genres: true,
        regions: true,
      },
    });
    return newBook;
  } catch (e) {
    console.log(e);
  }
}
