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

  await prisma.book.create({ data: req.body });
  return { message: 'POST' };
}
