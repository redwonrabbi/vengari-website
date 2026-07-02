import fs from 'fs';
import https from 'https';
import path from 'path';

const url = 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=2070';
const dest = path.join(process.cwd(), 'public', 'hero_image.jpg');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }

      const file = fs.createWriteStream(dest);
      res.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

download(url, dest)
  .then(() => console.log('Downloaded successfully'))
  .catch((err) => console.error('Download failed:', err));
