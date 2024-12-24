import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const App = () => {
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
              autocomplete="off"
            />
            <div id="submit">
              <SendRoundedIcon style={{ color: "#DDDDE4" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
