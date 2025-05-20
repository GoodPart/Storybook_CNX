const fs = require("fs");
const Handlebars = require("handlebars");
const readline = require("readline/promises")
const inquirer = require("inquirer");
const { stdin: input, stdout: output } = require('node:process');


const templateSourceMdx = fs.readFileSync("./handlebars/templateMdx.hbs", 'utf-8');
const templateSource = fs.readFileSync("./handlebars/templateJSX.hbs", 'utf-8');

const handlebarMdx = Handlebars.compile(templateSourceMdx)
const handlebarJsx = Handlebars.compile(templateSource);

/* handlebars에 분기 처리에 사용 */
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('gt', (a, b) => a > b);
Handlebars.registerHelper('length', (arr) => (Array.isArray(arr) ? arr.length : 0));
/* handlebars에 분기 처리에 사용 */


const questions1 = [
    {
        type: 'list',
        name: 'item',
        message: '형태를 골라주세요:',
        choices: ['Atom', 'Molecule', 'Page']
    }
];

const questions2 = [
    {
        type: 'input',
        name: 'item',
        message: 'variant를 모두 골라주세요:',
        choices: ['default', 'primary', 'warring', 'disabled',]
    }
];

async function run() {
    const answer1 = await inquirer.default.prompt(questions1)
    console.log(`${answer1.item}을 선택했습니다.`)

    let answer2 = await inquirer.default.prompt(questions2)
    let newAnswer2 = answer2.item.trim().split(/\s+/);
    console.log(`${newAnswer2}을 선택했습니다.`)

    await getParams(answer1.item, newAnswer2)
}
run()





async function getParams(type, variant) {
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
            variants : variant,
            data :  [
                {
                    name : "REACT",
                    path : {
                        port : "6007",
                        componentLocation : `${type.toLocaleLowerCase()}-${answer}-variant` 
                    },
                    code : [{
                        extention : "tsx",
                        // location : `storybook-react/src/stories/${type}/${comfirmAnswer}/variant/${comfirmAnswer}.tsx`
                        location : `shared/components/component/react/${type}/${comfirmAnswer}/${comfirmAnswer}.tsx`
                    }],
                },
                {
                    name : "CORE",
                    path : {
                        port : "6006",
                        componentLocation : `${type.toLocaleLowerCase()}-${answer}-variant` 
                    },
                    code : [
                        {
                            extention : "html",
                            location : `storybook-core/src/stories/${comfirmAnswer}/${answer}.html`
                        },
                        {
                            extention : "css",
                            location : `storybook-core/src/stories/${comfirmAnswer}/${answer}.css`
                        },
                        {
                            extention : "js",
                            location : `storybook-core/src/stories/${comfirmAnswer}/${answer}.js`
                        }
                ]
                },
                {
                    name : "VUE",
                    path : {
                        port : "6005",
                        componentLocation : `${type.toLocaleLowerCase()}-${answer}-variant` 
                    },
                    code : [{
                        extention : "vue",
                        // location : `storybook-vue/src/stories/${type}/${comfirmAnswer}/variant/${comfirmAnswer}.vue`
                        location : `shared/components/component/vue/${type}/${comfirmAnswer}/${comfirmAnswer}.vue`
                    }],
                },
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
// getParams()

