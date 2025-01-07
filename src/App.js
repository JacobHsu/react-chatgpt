import { useState, useEffect } from "react";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState(""); 
  const [reply, setReply] = useState(null);
  const [recordTitle, setRecordTitle] = useState(null);
  const [records, setRecords] = useState([]);

  const fetchReply = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: inputValue,
      }),
    };

    try {
      const response = await fetch(
        "https://node-express-vercel-gpt.vercel.app/completions", // http://localhost:3000/completions
        options
      );
      const data = await response.json();
      setReply(data.choices[0].message);
      setSubmittedValue(inputValue);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(records, JSON.stringify(reply, null, 2));

  const addNewChat = () => {
    setInputValue("");
    setReply(null);
    setRecordTitle(null);
  };

  const handleClick = (uniqueTitle) => {
    setRecordTitle(uniqueTitle);
    setInputValue("");
    setReply(null);
  };

  useEffect(() => {
    if (!recordTitle && reply) {
      setRecordTitle(submittedValue);
    }
    if (recordTitle && reply) {
      setRecords((prevRecord) => [
        ...prevRecord,
        {
          title: recordTitle,
          role: "user",
          content: submittedValue,
        },
        {
          title: recordTitle,
          role: reply.role,
          content: reply.content,
        },
      ]);
    }
  }, [reply, recordTitle, submittedValue]);

  const currentRecord = records.filter(
    (record) => record.title === recordTitle
  );

  const uniqueTitles = Array.from(
    new Set(records.map((record) => record.title))
  );

  console.log(uniqueTitles);

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={addNewChat}>
          <span className="plus">+</span> New chat
        </button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li
              className="message"
              key={index}
              onClick={() => handleClick(uniqueTitle)}
            >
              <ChatBubbleOutlineRoundedIcon />
              <p className="record">{uniqueTitle}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="main">
        {recordTitle ? (
          <p className="title">{recordTitle}</p>
        ) : (
          <h1>Hello ChatGPT</h1>
        )}
        <ul id="output">
          {currentRecord?.map((message, index) => (
            <div
              key={index}
              className={`container ${
                message.role === "assistant" ? "assistant-msg" : ""
              }`}
            >
              <li>
                <p className={`role ${message.role}`}></p>
                <p>{message.content}</p>
              </li>
            </div>
          ))}
          <div className="bottom-space"></div>
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              name="text"
              type="text"
              placeholder="Send a message"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchReply();
                }
              }}
            />
            <div id="submit" onClick={fetchReply}>
              <SendRoundedIcon className="send-icon" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
