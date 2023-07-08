import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-UYx2YYyHE4CAP1VBHXivSoq0",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

function App(){
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();
    
    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    scrollTo(0, 1e10);
    setMessage("");



    await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a EbereGPT. You can help with graphic design tasks",
        },
        ...chats,
      ],
    }) .then((res) => {
      msgs.push(res.data.choices[0].message);
      setChats(msgs)
      
      setIsTyping(false);
      scrollTo(0, 1e10)
    })
    .catch((error) => {
      console.log(error);
    });
    
  }



return(
  <main>
          <h1>Abdallah GPT  </h1>
          <h1>Chat AI  </h1>
          <hr></hr>


          <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>



          <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>





          <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
            style={{borderRadius:"7px"}}
       />
      </form>



  </main>
)

}

export default App;