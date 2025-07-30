require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.post('/api/generate-recipes', async (req, res) => {
  const { ingredients, dietaryPreference, servings } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not set on server.' });
  }

  let dietaryText = '';
  if (dietaryPreference && dietaryPreference !== '') {
    dietaryText = `The recipe must be suitable for a ${dietaryPreference.replace('-', ' ')} diet.`;
  }

  const prompt = `
Given the following ingredients: ${ingredients.join(', ')}

Generate 1 unique recipe for ${servings} servings. For the recipe, provide:
- A creative title
- A list of ingredients with quantities adjusted for ${servings} servings (use only the provided ones, but you may add common pantry items like salt, pepper, oil, water, etc.)
- Simple, step-by-step cooking instructions
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

If there are substitutions, add:
Suggested Substitutions:
- <original ingredient>: <suggestion>
`;

  try {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText); // Log the actual error
      return res.status(500).json({ error: 'OpenAI API error', details: errorText });
    }

    const data = await response.json();
    const text = data.choices[0].message.content.trim();

    // Parse recipes
    const recipes = text.split(/\n{2,}/).map(block => {
      const titleMatch = block.match(/^Title:\s*(.+)$/m);
      const ingredientsMatch = block.match(/Ingredients:\s*([\s\S]*?)Instructions:/m);
      const instructionsMatch = block.match(/Instructions:\s*([\s\S]*?)(?:Suggested Substitutions:|$)/m);
      const substitutionsMatch = block.match(/Suggested Substitutions:\s*([\s\S]*)/m);

      return {
        title: titleMatch ? titleMatch[1].trim() : '',
        ingredients: ingredientsMatch
          ? ingredientsMatch[1].split('\n').map(line => line.replace(/^- /, '').trim()).filter(Boolean)
          : [],
        instructions: instructionsMatch
          ? instructionsMatch[1].split('\n').map(line => line.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)
          : [],
        substitutions: substitutionsMatch
          ? substitutionsMatch[1].split('\n').map(line => line.replace(/^- /, '').trim()).filter(Boolean)
          : [],
      };
    });

    res.json({ recipes });
  } catch (err) {
    console.error('Error in /api/generate-recipes:', err); // Add this line for catch block
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});