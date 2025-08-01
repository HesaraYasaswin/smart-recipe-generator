# Smart Recipe Generator

A modern, AI-powered web application that transforms leftover ingredients into delicious recipes. Built with React, Vite, and OpenAI API, deployed on Vercel.



##  Features

###  Core Functionality
- **AI-Powered Recipe Generation**: Uses OpenAI GPT-3.5-turbo to create unique recipes from available ingredients
- **Smart Ingredient Input**: Tag-based input system with autocomplete and ingredient suggestions
- **Dietary Preferences**: Support for vegan, vegetarian, gluten-free, and dairy-free diets
- **Portion Scaling**: Adjustable servings (1-8 people)
- **Waste Minimization**: AI prioritizes recipes that use most/all provided ingredients

###  User Experience
- **Beautiful Recipe Cards**: Modern, responsive design with clear ingredient highlighting
- **Ingredient Tracking**: Visual indicators showing which ingredients are used in each recipe
- **Smart Suggestions**: AI-powered ingredient recommendations based on what you've added
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

###  Technical Features
- **Real-time AI Processing**: Instant recipe generation with detailed instructions
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Smooth loading animations and progress indicators
- **CORS Support**: Properly configured for cross-origin requests

##  Tech Stack

### Frontend
- **React 19**: Latest React with modern features and hooks
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Beautiful, customizable icons
- **React Router**: Client-side routing

### Backend
- **Vercel Serverless Functions**: API endpoints for AI integration
- **OpenAI API**: GPT-3.5-turbo for recipe generation
- **Node.js**: Runtime environment for serverless functions

### Development Tools
- **Cursor**: AI-assisted development environment
- **PostCSS**: CSS processing with autoprefixer
- **ESLint**: Code linting and formatting

## 📁 Project Structure

```
smart-recipe-generator/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx      # Button component with variants
│   │   ├── IngredientInput.jsx # Tag-based ingredient input
│   │   ├── RecipeCard.jsx  # Recipe display component
│   │   └── index.js        # Component exports
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page with hero section
│   │   ├── IngredientDemo.jsx # Main recipe generator
│   │   └── index.js        # Page exports
│   ├── utils/              # Utility functions
│   │   ├── generateRecipes.js # API integration
│   │   └── recipeUtils.js  # Recipe processing utilities
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── api/                    # Vercel serverless functions
│   └── generate-recipes.js # OpenAI API integration
├── public/                 # Public assets
├── vercel.json            # Vercel deployment configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

##  Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **OpenAI API key** (for recipe generation)
- **Vercel account** (for deployment)



##  Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add `OPENAI_API_KEY` with your API key
   - Set for Production, Preview, and Development environments

4. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

##  Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required for recipe generation)


##  Styling

This project uses **TailwindCSS** for styling with:
- Custom color palette optimized for food/cooking themes
- Responsive design patterns
- Modern UI components
- Smooth animations and transitions


##  Security

- API keys stored securely in environment variables
- Serverless functions keep sensitive data server-side
- No API keys exposed in client-side code
- CORS properly configured for production



---

**END**
