/**
 * 设计一个事件总线工具, 可以是 class 或者 非 class 的形式。有基本的监听、卸载监听、多重监听、触发等基本功能，可以传递参数。
 * 
 * Took 13 min
 */


class Bus {
    constructor() {
        this.tasks = {};
    };
    trigger(name, args) {
        if(!this.tasks) {
            return;
        }
        console.log(this.tasks)
        this.tasks[name].forEach(f => f(args))
    };
    listen(name, fn) {
        if(!this.tasks[name]) {
            this.tasks[name] = [];
        }
        this.tasks[name].push(fn);
    };
    remove(name, fn) {
        const tasks = this.tasks[name];

        if(!tasks || tasks.length === 0) {
            console.warn('事件不存在')
            return;
        }

        this.tasks[name] = tasks.filter(cb => fn !== cb);
        console.log(this.tasks)
    };
}

const event = new Bus();

const test = value => console.log(`Test: ${value}`)
const test1 = value => console.log(`Test1:${value}`)

event.listen('event', test)
event.listen('event', test1)
event.trigger('event', 'This is event')
// event.off('event', test)
// event.off('event', test1)
event.trigger('event', 'Removed?')
