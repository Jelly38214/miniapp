
export interface IUserStore {
  /** 用户数组 */
  userArray: IUserItem[];

  /** 获取用户数组 */
  getUsers: () => Promise<boolean>;
}

/** 用户模型 */
export interface IUserItem {
  gender: string;
  phone: string;
  location: {
    city: string;
    state: string;
    street: string;
  }
  name: {
    first: string;
    last: string;
    title: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  }
}