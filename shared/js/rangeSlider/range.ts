// import { * as type } from "./type";

import { calcProps, childProps, toolTipProps } from "./type";

// export type calcProps = {
//     value : number;
//     min : number;
//     max : number;
// }

export class RangeSlider2 {
   rootElement : Element | null
   options : {
    showValue : boolean
    step : number // 단위
    toolTip : toolTipProps
    leftProps : childProps
    rightProps : childProps;
    extensionUnit? : string // input 단위
   }

   
    constructor(
        rootElement : Element | null,
        options : {
          showValue : boolean, // input 영역 유무
          step : number, // 단위
          toolTip : toolTipProps,
          leftProps : childProps,
          rightProps : childProps,
          extensionUnit? : string, // input 단위
        }
    ){
        this.rootElement = rootElement;
        this.options = options;
        // this.options.showValue = showValue; // input 영역 유무
        // this.options.step = step; // 단위
        // this.options.toolTip = toolTip;
        // this.options.leftProps = leftProps;
        // this.options.rightProps = rightProps;
        // this.options.extensionUnit = extensionUnit || ''; // input 단위
        this.init()
    }

    init() {
        /* 선언 */
        const rootElement = this.rootElement!;
    
        const leftIo = rootElement!.querySelector(`${this.options.leftProps.id}`);

        if(leftIo == null || leftIo == undefined) {
          console.error("Error leftProps.id를 확인하세요.")
        }
        const rightIo = rootElement!.querySelector(`${this.options.rightProps.id}`);
        if(rightIo == null) {
          console.error("Error rightProps.id를 확인하세요.")
        }
        this.createElement()
        this.setValue('left')
        this.setValue('right')
    
        this.addEvent('left')
        this.addEvent('right')
    
    }

    createElement() {
        /*
          slider-wrap 생성
        */
        const createSliderWrap = document.createElement("div");
        createSliderWrap.className = 'range-slider--multi'
    
        /*
          가상 폼 생성
        */
       const vertualFormElementArray = ["track", "range", "left", "right"];
       const createVertualForm = document.createElement("div");
       createVertualForm.className = "fake-form"
       
       vertualFormElementArray.map((ele)=> {
          const crtEle = document.createElement("div");
          crtEle.className=ele
    
          if(ele === 'left' || ele === 'right'){
            crtEle.classList.add('thumb')
    
            /*
              tooltip 사용 여부
            */
            if(this.options.toolTip) {
              const createVertualTag = document.createElement("div");
              createVertualTag.className='vtt'
    
              /*
                tooltip 방향
              */
              if(this.options.toolTip.direction) {
                createVertualTag.classList.add(this.options.toolTip.direction)
              }
              /*
                tooltip 모드
              */
              if(this.options.toolTip.mode === "hover") {
                this.rootElement!.setAttribute("data-show-mode", "hover")
              }
    
              const createVertualSpan = document.createElement("span")
              createVertualSpan.className = 's'
    
              
              createVertualTag.appendChild(createVertualSpan)
              crtEle.appendChild(createVertualTag);
            }
          }
          createVertualForm.appendChild(crtEle)
       })
    
       const cloneNode = [this.rootElement!.querySelector(`${this.options.leftProps.id}`), this.rootElement!.querySelector(`${this.options.rightProps.id}`)]
       cloneNode.map((node, index)=> {
          if(node) {
            function setAttributeFunc(element:Element, key:string, value:number) {
                return element.setAttribute(key, `${value}`)
            }
            if(index == 0) {
                //left
                // node.min = this.options.leftProps.values.min;
                // node.max = this.options.leftProps.values.max;
                // node.step = this.options.step;
                // node.setAttribute('value', this.options.leftProps.values.currentValue)

                setAttributeFunc(node, "min", this.options.leftProps.values.min);
                setAttributeFunc(node, "max", this.options.leftProps.values.max);
                setAttributeFunc(node, "step", this.options.step);
                setAttributeFunc(node, "value", this.options.leftProps.values.currentValue);

              }else {
                // node.min = this.options.rightProps.values.min;
                // node.max = this.options.rightProps.values.max;
                // node.step = this.options.step;
                // node.setAttribute('value', this.options.rightProps.values.currentValue)

                setAttributeFunc(node, "min", this.options.rightProps.values.min);
                setAttributeFunc(node, "max", this.options.rightProps.values.max);
                setAttributeFunc(node, "step", this.options.step);
                setAttributeFunc(node, "value", this.options.rightProps.values.currentValue);
              }
             createSliderWrap.appendChild(node)
          }
       })
    
       // range-slider--multi 까지 생성 완료
       createSliderWrap.appendChild(createVertualForm)
    
      /*합치기*/
       this.rootElement!.appendChild(createSliderWrap)
    
    
       /*기타 옵션 대응*/
        //  showValue
        if(this.options.showValue){
          const array = ['left', 'right']
          array.map((ele)=> {
            const createShowValue = document.createElement('input');
            createShowValue.setAttribute('type', 'text');
            createShowValue.className = 'ui-textfield';
            createShowValue.id = `${ele}_value`
    
            if(ele === 'left') {
              this.rootElement!.prepend(createShowValue)
            }else {
              this.rootElement!.appendChild(createShowValue)
            }
          })
        }
        //  disabled
        // if(this.options.leftProps.disabled || this.options.rightProps.disabled) {
        //   const array = ['left', 'right']
    
        //   array.map(ele=> {
        //     const element = this.rootElement!.querySelector(`#input-${ele}`);
        //     const element2 = this.rootElement!.querySelector(`#${ele}_value`);
        //     const fakeFormThumb = this.rootElement!.querySelector(`.fake-form .${ele}`)
        //     const fakeFormRange = this.rootElement!.querySelector(".fake-form .range")

        //     function setAttributeFunc(element:Element | null, key:string, value:boolean) {
        //         return element?.setAttribute(key, `${value}`)
        //     }
    
        //     if(this.options.leftProps.disabled && this.options.rightProps.disabled) {
        //         fakeFormRange?.classList.add("disabled")
        //     }

        //     if(ele === 'left') {
        //         setAttributeFunc(element, "disabled", this.options.leftProps.disabled)
        //         setAttributeFunc(element2, "disabled", this.options.leftProps.disabled)
        //         fakeFormThumb?.classList.add(this.options.leftProps.disabled ? "disabled" : "")
        //     }else {
        //         setAttributeFunc(element, "disabled", this.options.rightProps.disabled)
        //         setAttributeFunc(element2, "disabled", this.options.rightProps.disabled)
        //         fakeFormThumb?.classList.add(this.options.rightProps.disabled ? "disabled" : "")
        //     }
    
        //   })
        // }
      }

    getCalcValue({value, min, max}:calcProps):number {
        let result = Math.floor(((value - min) / (max- min)) * max);
        return result
    }

    swicher(target) {
        let min!:number;
        let max!:number;
        let ioValue!:number;
        let percent!: number;
        let percentFake!: number;


        const ioLeft = this.rootElement!.querySelector<HTMLInputElement>(`#input-left`);
        const ioRight = this.rootElement!.querySelector<HTMLInputElement>(`#input-right`);
        

        switch(target) {
            case 'left' :
            min = this.options.leftProps.values.min;
            max = this.options.leftProps.values.max;

            ioValue = Math.min(Number(ioRight?.value), Number(ioLeft?.value));
            percent = this.getCalcValue({
                value : Number(ioLeft?.value), 
                min : min,
                max : max
            });
            percentFake = percent * (100 / max)
            
            break;
            case 'right' :
            min = this.options.rightProps.values.min;
            max = this.options.rightProps.values.max;

            ioValue = Math.max(Number(ioRight?.value), Number(ioLeft?.value));
            percent = this.getCalcValue({
                value : Number(ioRight?.value),
                min : min,
                max : max
            });
            percentFake = (max - percent) * (100 / max)

            break;
            default :
            console.log("default")
        }

        return {min, max, ioValue, percent, percentFake}

    }

    setValue(target) {
        /* 공통 */
        const ioLeft = this.rootElement!.querySelector<HTMLInputElement>(`#input-left`);
        const ioRight = this.rootElement!.querySelector<HTMLInputElement>(`#input-right`);
        
        const leftFake = this.rootElement!.querySelector<HTMLDivElement>(".fake-form > .left");
        const rightFake = this.rootElement!.querySelector<HTMLDivElement>(".fake-form > .right");
        const rangeFake = this.rootElement!.querySelector<HTMLDivElement>(".fake-form > .range")
        /* 공통 */
        
        function setAttributeFunc(element:Element | HTMLElement, key:string, value:number) {
            return element.setAttribute(key, `${value}`)
        }
        

        /* 방향별 값 삽입 */
        if(target == 'left') {
            // setAttributeFunc(ioLeft!,"value", this.swicher(target).ioValue)
          ioLeft!.value = `${this.swicher(target).ioValue}`; 
          let percent = this.swicher(target).percentFake;
    
          leftFake!.style.left = percent + '%';
          rangeFake!.style.left = percent + '%';
    
          if(this.options.toolTip) {
            let vtt = leftFake!.children[0].children[0];
            vtt.innerHTML  = `${percent}`
          }
    
        }else {
          // setAttributeFunc(ioRight!, "value", this.swicher(target).ioValue)
          ioRight!.value = `${this.swicher(target).ioValue}`
          let percentFake =this.swicher(target).percentFake
          let percent = this.swicher(target).percent;
    
          rightFake!.style.right = percentFake + '%';
          rangeFake!.style.right = percentFake + '%';
    
          if(this.options.toolTip) {
            let vtt = rightFake!.children[0].children[0];
            vtt.innerHTML = `${percent}`;
            // vtt.innerText = percent
          }
        }
          
    
        if(this.options.showValue) {
          const getShowValueLeftEle = this.rootElement!.querySelector<HTMLInputElement>("#left_value");
          const getShowValueRightEle = this.rootElement!.querySelector<HTMLInputElement>("#right_value");
    
          // extensionUnit옵션 대응
          const unit = !this.options.extensionUnit ? '' : this.options.extensionUnit
    
          getShowValueLeftEle!.value = this.swicher('left').percent + unit
          getShowValueRightEle!.value = this.swicher('right').percent + unit;
        }
    
    
      }

    addEvent(target) {
      const fakeIo = this.rootElement!.querySelector<HTMLElement>(`.fake-form .${target}`);
      const io = this.rootElement!.querySelector<HTMLInputElement>(`#input-${target}`);
  
      io!.addEventListener("input", () => {
        if(this.options.toolTip && this.options.toolTip.effect){
          fakeIo!.children[0].children[0].classList.remove("buble")
          setTimeout(()=> fakeIo!.children[0].children[0].classList.add("buble"), 10)
        }
        this.setValue(target)
      });
      io!.addEventListener("mouseover",  ()=> {
        fakeIo!.classList.add("hover");
      });
      io!.addEventListener("mouseout",  ()=> {
        fakeIo!.classList.remove("hover");
      });
      io!.addEventListener("mousedown",  ()=> {
          fakeIo!.classList.add("active");
      });
      io!.addEventListener("mouseup",  ()=> {
        if(this.options.toolTip && this.options.toolTip.effect){
          fakeIo!.children[0].children[0].classList.remove("buble")
        }
          fakeIo!.classList.remove("active");
      });
  
      io!.addEventListener("focus", ()=> {
        io!.style.zIndex="100"
        fakeIo!.style.zIndex="100"
      })
      io!.addEventListener("blur", ()=> {
        io!.style.zIndex="3"
        fakeIo!.style.zIndex="3"
      })
      
    }


}



export class Brand {
    name : string;
    since : number;
    employee : number;
    constructor(name : string, since : number, employee:number) {
        this.name = name;
        this.since = since;
        this.employee = employee;
    }
    
    // constructor(
    //     public name : string,
    //     public since : number,
    //     public employee : number
    // ){}
}

export class Samsung extends Brand {
    location : string;
    constructor(name : string, since : number, employee:number, location: string) {
        super(name, since, employee);
        
        this.location = location
    }

    // constructor(
    //     public name : string,
    //     public since : number,
    //     public employee:number,
    //     public location: string) {
    //     super(name, since, employee);
    // }

    getInfomation() {
        return `name : ${this.name}\nsince : ${this.since}, \nemployee : ${this.employee}, \nlocation : ${this.location}`
    }
}


