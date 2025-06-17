import { Ionicons } from '@expo/vector-icons';
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

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

const NutritionScreen = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState<Meal>({
    id: '',
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });

  const [showAddMeal, setShowAddMeal] = useState(false);

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.calories > 0) {
      const mealWithId = {
        ...newMeal,
        id: Date.now().toString(),
      };
      setMeals([...meals, mealWithId]);
      setNewMeal({
        id: '',
        name: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      setShowAddMeal(false);
    }
  };

  const deleteMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.header}
      >
        <Text style={styles.title}>Nutrition Tracker</Text>
      </LinearGradient>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Calories</Text>
          <Text style={styles.summaryValue}>{totalCalories}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Protein</Text>
          <Text style={styles.summaryValue}>{totalProtein}g</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Carbs</Text>
          <Text style={styles.summaryValue}>{totalCarbs}g</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Fat</Text>
          <Text style={styles.summaryValue}>{totalFat}g</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddMeal(true)}
      >
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Meal</Text>
      </TouchableOpacity>

      {showAddMeal && (
        <View style={styles.addMealForm}>
          <TextInput
            style={styles.input}
            placeholder="Meal Name"
            placeholderTextColor="#666"
            value={newMeal.name}
            onChangeText={(text) => setNewMeal({ ...newMeal, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Calories"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={newMeal.calories.toString()}
            onChangeText={(text) => setNewMeal({ ...newMeal, calories: Number(text) || 0 })}
          />
          <TextInput
            style={styles.input}
            placeholder="Protein (g)"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={newMeal.protein.toString()}
            onChangeText={(text) => setNewMeal({ ...newMeal, protein: Number(text) || 0 })}
          />
          <TextInput
            style={styles.input}
            placeholder="Carbs (g)"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={newMeal.carbs.toString()}
            onChangeText={(text) => setNewMeal({ ...newMeal, carbs: Number(text) || 0 })}
          />
          <TextInput
            style={styles.input}
            placeholder="Fat (g)"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={newMeal.fat.toString()}
            onChangeText={(text) => setNewMeal({ ...newMeal, fat: Number(text) || 0 })}
          />
          <View style={styles.formButtons}>
            <TouchableOpacity
              style={[styles.formButton, styles.cancelButton]}
              onPress={() => setShowAddMeal(false)}
            >
              <Text style={styles.formButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.formButton, styles.saveButton]}
              onPress={handleAddMeal}
            >
              <Text style={styles.formButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.mealsList}>
        {meals.map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteMeal(meal.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
            <View style={styles.mealMacros}>
              <Text style={styles.macroText}>Calories: {meal.calories}</Text>
              <Text style={styles.macroText}>Protein: {meal.protein}g</Text>
              <Text style={styles.macroText}>Carbs: {meal.carbs}g</Text>
              <Text style={styles.macroText}>Fat: {meal.fat}g</Text>
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
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#1e1e1e',
    margin: 20,
    borderRadius: 12,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#999',
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addMealForm: {
    backgroundColor: '#1e1e1e',
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 12,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  formButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  formButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealsList: {
    padding: 20,
  },
  mealCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealTime: {
    color: '#999',
    fontSize: 14,
  },
  deleteButton: {
    padding: 4,
  },
  mealMacros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  macroText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
    marginBottom: 4,
  },
});

export default NutritionScreen; 