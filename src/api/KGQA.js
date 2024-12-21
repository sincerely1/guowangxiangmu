import request from '@/utils/request.js';
export const KGQAresponse = async (key) => {
  return request({
    url: '/KGQA',
    method: 'post',
    data: key,
  });
};
