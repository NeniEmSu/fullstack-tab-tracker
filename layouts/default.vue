<template>
  <div>
    <b-navbar toggleable="md" variant="light">
      <b-container>
        <b-navbar-toggle target="nav_collapse" />
        <b-navbar-brand to="/">
          Tab Tracker
        </b-navbar-brand>

        <b-collapse id="nav_collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/" exact>
              Home
            </b-nav-item>
            <b-nav-item to="/public">
              Public
            </b-nav-item>
            <b-nav-item to="/secure">
              Secure
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <template v-if="$auth.loggedIn">
              <b-nav-item-dropdown
                class="text-capitalize"
                :text="$auth.user.name"
                right
              >
                <b-dropdown-item @click="$auth.logout()">
                  Logout
                </b-dropdown-item>
              </b-nav-item-dropdown>
              <b-img
                :src="picture"
                class="mt-1"
                rounded="circle"
                width="30px"
                height="30px"
              />
            </template>
            <template v-else>
              <b-dropdown-item to="/login">
                Login
              </b-dropdown-item>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <b-container>
      <nuxt />
    </b-container>
  </div>
</template>

<script>
import get from 'lodash.get'
export default {
  computed: {
    picture() {
      return (
        get(this.$auth.user, 'picture') || // OpenID
        get(this.$auth.user, 'picture.data.url') || // Facebook graph API
        get(this.$auth.user, 'avatar_url')
      ) // GitHub
    },
  },
}
</script>
