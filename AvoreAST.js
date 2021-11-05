/// My take at avore.js

var tables = {}

var jfuncs = {}

var vars = {}

/* generate an AST based on avore code. */
function ASTCompileAvore(str) {
    let line = "";

    let place = "";
    
    let classname = "";
    let classfunc = "";
    let funcname = "";
    let archstate = 0
    let funcargs = []
    let state = 0

    for (let i = 0; i < str.length ;  ++ i) {
        // let cur = str[i];

        // let next = str[i++];

        if (str[i] == '.' && state == 0) {
            state = 12
            classname = place;
            place = "";
        } else if (str[i] == '[' && state == 12) {
           state = 98;
           classfunc = place;
           place = ""; 
        } else if (str[i] == '[' && state == 0) {
            funcname = place;

            place = "";  

            state = 98;
        } else if (str[i] == ']' && state == 98) {
           state = 0; 
           if (place.length > 0) {
             funcargs.push(place.trim());
             place =  ""
            }
        } else if (str[i] == '"' && state == 98) {
          archstate = state
          state = 1888  
        } else if (str[i] == '"' && state == 1888) {
          state = archstate /* revert to previous state */
        } else if (str[i] == ',' && state == 98) {
           funcargs.push(place)  
           place = "";
        } else {
            place = place + str[i];
        }
    }
    if (state != 0) {
        return {
            "error": {
                "msg": "avoreast.js:59:trace: state!=0 is true. please check the syntax again."
            }
        }
    }

    if (funcname.length > 0) {
        return {
            "func": {
                "args": funcargs,
                "name": funcname
            }
        }
    }
    return {
            "class": {
                "name": classname,
                "func_name": classfunc,
                "func_args": funcargs
            } 
    }
}

function av_pushtable(n, d) {
    tables[n] = d
}

function av_pushjsfunction(n, d) {
    jfuncs[n] = d;
}


module.exports.av_pushjsfunction = av_pushjsfunction
module.exports.av_pushtable = av_pushtable

module.exports.compile = ASTCompileAvore