import { getFirestore } from 'firebase-admin/firestore';
import * as createHttpError from 'http-errors';
import { Response, NextFunction } from 'express';

export const ownerGuard = async (req: any, res: Response, next: NextFunction) => {
  try {
    // enpoint path MUST be the same as firestore path
    // otherwise mapping should be added
    const docSnapshot = await getFirestore().doc(req.originalUrl).get();
    if (req.user.uid !== docSnapshot.data()?.userId) {
      throw new createHttpError.Forbidden('Access denied');
    }
    next();
  } catch (err) {
    next(err);
  }
};
