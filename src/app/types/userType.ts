export type UserRole = 'guest' | 'client';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
}
