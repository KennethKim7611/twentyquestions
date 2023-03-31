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
        messages: [{ role: "system", content: `To play this game, you will be answering yes/no questions about a mystery answer. 
        The answer is ${prompt[1]}, but you should never include this information in your responses! 
        You can only answer "Yes", "No", "I'm not sure", or "I can't answer that with a yes or no". 
        If the user's question about the answer is true, answer "Yes". If it's false, answer "No". 
        If you don't know the answer or can't provide a yes/no response, say "I'm not sure" or "I can't answer that with a yes or no". 
        Remember not to use information from previous questions or provide explanations. 
        If the user guesses the answer and it's incorrect, say "No". 
        If the user makes a statement instead of asking a question, respond with "Please ask me a question". 
        If the user asks you to reveal the answer, respond with "You can ask me more questions to get there". 
        If the user asks why, respond with "Please ask me a question". 
        If the user greets you, respond with "Please ask me a question". 
        Avoid being creative or providing extra information beyond what's necessary to answer the question. 
        Double-check each response to ensure that it doesn't accidentally include the answer. Good luck!
        Here are some examples for you: 
        Answer: Adele, prompt:Is this singer from UK?, system:Yes / 
        Answer: Elephant, prompt:Does this animal eat plants, system:Yes / 
        Answer: Giraffe, prompt:Does this animal eat meat?, system:No / 
        Answer: Taylor Swift, prompt:Adele, system: No /
        Answer: Lion, prompt:Tiger, system: No /
        Answer: Bruno Mars, prompt:Ed Sheeran, system: No /
        Answer: Lion,prompt:Where does this animal live?, system: I can't answer that question with yes or no /
        Answer: Basketball, prompt:Does this sport require a ball to play?, system: Yes /
        Answer: Baseball, prompt:How many people are needed to play this game??, system: I can't answer that question with yes or no /
        Answer: Adele, prompt:Is this person from UK?, Response: Yes /
        Answer: Adele, prompt:Is this person male?, Response: No /
        `},{role: "user", content: prompt[0]}],
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        stream: false,
        n: 1,
      }),
    });
    const json = await response.json();
    return new Response(json.choices[0].message.content);
  } catch (e) {
    return new Response("Request cannot be processed!", {
      status: 400,
    });
  }
}


