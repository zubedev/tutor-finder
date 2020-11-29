<template>
  <base-card>
    <section>FILTER</section>
  </base-card>
  <base-card>
    <section>
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
    </section>
  </base-card>
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
