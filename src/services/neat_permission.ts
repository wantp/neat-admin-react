import {request} from 'umi';
import {QueryListParams, AddParams, UpdateParams} from "@/pages/Neat/Permission/data";

export async function queryList(params?: QueryListParams) {
  return request('/api/admin/neat/permissions', {
    params
  });
}

export async function queryTree() {
  return request('/api/admin/neat/permissions/tree');
}

export async function queryOne(id: number) {
  return request(`/api/admin/neat/permissions/${id}`);
}

export async function add(params: AddParams) {
  return request('/api/admin/neat/permissions', {
    method: 'POST',
    data: params,
  });
}

export async function update(id: number, params: UpdateParams) {
  return request(`/api/admin/neat/permissions/${id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function updateSort(params: any) {
  return request(`/api/admin/neat/permissions/updateOrder`, {
    method: 'PUT',
    data: {
      tree:params
    },
  });
}

export async function remove(id: number) {
  return request(`/api/admin/neat/permissions/${id}`, {
    method: 'delete',
  });
}
