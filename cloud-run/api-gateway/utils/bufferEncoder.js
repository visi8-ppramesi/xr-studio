exports.encode = function(data) {
    const isObjOrArray = ['[object Object]', '[object Array]'].includes(({}).toString.apply(data))
    if(isObjOrArray){
        return Buffer.from(JSON.stringify(data))
    }else{
        return Buffer.from(JSON.stringify({data}))
    }
}

exports.decode = function(buf) {
    let stringified
    if(typeof buf === "string") {
        try{
            const obj = JSON.parse(buf)
            return obj
        }catch(err){}
        try{
            stringified = Buffer.from(buf, "base64").toString()
        }catch(err){}
    }else if(buf instanceof Buffer){
        stringified = buf.toString("utf-8")
    }

    try{
        const obj = JSON.parse(stringified)
        return obj
    }catch(e){
        //can't process this shit, just return as is
        return buf
    }
}