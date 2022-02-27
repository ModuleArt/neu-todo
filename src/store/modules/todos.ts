import todosApi from "@/api/todos";
import { nanoid } from "nanoid";

// interfaces
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import Todo from "@/interfaces/entities/todo";

@Module
class TodosModule extends VuexModule {
  //state
  public todos: Todo[] = [];

  // private mutations
  @Mutation
  private mutationInitState({ todos }: { todos: Todo[] }) {
    if (todos) {
      this.todos = todos;
    }
  }

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
  private mutationSetCustomFolderId({
    todoId,
    customFolderId,
  }: {
    todoId: string;
    customFolderId: string | null;
  }) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) todo.customFolderId = customFolderId;
  }

  @Mutation
  private mutationRemoveTodosByCustomFolderId(folderId: string) {
    this.todos = this.todos.filter((todo) => todo.customFolderId != folderId);
  }

  @Mutation
  public mutationAddStep({
    todoId,
    stepTitle,
  }: {
    todoId: string;
    stepTitle: string;
  }) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo)
      todo.steps.push({
        title: stepTitle,
        checked: false,
      });
  }

  @Mutation
  public mutationRemoveStepByIndex({
    todoId,
    stepIndex,
  }: {
    todoId: string;
    stepIndex: number;
  }) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) {
      todo.steps = todo.steps.filter((step, index) => index != stepIndex);
    }
  }

  // public actions
  @Action
  public addTodo({
    title = "",
    todo,
    transform,
    customFolderId,
  }: {
    title?: string;
    todo?: Todo;
    transform?(todo: Todo): Todo;
    customFolderId?: string;
  }) {
    if (!todo) {
      todo = {
        id: nanoid(),
        checked: false,
        title,
        body: "",
        important: false,
        dueDate: null,
        customFolderId: null,
        steps: [],
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
  public removeTodo(todoId: string) {
    this.mutationRemoveTodo(todoId);
  }

  @Action
  public setChecked({ todoId, checked }: { todoId: string; checked: boolean }) {
    this.mutationSetChecked({ todoId, checked });
  }

  @Action
  public setImportant({
    todoId,
    important,
  }: {
    todoId: string;
    important: boolean;
  }) {
    this.mutationSetImportant({ todoId, important });
  }

  @Action
  public setDueDate({
    todoId,
    dueDate,
  }: {
    todoId: string;
    dueDate: number | null;
  }) {
    this.mutationSetDueDate({ todoId, dueDate });
  }

  @Action
  public setTitle({ todoId, title }: { todoId: string; title: string }) {
    this.mutationSetTitle({ todoId, title });
  }

  @Action
  public setBody({ todoId, body }: { todoId: string; body: string }) {
    this.mutationSetBody({ todoId, body });
  }

  @Action
  public setCustomFolderId({
    todoId,
    customFolderId,
  }: {
    todoId: string;
    customFolderId: string | null;
  }) {
    this.mutationSetCustomFolderId({ todoId, customFolderId });
  }

  @Action
  public removeTodosByCustomFolderId(folderId: string) {
    this.mutationRemoveTodosByCustomFolderId(folderId);
  }

  @Action
  public addStep({ todoId, stepTitle }: { todoId: string; stepTitle: string }) {
    this.mutationAddStep({ todoId, stepTitle });
  }

  @Action
  public removeStepByIndex({
    todoId,
    stepIndex,
  }: {
    todoId: string;
    stepIndex: number;
  }) {
    this.mutationRemoveStepByIndex({ todoId, stepIndex });
  }

  @Action
  public async syncTodo(todoId: string) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) {
      const response = await todosApi.addTodo(todo);
      console.log(response);
    }
  }
}

export default TodosModule;
