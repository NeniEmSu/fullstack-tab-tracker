<template>
  <div>
    <b-alert show variant="success" dismissible>
      You should see this page without need to authentication!
    </b-alert>
    <h1>Songs</h1>
    <b-card-group columns>
      <div v-if="!allSongs" class="no-songs">
        <p>Sorry no songs at the moment, consider adding one.</p>
      </div>
      <div v-for="song in allSongs" v-else :key="song._id">
        <b-card
          :title="song.title"
          :img-src="song.albumImageUrl"
          :img-alt="song.title"
          img-top
        >
          <b-card-text>
            {{ song.lyrics | truncate(80, '...') }}
          </b-card-text>
          <nuxt-link
            :to="{
              name: 'song-title_slug-id',
              params: { title_slug: song.title_slug, id: song._id },
            }"
          >
            {{ song.title }}
          </nuxt-link>
          <b-card-text class="small text-muted"
            >Last updated
            {{ $moment(song.updatedAt).format('LLLL') }}</b-card-text
          >
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
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
      allSongs: [],
      songsLoading: '',
    }
  },
  created() {
    this.getAllSongs()
  },
  methods: {
    async getAllSongs() {
      this.songsLoading = true
      try {
        const data = await this.$axios.$get('/api/song')
        this.allSongs = data.songs
      } catch (error) {
        this.$swal('Error', error.response.data.error, 'error')
      }
      this.songsLoading = false
    },
  },
}
</script>
