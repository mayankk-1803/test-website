import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import "./Chatbot.css";

export default function Chatbot() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! Welcome to Prime Origin Exports. How can I assist you today?"
    }
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  const controllerRef = useRef<AbortController | null>(null);



  /* =========================
     AUTO SCROLL
  ========================= */

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, typing]);


  /* =========================
     SEND MESSAGE FUNCTION
  ========================= */

  const sendMessage = async () => {

    const trimmedInput = input.trim();

    if (!trimmedInput || typing) return;

    const userMessage = {
      role: "user",
      text: trimmedInput
    };

    setMessages(prev => [...prev, userMessage]);

    setInput("");

    setTyping(true);


    try {

      /* Cancel previous request if exists */

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();


      const res = await fetch(

        `${import.meta.env.VITE_API_URL}/api/chat`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            message: trimmedInput
          }),

          signal: controllerRef.current.signal

        }

      );


      if (!res.ok) throw new Error("Server error");


      const data = await res.json();


      const botMessage = {

        role: "bot",

        text: data?.reply ||
          "Please contact us for more details."

      };


      setMessages(prev => [...prev, botMessage]);

    }

    catch (error: unknown) {

  if (error instanceof Error) {

    if (error.name === "AbortError") return;

    console.error("Chatbot error:", error.message);

  } else {

    console.error("Unexpected error:", error);

  }

  setMessages(prev => [
    ...prev,
    {
      role: "bot",
      text: "Sorry, something went wrong."
    }
  ]);

}


    finally {

      setTyping(false);

    }

  };


  /* =========================
     UI
  ========================= */

  return (

    <>

      {/* Floating Button */}

      <motion.button

        className="chatbot-button"

        onClick={() => setOpen(prev => !prev)}

        animate={{
          scale: [1, 1.08, 1]
        }}

        transition={{
          duration: 2,
          repeat: Infinity
        }}

        whileHover={{ scale: 1.15 }}

        whileTap={{ scale: 0.9 }}

      >

        {open
          ? <X size={24}/>
          : <MessageCircle size={24}/>
        }

      </motion.button>


      {/* Chat Window */}

      <AnimatePresence>

        {open && (

          <motion.div

            className="chatbot-window"

            initial={{
              opacity: 0,
              y: 80,
              scale: 0.9
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}

            exit={{
              opacity: 0,
              y: 80,
              scale: 0.9
            }}

            transition={{
              type: "spring",
              stiffness: 120,
              damping: 15
            }}

          >

            <div className="chatbot-header">
              Prime Origin Assistant
            </div>


            <div className="chatbot-messages">

              <AnimatePresence>

                {messages.map((msg, index) => (

                  <motion.div

                    key={index}

                    className={`message ${msg.role}`}

                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.95
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }}

                    transition={{ duration: 0.25 }}

                  >

                    {msg.text}

                  </motion.div>

                ))}

              </AnimatePresence>


              {/* Typing Indicator */}

              {typing && (

                <div className="message bot typing">

                  <div className="typing-dots">

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                </div>

              )}

              <div ref={messagesEndRef} />

            </div>


            {/* Input */}

            <div className="chatbot-input">

              <input

                value={input}

                onChange={(e) =>
                  setInput(e.target.value)
                }

                placeholder="Ask about exports..."

                disabled={typing}

                onKeyDown={(e) => {

                  if (e.key === "Enter")
                    sendMessage();

                }}

              />

              <button

                onClick={sendMessage}

                disabled={typing}

              >

                Send

              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>

  );

}
