<template>
  <section>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{errors: !fields.email.isValid}">
        <label for="email">Your Email</label>
        <input type="email" id="email" :required="fields.email.required" v-model.trim="fields.email.value" @keyup="validateField('email')">
        <p v-if="!fields.email.isValid">Must provide a valid email address</p>
      </div>
      <div class="form-control" :class="{errors: !fields.message.isValid}">
        <label for="message">Your Message</label>
        <textarea rows="5" id="message" :required="fields.message.required" v-model.trim="fields.message.value" @keyup="validateField('message')"></textarea>
        <p v-if="!fields.message.isValid">Must provide a message for tutor</p>
      </div>
      <p v-if="!formIsValid">Form is invalid, please check your input</p>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fields: {
        email: { value: '', required: true, isValid: true },
        message: { value: '', required: true, isValid: true },
      },
      formIsValid: true
    }
  },
  methods: {
    validateField(fieldName) {
      const field = this.fields[fieldName];
      if (fieldName === 'email') { field.isValid = !(field.value === '' || !field.value.includes('@')); }
      else { field.isValid = field.value !== ''; }
      this.validateForm();
    },
    validateForm() {
      this.formIsValid = true; // reset
      for (const field in this.fields) { if (!this.fields[field].isValid) { this.formIsValid = false; } }
    },
    submitForm() {
      for (const field in this.fields) { this.validateField(field); }
      if (!this.formIsValid) { return; }

      let formData = {}
      for (const field in this.fields) { formData[field] = this.fields[field].value; }
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}
.form-control {
  margin: 0.5rem 0;
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
.errors {
  font-weight: bold;
  color: red;
}
.actions {
  text-align: center;
}
</style>
