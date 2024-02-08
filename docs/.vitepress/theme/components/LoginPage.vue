<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <h1 class="login-title">Login</h1>
      <div class="form-item">
        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" required placeholder="Username" class="input"/>
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required placeholder="Password" class="input"/>
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script>
import { verifyInputCredentials, storeCredentials } from '../storage';
import { redirectTo } from '../utils';

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const flag =  await verifyInputCredentials(this.username, this.password)

      if (flag) {
        storeCredentials(this.username, this.password)
        redirectTo()
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 24px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.login-title {
  text-align: center;
  margin-bottom: 24px;
}

.form-item {
  margin-bottom: 16px;
}

.input {
  width: 100%;
  height: 32px;
  padding: 4px 11px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 0;
  border-radius: 2px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #40a9ff;
}
</style>
