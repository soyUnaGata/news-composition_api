import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/scss/__fonts.scss";
import "@/assets/scss/__global.scss";
import "@/assets/scss/__reset.scss";
import "@/assets/scss/__vars.scss";
import "@/assets/scss/main.scss";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

createApp(App).mount("#app");
