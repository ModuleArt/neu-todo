import Vue from "vue";
import Vuex from "vuex";
import { nanoid } from "nanoid";

// interfaces
import State from "@/store/state";
import Todo from "@/interfaces/entities/todo";

Vue.use(Vuex);

// export
export default new Vuex.Store<State>({
  state: {
    user: null,
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
        dueDate: null,
      }
    ) {
      context.commit("addTodo", todo);
    },
    removeTodo(context, todoId: string) {
      context.commit("removeTodo", todoId);
    },
    setChecked(context, { todoId, checked }) {
      context.commit("setChecked", { todoId, checked });
    },
    setImportant(context, { todoId, important }) {
      context.commit("setImportant", { todoId, important });
    },
    setDueDate(context, { todoId, dueDate }) {
      context.commit("setDueDate", { todoId, dueDate });
    },
  },
  mutations: {
    addTodo(state: State, todo: Todo) {
      state.todos.push(todo);
    },
    removeTodo(state: State, todoId: string) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    setChecked(state: State, { todoId, checked }) {
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) todo.checked = checked;
    },
    setImportant(state: State, { todoId, important }) {
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) todo.important = important;
    },
    setDueDate(state: State, { todoId, dueDate }) {
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) todo.dueDate = dueDate;
    },
  },
  getters: {},
});
