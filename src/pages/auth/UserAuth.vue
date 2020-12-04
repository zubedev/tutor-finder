<template>
  <div>
    <base-dialog :show="!!errorMessage" @close="handleError" title="An error has occured!">
      <p>{{ errorMessage }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !fields.email.isValid}">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="fields.email.value" @keyup="validateField('email')" :required="fields.email.required">
          <p v-if="!fields.email.isValid">Please enter a valid email address</p>
        </div>
        <div class="form-control" :class="{invalid: !fields.password.isValid}">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="fields.password.value" @keyup="validateField('password')" :required="fields.password.required">
          <p v-if="!fields.password.isValid">Password can not be less than 6 characters</p>
        </div>
        <div class="actions">
          <base-button>{{ buttonCaption }}</base-button>
          <base-button type="button" mode="flat" @click="switchMode">Switch to {{ switchCaption }}</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: {
        email: { value: '', required: true, isValid: true },
        password: { value: '', required: true, isValid: true },
      },
      loginMode: true,
      formIsValid: true,
      isLoading: false,
      errorMessage: null
    }
  },
  computed: {
    buttonCaption() {
      if (this.loginMode) { return "Login"; }
      else { return "Signup"; }
    },
    switchCaption() {
      if (this.loginMode) { return "Signup"; }
      else { return "Login"; }
    }
  },
  methods: {
    switchMode() { this.loginMode = !this.loginMode; },
    validateField(fieldName) {
      const field = this.fields[fieldName];
      if (fieldName === 'email') { field.isValid = !(field.value === '' || !field.value.includes('@')); }
      else if (fieldName === 'password') { field.isValid = field.value.length >= 6; }
      this.validateForm();
    },
    validateForm() {
      this.formIsValid = true; // reset
      for (const field in this.fields) { if (!this.fields[field].isValid) { this.formIsValid = false; } }
    },
    async submitForm() {
      for (const field in this.fields) { this.validateField(field); }
      if (!this.formIsValid) { return; }

      this.isLoading = true;
      let formData = {loginMode: this.loginMode};
      for (const field in this.fields) { formData[field] = this.fields[field].value; }
      try { await this.$store.dispatch('auth/authenticate', formData); }
      catch (error) { this.errorMessage = error; this.isLoading = false; return; }
      this.isLoading = false;
      const redirectUrl = `/${this.$route.query.redirect || "tutors"}`;
      this.$router.replace(redirectUrl);
    },
    handleError() { this.errorMessage = null; }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}
.form-control {
  margin: 0.5rem 0;
}
.actions {
  display: flex;
  justify-content: space-between;
}
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}
input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}
input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
.invalid label,
.invalid p {
  color: red;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
