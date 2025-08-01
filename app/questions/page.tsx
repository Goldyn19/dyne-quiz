"use client";
import { useState, useEffect } from "react";
import { AppNavigation } from "@/components/custom/app-navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@radix-ui/react-toast";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Mock data
const quizzes = [
  { id: 1, name: "Math" },
  { id: 2, name: "Literature" },
  { id: 3, name: "Science" },
];

type Question = {
  id: number;
  text: string;
  quiz?: string;
  options: object;
  correct_answer: string;
  image?: string;
  created_by_username: string;
};

const QUESTIONS_PER_PAGE = 6;

export default function OrganizationQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [filterQuiz, setFilterQuiz] = useState("");
  const [page, setPage] = useState(1);

  const { data: session } = useSession();

  const [showDelete, setShowDelete] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({ open: false, title: "", description: "" });

  // Filter, sort, and paginate
  // let filtered = questions.filter(
  //   (q) =>
  //     (q.text.toLowerCase().includes(search.toLowerCase()) ||
  //       q.tags.some((tag) =>
  //         tag.toLowerCase().includes(search.toLowerCase())
  //       )) &&
  //     (!filterQuiz || String(q.quiz) === filterQuiz)
  // );
  // if (sort === "date")
  //   filtered = filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const paginated = questions.slice(
    (page - 1) * QUESTIONS_PER_PAGE,
    page * QUESTIONS_PER_PAGE
  );

  function handleDelete() {
    if (deleteIdx !== null) {
      setQuestions((qs) => qs.filter((_, i) => i !== deleteIdx));
      setToast({ open: true, title: "Question Deleted", description: "" });
      setShowDelete(false);
    }
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        console.log("Fetched questions:", data);
        setQuestions(data);
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
      console.log("Fetching questions...");
      // Here you would typically fetch from an API
    };
    fetchQuestions();
  }, [session]);

  return (
    <ToastProvider swipeDirection="right">
      <AppNavigation />
      <div className="pt-20 max-w-6xl mx-auto px-2 sm:px-4 w-full">
        {/* Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-foreground">
              All Questions
            </h1>
            <p className="text-muted-foreground">
              View, create, edit, and delete questions for your organization.
            </p>
          </div>
          <Link href="/questions/new-question">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Plus className="w-4 h-4 mr-1" /> Add New Question
            </Button>
          </Link>
        </div>
        {/* Search, Filter, Sort */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6 items-center">
          <input
            type="text"
            className="border border-border rounded-lg px-4 py-2 w-full sm:w-72 bg-card text-base"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            aria-label="Search questions"
          />
          <select
            className="border border-border rounded-lg px-4 py-2 bg-card text-base"
            value={filterQuiz}
            onChange={(e) => {
              setFilterQuiz(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by quiz"
          >
            <option value="">All Quizzes</option>
            {quizzes.map((qz) => (
              <option key={qz.id} value={qz.id}>
                {qz.name}
              </option>
            ))}
          </select>
          <select
            className="border border-border rounded-lg px-4 py-2 bg-card text-base"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort questions"
          >
            <option value="date">Sort by Date</option>
            <option value="text">Sort by Text</option>
          </select>
        </div>
        {/* Questions Grid */}
        {/* Questions List */}
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {paginated.length === 0 ? (
            <div className="text-center text-muted-foreground py-16 col-span-full">
              No questions found.
            </div>
          ) : (
            paginated.map((q) => (
              <div
                key={q.id}
                className="bg-background border border-border rounded-xl p-4 flex flex-col gap-2 shadow-sm h-full"
              >
                <img
                  src={typeof q.image === "string" ? q.image : "/default.jpg"}
                  alt="Question illustration"
                  className="max-h-48 object-contain rounded-lg mb-2"
                />
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground">
                  <span>{q.quiz}</span>
                </div>
                <p className="text-base text-foreground line-clamp-3">
                  {q.text}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {Object.entries(q.options).map(([key, value]) => (
                    <div
                      key={key}
                      className={`text-sm px-4 py-3 rounded-md border transition-all duration-200 ${
                        key === q.correct_answer
                          ? "border-green-500 bg-green-50 text-green-700 font-semibold"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      <span className="font-bold mr-2">{key}.</span> {value}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  By {q.created_by_username}
                </span>
                <div className="flex gap-3 mt-auto">
                  <Link href={`/questions/${q.id}`}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setDeleteIdx(questions.indexOf(q));
                      setShowDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-12">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
        {/* Preview Modal */}

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDelete} onOpenChange={setShowDelete}>
          <DialogContent className="max-w-sm w-full bg-card rounded-xl p-6">
            <div className="text-lg font-semibold mb-4">
              Are you sure you want to delete this question?
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowDelete(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Toast */}
        <Toast
          open={toast.open}
          onOpenChange={(open) => setToast((t) => ({ ...t, open }))}
          duration={3000}
          className="bg-card border border-border rounded-xl p-4"
        >
          <ToastTitle>{toast.title}</ToastTitle>
          <ToastDescription>{toast.description}</ToastDescription>
        </Toast>
      </div>
    </ToastProvider>
  );
}
