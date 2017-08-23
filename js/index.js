window.onload = () => {
	function draw(id,value){
		let c=document.getElementById(id)
		// 兼容ie
		// 在IE中，默认坐标从(2,2)开始计算

		let mgTop = c.getBoundingClientRect().top-document.documentElement.clientTop,
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

		let c_w = c.getBoundingClientRect().width,
			c_h = c.getBoundingClientRect().height

		//画圆基本参数
		let cirX = actX+c_w/2,
			cirY = actY+c_h/2,
			r = c_w/2,
			startAngle = Math.PI*2/3,
			endAngle = Math.PI/3
		//最大百分比
		let maxPercent = 100
		//进度颜色
		let color = '#FED4D4',
			bgColor = '#000'
		if(value == maxPercent){
			color = '#F12F2F' 
		}else{ 
			color = '#FED4D4'
		}

		
		let cxt=c.getContext("2d")
		// 清空画布 
		cxt.clearRect(actX, actY, c_w, c_h)
		//底层
	    cxt.beginPath()
	    cxt.moveTo(cirX,cirY)
	    cxt.arc(50,cirY,40,0,Math.PI*2);
	    cxt.fillStyle=bgColor;
	    cxt.fill();
	    cxt.closePath();
	 
	    //进度层
	    cxt.beginPath();
	    cxt.moveTo(cirX,cirY);
	    cxt.arc(50,cirY,40,startAngle,endAngle);
	    cxt.fillStyle=color
	    cxt.fill();
	    cxt.closePath()
	 
	    //顶层补色
	    cxt.beginPath();
	    cxt.moveTo(cirX,cirY);
	    cxt.arc(50,cirY,20,0,Math.PI * 2);
	    cxt.fillStyle="#fff";
	    cxt.fill();
	    cxt.closePath();
	}
	draw('myCanvas',50)
}