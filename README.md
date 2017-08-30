# time-plugin
## 一个类似京东的优惠券抢购倒计时组件
## Get Started
  `$ git clone https://github.com/Caraxiong/time-plugin.git`

## 项目目录

    |--lib

    |----buy-time

    |------buy-time.css

    |------buy-time.js

    |------buy-time.less

    |----demo.html

> lib 下的but-time文件夹及插件包

> less预编译语言，如想修改样式文件  可直接修改  使用lessc 编译成css文件即可

> 步骤如下：

  `$ npm install lessc -g`

#### 进入到but-time文件夹

  `$ lessc but-time.less but-time.css`

#### 页面调用方法如下：
`<div data-target="buyTime"></div>`

给一个容器


### 可自定义参数如下：
      `value : 0,  //百分比分子

       id : 'myCanvas', //canvas id

       cvWidth : 100,  //canvas width

       cvHeight : 100,  //canvas height

       total : 100,   //百分比分母

       canvasBtnText : '立即领取', //canvas下的按钮

       cdBtnText : '提醒我',  //倒计时下的按钮

       cdText1 : '距开抢还剩', //倒计时的描述1

       cdText2 : '100人已提醒',  //倒计时的描述2

       cdStartTime : '2017-08-29 16:50:00' //设置倒计时的时间`

## 使用方法：
  > 引入css、js文件

  >	<script>
	    window.onload = () => {
	        buyTime.run('[data-target="buyTime"]',{
				    value : 0,
                  cdStartTime : '2017-08-29 16:54:20'
			    })
	      }
     </script>
