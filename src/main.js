import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import "./assets/index.scss";
import JsBarcode from "jsbarcode";

import Vue3SimpleHtml2pdf from "vue3-simple-html2pdf";

createApp(App).use(store).use(router).use(Vue3SimpleHtml2pdf).mount("#app");
