import { Item as RoleItem } from '@/pages/Neat/Role/data';

export interface User {
  id: number;
  username: string;
  nickname: string;
  is_admin: string;
  avatar: string;
  last_login_ip: string;
  last_login_time: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  roles: RoleItem[];
}

export interface QueryListParams {
  id?: string;
  username?: string;
  nickname?: string;
  is_admin?: number;
  page?: number;
  pageSize?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface UpdateParams {
  username?: string;
  nickname?: string;
  is_admin?: string;
  avatar?: string;
  password?: string;
  password_confirmation?: string;
}

export interface AddParams extends UpdateParams {
  username: string;
}
