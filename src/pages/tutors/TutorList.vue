<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Tutor</router-link>
    </div>
    <ul v-if="hasTutors">
      <TutorItem
          v-for="tutor in filteredTutors"
          :key="tutor.id"
          :id="tutor.id"
          :first-name="tutor.firstName"
          :last-name="tutor.lastName"
          :rate="tutor.rate"
          :areas="tutor.areas"
      />
    </ul>
    <h3 v-else>No tutors found!</h3>
  </section>
</template>

<script>
import TutorItem from "@/components/tutors/TutorItem";
export default {
  components: { TutorItem },
  computed: {
    hasTutors() {
      return this.$store.getters['tutors/hasTutors'];
    },
    filteredTutors() {
      return this.$store.getters['tutors/tutorsList'];
    }
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
