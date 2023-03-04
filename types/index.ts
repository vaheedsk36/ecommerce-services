export interface ApiResponse<T = void> {
    data?: T[];
    status: boolean;
    message: string;
}

export interface CategoryList {
    name:string,
    icon:string,
    color:string,
}