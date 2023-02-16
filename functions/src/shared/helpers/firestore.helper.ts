import { DocumentSnapshot } from 'firebase-admin/firestore';

export function convertDocSnapshotTo<T>(snapshot: DocumentSnapshot): T {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as T;
}
