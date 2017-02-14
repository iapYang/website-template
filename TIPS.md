# TIPS

## 模块定义

- 模块统一放置在components文件夹
- 以模块名新建文件夹，首字母全都大写
- 用模块名新建对应的scss和js文件（XXX.scss，XXX.js）
- 新建index.js文件，引入对应的模块文件，并导出
- 最终目录结构
  - components
    - XXX
      - XXX.scss
      - XXX.js
      - index.js



### index.js

```javascript
import XXX from "./XXX";
export default XXX;
```

### XXX.scss

```scss
.XXX{
	// ...
}
```

### XXX.jsx

```javascript
import React, {Component} from 'react';
import classnames from 'classnames';

import scss from './XXX.scss';

class XXX extends Component {
    render() {
        return (
            <div className={classnames(
                scss.XXX
            )}>
				<!-- ... -->
            </div>
        );
    }
}

export default XXX;
```

**可直接复制components/Demo文件夹，然后将Demo字段全都改为需要的模块名即可（包括文件名、文件夹名）**



## 外部样式引用&复写

> 后面引用的样式、组件样式会覆盖之前写的样式，所以入口文件中的样式文件应在所有模块引用后引用

```javascript
import XXX from './components/XXX';
import YYY from './components/YYY';

import scss from './style/main.scss';
```



## 样式编写&使用

> 在设置className时，必须使用classnames模块进行设置

```react
<div className={classnames(
    scss.XXX
)}>
  
<div className={classnames(
    scss["XXX"]
)}>
```



## 样式注意点

- font-family设置时必须加上`!important`
- 工具类的东西（mixin、function、keyframes、variable、公用样式……）写在单独的文件中管理，并整合为一个统一的入口文件，在需要时只需要引用入口文件即可



## 图片引用

需要使用图片路径的地方，统一使用 `require('path/image.jpg')`



## 主体结构

```react
<PaidPostArticle
  className={scss.PaidPostArticle}
  normalize={false}>
  
  <!-- content -->
  
</PaidPostArticle>
```