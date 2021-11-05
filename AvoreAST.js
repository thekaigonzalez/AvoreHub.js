/// My take at avore.js

/* function parameters are pretty controversial, so here's a way to change them */
var T_PARAMOP = '[';
var T_PARAMCL = ']';
var T_COMP = '[';
var T_COMP_END = ']';

var tables = {}

var jfuncs = {}

var vars = {}

/* generate an AST based on avore code. */
function ASTCompileAvore(str) {
    let place = "";
    let classname = "";
    let classfunc = "";


    let iskey = false;
    let comment = false;
    let isspecial = false;
    let isassign = false;


    let keyword = "";
    let assignval = "";
    let others = "";
    let assignname = "";
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
        } else if (str[i] == T_PARAMOP && state == 12) {
           state = 98;
           classfunc = place;
           place = ""; 
        } else if (str[i] == T_PARAMOP && state == 0) {
            funcname = place;

            place = "";  

            state = 98;
        } else if (str[i] == ' ' && state == 0) {
            state = 69; /* nice */
            iskey = true;
            keyword = place;
            place = ""; /* reset buffer */
        } else if (str[i] == '=' && state == 69) {
            state = 70;
            assignname = place;
            isassign = true;
            place = ""; /* let it collect the rest */
        } else if (str[i] == T_COMP && state == 69) {
            state = 90;
            isassign  = 'is comparison statement'
            place = "";
            continue;
        } else if (str[i] == '=' && state == 90) { /* then it's in an if block */
            if (str[i++] == '=') { /* if it's an comparison */
                  others = place;
                  state = 299;
                  place = ""; /* reset buffer */
            } else {
                return {
                    "error": {
                        "ASTError": {
                            message: "illegal operation: cannot sign"
                        }
                    }
                }
            }
        } else if (str[i] == T_COMP_END && state == 299) {
            assignval = place;
            place = "";
            isspecial = true;
            state = 777; // 777: expects body of code
            continue;
        } else if (str[i] == '{' && state == 777) {
            place = "";
            state = 999;  
        } else if (str[i] == '}' && state == 999) {
            assignname = place;
            // console.log("end if body :" + place + ":");
            place = "";
            state = 0;
            break;
        } else if (str[i] == T_PARAMCL && state == 98) {
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
    if (state != 0 && !comment && !iskey) {
        return {
            "error": {
                "msg": "avoreast.js:59:trace: state!=0 is true. please check the syntax again."
            }
        }
    }

    if (isspecial) {
        return {
            "special": {
                "body": assignname.trim(),
                "name": assignval.trim(),
                "special_keyword": isspecial,
                "other": others.trim(),
                "kname": keyword
            }
        }
    }
    if (iskey) {
        if (place.length > 0) {
            assignval = place;
            place = ""; /* rest */
        }
        return {
            "statement": {
                "key": keyword,
                "isassignment": isassign,
                "assignname": assignname.trim(),
                "assignval": assignval.trim()
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