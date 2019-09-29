import { authHeader, request } from '@/helpers';

function getAll(path) {
  return request({
    url: `/${path}`,
    method: 'GET',
    headers: authHeader(),
  });
}

function getById(id, path) {
  return request({
    url: `/${path}/${id}`,
    method: 'GET',
    headers: authHeader(),
  });
}

function list(params = {}, path) {
  return request({
    url: `/${path}`,
    method: 'GET',
    headers: authHeader(),
    params,
  });
}

const commonService = {
  getAll,
  getById,
  list,
};

export { commonService };
