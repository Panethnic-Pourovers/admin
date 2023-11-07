import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json({ message: 'Hello world!' });
  } catch {
    res.status(500).json({
      message:
        "We're sorry, something went wrong. Please try again in a few minutes"
    });
  }
}
