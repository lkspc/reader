/* eslint-disable import/prefer-default-export */
import Taro from '@tarojs/taro';

export function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export const env = Taro.getEnv();
export const isWeb = env === Taro.ENV_TYPE.WEB;
export const isRN = env === Taro.ENV_TYPE.RN;
export const isWA = env === Taro.ENV_TYPE.WEAPP;

export function decodeURI(str) {
  return typeof decodeURIComponent === 'undefined'
    ? str
    : decodeURIComponent(str);
}

export function encodeURI(str) {
  return typeof encodeURIComponent === 'undefined'
    ? str
    : encodeURIComponent(str);
}

export function noop() {}
