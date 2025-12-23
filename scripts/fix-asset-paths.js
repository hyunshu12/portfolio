import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const indexPath = './dist/portfolio/index.html';

async function fixAssetPaths() {
  try {
    // index.html 읽기
    let html = await readFile(indexPath, 'utf-8');

    // asset 경로를 /portfolio/로 시작하도록 수정
    // /assets/ -> /portfolio/assets/
    // /logo.svg -> /portfolio/logo.svg (favicon 경로 수정)
    html = html.replace(/(href|src)="\/(assets\/[^"]+)"/g, '$1="/portfolio/$2"');
    html = html.replace(/(href|src)="\/(logo\.svg)"/g, '$1="/portfolio/$2"');

    // 수정된 내용 저장
    await writeFile(indexPath, html, 'utf-8');
    console.log('✅ Asset paths fixed in index.html');
  } catch (error) {
    console.error('❌ Error fixing asset paths:', error);
    process.exit(1);
  }
}

fixAssetPaths();







