import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const createNoteTrigger = functions.firestore
  .document('notes/{noteId}')
  .onCreate((snap) => {
    return snap.ref.set(
      {
        createdAt: snap.createTime,
      },
    );
  });

export const updateNoteTrigger = functions.firestore
  .document('{items}/{noteId}')
  .onUpdate((change) => {
    const { newValue } = change.after.data();
    const { previousValue } = change.before.data();

    if (
      Object.keys(newValue).every(key => key === 'updatedAt' || 
      newValue[key] === previousValue[key])
    ) {
      return false;
    }

    return change.after.ref.set(
      {
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });
