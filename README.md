# CPSC 349 - React + Vite Web Application

A basic web development project built with React 19 and Vite for CPSC 349 coursework. This project demonstrates contemporary frontend development practices with fast refresh capabilities and optimized build tooling.

## Features

- **React 19** - Latest React with modern hooks and features
- **Vite** - Lightning-fast build tool and dev server with Hot Module Replacement (HMR)
- **TypeScript Support** - Full TypeScript support for type-safe development
- **ESLint** - Code quality and best practices enforcement
- **Modern Tooling** - Optimized development and production builds

## Tech Stack

- **React**: ^19.2.4
- **React DOM**: ^19.2.4
- **Vite**: ^8.0.1
- **TypeScript**: ^19.2.x
- **ESLint**: ^9.39.4
- **@vitejs/plugin-react**: ^6.0.1

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone https://github.com/ndulkis/CPSC-349.git
cd CPSC-349
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

### Development Server
Start the development server with hot module replacement:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
Create an optimized production build:
```bash
npm run build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

### Lint Code
Check for code quality issues and style violations:
```bash
npm run lint
```

## Project Structure

```
CPSC-349/
├── src/
│   ├── componets/
│   ├── assets/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── constants.js     # Constants
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── eslint.config.js     # ESLint configuration
```

## Configuration

### Vite Plugins
Two official React plugins are available:
- `@vitejs/plugin-react` - Uses Oxc (default)
- `@vitejs/plugin-react-swc` - Uses SWC for faster compilation

### ESLint
The project includes ESLint configuration for React development. For production applications, consider enabling TypeScript with type-aware lint rules.

### React Compiler
The React Compiler is not enabled by default due to performance impact. See [React Compiler documentation](https://react.dev/learn/react-compiler/installation) to enable it.

## Learning Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [ESLint Documentation](https://eslint.org)

## Author

Created by [ndulkis](https://github.com/ndulkis) for CPSC 349

## License

This project is part of academic coursework for CPSC 349.
