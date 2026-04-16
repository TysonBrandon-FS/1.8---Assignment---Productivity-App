import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { addTask, initDatabase } from '../services/database';
import { Priority } from '../types/task';
import TaskForm from '../components/TaskForm';

export default function AddTaskScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [error, setError] = useState('');

  const handleSubmit = async (title: string, description: string, priority: Priority) => {
    try {
      await initDatabase();
      await addTask(title, description, priority);
      router.back();
    } catch (err) {
      setError('Failed to save task. Please try again.');
      console.error('Failed to add task:', err);
    }
  };

  return (
    <View className={`flex-1 p-4 ${colors.bg}`}>
      {error ? (
        <Text className="text-red-500 mb-3 text-center">{error}</Text>
      ) : null}
      <TaskForm onSubmit={handleSubmit} />
    </View>
  );
}
