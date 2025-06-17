import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth } from '../config/firebase';
import { deletePhotoData, getUserPhotos, PhotoData, savePhotoData } from '../utils/database';
import { deletePhoto as deletePhotoFromStorage, uploadPhoto } from '../utils/storage';

const ProgressPhotosScreen = () => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'front' | 'side' | 'back'>('front');
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  useEffect(() => {
    loadPhotos();
  }, [selectedCategory]);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const userPhotos = await getUserPhotos(selectedCategory);
      setPhotos(userPhotos);
    } catch (error) {
      console.error('Error loading photos:', error);
      Alert.alert('Error', 'Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      await handleNewPhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      await handleNewPhoto(result.assets[0].uri);
    }
  };

  const handleNewPhoto = async (uri: string) => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const downloadURL = await uploadPhoto(uri, selectedCategory);
      const photoData: Omit<PhotoData, 'id'> = {
        userId: user.uid,
        url: downloadURL,
        category: selectedCategory,
        date: new Date().toISOString(),
      };

      await savePhotoData(photoData);
      await loadPhotos();
    } catch (error) {
      console.error('Error saving photo:', error);
      Alert.alert('Error', 'Failed to save photo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (photoId: string, photoUrl: string) => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await deletePhotoData(photoId);
              await deletePhotoFromStorage(photoUrl);
              await loadPhotos();
            } catch (error) {
              console.error('Error deleting photo:', error);
              Alert.alert('Error', 'Failed to delete photo');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const togglePhotoSelection = (photoId: string) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== photoId));
    } else {
      if (selectedPhotos.length < 2) {
        setSelectedPhotos([...selectedPhotos, photoId]);
      } else {
        Alert.alert('Maximum Selection', 'You can only compare two photos at a time');
      }
    }
  };

  const startComparison = () => {
    if (selectedPhotos.length === 2) {
      setComparing(true);
    } else {
      Alert.alert('Selection Required', 'Please select two photos to compare');
    }
  };

  const stopComparison = () => {
    setComparing(false);
    setSelectedPhotos([]);
  };

  const filteredPhotos = photos.filter(photo => photo.category === selectedCategory);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.header}
      >
        <Text style={styles.title}>Progress Photos</Text>
      </LinearGradient>

      <View style={styles.categorySelector}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === 'front' && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory('front')}
        >
          <Text style={styles.categoryText}>Front</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === 'side' && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory('side')}
        >
          <Text style={styles.categoryText}>Side</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === 'back' && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory('back')}
        >
          <Text style={styles.categoryText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
          <Ionicons name="camera-outline" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
          <Ionicons name="images-outline" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Choose Photo</Text>
        </TouchableOpacity>
      </View>

      {!comparing && selectedPhotos.length > 0 && (
        <TouchableOpacity
          style={styles.compareButton}
          onPress={startComparison}
        >
          <Text style={styles.compareButtonText}>
            Compare Selected Photos ({selectedPhotos.length}/2)
          </Text>
        </TouchableOpacity>
      )}

      {comparing ? (
        <View style={styles.comparisonView}>
          <View style={styles.comparisonHeader}>
            <Text style={styles.comparisonTitle}>Photo Comparison</Text>
            <TouchableOpacity onPress={stopComparison}>
              <Ionicons name="close-circle-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.comparisonGrid}>
            {selectedPhotos.map(photoId => {
              const photo = photos.find(p => p.id === photoId);
              return photo ? (
                <View key={photo.id} style={styles.comparisonPhoto}>
                  <Image source={{ uri: photo.url }} style={styles.photo} />
                  <Text style={styles.photoDate}>
                    {new Date(photo.date).toLocaleDateString()}
                  </Text>
                </View>
              ) : null;
            })}
          </View>
        </View>
      ) : (
        <View style={styles.photoGrid}>
          {filteredPhotos.map((photo) => (
            <TouchableOpacity
              key={photo.id}
              style={[
                styles.photoCard,
                selectedPhotos.includes(photo.id!) && styles.selectedPhoto,
              ]}
              onPress={() => togglePhotoSelection(photo.id!)}
            >
              <Image source={{ uri: photo.url }} style={styles.photo} />
              <View style={styles.photoInfo}>
                <Text style={styles.photoDate}>
                  {new Date(photo.date).toLocaleDateString()}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeletePhoto(photo.id!, photo.url)}
                >
                  <Ionicons name="trash-outline" size={20} color="#ff4444" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  categorySelector: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  categoryButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  compareButton: {
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  compareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  comparisonView: {
    padding: 20,
  },
  comparisonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  comparisonTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  comparisonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comparisonPhoto: {
    width: '48%',
  },
  photoGrid: {
    padding: 20,
  },
  photoCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  selectedPhoto: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  photo: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  photoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  photoDate: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButton: {
    padding: 4,
  },
});

export default ProgressPhotosScreen; 