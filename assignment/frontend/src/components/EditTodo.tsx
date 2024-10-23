import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { Todo, updateTodo } from "../features/todo/todoSlice";

interface EditTodoProps {
    todo: Todo;
    setEditting: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

export function EditTodo({ todo, setEditting }: EditTodoProps) {
    const nameRef = React.useRef<HTMLInputElement>(null);
    const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
    const dispatch = useDispatch();
    const [isFadingOut, setIsFadingOut] = React.useState(false);

    const handleCancel = () => {
        setIsFadingOut(true);
        setTimeout(() => setEditting(false), 500); // Match the duration of the fade-out animation
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleCancel();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`bg-white p-6 rounded-lg shadow-lg w-1/2 ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
                <h2 className="text-2xl mb-4">Edit Todo</h2>
                <input
                    type="text"
                    placeholder="Name"
                    defaultValue={todo.name}
                    ref={nameRef}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Description"
                    defaultValue={todo.description}
                    ref={descriptionRef}
                    className="w-full p-2 mb-4 border border-gray-300 rounded resize-none h-32"
                />
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            dispatch(
                                updateTodo({
                                    id: todo.id,
                                    name: nameRef.current?.value || todo.name,
                                    description: descriptionRef.current?.value || todo.description,
                                }) as any
                            );
                            setEditting(false);
                        }}
                        className="bg-blue-500 text-white p-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
                    >
                        Save
                    </button>
                    <button
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}