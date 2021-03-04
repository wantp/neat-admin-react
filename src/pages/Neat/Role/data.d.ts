export interface Role {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
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
  name?: string;
  description?: string;
}

export interface AddParams extends UpdateParams {}
