import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as app from './app';
import * as triggers from './triggers';

admin.initializeApp();

exports.triggers = triggers;

exports.v1 = functions.https.onRequest(app);
