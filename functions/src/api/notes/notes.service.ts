import * as admin from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-admin/firestore';

import { Note } from '../../shared/models/note.model';
import { convertDocSnapshotTo } from '../../shared/helpers/firestore.helper';


export async function createNote(note: Omit<Note, 'id'>): Promise<Note> {
  const noteRef = await (await admin.firestore().collection('notes').add(note));

  // wait until timestamp fields are added by trigger
  const noteSnapshot: DocumentSnapshot = await new Promise((resolve, reject) => {
    noteRef.onSnapshot(
      snapshot => {
        if (snapshot.data()?.createdAt) {
          resolve(snapshot);
        }
      },
      err => {
        reject(err);
      }
    );
  });

  return convertDocSnapshotTo<Note>(noteSnapshot);
}

export async function getNotes(): Promise<Note[]> {
  const notesCollection = await admin.firestore().collection('notes').get();
  return notesCollection.docs.map(doc => convertDocSnapshotTo<Note>(doc));
}

export async function getNote(noteId: string): Promise<Note> {
  const noteItem = await admin.firestore().collection('notes').doc(noteId).get();
  return convertDocSnapshotTo<Note>(noteItem);
}

export async function patchNote({ id, ...note }: Note): Promise<Note> {
  const doc = admin.firestore().collection('notes').doc(id);

  await doc.set(note, { merge: true });

  return convertDocSnapshotTo<Note>(await doc.get());
}

export async function deleteNote(noteId: string): Promise<Note> {
  const doc = admin.firestore().collection('notes').doc(noteId);
  const noteSnapshot = await doc.get();
  await doc.delete();
  return convertDocSnapshotTo<Note>(noteSnapshot);
}
