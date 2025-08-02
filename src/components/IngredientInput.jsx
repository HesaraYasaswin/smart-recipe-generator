import React, { useState, useRef, useEffect } from 'react'

const IngredientInput = ({ 
  ingredients = [], 
  onIngredientsChange, 
  placeholder = "Add ingredients...",
  className = "" 
}) => {
  const [inputValue, setInputValue] = useState('') // State for the input field
  const [suggestions, setSuggestions] = useState([]) // Autocomplete suggestions
  const [showSuggestions, setShowSuggestions] = useState(false) // Dropdown visibility
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1) // Highlighted suggestion index
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)

  // Common ingredients for autocomplete
  const commonIngredients = [
    'chicken', 'beef', 'pork', 'fish', 'shrimp', 'salmon', 'tuna',
    'onion', 'garlic', 'tomato', 'potato', 'carrot', 'bell pepper',
    'rice', 'pasta', 'bread', 'flour', 'sugar', 'salt', 'pepper',
    'olive oil', 'butter', 'cheese', 'milk', 'eggs', 'cream',
    'lemon', 'lime', 'basil', 'oregano', 'thyme', 'rosemary',
    'mushroom', 'spinach', 'lettuce', 'cucumber', 'avocado',
    'apple', 'banana', 'strawberry', 'blueberry', 'orange'
  ]

  // Filter suggestions when the input value changes
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = commonIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(inputValue.toLowerCase()) &&
        !ingredients.some(existing => 
          existing.toLowerCase() === ingredient.toLowerCase()
        )
      )
      setSuggestions(filtered.slice(0, 5)) // Limit to 5 suggestions
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
    setFocusedSuggestion(-1)
  }, [inputValue, ingredients])

  // Handle keyboard interactions (Enter, Arrow keys, Escape)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (focusedSuggestion >= 0 && suggestions[focusedSuggestion]) {
        addIngredient(suggestions[focusedSuggestion])
      } else if (inputValue.trim()) {
        addIngredient(inputValue.trim())
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedSuggestion(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setFocusedSuggestion(-1)
    }
  }

  // Add a new ingredient to the list
  const addIngredient = (ingredient) => {
    const trimmedIngredient = ingredient.trim().toLowerCase()
    if (trimmedIngredient && !ingredients.some(existing => 
      existing.toLowerCase() === trimmedIngredient
    )) {
      const newIngredients = [...ingredients, trimmedIngredient]
      onIngredientsChange(newIngredients)
      setInputValue('')
      setShowSuggestions(false)
      setFocusedSuggestion(-1)
    }
  }

  // Remove ingredient from the list
  const removeIngredient = (indexToRemove) => {
    const newIngredients = ingredients.filter((_, index) => index !== indexToRemove)
    onIngredientsChange(newIngredients)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion, e) => {
    e.preventDefault()
    e.stopPropagation()
    addIngredient(suggestion)
    setShowSuggestions(false)
    setFocusedSuggestion(-1)
  }

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  // Handle input blur
  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false)
      setFocusedSuggestion(-1)
    }, 300)
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Ingredient Tags */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
            >
              {ingredient}
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-600 hover:bg-blue-200 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          placeholder={ingredients.length === 0 ? placeholder : "Add more ingredients..."}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => handleSuggestionClick(suggestion, e)}
                onMouseDown={(e) => e.preventDefault()}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors ${
                  index === focusedSuggestion ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Helper Text */}
      <p className="text-sm text-white">
        Press Enter to add an ingredient, or click on a suggestion
      </p>
    </div>
  )
}

export default IngredientInput 