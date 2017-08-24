let value = 99
window.onload = () => {
	let countDownInterval

	//获取切换元素
	let tab = document.getElementsByClassName('inner-tp-model')
	//获取时、分、秒位置元素
	let span = document.getElementById('tpTime').getElementsByTagName('span')

	let format = (num) => {
		if(num < 10){
			return '0' + num
		}
		return num
	}
	let countDown = (t) => {
		countDownInterval = setInterval(()=> {
			t = t-1000
			if(t <= 0 ){
				clearInterval(countDownInterval)
				tab[0].style.display = 'flex'
				tab[1].style.display = 'none'
				reDraw('myCanvas')
			}else{
				span[0].innerHTML = format(parseInt(t / 1000 / 60 / 60 % 24))
				span[1].innerHTML = format(parseInt(t / 1000 / 60 % 60))
				span[2].innerHTML = format(parseInt(t / 1000 % 60))
			}
		},1000)
	}	
	// 倒计时部分
	let startCountDown = (time) => {
		//转日期格式
		let t = new Date(time).getTime()
		//获取当前时间
		let nowT = new Date().getTime()
		let diff = t - nowT

		if(diff <= 0){
			tab[0].style.display = 'flex'
			tab[1].style.display = 'none'
			reDraw('myCanvas')
		}else{
			tab[0].style.display = 'none'
			tab[1].style.display = 'flex'
			let y = parseInt(diff / 1000 / 60 / 60 / 24 / 12 / 365)
				m = parseInt(diff / 1000 / 60 / 60 / 24 / 12 % 365)
				d = parseInt(diff / 1000 / 60 / 60 / 24 % 12)
			//判断是否大于一天
			if(d > 0 || m > 0 || d > 0){
				//敬请期待
				console.log('敬请期待')
			}else{
				let h = format(parseInt(diff / 1000 / 60 / 60 % 24)),
					mm = format(parseInt(diff / 1000 / 60 % 60)),
					s = format(parseInt(diff / 1000 % 60))

				span[0].innerHTML = h
				span[1].innerHTML = mm
				span[2].innerHTML = s

				countDown(diff)
			}
		}
	}
	startCountDown('2017-08-24 14:27:10')
}	
	function reDraw(id){
		let c = document.getElementById(id)
		let btn = document.getElementsByClassName('btn')[0]
		// 兼容ie
		// 在IE中，默认坐标从(2,2)开始计算

		/*let mgTop = c.getBoundingClientRect().top-document.documentElement.clientTop,
			mgLeft = c.getBoundingClientRect().left-document.documentElement.clientLeft,
			yScroll,
			xScroll
		if (document.documentElement && document.documentElement.scrollTop) { 
		    yScroll = document.documentElement.scrollTop;
		    xScroll = document.documentElement.scrollLeft;
	  	} else if (document.body) {// all other Explorers
		    yScroll = document.body.scrollTop;
		    xScroll = document.body.scrollLeft;  
		}

		//实际div距离浏览器左上角位置坐标
		let actX = mgLeft+xScroll,
		 	actY = mgTop+yScroll
		*/
		
    	//取分母
    	let maxPercent = Number(c.getAttribute('data-total'))
    	let percent = parseInt((value/maxPercent).toFixed(2)*100)

		c.innerHTML = '已抢'+ percent +'%'

		console.log(percent)
		let c_w = c.getBoundingClientRect().width,
			c_h = c.getBoundingClientRect().height

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

		if(value == maxPercent){
			fillColor = '#E9E9E9'
			color = '#E9E9E9'
			btn.style.backgroundColor = '#E9E9E9'
			btn.style.pointerEvents = 'none'
		}

		//再次点击加
		value++
		
		let cxt = c.getContext("2d")
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