import { request } from 'umi';
import { QueryListParams, AddParams, UpdateParams } from '@/pages/Neat/User/data';

export async function queryList(params?: QueryListParams) {
  return request('/api/admin/neat/users', {
    params: {
      include: 'roles',
      ...params,
    },
  });
}

export async function queryOne(id: number) {
  return request(`/api/admin/neat/users/${id}`);
}

export async function add(params: AddParams) {
  return request('/api/admin/neat/users', {
    method: 'POST',
    data: params,
  });
}

export async function update(id: number, params: UpdateParams) {
  return request(`/api/admin/neat/users/${id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function remove(id: number) {
  return request(`/api/admin/neat/users/${id}`, {
    method: 'delete',
  });
}
