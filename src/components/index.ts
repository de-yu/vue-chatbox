import { VueConstructor } from 'vue';
import ChatBox from '@/components/ChatBox.vue';

export default {
  install(Vue: VueConstructor): void {
    Vue.component('ChatBox', ChatBox);
  },
};
