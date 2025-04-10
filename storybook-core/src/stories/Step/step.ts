type TitleProps = {
    title : string;
}
type StepProps = {
    animationDuration : number;
    steps : TitleProps[];
    numberic : boolean;
}

// type OnMethodProps = {
//     action : string;
//     event : ()=> void;
// }
export class Step {
    element : HTMLElement;
    options : StepProps;

    constructor(element:HTMLElement, options:StepProps) {
        this.element = element;
        this.options = {
            animationDuration : 1000,
            steps : options.steps,
            numberic : options.numberic,
        };

        // console.log(options.steps)
        this.init()
    }

    init() {
        console.log("init", this.element)
        this.createElement()
    }

    createElement() {
        const progressStep = this.element;
        const progressStepWrap = progressStep!.querySelector(".wrap");
        // const progressStepChild = progressStep!.querySelectorAll(".wrap ol li");

        // const elementOl = document.createElement("ol");

        // console.log(this.options.steps)

        const getStepOptionArray = this.options.steps;

        const createElementOl = document.createElement("ol");


        getStepOptionArray.forEach((stepData, index:number) => {
            const setNumberic = this.options.numberic ? index+1 : ''
            const _innerElement = `
                    <div class="symbol">
                        <p>${setNumberic}</p>
                    </div>
                    <div class="title">
                        <span>${stepData.title}</span>
                    </div>
            `;
            const _li = document.createElement("li");
            if(index == 0) {
                _li.className = `step__item first`;
            }else {
                const getRealStepLength = this.options.steps.length-1;
                if(index == getRealStepLength) {
                    _li.className = `step__item last`;
                }else {
                    _li.className = `step__item`;
                }
            }

            _li.innerHTML = _innerElement;
                
            createElementOl.append(_li);
        })

        progressStepWrap?.append(createElementOl);

        // function createStepElement(options) {


        //     const ol = document.createElement("ol");

        //     Object.values(options.steps).map((ele, index) => {
        //         const _html = `
        //             <div class="symbol">
        //                 <p>${index+1}</p>
        //             </div>
        //             <div class="title">
        //                 <span>${ele.title}</span>
        //             </div>`;

        //         const _li = document.createElement("li");
        //         if(index == 0) {
        //             _li.className = `step__item first`;
        //         }else {
        //             if(index == options.steps.length-1) {
        //                 _li.className = `step__item last`;
        //             }else {
        //                 _li.className = `step__item`;
        //             }
        //         }

        //         _li.innerHTML = _html;
                
        //         ol.append(_li);

        //     })



        //     //ol 만듬
        //     progressStepWrap.append(ol);

        // }
    }

    on(action, steps?,event?) {
        const progressStep = this.element;
        const progressStepWrap = progressStep.querySelector(".wrap");
        const progressStepChild = progressStep.querySelectorAll(".wrap ol li");

        switch(action) {
            case "next" : 
                let checkList = <any>[];
                progressStepChild.forEach((ele, index) => {
                    if (ele.classList.contains("check")) {
                        checkList.push(index);
                    } else {
                        progressStepChild[0].classList.add("check")
                    }

                    if (progressStepChild.length - 1 == index) {

                        if (checkList == '') {
                            return false;
                        }
                        const getLastCheckElement = progressStepChild[Math.max(...checkList) + 1];


                        if (getLastCheckElement.classList.contains("last")) {
                            console.log("더이상 할 수 없음")
                            return false;
                        } else {
                            getLastCheckElement.classList.add("check")

                        }

                    }
                })
                if(event) {
                    event()
                }
            break;
            
            case "prev" : 
                let checkedList = <any>[];
                progressStepChild.forEach((ele, index) => {
                    if (ele.classList.contains("check")) {
                        checkedList.push(ele);
                    } else {
                        console.log("unchecked", ele)
                    };

                    // map 끝
                    if (progressStepChild.length - 1 == index) {
                        const getLastElement = checkedList.slice(-1);

                        if (getLastElement == '') {
                            return;
                        } else {
                            getLastElement[0].classList.remove("check")
                        }
                    }

                    console.log("뒤로!!")

                })
                
                event()
            break;

            case "update" : 
            const getSteps = steps !== undefined ? steps : 1 ; 
            const checkstep = this.options.steps.length;
            const getAnimationDuration = this.options.animationDuration;
                for (let i = 0; i < getSteps; i++) {
                    setTimeout(() => {
                        progressStepChild[i].classList.add("check");
                    }, (getAnimationDuration / 10) * i)
                }
            break;

            default : console.log("default");

        }
    }
}