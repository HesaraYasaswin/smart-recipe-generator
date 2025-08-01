import React, { useState } from 'react'
import IngredientInput from '../components/IngredientInput'
import Button from '../components/Button'
import { generateRecipes } from '../utils/generateRecipes'
import RecipeCard from '../components/RecipeCard'
import ingredientsBackground from "../assets/ingredients-background.jpg"; 


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
      proteins: ['chicken', 'beef', 'pork', 'lamb', 'turkey', 'duck', 'tofu', 'tempeh', 'fish', 'shrimp', 'salmon', 'tuna', 'cod', 'tilapia', 'eggs', 'bacon', 'ham', 'sausage', 'ground beef', 'chicken breast', 'chicken thighs', 'pork chops', 'steak', 'lobster', 'crab', 'mussels', 'clams', 'anchovies', 'sardines'],
      vegetables: ['onion', 'garlic', 'tomato', 'potato', 'carrot', 'bell pepper', 'spinach', 'lettuce', 'cucumber', 'zucchini', 'eggplant', 'broccoli', 'cauliflower', 'cabbage', 'kale', 'arugula', 'mushroom', 'asparagus', 'green beans', 'peas', 'corn', 'celery', 'leek', 'shallot', 'ginger', 'jalapeño', 'habanero', 'radish', 'turnip', 'parsnip', 'beetroot', 'sweet potato', 'butternut squash', 'acorn squash', 'pumpkin', 'artichoke', 'brussels sprouts', 'bok choy', 'watercress', 'endive', 'fennel', 'okra', 'chayote'],
      carbs: ['rice', 'pasta', 'bread', 'quinoa', 'couscous', 'noodles', 'ramen', 'udon', 'soba', 'orzo', 'penne', 'spaghetti', 'linguine', 'fettuccine', 'lasagna', 'macaroni', 'tortillas', 'pita bread', 'naan', 'baguette', 'sourdough', 'whole wheat bread', 'rye bread', 'potato', 'sweet potato', 'yams', 'plantains', 'polenta', 'grits', 'oatmeal', 'barley', 'farro', 'bulgur', 'millet', 'sorghum', 'amaranth', 'teff', 'wild rice', 'brown rice', 'jasmine rice', 'basmati rice', 'arborio rice'],
      dairy: ['milk', 'cheese', 'yogurt', 'cream', 'butter', 'heavy cream', 'half and half', 'sour cream', 'cream cheese', 'cottage cheese', 'ricotta', 'mozzarella', 'cheddar', 'parmesan', 'feta', 'goat cheese', 'blue cheese', 'gouda', 'brie', 'camembert', 'provolone', 'swiss cheese', 'monterey jack', 'pepper jack', 'colby', 'havarti', 'manchego', 'pecorino', 'asiago', 'fontina', 'gruyere', 'emmental', 'halloumi', 'paneer', 'kefir', 'buttermilk', 'evaporated milk', 'condensed milk'],
      spices: ['salt', 'pepper', 'cumin', 'paprika', 'oregano', 'basil', 'thyme', 'rosemary', 'sage', 'bay leaves', 'cinnamon', 'nutmeg', 'cloves', 'cardamom', 'coriander', 'turmeric', 'ginger', 'garlic powder', 'onion powder', 'cayenne pepper', 'red pepper flakes', 'chili powder', 'smoked paprika', 'saffron', 'vanilla', 'almond extract', 'lemon zest', 'lime zest', 'orange zest', 'dill', 'parsley', 'cilantro', 'mint', 'chives', 'tarragon', 'marjoram', 'allspice', 'star anise', 'fennel seeds', 'caraway seeds', 'mustard seeds', 'poppy seeds', 'sesame seeds', 'sumac', 'za\'atar', 'herbes de provence', 'italian seasoning', 'cajun seasoning', 'old bay seasoning', 'five spice powder', 'garam masala', 'curry powder', 'ras el hanout', 'berbere', 'dukkah'],
      fruits: ['apple', 'banana', 'orange', 'lemon', 'lime', 'grapefruit', 'strawberry', 'blueberry', 'raspberry', 'blackberry', 'cranberry', 'cherry', 'peach', 'nectarine', 'plum', 'apricot', 'pear', 'grape', 'pineapple', 'mango', 'papaya', 'kiwi', 'dragon fruit', 'passion fruit', 'fig', 'date', 'prune', 'raisin', 'currant', 'gooseberry', 'elderberry', 'mulberry', 'persimmon', 'pomegranate', 'guava', 'lychee', 'rambutan', 'durian', 'jackfruit', 'breadfruit', 'plantain', 'coconut', 'avocado', 'olive'],
      nuts: ['almond', 'walnut', 'pecan', 'cashew', 'pistachio', 'macadamia', 'hazelnut', 'pine nut', 'peanut', 'brazil nut', 'chestnut', 'pumpkin seed', 'sunflower seed', 'chia seed', 'flax seed', 'hemp seed', 'sesame seed', 'poppy seed', 'quinoa', 'amaranth'],
      oils: ['olive oil', 'vegetable oil', 'canola oil', 'coconut oil', 'avocado oil', 'sesame oil', 'peanut oil', 'sunflower oil', 'grapeseed oil', 'walnut oil', 'almond oil', 'truffle oil', 'chili oil', 'garlic oil', 'basil oil', 'lemon oil'],
      condiments: ['ketchup', 'mustard', 'mayonnaise', 'hot sauce', 'soy sauce', 'fish sauce', 'worcestershire sauce', 'balsamic vinegar', 'apple cider vinegar', 'red wine vinegar', 'white wine vinegar', 'rice vinegar', 'mirin', 'miso', 'tahini', 'hummus', 'pesto', 'salsa', 'guacamole', 'aioli', 'tzatziki', 'ranch dressing', 'blue cheese dressing', 'caesar dressing', 'vinaigrette', 'honey', 'maple syrup', 'agave nectar', 'molasses', 'jam', 'jelly', 'marmalade', 'chutney', 'relish', 'pickles', 'olives', 'capers', 'anchovies', 'sundried tomatoes', 'roasted red peppers']
    }
    
    const suggestions = new Set()
    
    currentIngredients.forEach(ing => {
      Object.entries(ingredientCategories).forEach(([category, items]) => {
        if (items.some(item => ing.toLowerCase().includes(item))) {
          items
            .filter(item => !currentIngredients.some(ci => ci.toLowerCase().includes(item)))
            .slice(0, 4)
            .forEach(item => suggestions.add(item))
        }
      })
    })
    
    // Add some random suggestions from other categories for variety
    Object.entries(ingredientCategories).forEach(([category, items]) => {
      const randomItems = items
        .filter(item => !currentIngredients.some(ci => ci.toLowerCase().includes(item)))
        .filter(item => !suggestions.has(item))
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
      randomItems.forEach(item => suggestions.add(item))
    })
    
    return Array.from(suggestions).slice(0, 12)
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
      style={{
        backgroundImage: `url(${ingredientsBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/30 to-black/70"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping opacity-50"></div>
      </div>

      {/* Header with Back Button - Modified */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateTo('home')}
              className="group text-white hover:text-orange-300 transition-all duration-300 flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/20 border border-white/20"
            >
              <svg className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-lg font-medium">Back to Home</span>
            </button>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                <span className="text-sm text-white/90 font-medium">Powered by OpenAI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content area */}
          <div className="flex-1">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
                <h2 className="relative text-6xl font-bold text-white mb-6 animate-glow-3d" style={{
                  textShadow: '0 0 30px rgba(249, 115, 22, 0.5), 0 8px 16px rgba(0, 0, 0, 0.4)',
                  animation: 'glow 3s ease-in-out infinite'
                }}>
                  What's in your kitchen?
                </h2>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-glow-subtle leading-relaxed" style={{
                animation: 'glowSubtle 3s ease-in-out infinite'
              }}>
                Tell us what ingredients you have, and we'll create delicious recipes just for you.
              </p>
            </div>

            {/* Main Form Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
              <div className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Recipe Details */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="recipeName" className="block text-sm font-semibold text-white mb-3">
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
                    <label htmlFor="servings" className="block text-sm font-semibold text-white mb-3">
                      Servings: <span className="text-orange-400 font-bold">{servings}</span>
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
                      <div className="flex justify-between text-xs text-gray-300 mt-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <span key={num} className={num === servings ? 'text-orange-400 font-bold' : ''}>
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="dietaryPreference" className="block text-sm font-semibold text-white mb-3">
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
                  <label className="block text-sm font-semibold text-white mb-3">
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
                <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-red-400 mr-2">⚠️</span>
                    <span className="text-red-200 font-medium">{error}</span>
                  </div>
                </div>
              )}
                </div>
              </div>
            </div>

            {/* Generated Recipes */}
            {recipes.length > 0 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">Your Recipe</h3>
                  <p className="text-gray-300">Freshly created just for you</p>
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

          </div>
          
          {/* Suggestions Sidebar */}
          {showSuggestionsSidebar && suggestedIngredients.length > 0 && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    Suggested Ingredients
                  </h3>
                  <button 
                    onClick={() => setShowSuggestionsSidebar(false)}
                    className="text-white hover:text-orange-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-sm text-gray-300 mb-4">
                  Based on what you've added, these ingredients might work well:
                </p>
                
                <div className="space-y-3">
                  {suggestedIngredients.map((ingredient, index) => (
                    <button
                      key={index}
                      onClick={() => addSuggestedIngredient(ingredient)}
                      className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 hover:bg-white/30 hover:border-white/50 transition-colors flex items-center justify-between backdrop-blur-sm"
                    >
                      <span>{ingredient}</span>
                      <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/20">
                  <p className="text-xs text-gray-400">
                    Tip: Click on an ingredient to add it to your list
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Tips Section - Moved to bottom */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg p-8 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">💡 Pro Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Getting Started</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Type ingredients to see smart suggestions</li>
                    <li>• Press Enter to add ingredients quickly</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Customization</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Adjust servings for perfect portions</li>
                    <li>• Choose dietary preferences for tailored recipes</li>
                    <li>• Add a recipe name for personalization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default IngredientDemo