import {request} from 'umi';
import {QueryListParams, AddParams, UpdateParams} from "@/pages/Neat/Menu/data";


export async function queryTree() {
  return request('/api/admin/neat/menus/tree');
}

export async function queryList(params?: QueryListParams) {
  return request('/api/admin/neat/menus', {
    params
  });
}

export async function queryOne(id: number) {
  return request(`/api/admin/neat/menus/${id}?include=roles`);
}

export async function add(params: AddParams) {
  return request('/api/admin/neat/menus', {
    method: 'POST',
    data: params,
  });
}

export async function update(id: number, params: UpdateParams) {
  return request(`/api/admin/neat/menus/${id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function updateSort(params:any){
  return request(`/api/admin/neat/menus/updateOrder`, {
    method: 'PUT',
    data: {
      tree:params
    },
  });
}

export async function remove(id: number) {
  return request(`/api/admin/neat/menus/${id}`, {
    method: 'delete',
  });
}
