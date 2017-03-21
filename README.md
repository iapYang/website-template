# website-template

## 结构

```
website-template/
	|
	|——config/
	|	|——postcss.config.js
	|	|——webpack.base.config.js
	|	|——webpack.dev.config.js
	|	|——webpack.prod.config.js
	|	|__ ***
	|
	|——dev/
	|	|——component/ 可复用组件代码处
	|	|	|——***/ 可复用组件的子组件
	|	|	|——***.vue 可复用组件的子组件
	|	|——font/
	|	|——image/
	|	|	|——ignore/ 被require的资源，图片小于10kB
	|	|——example/ 实例代码
	|	|——src/ 可复用化组件
	|	|	|——***.vue 可复用化组件
	|	|	|——***.js 输出文件
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
```

## 环境

- 框架：vue
- 样式：sass+postcss
- 脚本：es6
- 语法检测：ESLint
- 打包：webpack





## 目录结构

- component：vue组件
- font：字体（[在线转换字体](https://onlinefontconverter.com/) ｜ [常用字体库](https://github.com/JoshuaYang/web-fonts)）
- image：图片
- script：脚本
- style：样式
- vendor：不参与合并输出的文件（可能需要手动创建该目录）
- store：状态管理
- router.js：路由配置





## npm/yarn script
`dev`  开发时运行，自动打开本地服务器实时预览

`build`  发布时运行，整合相关文件



## eslint

🚧 WIP
