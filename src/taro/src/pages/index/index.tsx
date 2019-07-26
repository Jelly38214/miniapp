import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { IPageIndexProps } from '@/pages/index/index.interface';
import { EAllStore } from '@/store/index.interface';
import UserItem from '@/pages/index/components/userItem';

import './index.less';

@inject(EAllStore.UserStore)
@observer
class Index extends Component<IPageIndexProps> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  public readonly config: Config = {
    navigationBarTitleText: 'Taro模版'
  }

  public componentDidMount() {
    this.props.UserStore.getUsers(); // 请求接口获取用户
  }

  public render() {
    if (this.props.UserStore.userArray.length === 0) {
      return (<View>获取用户数据中....</View>)
    }

    return (
      <View className="page-home-container">
        {
          this.props.UserStore.userArray.map(item => {
            return (
              <UserItem user={item} key={item.phone} />
            )
          })
        }
      </View>
    )
  }

}

export default Index as ComponentType;
