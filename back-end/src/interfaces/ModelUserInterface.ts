import { User } from '../interfaces';

export interface ModelUser {
  create: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
}
