// Create a new todo
import { Todo } from "../features/todo/todoSlice";

const baseUrl = "http://localhost:8080";

export const createTodoApi = async (text: string): Promise<Todo> => {
  const response = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    body: JSON.stringify({ title: text }),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  const data = await response.json();
  return { id: data.id, name: data.title, completed: data.completed, description: "" };
};
