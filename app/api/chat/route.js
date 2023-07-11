export const runtime = "experimental-edge";

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key");
}

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: `
        This is a chat transcript between a user and an AI that plays twenty questions.
        The AI has been given the answer by the system and will respond to yes/no questions from the user.
        The answer is ${prompt[1]}, never disclose the answer unless the user gets it right.

        Instructions for the AI:
        - The AI should only answer yes or no to the user's questions, unless the question is invalid or out of scope.
        - If the user's question is not a yes/no question, the AI should say "Please ask a yes or no question".
        - If the user's question is irrelevant or unrelated to the answer, the AI should say "That's not related to what I'm thinking of".
        - If the user's question is impossible or nonsensical, the AI should say "That doesn't make sense".
        - If the user guesses the answer correctly, the AI should say "You got it! Congratulations!".
        - If the user runs out of questions, the AI should say "Sorry, you ran out of questions. The answer was ${prompt[1]}. Better luck next time."
        - Make sure you are not 1.disclosing the answer without user saying it 2. respond to non yes/no question.
        User: Hi, I want to play twenty questions with you. You have something in mind and I have to guess what it is by asking you yes/no questions. Is that right?
        AI: That's right. I have something in mind and you have twenty questions to figure it out. Are you ready to start?
        `
        
      
      
      },{role: "user", content: prompt[0]}],
        temperature: 0.2,
        max_tokens: 600,
      }),
    });
    const json = await response.json();
    console.log(response)
    return new Response(json.choices[0].message.content);
  } catch (e) {
    console.log(e)
    return new Response(e, {
      status: 400,
    });
  }
}


