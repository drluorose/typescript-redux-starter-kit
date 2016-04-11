# typescript-redux-seed
使用Typescript编写Redux+React应用程序的种子程序


### 目录结构

```
typescript-redux-starter-kit

├── typings                 # Typescript 定义文件
├── static                  # 公用的静态文件和外部引用
├── src                     # 所有开始编码的地方
├─── app.tsx                # 应用入口
├─── routes.tsx             # 路由组件
├─── references.d.ts        # 项目内Typescript一般定义文件
├─── components             # 公共的控件和组件
├─── container              # 最外层的容器和开发调试工具
├─── helper                 # 一些公告的帮助方法和对服务端请求的封装
├─── pages                  # 所有页面级别的组件
├─── redux                  # 相关的所有文件目录
├───── modules             # 鸭子模型中的业务代码，用于存放各模块业务Action和Reducer的实现
├───── configureStore.ts   # 配置Redux的Store，添加默认的插件（redux-thunk）
├───── reducer.ts          # 根Reducer方法
├── package.json            # package.json
├── server.js               # webpack开发Server文件，使用Express4.0
├── README.md               # 说明文档
└── webpack.config.js       # webpack配置文件
```
