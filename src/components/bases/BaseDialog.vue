<template>
  <div class="base-dialog">
    <v-dialog
      :value="showDialog"
      max-width="340"
      @input="dialogValueChanged"
      :content-class="
        'base-dialog__dialog ma-4' +
        (title ? ' base-dialog__dialog--with-title' : '')
      "
    >
      <v-card>
        <v-card-title v-if="title" class="px-4 py-3">{{ title }}</v-card-title>
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
        <v-card-actions class="pa-2">
          <div class="base-dialog__left-buttons">
            <slot name="left-buttons" />
          </div>
          <v-spacer />
          <div class="base-dialog__right-buttons">
            <slot name="right-buttons" />
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop, Model } from "@/utils/vue-imports";

// component
@Component({
  name: "BaseDialog",
})
export default class BaseDialog extends Vue {
  // props
  @Prop() readonly title!: string;
  @Prop({ type: Boolean }) readonly noPadding: boolean | undefined;

  // model
  @Model("showDialogChanged") showDialog!: boolean;

  // methods
  private dialogValueChanged(value: boolean) {
    this.$emit("showDialogChanged", value);
  }
}
</script>

<style lang="scss">
@import "./BaseDialog.scss";
</style>
