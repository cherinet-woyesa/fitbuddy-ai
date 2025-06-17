import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen = () => {
  const [waterData, setWaterData] = useState<number[]>([]);
  const [sleepData, setSleepData] = useState<number[]>([]);
  const [moodData, setMoodData] = useState<number[]>([]); // scale mood to numbers

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    // Simulated weekly data - replace with AsyncStorage data in real use
    setWaterData([3, 5, 4, 6, 2, 7, 5]);
    setSleepData([7, 6.5, 8, 7.5, 6, 8, 7]);
    setMoodData([4, 3, 5, 2, 3, 4, 5]); // mood scale: 😠=1 to 😄=5
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>💧 Water Intake (Glasses)</Text>
      <BarChart
              data={{
                  labels,
                  datasets: [{ data: waterData }],
              }}
              width={screenWidth - 32}
              height={220}
              yAxisLabel=""
              chartConfig={chartConfig}
              style={{ marginBottom: 24 }} yAxisSuffix={''}      />

      <Text style={{ fontSize: 20, marginBottom: 8 }}>😴 Sleep Hours</Text>
      <LineChart
        data={{
          labels,
          datasets: [{ data: sleepData }],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix="h"
        chartConfig={chartConfig}
        style={{ marginBottom: 24 }}
      />

      <Text style={{ fontSize: 20, marginBottom: 8 }}>🙂 Mood Trend</Text>
      <LineChart
        data={{
          labels,
          datasets: [{ data: moodData }],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""
        chartConfig={{
          ...chartConfig,
          decimalPlaces: 0,
        }}
      />
    </ScrollView>
  );
};

export default AnalyticsScreen;

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  style: {
    borderRadius: 16,
  },
};
