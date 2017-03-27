# website-template

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

```
 website-template/    
    |——config/    
    |   |——postcss.config.js    
    |   |——webpack.base.config.js    
    |   |——webpack.dev.config.js    
    |   |——webpack.prod.config.js    
    |   |——webpack.bundle.config.js    
    |   |——deploy.js    
    |   |__ ***    
    |——dev/    
    |   |——component/ 全部组件    
    |   |   |——common/ 全局复用组件    
    |   |   |——layout/ 布局组件    
    |	|	|——view/ 路由页面组件
    |   |   |——src/ 配合bundle命令输出编译后js组件    
    |   |   |   |——***.vue 可复用化组件    
    |   |   |   |——***.js 输出文件    
    |   |   |——App.vue 出口输出组件    
    |   |——font/ 字体资源    
    |   |——image/ 图片资源    
    |   |   |——ignore/ 被require的资源，图片小于10kB    
    |   |——script/ 第三方插件库    
    |   |——store/ vuex配置目录    
    |   |——style/ 样式目录    
    |   |——*.html    
    |   |——router.js 路由配置目录    
    |   |——favico.ico    
    |——.babelrc babel配置文件    
    |——.eslintignore eslint忽略列表    
    |——.eslintrc eslint配置文件    
    |——.gitignore    
    |——.package.json 项目配置目录    
    |——README.md 说明文档    
    |__***/**
```

