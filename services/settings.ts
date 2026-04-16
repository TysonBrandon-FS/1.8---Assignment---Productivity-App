import { Platform } from 'react-native';

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  try {
    const SecureStore = require('expo-secure-store');
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      localStorage.setItem(key, value);
    } catch {
      console.error('Failed to save setting:', key);
    }
    return;
  }

  try {
    const SecureStore = require('expo-secure-store');
    await SecureStore.setItemAsync(key, value);
  } catch {
    console.error('Failed to save setting:', key);
  }
}

export async function getTheme(): Promise<'light' | 'dark'> {
  const theme = await getItem('theme');
  return theme === 'dark' ? 'dark' : 'light';
}

export async function saveTheme(theme: 'light' | 'dark'): Promise<void> {
  await setItem('theme', theme);
}

export async function getUserName(): Promise<string> {
  const name = await getItem('userName');
  return name || '';
}

export async function saveUserName(name: string): Promise<void> {
  await setItem('userName', name);
}
