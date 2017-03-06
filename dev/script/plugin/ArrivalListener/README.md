# ArrivalListener 出入场监听

> 🚧 WIP



## **初始化**

```javascript
new ArrivalListener({
  // options
});
```



## **初始化参数**

| 参数                   | 类型         | 默认值  | 描述             |
| -------------------- | ---------- | ---- | -------------- |
| el                   | dom        | null | 需要监听的元素（必须）    |
| offsetTopEnterBottom | number（px） | 0    | 元素顶部进入屏幕底部的偏移量 |
| offsetTopLeaveBottom | number（px） | 0    | 元素顶部离开屏幕底部的偏移量 |
| offsetBottomReachTop | number（px） | 0    | 元素底部到达屏幕顶部的偏移量 |
| onTopEnterBottom     | number（px） | 0    | 元素顶部进入屏幕底部时触发  |
| onTopLeaveBottom     | function   | null | 元素顶部离开屏幕底部时触发  |
| onBottomEnterTop     | function   | null | 元素底部进入屏幕顶部时触发  |
| onBottomLeaveTop     | function   | null | 元素底部离开屏幕顶部时触发  |