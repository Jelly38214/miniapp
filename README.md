# 原生小程序辅助功能 

- [x] 使用iconfont, 具体配置查看src下的iconfont目录文件

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