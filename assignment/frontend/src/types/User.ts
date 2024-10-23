export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export interface GetUserResponse {
    totalPage: number;
    data: User[];
}