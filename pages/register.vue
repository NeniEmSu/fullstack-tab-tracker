<template>
  <div>
    <h1 class="text-center">
      Register
    </h1>
    <hr />
    <b-alert v-if="error" show variant="danger">
      <h4 class="alert-heading">
        <!-- {{ error.response.data.name || error.response.data.error.name }}! -->Error
      </h4>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="error"></div>
    </b-alert>
    <b-alert v-if="$auth.$state.redirect" show>
      You have to be login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center" class="pt-4">
      <b-col lg="4" md="6">
        <b-card bg-variant="light">
          <busy-overlay />
          <form @keydown.enter="signUp">
            <b-form-group label="Username">
              <b-input
                ref="userName"
                v-model="userName"
                placeholder="Username"
                required
                name="userName"
              />
            </b-form-group>

            <b-form-group label="Email">
              <b-input
                ref="email"
                v-model="email"
                placeholder="Email address"
                required
                name="email"
              />
            </b-form-group>

            <b-form-group label="Password">
              <b-input
                v-model="password"
                type="password"
                placeholder="password"
                required
                name="password"
              />
            </b-form-group>

            <b-form-group label="Repeat Password">
              <b-input
                v-model="repeat_password"
                type="password"
                placeholder="repeat the password"
                required
                name="repeat_password"
              />
            </b-form-group>

            <div class="text-center">
              <b-btn variant="primary" block @click="signUp">
                Sign Up
              </b-btn>
            </div>
            <div class="text-center" style="margin-top: 20px;">
              Already got an account? <nuxt-link to="/login">Login</nuxt-link>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import busyOverlay from '~/components/busy-overlay'
export default {
  name: 'Register',
  middleware: ['auth'],
  auth: 'guest',
  components: { busyOverlay },

  data() {
    return {
      userName: '',
      email: '',
      password: '',
      repeat_password: '',
      error: null,
    }
  },

  methods: {
    async signUp() {
      try {
        await this.$axios
          .post('/api/auth/signup', {
            userName: this.userName,
            email: this.email,
            password: this.password,
            repeat_password: this.repeat_password,
          })
          .then((response, append = false) => {
            this.$bvToast.toast(response.data.message, {
              title: 'Sign Up',
              autoHideDelay: 10000,
              appendToast: append,
              variant: 'success',
              solid: true,
            })
          })

        await this.$auth
          .loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          .then((response, append = false) => {
            this.$bvToast.toast(response.data.message, {
              title: 'Login in',
              autoHideDelay: 10000,
              appendToast: append,
              variant: 'success',
              solid: true,
            })
          })
      } catch (error) {
        this.error = error.response.data.error
        this.$bvToast.toast(error.response.data.error, {
          title: 'Error',
          autoHideDelay: 10000,
          variant: 'error',
          solid: true,
        })
      }
    },
  },
}
</script>
