<template>
  <div>
    <b-alert show variant="success" dismissible>
      You should see this page without need to authentication!
    </b-alert>
    <div class="d-flex align-items-center mb-3 row">
      <h1>Songs</h1>
      <b-button
        class="mx-4"
        variant="light"
        :disabled="!$auth.loggedIn"
        to="/songs/add"
      >
        <b-icon icon="plus-circle-fill" variant="success" font-scale="1.5">
        </b-icon>
      </b-button>
      <b-form-group class="col-sm ml-auto my-auto">
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="search" font-scale="1.5"> </b-icon>
          </b-input-group-prepend>
          <b-input
            v-model="search"
            type="text"
            placeholder="Search by song title, artist, album or genre"
            required
            name="Search"
          />
        </b-input-group>
      </b-form-group>
    </div>

    <div v-if="allSongs.length < 1" class="no-songs">
      <p>
        <span v-if="search"
          >Unfortunately your search retuned no songs at the moment, consider
          using a different query or add {{ `${search}` }}</span
        >
        <span v-else>
          Sorry not songs to show at hte moment, considier adding one</span
        >.
      </p>
    </div>
    <b-card-group v-else columns>
      <div v-for="song in allSongs" :key="song._id">
        <b-card
          :title="song.title"
          :img-src="song.albumImageUrl"
          :img-alt="song.title"
          img-top
        >
          <b-card-text class="small text-muted"
            >Last updated
            {{ $moment(song.updatedAt).format('LLLL') }}
          </b-card-text>
          <b-card-text>
            {{ song.lyrics | truncate(80, '...') }}
          </b-card-text>
          <nuxt-link
            tag="button"
            class="btn btn-primary"
            :to="{
              name: 'songs-title_slug-id',
              params: { title_slug: song.title_slug, id: song._id },
            }"
          >
            View Song
          </nuxt-link>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  middleware: ['auth'],
  options: {
    auth: false,
  },
  filters: {
    truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    },
  },
  data() {
    return {
      search: '',
      allSongs: [],
      songsLoading: '',
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      // eslint-disable-next-line no-console
      console.log(value)
      const route = {
        name: 'songs',
      }
      if (this.search !== '') {
        route.query = {
          search: this.search,
        }
      }
      await this.$router.push(route)
    }, 1500),
    '$route.query.search': {
      immediate: true,
      handler(value) {
        this.search = value
        this.getAllSongs(value)
      },
    },
  },
  mounted() {
    this.getAllSongs(this.search)
  },
  methods: {
    async getAllSongs(search) {
      this.songsLoading = true
      try {
        const data = await this.$axios.$get('/api/song', {
          params: { search },
        })
        this.allSongs = data.songs
      } catch (error) {
        this.$swal('Error', error.response.data.error, 'error')
      }
      this.songsLoading = false
    },
  },
}
</script>
