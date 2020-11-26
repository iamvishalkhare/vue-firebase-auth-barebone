import Vue from "vue";
import App from "./App";
import router from "./router/index";
import { store } from './store'

import PaperDashboard from "./plugins/paperDashboard";
import Vuetify from "vuetify";
import firebase from 'firebase';
import "vuetify/dist/vuetify.min.css";
import "vue-notifyjs/themes/default.css";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(PaperDashboard);
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
    router,
    store,
    vuetify: new Vuetify(),
    render: h => h(App),
    created() {
        firebase.initializeApp({
            apiKey: "AIzaSyD5otuw0uUuw0hHZR1va-i1-yFGDWnYYMM",
            authDomain: "docrecord-20290.firebaseapp.com",
            databaseURL: "https://docrecord-20290.firebaseio.com",
            projectId: "docrecord-20290",
            storageBucket: "docrecord-20290.appspot.com",
            messagingSenderId: "666055211896",
            appId: "1:666055211896:web:e77f0104bff5e624e2268d",
            measurementId: "G-6BMT8DMZHG"
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                this.$store.dispatch('autoSignIn', user);
            }
        })
    }
}).$mount("#app");