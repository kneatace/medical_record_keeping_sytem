import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const testName = req.body.testName.replace(/\s+/g, '-');
    const dirPath = path.join(process.cwd(), 'src', 'pages', 'dashboard', 'tests', testName);

    fs.rmdirSync(dirPath, { recursive: true });

    res.status(200).json({ message: 'Test deleted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};