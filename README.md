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

## Reflection

### What was most challenging about cross-platform development?

One of the most challenging parts of cross-platform development for me was working with TypeScript. I know it is majorly preferred over JavaScript, but I am much more comfortable using JavaScript and React. Adjusting to the syntax and structure of TypeScript slowed me down at first because I had to think more about types and how everything was defined. It took extra time to fix errors. Over time, I got more comfortable with it and started to see how it can help prevent mistakes and keep code organized. Even though it was challenging, it was still helpful getting to use typescript more during this project.

### How did you handle the time constraint?

The time constraint was difficult because my day job is very demanding, which made it harder to dedicate consistent time to the project. To manage that, I focused on being efficient with the time I did have, even thought today is Thursday. I work throughout the night to complete this, and well into the morning. I had ashort work day so lucky I was able to finsih this up right now. I also used the base example, from the 1.5 assignment setup to speed up development, which helped me avoid building everything from scratch. That decision made me have a few extra files, but it allowed me to stay on track and complete this as quickly as I could.

### What would you improve with more time?

With more time, I would improve the file structure and organization of the project. I know there are some extra files included, but when I tried removing them, certain parts of the app would break. Because of the time limit, I decided to leave everything as is. If I had more time, I would clean up unused files and organize everything in a more clear and maintainable way. Overall clean file structure is very important.

### What surprised you about the development process?

I was surprised by how much I remembered about setting up local storage. Backend related work is not my favorite and not something I practice often, but I still remembered a lot from past experience. It came back more naturally than I expected, which made that part of the project easier. That was a good reminder that even skills I do not use often are still in my head and with some review I can still use them when needed.