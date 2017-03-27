# PictureLoader

使用了本地存储，加载图片时会先去检查sessionStorage中是否存在未过期的资源，若有，则直接从本地加载；否则，请求在线资源。

> tip：sessionStorage有大小限制，若图片大小超出限制，则不会被本地存储，依旧使用在线资源



## **初始化方式1：加载完成后插入到dom中**

```html
<!-- 图片加载的容器统一设置标志类, 图片路径设置为data-source -->
<!-- 如需加载为背景图，则添加data-bg属性，不需要赋值 -->
<div class="preload" data-source="image/logo.png"></div>
```

```javascript
let loader = new PictureLoader({
  	// 需要加载的图片标志类，默认为preload
  	className: 'preload',
});
```



## **初始化方式2：单纯加载图片资源**

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



## **执行加载（回调函数移至初始化时设定）**

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



## **static property**

| name         | type        | default value                            | description                         |
| ------------ | ----------- | ---------------------------------------- | ----------------------------------- |
| survivalTime | number (ms) | 60000                                    | survival time of cache              |
| useStorage   | boolean     | `true` on desktop browser except IE. Other platform will be `false` | whether use sesstion storage or not |

