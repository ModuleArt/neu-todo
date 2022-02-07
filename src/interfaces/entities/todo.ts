interface Todo {
  id: string;
  checked: boolean;
  title: string;
  body: string;
  important: boolean;
  dueDate: number | null;
  customFolderId: string | null;
  lastAdded: boolean;
}

export default Todo;
