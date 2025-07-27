// Chatbox.jsx
import React, { useState } from "react";
import styles from "./Chatbox.module.css";

const Chatbox = ({ token }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentOptions, setAppointmentOptions] = useState([]);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleOption = async (message) => {
    setInput("");
    setAppointmentOptions([]);
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    if (!token) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "You are not logged in." },
      ]);
      return;
    }

    setIsLoading(true);

    try {
      if (message === "APPOINTMENT OPTIONS") {
        const response = await fetch(
          "http://ardhost:510/server/api/ML/getAppointmentOptionMessage",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const json = await response.json();
        setAppointmentOptions(json.options || []);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Here are your appointment options:",
          },
        ]);
      } else {
        await sendMessage(message);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to fetch data. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://ardhost:510/server/api/ML/getAppointmentOptionMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SymptomText: userInput,
          }),
        }
      );

      const replyText = await response.text(); // No JSON parsing
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: replyText },
      ]);
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
    <>
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

            {appointmentOptions.length > 0 && (
              <div className={styles.cardList}>
                {appointmentOptions.map((option, index) => (
                  <div key={index} className={styles.optionCard}>
                    <p>{option}</p>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styles.chatInput}
                placeholder="Type your message..."
              />
              <button
                onClick={() => handleOption(input)}
                className={styles.sendBtn}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
