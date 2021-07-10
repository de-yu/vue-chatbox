import Vue from 'vue';
import CodeEditor from 'bin-code-editor';
import TestingScript from './views/TestingScript.vue';

Vue.use(CodeEditor);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(TestingScript),
}).$mount('#app');
