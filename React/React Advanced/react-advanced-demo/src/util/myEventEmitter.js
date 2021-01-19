export default class myEventEmitter {

    constructor() {
        this.eventMap = {};
    }

    //订阅 注册事件
    on(type, handler) {
        if (!(handler instanceof Function)) {
            throw new Error('请传一个函数');
        }

        if (!this.eventMap[type]) {
            this.eventMap[type] = [];
        }
        this.eventMap[type].push(handler);
    }

    //发布 触发事件
    emit(type, params) {
        if (this.eventMap[type]) {
            this.eventMap[type].forEach(handler => handler(params));
        }
    }

    off(type, handler) {
        if (this.eventMap[type]) {
            this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);
        }
    }
}