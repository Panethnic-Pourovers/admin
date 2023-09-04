export default async function handler(req: unknown, res: Record<string, any>) {
  try {
    console.log('req', req);
    res.status(200).json({ message: 'Hello world!' });
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
