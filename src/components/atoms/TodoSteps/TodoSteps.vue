<template>
  <div
    :class="{
      'todo-steps': true,
      'px-11 pb-4': !$isPhone,
      'py-1': $isPhone,
    }"
  >
    <SlickList
      class="todo-steps__list mb-1"
      ref="todoStepsList"
      v-if="steps.length > 0"
      lockAxis="y"
      tag="div"
      :value="steps"
      use-drag-handle
      lock-to-container-edges
      helper-class="todo-steps__slick-item--dragging"
      @input="reorderSteps"
    >
      <SlickItem
        tag="div"
        v-for="(step, stepIndex) in steps"
        :key="`step--${stepIndex}`"
        :index="stepIndex"
        class="todo-steps__slick-item"
      >
        <v-card
          :class="{
            'todo-steps__step': true,
            'todo-steps__step--checked': step.checked,
          }"
          :outlined="!$isPhone"
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
            x-small
            class="todo-steps__handle todo-steps__handle--drag"
            fab
            :color="color"
            v-drag-handle
            title="Move step"
          >
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
          <v-btn
            x-small
            class="todo-steps__handle"
            fab
            @click="removeStep(stepIndex)"
            color="red"
            title="Remove step"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card>
      </SlickItem>
    </SlickList>
    <v-text-field
      class="todo-steps__add-step"
      prepend-inner-icon="mdi-plus"
      :color="color"
      solo
      flat
      :outlined="!$isPhone"
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
import responsiveMixin from "@/mixins/responsive";

// components
import { SlickItem, SlickList, HandleDirective } from "vue-slicksort";

// component
@Component({
  name: "TodoSteps",
  components: {
    SlickItem,
    SlickList,
  },
  directives: { "drag-handle": HandleDirective },
})
export default class TodoSteps extends Mixins(responsiveMixin) {
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

  private reorderSteps(reorderedSteps: Step[]) {
    todosModule.updateSteps({ todoId: this.todoId, steps: reorderedSteps });
  }
}
</script>

<style lang="scss" scoped>
@import "./TodoSteps.scss";
</style>
