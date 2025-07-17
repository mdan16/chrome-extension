# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a **Redmine Time Entry Helper** Chrome extension built with React, TypeScript, and Vite. It provides a Chrome side panel interface for managing time entries in Redmine projects.

## Common Development Commands

### Development and Build
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production (runs tsc -b && vite build)
npm run lint         # Run ESLint for code quality
npm run preview      # Preview production build
```

### Testing
No test framework is currently configured. Consider adding Jest or Vitest for testing.

## Architecture Overview

### Chrome Extension Structure
- **Manifest Version**: 3 (modern Chrome extension)
- **Main Interface**: Side panel (not popup) - renders React app
- **Content Script**: `src/content.ts` (minimal implementation)
- **No Background Script**: Uses content scripts only

### React Application Structure
- **Entry Point**: `src/main.tsx` → `App.tsx`
- **State Management**: React hooks (useState, useEffect)
- **Storage**: Chrome storage API for settings persistence
- **API Integration**: Direct Redmine API calls from `utils/redmine.ts`

### Key Components
- `App.tsx`: Main application with state management
- `Settings/Settings.tsx`: Redmine URL and API key configuration
- `Tickets/TicketList.tsx`: Displays fetched Redmine tickets
- `utils/redmine.ts`: API utilities for ticket fetching and time entry creation

### TypeScript Types
All Redmine data structures are defined in `types/redmine.ts`:
- `RedmineTicket`: Ticket structure with project, status, assignment
- `RedmineTimeEntry`: Time entry creation payload
- `RedmineSettings`: User configuration structure

## Build System Details

### Technology Stack
- **React 18.2.0** with TypeScript
- **Vite** as build tool with `@crxjs/vite-plugin` for Chrome extension support
- **Tailwind CSS** for styling (with preflight disabled)
- **ESLint** with React and TypeScript rules

### Build Process
1. TypeScript compilation (`tsc -b`)
2. Vite bundles React app and Chrome extension assets
3. CRX plugin handles manifest and packaging for Chrome extension

### Output Structure (`/dist`)
- `index.html`: Side panel HTML
- `manifest.json`: Chrome extension manifest
- `src/content.ts.js`: Compiled content script
- `assets/`: Bundled JavaScript and CSS

## Development Notes

### Current Implementation Status
- ✅ Basic project structure and build system
- ✅ Settings component with Chrome storage integration
- ✅ Redmine API integration for ticket fetching
- ✅ Ticket list display component
- ❌ Time entry form implementation (TODO in App.tsx)
- ❌ Content script functionality (minimal)

### Chrome Extension Permissions
- `sidePanel`: Side panel functionality
- `storage`: Settings persistence
- `activeTab`: Current tab access
- `scripting`: Content script injection

### API Integration Pattern
The extension uses direct API calls to Redmine from the React components. API utilities in `utils/redmine.ts` handle:
- `fetchTickets()`: Retrieves open tickets
- `createTimeEntry()`: Creates time entries

### Styling Approach
Uses Tailwind CSS with custom configuration. The `index.css` includes Tailwind imports and the config disables preflight to avoid conflicts with Chrome's default styles.