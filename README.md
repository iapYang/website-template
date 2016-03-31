# website-template

自娱自乐，方便从0开发



## 1. 目录结构

- data：临时/动态数据
- font：字体，见[使用方式](https://github.com/JoshuaYang/webFonts)
- image：图片
- script：脚本
  - util：工具库
- style：样式
- template：模板
- worker：线程
- vendor：不参与合并输出的文件





## 2. gulp
> 使用swig模板引擎，sass预编译，es6语法，browserify模块管理
>
> 模板引擎的数据来源默认路径为 dev/data/config.json

`default`  开发时运行，自动编译sass，js，并打开本地服务器实时预览


`inject`  发布时运行，整合相关文件，并生成压缩包（html，css，js整合为一个文件）

`build`  发布时运行，整合相关文件，并生成压缩包（html，css，js为单独的文件）



## 3. util

遵循commonJS规范，也可以单独引入使用



### 3.1 pictureLoader.js 图片加载器

> 开启了本地存储，加载图片时会先去检查localStorage中是否存在未过期的资源，
> 若有，则直接从本地加载；否则，请求在线资源。

**初始化方式1：加载完成后插入到dom中**

```html
<!-- 图片加载的容器统一设置标志类, 图片路径设置为data-source -->
<div class="preload" data-source="image/logo.png"></div>
```

```javascript
let loader = new PictureLoader({
  	// 需要加载的图片标志类，默认为preload
  	className: 'preload',
});
```

**初始化方式2：单纯加载图片资源**

```javascript
let loaderQueue = new PictureLoader({
  	// 需要加载的图片资源路径，数组形式
    sourceQueue: [
        'image/1.jpg',
        'image/2.jpg',
        'image/3.jpg',
        'image/4.jpg',
        'image/5.jpg',
    ],
});
```

**执行加载**

```javascript
loader.load({
  	// 每张图片加载完后的回调
	// *参数1：加载完成的图片dom对象
  	// *参数2：已加载完成的图片数
  	// *参数3：图片总数
    done: (image, count, total) => {},

  	// 全部图片加载完后的回调
    end: () => {}
});
```

**静态方法**

```javascript
// 缓存周期，单位为毫秒，默认为60000毫秒(1分钟)
PictureLoader.timeout
```

### 3.2 platform.js 平台检测

> 


### 3.3 slider.js 内容轮播

> 

**初始化**

```javascript
let slider = new Slider({
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
    onChangeStart: (i, next) => {
        console.log('==========', i, next);
    },

  	// 动画结束后的回调
  	// *参数1：当前下标
  	// *参数2：上一项下标
    onChangeEnd: (i, prev) => {
        console.log('==========', i, prev);
    }
});
```

**实例属性**

```javascript
// 当前项的下标
slider.currentIndex
```

**实例方法**

```javascript
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



### 3.4 util.js 实用工具

>   

**静态方法**

```javascript
// 合并对象，同jquery的extend方法
Util.merge(...obj)

// 将字符串转换为dom元素
Util.parseDom(str)

// 获取元素的祖先节点，不存在则为null，同jquery的closest方法
Util.closest(el, selector)

// 将字符串转换为json对象，字符串必须完全符合json规范
Util.strToJson(str)
```