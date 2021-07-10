<template>
  <div>
    <div class="chat-button"
    :style="{background: option.buttonColor, color: option.buttonFontColor}"
     v-if="showbutton" @click="showbox">
      {{ option.name }}
    </div>
    <div class="chatbox" :style="{width: option.width, height: option.height}" v-else>
      <div class="chatbox-top" :style="{background: option.barColor}">
        <div class="top-title"> {{ option.name }}</div>
        <div class="space"></div>
        <div class="top-small" @click="hiddenBox"> — </div>
      </div>
      <div class="chat-block" ref="chatBlock" :style="{background: option.talkBackground}">
        <div>
          <div class="history">
            <div class="history-item" v-for="(item, index) in history" :key="index">
               <ChatTalk :script="item" :head="option.headImg"></ChatTalk>
            </div>
          </div>
          <ChatTalk :script="script[step]"
          canClick = "true"
          :head="option.headImg" @selectNext="selectNext"></ChatTalk>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-button {
  position: fixed;
  right:20px;
  bottom:30px;
  display: table;
  padding: 10px;
  cursor: pointer;
  z-index: 999;

}

.chatbox {
  position: fixed;
  right:20px;
  bottom:30px;
  border: #bbb solid 1px;
  z-index: 999;
}

.chatbox-top
{
  width: 100%;
  height: 40px;
  display: flex;
  line-height: 40px;
  color: #fff;
}

.top-title, .top-small
{
  line-height: 40px;
  padding:0 10px;
}

.top-small
{
  cursor: pointer;
}
.top-small:hover
{
  background: rgba(255,255,255,.3);
}

.space
{
  flex-grow: 100;
}

.chat-block
{
  height: calc(100% - 50px);
  overflow: auto;
}

.chat-block > div
{
  margin-bottom: 50px;
}

</style>

<script lang="ts">
import {
  Component, Prop, Vue, Watch, Ref,
} from 'vue-property-decorator';

import ChatTalk from '@/components/ChatTalk.vue';
import {
  ChatScript, ChatHelperOption, SingleScript,
} from '@/interface/main';

@Component({
  components: {
    ChatTalk,
  },
})
export default class ChatHelper extends Vue {
  @Prop() script!:ChatScript;

  @Prop({ default: {} }) chatBoxOptions!: ChatHelperOption;

  @Prop() firstStep!: string;

  @Ref('chatBlock') readonly chatBlock!: HTMLDivElement;

  private history: SingleScript[] = [];

  private showbutton = true;

  private step = this.firstStep;

  private option: ChatHelperOption= {
    name: '',
    buttonFontColor: '#fff',
    buttonColor: '#9A9292',
    barColor: '#9A9292',
    headImg: '',
    talkBackground: '#fff',
    width: '400px',
    height: '500px',
  };

  private created() {
    this.option = Object.assign(this.option, this.chatBoxOptions);
    console.log(this.option);
  }

  private selectNext(next: string) {
    this.history.push(this.script[this.step]);
    this.step = next;

    setTimeout(() => {
      window.requestAnimationFrame(this.scrollAnimation);
    }, 0);
  }

  @Watch('step')
  private hasNext() {
    setTimeout(() => {
      if (Object.prototype.hasOwnProperty.call(this.script[this.step], 'next')) {
        this.selectNext(this.script[this.step].next as string);
      }
    }, 1000);
  }

  private showbox() {
    this.showbutton = false;
  }

  private hiddenBox() {
    this.showbutton = true;
  }

  private scrollAnimation() {
    const to = Math.min(this.chatBlock.scrollTop + 5,
      this.chatBlock.scrollHeight - this.chatBlock.clientHeight);
    this.chatBlock.scrollTo(0, to);
    if (to !== (this.chatBlock.scrollHeight - this.chatBlock.clientHeight)) {
      window.requestAnimationFrame(this.scrollAnimation);
    }
  }
}
</script>
