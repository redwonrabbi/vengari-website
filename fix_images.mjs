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

async function run() {
  for (const item of downloads) {
    try {
      console.log('Downloading', item.name);
      const res = await fetch(item.url);
      const ab = await res.arrayBuffer();
      const buffer = Buffer.from(ab);
      const dest = path.join(process.cwd(), 'public', item.name);
      fs.writeFileSync(dest, buffer);
      console.log('Successfully wrote', item.name);
    } catch(e) {
      console.error(e);
    }
  }
}
run();
