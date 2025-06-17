import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { auth } from '../config/firebase';

const storage = getStorage();

export async function saveData(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

export async function loadData<T>(key: string): Promise<T | null> {
  try {
    const json = await AsyncStorage.getItem(key);
    return json != null ? JSON.parse(json) : null;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return null;
  }
}

export const uploadPhoto = async (uri: string, category: string): Promise<string> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    const response = await fetch(uri);
    const blob = await response.blob();
    
    const filename = `${user.uid}/${category}/${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);
    
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

export const deletePhoto = async (url: string): Promise<void> => {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
};
