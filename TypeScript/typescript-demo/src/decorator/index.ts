/**
 * 类装饰器
 * @param constructor
 */
function classDecorator(constructor: Function) {
    console.log('classDecorator constructor', constructor);
    console.log('classDecorator constructor prototype', constructor.prototype);
}

/**
 * 类装饰器
 * @param parameter
 */
function sealed(parameter: string) {
    console.log('sealed');
    return function (constructor: Function) {
        //target:类的构造函数
        console.log('sealed parameter', parameter);
        console.log('sealed constructor', constructor);
    }
}

/**
 * 类装饰器
 * @param parameter
 */
function classDecorator2(parameter: string) {
    console.log('classDecorator2');
    return function (constructor: Function) {
        console.log('classDecorator2 parameter', parameter);
        console.log('classDecorator2 constructor', constructor);
    }
}

/**
 * 方法装饰器
 * @param parameter
 */
function enumerable(parameter: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('enumerable parameter', parameter);
        console.log('enumerable target', target);
        console.log('enumerable propertyKey', propertyKey);
        console.log('enumerable descriptor', descriptor);
    }
}

/**
 * 属性装饰器
 * @param parameter
 */
function format(parameter: string) {
    return function (target: any, propertyKey: string) {
        console.log('format parameter', parameter);
        console.log('format target', target);
        console.log('format propertyKey', propertyKey);
    }
}

/**
 * 方法参数装饰器
 * @param parameter
 */
function logParams(parameter: any) {
    return function (target: any, propertyKey: any, index: any) {
        console.log('logParams parameter', parameter);
        console.log('logParams target', target);
        console.log('logParams propertyKey', propertyKey);
        console.log('logParams index', index);
    }
}

/**
 * 访问器装饰器
 * @param parameter
 */
function configurable(parameter: boolean) {
    return function (target: any, propertyKey: string) {
        console.log('configurable parameter', parameter);
        console.log('configurable target', target);
        console.log('configurable propertyKey', propertyKey);
    }
}

// @classDecorator
@sealed('greeter')
@classDecorator2('classDecorator')
export class Greeter {
    // @format("Hello")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    // @configurable(false)
    get x() {
        return this.greeting;
    }

    // @enumerable(false)
    greet(name: any) {
        return `Hello,  ${name}`;
    }
}