<template>
     <el-dialog @opened="openDialog" v-model="dialogVisible" fullscreen :initial-focus="'#lock'" :show-close="false" :lock-scroll="true" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <screenLock ref="lockScreen" />
    </el-dialog>
</template>
<script>
import { computed, nextTick } from 'vue'
import screenLock from '../views/LockScreen.vue'
import { useStore } from "vuex";
export default {
    components: {
    screenLock,
  },
  setup(){
    const store = useStore();
    let dialogVisible = computed(function(){
        return store.getters.getLockScreenVisibility
    })
    return{
        dialogVisible,
    }
  },
  methods:{
    openDialog() {
      nextTick(()=>{
        this.$refs.lockScreen.$refs.lock.input.value=''
        this.$refs.lockScreen.$refs.lock.focus()
      })
      let dia = document.getElementsByClassName('el-dialog')
      dia[0].setAttribute('id','exampleModal')
      const focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const modal = document.querySelector('#exampleModal'); // select the modal by it's id

      const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
      const focusableContent = modal.querySelectorAll(focusableElements);
      const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal


      document.addEventListener('keydown', function (e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
          return;
        }

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus(); // add focus for the last focusable element
            e.preventDefault();
          }
        } else { // if tab key is pressed
          if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement.focus(); // add focus for the first focusable element
            e.preventDefault();
          }
        }
      });

      firstFocusableElement.focus();
    },

  },
}
</script>