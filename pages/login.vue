<template>
  <div>
    <h1 class="text-center">Login</h1>
    <hr />
    <b-alert v-if="error" show variant="danger">
      <h4 class="alert-heading">Error!</h4>
      {{ error.response.data.message || error.response.data.error.message }}
    </b-alert>
    <b-alert v-if="$auth.$state.redirect" show dismissible>
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center" class="pt-4">
      <b-col lg="4" md="6">
        <b-card bg-variant="light">
          <busy-overlay />
          <form>
            <b-form-group label="Email">
              <b-input
                ref="email"
                v-model="email"
                autofocus
                placeholder="Email address"
              />
            </b-form-group>

            <b-form-group label="Password">
              <b-input-group>
                <b-input-group-prepend is-text class="clickable">
                  <b-icon
                    :icon="passwordIcon"
                    font-scale="1.5"
                    @click="hidePassword = !hidePassword"
                  >
                  </b-icon>
                </b-input-group-prepend>
                <b-input
                  v-model="password"
                  :type="passwordType"
                  placeholder="password"
                  required
                  name="password"
                />
              </b-input-group>
            </b-form-group>

            <div class="text-center">
              <b-btn variant="primary" block @click="login"> Login </b-btn>
            </div>
            <div class="has-text-centered" style="margin-top: 20px">
              <p>
                Don't have an account?
                <nuxt-link to="/register">Register</nuxt-link>
              </p>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.login-button {
  border: 0;
}
</style>

<script>
import busyOverlay from '~/components/busy-overlay'
export default {
  name: 'Login',
  middleware: ['auth'],
  components: { busyOverlay },
  data() {
    return {
      email: '',
      password: '',
      error: null,
      hidePassword: true,
    }
  },
  computed: {
    passwordType() {
      return this.hidePassword ? 'password' : 'text'
    },
    passwordIcon() {
      return this.hidePassword ? 'eye-fill' : 'eye-slash-fill'
    },
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    },
  },
  methods: {
    login() {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((response, append = false) => {
          this.$store.dispatch('toast/setToast', {
            title: response.data.message,
            variant: response.data.type,
            text: `Thanks for signing in, ${this.$auth.user.userName}`,
            delay: 5000,
          })
        })
        .catch((error) => {
          this.error = error
        })
    },
  },
}
</script>

<style lang="scss">
.clickable {
  cursor: pointer;
}
</style>
