import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { requestNotificationPermission, scheduleReminder } from '../utils/notifications';

const DashboardScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [stats, setStats] = useState({
    workoutsThisWeek: 3,
    totalWorkouts: 12,
    caloriesBurned: 1250,
    streak: 5,
  });

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        await requestNotificationPermission();
        if (Platform.OS !== 'web') {
          await scheduleReminder('💧 Drink Water', 'Stay hydrated.', 9, 0);
          await scheduleReminder('💧 Drink Water', 'Time for a glass!', 12, 0);
          await scheduleReminder('💧 Drink Water', "Don't forget to hydrate!", 15, 0);
          await scheduleReminder('😴 Sleep Time', 'Start winding down.', 21, 30);
          setNotificationsEnabled(true);
        }
      } catch (error) {
        console.log('Error setting up notifications:', error);
      }
    };

    setupNotifications();
  }, []);

  const QuickAction = ({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={styles.quickActionIcon}>
        <Ionicons name={icon as any} size={24} color="#4CAF50" />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
    <View style={styles.statCard}>
      <Ionicons name={icon as any} size={24} color="#4CAF50" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d2d2d', '#000000']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.subGreeting}>Let's crush your fitness goals today</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={40} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <StatCard title="Workouts This Week" value={stats.workoutsThisWeek} icon="fitness-outline" />
          <StatCard title="Total Workouts" value={stats.totalWorkouts} icon="trophy-outline" />
          <StatCard title="Calories Burned" value={stats.caloriesBurned} icon="flame-outline" />
          <StatCard title="Day Streak" value={stats.streak} icon="flame-outline" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickAction
              icon="barbell-outline"
              label="Workout Library"
              onPress={() => router.push('/screens/workout-library')}
            />
            <QuickAction
              icon="add-circle-outline"
              label="Create Workout"
              onPress={() => router.push('/screens/create-workout')}
            />
            <QuickAction
              icon="time-outline"
              label="History"
              onPress={() => router.push('/screens/workout-history')}
            />
            <QuickAction
              icon="person-outline"
              label="Profile"
              onPress={() => router.push('/screens/profile')}
            />
            <QuickAction
              icon="analytics-outline"
              label="Analytics"
              onPress={() => router.push('/screens/analytics')}
            />
            <QuickAction
              icon="chatbubble-outline"
              label="AI Coach"
              onPress={() => router.push('/screens/chatbot')}
            />
            <QuickAction
              icon="calendar-outline"
              label="Reminders"
              onPress={() => router.push('/screens/reminder')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          <TouchableOpacity style={styles.workoutCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
              style={styles.workoutImage}
            />
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutTitle}>Full Body Strength</Text>
              <Text style={styles.workoutSubtitle}>45 minutes • 12 exercises</Text>
              <View style={styles.workoutStats}>
                <View style={styles.workoutStat}>
                  <Ionicons name="flame-outline" size={16} color="#4CAF50" />
                  <Text style={styles.workoutStatText}>320 cal</Text>
                </View>
                <View style={styles.workoutStat}>
                  <Ionicons name="barbell-outline" size={16} color="#4CAF50" />
                  <Text style={styles.workoutStatText}>Medium</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {Platform.OS === 'web' ? (
          <Text style={styles.notificationText}>Notifications are not available on web platform</Text>
        ) : (
          <Text style={styles.notificationText}>
            {notificationsEnabled ? 'Reminders are scheduled!' : 'Setting up reminders...'}
          </Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subGreeting: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.7,
    marginTop: 4,
  },
  profileButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  quickAction: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickActionIcon: {
    marginRight: 10,
  },
  quickActionLabel: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  workoutCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  workoutImage: {
    width: '100%',
    height: 150,
  },
  workoutInfo: {
    padding: 15,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  workoutSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    marginTop: 4,
  },
  workoutStats: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 15,
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workoutStatText: {
    color: '#fff',
    fontSize: 14,
  },
  notificationText: {
    textAlign: 'center',
    color: '#fff',
    opacity: 0.7,
    padding: 20,
  },
});
