<template>
<div>
    <div id="captcha-container">
    </div>
<v-card
    class="mx-auto my-12"
    max-width="374"
  >

    <v-card-title>Doc Record</v-card-title>
    <v-card-text>
      For Doctors to keep record of their patients and much more..
      <v-alert
      v-model="$store.state.loginAlert"
      border="top"
      color="red lighten-2"
      dark
      close-text="Close Alert"
      dismissible
    >
      Something went wrong. Please contact administrator.
    </v-alert>
    </v-card-text>

<div v-if="showLoginPrompt" class="signInOptions">
    <button class="social-button" id="google-connect" @click="signInWithGoogle"><i class="fab fa-google social-icon-font-size"></i> &nbsp;&nbsp;&nbsp;&nbsp; Login With Google</button>
    <button class="social-button" id="phone-connect" @click="phoneLogin"><i class="fa fa-phone"></i> &nbsp;&nbsp;&nbsp;&nbsp; Login With Phone</button>
</div>

<div v-if="showPhonePrompt">
    <v-card-text>
      <div class="backBtn" @click="toggleVisibility(true, false, false)">
        <i class="fa fa-arrow-left"></i> Back to Login options
      </div>
      <div>Please enter your 10 digit mobile number</div>

      <v-text-field
      label="Eg. - 98XXXXXXXX"
      :rules="rules"
      hide-details="auto"
      v-model="phone"
    ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn
      color="primary"
      @click="submitPhone"
    >
      Send OTP
    </v-btn>
    <v-btn
    @click="phone = ''"
    >
      Reset
    </v-btn>
    </v-card-actions>
</div>
<div v-if="showOtpPrompt">
    <v-card-text>
      <div class="backBtn" @click="toggleVisibility(false, true, false)">
        <i class="fa fa-arrow-left"></i>  Edit phone number
      </div>
      <div>Enter OTP recieved on +91******{{phone.substr(6,10)}}</div>

      <v-text-field
      label="OTP"
      hide-details="auto"
      v-model="otp"
    ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn
      color="primary"
      @click="submitOtp"
    >
      Login
    </v-btn>
    <v-btn
    >
      Reset
    </v-btn>
    </v-card-actions>
</div>
  </v-card>
</div>
</template>
<script>
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import router from '../../router';
export default {
    data() {
        return {
            title: "Authentication required.",
            showLoginPrompt: true,
            showPhonePrompt: false,
            showOtpPrompt: false,
            phone: '',
            appVerifier : '',
            otp : '',
            alert: false,
            rules: [
                value => !!value || 'Required',
                value => (value && value.length == 10) || 'Please enter 10 digit phone number',
                value => !isNaN(value) || 'Please enter valid phone number'
            ]
        }
    },
    methods: {
        submitPhone: function() {
            let appVerifier = this.appVerifier
            let payload = {
                phone: '+91'+this.phone,
                captcha: appVerifier
            }
            this.$store.dispatch('submitPhone', payload);
            this.toggleVisibility(false, false, true);
            
        },
        submitOtp: function() {
            console.log(this.otp);
            this.$store.dispatch('verifyOtp', {code: this.otp});
        },
        signInWithGoogle: function() {
          this.$store.dispatch('signInWithGoogle');
        },
        phoneLogin: function() {
          this.toggleVisibility(false, true, false);
        }, 
        toggleVisibility: function(login, phone, otp) {
          this.showLoginPrompt = login;
          this.showPhonePrompt = phone;
          this.showOtpPrompt = otp;
        },
        initReCaptcha(){
            setTimeout(()=>{
            let vm = this
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captcha-container', {
                'size': 'invisible',
                'callback': function(response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
                },
                'expired-callback': function() {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
                }
            });
            //
            this.appVerifier =  window.recaptchaVerifier
            },1000)
        }
    },
    created() {
      this.initReCaptcha();
    }
}
</script>
<style scoped>
.social-button {
    background-position: 25px 0px;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    vertical-align: middle;
    width: 100%;
    border-radius: 3px;
    margin: 10px auto;
}

#google-connect {
    border-color: rgb(220, 74, 61);
    background: rgb(220, 74, 61);
}
#phone-connect {
    border-color: rgb(6, 142, 233);
    background: rgb(6, 142, 233);
}
.backBtn {
  color:  rgb(6, 142, 233);
  font-size: 14px;
  margin-bottom: 1em;
  cursor: pointer;
}
</style>