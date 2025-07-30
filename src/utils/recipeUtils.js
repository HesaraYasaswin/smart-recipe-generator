/**
 * Utility functions for recipe operations
 */

/**
 * Formats cooking time in minutes to a readable string
 * @param {number} minutes - Cooking time in minutes
 * @returns {string} Formatted time string
 */
export const formatCookingTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};

/**
 * Calculates recipe difficulty based on ingredients and steps
 * @param {number} ingredientCount - Number of ingredients
 * @param {number} stepCount - Number of cooking steps
 * @returns {string} Difficulty level
 */
export const calculateDifficulty = (ingredientCount, stepCount) => {
  const complexity = ingredientCount + stepCount;
  
  if (complexity <= 8) return 'Easy';
  if (complexity <= 15) return 'Medium';
  return 'Hard';
};

/**
 * Validates recipe data
 * @param {Object} recipe - Recipe object to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateRecipe = (recipe) => {
  const errors = [];
  
  if (!recipe.title || recipe.title.trim().length < 3) {
    errors.push('Recipe title must be at least 3 characters long');
  }
  
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    errors.push('Recipe must have at least one ingredient');
  }
  
  if (!recipe.instructions || recipe.instructions.length === 0) {
    errors.push('Recipe must have cooking instructions');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generates a unique recipe ID
 * @returns {string} Unique recipe ID
 */
export const generateRecipeId = () => {
  return `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}; 