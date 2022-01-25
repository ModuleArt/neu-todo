import Vue from "vue";
import Vuex from "vuex";

import TodosModule from "@/store/modules/todos";
import FoldersModule from "@/store/modules/folders";

Vue.use(Vuex);

const store = new Vuex.Store({});

export default store;
export const todosModule = new TodosModule({ store, name: "todos" });
export const foldersModule = new FoldersModule({ store, name: "folders" });
