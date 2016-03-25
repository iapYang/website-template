# website-template

自娱自乐，方便从0开发



## 目录结构

- data：临时/动态数据
- font：字体
- image：图片
- script：脚本
  - util：工具库
- style：样式
- template：模板
- worker：线程


## gulp
> 使用swig模板引擎，sass预编译，es6语法，browserify模块管理
>
> 模板引擎的数据来源默认路径为 dev/data/config.json

`default`  开发时运行，自动编译sass，js，并打开本地服务器实时预览

`build`  发布时运行，整合相关文件，并生成压缩包



## util

遵循commonJS规范，也可以单独引入使用

### picture.js

> 图片加载库

```html
<!-- 图片加载的容器统一设置.preload, 图片路径设置为data-source -->
<div class="preload" data-source="image/logo.png"></div>
```

```javascript
Picture.preload({
  	// 每张图片加载完后的回调
	// *参数1：加载完成的图片dom对象
  	// *参数2：已加载完成的图片数
  	// *参数3：图片总数
    load: function(image, count, total){},

  	// 全部图片加载完后的回调
    end: function(){}
});
```

## platform.js

> 平台检测库


## slider.js

> 内容轮播库

```javascript
var slider = new Slider({
  	// 容器元素，dom
    container: document.getElementsById('slider'),

  	// 上一项元素，dom
    prevBtn: document.getElementsById('btn-prev'),

  	// 下一项元素，dom
    nextBtn: document.getElementsById('btn-next'),

  	// 初始化后的显示项下标，默认为0
    currentIndex: 0,

  	// 动画速度，单位ms，默认为1000
    speed: 800,

  	// 人为交互后的动画速度，单位ms，默认200
    interactiveSpeed: 300,
  	
  	// 人为交互后进行跳转的最短距离，单位px，默认100
    interactiveDistance: 200,

  	// 缓动动画，css字符串，默认ease-in-out
    ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',

  	// 动画开始时的回调
  	// *参数1：当前下标
  	// *参数2：下一项下标
    onChangeStart: function(i, next){
        console.log('==========', i, next);
    },

  	// 动画结束后的回调
  	// *参数1：当前下标
  	// *参数2：上一项下标
    onChangeEnd: function(i, prev){
        console.log('==========', i, prev);
    }
});

// 跳转到上一项
// *参数1：动画时间，默认为初始化速度
slider.slidePrev(t)

// 跳转到下一项
// *参数1：动画时间，默认为初始化速度
slider.slidePrev(t)

// 跳转到指定项
// *参数1：目标项下标
// *参数2：动画时间，默认为初始化速度
slider.slideTo(i, t)
```