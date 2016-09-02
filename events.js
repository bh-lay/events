/**
 * @author bh-lay
 * util.events;
 * @github https://github.com/bh-lay/events
 * @modified 2016-9-1 18:43
 * 
 */


(function(global,factoryFn){
	var factory = factoryFn();
	
	global.util = global.util || {};
	global.util.events = factory.events;
	global.util.events.extend = factory.extend;
})(window,function(exports){
	function isNotEmptyString( input ){
		return typeof( input ) === 'string' && input.length > 0
	}
	function isFunction( input ){
		return typeof( input ) === 'function'
	}
	//监听自定义事件
	function ON( eventName, callback ){
		this._events = this._events || {};

		if( isNotEmptyString( eventName ) && isFunction( callback ) ){
			//事件堆无该事件，创建一个事件堆
			this._events[eventName] = this._events[eventName] || [];
			// 追加至事件列表
			this._events[eventName].push( callback );
		}
		//提供链式调用的支持
		return this;
	}
	//解除自定义事件监听
	function UN( eventName, callback ){
		var eventList = ( this._events || {} )[eventName];
		//事件堆无该事件队列，或未传入事件名结束运行
		if( !eventList || !isNotEmptyString( eventName ) ){
			return
		}
		// 若未传入回调参数，则直接置空事件队列
		if( !isFunction( callback ) ){
			eventList = [];
		}else{
			// 逆序遍历事件队列
			for( var i = eventList.length-1; i!=-1; i-- ){
				// 回调相同，移除当前项
				if( eventList[i] == callback ){
					eventList.splice(i,1);
				}
			}
		}
		//提供链式调用的支持
		return this;
	}
	// 主动触发自定义事件
	function EMIT( eventName ){
		// 获取除了事件名之外的参数
		var args = Array.prototype.slice.call( arguments, 1, arguments.length );
		this._events = this._events || {};
		//事件堆无该事件，结束运行
		if(!this._events[eventName]){
			return
		}
		for(var i=0,total=this._events[eventName].length;i<total;i++){
			this._events[eventName][i].apply( this._event_global || this, args );
		}
	}
	//继承
	function EXTEND( global ){
		global._events = {};
		global.on = ON;
		global.un = UN;
		global.emit = EMIT;
	}
	function EVENTS( global ){
		this._events = {};
		this._event_global = global || null;
	}
	EVENTS.prototype = {
		on : ON,
		un: UN,
		emit : EMIT
	};
	
	return {
		events : EVENTS,
		extend : EXTEND
	};
});
