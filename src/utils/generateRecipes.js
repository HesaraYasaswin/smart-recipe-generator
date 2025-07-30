export async function generateRecipes(ingredients, dietaryPreference = '', servings = 2) {
  const response = await fetch('http://localhost:5001/api/generate-recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients, dietaryPreference, servings }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate recipes');
  }

  const data = await response.json();
  return data.recipes;
}