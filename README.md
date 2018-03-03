# Vue-template   [![Build Status](https://travis-ci.org/csywweb/Vue-template.svg?branch=master)](https://travis-ci.org/csywweb/Vue-template)

> 一个vue的单页项目模板,扩展了vue-cli,增加常用配置项:car:

1. 添加scss的编译，并且自动补全前缀
2. 添加FontAwesome
3. 添加ElementUI
4. 添加了vuex状态管理
5. 使用Karma进行单元测试

## 项目结构
``` bash
    template
      |---build
      |---config
      |---node_modules
      |---src
        |---assets 资源
        |---components 组件
        |---router 路由
        |---store 状态管理
        |---model 工具类
        |---App.vue 
        |---main.js
      |---static 静态文件
      |---test  测试
      |---.babelrc 
      |---.gitignore
      |---.postcssrc.js
      |---.travis.yml CL工具
      |---index.html 入口页面
      |---package.json 项目配置
      |---README.md
        
```


## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
