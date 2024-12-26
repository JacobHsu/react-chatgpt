import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const App = () => {

    const getData = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Hi!",
        }),
      };

      try {
        const response = await fetch(
          "http://localhost:3000/completions",
          options
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

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
