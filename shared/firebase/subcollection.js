import firebase from './firebase.js'
import {
    DocumentSnapshot,
    doc,
    query,
    updateDoc,
    deleteDoc,
    // startAfter,
    collection,
    getDocs,
    getDoc,
    addDoc,
    collectionGroup,
    setDoc,
    // orderBy,
    // limit
} from "firebase/firestore";
import utils from './utils/index.js'
// import _ from 'lodash'
import types, { LongText, ProfilePicture, InstanceProjectionArray, StorageLink, InstanceProjection } from './types/index.js';
import handleError from '@/utils/handleError.js';

import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import remove from 'lodash/remove'
import pick from 'lodash/pick'

//eslint-disable-next-line no-unused-vars
const setDataHelper = async (fields, instance, key, data, extraConditional = true, fetchStorageLink = true) => {
    const isLongText = fields[key] == LongText
    const isProfilePicture = fields[key] == ProfilePicture
    const isStorageLink = fields[key] == StorageLink

    if(!isNil(data[key]) && extraConditional){
        if(isLongText){
            instance[key] = data[key].replace(/\\n/g, "<br />").replace(/\n/g, "<br />")
        }else if(isProfilePicture){
            if(isEmpty(data[key])){
                instance[key] = firebase.firebaseConfig.defaultProfilePicture
            }else{
                instance[key] = data[key]
            }
        }else if(isStorageLink && fetchStorageLink){
            instance[key] = await utils.getDataUrlFromStorage(data[key])
        }else{
            instance[key] = data[key]
        }
    }else{
      if(isProfilePicture){
          instance[key] = firebase.firebaseConfig.defaultProfilePicture
      }
  }
}

export default class{
    static collection = ''
    static orderByParam = false
    static fields = {}
    static db = firebase.db

    constructor(){
        Object.values(this.constructor.fields).forEach((fieldType) => {
            const isClass = fieldType.toString().substring(0, 5) === 'class'
            const isFuckyFunction = typeof fieldType === 'function' ? fieldType.name in types : false
            if(isClass){
                const funcs = remove(Object.getOwnPropertyNames(fieldType.prototype), (n) => n != 'constructor')
                funcs.forEach((func) => {
                    Object.assign(this, {
                        [func]: fieldType.prototype[func]
                    })
                })
            }else if(isFuckyFunction){
                const fName = fieldType.name
                const funcs = remove(Object.getOwnPropertyNames(types[fName].prototype), (n) => n != 'constructor')
                funcs.forEach((func) => {
                    Object.assign(this, {
                        [func]: types[fName].prototype[func]
                    })
                })
            }
        })
    }

    setDocumentReference(docPath){
      const ref = doc(this.constructor.db, ...docPath)
      this.doc = new DocumentSnapshot(this.constructor.db, null, ref._key)
    }

    setEmpty(){
        this.empty = true
    }

    getObjectPath(){
        const path = this.doc.ref.path.split('/')
        const pathObject = {}
        const order = []
        for(let i = 0; i < path.length; i += 2){
            pathObject[path[i]] = path[i + 1]
            order.push(path[i])
        }

        return { path: pathObject, order }
    }

    async deleteDocument(){
      try {
        await deleteDoc(this.doc.ref)
        return true
      } catch (err) {
        handleError(err, 'deleteDocumentError')
        throw err
      }
    }

    async saveDocument(){
        const data = this.toDataJSON()
        const fields = Object.keys(this.constructor.fields)
        await this.setDocument(pick(data, fields))
        return this
    }

    async setDocument(data, merge = true){
      try{
          const validation = this.constructor.validateData(data)
          if(validation){
              const eventRef = this.doc.ref
              if(merge){
                await setDoc(eventRef, data, {merge: true})
              }else{
                await setDoc(eventRef, data)
              }
              this.doc = await getDoc(eventRef)
              this.setData(this.parentId, this.id, data, false, false)
              return this
          }
      }catch(err){
          handleError(err, 'setDocumentError')
          throw err
      }
    }

    async updateDocument(data){
        try{
            const validation = this.constructor.validateData(data)
            if(validation){
                const eventRef = this.doc.ref
                await updateDoc(eventRef, data)
                this.doc = await getDoc(eventRef)
                this.setData(this.parentId, this.id, data, false, false)
                return this
            }
        }catch(err){
            handleError(err, 'updateDocumentError')
            throw err
        }
    }

    static async createDocument(parentId, parentPath, data) {
        try{
            const validation = this.validateData(data)
            if(validation){
                const newRef = collection(this.db, ...parentPath, this.collection)
                const newDocRef = await addDoc(newRef, data)
                const newDoc = await getDoc(newDocRef)
                const instance = new this()
                await instance.setData(parentId, newDoc.id, data, newDoc, false, false)

                return instance
            }
        }catch(err){
            handleError(err, 'createDocumentError')
            throw err
        }
    }

    static validateData(data){
        const error = []
        const dataFields = Object.keys(data)
        const checkFields = dataFields.reduce((acc, field) => {
            let extra = true
            if(this.validationRules && this.validationRules[field]){
                extra = this.validationRules[field](data[field])
            }
            const weGood = extra && (field in this.fields)
            if(!weGood){
                error.push(field)
            }
            return acc && weGood
        }, true)
        if(checkFields){
            return checkFields
        }else{
            throw new Error('validation error: ' + JSON.stringify(error))
        }
    }

    async setData(parentId, id, data, doc = null, fetchStorageLink = true, fetchInstanceStorageLink = false){
        this.empty = false
        this.id = id
        this.parentId = parentId
        const fields = Object.keys(this.constructor.fields)
        for(let p = 0; p < fields.length; p++){
            const field = fields[p]

            const isSubcollection = this.constructor.fields[field] == this
            const isProfilePicture = this.constructor.fields[field] == ProfilePicture
            const isInstanceProjectionArray = this.constructor.fields[field] instanceof InstanceProjectionArray
            const isInstanceProjection = this.constructor.fields[field] instanceof InstanceProjection

            if(isNil(data[field]) && !isProfilePicture){
                if(isNil(this[field])){
                    this[field] = null
                }
                continue
            }
            if(!isSubcollection){
                if(isInstanceProjectionArray){
                    const fieldKeys = this.constructor.fields[field].keys
                    const thisMyData = []
                    for(let i = 0; i < data[field].length; i++){
                        const myData = data[field][i]
                        const instanceData = {}
                        for(let j = 0; j < fieldKeys.length; j++){
                            await setDataHelper(this.constructor.fields[field].fields, instanceData, fieldKeys[j], myData, true, fetchInstanceStorageLink)
                        }
                        thisMyData.push(instanceData)
                    }
                    this[field] = thisMyData
                }else if(isInstanceProjection){
                    const fieldKeys = this.constructor.fields[field].keys
                    const myData = data[field]
                    const instanceData = {}
                    for(let j = 0; j < fieldKeys.length; j++){
                        await setDataHelper(this.constructor.fields[field].fields, instanceData, fieldKeys[j], myData, true, fetchInstanceStorageLink)
                    }
                    this[field] = instanceData
                }else if(!isNil(data[field])){
                    await setDataHelper(this.constructor.fields, this, field, data, true, fetchStorageLink)
                }else if(isNil(data[field])){
                    if(isProfilePicture){
                        this[field] = firebase.firebaseConfig.defaultProfilePicture
                    }
                }
            }
        }
        if(doc){
            this.doc = doc
        }
    }

    toDataJSON(selectFields = []){
        return Object.keys(this.constructor.fields).reduce((acc, field) => {
            if(this[field]){
                if(selectFields.length > 0){
                    if(selectFields.includes(field)){
                        acc[field] = this[field]
                    }
                }else{
                    acc[field] = this[field]
                }
            }
            return acc
        }, {})
    }

    toJSON(){
        return {...this}
    }

    async fetchResources(storageFields){
        const self = this
        const promises = []
        for(let i = 0; i < storageFields.length; i++){
            promises.push(utils.getDataUrlFromStorage(this[storageFields[i]]))
        }

        return await Promise.all(promises).then((resource) => {
            for(let k = 0; k < resource.length; k++){
                self[storageFields[k]] = resource[k]
            }
        })
    }

    static async getDocument(path, id, loadStorage = false, loadInstance = false){
        const eventRef = doc(firebase.db, ...path, id)
        try{
            const doc = await getDoc(eventRef)
            if(!doc.exists()){
                const emptyInstance = new this()
                emptyInstance.setEmpty()
                return emptyInstance
            }
            const data = doc.data()
            const instance = new this()
            const parentId = path[path.length - 2]
            await instance.setData(parentId, doc.id, data, doc, loadStorage, loadInstance)

            return instance
        }catch(err){
            handleError(err, 'getDocumentError')
            throw err
        }
    }

    static async getDocumentWithStorageResourceUrl(path, id, storageFields = [], loadInstance = false){
        const eventRef = doc(firebase.db, ...path, id)
        const parentId = path[path.length - 2]
        try{
            const doc = await getDoc(eventRef)
            if(!doc.exists()){
                const emptyInstance = new this()
                emptyInstance.setEmpty()
                return emptyInstance
            }
            let data = doc.data()

            const instance = new this()
            await instance.setData(parentId, doc.id, data, doc, false, loadInstance)

            try{
                const resources = []
                for(let j = 0; j < storageFields.length; j++){
                    resources.push(utils.getResourceUrlFromStorage(instance[storageFields[j]]))
                }

                await Promise.all(resources).then((resource) => {
                    for(let k = 0; k < resource.length; k++){
                        instance[storageFields[k]] = resource[k]
                    }
                })
            }catch(err){
                handleError(err, 'getDocumentError')
                throw err
            }

            return instance
        }catch(err){
            handleError(err, 'getDocumentError')
            throw err
        }
    }

    static async getDocumentWithStorageResource(path, id, storageFields = [], loadInstance = false){
        const eventRef = doc(firebase.db, ...path, id)
        const parentId = path[path.length - 2]
        try{
            const doc = await getDoc(eventRef)
            if(!doc.exists()){
                const emptyInstance = new this()
                emptyInstance.setEmpty()
                return emptyInstance
            }
            let data = doc.data()

            const instance = new this()
            await instance.setData(parentId, doc.id, data, doc, false, loadInstance)

            try{
                const resources = []
                for(let j = 0; j < storageFields.length; j++){
                    resources.push(utils.getDataUrlFromStorage(instance[storageFields[j]]))
                }

                await Promise.all(resources).then((resource) => {
                    for(let k = 0; k < resource.length; k++){
                        instance[storageFields[k]] = resource[k]
                    }
                })
            }catch(err){
                handleError(err, 'getDocumentError')
                throw err
            }

            return instance
        }catch(err){
            handleError(err, 'getDocumentError')
            throw err
        }
    }

    static async getDocumentsWithStorageResourceUrl(path, queries = [], storageFields = [], loadInstance = false){
        const eventRef = collection(firebase.db, ...path)
        const parentId = path[path.length - 2]
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }
        let snap
        try {
            snap = await getDocs(q)
        } catch (err) {
            handleError(err, 'getDocumentsError')
            throw err
        }
        if(snap.empty){
            return []
        }
        const docs = Object.values(snap.docs)
        const events = []
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []

            data.doc = docs[i]
            data.id = docs[i].id

            const instance = new this()
            await instance.setData(parentId, data.id, data, data.doc, false, loadInstance)

            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getResourceUrlFromStorage(instance[storageFields[j]]))
            }

            try {
                await Promise.all(resources).then((resource) => {
                    for(let k = 0; k < resource.length; k++){
                        instance[storageFields[k]] = resource[k]
                    }
                })
            } catch (err) {
                handleError(err, 'getDocumentsError')
                throw err
            }
            // data.doc = docs[i]
            // data.id = docs[i].id
            events.push(instance)
        }
        return events
    }

    static async getDocuments(path, queries = [], loadStorage = false, loadInstance = false){
        const eventRef = collection(firebase.db, ...path)
        const parentId = path[path.length - 2]
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }

        try{
            const snap = await getDocs(q)
            if(snap.empty){
                return []
            }else{
                return await Promise.all(utils.parseDocs(snap.docs).map(async (datum, idx) => {
                    const instance = new this()
                    await instance.setData(parentId, datum.id, datum, snap.docs[idx], loadStorage, loadInstance)
                    return instance
                }))
            }
        }catch(err){
            handleError(err, 'getDocumentsError')
            throw err
        }
    }

    static async * generateDocumentsWithStorageResourceUrl(path, queries = [], storageFields = [], loadInstance = false){
        const eventRef = collection(firebase.db, ...path)
        const parentId = path[path.length - 2]
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }

        let snap
        try {
            snap = await getDocs(q)
        } catch (err) {
            handleError(err, 'generateDocumentsError')
            throw err
        }
        if(snap.empty){
            return []
        }
        const docs = Object.values(snap.docs)
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []

            data.doc = docs[i]
            data.id = docs[i].id

            const instance = new this()
            await instance.setData(parentId, data.id, data, data.doc, false, loadInstance)

            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getResourceUrlFromStorage(instance[storageFields[j]]))
            }

            try {
                await Promise.all(resources).then((res) => {
                    for(let k = 0; k < res.length; k++){
                        instance[storageFields[k]] = res[k]
                    }
                })
            } catch (err) {
                handleError(err, 'generateDocumentsError')
                throw err
            }

            yield instance
        }
    }

    static async getDocumentsWithStorageResource(path, queries = [], storageFields = [], loadInstance = false){
        const eventRef = collection(firebase.db, ...path)
        const parentId = path[path.length - 2]
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }

        let snap
        try {
            snap = await getDocs(q)
        } catch (err) {
            handleError(err, 'getDocumentsError')
            throw err
        }
        if(snap.empty){
            return []
        }
        const docs = Object.values(snap.docs)
        const results = []
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []

            const instance = new this()
            await instance.setData(parentId, docs[i].id, data, docs[i], false, loadInstance)
            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getDataUrlFromStorage(instance[storageFields[j]]))
            }

            try {
                await Promise.all(resources).then((res) => {
                    for(let k = 0; k < res.length; k++){
                        instance[storageFields[k]] = res[k]
                    }
                })
            } catch (err) {
                handleError(err, 'getDocumentsError')
                throw err
            }

            results.push(instance)
        }
        return results
    }

    static async * generateDocumentsWithStorageResource(path, queries = [], storageFields = [], loadInstance = false){
        const parentId = path[path.length - 2]
        const eventRef = collection(firebase.db, ...path)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }

        let snap
        try {
            snap = await getDocs(q)
        } catch (err) {
            handleError(err, 'generateDocumentsError')
            throw err
        }
        if(snap.empty){
            return []
        }

        const docs = Object.values(snap.docs)
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []

            data.doc = docs[i]
            data.id = docs[i].id

            const instance = new this()
            await instance.setData(parentId, docs[i].id, data, docs[i], false, loadInstance)
            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getDataUrlFromStorage(instance[storageFields[j]]))
            }

            try {
                await Promise.all(resources).then((res) => {
                    for(let k = 0; k < res.length; k++){
                        instance[storageFields[k]] = res[k]
                    }
                })
            } catch (err) {
                handleError(err, 'generateDocumentsError')
                throw err
            }

            yield instance
        }
    }

    static async getDocumentsCollection(queries = []){
        const eventRef = collectionGroup(firebase.db, this.collection)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }

        try{
            const snap = await getDocs(q)
            return await Promise.all(utils.parseDocs(snap.docs).map(async (datum, idx) => {
                const path = datum.doc.ref.path.split('/')
                const parentId = path[path.length - 3]
                const instance = new this()
                await instance.setData(parentId, datum.id, datum, snap.docs[idx], false, false)
                return instance
            }))
        }catch(err){
            handleError(err, 'getDocumentsError')
            throw err
        }
    }

    static async getDocumentsCollectionWithStorageResource(queries = [], storageFields = [], loadInstance = false){
        const eventRef = collectionGroup(firebase.db, this.collection)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }

        let snap
        try {
            snap = await getDocs(q)
        } catch (err) {
            handleError(err, 'getDocumentsError')
            throw err
        }
        const docs = Object.values(snap.docs)
        const results = []
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const path = docs[i].ref.path.split('/')
            const parentId = path[path.length - 3]
            const resources = []

            const instance = new this()
            await instance.setData(parentId, docs[i].id, data, docs[i], false, loadInstance)
            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getDataUrlFromStorage(instance[storageFields[j]]))
            }

            try {
                await Promise.all(resources).then((res) => {
                    for(let k = 0; k < res.length; k++){
                        instance[storageFields[k]] = res[k]
                    }
                })
            } catch (err) {
                handleError(err, 'getDocumentsError')
                throw err
            }

            results.push(instance)
        }
        return results
    }

    static async getDocumentsCollectionWithStorageResourceUrl(queries = [], storageFields = [], loadInstance = false){
        const eventRef = collectionGroup(firebase.db, this.collection)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }
        let snap
        try {
            snap = await getDocs(q)
        } catch (err) {
            handleError(err, 'getDocumentsError')
            throw err
        }
        const docs = Object.values(snap.docs)
        const events = []
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const path = docs[i].ref.path.split('/')
            const parentId = path[path.length - 3]
            const resources = []

            data.doc = docs[i]
            data.id = docs[i].id

            const instance = new this()
            await instance.setData(parentId, data.id, data, data.doc, false, loadInstance)

            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getResourceUrlFromStorage(instance[storageFields[j]]))
            }

            try {
                await Promise.all(resources).then((resource) => {
                    for(let k = 0; k < resource.length; k++){
                        instance[storageFields[k]] = resource[k]
                    }
                })
            } catch (err) {
                handleError(err, 'getDocumentsError')
                throw err
            }
            // data.doc = docs[i]
            // data.id = docs[i].id
            events.push(instance)
        }
        return events
    }

    static resolve(collectionPath){
        const path = collectionPath.split('/')
        const fname = path[path.length - 1].split('.')
        const fun = new Function([], 'return import("' + collectionPath + '")')
        fname.pop()
        Object.defineProperty(fun, "name", { value: fname.join('') });
        return fun
        // const path = collectionPath.split('/')
        // const fname = path[path.length - 1].split('.')
        // fname.pop()
        // return {
        //     name: fname.join(''),
        //     type: 'subcollection',
        // }
    }
}
