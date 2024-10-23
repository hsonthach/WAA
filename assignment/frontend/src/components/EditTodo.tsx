import React from "react";
import {useDispatch} from "react-redux";
import {Todo, updateTodo} from "../features/todo/todoSlice";
interface EditTodoProps {
    todo: Todo;
    setEditting: (value: ((prevState: boolean) => boolean) | boolean) => void;
}
export function EditTodo({todo, setEditting}: EditTodoProps) {
    // edit name and description
    const nameRef = React.useRef<HTMLInputElement>(null);
    const descriptionRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                defaultValue={todo.name}
                ref={nameRef}
            />
            <input
                type="text"
                placeholder="Description"
                defaultValue={todo.description}
                ref={descriptionRef}
            />
            <button
                onClick={() => {
                    dispatch(
                        updateTodo({
                            id: todo.id,
                            name: nameRef.current?.value || todo.name,
                            description: descriptionRef.current?.value || todo.description,
                        }) as any
                    )
                    setEditting(false);
                }}
                className="bg-blue-500 text-white p-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
            >
                Save
            </button>
            <button
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => {
                    setEditting(false);
                }}
            >
                Cancel
            </button>
        </div>
    );
}