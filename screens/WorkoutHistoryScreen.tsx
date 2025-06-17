import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Temporary workout history data - later we'll fetch this from a database
const workoutHistory = [
  {
    id: '1',
    name: 'Upper Body Strength',
    date: '2024-03-15',
    duration: '45 min',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: 12, weight: 0 },
      { name: 'Pull-ups', sets: 3, reps: 8, weight: 0 },
      { name: 'Dumbbell Press', sets: 3, reps: 10, weight: 20 },
    ],
    notes: 'Felt strong today, increased weight on dumbbell press',
  },
  {
    id: '2',
    name: 'Leg Day',
    date: '2024-03-13',
    duration: '60 min',
    exercises: [
      { name: 'Squats', sets: 4, reps: 10, weight: 60 },
      { name: 'Lunges', sets: 3, reps: 12, weight: 20 },
      { name: 'Calf Raises', sets: 3, reps: 15, weight: 40 },
    ],
    notes: 'Good form on squats, need to work on balance during lunges',
  },
];

const WorkoutHistoryScreen = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const renderWorkoutCard = ({ item }: { item: typeof workoutHistory[0] }) => (
    <TouchableOpacity
      style={[
        styles.workoutCard,
        selectedWorkout === item.id && styles.workoutCardExpanded,
      ]}
      onPress={() => setSelectedWorkout(selectedWorkout === item.id ? null : item.id)}
    >
      <View style={styles.workoutHeader}>
        <View>
          <Text style={styles.workoutName}>{item.name}</Text>
          <Text style={styles.workoutDate}>{item.date}</Text>
        </View>
        <View style={styles.workoutMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#4CAF50" />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
          <Ionicons
            name={selectedWorkout === item.id ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#fff"
          />
        </View>
      </View>

      {selectedWorkout === item.id && (
        <View style={styles.workoutDetails}>
          <View style={styles.exercisesList}>
            {item.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <View style={styles.exerciseDetails}>
                  <Text style={styles.exerciseDetail}>
                    {exercise.sets} sets × {exercise.reps} reps
                  </Text>
                  {exercise.weight > 0 && (
                    <Text style={styles.exerciseDetail}>
                      {exercise.weight} kg
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
          {item.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Notes:</Text>
              <Text style={styles.notesText}>{item.notes}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d2d2d', '#000000']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Workout History</Text>
        <TouchableOpacity
          style={styles.statsButton}
          onPress={() => router.push('/screens/workout-stats')}
        >
          <Ionicons name="stats-chart-outline" size={24} color="#4CAF50" />
          <Text style={styles.statsButtonText}>View Stats</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={workoutHistory}
        renderItem={renderWorkoutCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.workoutList}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statsButtonText: {
    color: '#4CAF50',
    marginLeft: 5,
    fontSize: 16,
  },
  workoutList: {
    padding: 20,
  },
  workoutCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  workoutCardExpanded: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  workoutDate: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 14,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
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
  workoutDetails: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  exercisesList: {
    marginBottom: 15,
  },
  exerciseItem: {
    marginBottom: 10,
  },
  exerciseName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  exerciseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseDetail: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 14,
    marginRight: 15,
  },
  notesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 10,
    borderRadius: 8,
  },
  notesLabel: {
    color: '#4CAF50',
    fontSize: 14,
    marginBottom: 5,
  },
  notesText: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default WorkoutHistoryScreen; 