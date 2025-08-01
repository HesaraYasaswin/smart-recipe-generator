import React, { useState } from 'react'
import IngredientInput from '../components/IngredientInput'
import Button from '../components/Button'
import { generateRecipes } from '../utils/generateRecipes'
import RecipeCard from '../components/RecipeCard'
import ingredientsBackground from "../assets/ingredients-background.jpg"; // adjust path if needed


const DIETARY_OPTIONS = [
  { value: '', label: 'Any Diet' },
  { value: 'vegan', label: '🌱 Vegan' },
  { value: 'vegetarian', label: '🥬 Vegetarian' },
  { value: 'gluten-free', label: '🌾 Gluten-Free' },
  { value: 'dairy-free', label: '🥛 Dairy-Free' },
]

const IngredientDemo = ({ navigateTo }) => {
  const [ingredients, setIngredients] = useState([])
  const [recipeName, setRecipeName] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dietaryPreference, setDietaryPreference] = useState('')
  const [servings, setServings] = useState(2)
  const [showSuggestionsSidebar, setShowSuggestionsSidebar] = useState(false)
  const [suggestedIngredients, setSuggestedIngredients] = useState([])

  const handleIngredientsChange = (newIngredients) => {
    setIngredients(newIngredients)
    
    if (newIngredients.length > 0 && recipes.length === 0) {
      setShowSuggestionsSidebar(true)
      const relatedSuggestions = getRelatedSuggestions(newIngredients)
      setSuggestedIngredients(relatedSuggestions)
    } else {
      setShowSuggestionsSidebar(false)
    }
  }

  const getRelatedSuggestions = (currentIngredients) => {
    const ingredientCategories = {
      proteins: ['chicken', 'beef', 'pork', 'tofu', 'tempeh', 'fish', 'shrimp'],
      vegetables: ['onion', 'garlic', 'tomato', 'potato', 'carrot', 'bell pepper', 'spinach'],
      carbs: ['rice', 'pasta', 'bread', 'quinoa', 'couscous'],
      dairy: ['milk', 'cheese', 'yogurt', 'cream', 'butter'],
      spices: ['salt', 'pepper', 'cumin', 'paprika', 'oregano', 'basil']
    }
    
    const suggestions = new Set()
    
    currentIngredients.forEach(ing => {
      Object.entries(ingredientCategories).forEach(([category, items]) => {
        if (items.some(item => ing.toLowerCase().includes(item))) {
          items
            .filter(item => !currentIngredients.some(ci => ci.toLowerCase().includes(item)))
            .slice(0, 3)
            .forEach(item => suggestions.add(item))
        }
      })
    })
    
    return Array.from(suggestions).slice(0, 8)
  }

  const addSuggestedIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
      const newIngredients = [...ingredients, ingredient]
      setIngredients(newIngredients)
      const updatedSuggestions = suggestedIngredients.filter(i => i !== ingredient)
      setSuggestedIngredients(updatedSuggestions)
    }
  }

  const handleClearAll = () => {
    setIngredients([])
    setRecipes([])
    setError('')
    setShowSuggestionsSidebar(false)
  }

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Please add some ingredients first!')
      return
    }
    setLoading(true)
    setError('')
    setRecipes([])
    try {
      const result = await generateRecipes(ingredients, dietaryPreference, servings)
      setRecipes(result)
      setShowSuggestionsSidebar(false)
    } catch (err) {
      setError('Failed to generate recipes. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 bg-animated ingredients relative"
      style={{
        backgroundImage: `url(${ingredientsBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="floating-particles"></div>

      {/* Header with Back Button - Modified */}
      <div className="bg-transparent">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateTo('home')}
              className="text-white hover:text-orange-300 transition-colors flex items-center"
            >
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-lg font-medium">Back to Home</span>
            </button>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-white/80">Powered by OpenAI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your existing code remains the same */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content area */}
          <div className="flex-1 max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                What's in your kitchen?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tell us what ingredients you have, and we'll create delicious recipes just for you.
              </p>
            </div>

            {/* Main Form Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Recipe Details */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="recipeName" className="block text-sm font-semibold text-gray-700 mb-3">
                      Recipe Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="recipeName"
                      value={recipeName}
                      onChange={(e) => setRecipeName(e.target.value)}
                      placeholder="e.g., My Special Pasta"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-lg"
                    />
                  </div>

                  <div>
                    <label htmlFor="servings" className="block text-sm font-semibold text-gray-700 mb-3">
                      Servings: <span className="text-orange-600 font-bold">{servings}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        id="servings"
                        min="1"
                        max="8"
                        value={servings}
                        onChange={(e) => setServings(parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #f97316 0%, #f97316 ${(servings - 1) * 14.28}%, #e5e7eb ${(servings - 1) * 14.28}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <span key={num} className={num === servings ? 'text-orange-600 font-bold' : ''}>
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="dietaryPreference" className="block text-sm font-semibold text-gray-700 mb-3">
                      Dietary Preference
                    </label>
                    <select
                      id="dietaryPreference"
                      value={dietaryPreference}
                      onChange={e => setDietaryPreference(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-lg"
                    >
                      {DIETARY_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column - Ingredients */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Your Ingredients
                  </label>
                  <IngredientInput
                    ingredients={ingredients}
                    onIngredientsChange={handleIngredientsChange}
                    placeholder="Start typing ingredients..."
                    className="mb-4"
                  />
                  
                  {/* Ingredient Summary */}
                  {ingredients.length > 0 && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                      <h3 className="font-semibold text-orange-900 mb-2 flex items-center">
                        <span className="mr-2">📝</span>
                        Recipe Summary
                      </h3>
                      <p className="text-sm text-orange-800">
                        <span className="font-medium">{ingredients.length}</span> ingredients • 
                        <span className="font-medium"> {servings}</span> servings
                        {dietaryPreference && ` • ${dietaryPreference.replace('-', ' ')}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  onClick={handleGenerateRecipe}
                  disabled={ingredients.length === 0 || loading}
                  className="flex-1 py-4 text-lg font-semibold rounded-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating your recipe...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">✨</span>
                      Generate Recipe
                    </div>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleClearAll}
                  disabled={ingredients.length === 0 && recipes.length === 0}
                  className="flex-1 py-4 text-lg font-semibold rounded-xl"
                >
                  Clear All
                </Button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span className="text-red-700 font-medium">{error}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Generated Recipes */}
            {recipes.length > 0 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Your Recipe</h3>
                  <p className="text-gray-600">Freshly created just for you</p>
                </div>
                {recipes
                 .filter(recipe => recipe.ingredients?.length > 0 && recipe.instructions?.length > 0)
                 .map((recipe, idx) => (
                   <RecipeCard
                    key={idx}
                    recipe={recipe}
                    inputIngredients={ingredients}
                   />
                ))}
              </div>
            )}

            {/* Tips Section */}
            <div className="mt-12 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">💡 Pro Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Getting Started</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Type ingredients to see smart suggestions</li>
                    <li>• Press Enter to add ingredients quickly</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Customization</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Adjust servings for perfect portions</li>
                    <li>• Choose dietary preferences for tailored recipes</li>
                    <li>• Add a recipe name for personalization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Suggestions Sidebar */}
          {showSuggestionsSidebar && suggestedIngredients.length > 0 && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-blue-900">
                    Suggested Ingredients
                  </h3>
                  <button 
                    onClick={() => setShowSuggestionsSidebar(false)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-sm text-blue-700 mb-4">
                  Based on what you've added, these ingredients might work well:
                </p>
                
                <div className="space-y-3">
                  {suggestedIngredients.map((ingredient, index) => (
                    <button
                      key={index}
                      onClick={() => addSuggestedIngredient(ingredient)}
                      className="w-full px-4 py-2 bg-white text-blue-800 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors flex items-center justify-between"
                    >
                      <span>{ingredient}</span>
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-blue-200">
                  <p className="text-xs text-blue-600">
                    Tip: Click on an ingredient to add it to your list
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default IngredientDemo