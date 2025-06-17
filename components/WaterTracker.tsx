import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { loadData, saveData } from '../utils/storage';

const WaterTracker = () => {
  const [glasses, setGlasses] = useState(0);

  useEffect(() => {
    loadData<number>('waterGlasses').then((val) => {
      if (val !== null) setGlasses(val);
    });
  }, []);

  const increment = () => {
    const newCount = glasses + 1;
    setGlasses(newCount);
    saveData('waterGlasses', newCount);
  };

  return (
    <View>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Glasses of Water: {glasses}</Text>
      <Button title="+ Add Glass" onPress={increment} />
    </View>
  );
};

export default WaterTracker;
