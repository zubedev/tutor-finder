<template>
  <base-dialog :show="!!errorMessage" @close="handleError" title="An error has occured!">
    <p>{{ errorMessage }}</p>
  </base-dialog>
  <section>
    <TutorFilter @change-filter="setFilters" />
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadTutors(true)" :disabled="isLoading">Refresh</base-button>
        <base-button link to="/register" v-if="!isTutor && !isLoading">Register as Tutor</base-button>
      </div>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasTutors">
        <TutorItem
            v-for="tutor in filteredTutors"
            :key="tutor.id"
            :id="tutor.id"
            :first-name="tutor.firstName"
            :last-name="tutor.lastName"
            :rate="tutor.hourlyRate"
            :areas="tutor.areas"
        />
      </ul>
      <h3 v-else>No tutors found!</h3>
    </base-card>
  </section>
</template>

<script>
import TutorItem from "@/components/tutors/TutorItem";
import TutorFilter from "@/components/tutors/TutorFilter";
export default {
  components: { TutorItem, TutorFilter },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      filters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  computed: {
    isTutor() { return this.$store.getters['tutors/isTutor']; },
    hasTutors() { return !this.isLoading && this.$store.getters['tutors/hasTutors']; },
    filteredTutors() {
      return this.$store.getters['tutors/tutorsList'].filter(tutor => {
        if (this.filters.frontend && tutor.areas.includes('frontend')) { return true; }
        if (this.filters.backend && tutor.areas.includes('backend')) { return true; }
        if (this.filters.career && tutor.areas.includes('career')) { return true; }
        return false;
      });
    }
  },
  methods: {
    setFilters(filters) { this.filters = filters; },
    handleError() { this.errorMessage = null; },
    async loadTutors(forceUpdate = false) {
      this.isLoading = true;
      try { await this.$store.dispatch('tutors/loadTutors', {forceUpdate: forceUpdate}); }
      catch (error) { this.errorMessage = error; }
      this.isLoading = false;
    },
  },
  created() { this.loadTutors(); }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
