'use client'
import { useState } from "react";
import { Heading, Text, Box, Flex, Button, Textarea } from "@chakra-ui/react";

let questions = new Array();
let chatanswers= new Array();
let life = 20;
let combined = "";

export default function Home() {
  let [prompt, setPrompt] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [result, setResult] = useState("");
  let [answer, setAnswer] = useState("");

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
};
  const handleClearBtnClicked = () => {
  setPrompt("");
  setResult("");
  setAnswer("");
  questions = [];
  chatanswers = [];
};
const handleSubmitPromptBtnClicked = () => {
  combined = ""
  if (prompt === "") {
    alert("Please enter a question")
    return;
  }
  life -=1;
  setPrompt("");
  setResult("");
  if (answer.toLowerCase() === prompt.toLowerCase()){
    alert('You got it')
    return;
  }
  setIsLoading(true);
  fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: [prompt,answer],
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      questions.push(prompt);
      chatanswers.push(text);
      for (let i=0; i<questions.length; i++) {
        combined += questions[i]+" -> "+chatanswers[i]+"\n"
      }
      setResult(combined);
      setIsLoading(false);
    });
};
const handleAnimalBtnClicked = () => {
  combined="";
  questions = [];
  chatanswers = [];
  life = 20;
  setPrompt("");
  setResult("");
  setIsLoading(true);
  fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "Output random animal. Dont put period mark at the end",
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      setAnswer(text);
      answer = text;
      console.log(answer)
      setIsLoading(false);
    });
};
const handleInstrumentBtnClicked = () => {
  combined = "";
  questions = [];
  chatanswers = [];
  life = 20;
  setPrompt("");
  setResult("");
  setIsLoading(true);
  fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "Output random instrument. Dont put period mark at the end",
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      setAnswer(text);
      answer = text;
      console.log(answer)
      setIsLoading(false);
    });
};
const handleSportsBtnClicked = () => {
  combined = "";
  questions = [];
  chatanswers = [];
  life = 20;
  setPrompt("");
  setResult("");
  setIsLoading(true);
  fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "Output random sport. Dont put period mark at the end",
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      setAnswer(text);
      answer = text;
      console.log(answer)
      setIsLoading(false);
    });
};
const handlePersonBtnClicked = () => {
  combined = "";
  questions = [];
  chatanswers = [];
  life = 20;
  setPrompt("");
  setResult("");
  setIsLoading(true);
  fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "Output random singer. Dont put period mark at the end",
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      setAnswer(text);
      answer = text;
      console.log(answer)
      setIsLoading(false);
    });
};
const handleMovieBtnClicked = () => {
  combined = "";
  questions = [];
  chatanswers = [];
  life = 20;
  setPrompt("");
  setResult("");
  setIsLoading(true);
  fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "Output random movie title. Dont put period mark at the end",
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      setAnswer(text);
      answer = text;
      console.log(answer)
      setIsLoading(false);
    });
};
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
      bgGradient="linear(to-b, #005C97, #0083B0)"
    >
      <Box maxW="2xl" m="0 auto" p="20px">
        <Heading
          as="h1"
          textAlign="center"
          fontSize="5xl"
          mt="50px"
          bgGradient="linear(to-l, #C9FFBF, #FFAFBD)"
          bgClip="text"
        >
          Twenty questions with an AI
        </Heading>
        <Heading as="h2" textAlign="center" fontSize="3xl" mt="20px">
          Made by Kenneth Kim
        </Heading>
        <Text fontSize="xl" textAlign="center" mt="10px">
          Powered by OpenAI's ChatGPT v3.5
        </Text>
        <Heading as="h2" textAlign="center" fontSize="3xl" mt="10px">
          Topics
        </Heading>
        <Button
          isLoading={isLoading}
          loadingText="Loading..."
          colorScheme="teal"
          size="lg"
          mt="30px"
          mr="10px"
          onClick={handleAnimalBtnClicked}
        >
          Animal
        </Button>
        <Button
          isLoading={isLoading}
          loadingText="Loading..."
          colorScheme="teal"
          size="lg"
          mt="30px"
          mr="10px"
          onClick={handleInstrumentBtnClicked}
        >
          Instrument
        </Button>
        <Button
          isLoading={isLoading}
          loadingText="Loading..."
          colorScheme="teal"
          size="lg"
          mt="30px"
          mr="10px"
          onClick={handleSportsBtnClicked}
        >
          Sports
        </Button>
        <Button
          isLoading={isLoading}
          loadingText="Loading..."
          colorScheme="teal"
          size="lg"
          mt="30px"
          mr="10px"
          onClick={handlePersonBtnClicked}
        >
          Singer
        </Button>
        <Button
          isLoading={isLoading}
          loadingText="Loading..."
          colorScheme="teal"
          size="lg"
          mt="30px"
          mr="10px"
          onClick={handleMovieBtnClicked}
        >
          Movies
        </Button>
        <Textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Insert your prompt here ..."
          mt="30px"
          size="lg"
        />
        <Button
          isLoading={isLoading}
          loadingText="Loading..."
          colorScheme="teal"
          size="lg"
          mt="30px"
          onClick={handleSubmitPromptBtnClicked}
        >
          Submit Prompt
        </Button>
        <Button
          colorScheme="teal"
          size="lg"
          mt="30px"
          ml="20px"
          onClick={handleClearBtnClicked}
        >
          Reset
        </Button>
        {result != "" && (
          <Box maxW="2xl" m="0 auto">
            <Heading as="h5" textAlign="left" fontSize="lg" mt="40px">
              {life} Questions Left
            </Heading>
            <Heading as="h5" textAlign="left" fontSize="lg" mt="40px">
              Results:
            </Heading>
            <Text fontSize="lg" textAlign="left" mt="20px">
                {
                  combined
                }
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
}