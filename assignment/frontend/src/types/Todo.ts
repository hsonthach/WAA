export interface Todo {
    id: number;
    name: string;
    completed: boolean;
    description?: string;
}

export interface GetTodoParam {
    page: number;
    size: number;
    isInit?: boolean;
}

export interface GetTodoResponse {
    totalPage: number;
    data: Todo[];
}