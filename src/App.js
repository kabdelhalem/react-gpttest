import logo from "./logo.svg";
import "./App.css";
import {Configuration, OpenAIApi} from "openai";
import {useState} from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;

  async function sendMessage(message) {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey, // Replace with your OpenAI API key
    };
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: message},
      ],
    };

    try {
      const response = await axios.post(url, payload, {headers});
      const reply = response.data.choices[0].message.content;
      return reply;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    const textarea = document.getElementById("chat");
    const message = textarea.value;
    sendMessage(message)
      .then((reply) => {
        console.log("Bot:", reply);
        const newElement = {message: message, reply: reply};
        console.log("message:", newElement);
        setMessages((prevArray) => [...prevArray, newElement]);
      })
      .catch((error) => console.error("Error:", error));
    textarea.value = "";
  };

  return (
    <div className="App">
      <div class="bg-gray-900 flex flex-col h-screen justify-between">
        <main>
          {messages === null ? null : (
            <div class="w-4/5 ">
              {messages.map((yo) => (
                <>
                  <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                    <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                      {yo.message}
                    </p>
                  </blockquote>
                  <p class="text-gray-500 dark:text-gray-400">{yo.reply}</p>
                </>
              ))}
            </div>
          )}
        </main>

        <footer class="flex content-center justify-center items-center">
          <form class="w-4/5">
            <label for="chat" class="sr-only">
              Your message
            </label>
            <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
              <textarea
                id="chat"
                rows="1"
                class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
              ></textarea>
              <button
                type="submit"
                class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                onClick={(e) => handleSendMessage(e)}
              >
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
                <span class="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  );
}

export default App;
