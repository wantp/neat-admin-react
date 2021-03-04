export interface Permission {
  key?: string | number;
  title?: string;
  id: number;
  parent_id?: number;
  name: string;
  method: string[];
  slug: string;
  uri?: string;
  path?: string;
  value?: number | string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  children?: Permission[];
}

export interface QueryListParams {
  id?: number;
  name?: string;
  method?: string;
  uri?: string;
  page?: number;
  pageSize?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface UpdateParams {
  group_id?: number;
  name?: number;
  method?: string;
  uri?: string;
}

export interface AddParams extends UpdateParams {
}
