<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="hasRequests">
        <RequestsItem
            v-for="request in requestsReceived"
            :key="request.id"
            :email="request.email"
            :message="request.message"
        />
      </ul>
      <h3 v-else>You have not received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestsItem from "../../components/requests/RequestsItem";
export default {
  components: { RequestsItem },
  computed: {
    requestsReceived() {
      return this.$store.getters['requests/requestsList'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    }
  }
}
</script>

<style scoped>
header {
  text-align: center;
}
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}
h3 {
  text-align: center;
}
</style>