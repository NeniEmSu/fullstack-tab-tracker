<template>
  <div>
    <b-alert show variant="warning" dismissible>
      You should see this page without need for authentication, but youll need
      to login to use the add functionality.
    </b-alert>
    <h1>Add a New song</h1>
    <b-alert v-if="error" show variant="danger">
      <h4 class="alert-heading">Error</h4>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="error"></div>
    </b-alert>
    <b-form class="row my-3" @submit.prevent="addNewSong">
      <b-form-group
        id="title"
        label="Song Title:"
        label-for="title"
        class="col-md-6"
      >
        <b-form-input
          id="title"
          v-model="title"
          type="text"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="artist"
        label="Song Artist:"
        label-for="artist"
        class="col-md-6"
      >
        <b-form-input
          id="artist"
          v-model="artist"
          type="text"
          required
          placeholder="Enter artist"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="genre"
        class="col-md-6"
        label="Song Genre:"
        label-for="genre"
      >
        <b-form-input
          id="genre"
          v-model="genre"
          type="text"
          required
          placeholder="Enter genre"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="album"
        class="col-md-6"
        label="Song Album:"
        label-for="album"
      >
        <b-form-input
          id="album"
          v-model="album"
          type="text"
          required
          placeholder="Enter album"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="albumImageUrl"
        class="col-md-6"
        label="Album image url:"
        label-for="albumImageUrl"
      >
        <b-form-input
          id="albumImageUrl"
          v-model="albumImageUrl"
          type="text"
          required
          placeholder="Enter albumImageUrl"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="youtubeId"
        class="col-md-6"
        label="Youtube Id:"
        label-for="youtubeId"
      >
        <b-form-input
          id="youtubeId"
          v-model="youtubeId"
          type="text"
          required
          placeholder="Enter youtubeId"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="lyrics"
        label="Song Lyrics:"
        label-for="lyrics"
        class="col-12"
      >
        <b-form-textarea
          id="lyrics"
          v-model="lyrics"
          multi-line
          required
          placeholder="Enter lyrics"
          rows="3"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="tab" label="Song Tabs:" label-for="tab" class="col-12">
        <b-form-textarea
          id="tab"
          v-model="tab"
          multi-line
          required
          placeholder="Enter tab..."
          rows="3"
        ></b-form-textarea>
      </b-form-group>

      <b-overlay
        :show="addLoading"
        rounded
        opacity="0.6"
        spinner-small
        spinner-variant="primary"
        class="d-inline-block"
        @hidden="onHidden"
      >
        <b-button
          ref="button"
          :disabled="!$auth.loggedIn"
          type="submit"
          variant="primary"
          class="ml-3"
        >
          Submit
        </b-button>
      </b-overlay>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Old town road',
      artist: 'Lil Nas X ft. Billy Ray Cyrus',
      genre: 'HipHop',
      album: 'old time road',
      albumImageUrl:
        'https://images.firstpost.com/wp-content/uploads/2019/07/lil-nas-min.jpg',
      youtubeId: 'w2Ov5jzm3j8',
      lyrics: "Yeah, I'm gonna take my horse to the old town road",
      tab: "Yeah, I'm gonna take my horse to the old town road",
      addLoading: false,
      error: '',
    }
  },
  methods: {
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.button.focus()
    },
    async addNewSong() {
      this.addLoading = true
      try {
        await this.$axios
          .post('/api/song', {
            title: this.title,
            artist: this.artist,
            genre: this.genre,
            album: this.album,
            albumImageUrl: this.albumImageUrl,
            youtubeId: this.youtubeId,
            lyrics: this.lyrics,
            tab: this.tab,
          })
          .then((response, append = false) => {
            this.$store.dispatch('toast/setToast', {
              title: 'Success',
              variant: response.data.type,
              text: response.data.message,
              delay: 5000,
            })
            this.$router.push({
              name: 'songs-title_slug-id',
              params: {
                title_slug: response.data.newSong.title_slug,
                id: response.data.newSong._id,
              },
            })
          })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.addLoading = false
    },
  },
}
</script>
