import { User } from './types';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';
import * as model from './model';

export const listUsers = () => model.getAllUsers();

export const getUser = (id: string) => {
  if (!validateUUID(id)) throw { status: 400, message: 'Invalid UUID' };
  const user = model.getUserById(id);
  if (!user) throw { status: 404, message: 'User not found' };
  return user;
};

export const createUser = (data: Partial<User>): User => {
  if (!data.username || typeof data.age !== 'number' || !Array.isArray(data.hobbies)) {
    throw { status: 400, message: 'Missing or invalid user data' };
  }
  const newUser: User = { id: uuidv4(), ...data } as User;
  return model.createUser(newUser);
};

export const updateUser = (id: string, data: Partial<User>): User => {
  if (!validateUUID(id)) throw { status: 400, message: 'Invalid UUID' };
  const updated = model.updateUser(id, data);
  if (!updated) throw { status: 404, message: 'User not found' };
  return updated;
};

export const deleteUser = (id: string): void => {
  if (!validateUUID(id)) throw { status: 400, message: 'Invalid UUID' };
  const deleted = model.deleteUser(id);
  if (!deleted) throw { status: 404, message: 'User not found' };
};
