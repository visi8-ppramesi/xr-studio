import { EntityIdUpdateProps } from "ppramesi-firecms";
import { v4 } from "uuid"
import debounce from "lodash/debounce";

export function isV4UUID(str: string | undefined) : boolean {
    if(str === undefined){
        return false
    }
    return /^(ft-){0,1}[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(str);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rewriteIdUpdate<M extends Record<string, any>>(): (idUpdateProps: EntityIdUpdateProps<M>) => string {
    const debounced = debounce(function(idUpdateProps: EntityIdUpdateProps<M>){
        if(isV4UUID(idUpdateProps.entityId)){
            return idUpdateProps.entityId!
        }else{
            return v4()
        }
    }, 1000, { leading: true, trailing: false })
    return debounced
}