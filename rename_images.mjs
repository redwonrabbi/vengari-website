import fs from 'fs';
import path from 'path';

const map = {
  'hero_image.jpg': 'bg_hero.jpg',
  'img1.jpg': 'product1.jpg',
  'img2.jpg': 'product2.jpg',
  'img3.jpg': 'product3.jpg',
  'img4.jpg': 'product4.jpg',
  'img5.jpg': 'product5.jpg',
  'img6.jpg': 'product6.jpg'
};

const publicDir = path.join(process.cwd(), 'public');
for (const [oldName, newName] of Object.entries(map)) {
  if (fs.existsSync(path.join(publicDir, oldName))) {
    fs.renameSync(path.join(publicDir, oldName), path.join(publicDir, newName));
  }
}

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = content;
      for (const [oldName, newName] of Object.entries(map)) {
        updated = updated.split('/' + oldName).join('/' + newName);
      }
      if (updated !== content) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log('Updated ' + fullPath);
      }
    }
  }
}

replaceInDir(path.join(process.cwd(), 'src'));
