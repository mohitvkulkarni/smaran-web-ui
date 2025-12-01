# Smaran Foundation Website

A modern, responsive website for Smaran Foundation built with React, TypeScript, Material-UI, and SCSS modules.

## Features

- **Modern Design**: Clean, professional design with smooth animations and transitions
- **Fully Responsive**: Optimized for all device sizes from mobile to desktop
- **Material-UI Components**: Consistent design system with Material-UI
- **SCSS Modules**: Scoped styling with SCSS modules for maintainable CSS
- **TypeScript**: Type-safe development with TypeScript
- **Blog System**: Dynamic blog posts with modal viewing
- **Team Showcase**: Meet the team section with detailed member profiles
- **Contact Integration**: Direct email integration for contact forms
- **Accessibility**: WCAG compliant design with proper semantic HTML

## Tech Stack

- **Frontend**: React 18, TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Styling**: SCSS Modules
- **Build Tool**: Vite
- **Icons**: Material-UI Icons
- **Fonts**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd smaran-foundation
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/           # React components
│   ├── Header/          # Navigation header
│   ├── Hero/            # Hero section
│   ├── Welcome/         # Welcome section
│   ├── MissionVision/   # Mission & Vision
│   ├── Pillars/         # Core principles
│   ├── Resources/       # Blog resources
│   ├── BlogCard/        # Individual blog cards
│   ├── BlogModal/       # Blog post modal
│   ├── About/           # Team section
│   ├── Contact/         # Contact section
│   ├── Footer/          # Footer
│   └── PolicyModal/     # Privacy/Terms modal
├── styles/              # Global styles
├── constants.ts         # App constants and data
├── types.ts            # TypeScript type definitions
├── theme.ts            # Material-UI theme
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## Content Management

### Adding Blog Posts

Blog posts are managed in `src/constants.ts`. To add a new blog post:

1. Add a new entry to the `BLOGS` array
2. Include the required fields: title, author, date, readTime, image, content
3. Add the corresponding image to `public/assets/`

### Updating Team Members

Team information is stored in `src/constants.ts` in the `TEAM` array. Update member details and add profile images to `public/assets/`.

### Modifying Core Principles

The six core principles are defined in the `PILLARS` array in `src/constants.ts`.

## Customization

### Theme Colors

The color scheme can be modified in `src/theme.ts`:

- Primary: Deep teal blue (#2E5266)
- Secondary: Warm orange (#F4A261)
- Background: Light gray (#FAFAFA)

### Typography

The website uses the Inter font family. You can change this in `src/theme.ts` and update the Google Fonts link in `index.html`.

### Animations

Scroll-triggered animations are implemented using Intersection Observer API. Animation styles are defined in `src/styles/global.scss`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images and assets
- Code splitting with React lazy loading
- Efficient re-renders with React hooks
- Minimal bundle size with tree shaking

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Smaran Foundation. All rights reserved.

## Contact

For questions or support, contact: sanjana@smaranfoundation.org
