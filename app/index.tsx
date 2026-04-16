import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { initDatabase, getTasks, toggleTask, deleteTask } from '../services/database';
import { getUserName } from '../services/settings';
import { Task } from '../types/task';
import TaskStats from '../components/TaskStats';
import TaskItem from '../components/TaskItem';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [userName, setUserName] = useState('');
  const [dbReady, setDbReady] = useState(false);

  const loadData = useCallback(async () => {
    try {
      if (!dbReady) {
        await initDatabase();
        setDbReady(true);
      }
      const [taskList, name] = await Promise.all([getTasks(), getUserName()]);
      setTasks(taskList);
      setUserName(name);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }, [dbReady]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleToggle = async (id: number) => {
    try {
      await toggleTask(id);
      const updated = await getTasks();
      setTasks(updated);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      const updated = await getTasks();
      setTasks(updated);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      search === '' ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'done' && task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <View className={`flex-1 p-4 ${colors.bg}`}>
      {userName ? (
        <Text className={`text-base mb-2 ${colors.textSecondary}`}>
          Hi, {userName}!
        </Text>
      ) : null}

      <TaskStats tasks={tasks} />

      <TextInput
        className={`p-2 rounded-lg mb-2 border ${colors.border} ${colors.inputBg} ${colors.text}`}
        placeholder="Search tasks..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      <View className="flex-row gap-2 mb-3">
        {(['all', 'active', 'done'] as const).map(f => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            className={`flex-1 p-2 rounded-lg items-center ${
              filter === f ? 'bg-blue-500' : colors.card
            }`}
          >
            <Text className={`text-sm font-medium ${filter === f ? 'text-white' : colors.text}`}>
              {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Done'}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} onDelete={handleDelete} />
        )}
        ListEmptyComponent={
          <Text className={`text-center mt-8 ${colors.textSecondary}`}>
            No tasks yet. Add one!
          </Text>
        }
      />

      <View className="flex-row gap-2 mt-3">
        <Pressable
          onPress={() => router.push('/add-task')}
          className="flex-1 bg-blue-500 p-3 rounded-lg items-center"
        >
          <Text className="text-white font-bold">+ Add Task</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/settings')}
          className={`p-3 rounded-lg items-center border ${colors.border}`}
        >
          <Text className={colors.text}>⚙ Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}
