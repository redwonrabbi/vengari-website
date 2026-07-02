import https from 'https';
import fs from 'fs';
import path from 'path';

const downloads = [
  {name:'bg_hero.jpg', url:'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=2070'},
  {name:'product1.jpg', url:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=1976'},
  {name:'product2.jpg', url:'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=2073'},
  {name:'product3.jpg', url:'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?auto=format&fit=crop&q=80&w=1974'},
  {name:'product4.jpg', url:'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=2070'},
  {name:'product5.jpg', url:'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=2070'},
  {name:'product6.jpg', url:'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1974'}
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of downloads) {
    const dest = path.join(process.cwd(), 'public', item.name);
    console.log('Downloading', item.name);
    await download(item.url, dest);
    console.log('Successfully wrote', item.name, 'Size:', fs.statSync(dest).size);
  }
}
run();
