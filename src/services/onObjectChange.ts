'use strict';
/**
 * 
 * @param object 
 * @param onChange
 * 
 * let j = {
 *   a: 1
 *  };
 * 
 * // Upon change, save to server
 * let changeable = onChange(j, () => save(j));
 * 
 * // Make a change that would trigger changes
 * changeable.a = 2;
 * 
 * // save() is triggered!
 * // j.a === 2 
 */

export function onChange(object: any, onChange: Function) {
  const handler = {
    get(target, property, receiver) {
      try {
        return new Proxy(target[property], handler);
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    defineProperty(target, property, descriptor) {
      onChange();
      return Reflect.defineProperty(target, property, descriptor);
    },
    deleteProperty(target, property) {
      onChange();
      return Reflect.deleteProperty(target, property);
    }
  };

  return new Proxy(object, handler);
};