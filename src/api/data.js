import request from '@/utils/request.js';
export const getAlldata = () => {
  return request({
    url: '/dataIndex',
    method: 'get',
  });
};