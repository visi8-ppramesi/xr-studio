import firebase from '../firebase.js'
// import { collection, orderBy, startAt, endAt, query, getDocs } from 'firebase/firestore'
import { getDownloadURL, getBlob as getStorageBlob, ref } from 'firebase/storage'
// import router from '../../router/index.js'
import emitter from '@/utils/emitter.js'
// import geofire from 'geofire-common'

let medias = {}
let cache = {}

const getBlob = async (gsPath) => {
    return await getStorageBlob(ref(firebase.storage, gsPath))
}

const getResourceUrlFromStorage = async (gsPath) => {
    return await getDownloadURL(ref(firebase.storage, gsPath))
}

const getDataUrlFromStorage = async (gsPath) => {
    let blob
    if(gsPath in cache){
        blob = cache[gsPath]
    }else{
        blob = await getBlob(gsPath)
        cache[gsPath] = blob
    }
    // return URL.createObjectURL(blob)
    // var img = document.createElement('img');
    // let url = URL.createObjectURL(blob)
    // img.src = url
    // document.getElementById('app').appendChild(img);
    // img.onload = () => {
    //     URL.revokeObjectURL(url)
    // }
    
    return await new Promise((resolve, reject) => {
        var a = new FileReader();
        a.onload = function(e) {
            resolve(e.target.result);
        }
        a.onerror = function(e){
            reject(e);
        }
        a.readAsDataURL(blob);
    })
}

const getProtectedDataUrlFromStorage = async (gsPath) => {
    const blob = await getBlob(gsPath)
    const identifier = (Math.random() + 1).toString(36).substring(2)
    medias[identifier] = URL.createObjectURL(blob)
    return { media: medias[identifier], identifier }
}

const revokeDataUrl = (url, identifier) => {
    setTimeout(() => {
        delete medias[identifier]
        URL.revokeObjectURL(url)
    }, 0)
}

const constructEventUrl = (eventId) => {
    return 'https://localhost:8080/event/' + eventId
}

const constructArtistUrl = (artistId) => {
    return 'https://localhost:8080/artist/' + artistId
}

const parseDocs = (docs, extraFields = []) => {
    const docsVals = Object.values(docs)
    let retVal = []
    for(let i = 0; i < docsVals.length; i++){
        const data = docsVals[i].data()
        data.doc = docsVals[i]
        extraFields.forEach((field) => {
            data[field] = docsVals[i][field]
        })
        data.id = docsVals[i].id
        retVal.push(data)
    }

    return retVal
}

// const locationQuery = (db, geopointField, coll, center, distance) => {
//     const collRef = collection(db, coll)
//     const bounds = geofire.geohashQueryBounds(center, distance);
//     const promises = [];
//     for (const b of bounds) {
//         promises.push(getDocs(query(collRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]))))
//     }

//     return Promise.all(promises).then((snapshots) => {
//         const matchingDocs = [];

//         for (const snap of snapshots) {
//             for (const doc of snap.docs) {
//                 const [ lat, lng ] = Object.values(doc.get(geopointField).toJSON())

//                 // We have to filter out a few false positives due to GeoHash
//                 // accuracy, but most will match
//                 const distanceInKm = geofire.distanceBetween([lat, lng], center);
//                 const distanceInM = distanceInKm * 1000;
//                 if (distanceInM <= distance) {
//                     matchingDocs.push(doc);
//                 }
//             }
//         }

//         return matchingDocs;
//     })
// }

// const redirectToLogin = () => {
//     router.push({name: 'Login'})
// }

const handleError = function(err, type){
    switch(type){
        case 'loginError':
            emitter.emit('loginError')
            break;
        case 'registerError':
            emitter.emit('registerError')
            break;
        case 'getDocumentError':
            break;
        case 'getDocumentsError':
            break;
        case 'generateDocumentsError':
            break;
        case 'favoriteError':
            break;
        default:
            break;
    }
    return err
}

export default { getResourceUrlFromStorage, handleError, getBlob, getDataUrlFromStorage, constructArtistUrl, constructEventUrl, parseDocs, getProtectedDataUrlFromStorage, revokeDataUrl }