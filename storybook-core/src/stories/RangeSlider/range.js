class RangeSlider {
  constructor(rootElement,{showValue,step, toolTip,extensionUnit,leftProps, rightProps, themeOptions}) {
    this.rootElement = rootElement;
    this.extensionUnit = extensionUnit; // input 단위
    this.showValue = showValue; // input 영역 유무
    this.toolTip = toolTip;
    this.step = step, // 단위
    this.leftProps = {
      id : leftProps.id,
      disabled : leftProps.disabled, // 사용성 유무
      values : {
        min : leftProps.values.min, // 최소값
        max : leftProps.values.max, // 최대값
        currentValue : leftProps.values.currentValue // 현재 값
      },
    };
    this.rightProps = {
      id : rightProps.id,
      disabled : rightProps.disabled, // 사용성 유무
      values : {
        min : rightProps.values.min, // 최소값
        max : rightProps.values.max, // 최대값
        currentValue : rightProps.values.currentValue // 현재 값
      }
    };

    this.init()
  }





  
  init() {
    /* 선언 */
    const rootElement = this.rootElement;

    const leftIo = rootElement.querySelector(`${this.leftProps.id}`);
    if(leftIo == null || leftIo == undefined) {
      console.error("Error leftProps.id를 확인하세요.")
    }
    const rightIo = rootElement.querySelector(`${this.rightProps.id}`);
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
        if(this.toolTip) {
          const createVertualTag = document.createElement("div");
          createVertualTag.className='vtt'

          /*
            tooltip 방향
          */
          if(this.toolTip.direction) {
            createVertualTag.classList.add(this.toolTip.direction)
          }
          /*
            tooltip 모드
          */
          if(this.toolTip.mode === "hover") {
            this.rootElement.setAttribute("data-show-mode", "hover")
          }

          const createVertualSpan = document.createElement("span")
          createVertualSpan.className = 's'

          
          createVertualTag.appendChild(createVertualSpan)
          crtEle.appendChild(createVertualTag);
        }
      }
      createVertualForm.appendChild(crtEle)
   })

   const cloneNode = [this.rootElement.querySelector(`${this.leftProps.id}`), this.rootElement.querySelector(`${this.rightProps.id}`)]
   cloneNode.map((node, index)=> {
      if(index == 0) {
        //left
        node.min = this.leftProps.values.min;
        node.max = this.leftProps.values.max;
        node.step = this.step;
        node.setAttribute('value', this.leftProps.values.currentValue)
      }else {
        node.min = this.rightProps.values.min;
        node.max = this.rightProps.values.max;
        node.step = this.step;
        node.setAttribute('value', this.rightProps.values.currentValue)
      }
     createSliderWrap.appendChild(node)
   })

   // range-slider--multi 까지 생성 완료
   createSliderWrap.appendChild(createVertualForm)

  /*합치기*/
   this.rootElement.appendChild(createSliderWrap)


   /*기타 옵션 대응*/
    //  showValue
    if(this.showValue){
      const array = ['left', 'right']
      array.map((ele)=> {
        const createShowValue = document.createElement('input');
        createShowValue.setAttribute('type', 'text');
        createShowValue.className = 'ui-textfield';
        createShowValue.id = `${ele}_value`

        if(ele === 'left') {
          this.rootElement.prepend(createShowValue)
        }else {
          this.rootElement.appendChild(createShowValue)
        }
      })
    }
    //  disabled
    if(this.leftProps.disabled || this.rightProps.disabled) {
      const array = ['left', 'right']

      array.map(ele=> {
        const element = this.rootElement.querySelector(`#input-${ele}`);
        const element2 = this.rootElement.querySelector(`#${ele}_value`);
        const fakeFormThumb = this.rootElement.querySelector(`.fake-form .${ele}`)
        const fakeFormRange = this.rootElement.querySelector(".fake-form .range")

        if(this.leftProps.disabled && this.rightProps.disabled) {
          fakeFormRange.classList.add("disabled")
        }
        if(ele === 'left') {
          element.disabled = this.leftProps.disabled
          element2.disabled = this.leftProps.disabled
          fakeFormThumb.classList.add(this.leftProps.disabled && "disabled")
        }else {
          element.disabled = this.rightProps.disabled
          element2.disabled = this.rightProps.disabled
          fakeFormThumb.classList.add(this.rightProps.disabled && "disabled")
        }

      })

      
      
    }

    // themeOption


    

  }

  getCalcValue(value, min, max) {
    let result = Math.floor(((value - min) / (max- min)) * max);
    return result
  }

  swicher(target) {
    let min;
    let max;
    let ioValue;
    let percent
    let percentFake;


    const ioLeft = this.rootElement.querySelector(`#input-left`);
    const ioRight = this.rootElement.querySelector(`#input-right`);
    

    switch(target) {
      case 'left' :
        min = this.leftProps.values.min;
        max = this.leftProps.values.max;

        ioValue = Math.min(ioRight.value, ioLeft.value);
        percent = this.getCalcValue(ioLeft.value, min, max);
        percentFake = percent * (100 / max)
      
        break;
      case 'right' :
        min = this.rightProps.values.min;
        max = this.rightProps.values.max;

        ioValue = Math.max(ioRight.value, ioLeft.value);
        percent = this.getCalcValue(ioRight.value, min, max);
        percentFake = (max - percent) * (100 / max)

        break;
        default :
        console.log("default")
    }

    return {min, max, ioValue, percent, percentFake}

  }

  setValue(target) {
    /* 공통 */
    const ioLeft = this.rootElement.querySelector(`#input-left`);
    const ioRight = this.rootElement.querySelector(`#input-right`);
    
    const leftFake = this.rootElement.querySelector(".fake-form > .left");
    const rightFake = this.rootElement.querySelector(".fake-form > .right");
    const rangeFake = this.rootElement.querySelector(".fake-form > .range")
    /* 공통 */

    /* 방향별 값 삽입 */
    if(target == 'left') {
      ioLeft.value = this.swicher(target).ioValue; 
      let percent = this.swicher(target).percentFake;

      leftFake.style.left = percent + '%';
      rangeFake.style.left = percent + '%';

      if(this.toolTip) {
        let vtt = leftFake.children[0].children[0];
        vtt.innerText = percent
      }

    }else {
      ioRight.value = this.swicher(target).ioValue;
      let percentFake =this.swicher(target).percentFake
      let percent = this.swicher(target).percent;

      rightFake.style.right = percentFake + '%';
      rangeFake.style.right = percentFake + '%';

      if(this.toolTip) {
        let vtt = rightFake.children[0].children[0];
        vtt.innerText = percent
      }
    }
      

    if(this.showValue) {
      const getShowValueLeftEle = this.rootElement.querySelector("#left_value");
      const getShowValueRightEle = this.rootElement.querySelector("#right_value");

      // extensionUnit옵션 대응
      const unit = !this.extensionUnit ? '' : this.extensionUnit

      getShowValueLeftEle.value = this.swicher('left').percent + unit
      getShowValueRightEle.value = this.swicher('right').percent + unit;
    }


  }

  getValue(target) {
    return this.swicher(target).percent;
  }

  onChange(target,e) {
    const io = this.rootElement.querySelector(`#input-${target}`);

    io.addEventListener("input", (_e)=> {
      e({
        target : _e.target,
        value : _e.target.value
      })
    })
    

  }

  addEvent(target) {
    const fakeIo = this.rootElement.querySelector(`.fake-form .${target}`);
    const io = this.rootElement.querySelector(`#input-${target}`);

    io.addEventListener("input", () => {
      if(this.toolTip && this.toolTip.effect){
        fakeIo.children[0].children[0].classList.remove("buble")
        setTimeout(()=> fakeIo.children[0].children[0].classList.add("buble"), 10)
      }
      this.setValue(target)
    });
    io.addEventListener("mouseover",  ()=> {
      fakeIo.classList.add("hover");
    });
    io.addEventListener("mouseout",  ()=> {
      fakeIo.classList.remove("hover");
    });
    io.addEventListener("mousedown",  ()=> {
        fakeIo.classList.add("active");
    });
    io.addEventListener("mouseup",  ()=> {
      if(this.toolTip && this.toolTip.effect){
        fakeIo.children[0].children[0].classList.remove("buble")
      }
        fakeIo.classList.remove("active");
    });

    io.addEventListener("focus", ()=> {
      io.style.zIndex="100"
      fakeIo.style.zIndex="100"
    })
    io.addEventListener("blur", ()=> {
      io.style.zIndex="3"
      fakeIo.style.zIndex="3"
    })
    
  }
  
}


// effect 코드
// class Pacinco {
//   constructor(name, options) {
//       this.name = name;
//       this.options = options;
//       this.storage = [];
//       this.baStorage = {
//           id : '',
//           before : 0,
//           after : 0
//       }
//   };

//   getNumberLength(ele) {
//       let getObj = [];
//       Object.values(ele).map((target, index)=> {
//           const tTxt = target.innerText;
//           const tLength = tTxt.length;

//           getObj = [
//               ...getObj,
//               {
//                   txt : tTxt,
//                   length : tLength
//               }
//           ]

//       })


//       return getObj
//   };

//   getNumb(num) {
//       let data = String(num);

//       return [...data]
//   }

//   crtHTML(name, number) {
//       const targets = document.querySelectorAll(name);
//       const getNL = this.getNumberLength(targets);

//       // ul 만들기
//       getNL.map((NL, index) => {
//           targets[index].id = `pRoot-${index}`
//           const crtUl = document.createElement("ul")

//           // 초기 li 삽입
//           for(let a = 0; a<NL.length; a++) {
//               const crtLi = document.createElement("li");
//               const liTemp = `
//                   <span>0</span>
//                   <span>1</span>
//                   <span>2</span>
//                   <span>3</span>
//                   <span>4</span>
//                   <span>5</span>
//                   <span>6</span>
//                   <span>7</span>
//                   <span>8</span>
//                   <span>9</span>
//               `;
//               crtLi.innerHTML = liTemp;
//               crtLi.className=`pacinco-item pacinco-item-${a}`;
//               crtLi.dataset.number = '0';
//               if(a <= NL.length) {
//                   crtUl.appendChild(crtLi)
//               }
//           };

//           //기존 값 초기화
//           targets[index].innerText = '';
//           //ul에 index에 맞는 클래스 생성
//           crtUl.className=`pacinco-list pacinco-list-${index}`;
//           // ul html 작성
//           targets[index].appendChild(crtUl);

//           const crtV = document.createElement("div");
//           crtV.className = 'v sr-only'
//           targets[index].prepend(crtV)

//       });
//   };

//   addOrRemove(name, value) {
//       const getLength = name.querySelectorAll("li")
//       const inboundNumber = value;

//       let valueStorage = [];
//       if(this.getNumb(inboundNumber).length > getLength.length) {
//           // console.log("들어온 자리수가 많다", this.getNumb(inboundNumber).length, getLength.length, '---->',inboundNumber)
//           // addRail
//           this.addRail(name, inboundNumber, this.getNumb(inboundNumber).length - getLength.length)
//       }else {
//           if(this.getNumb(inboundNumber).length < getLength.length) {
//               // console.log("기존 자리수가 많다", this.getNumb(inboundNumber).length, getLength.length)
//               // removeRail
//               this.removeRail(name, inboundNumber, this.getNumb(inboundNumber).length - getLength.length)
//           }else {
//               // console.log("같다", this.getNumb(inboundNumber).length, getLength.length)
//               // rolling
//           }
//       }

//   }

//   addRail(name) {
//       const selectUl = name.querySelector("ul")
//       const crtLi = document.createElement("li");
//       const test = `
//               <span>0</span>
//               <span>1</span>
//               <span>2</span>
//               <span>3</span>
//               <span>4</span>
//               <span>5</span>
//               <span>6</span>
//               <span>7</span>
//               <span>8</span>
//               <span>9</span>
//           `;

//       crtLi.innerHTML = test;
//       crtLi.className=`pacinco-item pacinco-item-${selectUl.childElementCount}`
//       selectUl.appendChild(crtLi)
//   };
//   removeRail(name) {
//       const selectUl = name.querySelector("ul")

//       selectUl.querySelector("li:last-child").remove();
//   }

//   rolling(name, value) {
//       const _id = document.querySelector(name);
//       const _li = _id.querySelectorAll("li");
      
//       _id.querySelector(".v").innerHTML = value;
      
//       for(let liC = 0; liC<_li.length; liC++) {
//           setTimeout(()=> {
//               _li[liC].style.transform = `translateY(-${this.getNumb(value)[liC]}0%)`;
//               _li[liC].dataset.number = this.getNumb(value)[liC];
//           }, 250 * liC)
//       }
//   }

//   calcCount(name, aV) {
//       const _id = document.querySelector(name);
//       const _count = document.querySelector(`${name} + .cdd-change_count`);
      
//       const beforeCv = Number(_id.querySelector(".v").innerText);

//       if(beforeCv === aV) {
//           // 값이 같다면
//           // console.log(beforeCv, aV, beforeCv == aV)
//           _count.querySelector(".cv").innerText =  0
//           _count.querySelector(".value_arrow").className = "value_arrow keep"
//       }else {
//           if(beforeCv < aV) {
//               // 새로운 값이 더 크다면
//           // _count.querySelector(".cv").innerText =  Math.abs(beforeCv - aV)
//           // _count.querySelector(".value_arrow").className = "value_arrow increase"

//           }else {
//               // 기존 값이 더 크다면
//               // _count.querySelector(".cv").innerText =  Math.abs(beforeCv - aV);
//               // _count.querySelector(".value_arrow").className = "value_arrow decrease"


//           }
//       }
//       // console.log('before',beforeCv,'after', aV,'=', Math.abs(beforeCv - aV))

//   }




//   destroy(name, option) {
//       if(option !== 'update') {
//           const target = document.querySelectorAll(this.name);
//           Object.values(target).map((ele)=> {
//           })
//       }else {
//           const target = document.querySelector(name);
//           target.innerText = ''
//           // console.log("여기")
//       }

//   };

//   update(id, number) {

//       const target = document.querySelector(id);
      
//       this.addOrRemove(target,number);
//       this.calcCount(id, number);
//       this.rolling(id, number)

//   }



//   init() {
//       this.crtHTML(this.name);
//   }

// }

export {RangeSlider}