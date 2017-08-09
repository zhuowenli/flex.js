# flex.js

移动端像素级还原设计稿解决方案。

## 使用方法

1. 复制 `flex.min.js` 的代码，插入 `head` 头部。

```html
<html>
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>flex.js</title>
    <script>
    !function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}({2:function(e,t,n){"use strict";function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2,i=window.document,r=navigator.userAgent,o=r.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),a=r.match(/U3\/((\d+|\.){5,})/i),u=a&&parseInt(a[1].split(".").join(""),10)>=80,c=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),l=window.devicePixelRatio||1;c||o&&o[1]>534||u||(l=1);var d=1/l,p=i.querySelector('meta[name="viewport"]');p||(p=i.createElement("meta"),p.setAttribute("name","viewport"),i.head.appendChild(p)),p.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+d+",maximum-scale="+d+",minimum-scale="+d),i.documentElement.style.fontSize=e/n*l*t+"px"}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i,window.flex=i}});
    </script>
    <script>window.flex(32, 1)</script>
    <link rel="stylesheet" href="./dist/app.min.css">
</head>
<body>
</body>
</html>
```

2. webpack 引入 `postcss-loader`

```js
{
    test: /\.(scss|sass)$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: { minimize: true, importLoaders: true },
            },
            {
                loader: 'postcss-loader'
            },
            { loader: 'sass-loader', options: { sourceMap: true } },
        ],
    }),
},
```

3. postcss 引用 `postcss-pxtorem` 插件

```js
module.exports = {
    plugins: [
        require('autoprefixer')({
            remove: false,
            browsers: ['iOS >= 7', 'Android >= 4.1']
        }),
        require('postcss-pxtorem')({
            rootValue: 32,
            selectorBlackList: ['html'],
            minPixelValue: 1,
            propWhiteList: ['*']
        })
    ]
};
```

## param

* @param {number} [baseFontSize=100] 基础fontSize, 默认100px;
* @param {number} [fontscale=1] 有的业务希望能放大一定比例的字体;
* @param {number} [baseDpr=2] 设计稿默认dpr;
