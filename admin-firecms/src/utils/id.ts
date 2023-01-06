import { EntityIdUpdateProps } from "@camberi/firecms";
import { v4 } from "uuid"

export function isV4UUID(str: string | undefined) : boolean {
    if(str === undefined){
        return false
    }
    return /^(ft\-){0,1}[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(str);
}

export function rewriteIdUpdate<M extends Record<string, any>>(): (idUpdateProps: EntityIdUpdateProps<M>) => string {
    return function(idUpdateProps: EntityIdUpdateProps<M>){
        console.log(idUpdateProps);
        if(isV4UUID(idUpdateProps.entityId)){
            return idUpdateProps.entityId!
        }else{
            return v4()
        }
    }
}