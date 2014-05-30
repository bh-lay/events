events
======

#1.events是什么
enevts是一个简单的pub/sub模型，可用于对象事件拓展，也可独立作为事件发布接收源。

#2.如何使用
##2.1拓展对象
```javascript
/**
 *这是你自己的类 
 */
 function myClass(){
    var me = this;
    //继承事件机制
    util.events.extend.call(this);
    
    
    setInterval(function(){
        //主动触发某个事件
        me.emit('refresh');
    },2000);
 }
 
 //使用
 var newC = new myClass();
 //监听事件
 newC.on('refresh',function(){
    //do somthing
 });
 
```

##2.2以事件源的形式使用
```javascript
//创建事件源
var eventsCenter = new util.events();
//监听某个事件
eventsCenter.on('add',function(){
    //do something
});
//主动触发自定义事件
eventsCenter.emit('add');

```
