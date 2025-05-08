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
    fs.readdir(destination, (err, files)=> {
        if(err) {
            if(err.code === 'ENOENT') {
                console.log("기존 폴더가 존재하지 않음", err.code)
                fs.cpSync(`./shared`, destination, {recursive : true})
            }
        }else {
            console.log("✌️ 기존 shared 제거", files)
            fs.rmSync(destination, {recursive : true});
            fs.cpSync(`./shared`, destination, {recursive : true})
        }

        // 붙여넣은 폴더에서 불필요한 폴더 제거
        fs.readdirSync(componentDir).forEach(folder => {
            const fullpath = path.join(componentDir, folder);
        
            if(fs.statSync(fullpath).isDirectory() && folder !== targetPath) {
                fs.rmSync(fullpath, {recursive : true, force : true});
                console.log(`제외된 폴더 : ${fullpath}`)
            }
        });
    })

        
        
        
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
    } catch(error) {
        console.error('❌ 오류 발생:', error);
    }
}


async function updateEnvSource() {
    try {
        const result = replaceInFileSync({
            files : `./src/stories/**/*.jsx`,
            from : /import\.meta\.env\.VITE_LOCAL/g,
            to : 'import.meta.env.VITE_DEPLOY'
        })
        console.log('✅ 변경 완료:');
        result.forEach(r => console.log(` - ${r.file}`));
    }catch(error) {
        console.error('❌ 오류 발생:', error);

    }
}

/* 경로에 import의 깊이 변경 */
if(process.argv.includes('--update-imports')) {
    updateImport()
}

/* rootShared폴더를 필요한 자식 스토리에 복사 */
if(process.argv.includes('--export-shared')) {
    exportShared()
}

/* root src/stories폴더에 멀티 DOCS 배포env로 변경 */
if(process.argv.includes('--update-env')) {
    updateEnvSource();
}
