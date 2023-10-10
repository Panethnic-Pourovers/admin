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

  const bookToSend = {
    title: body.title,
    author: body.author,
    checkedOut: false,
    lastCheckedOut: null,
    locationId: '',
    libraryMemberId: null,
    // genres: [],
    // regions: [],
  };
  const getLocation = await prisma.location.findFirst({
    where: { name: 'PEPO Checkin' },
  });
  const getGenres = await Promise.all(
    body.genres.map((genre) => {
      return prisma.genre.findFirst({ where: { name: genre } });
    })
  );
  const getRegions = await Promise.all(
    body.regions.map((regions) => {
      return prisma.region.findFirst({ where: { name: regions } });
    })
  );

  if (!getLocation || !getGenres || !getRegions) {
    return {
      success: false,
      message:
        'Invalid book, please check the book object and resend after correcting the data',
    };
  }

  bookToSend.lastCheckedOut = new Date();
  bookToSend.locationId = getLocation.id as Book['locationId'];
  // bookToSend.genres = getGenres[0] === null ? [] : getGenres;
  // bookToSend.regions = getRegions[0] === null ? [] : getRegions;

  await prisma.book.create({ data: bookToSend });
  return { success: true, message: 'Book Successfully Created' };
}
