import request from '@/utils/request.js';
export const searchwork = async (key) => {
  return request({
    url: '/search',
    method: 'post',
    data: key,
  });
};

export const searchentity = async () => {
  return request({
    url: '/searchEntity',
    method: 'get',
  });
};
