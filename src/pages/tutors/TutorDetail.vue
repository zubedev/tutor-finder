<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hr</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
          v-for="area in areas"
          :key="area"
          :text="area"
          :type="area"
      ></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      tutor: null
    }
  },
  computed: {
    fullName() { return this.tutor.firstName + ' ' + this.tutor.lastName; },
    description() { return this.tutor.description; },
    rate() { return this.tutor.hourlyRate; },
    areas() { return this.tutor.areas; },
    contactLink() { return this.$route.path + '/contact'; }
  },
  created() {
    this.tutor = this.$store.getters['tutors/tutorsList'].find(
        tutor => tutor.id === this.id
    );
  }
}
</script>
