import { createApp } from 'vue';

import App from "@/App";
import Router from "@/router";
import Store from "@/store";

import BaseBadge from "@/components/ui/BaseBadge";
import BaseButton from "@/components/ui/BaseButton";
import BaseCard from "@/components/ui/BaseCard";

const app = createApp(App);

app.use(Router);
app.use(Store);

app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);

app.mount('#app');
