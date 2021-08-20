export const resetObject = (object: any): object | any =>  Object.keys(object).map(key => object[key] === null)
