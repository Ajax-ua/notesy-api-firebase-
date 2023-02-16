import { getFirestore } from 'firebase-admin/firestore';
import * as createHttpError from 'http-errors';
import { RequestHandler } from 'express';

export const existsGuard: RequestHandler = async (req, res, next) => {
  try {
    // enpoint path MUST be the same as firestore path
    // otherwise mapping should be added
    const docSnapshot = await getFirestore().doc(req.originalUrl).get();
    if (!docSnapshot.exists) {
      throw new createHttpError.NotFound('Not found');
    }
    next();
  } catch (err) {
    next(err);
  }
};
