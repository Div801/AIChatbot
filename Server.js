const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());


// OpenAI API key
const apiKey = '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';


app.post('/openai/text-generation', async (req, res) => {
  try {
    const { prompt } = req.body;

    
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo-instruct',
        prompt: prompt,
        max_tokens: 20
      },
      {
        headers: {
          
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );


    const generatedText = response.data.choices[0].text.trim();


    // Send the generated text back to the client
    res.json({ generatedText });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

