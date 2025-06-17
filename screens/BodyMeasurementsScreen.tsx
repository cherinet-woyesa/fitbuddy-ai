import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Measurement {
  id: string;
  date: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
  biceps: string;
  thighs: string;
}

const BodyMeasurementsScreen = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([
    {
      id: '1',
      date: '2024-03-15',
      weight: '75',
      chest: '95',
      waist: '80',
      hips: '90',
      biceps: '35',
      thighs: '55',
    },
  ]);

  const [newMeasurement, setNewMeasurement] = useState<Measurement>({
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    biceps: '',
    thighs: '',
  });

  const handleAddMeasurement = () => {
    if (
      newMeasurement.weight &&
      newMeasurement.chest &&
      newMeasurement.waist &&
      newMeasurement.hips &&
      newMeasurement.biceps &&
      newMeasurement.thighs
    ) {
      setMeasurements([...measurements, newMeasurement]);
      setNewMeasurement({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        weight: '',
        chest: '',
        waist: '',
        hips: '',
        biceps: '',
        thighs: '',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.header}
      >
        <Text style={styles.title}>Body Measurements</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add New Measurement</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={newMeasurement.weight}
            onChangeText={(text) =>
              setNewMeasurement({ ...newMeasurement, weight: text })
            }
            keyboardType="numeric"
            placeholder="Enter weight"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Chest (cm)</Text>
          <TextInput
            style={styles.input}
            value={newMeasurement.chest}
            onChangeText={(text) =>
              setNewMeasurement({ ...newMeasurement, chest: text })
            }
            keyboardType="numeric"
            placeholder="Enter chest measurement"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Waist (cm)</Text>
          <TextInput
            style={styles.input}
            value={newMeasurement.waist}
            onChangeText={(text) =>
              setNewMeasurement({ ...newMeasurement, waist: text })
            }
            keyboardType="numeric"
            placeholder="Enter waist measurement"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hips (cm)</Text>
          <TextInput
            style={styles.input}
            value={newMeasurement.hips}
            onChangeText={(text) =>
              setNewMeasurement({ ...newMeasurement, hips: text })
            }
            keyboardType="numeric"
            placeholder="Enter hips measurement"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Biceps (cm)</Text>
          <TextInput
            style={styles.input}
            value={newMeasurement.biceps}
            onChangeText={(text) =>
              setNewMeasurement({ ...newMeasurement, biceps: text })
            }
            keyboardType="numeric"
            placeholder="Enter biceps measurement"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Thighs (cm)</Text>
          <TextInput
            style={styles.input}
            value={newMeasurement.thighs}
            onChangeText={(text) =>
              setNewMeasurement({ ...newMeasurement, thighs: text })
            }
            keyboardType="numeric"
            placeholder="Enter thighs measurement"
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddMeasurement}
        >
          <Text style={styles.addButtonText}>Add Measurement</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Measurement History</Text>
        {measurements.map((measurement) => (
          <View key={measurement.id} style={styles.measurementCard}>
            <Text style={styles.measurementDate}>
              {new Date(measurement.date).toLocaleDateString()}
            </Text>
            <View style={styles.measurementGrid}>
              <View style={styles.measurementItem}>
                <Text style={styles.measurementLabel}>Weight</Text>
                <Text style={styles.measurementValue}>
                  {measurement.weight} kg
                </Text>
              </View>
              <View style={styles.measurementItem}>
                <Text style={styles.measurementLabel}>Chest</Text>
                <Text style={styles.measurementValue}>
                  {measurement.chest} cm
                </Text>
              </View>
              <View style={styles.measurementItem}>
                <Text style={styles.measurementLabel}>Waist</Text>
                <Text style={styles.measurementValue}>
                  {measurement.waist} cm
                </Text>
              </View>
              <View style={styles.measurementItem}>
                <Text style={styles.measurementLabel}>Hips</Text>
                <Text style={styles.measurementValue}>
                  {measurement.hips} cm
                </Text>
              </View>
              <View style={styles.measurementItem}>
                <Text style={styles.measurementLabel}>Biceps</Text>
                <Text style={styles.measurementValue}>
                  {measurement.biceps} cm
                </Text>
              </View>
              <View style={styles.measurementItem}>
                <Text style={styles.measurementLabel}>Thighs</Text>
                <Text style={styles.measurementValue}>
                  {measurement.thighs} cm
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  measurementCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  measurementDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  measurementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  measurementItem: {
    width: '48%',
    marginBottom: 12,
  },
  measurementLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  measurementValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BodyMeasurementsScreen; 