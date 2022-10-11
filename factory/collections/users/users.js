const { faker } = require('@faker-js/faker')
const Factory = require('../factory.js')
const { generateKey } = require('../../utils/crypto')

module.exports = class UserFactory extends Factory{
    static collectionName = 'users'
    constructor(){
        super('users')
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

    async createDoc(){
        const data = await this.createData()
        let userUid = this.constructor.createId()
        const settedDoc = await this.auth.createUser({
            uid: userUid,
            email: data['email'],
            emailVerified: false,
            password: data['password'],
        }).then((newUser) => {
            userUid = newUser.user.uid
            const newUserDocRef = this.db.collection(this.collectionName).doc(newUser.user.uid)
            let validatedUserData = Object.assign({}, data)
            delete validatedUserData['password']
            this.ref = newUserDocRef
            return setDoc(newUserDocRef, validatedUserData)
        }).then(() => {
            console.log(userUid)
            const userRoleRef = doc('user_roles', userUid)
            return setDoc(userRoleRef, {roles: [ 'user', Math.random() > 0.5 ? 'creator' : 'client' ]})
        })

        this.data = data
        this.id = userUid

        return settedDoc
    }

    async getRandomUtypeDoc(userType){
        const coll = this.db.collection('user_roles').where('types', 'array-contains', userType)
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
            const rdDoc = this.getRandomUtypeDoc(userType)
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