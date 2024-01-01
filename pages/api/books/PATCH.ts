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

  const genreIds = [];
  for (const name of genres) {
    const genre = await prisma.genre.findFirst({
      where: {
        name: name
      }
    });
    if (!genre) return;
    const { id } = genre;
    genreIds.push(id);
  }
  const regionIds = [];
  for (const name of regions) {
    const region = await prisma.region.findFirst({
      where: {
        name: name
      }
    });
    if (!region) return;
    const { id } = region;
    regionIds.push(id);
  }
  const locationObj = await prisma.location.findFirst({
    where: {
      name: location
    }
  });
  if (!locationObj) return;
  const formattedGenres = genreIds.map((str) => ({ id: str }));
  const formattedRegions = regionIds.map((str) => ({ id: str }));

  try {
    const updated = await prisma.book.update({
      where: {
        id
      },
      data: {
        barcodeId,
        title,
        author,
        locationId: locationObj.id,
        genres: {
          set: [],
          connect: formattedGenres
        },
        regions: {
          set: [],
          connect: formattedRegions
        }
      },
      include: {
        genres: true,
        regions: true,
        location: true
      }
    });
    return updated;
  } catch {
    return;
  }
}
