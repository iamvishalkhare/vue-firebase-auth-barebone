import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '../router';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        confirmationObject: '',
        loginAlert: false,
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setLoginAlert(state, showError) {
            state.loginAlert = showError;
        }
    },
    actions: {
        submitPhone({ commit }, payload) {
            firebase.auth().signInWithPhoneNumber(payload.phone, window.recaptchaVerifier)
                .then(user => {
                    console.log(user);
                    this.state.confirmationObject = user;
                });
        },
        verifyOtp({ commit }, payload) {
            let code = payload.code;
            this.state.confirmationObject.confirm(code).then(function(result) {
                // User signed in successfully.
                var user = result.user;
                commit('setUser', user);
                console.log(user);
                router.push('/console/dashboard');
                // ...
                //route to set password !
                //vm.$router.push({ path: '/setPassword' })
            }).catch(function(error) {
                // User couldn't sign in (bad verification code?)
                commit('setLoginAlert', true);
            });
        },
        signInWithGoogle: function({ commit }) {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                commit('setUser', user);
                router.push('/console/dashboard');
                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                commit('setLoginAlert', true);
                // ...
            });
        },
        autoSignIn: function({ commit }, user) {
            commit('setUser', user);
            router.push('/console/dashboard');
        }

    },
    getters: {
        user(state) {
            console.log(state.user);
            return state.user;
        }
    }
})