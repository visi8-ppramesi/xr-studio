import { Store } from './storeMock.js'

const authStore = new Store({
    currentUser: {
        email: 'email@email.com',
        password: 'password'
    }
})

export const getAuthStore = () => {
    return authStore
}
export const getAuth = jest.fn(() => {
    return {
        onAuthStateChanged(fn){
            return fn()
        },
        currentUser: {
            email: 'ppramesi@visi8.com'
        }
    }
});
export const browserLocalPersistence = jest.fn();
export const setPersistence = jest.fn();
export const signInWithEmailAndPassword = jest.fn((auth, email, password) => {
    authStore.setState(['currentUser', 'email'], email)
    authStore.setState(['currentUser', 'password'], password)
    return Promise.resolve({
        user: {
            uid: 'user-1'
        }
    })
});
export const createUserWithEmailAndPassword = jest.fn((auth, email, password) => {
    authStore.setState(['currentUser', 'email'], email)
    authStore.setState(['currentUser', 'password'], password)
    return Promise.resolve({
        user: {
            uid: 'user-new'
        }
    })
});
export const signOut = jest.fn(() => {});

export const updateProfile = jest.fn();
export const updateEmail = jest.fn((user, email) => {
    authStore.setState(['currentUser', 'email'], email)
    return Promise.resolve([user, email])
});
export const updatePassword = jest.fn((user, password) => {
    authStore.setState(['currentUser', 'password'], password)
    return Promise.resolve([user, password])
});
export const reauthenticateWithCredential = jest.fn((user, cred) => {
    const {email, password} = cred
    return new Promise((resolve, reject) => {
        if(password === authStore.getState(['currentUser', 'password'])){
            resolve({user})
        }else{
            reject()
        }
    })
});
export const EmailAuthCredential = jest.fn();
EmailAuthCredential.credential = (email, password) => ({email, password})
export const GoogleAuthProvider = jest.fn();
export const signInWithPopup = jest.fn();
export const getAdditionalUserInfo = jest.fn();
export const linkWithPopup = jest.fn();