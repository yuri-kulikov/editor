import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

export default function cx(...args) {
  const classes: string[] = [];

  for (const arg of args) {
    if (isString(arg)) {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(cx(...arg));
    } else if (isObject(arg)) {
      classes.push(cx(...Object.keys(arg).filter(k => arg[k])));
    }
  }

  return classes.join(' ');
}
