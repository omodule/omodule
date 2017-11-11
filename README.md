# omodule
`omodule` 是一种帮助开发者更好的管理 Web 项目模块的文件目录管理规范。在代码文件编译阶段对 omodule 作用域变量进行编译赋值。

## 1. omodule 规范下的文件目录结构🌲
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
- &lt;string&gt;

当前 omodule 的命名空间（基于根节点）  

例子：root-path/omodules/a/omodules/a-sub1/example.a-sub1.js
```
console.log(__onamespace);
// Prints: /a/a-sub1
```

#### __oname
- &lt;string&gt;

当前 omodule 的名称

例子：root-path/omodules/a/omodules/a-sub1/example.a-sub1.js
```
console.log(__oname);
// Prints: a-sub1
```

#### __ofile
- &lt;string&gt;

当前文件名

例子：root-path/omodules/a/omodules/a-sub1/example.a-sub1.js

```
console.log(__ofile);
// Prints: example.a-sub1.js
```

#### __ofilepath
- &lt;string&gt;

基于 omodule 根节点的文件路径

例子：root-path/omodules/a/omodules/a-sub1/example.a-sub1.js

```
console.log(__ofilepath);
// Prints: /omodules/a/omodules/example.a-sub1.js
```
