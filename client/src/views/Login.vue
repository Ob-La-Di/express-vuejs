<template>
    <div>
    <input
    placeholder="E-mail"
    v-model="email"/>
    <input
    placeholder="E-mail"
    v-model="password" type="password"/>
    <button @click.prevent="submit()">Login</button>
    </div>
</template>

<script>
import axios from 'axios';
import Component from 'vue-class-component';
import Vue from 'vue';

export default class LoginView extends Vue{
    data() {
        return {
            email: '',
            password: '',
        };
    }

    submit() {
      axios.post(
        '/v1/auth/login', {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem('jwt', response.data.token);
            this.$router.push({ path: '/' });
          }
        }).catch((err) => {
            console.log(err);
        });
    }
};
</script>
