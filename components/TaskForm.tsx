import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Priority } from '../types/task';

interface TaskFormProps {
  onSubmit: (title: string, description: string, priority: Priority) => void;
}

const priorities: Priority[] = ['High', 'Medium', 'Low'];

const priorityButtonColors: Record<string, { active: string; inactive: string }> = {
  High: { active: 'bg-red-500', inactive: 'bg-red-100' },
  Medium: { active: 'bg-yellow-500', inactive: 'bg-yellow-100' },
  Low: { active: 'bg-green-500', inactive: 'bg-green-100' },
};

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const { colors } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');

  const handleSave = () => {
    if (!title.trim()) return;
    onSubmit(title.trim(), description.trim(), priority);
    setTitle('');
    setDescription('');
    setPriority('Medium');
  };

  return (
    <View>
      <Text className={`text-sm font-semibold mb-1 ${colors.text}`}>Title</Text>
      <TextInput
        className={`p-3 rounded-lg mb-3 border ${colors.border} ${colors.inputBg} ${colors.text}`}
        placeholder="Task title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      <Text className={`text-sm font-semibold mb-1 ${colors.text}`}>Description</Text>
      <TextInput
        className={`p-3 rounded-lg mb-3 border ${colors.border} ${colors.inputBg} ${colors.text}`}
        placeholder="Task description (optional)"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />

      <Text className={`text-sm font-semibold mb-2 ${colors.text}`}>Priority</Text>
      <View className="flex-row gap-2 mb-4">
        {priorities.map(p => (
          <Pressable
            key={p}
            onPress={() => setPriority(p)}
            className={`flex-1 p-2 rounded-lg items-center ${
              priority === p
                ? priorityButtonColors[p].active
                : priorityButtonColors[p].inactive
            }`}
          >
            <Text
              className={`font-semibold ${priority === p ? 'text-white' : 'text-gray-700'}`}
            >
              {p}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={handleSave}
        className={`p-3 rounded-lg items-center ${title.trim() ? 'bg-blue-500' : 'bg-gray-400'}`}
      >
        <Text className="text-white font-bold text-base">Save Task</Text>
      </Pressable>
    </View>
  );
}
