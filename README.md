# website-template

自娱自乐，方便从0开发



## 0. 准备工作

- 安装&配置node环境
- 全局安装gulp
- 全局安装compass
- 根目录下运行sudo npm install安装所有依赖包
- 预览：`gulp`
- 打包发布（常规）：`gulp build`
- 打包发布（合并）：`gulp inject`





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



## 3. js工具库

遵循AMD、CommonJS规范，也可以单独引入使用

> 所有模块对象名均为js文件名，首字母大写



### 3.1 pictureLoader.js 图片加载器

使用了本地存储，加载图片时会先去检查sessionStorage中是否存在未过期的资源，若有，则直接从本地加载；否则，请求在线资源。
>   tip：sessionStorage有大小限制，若图片大小超出限制，则不会被本地存储，依旧使用在线资源


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

**静态属性**

| 名称         | 类型          | 默认值                       | 描述       |
| ---------- | ----------- | ------------------------- | -------- |
| timeout    | number (ms) | 60000                     | 缓存周期     |
| useStorage | boolean     | 除IE以外的桌面浏览器为true，其余为false | 是否使用本地存储 |

**静态方法**

| 名称           | 描述                                       |
| ------------ | ---------------------------------------- |
| getSrc(path) | 获取指定的图片资源，以便设置src。（优先读取未过期的本地存储，失败则读取文件） 参数：图片资源路径 |



### 3.2 platform.js 平台检测

>   tip：引入后自动对html标签添加相应class


| 静态属性         | 类名          | 描述              |
| ------------ | ----------- | --------------- |
| isDesktop    | desktop     | 桌面浏览器           |
| isIE         | ie          | IE浏览器           |
| -            | not-ie      | 非IE浏览器          |
| isIE11       | ie11        | IE11浏览器         |
| isEdge       | edge        | Edge浏览器         |
| -            | not-edge    | 非Edge浏览器        |
| isChrome     | chrome      | Chrome浏览器       |
| isFirefox    | firefox     | Firefox浏览器      |
| isSafari     | safari      | Safari浏览器       |
| isTablet     | tablet      | 平板设备            |
| isiPad       | ipad        | iPad设备          |
| isAndroidPad | android-pad | Android平板设备     |
| isNexus7     | nexus7      | Google Nexus7设备 |
| isMobile     | mobile      | 手机设备            |
| isiPhone     | iphone      | iPhone设备        |
| isS4         | s4          | 三星S4设备          |
| isS5         | s5          | 三星S5设备          |
| isIOS        | ios         | IOS设备           |
| isAndroid    | android     | 安卓设备            |
| hasTouch     | has-touch   | 触摸屏设备           |
| -            | no-touch    | 非触摸屏设备          |



### 3.3 slider.js 内容轮播

>IE下使用css3动画会出现莫名问题，需使用传统的position进行动画，但性能会有所下降

**结构**

```html
<div id="slider">
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```

**初始化**

```javascript
let slider = new Slider({
  	// options...
});
```

**初始化参数**

| 参数                     | 类型           | 默认值           | 描述                     |
| ---------------------- | ------------ | ------------- | ---------------------- |
| container              | dom          | null          | 容器元素（必须）               |
| prevBtn                | dom          | null          | 上一项按钮                  |
| nextBtn                | dom          | null          | 下一项按钮                  |
| indicator              | dom          | null          | 索引指示器                  |
| currentIndex           | number (int) | 0             | 初始项下标                  |
| speed                  | number (ms)  | 1000          | 动画速度                   |
| interactiveSpeed       | number (ms)  | 200           | 人为交互后的动画速度             |
| interactiveDistance    | number (px)  | 100           | 人为交互后进行跳转的最短距离         |
| ease                   | string       | 'ease-in-out' | 缓动动画（css字符串）           |
| onChangeStart(i, next) | function     | null          | 动画开始时的回调，参数：当前下标，下一项下标 |
| onChangeEnd(i, prev)   | function     | null          | 动画结束后的回调，参数：当前下标，上一项下标 |

**实例属性**

| 名称           | 类型           | 描述       |
| ------------ | ------------ | -------- |
| currentIndex | number (int) | 当前项下标    |
| updating     | boolean      | 是否正在发生位移 |

***注：若要给slider内元素添加类似click的事件，需在事件处理函数的一开始判断updating值，若为true则禁止触发；若为false，则可正常触发（目的是为了防止在slider滑动过程中触发对应事件）***

**实例方法**

| 名称            | 描述                   |
| ------------- | -------------------- |
| slidePrev(t)  | 跳转到上一项，参数：动画时间       |
| slideNext(t)  | 跳转到下一项，参数：动画时间       |
| slideTo(i, t) | 跳转到指定项，参数：目标项下标，动画时间 |



### 3.4 util.js 实用工具

>  好东西

**静态方法**

| 名称                                | 描述                                       |
| --------------------------------- | ---------------------------------------- |
| merge(...obj)                     | 合并对象，同jquery的extend方法                    |
| parseDom(str)                     | 将字符串转换为dom元素                             |
| closest(el, selector)             | 获取元素el的祖先节点，不存在则为null，同jquery的closest方法  |
| strToJson(str)                    | 将字符串转换为json对象，字符串必须完全符合json规范            |
| indexOf(el, collection)           | 获取元素el在集合collection中的下标                  |
| sortObjArrByKey(objArr, key)      | 将对象数组objArr按给定的键key排序                    |
| triggerEvent(el, eventName, data) | 在el元素上触发eventName事件，并传递事件参数data到e.detail |