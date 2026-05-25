import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GEMINI_API_KEY });

export default {
  async generateQuestions(prompt: string) {
    console.log('🤖 Generating questions with Groq AI...');
    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 2048,
      });
      const responseText = completion.choices[0]?.message?.content || '';
      console.log('✅ AI Response received');

      let cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
      if (jsonMatch) cleaned = jsonMatch[0];

      const parsed = JSON.parse(cleaned);
      let questions = Array.isArray(parsed) ? parsed : parsed.questions || [];

      questions = questions.map((q: any, index: number) => ({
        id: q.id || `ai_q${index + 1}`,
        text: q.text || q.question || 'Question text missing',
        difficulty: q.difficulty || 'medium',
        options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: q.correctAnswer || q.correct || 'A'
      }));

      console.log(`✅ Successfully parsed ${questions.length} questions`);
      return { questions };
    } catch (err: any) {
      console.error('❌ AI generation failed:', err?.message || err);
      throw new Error(`AI generation failed: ${err?.message || 'Unknown error'}`);
    }
  },
};