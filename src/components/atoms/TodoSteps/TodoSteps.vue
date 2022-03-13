<template>
  <div
    :class="{
      'todo-steps': true,
      'px-11 pb-4': !$isMobile,
      'py-1': $isMobile,
    }"
  >
    <div
      class="todo-steps__list mb-1"
      ref="todoStepsList"
      v-if="steps.length > 0"
    >
      <v-card
        v-for="(step, stepIndex) in steps"
        :key="`step--${stepIndex}`"
        :class="{
          'todo-steps__step d-flex mb-1 align-center': true,
          'todo-steps__step--checked': step.checked,
        }"
        :outlined="!$isMobile"
        flat
      >
        <v-simple-checkbox
          :value="step.checked"
          :color="color"
          @input="
            updateStep({
              stepIndex,
              stepChecked: !step.checked,
            })
          "
        />
        <v-text-field
          :value="step.title"
          solo
          flat
          dense
          hide-details
          :placeholder="`Step ${stepIndex + 1}`"
          @blur="updateStep({ stepIndex, stepTitle: $event.target.value })"
          @contextmenu.stop
          @keypress.enter="unfocus"
        />
        <v-btn
          icon
          @click="removeStep(stepIndex)"
          class="todo-steps__remove-step"
          title="Remove step"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>
    </div>
    <v-text-field
      class="todo-steps__add-step"
      prepend-inner-icon="mdi-plus"
      :color="color"
      solo
      flat
      :outlined="!$isMobile"
      dense
      hide-details
      :placeholder="steps.length ? 'Next step' : 'Add step'"
      v-model="tempStepValue"
      @keypress.enter="addStep"
      @contextmenu.stop
    />
  </div>
</template>

<script lang="ts">
// utils
import { Mixins, Component, Prop } from "@/utils/vue-imports";

// interfaces
import Step from "@/interfaces/entities/step";

// store modules
import { todosModule } from "@/store";

// mixins
import isMobileMixin from "@/mixins/isMobile";

// component
@Component({
  name: "TodoSteps",
})
export default class TodoSteps extends Mixins(isMobileMixin) {
  // refs
  $refs!: {
    todoStepsList: HTMLElement;
  };

  // props
  @Prop() readonly steps!: Step[];
  @Prop() readonly color!: string;
  @Prop() readonly todoId!: string;

  // data
  private tempStepValue = "";

  // private methods
  private addStep() {
    if (this.tempStepValue.length) {
      todosModule.addStep({
        todoId: this.todoId,
        stepTitle: this.tempStepValue,
      });
      this.tempStepValue = "";
      setTimeout(() => {
        this.$refs.todoStepsList.scrollTop = this.$refs.todoStepsList.scrollHeight;
      }, 0);
    }
  }

  private removeStep(stepIndex: number) {
    todosModule.removeStepByIndex({
      todoId: this.todoId,
      stepIndex,
    });
  }

  private updateStep({
    stepIndex,
    stepChecked,
    stepTitle,
  }: {
    stepIndex: number;
    stepChecked?: boolean;
    stepTitle?: string;
  }) {
    if (stepTitle != undefined && stepTitle.length == 0) {
      this.removeStep(stepIndex);
    } else {
      todosModule.updateStepByIndex({
        todoId: this.todoId,
        stepIndex,
        stepChecked,
        stepTitle,
      });
    }
  }

  private unfocus() {
    (document.activeElement as HTMLElement).blur();
  }
}
</script>

<style lang="scss" scoped>
@import "./TodoSteps.scss";
</style>
