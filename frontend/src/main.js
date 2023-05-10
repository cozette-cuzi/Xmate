import 'default-passive-events';
import 'font-awesome/css/font-awesome.css'
import Vue from "vue";
import '@/plugins/vuetify'
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/registerServiceWorker";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios';
import api from '@/constants/api';
import moment from 'moment';
import titleMixin from '@/mixins/titleMixin'
import {ChartPlugin} from "@syncfusion/ej2-vue-charts";


Vue.config.productionTip = false;
axios.defaults.timeout = 1000 * 300;
axios.defaults.baseURL = api.MAIN_URL + '/api/';

Vue.prototype.axios = axios;
Vue.prototype.api = api;
Vue.prototype.moment = moment;
Vue.use(ChartPlugin);

window.moment = moment;

Vue.mixin(titleMixin);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
