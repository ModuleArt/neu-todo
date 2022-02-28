<template>
  <div
    :class="{
      'todo-steps': true,
      'px-11 pb-4 pt-2': !$isMobile,
      'py-1': $isMobile,
    }"
  >
    <div class="todo-steps__list" ref="todoStepsList">
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
        <v-simple-checkbox v-model="step.checked" :color="color || 'primary'" />
        <v-text-field
          v-model="step.title"
          solo
          flat
          dense
          hide-details
          :placeholder="`Step ${stepIndex + 1}`"
          @blur="checkIfEmpty(step.title, stepIndex)"
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
      class="todo-steps__add-step mt-1"
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
    />
  </div>
</template>

<script lang="ts">
// utils
import { Mixins, Component, Model, Prop } from "@/utils/vue-imports";

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
  @Prop() readonly color!: string;
  @Prop() readonly todoId!: string;

  // model
  @Model("stepsChanged") steps!: Step[];

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

  private checkIfEmpty(stepTitle: string, stepIndex: number) {
    if (stepTitle.length == 0) {
      this.removeStep(stepIndex);
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
