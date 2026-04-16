import React from 'react';
import { View, Text, Pressable, Alert, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const priorityColors: Record<string, string> = {
  High: 'border-l-red-500',
  Medium: 'border-l-yellow-500',
  Low: 'border-l-green-500',
};

const priorityBadgeColors: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const { colors } = useTheme();

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Delete this task?')) {
        onDelete(task.id);
      }
    } else {
      Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(task.id) },
      ]);
    }
  };

  return (
    <View
      className={`flex-row items-center p-3 mb-2 rounded-lg border-l-4 ${priorityColors[task.priority]} ${colors.card} ${task.completed ? 'opacity-60' : ''}`}
    >
      <Pressable onPress={() => onToggle(task.id)} className="mr-3">
        <View
          className={`w-6 h-6 rounded border-2 items-center justify-center ${
            task.completed ? 'bg-green-500 border-green-500' : `${colors.border}`
          }`}
        >
          {task.completed && <Text className="text-white text-xs">✓</Text>}
        </View>
      </Pressable>

      <View className="flex-1">
        <Text
          className={`font-semibold ${colors.text} ${task.completed ? 'line-through' : ''}`}
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text className={`text-sm ${colors.textSecondary} ${task.completed ? 'line-through' : ''}`}>
            {task.description}
          </Text>
        ) : null}
        <View className="flex-row items-center mt-1">
          <Text className={`text-xs px-2 py-0.5 rounded ${priorityBadgeColors[task.priority]}`}>
            {task.priority}
          </Text>
        </View>
      </View>

      <Pressable onPress={handleDelete} className="ml-2 p-2">
        <Text className="text-red-500 text-lg">✕</Text>
      </Pressable>
    </View>
  );
}
