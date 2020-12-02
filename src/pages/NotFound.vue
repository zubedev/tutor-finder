<template>
  <section>
    <base-card>
      <h2>Page not found!</h2>
      <p>The page "{{ invalidUrl }}" could not be found.</p>
      <base-button link to="/" mode="outline">Back to Home Page</base-button>
    </base-card>
  </section>
</template>

<script>
export default {
  computed: {
    invalidUrl() { return this.$route.path; }
  }
}
</script>
