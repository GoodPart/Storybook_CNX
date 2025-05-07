import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

import { replaceInFileSync } from 'replace-in-file';
import {input} from "@inquirer/prompts"


async function exportShared() {
    const answer = await input({
        message : "Shared폴더를 복제할 폴더를 선택하세요."
    })
    const targetPath = answer
    const destination = `./storybook-${targetPath}/shared`

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const componentDir = path.join(__dirname, `./storybook-${targetPath}/shared/components/component`);
    
    // Global shared폴더 복사 후, 필요 스토리에 붙여넣기
    fs.cpSync(`./shared`, destination, {recursive : true})
    
    // 붙여넣은 폴더에서 불필요한 폴더 제거
    fs.readdirSync(componentDir).forEach(folder => {
        const fullpath = path.join(componentDir, folder);
    
        if(fs.statSync(fullpath).isDirectory() && folder !== targetPath) {
            fs.rmSync(fullpath, {recursive : true, force : true});
            console.log(`제외된 폴더 : ${fullpath}`)
        }
    });
}

async function updateImport() {
    try{
        const results = replaceInFileSync({
            files : `./storybook-react/src/stories/Atom/**/*.stories.*`,
            from: /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/shared/g, // 6단계
            to: '../../../../../shared', // 5단계
        })
        
        console.log('✅ 변경 완료:');
        results.forEach(r => console.log(` - ${r.file}`));
    }catch(error) {
        console.error('❌ 오류 발생:', error);
    }
}


if(process.argv.includes('--update-imports')) {
    updateImport()
}

if(process.argv.includes('--export-shared')) {
    exportShared()
}