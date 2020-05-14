<template>
  <div>
    <h1>{{ song.title }}</h1>
    <small>{{ $moment(song.createdAt).format('LLLL') }}</small>
    <p>{{ song.lyrics }}</p>
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
</template>

<script>
export default {
  data() {
    return {
      song: {},
      songsLoading: false,
    }
  },
  created() {
    this.getSong()
  },
  methods: {
    async getSong() {
      this.songsLoading = true
      try {
        const data = await this.$axios.$get(
          `/api/song/${this.$route.params.id}`
        )
        this.song = data.song
      } catch (error) {
        this.$swal('Error', error.response.data.error, 'error')
      }
      this.songsLoading = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
