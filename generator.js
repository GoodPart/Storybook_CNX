const fs = require("fs");
const Handlebars = require("handlebars");
const readline = require("readline/promises")
const { stdin: input, stdout: output } = require('node:process');
const JsonData = require("data.json")



const templateSourceMdx = fs.readFileSync("./handlebars/templateMdx.hbs", 'utf-8');
const templateSource = fs.readFileSync("./handlebars/templateJSX.hbs", 'utf-8');

const handlebarMdx = Handlebars.compile(templateSourceMdx)
const handlebarJsx = Handlebars.compile(templateSource);

/* handlebars에 분기 처리에 사용 */
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('gt', (a, b) => a > b);
Handlebars.registerHelper('length', (arr) => (Array.isArray(arr) ? arr.length : 0));
/* handlebars에 분기 처리에 사용 */

async function getParams() {
    const rl = readline.createInterface({input, output})
    const answer = await rl.question(`\n
🚀 템플릿 생성에 필요한 컴포넌트 명을 입력하세요. :`)

    /* 템플릿 생성위치 변경시 */
    const path = `./src/stories/`;
    /* 템플릿 생성위치 변경시 */


    if(answer == "" || answer == undefined ) {
        console.log(` \n
you should write component name`),
        rl.close()
    }else {
        /*
            사용자로부터 값을 받는 다면 아래 로직 진행
        */
        let _editAnswer = answer.charAt(0).toUpperCase() + answer.slice(1);
        let comfirmAnswer = _editAnswer
        /* 기본 data 설정 */
        const data = {
            name : comfirmAnswer,
            path : path+comfirmAnswer,
            data :  [
                {
                    name : "React",
                    path : {
                        port : "6007",
                        componentLocation : "atom-input-variant--default" 
                    },
                    code : [{
                        extention : "tsx",
                        location : "storybook-react/src/stories/Atom/Input/variant/Input.tsx"
                    }]
                },
                {
                    name : "Core",
                    path : {
                        port : "6006",
                        componentLocation : "atom-input-variant--default" 
                    },
                    code : [
                        {
                            extention : "html",
                            location : "storybook-core/src/stories/Input/input.html"
                        },
                        {
                            extention : "css",
                            location : "storybook-core/src/stories/Input/input.css"
                        },
                        {
                            extention : "js",
                            location : "storybook-core/src/stories/Input/input.js"
                        }
                ]
                }
            ]
        };

        /* 파일 이름 중복 확인 */
        if(!fs.existsSync(data.path)) {
            /* 컴포넌트 폴더 생성 */
            crtDir(data)

            /* 컴포넌트 JSX파일 생성 */
            createMdx(data)

            /* 컴포넌트 MDX파일 생성 */
            crtFile(data)
            console.log(`
┌-----------------------------------------------------------------------------------┐\n
    🔥🔥🔥 Success to make Template! --> ${data.path} 🔥🔥🔥                   \n
└-----------------------------------------------------------------------------------┘\n
        `) 
            }else {
        /*
            사용자로부터 값을 받는 다면 아래 로직 진행
        */
                console.log(`
┌-----------------------------------------------------------------------------------┐\n
    🚧🚧🚧 This component already exists --> ${data.path} 🚧🚧🚧                 \n
└-----------------------------------------------------------------------------------┘\n
        `)
            }

        /* 모든 작업 진행후 readLine 종료 */
        rl.close()
    }
}

const crtDir = (data) => fs.mkdirSync(`${data.path}`, (err)=> {
    if(err) console.log("이미 폴더가 있습니다.");
    else console.log("@@@@@@ -------------file is created!!")
})
const crtFile = (data) => fs.writeFileSync(`${data.path}/${data.name}.mdx`, handlebarMdx(data), (err)=> {
    if(err) console.log("이미 mdx파일이 있습니다.");
    else console.log("@@@@@@ -------------file is created!!")
})
function createMdx(data) {
    console.log(`\n
┌-----------------------------------------------------------------------------------┐\n
👀 컴포넌트 템플릿을 생성하며, 필요한 파일이 있는지 체크 했습니다. 👀\n
✅ : 존재하는 파일\n
❌ : 존재하지 않는 파일\n
`);

    data.data.forEach(component => {
        const newDataObject = component.code.filter((codeItem, index) => {
            const filePath = `./${codeItem.location}`;
            const exits = fs.existsSync(filePath);

            if(exits) {
                console.log(` - ${exits ? '✅' : '❌'} ${codeItem.location}`);
            }else {
                console.log(` - ${exits ? '✅' : '❌'} ${codeItem.location}`);
                component.code = [];
            }
        });
        
        return ({...data.data, data : newDataObject})
    });

    console.log(`\n
└-----------------------------------------------------------------------------------┘
`)
    // 4. 템플릿 적용
    const result = handlebarJsx(data);
    fs.writeFileSync(`${data.path}/${data.name}Mdx.jsx` , result);
}

// 실행
getParams()
