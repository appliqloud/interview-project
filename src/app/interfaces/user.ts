export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
}
export enum EUserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}