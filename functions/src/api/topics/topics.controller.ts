import { RequestHandler } from 'express';

import * as topicsService from './topics.service';

export const getTopics: RequestHandler = async (req, res, next) => {
  try {
    res.json(await topicsService.getAll());
  } catch (err) {
    next(err);
  }
};
