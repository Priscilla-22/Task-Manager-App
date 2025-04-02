export interface Task {

    id: string;
    title: string;
    description?: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
    user_id: string;
    owner_id?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    accessToken?: string;

}

export interface SessionUser {
    id: string;
    name: string;
    email: string;
    accessToken: string;
}