import { useState, useRef } from "react";
import AIChat from "../../components/guide/AIChat";
import QuickQuestions from "../../components/guide/QuickQuestions";
import { Bot } from "lucide-react";

export default function AIGuide() {
  const [place] = useState("All Places");
  const chatApiRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1D3557] to-[#274C77] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg animate-pulse">
            <Bot size={42} className="text-orange-300" />
          </div>

          <div>
            <h1 className="text-5xl font-bold">TraditionAI</h1>
            <p className="mt-3 text-lg text-gray-200">
              Your AI Cultural Guide for {place}
            </p>
            <p className="text-sm text-orange-200 mt-2">
              Learn history • Understand rituals • Explore hidden stories
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <QuickQuestions
          onSelect={(question) => chatApiRef.current?.askQuestion(question)}
        />

        <AIChat ref={chatApiRef} place={place} />
      </div>
    </div>
  );
}