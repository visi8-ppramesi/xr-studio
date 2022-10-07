import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { collections } from './firebase/index'

const vuePropertySetter = (app, name, instance) => {
    app.provide(name, instance)
    app.config.globalProperties[name] = instance
}

const injector = {
    install(app){
        vuePropertySetter(app, 'collections', collections)
    }
}

const app = createApp(App)
app.use(router)
app.use(injector)
app.mount("#app");
