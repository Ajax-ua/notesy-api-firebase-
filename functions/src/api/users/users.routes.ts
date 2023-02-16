import { Router as router } from 'express';

import { getUser, getUsers } from './users.controller';

export const usersRoutes = router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUser);
