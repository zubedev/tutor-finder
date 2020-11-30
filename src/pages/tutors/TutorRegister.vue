<template>
  <section>
    <base-card>
      <h2>Register as a Tutor now!</h2>
      <TutorForm @save-data="saveData"/>
    </base-card>
  </section>
</template>

<script>
import TutorForm from "@/components/tutors/TutorForm";
export default {
  components: { TutorForm },
  methods: {
    saveData(data) {
      this.$store.dispatch('tutors/registerTutor', data);
      this.$router.replace('/tutors');
    }
  }
}
</script>
