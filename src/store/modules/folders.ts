import { nanoid } from "nanoid";

// interfaces
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import Folder from "@/interfaces/entities/folder";

// utils
import dateUtils from "@/utils/date";

@Module
class FoldersModule extends VuexModule {
  //state
  public currentFolderId = "today";
  public folders: Folder[] = [];
  private defaultFolders: Folder[] = [
    {
      id: "tasks",
      title: "Tasks",
      icon: "mdi-sticker-check-outline",
      color: "blue",
      custom: false,
      filter: (todo) => !todo.customFolderId,
      transform: (todo) => {
        todo.customFolderId = null;
        return todo;
      },
      board: null,
    },
    {
      id: "important",
      title: "Important",
      icon: "mdi-octagram-outline",
      color: "orange",
      custom: false,
      filter: (todo) => todo.important,
      transform: (todo) => {
        todo.important = true;
        return todo;
      },
      board: null,
    },
    {
      id: "today",
      title: "Today",
      icon: "mdi-calendar-today",
      color: "blue",
      custom: false,
      filter: (todo) => dateUtils.numberToCode(todo.dueDate) === "today",
      transform: (todo) => {
        todo.dueDate = dateUtils.codeToNumber("today");
        return todo;
      },
      board: null,
      date: "today",
    },
    {
      id: "tomorrow",
      title: "Tomorrow",
      icon: "mdi-calendar-arrow-right",
      color: "blue",
      custom: false,
      filter: (todo) => dateUtils.numberToCode(todo.dueDate) === "tomorrow",
      transform: (todo) => {
        todo.dueDate = dateUtils.codeToNumber("tomorrow");
        return todo;
      },
      board: null,
      date: "tomorrow",
    },
    {
      id: "overdue",
      title: "Overdue",
      icon: "mdi-calendar-arrow-left",
      color: "red",
      custom: false,
      filter: (todo) => dateUtils.isOverdue(todo.dueDate),
      board: null,
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

  // private mutations
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
      color: "blue",
      custom: true,
      board: null,
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
    icon,
  }: {
    folderId: string;
    title: string;
    color: string;
    icon: string;
  }) {
    const folder = this.folders.find((folder) => folder.id === folderId);
    if (folder) {
      folder.title = title;
      folder.color = color;
      folder.icon = icon;
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

  // public actions
  @Action
  public setCurrentFolderId(currentFolderId: string) {
    this.mutationSetCurrentFolderId(currentFolderId);
  }

  @Action
  public addNewFolder() {
    this.mutationAddNewFolder();
  }

  @Action
  public removeFolder(folderId: string) {
    this.mutationRemoveFolder(folderId);
  }

  @Action
  public editFolder({
    folderId,
    title,
    color,
    icon,
  }: {
    folderId: string;
    title: string;
    color: string;
    icon: string;
  }) {
    this.mutationEditFolder({ folderId, title, color, icon });
  }
}

export default FoldersModule;
