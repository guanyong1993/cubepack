# CubePack 模块化打包工具


## 安装

```sh
$ npm install --save-dev cubepack
```

## 打包你的项目

```sh
$ cubepack ./
```

## 配置项

#### 为了简化流程, cubepack 直接将配置项集成在项目的 package.json 中

```json
    {
      "name": "myapp",
      "cubepack": {
        "namespace": "MyApp",
        "compatible": false,
        "minify": true
      }
    }
```

#### 配置项属性

- namespace `String` - 模块命名空间
- compatible `Boolean` - 是否启用兼容模式，开启兼容模式会将代码转换为 ES5，默认关闭
- minify `Boolean` - 是否启用代码压缩，默认启用
