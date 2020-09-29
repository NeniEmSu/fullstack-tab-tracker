<template>
  <section>
    <b-alert v-if="!editState" show variant="warning" dismissible>
      You should see this page without need for authentication, but youll need
      to login as the account that created the song to use the edit and delete
      functionality .
    </b-alert>
    <div class="container my-4">
      <div class="row">
        <div class="col-md-12">
          <b-alert v-if="error" show variant="danger">
            <h4 class="alert-heading">Error</h4>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="error"></div>
          </b-alert>
          <div v-if="editState" class="card">
            <div class="card-body">
              <div class="card-title mb-4">
                <h4>Edit Song</h4>
              </div>
              <b-form class="row" @submit.prevent="editSong">
                <b-form-group
                  id="title"
                  label="Song Title:"
                  label-for="title"
                  class="col-md-4 col-sm-6"
                >
                  <b-form-input
                    id="title"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="Enter email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="artist"
                  label="Song Artist:"
                  label-for="artist"
                  class="col-md-4 col-sm-6"
                >
                  <b-form-input
                    id="artist"
                    v-model="form.artist"
                    type="text"
                    required
                    placeholder="Enter artist"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="genre"
                  class="col-md-4 col-sm-6"
                  label="Song Genre:"
                  label-for="genre"
                >
                  <b-form-input
                    id="genre"
                    v-model="form.genre"
                    type="text"
                    required
                    placeholder="Enter genre"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="album"
                  class="col-md-4 col-sm-6"
                  label="Song Album:"
                  label-for="album"
                >
                  <b-form-input
                    id="album"
                    v-model="form.album"
                    type="text"
                    required
                    placeholder="Enter album"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="albumImageUrl"
                  class="col-md-4 col-sm-6"
                  label="Album image url:"
                  label-for="albumImageUrl"
                >
                  <b-form-input
                    id="albumImageUrl"
                    v-model="form.albumImageUrl"
                    type="text"
                    required
                    placeholder="Enter albumImageUrl"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="youtubeId"
                  class="col-md-4 col-sm-6"
                  label="Youtube Id:"
                  label-for="youtubeId"
                >
                  <b-form-input
                    id="youtubeId"
                    v-model="form.youtubeId"
                    type="text"
                    required
                    placeholder="Enter youtubeId"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="lyrics"
                  label="Song Lyrics:"
                  label-for="lyrics"
                  class="col-md-6"
                >
                  <b-form-textarea
                    id="lyrics"
                    v-model="form.lyrics"
                    multi-line
                    required
                    placeholder="Enter lyrics"
                    rows="7"
                  ></b-form-textarea>
                </b-form-group>

                <b-form-group
                  id="tab"
                  label="Song Tabs:"
                  label-for="tab"
                  class="col-md-6"
                >
                  <b-form-textarea
                    id="tab"
                    v-model="form.tab"
                    multi-line
                    required
                    placeholder="Enter tab..."
                    rows="7"
                  ></b-form-textarea>
                </b-form-group>

                <b-overlay
                  :show="songsLoading"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="primary"
                  class="d-inline-block"
                  @hidden="onHidden"
                >
                  <b-button
                    ref="button"
                    type="submit"
                    variant="primary"
                    class="ml-3"
                  >
                    Submit
                  </b-button>
                </b-overlay>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <h1>{{ song.title }}</h1>
      <b-button
        v-if="$auth.loggedIn"
        class="ml-4"
        variant="light"
        :disabled="song._userId !== $auth.user.id"
        @click="editState = !editState"
      >
        <b-icon icon="pencil-square" font-scale="1.5"> </b-icon>
      </b-button>

      <b-icon icon="bookmark-plus" class="ml-4" font-scale="1.5"> </b-icon>

      <b-button
        v-if="$auth.loggedIn"
        class="ml-auto"
        variant="light"
        :disabled="song._userId !== $auth.user.id"
        @click="deleteSong(song._id)"
      >
        <b-icon
          icon="trash-fill"
          color="danger"
          variant="danger"
          font-scale="1.5"
        ></b-icon>
      </b-button>
    </div>

    <small>{{ $moment(song.createdAt).format('LLLL') }}</small> <br />
    <div class="row">
      <b-img
        thumbnail
        fluid
        width="300"
        :src="song.albumImageUrl"
        :alt="`${song.title} ${song.album}`"
      />
      <iframe
        loading="lazy"
        width="560"
        height="315"
        :src="`https://www.youtube.com/embed/${song.youtubeId}`"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <div class="mt-3 row">
      <textarea
        v-model="song.lyrics"
        readonly
        class="display col-md-6"
      ></textarea>
      <textarea v-model="song.tab" readonly class="display col-md-6"></textarea>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      song: {},
      form: {
        title: '',
        artist: '',
        genre: '',
        album: '',
        albumImageUrl: '',
        youtubeId: '',
        lyrics: '',
        tab: '',
      },
      error: '',
      editState: false,
      songsLoading: false,
    }
  },
  mounted() {
    this.getSong()
  },
  methods: {
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.button.focus()
    },
    async getSong() {
      this.songsLoading = true
      try {
        const data = await this.$axios.$get(
          `/api/song/${this.$route.params.id}`
        )
        this.song = data.song
        this.form = data.song
      } catch (error) {
        this.$swal('Error', error.response.data.error, 'error')
      }
      this.songsLoading = false
    },
    async editSong() {
      this.songsLoading = true
      try {
        await this.$axios
          .put(`/api/song/${this.$route.params.id}`, {
            title: this.form.title,
            artist: this.form.artist,
            genre: this.form.genre,
            album: this.form.album,
            albumImageUrl: this.form.albumImageUrl,
            youtubeId: this.form.youtubeId,
            lyrics: this.form.lyrics,
            tab: this.form.tab,
          })
          .then((response, append = false) => {
            this.$store.dispatch('toast/setToast', {
              title: 'Success',
              variant: response.data.type,
              text: response.data.message,
              delay: 5000,
            })
            this.getSong()
            this.editState = false
          })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.songsLoading = false
    },
    deleteSong(id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      }).then((willDelete) => {
        if (willDelete.value) {
          this.$axios
            .$delete(`/api/song/${id}`)
            .then((response) => {
              this.$router.push('/songs')
              this.$swal({
                text: "Poof! You've sucessfully deleted that song!",
                icon: 'success',
              })
            })
            .catch((error) => {
              this.$swal({
                title: 'Somethimg went wrong!',
                text: error.response.data.error,
                icon: 'error',
              })
            })
        } else {
          this.$swal("That song's data is safe!")
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
textarea.display {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
