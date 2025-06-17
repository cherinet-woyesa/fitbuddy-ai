import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { loadData, saveData } from '../utils/storage';

const moods = ['😄', '🙂', '😐', '😢', '😠'];

const MoodSelector = () => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    loadData<string>('mood').then((mood) => {
      if (mood) setSelected(mood);
    });
  }, []);

  const selectMood = (mood: string) => {
    setSelected(mood);
    saveData('mood', mood);
  };

  return (
    <View>
      <Text style={{ marginBottom: 8, fontSize: 16 }}>How are you feeling?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {moods.map((mood) => (
          <TouchableOpacity key={mood} onPress={() => selectMood(mood)}>
            <Text style={{ fontSize: 30 }}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selected && <Text style={{ marginTop: 8 }}>Selected: {selected}</Text>}
    </View>
  );
};

export default MoodSelector;
