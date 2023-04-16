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

export interface IUserInfo extends Record<string,any>{
    name:string,
    email:string,
    password:string,
    contact?:number,
    address?:string
}

export type TDeleteOptions = {
    permanently:boolean,
    temporarily:boolean
}