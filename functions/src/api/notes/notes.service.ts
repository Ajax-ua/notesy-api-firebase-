import * as admin from 'firebase-admin';

import { Note } from '../../shared/models/note.model';

function convertDocSnapshotToNote(snapshot): Note {
  return {
    ...snapshot.data(),
    id: snapshot.id,
  } as Note;
}

export async function createNote(note: Omit<Note, 'id'>): Promise<Note> {
  const noteItem = await (await admin.firestore().collection('notes').add(note)).get();
  return {
    id: noteItem.id,
    ...noteItem.data(),
  } as Note;
}

export async function getNotes(): Promise<Note[]> {
  const notesCollection = await admin.firestore().collection('notes').get();
  return notesCollection.docs.map(doc => convertDocSnapshotToNote(doc));
}

export async function getNote(noteId: string): Promise<Note> {
  const noteItem = await admin.firestore().collection('notes').doc(noteId).get();
  return convertDocSnapshotToNote(noteItem);
}

export async function patchNote({ id, ...note }: Note): Promise<Note> {
  const doc = admin.firestore().collection('notes').doc(id);

  await doc.set(note, { merge: true });

  return convertDocSnapshotToNote(await doc.get());
}

export async function deleteNote(noteId: string): Promise<Note> {
  const doc = admin.firestore().collection('notes').doc(noteId);
  const noteSnapshot = await doc.get();
  await doc.delete();
  return convertDocSnapshotToNote(noteSnapshot);
}
