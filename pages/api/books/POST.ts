import prisma from '@/prisma/prisma';
import matchRelations from './helperFunctions';

type UpdateBody = {
  barcodeId: string;
  title: string;
  author: string;
  genres: string[];
  regions: string[];
};

export default async function postHandler(body: UpdateBody) {
  const { barcodeId, title, author, genres, regions } = body;

  const [matchingGenres, matchingRegions] = await matchRelations(
    genres,
    regions
  );

  try {
    const newBook = await prisma.book.create({
      data: {
        barcodeId,
        title,
        author,
        location: '',
        lastCheckedOut: new Date(), // should this be null on create?
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
