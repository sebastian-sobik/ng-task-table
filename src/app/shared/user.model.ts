export interface User {
  id: number
  name: string,
  age: number,
  birthDate: Date,
  biography? : string
}

export interface UserWithoutID extends Omit<User, 'id'> {}
