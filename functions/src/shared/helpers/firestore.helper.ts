import { DocumentSnapshot, Timestamp } from 'firebase-admin/firestore';

export function convertDocSnapshotTo<T>(snapshot: DocumentSnapshot): T {
  const data = snapshot.data();
  if (!data) {
    return undefined as T;
  }

  if (data.createdAt instanceof Timestamp) {
    data.createdAt = data.createdAt.toMillis();
  }
  if (data.updatedAt instanceof Timestamp) {
    data.updatedAt = data.updatedAt.toMillis();
  }

  return {
    id: snapshot.id,
    ...data,
  } as T;
}
