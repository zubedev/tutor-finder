<template>
  <li>
    <h3>{{ firstName + ' ' + lastName }}</h3>
    <h3>${{ rate }}/hr</h3>
    <div>
      <base-badge
          v-for="area in areas"
          :key="area"
          :text="area"
          :type="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button link :to="contactLink" mode="outline">Contact</base-button>
      <base-button link :to="detailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    rate: { type: Number, required: true },
    areas: { type: Array, required: true },
  },
  computed: {
    detailsLink() {
      return this.$route.path + '/' + this.id;
    },
    contactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    }
  }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}
h3 {
  font-size: 1.5rem;
}
h3,
h4 {
  margin: 0.5rem 0;
}
div {
  margin: 0.5rem 0;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
