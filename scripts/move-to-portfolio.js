import { mkdir, readdir, stat, rename } from 'fs/promises';
import { join } from 'path';

const distDir = './dist';
const portfolioDir = './dist/portfolio';

async function moveToPortfolio() {
  try {
    // portfolio 디렉토리 생성
    await mkdir(portfolioDir, { recursive: true });

    // dist 디렉토리의 모든 항목 읽기
    const items = await readdir(distDir);

    for (const item of items) {
      // portfolio 디렉토리 자체는 건너뛰기
      if (item === 'portfolio') continue;

      const sourcePath = join(distDir, item);
      const destPath = join(portfolioDir, item);

      const stats = await stat(sourcePath);
      
      // 파일 또는 디렉토리 이동
      await rename(sourcePath, destPath);
      console.log(`Moved: ${item} -> portfolio/${item}`);
    }

    console.log('✅ Build files moved to dist/portfolio/');
  } catch (error) {
    console.error('❌ Error moving files:', error);
    process.exit(1);
  }
}

moveToPortfolio();


