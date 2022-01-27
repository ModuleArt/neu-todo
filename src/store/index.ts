import Vue from "vue";
import Vuex from "vuex";

// modules
import TodosModule from "@/store/modules/todos";
import FoldersModule from "@/store/modules/folders";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

Vue.use(Vuex);

export interface State {
  todos: {
    todos: Todo[];
  };
  folders: {
    currentFolderId: string;
    folders: Folder[];
  };
}

const store = new Vuex.Store({
  actions: {
    initStore(context) {
      const s = localStorage.getItem("store");
      let parsed: State | null = null;
      if (s) {
        parsed = JSON.parse(s);
      }
      context.commit("todos/mutationInitState", (parsed && parsed.todos) || {});
      context.commit(
        "folders/mutationInitState",
        (parsed && parsed.folders) || {}
      );
    },
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export const todosModule = new TodosModule({ store, name: "todos" });
export const foldersModule = new FoldersModule({ store, name: "folders" });

export default store;
