export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'analyst'| 'admin';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

let users: User[] = [];
let idCounter = 1;

export const createUser = (name: string, email: string): User => {
  const now = new Date();

  const newUser: User = {
    id: idCounter++,
    name,
    email,
    password: "",
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastLogin: undefined,
  };
  users.push(newUser);
  return newUser;
};

export const getAllUsers = (): User[] => {
  return users;
};

export const getUserById = (id: number): User | undefined => {
  return users.find(user => user.id === id);
};
