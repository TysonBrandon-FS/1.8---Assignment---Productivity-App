import { Platform } from 'react-native';
import { Task, Priority } from '../types/task';

let db: any = null;

// Web fallback uses localStorage
function getWebTasks(): Task[] {
  try {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveWebTasks(tasks: Task[]) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

let nextWebId = 1;

function initWebId(tasks: Task[]) {
  if (tasks.length > 0) {
    nextWebId = Math.max(...tasks.map(t => t.id)) + 1;
  }
}

export async function initDatabase(): Promise<void> {
  if (Platform.OS === 'web') {
    const tasks = getWebTasks();
    initWebId(tasks);
    return;
  }

  try {
    const SQLite = require('expo-sqlite');
    db = await SQLite.openDatabaseAsync('tasks.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT NOT NULL DEFAULT 'Medium',
        completed INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error('Failed to init database:', error);
    throw error;
  }
}

export async function getTasks(): Promise<Task[]> {
  if (Platform.OS === 'web') {
    return getWebTasks();
  }

  try {
    const rows = await db.getAllAsync('SELECT * FROM tasks ORDER BY createdAt DESC');
    return rows.map((row: any) => ({
      ...row,
      completed: row.completed === 1,
    }));
  } catch (error) {
    console.error('Failed to get tasks:', error);
    return [];
  }
}

export async function addTask(
  title: string,
  description: string,
  priority: Priority
): Promise<void> {
  const createdAt = new Date().toISOString();

  if (Platform.OS === 'web') {
    const tasks = getWebTasks();
    initWebId(tasks);
    tasks.unshift({
      id: nextWebId++,
      title,
      description,
      priority,
      completed: false,
      createdAt,
    });
    saveWebTasks(tasks);
    return;
  }

  try {
    await db.runAsync(
      'INSERT INTO tasks (title, description, priority, completed, createdAt) VALUES (?, ?, ?, 0, ?)',
      [title, description, priority, createdAt]
    );
  } catch (error) {
    console.error('Failed to add task:', error);
    throw error;
  }
}

export async function toggleTask(id: number): Promise<void> {
  if (Platform.OS === 'web') {
    const tasks = getWebTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveWebTasks(tasks);
    }
    return;
  }

  try {
    await db.runAsync(
      'UPDATE tasks SET completed = CASE WHEN completed = 1 THEN 0 ELSE 1 END WHERE id = ?',
      [id]
    );
  } catch (error) {
    console.error('Failed to toggle task:', error);
    throw error;
  }
}

export async function deleteTask(id: number): Promise<void> {
  if (Platform.OS === 'web') {
    const tasks = getWebTasks().filter(t => t.id !== id);
    saveWebTasks(tasks);
    return;
  }

  try {
    await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
}
