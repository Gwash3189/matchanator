export const func = (f: Function) => typeof f === 'function'
export const string = (s: string) => typeof s === 'string'
export const number = (n: number) => typeof n === 'number'
export const array = (a: any) => Array.isArray(a)
export const object = (o: object) => typeof o === 'object' && !array(o)
export const emptyArray = <T>(a :Array<T | any>) => array(a) && a.length === 0
export const not = (f: Function) => (x: any) => !f(x)
export const or = <T>(...ts: Array<Function>) => (v: T) => ts.some(t => t(v))
export const nil = (x: null | undefined) => x === null || x === undefined
export const any = () => true
