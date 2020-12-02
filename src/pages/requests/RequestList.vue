<template>
  <div>
    <base-dialog :show="!!errorMessage" @close="handleError" title="An error has occured!">
      <p>{{ errorMessage }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests">
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
  </div>
</template>

<script>
import RequestsItem from "@/components/requests/RequestsItem";
export default {
  components: { RequestsItem },
  data() {
    return {
      isLoading: false,
      errorMessage: null
    }
  },
  computed: {
    requestsReceived() { return this.$store.getters['requests/requestsList']; },
    hasRequests() { return !this.isLoading && this.$store.getters['requests/hasRequests']; }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try { await this.$store.dispatch('requests/loadRequests'); }
      catch (error) { this.errorMessage = error; }
      this.isLoading = false;
    },
    handleError() { this.errorMessage = null; }
  },
  created() { this.loadRequests(); }
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