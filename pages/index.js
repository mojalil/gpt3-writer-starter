import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/patonar-black-sq.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [userCompany1, setUserCompany1] = useState("");
  const [userCompany2, setUserCompany2] = useState("");
  const [userTargetMarkets, setUserTargetMarkets] = useState("Singapore, Malaysia, Hong Kong, Thailand");
  const [userAudience, setUserAudience] = useState("Students and young professionals aged 18-35");
  const [userTimeline, setUserTimeline] = useState("June 2023 - March 2024");
  const [userGoal, setUserGoal] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const onCompany1ChangedText = (event) => {
    console.log(event.target.value);
    setUserCompany1(event.target.value);
  };

  const onCompany2ChangedText = (event) => {
    console.log(event.target.value);
    setUserCompany2(event.target.value);
  };


  const onTargetMarketsChangedText = (event) => {
    console.log(event.target.value);
    setUserTargetMarkets(event.target.value);
  };

  const onAudienceChangedText = (event) => {
    console.log(event.target.value);
    setUserAudience(event.target.value);
  };

  const onTimelineChangedText = (event) => {
    console.log(event.target.value);
    setUserTimeline(event.target.value);
  };

  const onGoalChangedText = (event) => {
    console.log(event.target.value);
    setUserGoal(event.target.value);
  };

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const userInput = {
      company1: userCompany1,
      company2: userCompany2,
      targetMarkets: userTargetMarkets,
      audience: userAudience,
      timeline: userTimeline,
      goal: userGoal,
    }

    console.log("Calling OpenAI API...")

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

  const data = await response.json();

  const {output} = data;

  console.log("OpenAI API response: ", output.text);

  setApiOutput(`${output.text}`);

  setIsGenerating(false);
  }


  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | Patonar</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Hey 👋</h1>
          </div>
          <div className="header-subtitle">
            <h2>I'm your collab copilot</h2>
          </div>
        </div>
        
        <div className="prompt-container">
          <div className="prompt-line-elements">
        <textarea
            className="prompt-line"
            placeholder="Company 1 is..."
            value={userCompany1}
            onChange={onCompany1ChangedText}
          />
                  <textarea
            className="prompt-line"
            placeholder="Company 2 is..."
            value={userCompany2}
            onChange={onCompany2ChangedText}
          />
          </div>
          <textarea
            className="prompt-box"
            placeholder="start typing here"
            value={userGoal}
            onChange={onGoalChangedText}
          />
          <div className="prompt-buttons">
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}>
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>Powered By Patonar</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
