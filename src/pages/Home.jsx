import React from 'react'
import Button from '../components/Button'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Recipe Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and create amazing recipes with the help of AI. 
            Get personalized recipe suggestions based on your ingredients and preferences.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Get Started
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-700">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="primary" className="w-full">
                    Generate Recipe
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Browse Recipes
                  </Button>
                  <Button variant="success" className="w-full">
                    Save Recipe
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-700">Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    AI-powered recipe generation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Ingredient-based suggestions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Dietary preference filtering
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Recipe saving and sharing
                  </li>
                </ul>
              </div>
            </div>

            {/* New Ingredient Input Feature */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                🆕 New Feature: Smart Ingredient Input
              </h3>
              <p className="text-blue-700 mb-4">
                Try our new ingredient input component with autocomplete and tag-based interface. 
                Perfect for quickly adding ingredients to your recipes!
              </p>
              <div className="flex space-x-3">
                <Button variant="primary" size="sm">
                  Try Ingredient Input
                </Button>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 