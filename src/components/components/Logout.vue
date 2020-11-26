<template>
<div>
    You have been successfully logged out of Doc Record
</div>
</template>
<script>
import firebase from "firebase";
export default {
    data() {

    },
    created() {
        firebase.auth().signOut();
        this.$store.commit('setUser', null);
        this.$router.push('/');
    }
}
</script>