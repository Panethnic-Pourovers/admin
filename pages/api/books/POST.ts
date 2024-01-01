import prisma from '@/prisma/prisma';
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
      where: { name: body.location }
    });
    return exists.length > 0;
  };

  const generateBarcode = async () => {
    // generates 5-digit barcodes from 00000-99999
    // increments barcode of last created book
    const padWithZeros = (number: number) => {
      let strNumber = number.toString();
      while (strNumber.length < 5) {
        strNumber = '0' + strNumber;
      }
      return strNumber;
    };

    const latestObject = await prisma.book.findFirst({
      orderBy: { dateCreated: 'desc' }
    });
    if (!latestObject) {
      console.log('barcode 0');
      return '00000';
    }
    return padWithZeros(parseInt(latestObject.barcodeId) + 1);
  };

  if (!checkForLocation(body.location)) {
    return {
      success: false,
      message:
        'Invalid location, please check the location and resend after correcting the data'
    };
  }
  if (!checkIfObjectIsBook(body)) {
    return {
      success: false,
      message:
        'Invalid book, please check the book object and resend after correcting the data'
    };
  }
  const { title, author, genres, regions, location } = body;
  let getLocation = await prisma.location.findFirst({
    where: { name: 'PEPO Checkin' }
  });
  if (!getLocation) {
    getLocation = await prisma.location.create({
      data: { name: 'PEPO Checkin' }
    });
  }

  // create genres and regions if they do not exist
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

  const bookToSend = {
    title: title,
    barcodeId: await generateBarcode(),
    author: author,
    checkedOut: false,
    lastCheckedOut: new Date(),
    location: {
      connectOrCreate: {
        where: {
          id: getLocation.id
        },
        create: {
          name: location
        }
      }
    },
    genres: {
      connect: genres.map((genreName) => ({ name: genreName }))
    },
    regions: {
      connect: regions.map((regionName) => ({ name: regionName }))
    }
  };

  console.log('after book to send ');

  const res = await prisma.book.create({
    data: bookToSend,
    include: {
      genres: true,
      regions: true,
      location: true
    }
  });

  console.log('book created??');
  return res;
}
