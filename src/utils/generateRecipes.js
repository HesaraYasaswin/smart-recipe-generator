export async function generateRecipes(ingredients, dietaryPreference = '', servings = 2) {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? window.location.origin
    : 'http://localhost:5001';
    
  console.log('🚀 Starting recipe generation...');
  console.log('📍 Base URL:', baseUrl);
  console.log('🥘 Ingredients:', ingredients);
  console.log('🍽️ Servings:', servings);
  console.log('🥬 Dietary Preference:', dietaryPreference);
    
  try {
    console.log('📡 Making API request...');
    const response = await fetch(`${baseUrl}/api/generate-recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients, dietaryPreference, servings }),
    });

    console.log('📊 Response status:', response.status);
    console.log('📊 Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ API Error:', errorData);
      throw new Error(errorData.error || 'Failed to generate recipes');
    }

    const data = await response.json();
    console.log('✅ API Response received:', data);
    return data.recipes;
  } catch (error) {
    console.error('💥 Recipe generation error:', error);
    throw error;
  }
}