<template>
  <div id="app">

      <div class="title">
        <h1>Vue-ChatBotBox</h1>
        <div class="button-group">
          <a class="button" href="https://www.npmjs.com/package/vue-chatbotbox">
              npm
          </a>
          <a class="button" href="https://github.com/de-yu/vue-chatbox">
              github
          </a>
          <a class="button" href="./TestingScript.html">
              測試
          </a>
        </div>
      </div>
      <div class="main">
      <div class="message">
        <h3>設定好固定的腳本提供對話式的問答</h3>
      </div>
      <div class="example">
        <ChatBox :script="script" :chatBoxOptions="chatBoxOptions" firstStep="one"></ChatBox>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

*
{
  font-family: Roboto,Noto Sans TC,sans-serif;
}

#app
{
  padding: 0;
  margin: 0;
}

.main
{
  max-width: 1200px;
  margin: 0 auto;
}

.title ,.message ,.example
{
  display: table;
  margin: 0 auto;
  text-align: center;
}

.title
{
  background: #42464E;
  width: 100%;
  height: 150px;
  color: #61C3EE;
  padding: 0;
  margin: 0;

}

.title h1 {
  line-height: 150px;
  letter-spacing: 18px;
}

.button-group
{
  display: flex;
  justify-content: center;

 }

.button {
  display: table;
  padding: 10px 20px;
  margin-right: 15px;
  margin-bottom: 25px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
}

.button:nth-child(1)
{
  background:cornflowerblue;
}

.button:nth-child(2)
{
  background:darkcyan;
}

.button:nth-child(3)
{
  background:darkturquoise;
}

.message
{
  font-size: 18px;
  letter-spacing: 8px;
  margin: 24px auto;
}

.install-method
{
  display: flex;
}

.install-message {
  width: 50%
}

.example
{
  width:400px;
  height:600px;
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ChatScript, ChatBoxOption } from '@/interface/main';
import head from '@/assets/head.png';
import ChatBox from '@/components/ChatBox.vue';
import ChatHelper from '@/components/ChatHelper.vue';

@Component({
  components: {
    ChatBox,
    ChatHelper,
  },
})
export default class App extends Vue {
  private script: ChatScript = {
    one: {
      title: '有問題嗎',
      type: 'question',
      option: [{
        text: '問題1',
        next: 'two',
      }, {
        text: '問題2',
        next: 'three',
      }, {
        text: '問題3',
        next: 'four',
      }],
    },
    two: {
      title: '問題1回答',
      type: 'answer',
      next: 'one',
    },
    three: {
      title: '問題2回答',
      type: 'answer',
      next: 'one',
    },
    four: {
      title: '問題3回答',
      type: 'answer',
      next: 'one',
    },
  }

  private chatBoxOptions: ChatBoxOption = {
    headImg: head,
  }
}
</script>
