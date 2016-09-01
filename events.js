/**
 * @author bh-lay
 * util.events;
 * @github https://github.com/bh-lay/events
 * @modified 2014-5-8 9:55
 * var evevts = new util.events();
 * events.on('ready',function(){
 * 	//do something
 * });
 * events.emit('ready',[args[0],args[1],args[2]]);
 * 
 * or
 * //For your own object extend event
 * util.events.extend(this);
 * 
 */


(function(global,factoryFn){
	var factory = factoryFn();
	
	global.util = global.util || {};
	global.util.events = factory.events;
	global.util.events.extend = factory.extend;
})(window,function(exports){

	//处理自定义事件
	function ON(eventName,callback){
		this._events = this._events || {};
		//事件堆无该事件，创建一个事件堆
		if(!this._events[eventName]){
			this._events[eventName] = [];
		}
		this._events[eventName].push(callback);
		//提供链式调用的支持
		return this;
	}
	function EMIT(eventName,args){
		this._events = this._events || {};
		//事件堆无该事件，结束运行
		if(!this._events[eventName]){
			return
		}
		for(var i=0,total=this._events[eventName].length;i<total;i++){
			this._events[eventName][i].apply(this._event_global || this,args);
		}
	}
	//继承
	function EXTEND( global ){
		global._events = {};
		global.on = ON;
		global.emit = EMIT;
	}
	function EVENTS( global ){
		this._events = {};
		this._event_global = global || null;
	}
	EVENTS.prototype = {
		on : ON,
		emit : EMIT
	};
	
	return {
		events : EVENTS,
		extend : EXTEND
	};
});
