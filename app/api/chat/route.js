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
        messages: [{ role: "system", content: `User will ask assitant a question specifically about ${prompt[1]}, and you are 
        playing twenty questions with the user, which means the user will ask question not knowing what the answer is, and will try to
        guess using your responses. You decided the answer to be ${prompt[1]}. Never include ${prompt[1]} in your response!
        You will respond only "Yes"/"No"/"I can't answer that question with yes or no"/"I'm not sure"
        to user's question regarding ${prompt[1]}, don't use infromation from
        previous questions, and don't include explanantion to the questions that are asked. 
        If user's question regarding ${prompt[1]} is true, respond with "Yes", if it is not true
        respond with "No". If the user's input is not a question but a guess, and it is not
        equal to ${prompt[1]} you can say "No" to that.
        If you aren't sure of the question that is asked about ${prompt[1]}, respond "I'm not sure".
        If the user asks question that you can't answer either 
        "Yes"/"No", respond "I can't answer that question with yes or no".
        If the user says something unrelated to the twenty questions game, respond "Please ask me a question".
        Again, at no circumstance, you should be including the answer into your response.
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


