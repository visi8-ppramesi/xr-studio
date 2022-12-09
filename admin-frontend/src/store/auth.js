import { defineStore } from "pinia";
import { collections } from "../firebase/index";
import { getDoc, doc } from "firebase/firestore";
// import handleError from "@/utils/handleError";

const User = collections.Users;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    uid: localStorage.getItem("uid"),
    user: null,
    userDob: new Date(localStorage.getItem("date_of_birth") || new Date()),
    userInstance: null,
    error: null,
    status: { loggingIn: false },
    profile_image_url: null,
    isLoggedIn: false,
    unreadCount: 0,
    notificationListener: null,
    roles: [],
  }),

  getters: {},

  actions: {
    updateDateOfBirth(date) {
      this.userDob = date;
      localStorage.setItem("date_of_birth", date);
      if (this.userInstance) {
        return this.userInstance.updateDateOfBirth(date);
      } else {
        return Promise.resolve(true);
      }
    },
    async updateUserProfileData({ name, email, full_name }) {
      return await this.userInstance
        .updateProfileData({ name, email, full_name })
        //eslint-disable-next-line no-unused-vars
        .then((__) => {
          if (this.user && this.userInstance) {
            if (name) {
              this.user.name = name;
              this.userInstance.name = name;
            }
            if (email) {
              this.user.email = email;
              this.userInstance.email = email;
            }
            if (full_name) {
              this.user.full_name = full_name;
              this.userInstance.full_name = full_name;
            }
          }
        });
    },
    async login(email, password, successFunc = () => {}, errorFunc = () => {}) {
      localStorage.removeItem("date_of_birth");
      this.status.loggingIn = true;
      return User.login(email, password)
        .then((user) => {
          user.getRoles().then((roles) => {
            this.roles = roles;
          });
          this.uid = user.id;
          user.getProfileImage().then((imageUrl) => {
            this.profile_image_url = imageUrl;
          });
          user.getNotificationUnreadCount().then((count) => {
            this.unreadCount = count;
          });
          this.notificationListener = user.createNotificationListener(
            (snapshot) => {
              this.unreadCount = snapshot.get("unread_count") ?? 0;
            }
          );
          this.userInstance = user;
          this.user = user.toJSON();
          if (this.user.date_of_birth) {
            localStorage.setItem(
              "date_of_birth",
              this.user.date_of_birth.toDate()
            );
            this.userDob = this.user.date_of_birth.toDate();
          }
          localStorage.setItem("uid", this.uid);
          this.status.loggingIn = false;
          this.isLoggedIn = true;
          successFunc(user);
        })
        .catch((error) => {
          // handleError(error, 'loginError')
          this.status.loggingIn = false;
          this.error = error.message;
          errorFunc(error);
        });
    },
    async logout(successFunc = () => {}, errorFunc = () => {}) {
      localStorage.removeItem("date_of_birth");
      return User.logout()
        .then(() => {
          this.$reset();
          if (this.notificationListener) {
            this.notificationListener();
          }
          localStorage.removeItem("uid");
          successFunc();
        })
        .catch((error) => {
          // handleError(error, 'logoutError')
          this.error = error.message;
          errorFunc(error);
        });
    },
    async register(
      email,
      password,
      data,
      successFunc = () => {},
      errorFunc = () => {}
    ) {
      this.status.loggingIn = true;
      localStorage.removeItem("date_of_birth");
      return User.register(email, password, data)
        .then((user) => {
          this.uid = user.id;
          user.getProfileImage().then((imageUrl) => {
            this.profile_image_url = imageUrl;
          });
          user.getNotificationUnreadCount().then((count) => {
            this.unreadCount = count;
          });
          this.notificationListener = user.createNotificationListener(
            (snapshot) => {
              this.unreadCount = snapshot.get("unread_count") ?? 0;
            }
          );
          this.userInstance = user;
          this.user = user.toJSON();
          if (this.user.date_of_birth) {
            localStorage.setItem(
              "date_of_birth",
              this.user.date_of_birth.toDate()
            );
            this.userDob = this.user.date_of_birth.toDate();
          }
          localStorage.setItem("uid", this.uid);
          this.status.loggingIn = false;
          this.isLoggedIn = true;
          successFunc();
        })
        .catch((error) => {
          // handleError(error, 'registerError')
          this.error = error.message;
          this.status.loggingIn = false;
          errorFunc(error);
        });
    },
    async loginWithGoogle(successFunc = () => {}, errorFunc = () => {}) {
      this.status.loggingIn = true;
      localStorage.removeItem("date_of_birth");
      return User.loginWithGoogle()
        .then((user) => {
          this.uid = user.id;
          user.getProfileImage().then((imageUrl) => {
            this.profile_image_url = imageUrl;
          });
          user.getNotificationUnreadCount().then((count) => {
            this.unreadCount = count;
          });
          this.notificationListener = user.createNotificationListener(
            (snapshot) => {
              this.unreadCount = snapshot.get("unread_count") ?? 0;
            }
          );
          this.userInstance = user;
          this.user = user.toJSON();
          if (this.user.date_of_birth) {
            localStorage.setItem(
              "date_of_birth",
              this.user.date_of_birth.toDate()
            );
            this.userDob = this.user.date_of_birth.toDate();
          }
          localStorage.setItem("uid", this.uid);
          this.status.loggingIn = false;
          this.isLoggedIn = true;
          successFunc();
        })
        .catch((error) => {
          // handleError(error, 'loginError')
          this.status.loggingIn = false;
          this.error = error.message;
          errorFunc(error);
        });
    },
    authAction() {
      User.onAuthStateChanged((user) => {
        if (user) {
          const authProvider = user.providerData.find(
            (p) => p.providerId == "google.com"
          )
            ? "google"
            : "email";
          const newUserDocRef = doc(User.db, "users", user.uid);
          getDoc(newUserDocRef).then((doc) => {
            const newUser = new User();
            newUser
              .setData(user.uid, doc.data(), doc, authProvider)
              //eslint-disable-next-line no-unused-vars
              .then((__) => {
                this.uid = newUser.id;
                newUser.getProfileImage().then((imageUrl) => {
                  this.profile_image_url = imageUrl;
                });
                newUser.getNotificationUnreadCount().then((count) => {
                  this.unreadCount = count;
                });
                this.notificationListener = newUser.createNotificationListener(
                  (snapshot) => {
                    this.unreadCount = snapshot.get("unread_count") ?? 0;
                  }
                );
                this.userInstance = newUser;
                this.user = newUser.toJSON();
                if (this.user.date_of_birth) {
                  localStorage.setItem(
                    "date_of_birth",
                    this.user.date_of_birth.toDate()
                  );
                  this.userDob = this.user.date_of_birth.toDate();
                }
                this.isLoggedIn = true;
                localStorage.setItem("uid", this.uid);
              });
          });
          // const newUser = new User()
          // newUser.setData(user.uid, )
          // this.uid = user.id
          // user.getProfileImage().then((imageUrl) => {
          //     this.profile_image_url = imageUrl
          // })
          // this.user = user.toJSON()
          // localStorage.setItem('uid', user.uid)
        } else {
          this.$reset();
          localStorage.removeItem("uid");
        }
      });
    },
  },
});
