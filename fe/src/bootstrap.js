import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { VueMaskDirective } from 'v-mask';
import { vueKeycloak, useKeycloak } from '@teresol/vue-keycloak'
import style from '../src/assets/style.css'
import Maska from 'maska'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
    beforeMount: vMaskV2.bind,
    updated: vMaskV2.componentUpdated,
    unmounted: vMaskV2.unbind
};
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
/////////////////////Auto Logout App (Custom)////////////////////////////
const timeoutInMS = 1200000; // 20 min
const autoLockTimeoutInMS = 300000; // 5 min
let timeoutId;
let autoLockTimeout;
function handleInactive() {
    useKeycloak().keycloak.logout();
}
function autoLockScreen() {
    if (!store.getters.getDisableLockScreen)
    {
        store.dispatch('lockScreen', true)
    }
}
function startTimer() {
    timeoutId = setTimeout(handleInactive, timeoutInMS);
    autoLockTimeout = setTimeout(autoLockScreen, autoLockTimeoutInMS)
}

function resetTimer() {
    clearTimeout(timeoutId);
    clearTimeout(autoLockTimeout);
    startTimer();
}


function setupTimers() {
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("keyup", resetTimer, false);
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);

    startTimer();
}
const app = createApp(App).use(store).use(router)
app.use(setupTimers)
app.use(ElementPlus)
app.directive('mask', vMaskV3)
app.use(Maska);
app.use(PrimeVue);
app.use(VueViewer)
app.use(VueSweetalert2);
app.use(style)
app.use(VueAxios, axios)
app.use(vueKeycloak, {
    initOptions: {
        flow: 'standard', // default
        checkLoginIframe: false, // default
        onLoad: 'login-required', // default
        redirectUri: process.env.VUE_APP_REDIRECTURI
    },
    config: {
        url: process.env.VUE_APP_KEYCLOAKURL,
        realm: 'ahbs-realm',
        clientId: 'ahbs-fe',
        "enable-cors": true
    }
})
app.mount('#app')
