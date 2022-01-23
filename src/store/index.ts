import Vue from "vue";
import Vuex from "vuex";

// interfaces
import State from "@/store/state";
import Todo from "@/interfaces/entities/todo";

import { nanoid } from "nanoid";

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    todos: [],
  },
  actions: {
    addTodo(
      context,
      todo: Todo = {
        id: nanoid(),
        checked: false,
        title: "",
        body: "",
        important: false,
      }
    ) {
      context.commit("addTodo", todo);
    },
    removeTodo(context, todoId: string) {
      context.commit("removeTodo", todoId);
    },
    setImportant(context, todoId: string) {
      context.commit("setImportant", todoId);
    },
  },
  mutations: {
    addTodo(state, todo: Todo) {
      state.todos.push(todo);
    },
    removeTodo(state, todoId: string) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    setImportant(state, todoId: string) {
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) todo.important = !todo.important;
    },
  },
  getters: {},
  modules: {},
});
