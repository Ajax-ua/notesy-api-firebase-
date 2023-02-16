import { RequestHandler } from 'express';

import * as usersService from './users.service';

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    res.json(await usersService.getUsers());
  } catch (err) {
    next(err);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    res.json(await usersService.getUser(req.params.userId));
  } catch (err) {
    next(err);
  }
};
