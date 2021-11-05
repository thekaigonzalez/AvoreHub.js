/// AvHub is a test native implementation of avore.js

const avore = require("../AvoreAST")
const psync = require("prompt-sync")();

function printFunction(args) {
    console.log(args[0])
}

function testFunc(args) {
    console.log("Testing first arg: " + args[0])
}
var modules = {
    "av": {
        "print": printFunction
    }
}

var funcmodules = {
    "test": testFunc
}

function RunAvore(code) {
    let ast = avore.compile(code)

    if (ast.error != null) {
        console.log("error: error when generating ast: " + ast.error.msg)
        return null
    }

    if (ast.func != null) {
        if (funcmodules[ast.func.name] == null) {
            console.log("error: function " + ast.func.name + " does not exist") 
        } else {
            funcmodules[ast.func.name](ast.func.args)
        }
    } else if (ast.class != null) {
        let cname = ast.class.name || null
        let cfun = ast.class.func_name
        let cargs = ast.class.func_args
        if (modules[cname] == null) {
            console.log("error: avorenative: class does not exist")
        } else {
            if (modules[cname][cfun] == null) {
                console.log("error: avorenative: class " + cname + ": could not find a definition for " + cfun)
            } else {
                modules[cname][cfun](cargs)
            }
        }
        
    }
}

while (true) {
    const code = psync("")

    RunAvore(code)
}