import prisma from '@/prisma/prisma';
import type { Book } from '@prisma/client';
import { NextApiRequest } from 'next';

type BookObject = {
  title: string;
  author: string;
  genres: string[];
  regions: string[];
  location: string;
  members: string[];
  lastCheckedOut: Date;
};

export default async function postHandler(req: NextApiRequest) {
  const { body } = req;

  const checkIfObjectIsBook = (body: any): body is BookObject => {
    return (
      typeof body.title === 'string' &&
      typeof body.author === 'string' &&
      typeof body.checkedOut === 'boolean' &&
      body.lastCheckedOut === null &&
      typeof body.location === 'string' &&
      Array.isArray(body.genres) &&
      Array.isArray(body.regions)
    );
  };

  const checkForLocation = async (location: string) => {
    const exists = await prisma.location.findMany({
      where: { name: body.location },
    });
    return exists.length > 0;
  };

  if (!checkForLocation(body.location)) {
    return {
      success: false,
      message:
        'Invalid location, please check the location and resend after correcting the data',
    };
  }
  if (!checkIfObjectIsBook(body)) {
    return {
      success: false,
      message:
        'Invalid book, please check the book object and resend after correcting the data',
    };
  }
  const { title, author, genres, regions, location } = body;

  const formattedGenres = genres.map((str) => ({ id: str }));
  const formattedRegions = regions.map((str) => ({ id: str }));
  const getLocation = await prisma.location.findFirst({
    where: { name: 'PEPO Checkin' },
  });

  const bookToSend = {
    title: title,
    author: author,
    checkedOut: false,
    lastCheckedOut: new Date(),
    location: {
      connect: {
        where: { id: getLocation.id },
      },
    },
    genres: {
      connectOrCreate: {
        where: formattedGenres,
        create: formattedGenres,
      },
    },
    regions: { connect: formattedRegions },
  };

  // create genres and regions if does not exist
  for (const genre of genres) {
    const res = await prisma.genre.findUnique({ where: { name: genre } });
    if (!res) {
      await prisma.genre.create({ data: { name: genre } });
    }
  }

  for (const region of regions) {
    const res = await prisma.region.findUnique({ where: { name: region } });
    if (!res) {
      await prisma.region.create({ data: { name: region } });
    }
  }

  await prisma.book.create({
    data: {
      title: title,
      author: author,
      checkedOut: false,
      lastCheckedOut: new Date(),
      location: {
        connectOrCreate: {
          where: {
            id: getLocation.id,
          },
          create: {
            name: location,
          },
        },
      },
      genres: {
        connect: genres.map((genreName) => ({ name: genreName })),
      },
      regions: {
        connect: regions.map((regionName) => ({ name: regionName })),
      },
    },
    include: {
      genres: true,
      regions: true,
      location: true,
    },
  });
  return { success: true, message: 'Book Successfully Created' };
}
