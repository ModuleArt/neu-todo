<template>
  <div class="base-dialog">
    <v-dialog :value="showDialog" max-width="340" @input="dialogValueChanged">
      <v-card>
        <v-card-title v-if="title" class="pa-4">{{ title }}</v-card-title>
        <v-divider v-if="title" />
        <div class="base-dialog__scroll">
          <div
            :class="{
              'base-dialog__body': true,
              'px-4 py-6': !noPadding,
            }"
          >
            <slot />
          </div>
        </div>
        <v-divider />
        <v-card-actions v-if="actions.length" class="pa-2">
          <v-btn
            v-for="(action, actionIndex) in leftActions"
            :key="`right-dialog-action--${actionIndex}`"
            text
            @click="action.onClick"
            :color="action.color"
          >
            {{ action.text }}
          </v-btn>
          <v-spacer />
          <v-btn
            v-for="(action, actionIndex) in rightActions"
            :key="`left-dialog-action--${actionIndex}`"
            text
            @click="action.onClick"
            :color="action.color"
          >
            {{ action.text }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop, Model } from "@/utils/vue-imports";

// interfaces
import DialogAction from "@/interfaces/logic/dialogAction";

// component
@Component({
  name: "BaseDialog",
})
export default class BaseDialog extends Vue {
  // props
  @Prop() readonly title!: string;
  @Prop() readonly actions!: DialogAction[];
  @Prop({ type: Boolean }) readonly noPadding: boolean | undefined;

  // model
  @Model("showDialogChanged") showDialog!: boolean;

  // computed
  get leftActions() {
    return this.actions.filter((action) => action.left);
  }

  get rightActions() {
    return this.actions.filter((action) => !action.left);
  }

  // methods
  private dialogValueChanged(value: boolean) {
    this.$emit("showDialogChanged", value);
  }
}
</script>

<style lang="scss" scoped>
@import "./BaseDialog.scss";
</style>
