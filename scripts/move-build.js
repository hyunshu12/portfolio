import { readdir, copyFile, mkdir, stat } from 'fs/promises';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');
const portfolioDir = join(distDir, 'portfolio');

async function copyRecursive(src, dest) {
  const entries = await readdir(src, { withFileTypes: true });
  await mkdir(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    // portfolio 폴더 자체는 복사하지 않음
    if (entry.name === 'portfolio') {
      continue;
    }

    if (entry.isDirectory()) {
      await copyRecursive(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  try {
    await copyRecursive(distDir, portfolioDir);
    console.log('✓ Build files moved to dist/portfolio/');
  } catch (error) {
    console.error('Error moving build files:', error);
    process.exit(1);
  }
}

main();

