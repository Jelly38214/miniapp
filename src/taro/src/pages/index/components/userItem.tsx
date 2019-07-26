import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { IUserItemProps } from '@/pages/index/index.interface';
import './userItem.less';

export default (props: IUserItemProps) => {
  const user = props.user;
  return (
    <View className="home-component-useritem-container">
      <Image className="user-pic" src={user.picture.medium} />
      <View className="user-info-wrapper">
        <Text className="user-name info-item">{`${user.name.first} ${user.name.last}`}</Text>
        <Text className="user-gender info-item">{user.gender}</Text>
        <Text className="user-phone info-item">{user.phone}</Text>
        <Text className="user-address info-item">{`${user.location.state} ${user.location.city} ${user.location.street}`}</Text>
      </View>
    </View>
  )
}