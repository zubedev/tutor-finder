<template>
  <section>
    <base-dialog :show="!!errorMessage" @close="handleError" title="An error has occured!">
      <p>{{ errorMessage }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Registering..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
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
  data() {
    return {
      isLoading: false,
      errorMessage: null
    }
  },
  methods: {
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('tutors/registerTutor', data);
      } catch(error) {
        this.errorMessage = error;
        this.isLoading = false; return;
      }
      this.isLoading = false;
      this.$router.replace('/tutors');
    },
    handleError() { this.errorMessage = null; }
  }
}
</script>
