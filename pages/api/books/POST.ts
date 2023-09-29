import prisma from '@/prisma/prisma';
import { NextApiRequest } from 'next';

const dummyBook = {
  title: 'titleValue',
  author: 'authorValue',
  genre: 'genreValue',
  region: 'regionValue',
  regionTwo: 'regionTwoValue',
};

type Book = {
  barcodeID: string;
  title: string;
  author: string;
  genres: string[];
  regions: string[];
  location: string;
  members: string[];
};

export default async function postHandler(req: NextApiRequest) {
  console.log(req.body);
  const { body } = req;

  const isBook = (body: any): body is Book => {
    return (
      typeof body.barcodeID === 'string' &&
      typeof body.title === 'string' &&
      typeof body.author === 'string' &&
      Array.isArray(body.genres) &&
      Array.isArray(body.regions) &&
      typeof body.location === 'string' &&
      Array.isArray(body.members)
    );
  };

  if (!isBook(body)) {
    return {
      success: false,
      message:
        'Invalid book, please check the book object and resend after correcting the data',
    };
  }

  await prisma.book.create({ data: body });
  return { success: true, message: 'Book Successfully Created' };
}
