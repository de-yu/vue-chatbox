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
        <div class="editor">
        <b-code-editor
          v-model="json"
          height="600px"
          :auto-format="true"
          :smart-indent="true"
          theme="idea"
          :indent-unit="4"
          :line-wrap="false"
          ref="editor">
        </b-code-editor>
        <div class="test">
          <span>firstKey:</span>
          <input type="text" placeholder="firstkey" v-model="firstkey" />
          <div class="button" @click="submit"> 測試 </div>
        </div>
        </div>
        <div class="box">
          <ChatBox
            :script="script"
            :chatBoxOptions="chatBoxOptions"
            :firstStep="firstkey"
          ></ChatBox>
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
  display: flex;
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

.editor, .box
{
  width: 50%;
  height: 600px;
  padding: 16px;
}

.test
{
  margin-top:12px;
  display: flex;

  span {
    line-height: 35px;
  }

  input {
    height:30px;
    padding: 5px;
    margin:0 10px;
  }
}

</style>
<style>

.CodeMirror
{
  height:600px !important;
  border: 1px solid #aaa;
}

</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ChatBoxOption } from '@/interface/main';
import ChatBox from '@/components/ChatBox.vue';
import head from '@/assets/head.png';

@Component({
  components: {
    ChatBox,
  },
})
export default class TestingScript extends Vue {
  private json = `{
    "one": {
      "title": "有問題嗎",
      "type": "question",
      "option": [{
        "text": "問題1",
        "next": "two"
      }, {
        "text": "問題2",
        "next": "three"
      }, {
        "text": "問題3",
        "next": "four"
      }]
    },
    "two": {
      "title": "問題1回答",
      "type": "answer",
      "next": "one"
    },
    "three": {
      "title": "問題2回答",
      "type": "answer",
      "next": "one"
    },
    "four": {
      "title": "問題3回答",
      "type": "answer",
      "next": "one"
    }
  }`;

  private script = {};

  private firstkey = 'one';

  private chatBoxOptions: ChatBoxOption = {
    headImg: head,
  }

  private created() {
    this.submit();
  }

  private submit() {
    this.script = JSON.parse(this.json);
  }
}
</script>
