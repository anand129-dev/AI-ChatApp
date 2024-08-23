import ReactMarkdown from "react-markdown";
import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  //Make the function asynchronous
  async function generateAnswer() {
    setAnswer("loading...");
    // console.log("loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCrJSl1WFWgGNCIl5vVEZQznTW4N0hHNU4",
      //Use ENP to encrypt the API key
      method: "post",
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });

    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
    
    // console.log(
    //   setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"])
    // );
  }

  //Json Combination of Arrays & Objects in Javascript.

  return (
    <>
      <h1>AI-ChatApp</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
      ></textarea>
      <button onClick={generateAnswer}>Generate answer</button>
      
      <p>
        <ReactMarkdown>
          {answer}
        </ReactMarkdown>
      </p>
  
    </>
  );
}

export default App;
