<template>
  <div>
    <TheHeader />
    <b-container>
      <nuxt />
    </b-container>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'
export default {
  components: {
    TheHeader,
  },
}
</script>
