import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as createHttpError from 'http-errors';

import { authGuard } from './shared/middlewares/auth-guard.middleware';
import { topicsRoutes } from './api/topics/topics.routes';
import { usersRoutes } from './api/users/users.routes';
import { notesRoutes } from './api/notes/notes.routes';
import { errorLogger, errorResponder } from './shared/middlewares/handle-error.middleware';

const app = express();

const corsHandler = cors({ origin: true });
app.use(corsHandler);
app.use(bodyParser.json());

app.use('/topics', topicsRoutes);

app.use('/users', authGuard, usersRoutes);

app.use('/notes', authGuard, notesRoutes);

app.get('*', () => {
  throw new createHttpError.NotFound('Not found');
});

app.use(errorLogger);
app.use(errorResponder);

export = app;
