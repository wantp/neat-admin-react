import {request} from 'umi';
import {QueryListParams, AddParams, UpdateParams} from "@/pages/Neat/Role/data";

export async function queryList(params?: QueryListParams) {
  return request('/api/admin/neat/roles', {
    params
  });
}

export async function queryAll() {
  return request('/api/admin/neat/roles', {
    params: {pageSize: -1}
  });
}

export async function queryOne(id: number) {
  return request(`/api/admin/neat/roles/${id}`);
}

export async function add(params: AddParams) {
  return request('/api/admin/neat/roles', {
    method: 'POST',
    data: params,
  });
}

export async function update(id: number, params: UpdateParams) {
  return request(`/api/admin/neat/roles/${id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function remove(id: number) {
  return request(`/api/admin/neat/roles/${id}`, {
    method: 'delete',
  });
}
