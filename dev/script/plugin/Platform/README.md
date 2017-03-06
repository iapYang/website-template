# Platform 平台检测

> tip：引入后会自动对html标签添加相应class
>
> 若平台条件满足，则返回true，否则返回false
>
> 若检测结果为true，则添加className
>
> 若检测结果为false，则添加not-{className}；has-touch对应为no-touch

| 静态属性            | 类名            | 描述              |
| --------------- | ------------- | --------------- |
| isDesktop       | desktop       | 桌面浏览器           |
| isIE            | ie            | IE浏览器           |
| isIE11          | ie11          | IE11浏览器         |
| isEdge          | edge          | Edge浏览器         |
| isChrome        | chrome        | Chrome浏览器       |
| isFirefox       | firefox       | Firefox浏览器      |
| isSafari        | safari        | Safari浏览器       |
| isSamsungNative | samsungnative | 三星原生浏览器         |
| isTablet        | tablet        | 平板设备            |
| isiPad          | ipad          | iPad设备          |
| isAndroidPad    | androidpad    | Android平板设备     |
| isNexus7        | nexus7        | Google Nexus7设备 |
| isMobile        | mobile        | 手机设备            |
| isiPhone        | iphone        | iPhone设备        |
| isS4            | s4            | 三星S4设备          |
| isS5            | s5            | 三星S5设备          |
| isS6            | s6            | 三星S6设备          |
| isS7            | s7            | 三星S7设备          |
| isIOS           | ios           | IOS设备           |
| isAndroid       | android       | 安卓设备            |
| hasTouch        | has-touch     | 触摸屏设备           |
| isMac           | mac           | mac系统设备         |
| isWindows       | windows       | windows系统设备     |

