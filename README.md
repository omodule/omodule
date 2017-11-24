<p align="center">
    <img width="320" src="./omodule-logo.svg">
</p>

# omodule
`omodule` 是一种简单实用的文件目录管理规范，帮助开发者更好的管理项目模块。目前可使用 [babel](https://babeljs.io) 插件  [babel-plugin-transform-omodule-scope](https://github.com/omodule/babel-plugin-transform-omodule-scope) 进行 omodule 作用域常量的代码编译。

## 1. omodule 规范下的文件目录结构 🌲
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
## 2. omodule 作用域常量

#### __onamespace
- `当前 omodule 的命名空间（基于根节点）`

文件路径：`root/omodules/account/omodules/login/loginPage.js`

```javascript
console.log(__onamespace); // Prints: /account/login
```

#### __oname
- `当前 omodule 的名称`

文件路径：`root/omodules/account/omodules/register/registerPage.js`
```javascript
console.log(__oname); // Prints: register
```

#### __ofilepath
- `基于 omodule 根节点的文件路径`

文件路径：`root/omodules/homepage/homePage.js`

```javascript
console.log(__ofilepath); // Prints: omodules/homepage/homePage.js
```

## 2. babel 插件
目前可配合 [babel-plugin-transform-omodule-scope](https://github.com/omodule/babel-plugin-transform-omodule-scope) 编译 omodule 作用域常量。
