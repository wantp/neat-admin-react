export interface Menu {
  key?: string | number;
  id: number;
  parent_id?: number;
  name: string;
  icon?: string;
  children: MenuItem[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  title?: string;
  value?: string | number;
  level?: number;
}

export interface QueryListParams {
  id?: string;
  name?: string;
  page?: number;
  pageSize?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface UpdateParams {
  parent_id?: number;
  name?: string;
  path?: string;
}

export interface AddParams extends UpdateParams {}
