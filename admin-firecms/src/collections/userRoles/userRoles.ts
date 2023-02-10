import {
    buildCollection,
    EntityOnFetchProps,
    EnumValueConfig,
    EnumValues
} from "ppramesi-firecms";
import { db } from "@utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import debounce from "lodash/debounce"
import { Dispatch, SetStateAction } from "react"
import { UserRoles } from "@/types";

export const buildUserRoleCollection = function([customId, setCustomId]: [EnumValues, Dispatch<SetStateAction<EnumValues>>]){
    const letsGo = debounce(async function(){
        await getDocs(collection(db, "users")).then((snap) => {
            const ids: EnumValues = snap.docs.map(v => {
                const id = v.id
                const name = v.get("username")
                const value: EnumValueConfig = { id, label: name }
                return value
            })
            setCustomId(ids)
        })
    }, 10000, { leading: true, trailing: false })

    return buildCollection<UserRoles>({
        name: "User Roles",
        path: "user_roles",
        customId: customId,
        callbacks: {
            onFetch(entityFetchProps: EntityOnFetchProps) {
                return new Promise((resolve) => {
                    letsGo().then(() => {
                        resolve(entityFetchProps.entity)
                    })
                })
            }
        },
        properties: {
            roles: {
                name: "Name",
                dataType: "array",
                of: {
                    dataType: "string"
                }
            }
        }
    })
}