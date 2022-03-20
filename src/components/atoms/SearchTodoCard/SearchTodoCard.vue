<template>
  <div
    :class="{
      'search-todo-card': true,
      'search-todo-card--checked': todo.checked,
      'search-todo-card--important': todo.important,
    }"
  >
    <v-card outlined class="search-todo-card__card">
      <div class="d-flex align-center pr-1 search-todo-card__header">
        <v-card-title class="px-3 py-2 search-todo-card__title">
          <v-icon v-if="todo.checked" left>mdi-check</v-icon>
          <v-icon v-else left>mdi-crop-square</v-icon>
          <span class="ml-1">{{ todo.title }}</span>
        </v-card-title>
        <v-btn icon @click="goToTask" class="mx-1" title="Go to folder">
          <v-icon>mdi-arrow-top-right</v-icon>
        </v-btn>
        <div
          v-if="todo.important"
          class="search-todo-card__important-indicator"
        />
      </div>
      <v-divider v-if="todo.steps.length" />
      <v-card-text v-if="todo.steps.length" class="px-3 py-2">
        <div
          v-for="(step, stepIndex) in limitedSteps"
          :key="stepIndex"
          class="d-flex align-center"
        >
          <v-icon v-if="step.checked" disabled left>mdi-check</v-icon>
          <v-icon v-else disabled left>mdi-crop-square</v-icon>
          <span class="search-todo-card__step-title">{{ step.title }}</span>
        </div>
        <div v-if="todo.steps.length > limitedSteps.length" class="pt-1">
          And {{ todo.steps.length - limitedSteps.length }} more
        </div>
      </v-card-text>
      <v-divider v-if="todo.body" />
      <v-card-text
        v-if="todo.body"
        class="px-3 py-2 search-todo-card__description"
      >
        {{ todo.body }}
      </v-card-text>
      <v-divider
        v-if="todo.customFolderId || todo.steps.length > 0 || todo.dueDate"
      />
      <TodoCaption :todo="todo" />
    </v-card>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";

// store modules
import { foldersModule } from "@/store";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Step from "@/interfaces/entities/step";

// components
import TodoCaption from "@/components/atoms/TodoCaption/TodoCaption.vue";

// component
@Component({
  name: "SearchTodoCard",
  components: {
    TodoCaption,
  },
})
export default class SearchTodoCard extends Vue {
  // props
  @Prop() readonly todo!: Todo;

  // computed
  private get limitedSteps(): Step[] {
    return this.todo.steps.length > 5
      ? this.todo.steps.slice(0, 5)
      : this.todo.steps;
  }

  // private methods
  private goToTask() {
    foldersModule.setCurrentFolderId(this.todo.customFolderId || "tasks");
    this.$router.push({ name: "main" });
  }
}
</script>

<style lang="scss" scoped>
@import "./SearchTodoCard.scss";
</style>
