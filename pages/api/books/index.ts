export default async function handler(req: unknown, res: Record<string, any>) {
  try {
    console.log('req', req);
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
