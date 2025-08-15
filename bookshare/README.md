# BookShare - Angular Application

A modern book sharing platform built with Angular and Firebase, allowing users to discover, share, and connect through books.

## Features

- 🔐 **User Authentication** - Secure login and registration with Firebase Auth
- 📚 **Book Catalog** - Browse and search through a collection of books
- ➕ **Add Books** - Users can add new books to the catalog
- ❤️ **Like System** - Like and unlike books
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🛡️ **Route Guards** - Protected routes for authenticated users

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Firebase account

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookshare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase configuration

4. **Configure Firebase**
   - Create a file `src/environments/environment.ts`
   - Add your Firebase configuration:
   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: "your-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789",
       appId: "your-app-id"
     }
   };
   ```

5. **Update App Module**
   - Replace the placeholder Firebase config in `src/app/app.module.ts` with your actual configuration

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── auth/                 # Authentication components
│   │   ├── login/           # Login component
│   │   └── register/        # Register component
│   ├── catalog/             # Book catalog component
│   ├── core/                # Core services and guards
│   │   ├── guards/          # Route guards
│   │   └── services/        # Authentication service
│   ├── home/                # Home page component
│   └── shared/              # Shared interfaces
│       └── interfaces/      # TypeScript interfaces
├── assets/                  # Static assets
└── environments/            # Environment configurations
```

## Key Components

### Authentication
- **LoginComponent**: Handles user login with form validation
- **RegisterComponent**: Handles user registration with password confirmation
- **AuthService**: Manages Firebase authentication
- **AuthGuard**: Protects routes for authenticated users
- **GuestGuard**: Protects routes for non-authenticated users

### Catalog
- **CatalogComponent**: Displays books in a grid layout with search functionality
- **Book Interface**: Defines the structure of book objects
- **Add Book Modal**: Form for adding new books to the catalog

### Navigation
- **AppComponent**: Main navigation with user authentication status
- **Responsive Design**: Mobile-friendly navigation

## Technologies Used

- **Angular 20** - Frontend framework
- **Firebase** - Backend as a Service (Authentication & Firestore)
- **Angular Fire** - Firebase integration for Angular
- **Reactive Forms** - Form handling and validation
- **CSS3** - Modern styling with gradients and animations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
