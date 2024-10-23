// Create a new todo
import { Todo } from "../features/todo/todoSlice";

const baseUrl = "http://localhost:8080";
const getHeaders = () => {
  const token = localStorage.getItem('jwtToken');
  console.log("Token used in headers:", token);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};



export const createTodoApi = async (text: string): Promise<Todo> => {
  const response = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name: text }),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  const data = await response.json();
  return { id: data.id, name: data.name, completed: data.completed, description: "" };
};
