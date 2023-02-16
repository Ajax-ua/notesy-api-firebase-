import { getFirestore } from 'firebase-admin/firestore';

import { Topic } from '../../shared/models/topic.model';

export async function getAll(): Promise<Topic[]> {
  const topicsCollection = await getFirestore().collection('topics').get();
  return topicsCollection.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }) as Topic);
}

export async function checkTopicExists(topicId: string): Promise<boolean> {
  const { exists } = await getFirestore().collection('topics').doc(topicId).get();
  return exists;
}
