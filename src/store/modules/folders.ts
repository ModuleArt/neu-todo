import store from "@/store";

// interfaces
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import Folder from "@/interfaces/entities/folder";

// utils
import dateUtils from "@/utils/date";

@Module
class FoldersModule extends VuexModule {
  //state
  currentFolderId = "today";
  folders: Folder[] = [
    {
      id: "tasks",
      title: "Tasks",
      icon: "mdi-sticker-check-outline",
      filter: () => true,
      transform: (todo) => todo,
    },
    {
      id: "today",
      title: "Today",
      icon: "mdi-calendar-today",
      filter: (todo) => dateUtils.numberToCode(todo.dueDate) === "today",
      transform: (todo) => {
        todo.dueDate = dateUtils.codeToNumber("today");
        return todo;
      },
    },
    {
      id: "tomorrow",
      title: "Tomorrow",
      icon: "mdi-calendar-arrow-right",
      filter: (todo) => dateUtils.numberToCode(todo.dueDate) === "tomorrow",
      transform: (todo) => {
        todo.dueDate = dateUtils.codeToNumber("tomorrow");
        return todo;
      },
    },
    {
      id: "important",
      title: "Important",
      icon: "mdi-alert-octagram-outline",
      filter: (todo) => todo.important,
      transform: (todo) => {
        todo.important = true;
        return todo;
      },
    },
  ];

  // mutations
  @Mutation
  private mutationSetCurrentFolderId(currentFolderId: string) {
    this.currentFolderId = currentFolderId;
  }

  // actions
  @Action
  setCurrentFolderId(currentFolderId: string) {
    this.mutationSetCurrentFolderId(currentFolderId);
  }
}

export default new FoldersModule({ store, name: "folders" });
