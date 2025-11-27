import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const indexPath = './dist/portfolio/index.html';

async function fixAssetPaths() {
  try {
    // index.html 읽기
    let html = await readFile(indexPath, 'utf-8');

    // asset 경로를 /portfolio/로 시작하도록 수정
    // /assets/ -> /portfolio/assets/
    // /favicon.jpg -> /portfolio/favicon.jpg (이미 base 설정으로 처리될 수 있음)
    html = html.replace(/(href|src)="\/(assets\/[^"]+)"/g, '$1="/portfolio/$2"');
    html = html.replace(/(href|src)="\/(favicon\.jpg)"/g, '$1="/portfolio/$2"');

    // 수정된 내용 저장
    await writeFile(indexPath, html, 'utf-8');
    console.log('✅ Asset paths fixed in index.html');
  } catch (error) {
    console.error('❌ Error fixing asset paths:', error);
    process.exit(1);
  }
}

fixAssetPaths();


