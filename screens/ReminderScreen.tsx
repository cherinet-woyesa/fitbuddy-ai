import React, { useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scheduleReminder } from '../utils/notifications'; // make sure this exists

const ReminderScreen = () => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === 'ios');
    setTime(currentDate);
  };

  const handleSchedule = async () => {
    await scheduleReminder(
      '🧘 Time to reflect!',
      'Open your journal and write for 5 minutes.',
      time.getHours(),
      time.getMinutes()
    );
    alert(`Reminder set for ${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}`);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
        Select a daily reminder time:
      </Text>

      <Button title="Pick Time" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          mode="time"
          value={time}
          display="default"
          onChange={onChange}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Set Daily Reminder" onPress={handleSchedule} />
      </View>
    </View>
  );
};

export default ReminderScreen; // ✅ Make sure this is here
