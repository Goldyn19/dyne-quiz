"use client";
import { useState, useEffect } from "react";
import { AppNavigation } from "@/components/custom/app-navigation";
import { Button } from "@/components/ui/button";
import { Upload, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { uploadImageToCloudinary } from "@/services/cloudinary";

type Question = {
  id: number;
  text: string;
  quiz?: string;
  options: Record<string, string>;
  correct_answer: string;
  image?: string | File;
  created_by_username: string;
};

export default function EditQuestionPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data: session } = useSession();
  const params = useParams();
  const questionID = params?.questionID;

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!session?.accessToken || !questionID) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/${questionID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }

        const data = await response.json();
        setQuestion(data);
        if (typeof data.image === "string") {
          setImagePreview(data.image);
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [session, questionID]);

  function handleOptionChange(label: string, value: string) {
    if (!question) return;
    setQuestion({
      ...question,
      options: { ...question.options, [label]: value },
    });
  }

  function handleAnswerChange(label: string) {
    if (!question) return;
    setQuestion({ ...question, correct_answer: label });
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!question || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setQuestion({ ...question, image: file });
  }

  function handleQuestionChange(value: string) {
    if (!question) return;
    setQuestion({ ...question, text: value });
  }

async function handleSave() {
  if (!question?.text.trim()) {
    alert("Question text cannot be empty");
    return;
  }

  if (Object.values(question.options).some((opt) => !opt.trim())) {
    alert("All options must be filled");
    return;
  }

  if (!question.correct_answer) {
    alert("Select the correct answer");
    return;
  }

  const formData = new FormData();
  formData.append("text", question.text);
  formData.append("correct_answer", question.correct_answer);
  formData.append("options", JSON.stringify(question.options));

  if (question.image instanceof File) {
    const imageUrl = await uploadImageToCloudinary(question.image);
    formData.append("image", imageUrl);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/question/${question.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Failed to update:", errorData);
      alert("Update failed.");
      return;
    }

    const updatedData = await res.json();
    window.location.reload();
    alert("Question updated successfully!");

    // Optional: Update state if needed
    setQuestion(updatedData);

  } catch (err) {
    console.error("Error updating question:", err);
    alert("Something went wrong.");
  }
}


  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading question...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <div className="flex flex-col items-center justify-center mt-6 pt-8">
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

        <div className="bg-card rounded-xl shadow lg:min-w-[900px] px-12 py-10 pb-24 mt-6 border border-border">
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

          {/* Options input - dynamic based on options length */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {Object.entries(question.options).map(([label, value]) => (
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
                  value={value}
                  onChange={(e) => handleOptionChange(label, e.target.value)}
                  style={{ color: "var(--tw-text-primary)" }}
                />
                <input
                  type="radio"
                  name="correct"
                  checked={question.correct_answer === label}
                  onChange={() => handleAnswerChange(label)}
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
