# AvoreHub AST Analyzer

Unofficial avore.js AST implementation

(this is not meant to be used as a replacement for AvoreHub!!! (when it comes))

```js

console.log(ASTCompileAvore("av.msg[\"hello! world\", 1]"))

{ class:
   { name: 'av',
     func_name: 'msg',
     func_args: [ 'hello! world', '1' ] } }

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

