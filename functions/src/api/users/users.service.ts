import * as admin from 'firebase-admin';
import * as createHttpError from 'http-errors';
import { UserRecord } from 'firebase-admin/auth';

import { User } from '../../shared/models/user.model';

function convertUser(user: UserRecord): User {
  return {
    id: user.uid,
    email: user.email ?? '',
    name: user.displayName ?? '',
  };
}

export async function getUsers(): Promise<User[]> {
  const usersCollection = await admin.auth().listUsers();
  return usersCollection.users.map(user => convertUser(user));
}

export async function getUser(uid: string): Promise<User> {
  const userItem = await admin.auth().getUser(uid);
  if (!userItem) {
    throw new createHttpError.NotFound('User not found');
  }
  return convertUser(userItem);
}
