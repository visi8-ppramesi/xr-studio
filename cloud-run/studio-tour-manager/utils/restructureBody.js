module.exports = function(req, res, next){
    if(!('message' in req.body)){
        const tempBody = {...req.body}
        req.body = {
            message: {
                data: tempBody
            }
        }
    }else{
        if(!('data' in req.body.message)){
            const tempBody = {...req.body}
            req.body.message = {
                data: tempBody
            }
        }
    }
    next()
}