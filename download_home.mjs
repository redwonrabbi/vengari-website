import fs from 'fs';
import https from 'https';
import path from 'path';

const downloads = [
  { url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=1976', name: 'img1.jpg' },
  { url: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=2073', name: 'img2.jpg' },
  { url: 'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?auto=format&fit=crop&q=80&w=1974', name: 'img3.jpg' },
  { url: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=2070', name: 'img4.jpg' },
  { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=2070', name: 'img5.jpg' },
  { url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1974', name: 'img6.jpg' },
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`Failed ${url} (${res.statusCode})`));

      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', (err) => { fs.unlink(dest, () => reject(err)); });
    }).on('error', reject);
  });
};

(async () => {
  for (const item of downloads) {
    const dest = path.join(process.cwd(), 'public', item.name);
    try {
      await download(item.url, dest);
      console.log('Downloaded', item.name);
    } catch(e) {
      console.error('Failed', item.name, e);
    }
  }
})();
