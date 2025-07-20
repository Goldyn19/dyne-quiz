"use client";
import { useState } from "react";
import { AppNavigation } from "@/components/custom/app-navigation";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const optionLabels = ["A", "B", "C", "D"];

// Mock data for a single question (replace with real fetch logic)
const mockQuestion = {
  text: "What is the capital of France?",
  options: ["Paris", "London", "Berlin", "Madrid"],
  answer: "A",
  image: null as File | string | null,
};

export default function EditQuestionPage() {
  const [question, setQuestion] = useState({ ...mockQuestion });
  const [imagePreview, setImagePreview] = useState<string | null>(
    typeof question.image === "string" ? question.image : null
  );

  function handleOptionChange(idx: number, value: string) {
    setQuestion((prev) => {
      const options = [...prev.options];
      options[idx] = value;
      return { ...prev, options };
    });
  }
  function handleAnswerChange(idx: number) {
    setQuestion((prev) => ({ ...prev, answer: optionLabels[idx] }));
  }
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQuestion((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  }
  function handleQuestionChange(value: string) {
    setQuestion((prev) => ({ ...prev, text: value }));
  }
  function handleSave() {
    // Save logic here
    // Show toast or feedback
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <div className="flex flex-col items-center justify-center mt-6 pt-8 ">
        {/* Breadcrumb */}
        <Link
          href="/questions"
          className="flex items-center gap-2 mt-6 justify-start lg:min-w-[900px] md:w-auto w-full px-4 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Questions</span>
          <span>/</span>
          <span className="text-foreground font-semibold">Edit</span>
        </Link>
        <div className="bg-card rounded-xl shadow lg:min-w-[900px] px-12 py-10 pb-24 mt-6  border border-border">
          <h1 className="text-3xl font-bold mb-1 text-foreground">
            Edit Question
          </h1>
          <p className="text-base text-muted-foreground mb-6">
            Edit the question and options below.
          </p>
          {/* Question input */}
          <input
            className="w-full border border-border rounded-lg px-4 py-3 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter the question"
            value={question.text}
            onChange={(e) => handleQuestionChange(e.target.value)}
          />
          {/* Image upload */}
          <div className="flex justify-center mb-6">
            <label className="flex flex-col items-center justify-center w-56 h-40 bg-muted rounded-lg cursor-pointer border-2 border-dashed border-primary hover:bg-primary/10 transition">
              {question.image || imagePreview ? (
                <img
                  src={
                    typeof imagePreview === "string"
                      ? imagePreview
                      : typeof question.image === "string"
                      ? question.image
                      : question.image
                      ? URL.createObjectURL(question.image)
                      : undefined
                  }
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-primary mb-2" />
                  <span className="text-primary font-semibold">
                    + Upload Image
                  </span>
                </>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {/* Options as editable inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {optionLabels.map((label, idx) => (
              <div
                key={label}
                className="flex items-center border border-border rounded-lg px-4 py-3 bg-background focus-within:ring-2 focus-within:ring-primary"
              >
                <span className="font-bold text-xl mr-3 text-primary">
                  {label}
                </span>
                <input
                  className="flex-1 border-none outline-none text-base bg-transparent placeholder-primary"
                  placeholder={`Enter option`}
                  value={question.options[idx]}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  style={{ color: "var(--tw-text-primary)" }}
                />
                <input
                  type="radio"
                  name="correct"
                  checked={question.answer === label}
                  onChange={() => handleAnswerChange(idx)}
                  className="ml-3 w-5 h-5 accent-primary border-2 border-primary"
                  aria-label={`Mark ${label} as correct`}
                />
              </div>
            ))}
          </div>
          <hr className="my-6" />
          <div className="flex items-center justify-end mt-8">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-2 rounded-lg min-w-[90px]"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
