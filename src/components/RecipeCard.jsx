import React from 'react'

/**
 * RecipeCard component
 * @param {Object} props
 * @param {Object} props.recipe - { title, ingredients, instructions }
 * @param {string[]} props.inputIngredients - The original user input ingredients
 */
const RecipeCard = ({ recipe, inputIngredients = [] }) => {
  // Normalize for case-insensitive matching
  const inputSet = new Set(inputIngredients.map(i => i.trim().toLowerCase()))

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Recipe Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">{recipe.title}</h2>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium">
              🍳 Fresh Recipe
            </span>
          </div>
        </div>
        
        {/* Recipe Stats */}
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="mr-2">📝</span>
            {recipe.ingredients.length} ingredients
          </div>
          <div className="flex items-center">
            <span className="mr-2">👨‍🍳</span>
            {recipe.instructions.length} steps
          </div>
          <div className="flex items-center">
            <span className="mr-2">⭐</span>
            {recipe.ingredients.filter(ing => inputSet.has(ing.trim().toLowerCase())).length} of your ingredients used
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🥘</span>
          Ingredients
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recipe.ingredients.map((ingredient, idx) => {
            const isInput = inputSet.has(ingredient.trim().toLowerCase())
            return (
              <div
                key={idx}
                className={`flex items-center p-3 rounded-xl border-2 transition-all ${
                  isInput
                    ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 shadow-md'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <span className={`mr-3 text-lg ${isInput ? 'text-orange-600' : 'text-gray-400'}`}>
                  {isInput ? '★' : '•'}
                </span>
                <span className={`font-medium ${isInput ? 'text-orange-800' : 'text-gray-700'}`}>
                  {ingredient}
                </span>
                {isInput && (
                  <span className="ml-auto text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full font-medium">
                    Your ingredient
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Instructions Section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📋</span>
          Instructions
        </h3>
        <div className="space-y-4">
          {recipe.instructions.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <p className="text-gray-700 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Substitutions Section (if any) */}
      {recipe.substitutions && recipe.substitutions.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
            <span className="mr-2">💡</span>
            Suggested Substitutions
          </h4>
          <ul className="space-y-2">
            {recipe.substitutions.map((substitution, idx) => (
              <li key={idx} className="text-blue-800 text-sm">
                {substitution}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center">
          <span className="mr-2">📱</span>
          Save Recipe
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center">
          <span className="mr-2">📤</span>
          Share
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center">
          <span className="mr-2">🖨️</span>
          Print
        </button>
      </div>
    </div>
  )
}

export default RecipeCard