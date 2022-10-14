const faker = require('../../utils/faker')
const Factory = require('../factory.js')
const { generateKey } = require('../../utils/crypto')
const _ = require('lodash')

module.exports = class UserFactory extends Factory{
    static collectionName = 'users'
    constructor(){
        super('users')
        this.publicKey = null
        this.encryptedPrivateKey = null
    }

    static async createData(){
        const fullName = faker.name.fullName()
        const name = (faker.name.gender() + fullName).split(/[^((a-z)|(A-Z))]/).join('')
        const pass = '123qweasd'
        const keyPair = await generateKey(pass)
        return {
            'username': name,
            'email': faker.internet.email(),
            'full_name': fullName,
            'password': pass,
            'groups': [],
            'public_key': keyPair[0],
            'encrypted_private_key': keyPair[1],
            'profile_image_url': 'gs://xr-studio-a9c5e.appspot.com/alan_moore.jpg'
        }
    }

    async clearCollections(){
        const snap = await this.buildCollectionRef().get()
        if(snap.empty){
            return
        }
        const delPromises = Object.values(snap.docs).reduce((acc, doc) => {
            const ref = doc.ref
            if(ref.id.startsWith('ft-')){
                const locPromises = []
                locPromises.push(this.auth.deleteUser(ref.id))
                locPromises.push(this.db.collection('user_roles').doc(ref.id))
                if(!_.isNil(this.constructor.subcollections) && _.isArray(this.constructor.subcollections)){
                    const innerPromises = this.constructor.subcollections.reduce((innerAcc, subcollectionFactory) => {
                        const factory = new subcollectionFactory([this.constructor.collectionName, ref.id])
                        innerAcc.push(factory.clearCollections())
                        return innerAcc
                    }, [])
                    locPromises.push(Promise.all(innerPromises).then(() => {
                        return ref.delete()
                    }))
                }else{
                    locPromises.push(ref.delete())
                }
                acc.push(Promise.all(locPromises))
            }
            return acc
        }, [])
        const results = await Promise.all(delPromises)
        return results
    }

    async createDoc(){
        const data = await this.constructor.createData()
        this.publicKey = data.public_key
        this.encryptedPrivateKey = data.encrypted_private_key
        let userUid = this.constructor.createId()
        const settedDoc = await this.auth.createUser({
            uid: userUid,
            email: data['email'],
            emailVerified: false,
            password: data['password'],
        }).then((newUser) => {
            userUid = newUser.uid
            const newUserDocRef = this.db.collection(this.constructor.collectionName).doc(newUser.uid)
            let validatedUserData = Object.assign({}, data)
            delete validatedUserData['password']
            this.ref = newUserDocRef
            return newUserDocRef.set(validatedUserData)
        }).then(() => {
            const userRoleRef = this.db.collection('user_roles').doc(userUid)
            return userRoleRef.set({ roles: [ 'user', Math.random() > 0.5 ? 'creator' : 'client' ]})
        })

        this.data = data
        this.id = userUid

        return settedDoc
    }

    async getRandomUtypeDoc(userType){
        const coll = this.db.collection('user_roles').where('roles', 'array-contains', userType)
        const docs = await coll.get()
        const arr = []
        docs.forEach((doc) => {
            arr.push(doc.id)
        })

        const picked = arr[Math.floor(Math.random() * arr.length)]
        const user = await this.db.collection('users').doc(picked).get()
        return user
    }

    async getRandomProjection(fields, userType = null){
        if(!_.isNil(userType)){
            const rdDoc = await this.getRandomUtypeDoc(userType)
            const ref = rdDoc.ref
            return {
                ..._.pick(rdDoc.data(), fields),
                id: ref
            }
        }else{
            return super.getRandomProjection(fields)
        }
    }
}