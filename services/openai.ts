import axios from 'axios';

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace this securely

export const askAI = async (message: string) => {
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('AI error:', error);
    return 'Sorry, I had trouble processing your request.';
  }
};
