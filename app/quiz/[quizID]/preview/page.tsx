"use client";
import { useState } from "react";
import { AppNavigation } from "@/components/custom/app-navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// Mock data (should be replaced with real quiz questions)
type PreviewQuestion = {
  text: string;
  options: string[];
  answer: string;
  image: string | File | null;
};
const mockQuestions: PreviewQuestion[] = [
  {
    text: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "A",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    text: "What is H2O?",
    options: ["Water", "Oxygen", "Hydrogen", "Salt"],
    answer: "A",
    image: null,
  },
  {
    text: "Who wrote Hamlet?",
    options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
    answer: "A",
    image: null,
  },
];

const optionLabels = ["A", "B", "C", "D"];

export default function QuizPreviewPage() {
  const [current, setCurrent] = useState(0);
  const q = mockQuestions[current];
  const { quizID } = useParams();

  function handlePrev() {
    setCurrent((c) => Math.max(0, c - 1));
  }
  function handleNext() {
    setCurrent((c) => Math.min(mockQuestions.length - 1, c + 1));
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <div className="flex flex-col items-center justify-center mt-6 pt-8 ">
        {/* Breadcrumb */}
        <Link
          href={`/quiz/${quizID}`}
          className="flex items-center gap-2 mt-6 justify-start lg:min-w-[900px] md:w-auto w-full px-4 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Quiz</span>
          <span>/</span>
          <span className="text-foreground font-semibold">Preview</span>
        </Link>
        <div className="bg-card rounded-xl shadow lg:min-w-[900px] px-12 py-10 pb-24 mt-6  border border-border">
          <h1 className="text-3xl font-bold mb-1 text-foreground">
            Preview your quiz
          </h1>
          <p className="text-base text-muted-foreground mb-6">
            View your quiz from like a player
          </p>
          {/* Question text (not input) */}
          <div className="w-full border border-border rounded-lg px-4 py-3 mb-4 text-lg bg-muted text-foreground">
            {q.text}
          </div>
          {/* Image preview if present */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center justify-center w-56 h-40 bg-muted rounded-lg ">
              {q.image ? (
                <img
                  src={
                    typeof q.image === "string"
                      ? q.image
                      : q.image
                      ? URL.createObjectURL(q.image)
                      : undefined
                  }
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
          </div>
          {/* Options as radio buttons, correct answer selected */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {optionLabels.map((label, idx) => (
              <div
                key={label}
                className="flex items-center border border-border rounded-lg px-4 py-3 bg-background"
              >
                <span className="font-bold text-xl mr-3 text-primary">
                  {label}
                </span>
                <span className="flex-1 text-primary">{q.options[idx]}</span>
                <input
                  type="radio"
                  name="correct"
                  checked={q.answer === label}
                  readOnly
                  className="ml-3 w-5 h-5 accent-primary border-2 border-primary"
                  aria-label={`Mark ${label} as correct`}
                />
              </div>
            ))}
          </div>
          <hr className="my-6" />
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="secondary"
              className="min-w-[90px]"
              onClick={handlePrev}
              disabled={current === 0}
            >
              Previous
            </Button>

            {/* Center: Question Indicator */}
            <div className="flex-1 flex justify-center">
              <span className="text-primary font-semibold">
                Question {current + 1} of {mockQuestions.length}
              </span>
            </div>
            <Button
              variant="secondary"
              className="min-w-[90px]"
              onClick={handleNext}
              disabled={current === mockQuestions.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
