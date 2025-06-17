import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Exercise data with more details
const exercises = [
  {
    id: '1',
    name: 'Push-ups',
    category: 'Chest',
    difficulty: 'Beginner',
    equipment: 'None',
    description: 'A classic bodyweight exercise that targets the chest, shoulders, and triceps.',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulder-width apart',
      'Keep your body straight from head to heels',
      'Lower your body until your chest nearly touches the floor',
      'Push your body back up to the starting position',
      'Repeat the movement while maintaining proper form'
    ],
    muscles: ['Chest', 'Triceps', 'Shoulders', 'Core'],
    tips: [
      'Keep your core tight throughout the movement',
      'Don\'t let your hips sag or rise too high',
      'Breathe in as you lower, breathe out as you push up',
      'If too difficult, start with knee push-ups'
    ]
  },
  {
    id: '2',
    name: 'Squats',
    category: 'Legs',
    difficulty: 'Beginner',
    equipment: 'None',
    description: 'A fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Keep your chest up and core engaged',
      'Lower your body by bending your knees and pushing your hips back',
      'Go as low as you can while keeping your heels on the ground',
      'Push through your heels to return to the starting position'
    ],
    muscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core'],
    tips: [
      'Keep your knees in line with your toes',
      'Don\'t let your knees cave inward',
      'Keep your back straight throughout the movement',
      'Focus on pushing through your heels'
    ]
  },
  {
    id: '3',
    name: 'Pull-ups',
    category: 'Back',
    difficulty: 'Intermediate',
    equipment: 'Pull-up bar',
    description: 'An upper body exercise that targets the back, biceps, and shoulders.',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    instructions: [
      'Grab the pull-up bar with hands slightly wider than shoulder-width',
      'Hang with arms fully extended',
      'Pull your body up until your chin is over the bar',
      'Lower yourself back down with control',
      'Repeat while maintaining proper form'
    ],
    muscles: ['Back', 'Biceps', 'Shoulders', 'Forearms'],
    tips: [
      'Keep your core engaged throughout the movement',
      'Don\'t swing your body to gain momentum',
      'Focus on pulling with your back muscles',
      'If too difficult, use an assisted pull-up machine or resistance bands'
    ]
  }
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'chest', name: 'Chest' },
  { id: 'back', name: 'Back' },
  { id: 'legs', name: 'Legs' },
  { id: 'shoulders', name: 'Shoulders' },
  { id: 'arms', name: 'Arms' },
  { id: 'core', name: 'Core' },
];

const WorkoutLibraryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const params = useLocalSearchParams();
  const isSelectionMode = params.mode === 'select';

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExercisePress = (exercise: typeof exercises[0]) => {
    if (isSelectionMode) {
      // Return the selected exercise to the create workout screen
      router.setParams({
        selectedExercise: JSON.stringify({
          id: exercise.id,
          name: exercise.name,
          sets: '3',
          reps: '12',
          weight: '0',
        }),
      });
      router.back();
    } else {
      // Navigate to exercise details
      router.push({
        pathname: '/screens/exercise-detail',
        params: { exercise: JSON.stringify(exercise) }
      });
    }
  };

  const renderExerciseCard = ({ item }: { item: typeof exercises[0] }) => (
    <TouchableOpacity 
      style={styles.exerciseCard}
      onPress={() => handleExercisePress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.exerciseImage} />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <View style={styles.exerciseMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="fitness-outline" size={16} color="#4CAF50" />
            <Text style={styles.metaText}>{item.category}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="speedometer-outline" size={16} color="#4CAF50" />
            <Text style={styles.metaText}>{item.difficulty}</Text>
          </View>
        </View>
        <Text style={styles.exerciseDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d2d2d', '#000000']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {isSelectionMode ? 'Select Exercise' : 'Workout Library'}
        </Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {!isSelectionMode && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id && styles.categoryButtonTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <FlatList
        data={filteredExercises}
        renderItem={renderExerciseCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.exercisesList}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: '#fff',
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#4CAF50',
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  categoryButtonTextActive: {
    fontWeight: 'bold',
  },
  exercisesList: {
    padding: 20,
  },
  exerciseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseImage: {
    width: '100%',
    height: 200,
  },
  exerciseInfo: {
    padding: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  metaText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
  },
  exerciseDescription: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default WorkoutLibraryScreen; 