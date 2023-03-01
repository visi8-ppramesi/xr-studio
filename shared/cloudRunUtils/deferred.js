module.exports = function(){
    let resolve, reject
    const promise = new Promise((myResolve, myReject) => {
        resolve = myResolve
        reject = myReject
    })

    return Object.assign(promise, {resolve, reject})
}