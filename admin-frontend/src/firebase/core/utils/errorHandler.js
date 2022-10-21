let errorHandler = (t, v) => v

export const setErrorHandler = (func) => {
    errorHandler = func
}

export default function(type, error){
    return errorHandler(type, error)
}