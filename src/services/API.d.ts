declare namespace API {
  export interface CurrentUser {
    id?: number;
    username?: string;
    nickname?: string;
    avatar?: string;
    last_login_ip?: string;
    last_login_time?: string;
    created_at?: string;
    updated_at?: string;
    roles?: [];
    message?: string;
  }

  export interface LoginStateType {
    access_token?: string;
    token_type?: string;
    expires_at?: string;
    message?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }

  export interface Menu {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
