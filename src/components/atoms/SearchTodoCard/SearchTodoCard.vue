<template>
  <div
    :class="{
      'search-todo-card': true,
      'search-todo-card--checked': todo.checked,
      'search-todo-card--important': todo.important,
    }"
  >
    <v-card outlined class="search-todo-card__card">
      <div class="d-flex align-center justify-space-between pr-1">
        <v-card-title class="px-3 py-2 search-todo-card__title">
          <v-icon v-if="todo.checked" left>mdi-check</v-icon>
          <v-icon v-else left>mdi-crop-square</v-icon>
          <span class="ml-1">{{ todo.title }}</span>
        </v-card-title>
      </div>
      <v-divider v-if="todo.steps.length" />
      <v-card-text v-if="todo.steps.length" class="px-3 py-2">
        <div
          v-for="(step, stepIndex) in todo.steps"
          :key="stepIndex"
          class="d-flex align-center"
        >
          <v-icon v-if="step.checked" disabled left>mdi-check</v-icon>
          <v-icon v-else disabled left>mdi-crop-square</v-icon>
          <span>{{ step.title }}</span>
        </div>
      </v-card-text>
      <v-divider v-if="todo.body" />
      <v-card-text v-if="todo.body" class="px-3 py-2">
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

// interfaces
import Todo from "@/interfaces/entities/todo";

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
}
</script>

<style lang="scss" scoped>
@import "./SearchTodoCard.scss";
</style>
