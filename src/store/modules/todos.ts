import store from "@/store";
import { nanoid } from "nanoid";

// interfaces
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import Todo from "@/interfaces/entities/todo";

@Module
class TodosModule extends VuexModule {
  //state
  todos: Todo[] = [];

  // mutations
  @Mutation
  private mutationAddTodo(todo: Todo) {
    this.todos.push(todo);
  }

  @Mutation
  private mutationRemoveTodo(todoId: string) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  @Mutation
  private mutationSetChecked({
    todoId,
    checked,
  }: {
    todoId: string;
    checked: boolean;
  }) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) todo.checked = checked;
  }

  @Mutation
  private mutationSetImportant({
    todoId,
    important,
  }: {
    todoId: string;
    important: boolean;
  }) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) todo.important = important;
  }

  @Mutation
  private mutationSetDueDate({
    todoId,
    dueDate,
  }: {
    todoId: string;
    dueDate: number | null;
  }) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) todo.dueDate = dueDate;
  }

  // actions
  @Action
  addTodo(todo?: Todo) {
    if (!todo) {
      todo = {
        id: nanoid(),
        checked: false,
        title: "",
        body: "",
        important: false,
        dueDate: null,
      };
    }
    this.mutationAddTodo(todo);
  }

  @Action
  removeTodo(todoId: string) {
    this.mutationRemoveTodo(todoId);
  }

  @Action
  setChecked({ todoId, checked }: { todoId: string; checked: boolean }) {
    this.mutationSetChecked({ todoId, checked });
  }

  @Action
  setImportant({ todoId, important }: { todoId: string; important: boolean }) {
    this.mutationSetImportant({ todoId, important });
  }

  @Action
  setDueDate({ todoId, dueDate }: { todoId: string; dueDate: number | null }) {
    this.mutationSetDueDate({ todoId, dueDate });
  }
}

export default new TodosModule({ store, name: "todos" });
