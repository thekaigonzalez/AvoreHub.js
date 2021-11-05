# AvoreHub AST Analyzer

Unofficial avore.js AST implementation

This is meant to give a brief semantic analysis on Avore.js code.

If the developers did use this implementation then that would be nice!

I'll try my best to keep it up to date with the latest Avore.js updates.

(this is not meant to be used as a replacement for AvoreHub!!! (when it comes))

```js

console.log(avore.compile("av.msg[\"hello! world\", 1]"))

{ class:
   { name: 'av',
     func_name: 'msg',
     func_args: [ 'hello! world', '1' ] } }

```


```js
console.log(avore.compile("msg[\"hello! world\", 1]"))


{ func: { args: [ '1', '2', '3' ], name: 'msg' } }

```

```js

const avore = require("./AvoreAST")

console.log(avore.compile("var c = 123"))

{ statement:
   { key: 'var',
     isassignment: true,
     assignname: 'c',
     assignval: '123' } }

```

```js

const avore = require("./AvoreAST")

console.log(avore.compile("if [c => 123] { av.msg[nine] }"))

{ special:
   { body: 'av.msg[nine]',
     name: '123',
     special_keyword: true,
     other: 'c',
     kname: 'if' } }

```

## Docs

```js

(alias) compile(str: any): {
    error: {
        msg: string;
    };
    class?: undefined;
} | {
    class: {
        name: string;
        func_name: string;
        func_args: string[];
    };
    error?: undefined;
}
import compile

```

