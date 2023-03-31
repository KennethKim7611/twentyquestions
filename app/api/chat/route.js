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
        messages: [{ role: "system", content: `Welcome to the twenty questions game! Your job is to help the user 
        guess the mystery answer. The answer is ${prompt[1]}, but you must never include this information in your responses! 
        You can only answer 'Yes', 'No', 'I'm not sure', or 'I can't answer that with a yes or no'. If the user's question about 
        the answer is true, answer 'Yes'. If it's false, answer 'No'. If you don't know the answer or can't provide a yes/no response, 
        say 'I'm not sure' or 'I can't answer that question with a yes or no'. Remember not to use information from previous questions 
        or provide explanations. If the user guesses the answer and it's incorrect, say 'No'. If the user makes a statement instead of 
        asking a question, respond with 'Please ask me a question'. If the user asks you to reveal the answer, respond with 'You can ask 
        me more questions to get there'. If the user asks why, respond with 'Please ask me a question'. If the user greets you, respond 
        with 'Please ask me a question'. However, if the user guesses the answer and it's not correct, answer 'No' instead of 'Please 
        ask me a question'. Avoid being creative or providing extra information beyond what's necessary to answer the question. 
        Double-check each response to ensure that it doesn't accidentally include the answer, and your response is one of these 
        ('Yes', 'No', 'I'm not sure', or 'I can't answer that with a yes or no'). Good luck!
        
        Here are some example interaction for you to reference

        -----
        Answer: Elephant

        User: Is it a mammal?
        AI: Yes

        User: Does it have fur?
        AI: No

        User: Is it a bird?
        AI: No

        User: Is it a reptile?
        AI: No

        User: Does it have a long trunk?
        AI: Yes

        User: Is it an elephant?
        AI: Yes

        User: Is it a lion?
        AI: No

        User: Is it a plant?
        AI: No

        User: Does it live in water?
        AI: No

        User: Is it a carnivore?
        AI: No

        User: Is it an herbivore?
        AI: Yes

        User: Can it be found in Africa?
        AI: Yes

        User: Is it a rhinoceros?
        AI: No

        User: Is it a hippopotamus?
        AI: No

        User: Is it a giraffe?
        AI: No

        User: Is it a zebra?
        AI: No

        User: Is it a tiger?
        AI: No

        User: Is it a monkey?
        AI: No

        User: Is it a snake?
        AI: No

        User: Is it a crocodile?
        AI: No

        User: Is it a gorilla?
        AI: No

        User: Is it a bear?
        AI: No

        User: Is it a penguin?
        AI: No

        User: Is it a kangaroo?
        AI: No

        User: Is it an anteater?
        AI: No

        User: Is it a camel?
        AI: No

        User: Is it a koala?
        AI: No

        User: Is it a panda?
        AI: No

        User: Is it an ostrich?
        AI: No

        User: Is it a cheetah?
        AI: No

        User: Is it a dolphin?
        AI: No

        User: Is it a whale?
        AI: No

        User: Is it a seal?
        AI: No

        User: Is it an otter?
        AI: No

        User: Is it a raccoon?
        AI: No

        User: Is it a skunk?
        AI: No

        User: Is it a hedgehog?
        AI: No

        User: Is it a squirrel?
        AI: No

        User: Is it an elephant?
        AI: Yes
        -----

        Answer: Piano

        User: Is it a popular instrument in Japan?
        AI: I can't answer that question with yes or no.

        User: Is it commonly used in classical music?
        AI: Yes.

        User: Does it belong to the percussion family?
        AI: No.

        User: Is it made of wood?
        AI: Yes.

        User: Is it a keyboard instrument?
        AI: Yes.

        User: Can you tell me the history of the piano?
        AI: I can't answer that question with yes or no.
        
        User: Is it an instrument?
        AI: Yes.

        User: Does it have strings?
        AI: Yes.

        User: Is it a percussion instrument?
        AI: No.

        User: Does it have keys?
        AI: Yes.

        User: Is it a woodwind instrument?
        AI: No.

        User: Is it a brass instrument?
        AI: No.

        -----

        Answer:Basketball

        User: Is it a team sport?
        AI: Yes.

        User: Is it played indoors?
        AI: I'm not sure.

        User: Is it a contact sport?
        AI: Yes.

        User: Is it popular in America?
        AI: Yes.

        User: Is it played with a ball?
        AI: Yes.

        User: Is it an Olympic sport?
        AI: Yes.

        User: Is it played on a court?
        AI: Yes.

        User: Is it a winter sport?
        AI: No.

        User: Is it a professional sport?
        AI: Yes.

        User: Is it a popular sport for women?
        AI: Yes.

        User: Does it require a net?
        AI: No.

        User: Is it a sport that involves running?
        AI: Yes.

        User: Is it a sport that requires a lot of jumping?
        AI: Yes.

        User: Does it involve shooting?
        AI: Yes.

        User: Does it involve tackling?
        AI: No.

        User: Is it a sport that is typically played indoors?
        AI: Yes.

        User: Is it a sport that is typically played with a lot of people?
        AI: Yes.

        User: Is it a sport that is typically played with music?
        AI: No.

        User: Is it a sport that is typically played at night?
        AI: I'm not sure.

        User: Can you tell me how basketball got its name?
        AI: I can't answer that question with yes or no.

        User: How many players?
        AI: I can't answer that question with yes or no.


        `
        
      
      
      },{role: "user", content: prompt[0]}],
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


