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
      custom: false,
      filter: (todo) => !todo.customFolderId,
      transform: (todo) => {
        todo.customFolderId = null;
        return todo;
      },
    },
    {
      id: "today",
      title: "Today",
      icon: "mdi-calendar-today",
      custom: false,
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
      custom: false,
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
      color: "orange",
      custom: false,
      filter: (todo) => todo.important,
      transform: (todo) => {
        todo.important = true;
        return todo;
      },
    },
    {
      id: "custom-yellow-folder",
      title: "Yellow folder",
      icon: "mdi-folder-outline",
      color: "yellow",
      custom: true,
      filter: (todo) => todo.customFolderId === "custom-yellow-folder",
      transform: (todo) => {
        todo.customFolderId = "custom-yellow-folder";
        return todo;
      },
    },
    {
      id: "custom-pink-folder",
      title: "Pink folder",
      icon: "mdi-folder-outline",
      color: "pink",
      custom: true,
      filter: (todo) => todo.customFolderId === "custom-pink-folder",
      transform: (todo) => {
        todo.customFolderId = "custom-pink-folder";
        return todo;
      },
    },
    {
      id: "custom-green-folder",
      title: "Green folder",
      icon: "mdi-folder-outline",
      color: "green",
      custom: true,
      filter: (todo) => todo.customFolderId === "custom-green-folder",
      transform: (todo) => {
        todo.customFolderId = "custom-green-folder";
        return todo;
      },
    },
  ];

  // getters
  get getCurrentFolder(): Folder | null {
    return (
      this.folders.find(
        (folder: Folder) => folder.id === this.currentFolderId
      ) || null
    );
  }

  get getSystemFolders(): Folder[] {
    return this.folders.filter((folder) => !folder.custom);
  }

  get getCustomFolders(): Folder[] {
    return this.folders.filter((folder) => folder.custom);
  }

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

export default FoldersModule;
