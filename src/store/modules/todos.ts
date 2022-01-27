import todosApi from "@/api/todos";
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
    this.todos.unshift(todo);
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

  @Mutation
  private mutationSetTitle({
    todoId,
    title,
  }: {
    todoId: string;
    title: string;
  }) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) todo.title = title;
  }

  @Mutation
  private mutationSetBody({ todoId, body }: { todoId: string; body: string }) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) todo.body = body;
  }

  @Mutation
  private mutationInitState({ todos }: { todos: Todo[] }) {
    if (todos) {
      this.todos = todos;
    }
  }

  // actions
  @Action
  addTodo({
    todo,
    transform,
    customFolderId,
  }: {
    todo?: Todo;
    transform?(todo: Todo): Todo;
    customFolderId?: string;
  }) {
    if (!todo) {
      todo = {
        id: nanoid(),
        checked: false,
        title: "",
        body: "",
        important: false,
        dueDate: null,
        customFolderId: null,
      };
    }
    if (transform) {
      todo = transform(todo);
    } else if (customFolderId) {
      todo.customFolderId = customFolderId;
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

  @Action
  setTitle({ todoId, title }: { todoId: string; title: string }) {
    this.mutationSetTitle({ todoId, title });
  }

  @Action
  setBody({ todoId, body }: { todoId: string; body: string }) {
    this.mutationSetBody({ todoId, body });
  }

  @Action
  async syncTodo(todoId: string) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) {
      const response = await todosApi.addTodo(todo);
      console.log(response);
    }
  }
}

export default TodosModule;
