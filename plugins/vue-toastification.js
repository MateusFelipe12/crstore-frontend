import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 6,
  newestOnTop: true,
  position: "bottom-right",
});