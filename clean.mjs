import fs from 'fs';
try {
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('dist deleted');
  }
} catch(e) {}
try {
  if (fs.existsSync('node_modules/.vite')) {
    fs.rmSync('node_modules/.vite', { recursive: true, force: true });
    console.log('.vite deleted');
  }
} catch(e) {}
