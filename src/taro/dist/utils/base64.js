'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* UTF16和UTF8转换对照表
* U+00000000 – U+0000007F 	0xxxxxxx
* U+00000080 – U+000007FF 	110xxxxx 10xxxxxx
* U+00000800 – U+0000FFFF 	1110xxxx 10xxxxxx 10xxxxxx
* U+00010000 – U+001FFFFF 	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
* U+00200000 – U+03FFFFFF 	111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
* U+04000000 – U+7FFFFFFF 	1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
*/
//外部js引用时这样写：import {Base64} from '/xxx/base64';//路径需要根据实际路径去写
exports.default = {
  // 转码表
  tables: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'],
  UTF16ToUTF8: function UTF16ToUTF8(str) {
    var results = [],
        len = str.length;
    for (var i = 0; i < len; i++) {
      var code = str.charCodeAt(i);
      if (code > 0x0000 && code <= 0x007F) {
        /* 一字节，不考虑0x0000，因为是空字节
           U+00000000 – U+0000007F 	0xxxxxxx
        */
        results.push(str.charAt(i));
      } else if (code >= 0x0080 && code <= 0x07FF) {
        /* 二字节
           U+00000080 – U+000007FF 	110xxxxx 10xxxxxx
           110xxxxx
        */
        var byte1 = 0xC0 | code >> 6 & 0x1F;
        // 10xxxxxx
        var byte2 = 0x80 | code & 0x3F;
        results.push(String.fromCharCode(byte1), String.fromCharCode(byte2));
      } else if (code >= 0x0800 && code <= 0xFFFF) {
        /* 三字节
           U+00000800 – U+0000FFFF 	1110xxxx 10xxxxxx 10xxxxxx
           1110xxxx
        */
        var _byte = 0xE0 | code >> 12 & 0x0F;
        // 10xxxxxx
        var _byte2 = 0x80 | code >> 6 & 0x3F;
        // 10xxxxxx
        var byte3 = 0x80 | code & 0x3F;
        results.push(String.fromCharCode(_byte), String.fromCharCode(_byte2), String.fromCharCode(byte3));
      } else if (code >= 0x00010000 && code <= 0x001FFFFF) {
        // 四字节
        // U+00010000 – U+001FFFFF 	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
        // 五字节
        // U+00200000 – U+03FFFFFF 	111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
      }
    }

    return results.join('');
  },
  UTF8ToUTF16: function UTF8ToUTF16(str) {
    var results = [],
        len = str.length;
    for (var i = 0; i < len; i++) {
      var code = str.charCodeAt(i);
      // 第一字节判断
      if ((code >> 7 & 0xFF) == 0x0) {
        // 一字节
        // 0xxxxxxx
        results.push(str.charAt(i));
      } else if ((code >> 5 & 0xFF) == 0x6) {
        // 二字节
        // 110xxxxx 10xxxxxx
        var code2 = str.charCodeAt(++i);
        var byte1 = (code & 0x1F) << 6;
        var byte2 = code2 & 0x3F;
        var utf16 = byte1 | byte2;
        results.push(String.fromCharCode(utf16));
      } else if ((code >> 4 & 0xFF) == 0xE) {
        // 三字节
        // 1110xxxx 10xxxxxx 10xxxxxx
        var _code = str.charCodeAt(++i);
        var code3 = str.charCodeAt(++i);
        var _byte3 = code << 4 | _code >> 2 & 0x0F;
        var _byte4 = (_code & 0x03) << 6 | code3 & 0x3F;
        var _utf = (_byte3 & 0x00FF) << 8 | _byte4;
        results.push(String.fromCharCode(_utf));
      } else if ((code >> 3 & 0xFF) == 0x1E) {
        // 四字节
        // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      } else if ((code >> 2 & 0xFF) == 0x3E) {
        // 五字节
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
      }
    }

    return results.join('');
  },
  encode: function encode(str) {
    if (!str) {
      return '';
    }
    var utf8 = this.UTF16ToUTF8(str); // 转成UTF-8
    var i = 0; // 遍历索引
    var len = utf8.length;
    var results = [];
    while (i < len) {
      var c1 = utf8.charCodeAt(i++) & 0xFF;
      results.push(this.tables[c1 >> 2]);
      // 补2个=
      if (i == len) {
        results.push(this.tables[(c1 & 0x3) << 4]);
        results.push('==');
        break;
      }
      var c2 = utf8.charCodeAt(i++);
      // 补1个=
      if (i == len) {
        results.push(this.tables[(c1 & 0x3) << 4 | c2 >> 4 & 0x0F]);
        results.push(this.tables[(c2 & 0x0F) << 2]);
        results.push('=');
        break;
      }
      var c3 = utf8.charCodeAt(i++);
      results.push(this.tables[(c1 & 0x3) << 4 | c2 >> 4 & 0x0F]);
      results.push(this.tables[(c2 & 0x0F) << 2 | (c3 & 0xC0) >> 6]);
      results.push(this.tables[c3 & 0x3F]);
    }

    return results.join('');
  },
  decode: function decode(str) {
    //判断是否为空
    if (!str) {
      return '';
    }

    var len = str.length;
    var i = 0;
    var results = [];
    //循环解出字符数组
    while (i < len) {
      var code1 = this.tables.indexOf(str.charAt(i++));
      var code2 = this.tables.indexOf(str.charAt(i++));
      var code3 = this.tables.indexOf(str.charAt(i++));
      var code4 = this.tables.indexOf(str.charAt(i++));

      var c1 = code1 << 2 | code2 >> 4;
      results.push(String.fromCharCode(c1));

      if (code3 != -1) {
        var c2 = (code2 & 0xF) << 4 | code3 >> 2;
        results.push(String.fromCharCode(c2));
      }
      if (code4 != -1) {
        var c3 = (code3 & 0x3) << 6 | code4;
        results.push(String.fromCharCode(c3));
      }
    }

    return this.UTF8ToUTF16(results.join(''));
  }
};