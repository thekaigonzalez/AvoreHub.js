const avore = require("./AvoreAST")

console.log(avore.compile("if [c => 123] { av.msg[nine] }"))

console.log(avore.compile("av.msg[\"hello! world\", 1]"))
console.log(avore.compile("msg[\"hello! world\", 1]"))
console.log(avore.compile("var c = 123"))