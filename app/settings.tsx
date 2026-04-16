import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getUserName, saveUserName } from '../services/settings';

export default function SettingsScreen() {
  const { theme, toggleTheme, colors } = useTheme();
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getUserName().then(setName);
  }, []);

  const handleSaveName = async () => {
    await saveUserName(name.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <View className={`flex-1 p-4 ${colors.bg}`}>
      <Text className={`text-lg font-bold mb-4 ${colors.text}`}>Settings</Text>

      <Text className={`text-sm font-semibold mb-1 ${colors.text}`}>Your Name</Text>
      <TextInput
        className={`p-3 rounded-lg mb-2 border ${colors.border} ${colors.inputBg} ${colors.text}`}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <Pressable
        onPress={handleSaveName}
        className="bg-blue-500 p-3 rounded-lg items-center mb-2"
      >
        <Text className="text-white font-bold">Save Name</Text>
      </Pressable>
      {saved && (
        <Text className="text-green-500 text-center mb-4">Name saved!</Text>
      )}

      <View className={`mt-4 p-4 rounded-lg ${colors.card}`}>
        <Text className={`text-sm font-semibold mb-2 ${colors.text}`}>Theme</Text>
        <View className="flex-row items-center justify-between">
          <Text className={colors.text}>
            Current: {theme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
          </Text>
          <Pressable
            onPress={toggleTheme}
            className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-yellow-500' : 'bg-gray-700'}`}
          >
            <Text className="text-white font-medium">
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </Text>
          </Pressable>
        </View>
      </View>

      <View className={`mt-4 p-4 rounded-lg ${colors.card}`}>
        <Text className={`text-sm font-semibold mb-1 ${colors.text}`}>About</Text>
        <Text className={colors.textSecondary}>
          Task Manager App v1.0.0
        </Text>
        <Text className={colors.textSecondary}>
          Built with Expo + TypeScript + NativeWind
        </Text>
      </View>
    </View>
  );
}
