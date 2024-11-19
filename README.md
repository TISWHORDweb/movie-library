# Movie Explorer App

A modern web application for exploring movies, managing favorites, and discovering new content built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Movie Discovery**: Browse and search through a vast collection of movies
- **Detailed Movie Information**: View comprehensive details about movies including cast, ratings, and release dates
- **Favorites System**: Save and manage your favorite movies with persistent storage
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Server-Side Rendering**: Optimized performance with Next.js SSR capabilities
- **Type Safety**: Full TypeScript implementation for robust development

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- A TMDB API key (sign up at https://www.themoviedb.org/documentation/api)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/TISWHORDweb/movie-library.git
cd movie-explorer-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_API_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

## 🚀 Running the Application

**Development Mode**
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

**Production Build**
```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
movie-explorer-app/
├── app/                    # Next.js 14 app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── [id]/              # Dynamic movie details routes
├── components/            # Reusable components
├── contexts/              # React contexts
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and API helpers
```

## 🎯 Architecture Decisions

### Frontend Framework
- **Next.js 14**: Chosen for its powerful SSR capabilities, file-based routing, and optimized performance
- **TypeScript**: Ensures type safety and better developer experience
- **Tailwind CSS**: Provides utility-first CSS for rapid UI development

### State Management
- **React Context**: Used for managing global state (favorites)
- **Local Storage**: Persists user favorites across sessions
- **Server State**: Managed through Next.js data fetching patterns

### Component Architecture
- **Client/Server Components**: Careful separation to optimize performance
- **Atomic Design**: Components are organized following atomic design principles
- **Hydration Safety**: Implementation of mounted checks and client-only renders where necessary

### Data Fetching
- **TMDB API**: External movie data source
- **Typed API Responses**: Full type safety for API interactions
- **Error Handling**: Comprehensive error boundaries and loading states

## 🔑 Key Components

### FavoritesContext
```typescript
// Manages global favorites state with hydration-safe implementation
interface FavoritesContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}
```

### MovieDetails Component
```typescript
// Displays detailed movie information with client-side interactions
interface MovieDetailsProps {
  params: { id: string };
}
```

## 🔒 Type Safety

The project uses TypeScript throughout with comprehensive type definitions:

```typescript
// Example Movie Type
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}

// Extended MovieDetails Type
interface MovieDetails extends Movie {
  genres: Genre[];
  cast: CastMember[];
  runtime: number;
}
```

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Built on top of Tailwind with consistent styling
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark Mode**: Support for system-level dark mode preferences

## 🔄 State Management Flow

1. **Global State (Favorites)**
   - Managed through React Context
   - Persisted in localStorage
   - Hydration-safe implementation

2. **UI State**
   - Local component state for UI interactions
   - Loading states for data fetching
   - Error boundaries for error handling

3. **Server State**
   - Movie data fetched from TMDB API
   - Cached according to Next.js conventions
   - Type-safe API responses

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- Mobile: 0-640px
- Tablet: 641-1024px
- Desktop: 1025px+

## 🔍 SEO Optimization

- Proper meta tags for each page
- Dynamic OpenGraph images
- Semantic HTML structure
- Next.js automatic optimization

## 🧪 Testing

To run tests:
```bash
npm test           # Run unit tests
npm run e2e       # Run end-to-end tests
```

## 📈 Performance Considerations

- Image optimization through Next.js Image component
- Client-side state hydration strategies
- Lazy loading of non-critical components
- Proper caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🙏 Acknowledgments

- TMDB API for providing movie data
- Next.js team for the amazing framework
- All contributors who have helped improve the project