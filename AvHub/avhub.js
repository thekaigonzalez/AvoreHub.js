/// AvHub is a test native implementation of avore.js

const avore = require("../AvoreAST")
const deepslate = require("DeepSlate")
const psync = require("prompt-sync")();

function printFunction(args) {
    console.log(args[0])
}

function testFunc(args) {
    console.log("Testing first arg: " + args[0])
}
var modules = {
    "av": {
        "system": {
            "print": printFunction
        }
    }
}

var vs = {}

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
        if (deepslate.traverse(modules, ast.func.name) == null) {
            console.log("error: function " + ast.func.name + " does not exist") 
        } else {
            deepslate.traverse(modules, ast.func.name)(ast.func.args)
        }
    } else if (ast.statement !== null) {
        if (ast.statement.key == "var") {
            
        }
    }
}

console.log("Native AvoreHub")

while (true) {
    const code = psync(">>>")

    RunAvore(code)
}