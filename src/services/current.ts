import { request } from 'umi';


export async function queryCurrent() {
  return request<API.CurrentUser>('/api/admin/current');
}

export async function queryCurrentMenus() {
  return request<API.Menu[]>('/api/admin/current/menus');
}
