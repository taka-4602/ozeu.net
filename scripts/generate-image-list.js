const fs = require('fs');
const path = require('path');

// imagesディレクトリのパス
const imagesDir = path.join(__dirname, '..', 'gallery_images');
const galleryJsPath = path.join(__dirname, '..', 'gallery.js');

// 画像ファイルの拡張子
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

// 画像タイトルのマッピング（ファイル名から推測）
const titleMapping = {
    'standing': '立っている鬱猫ちゃん',
    'nap': 'お昼寝中の鬱猫ちゃん',
    'scream': '叫ぶ鬱猫ちゃん',
    'sunglasses': 'クールな鬱猫ちゃん',
    'gao': 'がおー！',
    'good_morning': 'おはよう！',
    'lonly': '寂しい...',
    'look': '見つめる鬱猫ちゃん',
    'sleeping': 'すやすや',
    'finger_heart': 'ハート',
    'cat': '鬱猫ちゃん',
    'background': '背景',
    'text': 'テキスト',
    'urls': 'URL'
};

// imagesディレクトリから画像ファイルを読み取る
const files = fs.readdirSync(imagesDir)
    .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
    })
    .map(file => {
        const nameWithoutExt = path.basename(file, path.extname(file));
        const title = titleMapping[nameWithoutExt] || nameWithoutExt;
        return { file, title };
    });

console.log(`Found ${files.length} images:`);
files.forEach(f => console.log(`  - ${f.file} (${f.title})`));

// gallery.jsファイルを読み込む
let galleryJs = fs.readFileSync(galleryJsPath, 'utf-8');

// imageListの部分を置き換え
const imageListString = JSON.stringify(files, null, 4).replace(/"([^"]+)":/g, '$1:');
const newImageList = `const imageList = ${imageListString};`;

// 正規表現でimageListを置き換え
galleryJs = galleryJs.replace(
    /const imageList = \[[\s\S]*?\];/,
    newImageList
);

// ファイルに書き込み
fs.writeFileSync(galleryJsPath, galleryJs, 'utf-8');

console.log('✅ Gallery list updated successfully!');
console.log(`📝 Updated gallery.js with ${files.length} images`);
