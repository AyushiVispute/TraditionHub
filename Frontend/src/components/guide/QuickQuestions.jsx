import {
  History,
  Clock,
  Users,
  Utensils,
  CalendarDays,
  BookOpen,
} from "lucide-react";

const questions = [
  {
    text: "Tell me the history",
    icon: History,
  },
  {
    text: "Best time to visit",
    icon: Clock,
  },
  {
    text: "Visitor etiquette",
    icon: Users,
  },
  {
    text: "Local food nearby",
    icon: Utensils,
  },
  {
    text: "Festivals & events",
    icon: CalendarDays,
  },
  {
    text: "Hidden stories",
    icon: BookOpen,
  },
];

const QuickQuestions = ({ onQuestionClick }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-5">
      {questions.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.text}
            onClick={() => onQuestionClick(item.text)}
            className="flex items-center gap-2 text-left text-xs p-3 rounded-xl border border-gray-200 hover:border-[#E76F51] hover:bg-orange-50 transition"
          >
            <Icon
              size={15}
              className="text-[#E76F51] flex-shrink-0"
            />

            <span>{item.text}</span>
          </button>
        );
      })}
    </div>
  );
};

export default QuickQuestions;