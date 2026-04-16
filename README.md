# Task Manager App

A simple task manager app built for my CDA Module 1 project.

It lets users create tasks, mark them as done, delete them, and switch between dark mode and light mode.

## Features

- Create tasks with:
  - Title
  - Description
  - Priority level: High, Medium, Low
- Mark tasks as complete or incomplete
- Delete tasks with a confirmation prompt
- Color code tasks based on priority
- Search tasks by title
- Filter tasks by status:
  - All
  - Active
  - Done
- View task statistics:
  - Total
  - Done
  - Pending
- Toggle between dark mode and light mode
- Save user name and theme preference
- Works on both mobile and web

## How to Run

Make sure you have **Node.js** installed first.

### Install dependencies

```bash
npm install
```

### Start the Expo development server

```bash
npx expo start
```

Then:

- Press `w` to open it in the browser
- Or scan the QR code with **Expo Go** on your phone

### Run on web directly

```bash
npx expo start --web
```

### Run on Android

```bash
npx expo start --android
```

## Tech Stack

- **Expo** (SDK 54)
- **TypeScript**
- **NativeWind** (Tailwind CSS for React Native)
- **Expo Router** (file-based routing)
- **SQLite** for task storage on mobile
- **localStorage** as a fallback for task storage on web
- **Expo SecureStore** for settings on mobile
- **localStorage** as a fallback for settings on web

## Screens

### Home

Shows:

- All tasks
- Task statistics
- Search
- Filter options

### Add Task

A form used to create a new task.

### Settings

Lets the user:

- Change their name
- Change the app theme

## Enhanced Feature

### Dark Mode / Light Mode

There is a theme toggle button in the top right corner of every screen.

The selected theme is saved, so it stays the same when the user comes back.

## Platforms Tested

- Web (Chrome)
- iOS

## Known Issues

- **SQLite** does not work on web, so the app uses **localStorage** instead
- **SecureStore** does not work on web, so the app uses **localStorage** instead

These fallbacks work well and keep the app functional on web.

## Project Structure

```text
app/          # Screens using Expo Router
components/   # Reusable UI components
context/      # Theme context
services/     # Database and settings helpers
types/        # TypeScript types
styles/       # Global CSS
```

## Summary

This project is a simple but functional task manager app built with Expo and TypeScript. It supports task creation, completion tracking, filtering, searching, theme switching, and cross-platform storage support for both mobile and web.
