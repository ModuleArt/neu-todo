<template>
  <div class="search-todo-card">
    <v-card outlined>
      <v-card-title class="py-2">
        <v-icon v-if="todo.checked" left>mdi-check</v-icon>
        <v-icon v-else left>mdi-crop-square</v-icon>
        <span>{{ todo.title }}</span>
      </v-card-title>
      <v-divider v-if="todo.steps.length" />
      <v-card-text v-if="todo.steps.length" class="py-2">
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
      <v-card-text v-if="todo.body" class="py-2">
        {{ todo.body }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";

// interfaces
import Todo from "@/interfaces/entities/todo";

// component
@Component({
  name: "SearchTodoCard",
})
export default class SearchTodoCard extends Vue {
  // props
  @Prop() readonly todo!: Todo;
}
</script>
