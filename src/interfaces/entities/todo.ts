// interfaces
import Step from "@/interfaces/entities/step";

interface Todo {
  id: string;
  checked: boolean;
  title: string;
  body: string;
  important: boolean;
  dueDate: number | null;
  customFolderId: string | null;
  steps: Step[];
}

export default Todo;
