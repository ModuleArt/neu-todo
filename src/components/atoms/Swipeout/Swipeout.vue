<template>
  <VSwipeout v-if="enable" :right="right" class="swipeout" auto-close>
    <slot />
  </VSwipeout>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";

// components
import VSwipeout from "v-swipeout";

// interfaces
interface SwipeoutButton {
  text: string;
  color: string;
  onPress: void;
}

// component
@Component({
  name: "Swipeout",
  components: {
    VSwipeout,
  },
})
export default class Swipeout extends Vue {
  // props
  @Prop() readonly enable!: boolean;
  @Prop() readonly rightButtons!: SwipeoutButton[];

  // data
  private right = this.rightButtons.map((item) => {
    return {
      text: item.text,
      onPress: item.onPress,
      style: {
        backgroundColor: item.color,
        color: "white",
      },
    };
  });
}
</script>

<style lang="scss" scoped>
@import "./Swipeout.scss";
</style>
