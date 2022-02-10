<template>
  <SwipeOut v-if="enable" class="swipeout">
    <template v-slot:left="{}">
      <div
        v-for="(action, actionIndex) in leftActions"
        :key="`swipeout-action-left--${actionIndex}`"
      >
        <v-btn
          :color="action.color"
          class="swipeout__action swipeout__action--left"
          @click.stop.prevent="action.onClick"
        >
          <v-icon>{{ action.icon }}</v-icon>
        </v-btn>
      </div>
    </template>
    <slot />
    <template v-slot:right="{}">
      <div
        v-for="(action, actionIndex) in rightActions"
        :key="`swipeout-action-right--${actionIndex}`"
         @click.stop.prevent="action.onClick"
      >
        <v-btn
          :color="action.color"
          class="swipeout__action swipeout__action--right"
        >
          <v-icon>{{ action.icon }}</v-icon>
        </v-btn>
      </div>
    </template>
  </SwipeOut>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";

// components
import { SwipeOut } from "vue-swipe-actions";

// styles
import "vue-swipe-actions/dist/vue-swipe-actions.css";

// interfaces
interface SwipeoutButton {
  icon: string;
  color: string;
  onClick: void;
}

// component
@Component({
  name: "Swipeout",
  components: {
    SwipeOut,
  },
})
export default class Swipeout extends Vue {
  // props
  @Prop() readonly enable!: boolean;
  @Prop() readonly leftActions!: SwipeoutButton[];
  @Prop() readonly rightActions!: SwipeoutButton[];
}
</script>

<style lang="scss" scoped>
@import "./Swipeout.scss";
</style>
