import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async( openai: OpenAI,  options: Options ) => {

  const { prompt } = options;


  const completion = await openai.chat.completions.create({
    messages: [
      { 
        role: "system", 
        content: `You will be provided with texts in English, which may contain spelling and grammatical errors.
        The words used must exist in standard English dictionaries.
        You must respond in JSON format.
        Your task is to correct these errors and return information about the solutions.
        Additionally, you should give a percentage score based on the user's accuracy.
    
        If there are no errors, you must return a congratulatory message.
    
        Example output:
        {
          userScore: number,
          errors: string[], // ['error -> solution']
          message: string, // Use emojis and text to encourage and congratulate the user
        }
        `
      },
      {
        role: 'user',
        content: prompt,
      }
  ],
    model: "gpt-4o-mini",
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object'
    }
  });

  // console.log(completion);
  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;

}