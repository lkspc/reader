/* eslint-disable import/prefer-default-export */
import Taro from '@tarojs/taro';

export const env = Taro.getEnv();
export const isWeb = env === Taro.ENV_TYPE.WEB;
export const isRN = env === Taro.ENV_TYPE.RN;
export const isWA = env === Taro.ENV_TYPE.WEAPP;

export function decodeURI(str) {
  return typeof decodeURIComponent === 'undefined'
    ? str
    : decodeURIComponent(str);
}
