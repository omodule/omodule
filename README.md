<p align="center">
    <img width="320" src="./omodule-logo.svg">
</p>

# omodule
`omodule` 是一种文件目录管理规范，帮助开发者更好的管理 Web 项目模块。同时规定在代码文件编译阶段需对 omodule 作用域变量进行编译赋值。  


## 1. omodule 规范下的文件目录结构 🌲
目录例子： [./omodule-structure-example](./omodule-structure-example)
```
.  
└── root-path
    ├── onode.js            // 每个 omodule 都有一个 onode.js 文件
    ├── example.root.js     // 业务代码文件
    └── omodules            // omodules 为子目录
        ├── a               // 子 omodule
        │   ├── onode.js
        │   ├── example.a.js
        │   └── omodules
        │       ├── a-sub1
        │       │   ├── example.a-sub1.js
        │       │   └── onode.js
        │       └── a-sub2
        │           ├── example.a-sub2.js
        │           └── onode.js
        └── b
            ├── example.b.js
            └── onode.js

```
## 2. omodule 作用域变量

#### __onamespace
- `<string>`

当前 omodule 的命名空间（基于根节点）  

文件路径：`root-path/omodules/a/omodules/a-sub1/example.a-sub1.js`

```javascript
console.log(__onamespace);
// Prints: /a/a-sub1
```

#### __oname
- `<string>`

当前 omodule 的名称

文件路径：`root-path/omodules/a/omodules/a-sub1/example.a-sub1.js`
```javascript
console.log(__oname);
// Prints: a-sub1
```

#### __ofilepath
- `<string>`

基于 omodule 根节点的文件路径

文件路径：`root-path/omodules/a/omodules/a-sub1/example.a-sub1.js`

```javascript
console.log(__ofilepath);
// Prints: /omodules/a/omodules/example.a-sub1.js
```
