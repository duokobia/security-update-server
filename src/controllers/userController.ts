import { Request, Response } from 'express';
import { createUser, getAllUsers, getUserById } from '../models/userModel';

export const handleCreateUser = (req: Request, res: Response): void => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ message: 'Name and email are required' });
    return;
  }

  const newUser = createUser(name, email);
  res.status(201).json(newUser);
};

export const handleGetUsers = (req: Request, res: Response): void => {
  const users = getAllUsers();
  res.status(200).json(users);
};

export const handleGetUserById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  const user = getUserById(id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user);
};