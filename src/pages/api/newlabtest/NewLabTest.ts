import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const labTestName = req.body.labTestName.replace(/\s+/g, '-');
    const dirPath = path.join(process.cwd(), 'src', 'pages', 'dashboard', 'lab', 'labtests', labTestName);

    fs.mkdirSync(dirPath, { recursive: true });

    fs.writeFileSync(path.join(dirPath, 'index.ts'), `export { default } from './${labTestName}';`);

    const tsxContent = `
      import React from 'react';

      const ${labTestName} = () => {
        return (
          <div>
            <h1>${labTestName}</h1>
          </div>
        );
      };

      export default ${labTestName};
    `;

    fs.writeFileSync(path.join(dirPath, `${labTestName}.tsx`), tsxContent);

    res.status(200).json({ message: 'Test created successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};