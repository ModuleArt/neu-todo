import { nanoid } from "nanoid";

// interfaces
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import Folder from "@/interfaces/entities/folder";

// utils
import dateUtils from "@/utils/date";

@Module
class FoldersModule extends VuexModule {
  //state
  currentFolderId = "today";
  defaultFolders: Folder[] = [
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
  ];
  folders: Folder[] = [];

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

  @Mutation
  private mutationAddNewFolder() {
    const id = nanoid();

    this.folders.push({
      id,
      title: "Untitled folder",
      icon: "mdi-folder-outline",
      color: "green",
      custom: true,
    });
    this.currentFolderId = id;
  }

  @Mutation
  private mutationRemoveFolder(folderId: string) {
    this.currentFolderId = this.folders[0].id;
    this.folders = this.folders.filter((folder) => folder.id !== folderId);
  }

  @Mutation
  private mutationEditFolder({
    folderId,
    title,
    color,
  }: {
    folderId: string;
    title: string;
    color: string;
  }) {
    const folder = this.folders.find((folder) => folder.id === folderId);
    if (folder) {
      folder.title = title;
      folder.color = color;
    }
  }

  @Mutation
  private mutationInitState({ folders }: { folders: Folder[] }) {
    this.folders = this.defaultFolders;
    if (folders) {
      this.folders = this.folders.concat(
        folders.filter((folder) => folder.custom)
      );
    }
  }

  // actions
  @Action
  setCurrentFolderId(currentFolderId: string) {
    this.mutationSetCurrentFolderId(currentFolderId);
  }

  @Action
  addNewFolder() {
    this.mutationAddNewFolder();
  }

  @Action
  removeFolder(folderId: string) {
    this.mutationRemoveFolder(folderId);
  }

  @Action
  editFolder({
    folderId,
    title,
    color,
  }: {
    folderId: string;
    title: string;
    color: string;
  }) {
    this.mutationEditFolder({ folderId, title, color });
  }
}

export default FoldersModule;
