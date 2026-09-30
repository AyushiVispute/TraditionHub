import { useState } from "react";
import { MessageCircle, X, Send, Minimize2, Sparkles } from "lucide-react";
import QuickQuestions from "./QuickQuestions";

const AIChat = ({ place }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const placeName =
    typeof place === "string" ? place : place?.title || "this place";

  const askAI = async (text = question) => {
    if (!text.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/guide/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            place,
            question: text.trim(),
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.answer || "I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, I couldn't connect to TraditionAI right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (text) => {
    setIsOpen(true);
    setIsMinimized(false);
    askAI(text);
  };

  // Floating minimized button
  if (!isOpen || isMinimized) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="flex items-center gap-3 bg-[#1D3557] text-white px-5 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-[#E76F51] flex items-center justify-center">
            <Sparkles size={20} />
          </div>

          <div className="text-left hidden sm:block">
            <p className="font-semibold text-sm">
              TraditionAI
            </p>
            <p className="text-xs text-white/70">
              Ask about {placeName}
            </p>
          </div>

          <MessageCircle size={22} />
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)]">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="bg-[#1D3557] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E76F51] flex items-center justify-center">
              <Sparkles size={20} />
            </div>

            <div>
              <h3 className="font-bold">
                TraditionAI
              </h3>

              <p className="text-xs text-white/70">
                Your cultural companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Minimize */}
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 rounded-full hover:bg-white/10 transition"
              title="Minimize"
            >
              <Minimize2 size={18} />
            </button>

            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 transition"
              title="Close"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Place information */}
        <div className="px-5 py-3 bg-[#FAF7F2] border-b">
          <p className="text-xs text-gray-500">
            Exploring
          </p>

          <p className="font-semibold text-[#1D3557] truncate">
            {placeName}
          </p>
        </div>

        {/* Messages */}
        <div className="h-[330px] overflow-y-auto p-4 space-y-3">

          {messages.length === 0 && (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center">
                <Sparkles
                  className="text-[#E76F51]"
                  size={26}
                />
              </div>

              <h4 className="font-semibold text-gray-800">
                Explore this place with AI
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Ask me about history, culture, food,
                festivals and more.
              </p>

              <QuickQuestions
                onQuestionClick={handleQuickQuestion}
              />
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                  message.role === "user"
                    ? "bg-[#E76F51] text-white rounded-br-md"
                    : "bg-gray-100 text-gray-800 rounded-bl-md"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-3 py-2 border">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAI();
                }
              }}
              placeholder="Ask about this place..."
              className="flex-1 bg-transparent outline-none text-sm"
            />

            <button
              onClick={() => askAI()}
              disabled={!question.trim() || loading}
              className="w-10 h-10 rounded-full bg-[#E76F51] text-white flex items-center justify-center hover:bg-[#d85f43] disabled:opacity-40 transition"
            >
              <Send size={17} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIChat;