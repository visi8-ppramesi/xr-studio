import Collection from "../../core/collection";
import { InstanceProjectionArray, ProfilePicture } from "../../core/types";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword as authUpdatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  linkWithPopup,
} from "firebase/auth";
import {
  // collection,
  startAfter,
  updateDoc,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
  orderBy,
  limit,
  writeBatch,
} from "firebase/firestore";
import Notifications from "../notifications/notifications";
import utils from "../../core/utils/index.js";
import firebase from "@/firebase/firebase";
import handleError from "../../core/utils/errorHandler";

const validateUserProfileData = (data) => {
  return data;
};

const fillData = (dataObject, email) => {
  dataObject.bookmarks = [];
  dataObject.favorites = [];
  dataObject.comic_subscriptions = [];
  dataObject.profile_image_url = null;
  dataObject.email = email;
};

export default class extends Collection {
  static collection = "users";
  static fields = {
    username: String,
    email: String,
    full_name: String,
    profile_image_url: ProfilePicture,
    groups: new InstanceProjectionArray({
      name: String,
      id: String,
    }),
    public_key: String,
    encrypted_private_key: String,
  };

  async getRoles() {
    const roleRef = doc(this.constructor.db, "user_roles", this.id);
    const roleDoc = await getDoc(roleRef);

    return roleDoc.get("roles");
  }

  async setData(id, data, doc = null, authProvider = "email") {
    await super.setData(id, data, doc);
    this.authProvider = authProvider;
  }

  async createNotificationListener(listenerFunc) {
    if (!firebase.auth.currentUser) {
      return null;
    }
    const noteNotificationRef = doc(
      this.constructor.db,
      "notifications",
      this.id
    );
    return onSnapshot(noteNotificationRef, listenerFunc);
  }

  async clearNotificationCount(notifications) {
    if (!firebase.auth.currentUser) {
      return null;
    }
    // const promises = []
    const batch = writeBatch(this.constructor.db);
    const countNotificationRef = doc(
      this.constructor.db,
      "notifications",
      this.id
    );
    batch.update(countNotificationRef, {
      unread_count: 0,
    });
    // const update = updateDoc(countNotificationRef, {
    //     unread_count: 0
    // })
    // promises.push(update)
    notifications.forEach((notification) => {
      if (notification.unread) {
        // promises.push(notification.setRead())
        notification.setReadBatched(batch);
      }
    });
    return await batch.commit();

    // return Promise.allSettled(promises)
  }

  async getNotificationUnreadCount() {
    if (!firebase.auth.currentUser) {
      return 0;
    }
    const noteNotificationRef = doc(
      this.constructor.db,
      "notifications",
      this.id
    );
    const noteDoc = await getDoc(noteNotificationRef);
    if (noteDoc.exists()) {
      return noteDoc.data().unread_count ?? 0;
    } else {
      return 0;
    }
  }

  async getNotifications(
    type = "comics",
    limitParam = 10,
    startAfterParam = null
  ) {
    let queryObj;
    if (startAfterParam) {
      queryObj = [
        orderBy("created_date", "desc"),
        limit(limitParam),
        startAfter(startAfterParam),
      ];
    } else {
      queryObj = [orderBy("created_date", "desc"), limit(limitParam)];
    }

    return (
      await Notifications.getDocuments(
        type,
        ["notifications", this.id, type],
        queryObj
      )
    ).map((ins) => {
      ins.type = type;
      return ins;
    });
  }

  async getProfileImage() {
    if (this.profile_image_url) {
      this.profile_image_url = await utils.getResourceUrlFromStorage(
        this.profile_image_url
      );
      return this.profile_image_url;
    } else {
      return null;
    }
  }

  async updateDateOfBirth(date) {
    return updateDoc(this.doc.ref, {
      date_of_birth: date,
    });
  }

  async updateProfileData({ email, name, full_name }) {
    const update = {};
    if (name) {
      update.name = name;
    }
    if (full_name) {
      update.full_name = full_name;
    }
    if (firebase.auth.currentUser.email !== email) {
      await updateEmail(firebase.auth.currentUser, email);
      update.email = email;
    }
    return await updateDoc(this.doc.ref, update);
  }

  async updatePassword(oldPassword, newPassword) {
    const cred = EmailAuthProvider.credential(this.email, oldPassword);
    return await reauthenticateWithCredential(
      firebase.auth.currentUser,
      cred
    ).then(() => {
      return authUpdatePassword(firebase.auth.currentUser, newPassword);
    });
  }

  static getCurrentUser() {
    return firebase.auth.currentUser;
  }

  static onAuthStateChanged(func) {
    firebase.auth.onAuthStateChanged(func);
  }

  static async login(email, password) {
    const data = await signInWithEmailAndPassword(
      firebase.auth,
      email,
      password
    )
      .then(async (cred) => {
        const newUserDocRef = doc(this.db, "users", cred.user.uid);
        const newProfile = await getDoc(newUserDocRef);
        return {
          profile: newProfile.data(),
          cred: cred,
          id: cred.user.uid,
          doc: newProfile,
        };
      })
      .catch((err) => {
        handleError(err, "loginError");
        throw err;
      });

    const instance = new this();
    await instance.setData(data.id, data.profile, data.doc, "email");
    return instance;
  }

  static async register(email, password, userData) {
    const validatedUserData = validateUserProfileData(userData);
    if (!validatedUserData) {
      throw "validator error";
    }
    fillData(validatedUserData, email);
    let newUser, newUserDocRef;
    const data = await createUserWithEmailAndPassword(
      firebase.auth,
      email,
      password
    )
      .then((promisedNewUser) => {
        updateProfile(promisedNewUser, {
          displayName: userData.name,
        });
        newUser = promisedNewUser;
        newUserDocRef = doc(this.db, "users", promisedNewUser.user.uid);
        return setDoc(newUserDocRef, validatedUserData);
      })
      .then((newProfile) => {
        return {
          profile: validatedUserData,
          cred: newUser,
          id: newUser.user.uid,
          doc: newProfile,
        };
      })
      .catch((err) => {
        handleError(err, "registerError");
        throw err;
      });

    const instance = new this();
    await instance.setData(data.id, data.profile, data.doc, "email");
    return instance;
  }

  static async logout() {
    const { currentUser } = firebase.auth;

    if (currentUser) {
      return await signOut(firebase.auth);
    }
  }

  static async loginWithGoogle() {
    const gAuthProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebase.auth, gAuthProvider);
    const additionalInfo = getAdditionalUserInfo(result);
    let data;
    if (additionalInfo.isNewUser) {
      const email = result.user.email;
      const name = email.split("@")[0];
      const userData = {
        name,
        full_name: name,
      };
      fillData(userData, email);
      const newUserDocRef = doc(this.db, "users", result.user.uid);
      data = await setDoc(newUserDocRef, userData).then((newProfile) => {
        return {
          profile: userData,
          cred: result,
          id: result.user.uid,
          doc: newProfile,
        };
      });
    } else {
      const newUserDocRef = doc(this.db, "users", result.user.uid);
      data = await getDoc(newUserDocRef).then((newProfile) => {
        return {
          profile: newProfile.data(),
          cred: result,
          id: result.user.uid,
          doc: newProfile,
        };
      });
    }

    const instance = new this();
    await instance.setData(data.id, data.profile, data.doc, "google");
    return instance;
  }

  async linkToGoogle() {
    const gAuthProvider = new GoogleAuthProvider();
    try {
      const result = await linkWithPopup(
        firebase.auth.currentUser,
        gAuthProvider
      );
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      this.authProvider = "google";
      return { credential, user };
    } catch (error) {
      handleError(error, "linkError");
      throw error;
    }
  }
}
