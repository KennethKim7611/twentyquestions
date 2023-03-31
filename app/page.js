'use client'
import { useState } from "react";
import { Heading, Text, Box, Flex, Button, Textarea } from "@chakra-ui/react";

let questions = new Array();
let chatanswers= new Array();
let life = 20;
let combined = "";
let screen = [];
let choice = "";

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
  screen = [];
};
const handleSubmitPromptBtnClicked = () => {
  if (life === 0) {
      questions.push(prompt);
      let text = "You lost! Correct Answer was"+answer
      chatanswers.push(text);
      for (let i=0; i<questions.length; i++) {
        combined += questions[i]
        combined += chatanswers[i]
        screen.push(questions[i])
        screen.push(chatanswers[i])
      }
      setResult(combined);
  }
  combined = ""
  screen = [];
  if (answer === "") {
    alert("Please select the topic first")
    return;
  }
  if (prompt === "") {
    alert("Please enter a question")
    return;
  }
  life -=1;
  setPrompt("");
  setResult("");
  if (answer.toLowerCase() === prompt.toLowerCase()){
      questions.push(prompt);
      let text = "Correct!"
      chatanswers.push(text);
      for (let i=0; i<questions.length; i++) {
        combined += questions[i]
        combined += chatanswers[i]
        screen.push(questions[i])
        screen.push(chatanswers[i])
      }
      setResult(combined);
  }
  else {
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
        combined += questions[i]
        combined += chatanswers[i]
        screen.push(questions[i])
        screen.push(chatanswers[i])
      }
      setResult(combined);
      setIsLoading(false);
    });
  }
};
const handleAnimalBtnClicked = () => {
  choice = "Animal"
  combined="";
  questions = [];
  chatanswers = [];
  screen = [];
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
  choice = "Instrument"
  combined = "";
  questions = [];
  chatanswers = [];
  screen = [];
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
  choice = "Sports"
  combined = "";
  questions = [];
  chatanswers = [];
  screen = [];
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
  choice = "Singer"
  combined = "";
  questions = [];
  chatanswers = [];
  screen = [];
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
      prompt: "Output random singer. Dont put period mark at the end. Dont include any special accent letters.",
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
  choice = "Movie"
  combined = "";
  questions = [];
  chatanswers = [];
  screen = [];
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
      minHeight={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
      bgGradient="linear(to-b, #005C97, #0083B0)"
    >
      <Box maxW="3xl" m="0 auto" p="20px">
        <Heading
          as="h1"
          textAlign="center"
          fontSize="5xl"
          mt="50px"
          bgGradient="linear(to-l, #C9FFBF, #FFAFBD)"
          bgClip="text"
        >
          Twenty Questions with AI
        </Heading>
        <Heading as="h2" textAlign="center" fontSize="3xl" mt="20px">
          Made by Kenneth Kim <a href = "https://kennethkim0406.com/">&#127760;</a>
        </Heading>
        <Text fontSize="xl" textAlign="center" mt="10px">
          Powered by OpenAI's ChatGPT v3.5
        </Text>
        {answer === "" && (
          <>
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
          </>
        )}
        {life == 20 && (
          <Box maxW="2xl" m="0 auto">
            <Heading as="h5" textAlign="left" fontSize="lg" mt="40px">
              { answer=="" && (
                "Click on the topic to generate questions!"
              )
              }
              { answer !="" && (
                "Ask me any questions! (Topic: "+choice+")"
              )
              }
            </Heading>
          </Box>
        )
        }
        {result != "" && (
          <Box maxW="2xl" m="0 auto">
            <Heading as="h5" textAlign="left" fontSize="lg" mt="40px">
              {life} Questions Left
            </Heading>
            <Text fontSize="lg" textAlign="left" mt="20px">
                {screen.map((element, index) => (
            <div key={index} style={{ display: "flex", flexDirection: index % 2 === 0 ? "row" : "row-reverse", marginBottom: "10px" }}>
              <div style={{ background: index % 2 === 0 ? "#0275d8" : "#d8e1e9", color: index % 2 === 0 ? "#fff" : "#000", borderRadius: "10px", padding: "10px 15px", maxWidth: "70%", wordWrap: "break-word" }}>
                {element}
              </div>
            </div>
          ))}
            </Text>
          </Box>
        )}
        <Textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Insert your prompt here ..."
          mt="30px"
          size="lg"
          color="black"
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
        <Box maxW="2xl" m="30px auto" color="black" fontSize="20px">
              Visit my <u><a href ="https://www.kennethkim0406.com">website</a></u>, <u><a href ="https://www.linkedin.com/in/kennethkim7611/">linkedin</a></u>!
      </Box>
      </Box>
      
    </Flex>
  );
}