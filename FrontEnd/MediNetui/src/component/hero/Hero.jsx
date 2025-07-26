import React, { useState } from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleOption = (message) => {
    setInput("");
    sendMessage(message);
  };

  const sendMessage = async (customInput) => {
    const userInput = customInput || input;
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: newMessages,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      const reply =
        data.choices?.[0]?.message?.content || "Error getting response";

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error: " + err.message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.textContent}>
          <h3>Medical And Health</h3>
          <h1 className="text-5xl font-bold text-blue-500 leading-tight">
            Connecting Care, <br />
            Empowering Health
          </h1>
          <p>
            Connecting hospitals, doctors, and patients in one smart system.
          </p>
          <button className={`${styles.btn} ${styles.dark}`}>
            All Hospitals ➜
          </button>
        </div>
      </div>

      <div className={styles.chatToggle} onClick={toggleChat}>
        💬
      </div>

      {isChatOpen && (
        <div className={styles.chatbox}>
          <div className={styles.chatHeader}>
            Chat with us
            <span className={styles.closeBtn} onClick={toggleChat}>
              ✖
            </span>
          </div>
          <div className={styles.chatBody}>
            <div className={styles.chatMessages}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.role === "user" ? styles.userMsg : styles.botMsg
                  }
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && <div className={styles.botMsg}>Typing...</div>}
            </div>
/
            {/* Options */}
            <div className={styles.chatOptions}>
              <button onClick={() => handleOption("DOCTOR LIST")}>
                🩺 Doctor List
              </button>
              <button onClick={() => handleOption("HOSPITAL LIST")}>
                🏥 Hospital List
              </button>
            </div>

            {/* Input */}
            <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styles.chatInput}
                placeholder="Type your message..."
              />
              <button onClick={() => sendMessage()} className={styles.sendBtn}>
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;




