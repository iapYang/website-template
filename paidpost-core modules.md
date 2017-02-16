# paidpost-core modules

## BodyCopy

> 居中显示的内容容器

| 属性名       | 类型     | 描述   |
| --------- | ------ | ---- |
| className | string | 类名   |
| style     | object | 行内样式 |
| children  | node   | 子节点  |



## FigureTag

> 主要作为ImageView的子组件使用
>
> 第一行是children的内容，第二行是caption，第三行是credit

| 属性名       | 类型     | 描述   |
| --------- | ------ | ---- |
| id        | string | 唯一标志 |
| className | string | 类名   |
| caption   | string | 标题   |
| credit    | string | 内容信息 |
| children  | node   | 子节点  |



## FooterComponent

> 页脚组件
>
> 第一行为title，第二行左边为cta，右边为logo
>
> ctaPosition、backgroundColor暂无内部实现，只是一个空壳
>
> logoImage、logoSize、logoOrientation必须同时设置，才能正常显示logo

| 属性名               | 类型                           | 描述                       |
| ----------------- | ---------------------------- | ------------------------ |
| className         | string                       | 类名                       |
| styles            | ?                            | 只可用来控制background-image属性 |
| link              | string                       | footer链出地址               |
| title             | string                       | 标题                       |
| ctatext           | string                       | cta按钮文字                  |
| ctaPosition       | string                       | cta按钮位置（并没有内部实现，实际无法控制）  |
| backgroundColor   | string                       | 背景色（并没有内部实现，实际无法控制）      |
| backgroundOpacity | string                       | 背景图片透明度                  |
| singleImage       | string                       | 所有尺寸下使用的背景图片路径           |
| desktopImage      | string                       | desktop尺寸背景图路径           |
| tabletImage       | string                       | tablet尺寸背景图路径            |
| mobileImage       | string                       | mobile尺寸背景图路径            |
| logoImage         | string                       | logo图片路径                 |
| logoSize          | 'small' / 'medium' / 'large' | logo尺寸                   |
| logoOrientation   | 'landscape' / 'portrait'     | logo方向                   |

**默认值**

```json
{
  className: 'FooterComponent',
  link: '#',
  title: 'FooterComponent',
  ctatext: 'Learn More',
  ctaPosition: 'left',
  backgroundOpacity: '1.0',
}
```



## HeaderComponent

> 页头组件
>
> 第一行为title，第二行为subhead，最下面为scrolldown按钮，外侧右下角为captionText
>
> 背景可设置为video或image（image必须设置3套尺寸，否则resize会出现空白情况）
>
> 背景若为image，可以添加backgroundNode

| 属性名                 | 类型                                       | 描述                              |
| ------------------- | ---------------------------------------- | ------------------------------- |
| headerType          | 'header-full' / 'header-partial' / 'header-bottom' | 影响容器高度，看不懂- -                   |
| scrollIcon          | boolean / string                         | scrolldown图标是否显示，或显示为自定义字符      |
| scrollIconColor     | string                                   | scrolldown图标的颜色（并没有内部实现，实际无法控制） |
| title               | string / object                          | 必须字段，主标题                        |
| subhead             | string / object                          | 副标题                             |
| textBackgroundColor | string                                   | ？？？（并没有内部实现，实际无法控制）             |
| backgroundOpacity   | number                                   | 背景图片/视频透明度                      |
| backgroundNode      | node                                     | 非视频背景时可用                        |
| video               | string                                   | 背景视频路径（mp4格式）                   |
| videoWebm           | string                                   | 背景视频路径（webm格式）                  |
| videoPoster         | string                                   | 背景视频封面                          |
| desktopImage        | string                                   | desktop尺寸背景图路径                  |
| tabletImage         | string                                   | tablet尺寸背景图路径                   |
| mobileImage         | string                                   | mobile尺寸背景图路径                   |
| captionText         | string                                   | 容器外侧右下角的脚标文字（干嘛用的）              |
| scss                | object                                   | 样式对象                            |



## ImageView

> 图片展示
>
> 第一行是src指定的图片，第二行是caption，第三行是credit

| 属性名        | 类型              | 描述                                   |
| ---------- | --------------- | ------------------------------------ |
| id         | string          | 唯一标志                                 |
| className | string          | 类名                                   |
| caption    | string          | 标题                                   |
| credit     | string          | 内容信息                                 |
| src        | string / object | 必须字段，图片路径，可使用breakpoints针对不同区间设置不同路径 |



## LayoutContainer

>  内容容器，可浮动，也可撑满宽度

| 属性名         | 类型                                       | 描述                |
| ----------- | ---------------------------------------- | ----------------- |
| id          | string                                   | 唯一标志              |
| className   | string                                   | 类名                |
| style       | object                                   | 行内样式              |
| children    | node                                     | 必须字段，子节点          |
| aspect      | 'wide' / 'square' / 'narrow'             | ？？？               |
| type        | 'center' / 'full-bleed' / 'full-screen' / 'float-left' / 'float-right' | 排列方式              |
| withMargins | true / false / 'auto'                    | 在某些尺寸添加上下的margin  |
| withPadding | true / false / 'auto'                    | 在某些尺寸添加上下的padding |

**默认值**

```json
{
  style: {},
  aspect: 'wide',
  type: 'full-bleed',
  withMargins: 'auto',
  withPadding: 'auto',
}
```



## PaidPostArticle

> 项目入口容器，所有内容都应该包含在这个容器内

| 属性名        | 类型                                       | 描述                  |
| ---------- | ---------------------------------------- | ------------------- |
| className  | string                                   | 类名                  |
| fontFamily | 'Open Sans' / 'Lato' / 'Roboto' / 'Source Sans Pro' / 'system' | 全局字体                |
| normalize  | boolean                                  | 统一全局样式（内部实现上并没有什么用） |
| debug      | boolean                                  | 调试，给所有元素加上边框        |

**默认值**

```json
{
  fontFamily: 'Source Sans Pro',
  normalize: true,
  debug: true,
}
```



## PhotoGridView

> 嵌套ImageView使用
>
> 排列逻辑比较混乱
>
> 若有4个子项，并且alternate为true，则第一列为[0]，第二列为[2]+[1]，第三列为[3]
>
> 若有4个子项，并且alternate为false，column为false，则第一列为[0]+[2]，第二列为[1]+[3]
>
> 若有4个子项，并且alternate为false，column为true，则第一行为[0]+[1]，第二行为[2]+[3]
>
> 若有3个子项，并且alternate为true，则第一列为[0]，第二列为[1]+[2]
>
> 其余情况，子项都水平依次排列
>
> 多于5个子项会报错

| 属性名       | 类型      | 描述            |
| --------- | ------- | ------------- |
| children  | node    | 必须字段，子节点      |
| alternate | boolean | 必须字段，？？？      |
| flip      | boolean | 必须字段，子项水平倒序排列 |
| column    | boolean | 必须字段，？？？      |

**默认值**

```json
{
  alternate: false,
  flip: false,
  column: false,
}
```



## PictureTag

> 主要作为ImageView的子组件使用
>
> 展示一个img标签

| 属性名       | 类型              | 描述                              |
| --------- | --------------- | ------------------------------- |
| id        | string          | 唯一标志                            |
| className | string          | 类名                              |
| src       | string / object | 图片路径，可使用breakpoints针对不同区间设置不同路径 |
| alt       | string          | img标签的alt属性                     |
| title     | string          | img标签的title属性（并没有内部实现，实际无法控制）   |



## PullQuote

> 引言

| 属性名              | 类型                | 描述                     |
| ---------------- | ----------------- | ---------------------- |
| id               | string            | 唯一标志                   |
| className        | string            | 类名                     |
| style            | object            | 行内样式                   |
| caption          | node              | 必须字段，主体内容              |
| credit           | string            | 作者名称                   |
| variant          | 'left' / 'center' | 内容对齐方式                 |
| quoteStyle       | object            | 主体内容样式                 |
| creditStyle      | object            | 作者部分样式                 |
| hangingQuotation | boolean           | 第一个引号是否不占据文字位置（是否绝对定位） |

**默认值**

```json
{
  style: {},
  caption: 'You have to live with the notion of, if I don't write this, no one's going to write it. If I die, this idea dies with me.',
  credit: 'Lin-Manuel Miranda',
  variant: 'left',
  quoteStyle: {},
  creditStyle: {},
  hangingQuotation: true,
}
```



## Section

> type为'full-bleed'的LayoutContainer容器



## Slideshow

> slider组件

| 属性名             | 类型      | 描述                                       |
| --------------- | ------- | ---------------------------------------- |
| className       | string  | 类名                                       |
| dotColor        | string  | 下方点点的颜色                                  |
| arrowColor      | string  | 箭头颜色                                     |
| backgroundColor | string  | slider区域背景色（bug：会把左右两侧的slide遮挡）          |
| hasOpacity      | boolean | 非当前激活slide的是否不可见（bug：如果有多个slider，并且值不同，会永远显示） |
| slickSettings   | object  | slick配置对象                                |
| children        | node    | 每一个子节点就是一个slide页                         |

**默认值**

```json
{
  hasOpacity: false,
  backgroundColor: "transparent",
  arrowColor: "#ffffff",
  slickSettings: {
    "dots": true,
    "infinite": true,
    "centerMode": true,
    "centerPadding": "11.7%",
    "slidesToShow": 1,
    "responsive": [{
      "breakpoint": 539,
      "settings": {
        // Note: don't disable centerMode; see Slideshow.scss for more details
        "centerPadding": "0px"
      }
    }]
  }
}
```



## VideoPlayer

> 视频组件
>
> 配置属性为所有vhs初始化参数，在此只列出部分

| 属性名      | 类型      | 描述                                   |
| -------- | ------- | ------------------------------------ |
| id       | string  | 必须字段，唯一标志                            |
| autoplay | boolean | 是否自动播放                               |
| poster   | string  | 视频封面                                 |
| source   | object  | 视频资源，需要'video/webm'和'video/mp4'两个属性值 |
| duration | number  | ？                                    |

```react
<VideoPlayer
  id="background-video-container"
  poster={require(`../../${props.data.post}`)}
  source={props.data.source}
  controls={false}
  autoplay={true}
  loop={true}
  nativePoster={true}
/>
```