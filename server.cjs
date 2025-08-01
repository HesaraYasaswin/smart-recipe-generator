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
      console.error('OpenAI API error:', errorText);
      return res.status(500).json({ error: 'OpenAI API error', details: errorText });
    }

    const data = await response.json();
    const text = data.choices[0].message.content.trim();

    console.log('OpenAI response text:\n', text); // For debugging

    // Parse recipes
    const recipes = text.split(/\n{2,}/).map(block => {
      console.log('🔍 Processing block:', block);
      
      const titleMatch = block.match(/^Title:\s*(.+)$/m);
      const ingredientsMatch = block.match(/Ingredients:\s*([\s\S]*?)Instructions:/m);
      
      // More robust instructions parsing
      let instructions = [];
      const instructionsStart = block.indexOf('Instructions:');
      if (instructionsStart !== -1) {
        let instructionsText = block.substring(instructionsStart + 'Instructions:'.length);
        
        // Find where instructions end (before Suggested Substitutions or next Title)
        const substitutionsIndex = instructionsText.indexOf('Suggested Substitutions:');
        const nextTitleIndex = instructionsText.indexOf('Title:');
        
        let endIndex = instructionsText.length;
        if (substitutionsIndex !== -1 && (nextTitleIndex === -1 || substitutionsIndex < nextTitleIndex)) {
          endIndex = substitutionsIndex;
        } else if (nextTitleIndex !== -1) {
          endIndex = nextTitleIndex;
        }
        
        instructionsText = instructionsText.substring(0, endIndex).trim();
        console.log('🔍 Raw instructions text:', instructionsText);
        
        // Split by lines and extract numbered steps
        const lines = instructionsText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        console.log('🔍 Instruction lines:', lines);
        
                 instructions = lines
           .filter(line => /^\d+\.\s*/.test(line))
           .map(line => line.replace(/^\d+\.\s*/, '').trim())
           .filter(Boolean);
         
         // If no numbered steps found, try alternative parsing
         if (instructions.length === 0) {
           instructions = lines.filter(line => line.length > 0);
         }
        
        console.log('🔍 Extracted instructions:', instructions);
      }
      
      const substitutionsMatch = block.match(/Suggested Substitutions:\s*([\s\S]*)/m);
    
      const recipe = {
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
      
      console.log('🔍 Final recipe instructions:', recipe.instructions);
      console.log('🔍 Instructions length:', recipe.instructions.length);
      return recipe;
    });
    

    res.json({ recipes });
  } catch (err) {
    console.error('Error in /api/generate-recipes:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
