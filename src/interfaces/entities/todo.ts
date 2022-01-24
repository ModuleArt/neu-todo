interface Todo {
  id: string;
  checked: boolean;
  title: string;
  body: string;
  important: boolean;
  dueDate: number | null;
  folder: string | null;
}

export default Todo;
