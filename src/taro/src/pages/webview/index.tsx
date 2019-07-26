import Taro from '@tarojs/taro';
import { WebView } from '@tarojs/components';

class WebViewPage extends Taro.Component {
  public render() {
    const url = decodeURIComponent(this.$router.params.url);
    console.log('url', url);
    return (
      <WebView src={url} />
    )
  }
}

export default WebViewPage;
