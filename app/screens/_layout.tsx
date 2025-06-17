import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ScreensLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [user, loading]);

  if (loading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="dashboard" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="analytics" 
        options={{ 
          title: 'Analytics',
        }} 
      />
      <Stack.Screen 
        name="chatbot" 
        options={{ 
          title: 'AI Coach',
        }} 
      />
      <Stack.Screen 
        name="tracker" 
        options={{ 
          title: 'Health Tracker',
        }} 
      />
      <Stack.Screen 
        name="reminder" 
        options={{ 
          title: 'Reminders',
        }} 
      />
      <Stack.Screen
        name="workout-library"
        options={{
          title: 'Workout Library',
        }}
      />
      <Stack.Screen
        name="exercise-detail"
        options={{
          title: 'Exercise Details',
        }}
      />
      <Stack.Screen
        name="create-workout"
        options={{
          title: 'Create Workout',
        }}
      />
      <Stack.Screen
        name="workout-history"
        options={{
          title: 'Workout History',
        }}
      />
      <Stack.Screen
        name="workout-stats"
        options={{
          title: 'Workout Stats',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="body-measurements"
        options={{
          title: 'Body Measurements',
        }}
      />
      <Stack.Screen
        name="progress-photos"
        options={{
          title: 'Progress Photos',
        }}
      />
      <Stack.Screen
        name="nutrition"
        options={{
          title: 'Nutrition Tracker',
        }}
      />
    </Stack>
  );
} 