import api from "@/api";

// interfaces
import Todo from "@/interfaces/entities/todo";

// export
export default {
  async addTodo(todo: Todo) {
    const response = await api.post("/b", todo);
    return response;
  },
};
