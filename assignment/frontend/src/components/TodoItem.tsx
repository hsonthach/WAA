import { Todo } from "../types/Todo";

export function TodoItem(props: { todo: Todo }) {
  return (
    <div className="transition-all ease-in p-5 mb-2 bg-white rounded-lg shadow shadow-gray-300 hover:shadow-md hover:shadow-gray-400 w-full max-w-lg cursor-pointer">
      <h3 className="text-md font-bold">{props.todo.name}</h3>
      <p className="text-gray-500 truncate">{props.todo.description}</p>
    </div>
  );
}
