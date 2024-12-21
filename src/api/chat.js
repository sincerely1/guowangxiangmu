import request from '@/utils/request.js';
export const Chatresponse = async (key) => {
  return request({
    url: '/chat',
    method: 'post',
    data: key,
  });
};
