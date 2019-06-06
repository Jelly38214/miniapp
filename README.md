# 原生小程序辅助功能 

- [x] 使用iconfont, 具体配置查看src下的iconfont目录文件 
- [x] 使用less, 具体配置查看src下的iconfont目录gulp文件

### iconfont的使用

1. 把下载好的iconfont放置到根目录`/fonts`下面，允许gulp，生成svg并注入全局`app.acss`或`app.wxss`

2.使用方式：
```html
  <!-- iconfont -->
  <icon class="iconfont 你的iconfont的图标的类名" />
  
  <!-- svg的方式 -->
  <svg class="svg svg-你的iconfont的图标的类名" /> (微信)
  <icon class="svg svg-你的iconfont的图标的类名" /> (支付宝不支持svg标签)
```

3.对于自定义组件，需要配置(支付宝)
```javascript
  // 打开组件的js文件，配置
  Component({
    options: {
      addGlobalClass: true // 让自定义组件接受全局css的影响，获取到svg配置
    }
  }
```
4.注意事项

支付宝小程序中iconfont的大小诡异时，需要设置
```css
.a-icon-svg {
    display: none;
}
```

### less的使用

1. 启动gulp, npm start;
2. 声明一个和页面acss/wxss同名的less文件，然后在编写你的css，保存，gulp会自动监听变动然后编译成同名的acss/wxss 

### EventEmitter的使用

当你想得知app.globalData的某个数据变化，除了用Object.defineProperty来监听(这种方式，无法取消监听), 可以使用EventEmitter， globalData变化时，手动分发出一个事件，然后再在某处监听这个事件，来执行对应的业务逻辑。

用法：
   ```javascript
      import EventEmitter from 'src/eventemitter/eventemitter';
      const emitter = new EventEmitter();
      emitter.on('test', function(time) {console.log('now is: ', time)});
      setTimeout(() => {
        emitter.emit('test', Date.now());
      }2000)
   ```

支付宝自带了EventEmitter模块，但文档没有暴露出来,但你依旧可以这样用

```javascript
  import { EventEmitter } from 'events';
  const emitter = new EventEmitter();
```

参考：

  1. [文章1](https://www.cnblogs.com/chrissong/p/10341219.html)
  2. [文章2](http://menzhongxin.com/2017/05/03/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8FJS%E5%AE%9E%E7%8E%B0/)
  3. [文章3](https://www.jb51.net/article/137419.htm)