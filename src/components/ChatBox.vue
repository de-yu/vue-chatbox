<template>
  <div class="chatbox" :style="{width: option.width, height: option.height}">
    <div class="chat-block" ref="chatBlock" :style="{background: option.talkBackground}">
      <div>
        <div class="history">
          <div class="history-item" v-for="(item, index) in history" :key="index">
              <ChatTalk :script="item" :head="option.headImg"></ChatTalk>
          </div>
        </div>
        <ChatTalk :script="execScript[step]"
        canClick = "true"
        :head="option.headImg" @selectNext="selectNext"></ChatTalk>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.chatbox {
  border: #bbb solid 1px;
  width: 100%;
  height:100%;
}

.space
{
  flex-grow: 100;
}

.chat-block
{
  height: 100%;
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
import { forEach } from 'lodash-es';

import ChatTalk from '@/components/ChatTalk.vue';
import {
  ChatScript, ChatBoxOption, SingleScript, ChatOption,
} from '@/interface/main';

@Component({
  components: {
    ChatTalk,
  },
})
export default class ChatBox extends Vue {
  @Prop() script!:ChatScript;

  @Prop({ default: {} }) chatBoxOptions!: ChatBoxOption;

  @Prop() firstStep!: string;

  @Ref('chatBlock') readonly chatBlock!: HTMLDivElement;

  private history: SingleScript[] = [];

  private showbutton = true;

  private step = this.firstStep;

  private finished = 0;

  private execScript: ChatScript = {};

  private option: ChatBoxOption= {
    headImg: '',
    talkBackground: '#fff',
    width: '100%',
    height: 'inherit',
  };

  private created() {
    this.option = Object.assign(this.option, this.chatBoxOptions);

    forEach(this.script, (value: SingleScript, key: string) => {
      const temp: SingleScript = value;
      const option:ChatOption[] = [];
      if (value.type === 'question') {
        temp.option.forEach((item: ChatOption) => {
          this.execScript[`${item.next}_feedback`] = {
            title: item.text,
            type: 'feedback',
            next: item.next,
          };

          option.push(item);
          option[option.length - 1].next += '_feedback';
        });

        temp.option = option;
      }

      this.execScript[key] = value;
    });
  }

  private selectNext(next: string) {
    this.history.push(this.execScript[this.step]);
    this.step = next;

    setTimeout(() => {
      window.requestAnimationFrame(this.scrollAnimation);
    }, 0);
  }

  @Watch('step')
  private hasNext() {
    setTimeout(() => {
      if (Object.prototype.hasOwnProperty.call(this.execScript[this.step], 'next')) {
        this.selectNext(this.execScript[this.step].next as string);
        this.finished = 0;
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
    const to = Math.min(this.chatBlock.scrollTop
    + ((this.chatBlock.scrollHeight - this.chatBlock.clientHeight) - this.chatBlock.scrollTop)
     * this.easeOutCubic(this.finished),
    this.chatBlock.scrollHeight - this.chatBlock.clientHeight);
    this.chatBlock.scrollTo(0, to);

    if (to !== (this.chatBlock.scrollHeight - this.chatBlock.clientHeight)) {
      this.finished += 0.05;
      window.requestAnimationFrame(this.scrollAnimation);
    } else {
      this.finished = 0;
    }
  }

  private easeOutCubic(x: number): number {
    return 1 - (1 - x) ** 3;
  }
}
</script>
