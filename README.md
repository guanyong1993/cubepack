# CubePack


一个轻量级的 Javascript 模块管理工具。

没有繁琐的配置过程，只需三步，你就可以快速的打包你的项目了。

## 安装

```sh
$ npm install --save-dev cubepack
```

## 打包你的项目

添加命令项到你的 package.json 中
```json
    {
      "scripts": {
        "build": "cubepack ./"
      }
    }
```
运行打包命令
```sh
$ npm run build
```

## 配置项

#### 为了简化流程, cubepack 直接将配置项集成在项目的 package.json 中

```json
{
  "name": "myapp",
  "cubepack": {
    "namespace": "MyApp",
    "compatible": false,
    "minify": false
  }
}
```

#### 配置项属性

- namespace `String` - 模块命名空间，用于浏览器环境下的全局变量，若用于 require 导入可不设置此项
- compatible `Boolean` - 是否启用兼容模式，开启兼容模式会将代码转换为 ES5，默认关闭
- minify `Boolean` - 是否启用代码压缩，默认启用


#### 示例应用
- foo.js
    ```javascript
    export class Foo {
        static get text() {
            return 'Hello ';
        }
    }
    ```

- bar.js
    ```javascript
    export default {
        text: 'World'
    }
    ```

- index.js
    ```javascript
    import {Foo} from "./foo";
    import Bar from "./bar"

    const text = Foo.text + Bar.text;
    console.log(text);      // print "Hello World"
    ```


#### 输出文件
- myapp.js

    ```javascript
    class Foo {
        static get text() {
            return 'Hello ';
        }
    }
    const Bar = {
        text: 'World'
    };
    const text = Foo.text + Bar.text;
    console.log(text);      // print "Hello World"
    ```
