import prisma from '@/prisma/prisma';

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

  const formattedGenres = genres.map((str) => ({ id: str }));
  const formattedRegions = regions.map((str) => ({ id: str }));

  try {
    const newBook = await prisma.book.create({
      data: {
        barcodeId,
        title,
        author,
        lastCheckedOut: new Date(), // should this be null on create?
        locationId: location,
        genres: {
          connect: formattedGenres,
        },
        regions: {
          connect: formattedRegions,
        },
      },
      include: {
        genres: true,
        regions: true,
        location: true,
      },
    });
    return newBook;
  } catch (e) {
    return e.message;
  }
}
