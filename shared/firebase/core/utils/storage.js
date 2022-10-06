import firebase from '../firebase.js'
import { getBlob as getStorageBlob, ref } from 'firebase/storage'

export const getBlob = async (gsPath) => {
    return await getStorageBlob(ref(firebase.storage, gsPath))
}