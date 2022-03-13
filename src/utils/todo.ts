// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";
import Step from "@/interfaces/entities/step";

// store modules
import { todosModule } from "@/store";

const todoUtils = {
  getTodosByFolder(folder: Folder): Todo[] {
    return todosModule.todos.filter((todo) => {
      if (folder.filter) {
        return folder.filter(todo);
      } else {
        return folder.id === todo.customFolderId;
      }
    });
  },
  getUncheckedTodosByFolder(folder: Folder): Todo[] {
    return todosModule.todos.filter((todo) => {
      if (todo.checked) {
        return false;
      } else {
        if (folder.filter) {
          return folder.filter(todo);
        } else {
          return folder.id === todo.customFolderId;
        }
      }
    });
  },
  getStepsByFolder(folder: Folder): Step[] {
    const todos = this.getTodosByFolder(folder);
    let steps: Step[] = [];
    todos.forEach((todo) => {
      steps = steps.concat(todo.steps);
    });
    return steps;
  },
};

export default todoUtils;
