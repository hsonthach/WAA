import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../state/store";
import { useEffect, useState } from "react";
import Button, { COLORS } from "../components/Button";
import { updateTodo, deleteTodo } from "../service/todo.service";
import { toast } from "react-toastify";

export default function TodoView() {
  let { id } = useParams();
  const { todos, status } = useSelector((state: RootState) => state.todo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onUpdate = async () => {
    if (!id || status === "loading") return;

    await dispatch(
      updateTodo({
        id: parseInt(id),
        name: name,
        description: description,
      }) as any
    );
    navigate("/todos");
    toast.info("Saved successfully!");
  };

  const onDelete = async () => {
    if (!id || status === "loading") return;
    await dispatch(deleteTodo(parseInt(id)) as any);
    navigate("/todos");
  };

  useEffect(() => {
    if (!id) return;

    const todo = todos.find((item) => item.id === parseInt(id!));
    if (todo) {
      setName(todo.name);
      setDescription(todo.description);
    }
  }, [id, todos]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="fade-in bg-white shadow-lg p-6 rounded-md w-[450px]">
        <h2 className="mb-2 text-center text-2xl font-bold leading-9 tracking-tight select-none">
          Todo: {id}
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

          <div className="flex gap-1">
            <Button
              background={COLORS.RED}
              onClick={onDelete}
              text={status === "loading" ? "Loading..." : "Remove"}
            />
            <Button
              onClick={onUpdate}
              text={status === "loading" ? "Loading..." : "Update"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
