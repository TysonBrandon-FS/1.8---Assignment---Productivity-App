import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Task } from '../types/task';

interface TaskStatsProps {
  tasks: Task[];
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const { colors } = useTheme();
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <View className={`flex-row justify-around p-3 rounded-lg mb-3 ${colors.card}`}>
      <View className="items-center">
        <Text className={`text-lg font-bold ${colors.text}`}>{total}</Text>
        <Text className={`text-xs ${colors.textSecondary}`}>Total</Text>
      </View>
      <View className="items-center">
        <Text className="text-lg font-bold text-green-500">{completed}</Text>
        <Text className={`text-xs ${colors.textSecondary}`}>Done</Text>
      </View>
      <View className="items-center">
        <Text className="text-lg font-bold text-orange-500">{pending}</Text>
        <Text className={`text-xs ${colors.textSecondary}`}>Pending</Text>
      </View>
    </View>
  );
}
