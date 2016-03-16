## **gulp**
`default`  开发时运行，自动编译sass，js，并打开本地服务器实时预览

`build`  发布时运行，整合相关文件，并生成压缩包



## util

遵循commonJS规范，也可以单独引入使用

> picture：图片加载库

```javascript
Picture.preload({
    load: function(count, total){},
    end: function(){}
});
```

> platform：平台检测库


> slider：内容轮播库