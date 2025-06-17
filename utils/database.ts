import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { auth } from '../config/firebase';

const db = getFirestore();

export interface PhotoData {
  id?: string;
  userId: string;
  url: string;
  category: 'front' | 'side' | 'back';
  date: string;
  notes?: string;
}

export const savePhotoData = async (photoData: Omit<PhotoData, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'progressPhotos'), photoData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving photo data:', error);
    throw error;
  }
};

export const getUserPhotos = async (category?: 'front' | 'side' | 'back'): Promise<PhotoData[]> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    let q = query(
      collection(db, 'progressPhotos'),
      where('userId', '==', user.uid)
    );

    if (category) {
      q = query(q, where('category', '==', category));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PhotoData));
  } catch (error) {
    console.error('Error getting user photos:', error);
    throw error;
  }
};

export const deletePhotoData = async (photoId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'progressPhotos', photoId));
  } catch (error) {
    console.error('Error deleting photo data:', error);
    throw error;
  }
}; 