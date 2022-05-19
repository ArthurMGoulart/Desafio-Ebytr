export interface ModelUser<User> {
  create: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User>
}
