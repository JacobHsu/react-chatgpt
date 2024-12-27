import { useState } from "react";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const App = () => {
  const [value, setValue] = useState("");
  const [reply, setReply] = useState(null);

  const getData = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: value,
      }),
    };

    try {
      const response = await fetch(
        "https://node-express-vercel-gpt.vercel.app/completions", // http://localhost:3000/completions
        options
      );
      const data = await response.json();
      setReply(data.choices[0].message);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(JSON.stringify(reply, null, 2));

  return (
    <div className="app">
      <section className="side-bar">
        <button>
          <span className="plus">+</span> New chat
        </button>
        <ul className="history">
          <li className="message">
            <ChatBubbleOutlineRoundedIcon />
            <p className="record">Record</p>
          </li>
        </ul>
      </section>
      <section className="main">
        <h1>Hello ChatGPT</h1>
        <p id="output"></p>
        <div className="bottom-section">
          <div className="input-container">
            <input
              name="text"
              type="text"
              placeholder="Send a message"
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div id="submit" onClick={getData}>
              <SendRoundedIcon style={{ color: "#DDDDE4" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
