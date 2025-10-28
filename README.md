# Fake User Profiles - Next.js Demo

A React application built with Next.js and TypeScript that displays randomly generated user profiles by fetching data from external APIs with fallback support.

## Features

- **50 Fake User Profiles**: Fetched from [fakerapi.it](https://fakerapi.it) with fallback to [@faker-js/faker](https://fakerjs.dev/)
- **User Grid Display**: Responsive grid layout showing user cards with avatar, name, job title, company, and location
- **Sort by Name**: Toggle between A-Z and Z-A sorting
- **Filter by Location**: Dropdown filter to show users from specific locations
- **Individual Profile Pages**: Click on any user card to view their detailed profile
- **Scrollable Interface**: Smooth scrolling through the user list
- **Responsive Design**: Works on all screen sizes
- **Resilient Fallback**: Automatically uses local data generation if API is unavailable
- **User Notifications**: Clear notification when using fallback data source

## API Integration

This application integrates with the following external APIs:

### Primary Data Source
- **[fakerapi.it](https://fakerapi.it)** - Fetches person data from `/api/v1/persons` endpoint
  - Retrieves 50 random person profiles
  - Provides: name, email, phone, address, and location data
  - No authentication required

### Avatar Generation
- **[DiceBear API](https://api.dicebear.com)** - Generates user avatars
  - Creates unique avatar images based on user ID
  - Style: Avataaars
  - URL format: `https://api.dicebear.com/7.x/avataaars/svg?seed={id}`

### Fallback Mechanism
If the fakerapi.it API is unavailable or returns an error:
- Application automatically falls back to local [@faker-js/faker](https://fakerjs.dev/) library
- Generates 50 user profiles locally using the same data structure
- Displays a dismissable notification banner informing users about the fallback
- No interruption to user experience - all features remain functional

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **fakerapi.it API** - Primary data source for fake user profiles
- **DiceBear API** - Avatar generation service
- **Faker.js** - Fallback library for local data generation
- **React Context API** - Global state management

### Prerequisites

- Node.js 18+ installed
- npm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Pyrem/ReactProject.git
cd ReactProject
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
ReactProject/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page with user grid
│   ├── globals.css         # Global styles
│   └── users/
│       └── [id]/
│           └── page.tsx    # Individual user profile page
├── components/
│   ├── Providers.tsx       # Context providers wrapper
│   └── UserCard.tsx        # User card component
├── contexts/
│   └── UserContext.tsx     # User data context
├── types/
│   └── user.ts             # User TypeScript interface
├── utils/
│   └── generateUsers.ts    # Faker.js user generation
└── package.json
```

## TypeScript Models

The application uses a well-defined `User` interface with the following properties:

- `id`: Unique identifier
- `avatar`: Profile picture URL
- `firstName`, `lastName`, `fullName`: Name information
- `email`, `phone`: Contact details
- `jobTitle`, `company`: Professional information
- `city`, `state`, `country`, `location`: Location data
- `bio`, `address`, `zipCode`: Additional details