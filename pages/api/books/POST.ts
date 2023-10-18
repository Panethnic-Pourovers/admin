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
  console.log('here we are');
  const { title, author, genres, regions } = body;
  console.log(title, author);

  const formattedGenres = genres.map((str) => ({ id: str }));
  const formattedRegions = regions.map((str) => ({ id: str }));

  const bookToSend = {
    title: title,
    author: author,
    checkedOut: false,
    lastCheckedOut: null,
    locationId: '',
    genres: { connect: formattedGenres },
    regions: { connect: formattedRegions },
  };
  const getLocation = await prisma.location.findFirst({
    where: { name: 'PEPO Checkin' },
  });

  bookToSend.lastCheckedOut = new Date();
  bookToSend.locationId = getLocation.id as string;

  await prisma.book.create({
    data: bookToSend,
    include: {
      genres: true,
      regions: true,
      location: true,
    },
  });
  return { success: true, message: 'Book Successfully Created' };
}
