import { EAllStore } from '@/store/index.interface';
import { IUserStore, IUserItem } from '@/store/user.interface';

export interface IPageIndexProps {
  [EAllStore.UserStore]: IUserStore;
}


/** 组件interface */
export interface IUserItemProps {
  user: IUserItem;
}