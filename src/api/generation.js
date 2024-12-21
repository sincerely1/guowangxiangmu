import request from '@/utils/request.js';
export const Genresponse = async (key) => {
  return request({
    url: '/generation',
    method: 'post',
    data: key,
  });
};
