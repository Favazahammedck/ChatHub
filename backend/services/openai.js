const OpenAI = require('openai');

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.model = 'gpt-5-nano';
  }

  async generateResponse(messages, context = '') {
    try {
      const systemPrompt = `You are an AI study companion designed to help students learn effectively. 
      You should provide clear, educational responses that help students understand concepts.
      ${context ? `Context from uploaded materials: ${context}` : ''}
      
      Guidelines:
      - Be encouraging and supportive
      - Break down complex concepts into understandable parts
      - Provide examples when helpful
      - Ask clarifying questions if needed
      - Focus on learning and understanding`;

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  async generateSummary(text) {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: "You are an AI that creates concise, educational summaries. Focus on key concepts, main points, and important details that would help a student understand the material."
          },
          {
            role: "user",
            content: `Please provide a comprehensive summary of the following text:\n\n${text}`
          }
        ],
        max_tokens: 500,
        temperature: 0.5
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI Summary Error:', error);
      throw new Error('Failed to generate summary');
    }
  }

  async generateFlashcards(text) {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: "You are an AI that creates educational flashcards. Generate 5-10 flashcards in JSON format with 'question' and 'answer' fields. Focus on key concepts, definitions, and important facts."
          },
          {
            role: "user",
            content: `Create flashcards for the following text:\n\n${text}`
          }
        ],
        max_tokens: 800,
        temperature: 0.6
      });

      const content = response.choices[0].message.content;
      
      // Try to parse JSON from the response
      try {
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.warn('Could not parse flashcards as JSON, returning raw content');
      }

      return content;
    } catch (error) {
      console.error('OpenAI Flashcards Error:', error);
      throw new Error('Failed to generate flashcards');
    }
  }
}

module.exports = new OpenAIService();

