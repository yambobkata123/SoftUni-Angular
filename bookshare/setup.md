# BookShare Setup Guide

## Quick Start (Mock Version - No Firebase Required)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Application**
   ```bash
   ng serve
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:4200`
   - Register/Login with any email and password
   - Browse and add books

## Features Available (Mock Version)

- ✅ User registration and login (stored in localStorage)
- ✅ Protected routes (catalog requires authentication)
- ✅ Book catalog with search
- ✅ Add new books (stored in memory)
- ✅ Like/unlike books
- ✅ Responsive design
- ✅ Modern UI with animations

## Firebase Setup (Optional - For Production)

If you want to use Firebase for real data persistence:

1. **Install Firebase Dependencies**
   ```bash
   npm install @angular/fire@17.0.1 firebase@10.7.0
   ```

2. **Configure Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config

3. **Update Environment Files**
   - Edit `src/environments/environment.ts`
   - Replace the placeholder values with your Firebase config

4. **Update Services**
   - Replace mock services with Firebase implementations

## Firebase Setup Details

### 1. Create Firebase Project
- Visit [Firebase Console](https://console.firebase.google.com/)
- Click "Add project"
- Enter project name (e.g., "bookshare-app")
- Follow the setup wizard

### 2. Enable Authentication
- In Firebase Console, go to "Authentication"
- Click "Get started"
- Go to "Sign-in method" tab
- Enable "Email/Password" provider

### 3. Create Firestore Database
- In Firebase Console, go to "Firestore Database"
- Click "Create database"
- Choose "Start in test mode" (for development)
- Select a location close to your users

### 4. Get Configuration
- In Firebase Console, go to Project Settings (gear icon)
- Scroll down to "Your apps"
- Click "Add app" → "Web"
- Register your app and copy the config

### 5. Update Environment Files
Replace the values in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
  }
};
```

## Features Available

- ✅ User registration and login
- ✅ Protected routes (catalog requires authentication)
- ✅ Book catalog with search
- ✅ Add new books
- ✅ Like/unlike books
- ✅ Responsive design
- ✅ Modern UI with animations

## Troubleshooting

### Common Issues

1. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

2. **Authentication not working (Mock version)**
   - Check browser console for errors
   - Clear localStorage and try again

3. **Firebase setup issues (Optional)**
   - Run: `npm install @angular/fire@17.0.1 firebase@10.7.0`
   - Check Firebase config in environment files
   - Ensure Email/Password auth is enabled in Firebase Console

## Next Steps

After setup, you can:
- Add more book features (reviews, ratings)
- Implement user profiles
- Add book categories
- Create admin panel
- Add image upload functionality 