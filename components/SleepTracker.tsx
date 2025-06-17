import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { loadData, saveData } from '../utils/storage';

const SleepTracker = () => {
  const [sleepHours, setSleepHours] = useState('');

  useEffect(() => {
    loadData<string>('sleepHours').then((val) => {
      if (val !== null) setSleepHours(val);
    });
  }, []);

  const handleChange = (val: string) => {
    setSleepHours(val);
    saveData('sleepHours', val);
  };

  return (
    <View>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Hours Slept:</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="e.g. 7.5"
        value={sleepHours}
        onChangeText={handleChange}
        style={{
          borderWidth: 1,
          borderRadius: 6,
          padding: 10,
          borderColor: '#ccc',
        }}
      />
    </View>
  );
};

export default SleepTracker;
