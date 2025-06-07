# Project Documentation

## Source Code Structure

The `src` directory contains all the source code for the project, organized into two main sections: JavaScript (`js`) and SCSS styles (`scss`).

### JavaScript Structure (`src/js/`)

The JavaScript code is organized into the following structure:

```
src/js/
├── components/       # Reusable UI components
├── utils/           # Utility functions and helpers
└── theme.js         # Main theme initialization
```

#### Main Components and Functions

- **theme.js**: Main entry point that initializes all front-end features when the DOM is loaded. It includes:
  - Scroll effects initialization
  - Science accordion functionality
  - Ravekit product component initialization
  - Smooth scrolling to Ravekit section
  - PDF popup modal setup
  - Free shipping sticky banner functionality

##### Components
- `pdf-popup`: Handles PDF viewer modal functionality
- `scienceAccordion`: Manages expandable/collapsible science sections
- `RavekitProduct`: Class component for Ravekit product functionality

##### Utils
- `smoothScrollToRavekit`: Handles smooth scrolling to Ravekit sections
- `scrollEffects`: Manages scroll-based animations and effects
- `freeShippingSticky`: Controls the sticky behavior of free shipping banner

### SCSS Structure (`src/scss/`)

The SCSS styles are organized following the 7-1 pattern architecture:

```
src/scss/
├── abstracts/       # Variables, mixins, functions
├── base/           # Base styles, reset/normalize
├── components/     # Component-specific styles
├── layout/         # Layout-related styles
├── templates/      # Template-specific styles
├── themes/         # Theme-specific styles
└── main.scss       # Main SCSS file that imports all other files
```

#### Main SCSS Files and Purpose

- **main.scss**: Central file that imports all other SCSS modules
- **base/**: Contains reset styles and base HTML element styles
- **components/**: Styles for individual UI components
- **layout/**: Styles for major layout sections (header, footer, grid system)
- **themes/**: Theme-specific styles and variations
- **templates/**: Page-specific styles
- **abstracts/**: Reusable SCSS variables, mixins, and functions

## Build Process

The project uses a build system (build.js) to compile and process the source files. The build process handles:
- SCSS compilation
- JavaScript bundling
- Asset optimization
- Template processing

## Development

The project follows a component-based architecture with clear separation between styles and functionality. All new features should be added following the existing structure:
- JavaScript components in `src/js/components/`
- Utility functions in `src/js/utils/`
- Styles in their corresponding SCSS directories based on their purpose 