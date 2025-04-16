import fs from "fs";
import { templateJsx, templateMdx } from "./generatorTemplate.ts";

const path = `./src/stories/`;
const getPrams = process.argv[2];


// 폴더 읽기
// fs.readdir('./src/stories/', (err, filelist)=> {
// })

const crtDir = () => fs.mkdirSync(`${path}${getPrams}`, (err: any)=> {
    if(err) console.log("이미 폴더가 있습니다.");
    else console.log("@@@@@@ -------------file is created!!")
})
const crtFile = () => fs.writeFileSync(`${path}${getPrams}/${getPrams}.mdx`, templateMdx(getPrams), (err: any)=> {
    if(err) console.log("이미 mdx파일이 있습니다.");
    else console.log("@@@@@@ -------------file is created!!")
})
const crtFileJsx = () => fs.writeFileSync(`${path}${getPrams}/${getPrams}Mdx.jsx`, templateJsx(getPrams), (err: any)=> {
    if(err) console.log("이미 JSX파일이 있습니다.");
    else console.log("@@@@@@ -------------file is created!!")
})


// 중폭 파일 확인
if(!fs.existsSync(path+getPrams)) {
    crtDir()
    crtFileJsx()
    crtFile()
    console.log("Success to make Template! -->", path+getPrams) 
 }else {
     console.log("already folder. -->" , path+getPrams)
 }

