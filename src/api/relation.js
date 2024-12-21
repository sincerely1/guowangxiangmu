import request from '@/utils/request.js';
export const getdata = () => {
  return request({
    url: '/index',
    method: 'get',
  });
};
export const get3ddata = () => {
  return request({
    url: '/3dPageData',
    method: 'get',
  });
};