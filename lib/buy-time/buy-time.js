(function(root,factory){
    'use strict'
    if (typeof define === 'function' && define.amd) {
        define(factory)
    } else if (typeof exports === 'object') {
        module.exports = factory()
    } else {
        root.buyTime = factory()
    }
}(this,function(){
    'use strict'

    let doms = {} //save dom variable
    let varObj = {} //save variable

    let options = {
       value : 0,
       id : 'myCanvas', //canvas id
       cvWidth : 100,  //canvas width
       cvHeight : 100,  //canvas height
       total : 100,   //总数
       canvasBtnText : '立即领取', //canvas下的按钮
       cdBtnText : '提醒我',  //倒计时下的按钮
       cdText1 : '距开抢还剩', //倒计时的描述1
       cdText2 : '100人已提醒',  //倒计时的描述2
       cdStartTime : '2017-08-29 16:50:00' //设置倒计时的时间
    }

    let __PROTO__ = {
        funs : {
            getByData : (parent,selector) => {
                return parent.querySelector(selector)
            },
            getAllByData : (parent,selector) => {
                return parent.querySelectorAll(selector)
            },
            getById : (id) => {
                return document.getElementById(id)
            },
            format : (num) => {
        		if(num < 10){
        			return '0' + num
        		}
        		return num
        	},
            countDown : (t , Tab1 , Tab2 ,tModels) => { //t：时间差  sTab：需要展示的tab   hTab：需要隐藏的Tab  tModels:放时分秒的span
        		varObj.countDownInterval = setInterval(()=> {
        			t = t-1000
        			if(t <= 0 ){
        				clearInterval(varObj.countDownInterval)
        				Tab1.style.display = 'flex'
        				Tab2.style.display = 'none'
        				__PROTO__._drawProgress(options.id,options.value)
        			}else{
        				tModels[0].innerHTML = __PROTO__.funs.format(parseInt(t / 1000 / 60 / 60 % 24))
        				tModels[1].innerHTML = __PROTO__.funs.format(parseInt(t / 1000 / 60 % 60))
        				tModels[2].innerHTML = __PROTO__.funs.format(parseInt(t / 1000 % 60))
        			}
        		},1000)
        	},
            // 倒计时部分
            startCountDown : (time , Tab1 , Tab2 , tModels) => {
        		//转日期格式
        		let t = new Date(time).getTime()
        		//获取当前时间
        		let nowT = new Date().getTime()
        		let diff = t - nowT

        		if(diff <= 0){
        			Tab1.style.display = 'flex'
        			Tab2.style.display = 'none'
        			__PROTO__._drawProgress(options.id,options.value)
        		}else{
        			Tab1.style.display = 'none'
        			Tab2.style.display = 'flex'
        			let y = parseInt(diff / 1000 / 60 / 60 / 24 / 12 / 365),
        				m = parseInt(diff / 1000 / 60 / 60 / 24 / 12 % 365),
        				d = parseInt(diff / 1000 / 60 / 60 / 24 % 12)
        			//判断是否大于一天
        			if(d > 0 || m > 0 || d > 0){
        				//敬请期待
        				console.log('敬请期待')
        			}else{
        				let h = __PROTO__.funs.format(parseInt(diff / 1000 / 60 / 60 % 24)),
        					mm = __PROTO__.funs.format(parseInt(diff / 1000 / 60 % 60)),
        					s = __PROTO__.funs.format(parseInt(diff / 1000 % 60))

        				tModels[0].innerHTML = h
        				tModels[1].innerHTML = mm
        				tModels[2].innerHTML = s

        				__PROTO__.funs.countDown(diff , Tab1 , Tab2 , tModels)
        			}
        		}
        	},
            createCanvas : (parent) => {
                let canvasBox = document.createElement("div")
                canvasBox.setAttribute('data-canvas-box','canvasBox')
                //canvas
                let cv = document.createElement('canvas')
                cv.setAttribute('id', options.id)
                cv.setAttribute('data-total',options.total)
                cv.setAttribute('width',options.cvWidth)
                cv.setAttribute('height',options.cvHeight)
                let cvText = document.createTextNode('')
                cv.appendChild(cvText)
                canvasBox.appendChild(cv)
                //btn
                let btn = document.createElement('button')
                btn.setAttribute('data-canvas-btn','canvasBtn')
                let btnText = document.createTextNode(options.canvasBtnText)
                btn.appendChild(btnText)
                canvasBox.appendChild(btn)

                parent.appendChild(canvasBox)
            },
            createCountDown : (parent) => {
                 let cdBox = document.createElement("div")
                 cdBox.setAttribute('data-cd-box','cdBox')
                 let cd = document.createElement("div")
                 cd.setAttribute('data-cd','cd')
                 let cdP1 = document.createElement("p")
                 let cdText1 = document.createTextNode(options.cdText1)
                 cdP1.appendChild(cdText1)
                 let cdTime = document.createElement("div")
                 cdTime.setAttribute('data-cd-time','cd-time')
                 for(let i = 0 ; i < 3 ; i++){
                     let span = document.createElement("span")
                     let colon = document.createTextNode(':')
                     span.setAttribute('data-t-model','tModel')
                     cdTime.appendChild(span)
                     if( i !== 2 ){
                         cdTime.appendChild(colon)
                     }
                 }
                 let cdP2 = document.createElement("p")
                 let cdText2 = document.createTextNode(options.cdText2)
                 cdP2.appendChild(cdText2)
                 cd.appendChild(cdP1)
                 cd.appendChild(cdTime)
                 cd.appendChild(cdP2)
                 cdBox.appendChild(cd)

                 //btn
                 let btn = document.createElement('button')
                 btn.setAttribute('data-cd-btn','cdBtn')
                 let btnText = document.createTextNode(options.cdBtnText)
                 btn.appendChild(btnText)
                 cdBox.appendChild(btn)

                 parent.appendChild(cdBox)
            }
        },
        _run : (selector, userOptions) => {
            Object.assign(options,userOptions)
            //plugin box
            doms.targetDom = __PROTO__.funs.getByData(document,selector)
            __PROTO__.funs.createCanvas(doms.targetDom)
            //canvas parent box
            doms.canvasBox = __PROTO__.funs.getByData(doms.targetDom,'[data-canvas-box="canvasBox"]')//canvas元素
            doms.c = __PROTO__.funs.getById(options.id)
            doms.canvasBtn = __PROTO__.funs.getByData(doms.targetDom,'[data-canvas-btn="canvasBtn"]')

            //count down
            __PROTO__.funs.createCountDown(doms.targetDom)

            doms.cdBox = __PROTO__.funs.getByData(doms.targetDom,'[data-cd-box="cdBox"]')//倒计时元素
            doms.tModels = __PROTO__.funs.getAllByData(doms.targetDom,'[data-t-model="tModel"]') //时分秒元素
            //触发倒计时
            __PROTO__.funs.startCountDown(options.cdStartTime,doms.canvasBox,doms.cdBox,doms.tModels)

            doms.cdBtn = __PROTO__.funs.getByData(doms.targetDom,'[data-cd-btn="cdBtn"]')

            let is_IE = (navigator.appName == "Microsoft Internet Explorer"); //判读是否为ie浏览器

            if (is_IE) {
                doms.canvasBtn.attachEvent("click", function () { __PROTO__._drawProgress(options.id,options.value += 1) })
                doms.cdBtn.attachEvent("click", function () { alert(0) })
            }
            else {
                doms.canvasBtn.addEventListener("click", function () { __PROTO__._drawProgress(options.id,options.value += 1) }, false)
                doms.cdBtn.addEventListener("click", function () { alert(0) }, false)
            }
        },
        _drawProgress : function(id,val){
            let value = val || options.value
            //取分母
            let maxPercent = Number(doms.c.getAttribute('data-total'))
            let percent = parseInt((value/maxPercent).toFixed(2)*100)

            doms.c.innerHTML = '已抢'+ percent +'%'

            let c_w = doms.c.getBoundingClientRect().width,
                c_h = doms.c.getBoundingClientRect().height

            //画圆基本参数
            let cirX = c_w/2,
                cirY =	c_h/2,
                r = c_w/2,
                startAngle = Math.PI*2/3,
                endAngle = Math.PI/3

            //进度条的结束角度计算
            let proEndAngle = percent * 5 * Math.PI / 3 / 100 + startAngle

            //进度颜色
            let color = '#FED4D4',
                fillColor = '#F12F2F',
                bgColor = '#fff'

            if(value === maxPercent){
                fillColor = '#E9E9E9'
                color = '#E9E9E9'
                doms.canvasBtn.style.backgroundColor = '#E9E9E9'
                doms.canvasBtn.style.pointerEvents = 'none'
            }

            let cxt = doms.c.getContext("2d")
            // 清空画布
            // cxt.clearRect(actX, actY, c_w, c_h)
            //底层
            cxt.beginPath()
            cxt.moveTo(cirX,cirY)
            cxt.arc(cirX,cirY,r,startAngle,endAngle)
            cxt.fillStyle = color
            cxt.fill()
            cxt.closePath()

            //进度层
            cxt.beginPath()
            cxt.lineCap = "round"
            cxt.moveTo(cirX,cirY)
            cxt.arc(cirX,cirY,r,startAngle,proEndAngle)
            cxt.fillStyle = fillColor
            cxt.fill()
            cxt.closePath()

            //顶层补色
            cxt.beginPath()
            cxt.moveTo(cirX,cirY)
            cxt.arc(cirX,cirY,r-10,0,Math.PI * 2)
            cxt.fillStyle = bgColor
            cxt.fill()
            cxt.closePath()

            //文字
            cxt.font = 'bold 18px Arial'
            cxt.textAlign = 'center'
            cxt.fillStyle = fillColor
            cxt.textBaseline = 'middle'
            cxt.moveTo(cirX,cirY)
            cxt.fillText('已抢'+percent+'%',cirX,cirY)
        }
    }
    return {
        run: __PROTO__._run,
        drawProgress: __PROTO__._drawProgress
    }
}))
if (!Object.assign) {
    Object.defineProperty(Object, "assign", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, firstSource) {
        "use strict";
            if (target === undefined || target === null)
                throw new TypeError("Cannot convert first argument to object");
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) continue;
                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
                }
            }
            return to;
        }
    });
}
