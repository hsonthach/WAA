import { useEffect } from "react";
import { getTodos } from "../service/todo.service";
import { clearTodo } from "../state/reducer/todoSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import { TodoItem } from "../components/TodoItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const { todos, page, size, totalPage, status } = useSelector(
    (state: RootState) => state.todo
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodos({ page: page, size, isInit: true }));
    return () => {
      dispatch(clearTodo());
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="fade-in bg-white shadow-lg p-6 rounded-md w-[600px]">
        <h2 className="mb-2 text-center text-2xl font-bold leading-9 tracking-tight select-none">
          List
        </h2>
        <div className="h-auto max-h-[400px] overflow-y-auto p-2">
          {todos.map((todo) => (
            <div key={todo.id} onClick={() => navigate("/todos/" + todo.id)}>
              <TodoItem todo={todo} />
            </div>
          ))}

          {status === "succeeded" && page < totalPage - 1 && (
            <Button
              onClick={() => {
                dispatch(getTodos({ page: page + 1, size }));
              }}
              text="Load more"
            />
          )}
        </div>
      </div>
    </div>
  );
}
