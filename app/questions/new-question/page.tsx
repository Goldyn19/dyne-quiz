"use client";
import { useState } from "react";
import { AppNavigation } from "@/components/custom/app-navigation";
import { Button } from "@/components/ui/button";
import {  Upload } from "lucide-react";

const initialQuestions = [
  {
    text: "",
    options: ["", "", "", ""],
    answer: "",
    image: null as File | null,
  },
];

const optionLabels = ["A", "B", "C", "D"];

export default function NewQuestionPage() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [current, setCurrent] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const q = questions[current];

  function handleOptionChange(idx: number, value: string) {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[current].options[idx] = value;
      return updated;
    });
  }
  function handleAnswerChange(idx: number) {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[current].answer = optionLabels[idx];
      return updated;
    });
  }
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQuestions((prev) => {
        const updated = [...prev];
        updated[current].image = file;
        return updated;
      });
      setImagePreview(URL.createObjectURL(file));
    }
  }
  function handleQuestionChange(value: string) {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[current].text = value;
      return updated;
    });
  }
  function addNewQuestion() {
    setQuestions((prev) => [...prev, { text: "", options: ["", "", "", ""], answer: "", image: null }]);
    setCurrent(questions.length);
    setImagePreview(null);
  }
  function handleSave() {
    // Save logic here
    // Show toast or feedback
  }
  function handlePrev() {
    setCurrent((c) => Math.max(0, c - 1));
    setImagePreview(null);
  }
  function handleNext() {
    setCurrent((c) => Math.min(questions.length - 1, c + 1));
    setImagePreview(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <div className="flex flex-col items-center justify-center mt-6 pt-8 ">
        <div className="bg-card rounded-xl shadow lg:min-w-[900px] px-12 py-10 pb-24 mt-6  border border-border">
          <h1 className="text-3xl font-bold mb-1 text-foreground">Customize your questions</h1>
          <p className="text-base text-muted-foreground mb-6">Add/edit/remove questions and then play with friends!</p>
          <button
            className="w-full border-2 border-primary text-primary rounded-lg py-2 font-semibold text-lg mb-6 hover:bg-primary/10 transition"
            onClick={addNewQuestion}
          >
            + Add new question
          </button>
          <input
            className="w-full border border-border rounded-lg px-4 py-3 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter the question"
            value={q.text}
            onChange={e => handleQuestionChange(e.target.value)}
          />
          <div className="flex justify-center mb-6">
            <label className="flex flex-col items-center justify-center w-56 h-40 bg-muted rounded-lg cursor-pointer border-2 border-dashed border-primary hover:bg-primary/10 transition">
              {q.image || imagePreview ? (
                <img
                  src={typeof imagePreview === 'string' ? imagePreview : (typeof q.image === 'string' ? q.image : (q.image ? URL.createObjectURL(q.image) : undefined))}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-primary mb-2" />
                  <span className="text-primary font-semibold">+ Upload Image</span>
                </>
              )}
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {optionLabels.map((label, idx) => (
              <div key={label} className="flex items-center border border-border rounded-lg px-4 py-3 bg-background focus-within:ring-2 focus-within:ring-primary">
                <span className="font-bold text-xl mr-3 text-primary">{label}</span>
                <input
                  className="flex-1 border-none outline-none text-base bg-transparent placeholder-primary"
                  placeholder={`Enter option`}
                  value={q.options[idx]}
                  onChange={e => handleOptionChange(idx, e.target.value)}
                  style={{ color: 'var(--tw-text-primary)' }}
                />
                <input
                  type="radio"
                  name="correct"
                  checked={q.answer === label}
                  onChange={() => handleAnswerChange(idx)}
                  className="ml-3 w-5 h-5 accent-primary border-2 border-primary"
                  aria-label={`Mark ${label} as correct`}
                />
              </div>
            ))}
          </div>
          <hr className="my-6" />
            <div className="flex justify-end">
              
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg min-w-[90px]" onClick={handleSave}>Save</Button>
            </div>
          <div className="flex items-center justify-between mt-8">
               <Button variant="secondary" className="min-w-[90px]" onClick={handlePrev} disabled={current === 0}>Previous</Button>
            
            <div className="flex-1 flex justify-center">
              <span className="text-primary font-semibold">Question {current + 1} of {questions.length}</span>
            </div>
            <Button variant="secondary" className="min-w-[90px]" onClick={handleNext} disabled={current === questions.length - 1}>Next</Button>  
          </div>
        </div>
      </div>
    </div>
  );
} 