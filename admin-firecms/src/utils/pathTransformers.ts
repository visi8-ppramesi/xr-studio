import { UploadedFileContext } from "ppramesi-firecms"
import isNil from "lodash/isNil"

type PathKeyPairs = {
    [key: string]: string
}

function pathToKeyPairs(path: string, entityId?: string): object{
    const pathArray = path.split("/")
    const pathArrayLen = pathArray.length - 1
    const keyPairs: PathKeyPairs = {}
    for(let i = 0; i < pathArrayLen; i += 2){
        keyPairs[pathArray[i]] = pathArray[i + 1] 
    }
    if(entityId){
        keyPairs[pathArray[pathArrayLen]] = entityId
    }

    return keyPairs
}

export function transformPathToGS(path: string, bucket: string): string{
    //check if path is actually a valid url
    try{
        const urlObj = new URL(path)
        urlObj.protocol = "gs:"
        return urlObj.toString()
    }catch(err){
        const urlObj = new URL("https://" + bucket)
        urlObj.pathname = path
        urlObj.protocol = "gs:"
        return urlObj.toString()
    }
}

export function buildStoragePathFunction(buildPath?: string[]): (ctx: UploadedFileContext) => string{
    return function(ctx){
        if(isNil(buildPath) || buildPath.length === 0){
            return ctx.path
        }
        const pathKeyPairs = pathToKeyPairs(ctx.path, ctx.entityId)
        return buildPath.reduce((acc: string[], v: string) => {
            let myPath = v
            if(v.startsWith("$")){
                myPath = pathKeyPairs[v.slice(1) as keyof typeof pathKeyPairs] ?? v.slice(1)
            }
            acc.push(myPath)
            return acc
        }, []).join("/")
    }
}

export function buildPostProcessFunction(): (pathOrUrl: string) => Promise<string>{
    return function(pathOrUrl){
        return Promise.resolve(transformPathToGS(pathOrUrl, import.meta.env.VITE_FIREBASE_STORAGE_BUCKET))
    }
}