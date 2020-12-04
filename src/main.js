import { createApp, defineAsyncComponent } from 'vue';

import App from "@/App";
import Router from "@/router";
import Store from "@/store";

import BaseBadge from "@/components/ui/BaseBadge";
import BaseButton from "@/components/ui/BaseButton";
import BaseCard from "@/components/ui/BaseCard";
import BaseSpinner from "@/components/ui/BaseSpinner";
// import BaseDialog from "@/components/ui/BaseDialog";

const BaseDialog = defineAsyncComponent(() => import('@/components/ui/BaseDialog'));

const app = createApp(App);

app.use(Router);
app.use(Store);

app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
