import { useState } from "react";
import { useSelector } from "react-redux";
import { createTodo } from "../service/todo.service";
import { RootState, useAppDispatch } from "../state/store";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TodoCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { status } = useSelector((state: RootState) => state.todo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddTodo = async () => {
    try {
      if (name.trim() && description.trim()) {
        await dispatch(
          createTodo({
            name,
            description,
          })
        );
        setName("");
        setDescription("");
        navigate("/todos");
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast.error("Failed to add todo");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="fade-in bg-white shadow-lg p-6 rounded-md w-[450px]">
        <h2 className="mb-2 text-center text-2xl font-bold leading-9 tracking-tight select-none">
          Create Todo
        </h2>
        <div className="h-auto max-h-[400px] overflow-y-auto p-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900 select-none"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="transition-all	duration-150 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 focus:outline-none sm:text-sm sm:leading-6"
          />

          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900 select-none"
          >
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="transition-all	duration-150 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 focus:outline-none sm:text-sm sm:leading-6"
          />

          <br />

          <Button
            onClick={handleAddTodo}
            text={status === "loading" ? "Adding..." : "Add"}
          />
        </div>
      </div>
    </div>
  );
}
