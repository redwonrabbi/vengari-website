import fs from 'fs';
import path from 'path';

let content = fs.readFileSync(path.join(process.cwd(), 'src/data.ts'), 'utf8');

let imgCount = 1;
function getNextImg() {
  const img = `/img${imgCount}.jpg`;
  imgCount = imgCount === 6 ? 1 : imgCount + 1;
  return img;
}

const updatedContent = content.replace(/"https:\/\/images\.unsplash\.com\/[^"]+"/g, () => `"${getNextImg()}"`);

fs.writeFileSync(path.join(process.cwd(), 'src/data.ts'), updatedContent);
console.log('Done');
