import { User } from './types';

let users: User[] = [];

export const getAllUsers = (): User[] => users;

export const getUserById = (id: string): User | undefined =>
    users.find(user => user.id === id);

export const createUser = (user: User): User => {
    users.push(user);
    return user;
};

export const updateUser = (id: string, updatedFields: Partial<User>): User | null => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updatedFields, id };
    return users[index];
};

export const deleteUser = (id: string): boolean => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
};
