<template>
  <div class="folder-caption caption text--disabled py-1 pl-3">
    <span class="folder-caption__item folder-caption__item--todos-count mr-3">
      <v-icon small class="mr-1" :color="folder.color">
        mdi-sticker-check-outline
      </v-icon>
      <span v-if="folderTodos.length" :class="`${folder.color}--text`">
        {{ checkedFolderTodos.length }} of {{ folderTodos.length }} tasks
      </span>
      <span v-else :class="`${folder.color}--text`">No tasks</span>
    </span>
    <span class="folder-caption__item folder-caption__item--todos-count mr-3">
      <v-icon disabled small class="mr-1">
        {{
          folderSteps.length && checkedFolderSteps.length == folderSteps.length
            ? "mdi-checkbox-multiple-marked-circle-outline"
            : "mdi-checkbox-multiple-blank-circle-outline"
        }}
      </v-icon>
      <span v-if="folderSteps.length">
        {{ checkedFolderSteps.length }} of {{ folderSteps.length }} steps
      </span>
      <span v-else>No steps</span>
    </span>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";
import todoUtils from "@/utils/todo";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";
import Step from "@/interfaces/entities/step";

// component
@Component({
  name: "TodoCaption",
})
export default class TodoSteps extends Vue {
  // props
  @Prop() readonly folder!: Folder;

  // computed
  private get folderTodos(): Todo[] {
    return todoUtils.getTodosByFolder(this.folder);
  }

  private get checkedFolderTodos(): Todo[] {
    return this.folderTodos.filter((todo) => todo.checked);
  }

  private get folderSteps(): Step[] {
    return todoUtils.getStepsByFolder(this.folder);
  }

  private get checkedFolderSteps(): Step[] {
    return this.folderSteps.filter((step) => step.checked);
  }
}
</script>

<style lang="scss" scoped>
@import "@/components/atoms/TodoCaption/TodoCaption.scss";
</style>
