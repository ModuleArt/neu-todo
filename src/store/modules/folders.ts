import store from "@/store";

// interfaces
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import Folder from "@/interfaces/entities/folder";

@Module
class FoldersModule extends VuexModule {
  //state
  currentFolderId = "today";
  folders: Folder[] = [
    {
      id: "tasks",
      title: "Tasks",
      icon: "mdi-sticker-check-outline",
    },
    {
      id: "today",
      title: "Today",
      icon: "mdi-calendar-today",
    },
    {
      id: "tomorrow",
      title: "Tomorrow",
      icon: "mdi-calendar-arrow-right",
    },
    {
      id: "important",
      title: "Important",
      icon: "mdi-alert-octagram-outline",
    },
  ];

  @Mutation
  mutationSetCurrentFolderId(currentFolderId: string) {
    this.currentFolderId = currentFolderId;
  }

  @Action
  setCurrentFolderId(currentFolderId: string) {
    this.mutationSetCurrentFolderId(currentFolderId);
  }
}

export const foldersModule = new FoldersModule({ store, name: "folders" });
