import { DocumentSnapshot, Query, getFirestore } from 'firebase-admin/firestore';

import { Note } from '../../shared/models/note.model';
import { convertDocSnapshotTo } from '../../shared/helpers/firestore.helper';


export async function createNote(note: Omit<Note, 'id'>): Promise<Note> {
  const noteRef = await getFirestore().collection('notes').add(note);

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

export async function getNotes(
  filter?: { userId?: string, topicId?: string },
): Promise<Note[]> {
  let query: Query = getFirestore().collection('notes');
  if (filter?.userId) {
    query = query.where('userId', '==', filter.userId);
  }
  if (filter?.topicId) {
    query = query.where('topicId', '==', filter.topicId);
  }
  const notesCollection = await query.get();
  return notesCollection.docs.map(doc => convertDocSnapshotTo<Note>(doc));
}

export async function getNote(noteId: string): Promise<Note> {
  const noteItem = await getFirestore().collection('notes').doc(noteId).get();
  return convertDocSnapshotTo<Note>(noteItem);
}

export async function patchNote({ id, ...note }: Note): Promise<Note> {
  const doc = getFirestore().collection('notes').doc(id);

  await doc.set(note, { merge: true });

  return convertDocSnapshotTo<Note>(await doc.get());
}

export async function deleteNote(noteId: string): Promise<Note> {
  const doc = getFirestore().collection('notes').doc(noteId);
  const noteSnapshot = await doc.get();
  await doc.delete();
  return convertDocSnapshotTo<Note>(noteSnapshot);
}
