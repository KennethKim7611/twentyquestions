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
        messages: [{ role: "system", content: `Assitant will answer only "Yes"/"No"/"Wrong Answer"/"I can't answer that question with yes or no" to user's question regarding ${prompt[1]}, dont include explanations. If the user enters a single word that is not a question, and it does not equal to ${prompt[1]}, say "Wrong answer". If the user asks question that you can't answer in "Yes"/"No"/"Wrong answer", say "I can't answer that question with yes or no".`},{role: "user", content: prompt[0]}],
        temperature: 0.7,
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


