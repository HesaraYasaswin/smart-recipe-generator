export default async function handler(req, res) {
  console.log(' API function called');
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    console.log(' Handling OPTIONS request');
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    console.log(' Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ingredients, dietaryPreference, servings } = req.body;
  console.log(' Received ingredients:', ingredients);
  console.log(' Received servings:', servings);
  console.log(' Received dietary preference:', dietaryPreference);
  
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    console.log(' Invalid ingredients:', ingredients);
    return res.status(400).json({ error: 'Ingredients array is required' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  console.log(' API Key exists:', !!apiKey);
  console.log(' API Key starts with:', apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND');

  if (!apiKey) {
    console.error(' OpenAI API key not found in environment variables');
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  let dietaryText = '';
  if (dietaryPreference && dietaryPreference !== '') {
    dietaryText = `The recipe must be suitable for a ${dietaryPreference.replace('-', ' ')} diet.`;
  }

  const prompt = `
Given the following ingredients: ${ingredients.join(', ')}

Generate 3 to 5 unique recipes for ${servings} servings. For each recipe, provide:
- A creative title
- A list of ingredients with quantities adjusted for ${servings} servings (use only the provided ones, but you may add common pantry items like salt, pepper, oil, water, etc.)
- Prioritize recipes that **minimize food waste** by efficiently using all or most of the provided ingredients
- Simple, step-by-step cooking instructions with a **minimum of 5 steps**, each step on a new line prefixed by "1. ", "2. ", etc.
- If any ingredient is missing or uncommon, suggest a substitution and list it at the end as 'Suggested Substitutions:'
${dietaryText}

Format:
Title: <Recipe Title>
Ingredients:
- ingredient 1 (quantity for ${servings} servings)
- ingredient 2 (quantity for ${servings} servings)
Instructions:
1. Step one
2. Step two
3. Step three
4. Step four
5. Step five
...

If there are substitutions, add:
Suggested Substitutions:
- <original ingredient>: <suggestion>
`;

  try {
    console.log('Making request to OpenAI API...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1200,
        temperature: 0.7,
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      return res.status(500).json({ error: 'OpenAI API error', details: errorText });
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response format:', data);
      return res.status(500).json({ error: 'Invalid response from OpenAI' });
    }

    const text = data.choices[0].message.content.trim();
    console.log('Parsing recipes from response...');

    const recipes = text.split(/\n{2,}/).map(block => {
      const titleMatch = block.match(/^Title:\s*(.+)$/m);
      const ingredientsMatch = block.match(/Ingredients:\s*([\s\S]*?)Instructions:/m);
      
      let instructions = [];
      const instructionsStart = block.indexOf('Instructions:');
      if (instructionsStart !== -1) {
        let instructionsText = block.substring(instructionsStart + 'Instructions:'.length);
        
        const substitutionsIndex = instructionsText.indexOf('Suggested Substitutions:');
        const nextTitleIndex = instructionsText.indexOf('Title:');
        
        let endIndex = instructionsText.length;
        if (substitutionsIndex !== -1 && (nextTitleIndex === -1 || substitutionsIndex < nextTitleIndex)) {
          endIndex = substitutionsIndex;
        } else if (nextTitleIndex !== -1) {
          endIndex = nextTitleIndex;
        }
        
        instructionsText = instructionsText.substring(0, endIndex).trim();
        
        const lines = instructionsText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        instructions = lines
          .filter(line => /^\d+\.\s*/.test(line))
          .map(line => line.replace(/^\d+\.\s*/, '').trim())
          .filter(Boolean);
         
        if (instructions.length === 0) {
          instructions = lines.filter(line => line.length > 0);
        }
      }
      
      const substitutionsMatch = block.match(/Suggested Substitutions:\s*([\s\S]*)/m);
    
      return {
        title: titleMatch ? titleMatch[1].trim() : '',
        ingredients: ingredientsMatch
          ? ingredientsMatch[1]
              .split('\n')
              .map(line => line.replace(/^- /, '').trim())
              .filter(Boolean)
          : [],
        instructions: instructions,
        substitutions: substitutionsMatch
          ? substitutionsMatch[1]
              .split('\n')
              .map(line => line.replace(/^- /, '').trim())
              .filter(Boolean)
          : [],
      };
    }).filter(recipe => recipe.title && recipe.ingredients.length > 0);

    console.log(`Generated ${recipes.length} recipes`);
    res.json({ recipes });
  } catch (err) {
    console.error('Error in /api/generate-recipes:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
} 
