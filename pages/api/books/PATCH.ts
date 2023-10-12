import prisma from '@/prisma/prisma';

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

  const formattedGenres = genres.map((str) => ({ id: str }));
  const formattedRegions = regions.map((str) => ({ id: str }));

  try {
    const updated = await prisma.book.update({
      where: {
        id,
      },
      data: {
        barcodeId,
        title,
        author,
        locationId: location,
        genres: {
          set: [],
          connect: formattedGenres,
        },
        regions: {
          set: [],
          connect: formattedRegions,
        },
      },
      include: {
        genres: true,
        regions: true,
        location: true,
      },
    });
    return updated;
  } catch {
    return;
  }
}
