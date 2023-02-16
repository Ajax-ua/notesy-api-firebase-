import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

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

app.all('/users', authGuard);
app.all('/users/*', authGuard);
app.use('/users', usersRoutes);

app.all('/notes', authGuard);
app.all('/notes/*', authGuard);
app.use('/notes', notesRoutes);

app.use(errorLogger);
app.use(errorResponder);

export = app;
