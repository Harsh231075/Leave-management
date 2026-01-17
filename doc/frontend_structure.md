# Frontend Directory Structure — Leave Management System

This document explains the structure and purpose of the frontend (`client`) directory in the Leave Management System.  
The frontend is built using **React + TypeScript**, with a modular and scalable folder organization.

---

## Directory: `/client`

### Core Structure

```txt
src/
├── components/     # Reusable UI components (buttons, cards, forms, headers)
├── pages/          # Full-page components used for routing (Login, Dashboard, Profile, etc.)
├── hooks/          # Custom React hooks for shared logic (e.g., useAuth, useFetch)
├── services/       # API service layer handling HTTP requests to the backend
├── store/          # Global state management (e.g., Zustand or Context-based stores)
├── types/          # TypeScript interfaces and type definitions for type safety
├── lib/            # Utility functions and shared helper modules
├── data/           # Static data, constants, and configuration values
├── App.tsx         # Root application component (routing and layout setup)
└── main.tsx        # Application entry point; mounts the React app to the DOM

vite.config.ts      # Vite configuration for development and production builds
tailwind.config.ts  # Tailwind CSS configuration and theme customization
package.json        # Project dependencies, scripts, and metadata
tsconfig.json       # TypeScript compiler configuration
