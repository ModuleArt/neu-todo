<template>
  <div class="base-dialog">
    <v-bottom-sheet
      :value="showDialog"
      :max-width="450"
      @input="dialogValueChanged"
      :content-class="
        'base-dialog__dialog rounded-t-lg' +
        (title ? ' base-dialog__dialog--with-title' : '')
      "
    >
      <v-card
        tile
        :class="{ 'base-dialog__card': true, 'rounded-t-lg': !$isMobileExtra }"
        :outlined="!$isMobileExtra"
      >
        <v-card-title v-if="title" class="pa-4">{{ title }}</v-card-title>
        <v-divider v-if="title" />
        <div class="base-dialog__scroll">
          <div
            :class="{
              'base-dialog__body': true,
              'pa-4': !noPadding,
            }"
          >
            <slot />
          </div>
        </div>
        <v-divider />
        <v-card-actions class="pa-4">
          <slot name="left-buttons" />
          <v-spacer />
          <slot name="right-buttons" />
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
// utils
import { Mixins, Component, Prop, Model } from "@/utils/vue-imports";

// mixins
import isMobileMixin from "@/mixins/isMobile";

// component
@Component({
  name: "BaseDialog",
})
export default class BaseDialog extends Mixins(isMobileMixin) {
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
