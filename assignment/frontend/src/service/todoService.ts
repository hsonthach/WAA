// todoService.ts

import {getAuthToken} from "./authService";
import axios from "axios";
import Todo from "../Todo";

const baseUrl = 'http://localhost:8080';

const getHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// Function to fetch todos from the API
export const fetchTodosFromApi = async (): Promise<Todo[]> => {
    const url = 'http://localhost:8080/todos';

    try {
        const response = await axios.get(url, {
            headers: getHeaders(), // Ensure getHeaders returns the necessary headers
        });

        // Transform and return the todos
        return response.data.map((item: any): Todo => ({
            id: item.id,
            text: item.title,  // Make sure 'title' matches your API response structure
            completed: item.completed,
        }));
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error; // Re-throw the error for handling in the calling function
    }
};

// Create a new todo
export const createTodoApi = async (text: string): Promise<Todo> => {
    const response = await fetch(`${baseUrl}/todos`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ title: text }),
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    const data = await response.json();
    return { id: data.id, text: data.title, completed: data.completed };
};

// Update an existing todo
export const updateTodoApi = async (id: number, completed: boolean): Promise<Todo> => {
    const response = await fetch(`${baseUrl}/todos/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    const data = await response.json();
    return { id: data.id, text: data.title, completed: data.completed };
};

// Delete a todo
export const deleteTodoApi = async (id: number): Promise<number> => {
    const response = await fetch(`${baseUrl}/todos/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
    return id;
};
