import request from '@/utils/request.js';
export const graphwork = async (key) => {
  return request({
    url: '/newgraph',
    method: 'post',
    data: key,
  });
};