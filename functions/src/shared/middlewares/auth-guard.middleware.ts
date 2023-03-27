import { logger } from 'firebase-functions/v1';
import * as createHttpError from 'http-errors';
import { getAuth } from 'firebase-admin/auth';
import { NextFunction, Response, Handler } from 'express';

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header 
// like this: `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
export const authGuard: Handler = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization?.startsWith('Bearer ')) {
      logger.error('Missing bearer token');
      throw new createHttpError.Unauthorized('Unauthenticated');
    }
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const decodedIdToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    req.idToken = idToken;
    next();
  } catch (err) {
    next(err);
  }
};
