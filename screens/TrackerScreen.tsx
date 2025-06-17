import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MoodSelector from '../components/MoodSelector';
import SleepTracker from '../components/SleepTracker';
import TrackerCard from '../components/TrackerCard';
import WaterTracker from '../components/WaterTracker';

const TrackerScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TrackerCard title="💧 Water Tracker">
        <WaterTracker />
      </TrackerCard>

      <TrackerCard title="😴 Sleep Tracker">
        <SleepTracker />
      </TrackerCard>

      <TrackerCard title="😌 Mood Selector">
        <MoodSelector />
      </TrackerCard>
    </ScrollView>
  );
};

export default TrackerScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
