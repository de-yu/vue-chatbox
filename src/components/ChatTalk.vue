<template>
  <div class="nowStep" :class="{stepLeft: script.position === 'question' || 'answer'
  , stepRight: script.type === 'feedback'}">
    <div class="head">
      <div class="head-img">
        <img :src="head" />
      </div>
    </div>
    <div class="dialogue">
      <div class="message">
      {{ script.title }}
      </div>
      <div class="option">
        <div class="nowOption" :class="{nowOptionClick: canClick}"
        v-for="(item, index) in script.option"
        :key="index" @click="selectNext(item.next)">
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nowStep
{
  display: flex;
  padding: 5px;
}

.stepLeft
{
  flex-direction: row;
}

.stepRight{
  flex-direction: row-reverse;
}

.head-img
{
  width: 40px;
  height:40px;
}

.head-img img {
  display: block;
  width: 40px;
  height: 40px;
}

.dialogue
{
  margin-left:10px;
  margin-top: 5px;
}

.message {
  background: #E1E1E1;
  padding:5px 10px;
  color: #4B4B4B;
}

.option
{
  display: flex;
  flex-direction:column;
  margin-top:10px;

}

.nowOption
{
  background: #E1E1E1;
  margin-top:5px;
  padding:5px 15px;
  color: #4B4B4B;
}

.nowOptionClick {
  cursor: pointer;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SingleScript } from '@/interface/main';

@Component
export default class ChatTalk extends Vue {
  @Prop() private script!: SingleScript;

  @Prop() private head!: string;

  @Prop({ default: false }) private canClick!: boolean;

  private selectNext(next: string) {
    this.$emit('selectNext', next);
  }
}
</script>
