import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./environment";

firebase.initializeApp(firebaseConfig);
createApp(App).use(store).use(router).mount("#app");
