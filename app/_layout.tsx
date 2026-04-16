import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { Pressable, Text } from 'react-native';
import '../styles/global.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Pressable onPress={toggleTheme} className="mr-3 p-1">
      <Text className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</Text>
    </Pressable>
  );
}

function AppNavigator() {
  const { theme } = useTheme();
  const headerBg = theme === 'dark' ? '#1f2937' : '#ffffff';
  const headerText = theme === 'dark' ? '#ffffff' : '#111827';

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: headerText,
        headerRight: () => <ThemeToggle />,
        contentStyle: { backgroundColor: theme === 'dark' ? '#111827' : '#f3f4f6' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'My Tasks' }} />
      <Stack.Screen name="add-task" options={{ title: 'Add Task' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
