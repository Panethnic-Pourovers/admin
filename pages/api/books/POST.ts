import prisma from '@/prisma/prisma';
import { NextApiRequest } from 'next';

type Book = {
  id: string;
  barcodeId: string;
  title: string;
  author: string;
  genres: string[];
  regions: string[];
  location: string;
  members: string[];
  lastCheckedOut?: Date;
};

export default async function postHandler(req: NextApiRequest) {
  console.log(req.body);
  const { body } = req;

  const checkIfObjectIsBook = (body: any): body is Book => {
    return (
      typeof body.id === 'string' &&
      typeof body.barcodeId === 'string' &&
      typeof body.title === 'string' &&
      typeof body.author === 'string' &&
      Array.isArray(body.genres) &&
      Array.isArray(body.regions) &&
      typeof body.location === 'string' &&
      Array.isArray(body.members)
    );
  };

  if (!checkIfObjectIsBook(body)) {
    return {
      success: false,
      message:
        'Invalid book, please check the book object and resend after correcting the data',
    };
  }

  const bookToSend = body;
  if (!bookToSend.lastCheckedOut) {
    bookToSend.lastCheckedOut = new Date();
  }

  await prisma.book.create({ data: bookToSend });
  return { success: true, message: 'Book Successfully Created' };
}
