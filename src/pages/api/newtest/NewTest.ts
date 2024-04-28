import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const testName = req.body.testName.replace(/\s+/g, '-');
    const dirPath = path.join(process.cwd(), 'src', 'pages', 'dashboard', 'tests', testName);

    fs.mkdirSync(dirPath, { recursive: true });

    fs.writeFileSync(path.join(dirPath, 'index.ts'), `export { default } from './${testName}';`);

    const tsxContent = `
      import React from 'react';

      const ${testName} = () => {
        return (
          <div>
            <h1>${testName}</h1>
          </div>
        );
      };

      export default ${testName};
    `;

    fs.writeFileSync(path.join(dirPath, `${testName}.tsx`), tsxContent);

    res.status(200).json({ message: 'Test created successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};