events
======

# 1. events是什么
enevts是一个简单的pub/sub模型，可用于对象事件拓展，也可独立作为事件发布接收源。

# 2. 如何使用
可以单独使用events作为事件源，用于发布、订阅事件，也可将events扩展至你自己的类、模块上。

## 2.1 以事件源的形式使用

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

## 2.2 拓展已有对象
扩展对象时要避免使用 `_events`、'on'、'un'、'emit' 这四个字段，避免引起不必要的冲突。

### 2.2.1 拷贝继承式

```javascript
/**
 * 这是你自己的类 
 **/
function myClass(){
    var me = this;
    // 继承事件
    util.events.extend( this );
    
    setInterval(function(){
        // 主动触发刷新事件
        me.emit('refresh');
    }, 2000);
}
 
// 实例化自己的类
var newclass = new myClass();
// 监听刷新事件
newclass.on('refresh',function(){
    // do somthing
});
```

### 2.2.2 原型链式

```javascript
/**
 * 这是你自己的类 
 **/
function myClass(){
    var me = this;

    setInterval(function(){
        //主动触发某个事件
        me.emit('refresh');
	},2000);
}
// 创建原型对象
myClass.prototype = new util.events();

// 实例化自己的类
var newclass = new myClass();
// 监听刷新事件
newclass.on('refresh',function(){
	// do somthing
});
 
```
