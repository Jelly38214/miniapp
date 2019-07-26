import { observable, action } from 'mobx'
import { IUserStore } from './user.interface';
import * as Api from '@/api';

class UserStore implements IUserStore {
  @observable userArray: IUserStore['userArray'] = [];

  @action getUsers = async () => {
    try {
      this.userArray = await Api.getUsers<IUserStore['userArray']>();
    } catch (error) {
      console.warn(error);
      return false;
    }
    return true;
  }
}

export default new UserStore();