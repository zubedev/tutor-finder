<template>
  <section>
    <TutorFilter @change-filter="setFilters" />
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register as Tutor</base-button>
      </div>
      <ul v-if="hasTutors">
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
      filters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  computed: {
    hasTutors() {
      return this.$store.getters['tutors/hasTutors'];
    },
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
    setFilters(filters) { this.filters = filters; }
  }
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
