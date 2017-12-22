<p align="center">
    <img width="320" src="./omodule-logo.svg">
</p>

# omodule
`omodule` 是一种以项目目录结构为基础的「命名空间」规范。目前可使用 [babel](https://babeljs.io) 插件  [babel-plugin-transform-omodule-namespace](https://github.com/omodule/babel-plugin-transform-omodule-namespace) 进行 omodule 命名空间常量的代码编译。

## Motivation ?
javascript 的项目缺少命名空间规范。

## omodule 规范下的文件目录结构 🌲
例子： [./omodule-structure-example](./omodule-structure-example)
```
root
|__ omodules
    |__ account
    |   |__ omodules
    |       |__ login
    |       |__ register
    |__ homepage
    |__ order
```
## 两个 omodule 命名空间常量的定义

#### __onamespace
- `当前 omodule 的命名空间（基于根节点）`

路径：[root/omodules/account/omodules/login/loginPage.js](./omodule-structure-example/root/omodules/account/omodules/login/loginPage.js)

```javascript
console.log(__onamespace); // 打印log: /account/login
```

#### __ofilepath
- `基于 omodule 根节点的文件路径常量`

路径：[root/omodules/homepage/homePage.js](./omodule-structure-example/root/omodules/homepage/homePage.js)

```javascript
console.log(__ofilepath); // 打印log: omodules/homepage/homePage.js
```

## 关于 omodule babel 插件
目前可配合 [babel-plugin-transform-omodule-namespace](https://github.com/omodule/babel-plugin-transform-omodule-namespace) 编译 omodule 作用域常量。
