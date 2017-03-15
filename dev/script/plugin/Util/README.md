# Util 实用工具

> 全都是静态方法

## **Dom类**

| 名称                    | 描述                                      |
| --------------------- | --------------------------------------- |
| parseDom(str)         | 将字符串转换为dom元素                            |
| closest(el, selector) | 获取元素el的祖先节点，不存在则为null，同jquery的closest方法 |
| inViewWhole(el)       | 判断元素el是否完全显示在窗口中                        |
| inViewPartial(el)     | 判断元素el是否部分显示在窗口中                        |



## **String类**

| 名称                           | 描述                            |
| :--------------------------- | ----------------------------- |
| substringByWord(str, length) | 将字符串str截断到指定length前最近的一个完整单词处 |



## **Array类**

| 名称                           | 描述                      |
| ---------------------------- | ----------------------- |
| indexOf(el, collection)      | 获取元素el在集合collection中的下标 |
| sortObjArrByKey(objArr, key) | 将对象数组objArr按给定的键key排序   |



## **Event类**

| 名称                                | 描述                                       |
| --------------------------------- | ---------------------------------------- |
| triggerEvent(el, eventName, data) | 在el元素上触发eventName事件，并传递事件参数data到e.detail |



## **Social类**

| 名称                   | 描述                                       |
| -------------------- | ---------------------------------------- |
| shareFacebook(opts)  | 分享到facebook（对象参数：app_id，link，picture，name，description，redirect_uri） |
| shareTwitter(opts)   | 分享到twitter（对象参数：text，href）               |
| sharePinterest(opts) | 分享到pinterest（对象参数：url，media，description） |



## Performance类

| 名称                   | 描述                       |
| -------------------- | ------------------------ |
| throttle (fn,  wait) | 在指定的wait（ms）时间内，只能触发一次fn |