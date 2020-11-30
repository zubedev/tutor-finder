<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !fields.firstName.isValid}">
      <label for="firstName">First name</label>
      <input type="text" id="firstName" v-model.trim="fields.firstName.value" @keyup="validateField('firstName')">
      <p v-if="!fields.firstName.isValid">First name can not be empty</p>
    </div>
    <div class="form-control" :class="{invalid: !fields.lastName.isValid}">
      <label for="lastName">Last name</label>
      <input type="text" id="lastName" v-model.trim="fields.lastName.value" @keyup="validateField('lastName')">
      <p v-if="!fields.lastName.isValid">Last name can not be empty</p>
    </div>
    <div class="form-control" :class="{invalid: !fields.description.isValid}">
      <label for="description">Description</label>
      <textarea rows="3" id="description" v-model.trim="fields.description.value" @keyup="validateField('description')"></textarea>
      <p v-if="!fields.description.isValid">Description can not be empty</p>
    </div>
    <div class="form-control" :class="{invalid: !fields.hourlyRate.isValid}">
      <label for="hourlyRate">Hourly rate</label>
      <input type="number" id="hourlyRate" v-model.number="fields.hourlyRate.value" @keyup="validateField('hourlyRate')">
      <p v-if="!fields.hourlyRate.isValid">Hourly rate can not be empty or negative</p>
    </div>
    <div class="form-control" :class="{invalid: !fields.areas.isValid}">
      <h3>Area of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="fields.areas.value" @change="validateField('areas')">
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="fields.areas.value" @change="validateField('areas')">
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="fields.areas.value" @change="validateField('areas')">
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!fields.areas.isValid">Must select at least one area of expertise</p>
    </div>
    <p v-if="!formIsValid">Form is invalid! Please check your input</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      fields: {
        firstName: { value: '', isValid: true },
        lastName: { value: '', isValid: true },
        description: { value: '', isValid: true },
        hourlyRate: { value: null, isValid: true },
        areas: { value: [], isValid: true },
      },
      formIsValid: true
    }
  },
  methods: {
    validateField(fieldName) {
      const field = this.fields[fieldName];
      if (fieldName === 'hourlyRate') {
        field['isValid'] = !(field['value'] === null || field['value'] < 0 || field['value'] === '');
      } else if (fieldName === 'areas') {
        field['isValid'] = field['value'].length > 0
      } else { field['isValid'] = field['value'] !== ''; }
      this.validateForm();
    },
    validateForm() {
      this.formIsValid = true; // reset
      for (const field in this.fields) { if (!this.fields[field]['isValid']) { this.formIsValid = false; } }
    },
    submitForm() {
      for (const field in this.fields) { this.validateField(field); }
      if (!this.formIsValid) { return }

      let formData = {}
      for (const field in this.fields) { formData[field] = this.fields[field].value; }
      this.$emit('save-data', formData);
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}
input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}
input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}
input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}
input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}
h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}
.invalid label {
  color: red;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
