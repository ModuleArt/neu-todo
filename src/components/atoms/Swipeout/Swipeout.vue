<template>
  <v-card outlined class="swipeout">
    <SwipeOut
      ref="swipeOut"
      v-click-outside="closeActions"
      class="swipeout__container"
      :disabled="!enable"
    >
      <template v-slot:left="{}">
        <div
          v-for="(action, actionIndex) in leftActions"
          :key="`swipeout-action-left--${actionIndex}`"
        >
          <v-btn
            :color="action.color"
            class="swipeout__action swipeout__action--left pa-2"
            @click.stop.prevent="callAction(action.onClick)"
            tile
            depressed
          >
            <v-icon class="mt-1" small>{{ action.icon }}</v-icon>
            <span class="caption">{{ action.text }}</span>
          </v-btn>
        </div>
      </template>
      <div @click="closeActions">
        <slot />
      </div>
      <template v-slot:right="{}">
        <div
          v-for="(action, actionIndex) in rightActions"
          :key="`swipeout-action-right--${actionIndex}`"
        >
          <v-btn
            :color="action.color"
            class="swipeout__action swipeout__action--right pa-2"
            @click.stop.prevent="callAction(action.onClick)"
            tile
            depressed
          >
            <v-icon class="mt-1" small>{{ action.icon }}</v-icon>
            <span class="caption">{{ action.text }}</span>
          </v-btn>
        </div>
      </template>
    </SwipeOut>
  </v-card>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";

// components
import { SwipeOut } from "vue-swipe-actions";

// styles
import "vue-swipe-actions/dist/vue-swipe-actions.css";

// interfaces
import SwipeoutAction from "@/interfaces/logic/swipeoutAction";

// component
@Component({
  name: "Swipeout",
  components: {
    SwipeOut,
  },
})
export default class Swipeout extends Vue {
  // refs
  public $refs!: {
    swipeOut: typeof SwipeOut;
  };

  // props
  @Prop() readonly enable!: boolean;
  @Prop() readonly leftActions!: SwipeoutAction[];
  @Prop() readonly rightActions!: SwipeoutAction[];

  // methods
  private closeActions() {
    if (this.$refs.swipeOut) {
      setTimeout(() => {
        this.$refs.swipeOut.closeActions();
      }, 0);
    }
  }

  private callAction(action: () => {}) {
    action();
    this.closeActions();
  }
}
</script>

<style lang="scss" scoped>
@import "./Swipeout.scss";
</style>
