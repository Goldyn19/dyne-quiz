"use client";
import { useState } from "react";
import { AppNavigation } from "@/components/custom/app-navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ToastProvider, Toast, ToastTitle, ToastDescription } from "@radix-ui/react-toast";
import { Edit, Trash2, Eye, Plus, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

// Mock data
const quizzes = [
  { id: 1, name: "Math" },
  { id: 2, name: "Literature" },
  { id: 3, name: "Science" },
];
const initialQuestions = [
  { id: 1, text: "What is 2+2?", options: ["3", "4", "5", "6"], answer: "4", tags: ["Math"], quiz: 1, image: null, createdBy: "Alice", createdAt: "2024-06-01" },
  { id: 2, text: "Who wrote Hamlet?", options: ["Shakespeare", "Dickens", "Austen", "Hemingway"], answer: "Shakespeare", tags: ["Literature"], quiz: 2, image: null, createdBy: "Bob", createdAt: "2024-06-02" },
  { id: 3, text: "What is H2O?", options: ["Water", "Oxygen", "Hydrogen", "Salt"], answer: "Water", tags: ["Science"], quiz: 3, image: null, createdBy: "Alice", createdAt: "2024-06-03" },
];

const QUESTIONS_PER_PAGE = 6;

export default function OrganizationQuestionsPage() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [filterQuiz, setFilterQuiz] = useState("");
  const [page, setPage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [toast, setToast] = useState<{ open: boolean; title: string; description: string }>({ open: false, title: '', description: '' });

  // Filter, sort, and paginate
  let filtered = questions.filter(q =>
    (q.text.toLowerCase().includes(search.toLowerCase()) || q.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))) &&
    (!filterQuiz || String(q.quiz) === filterQuiz)
  );
  if (sort === "date") filtered = filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const totalPages = Math.ceil(filtered.length / QUESTIONS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * QUESTIONS_PER_PAGE, page * QUESTIONS_PER_PAGE);

  function openPreview(idx: number) {
    setPreviewIdx(idx);
    setShowPreview(true);
  }
  function handleDelete() {
    if (deleteIdx !== null) {
      setQuestions(qs => qs.filter((_, i) => i !== deleteIdx));
      setToast({ open: true, title: "Question Deleted", description: "" });
      setShowDelete(false);
    }
  }

  return (
    <ToastProvider swipeDirection="right">
      <AppNavigation />
      <div className="pt-20 max-w-6xl mx-auto px-2 sm:px-4 w-full">
        {/* Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-foreground">All Questions</h1>
            <p className="text-muted-foreground">View, create, edit, and delete questions for your organization.</p>
          </div>
          <Link href="/questions/new-question" >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"><Plus className="w-4 h-4 mr-1" /> Add New Question</Button>
          </Link>
        </div>
        {/* Search, Filter, Sort */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6 items-center">
          <input
            type="text"
            className="border border-border rounded-lg px-4 py-2 w-full sm:w-72 bg-card text-base"
            placeholder="Search questions..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            aria-label="Search questions"
          />
          <select
            className="border border-border rounded-lg px-4 py-2 bg-card text-base"
            value={filterQuiz}
            onChange={e => { setFilterQuiz(e.target.value); setPage(1); }}
            aria-label="Filter by quiz"
          >
            <option value="">All Quizzes</option>
            {quizzes.map(qz => (
              <option key={qz.id} value={qz.id}>{qz.name}</option>
            ))}
          </select>
          <select
            className="border border-border rounded-lg px-4 py-2 bg-card text-base"
            value={sort}
            onChange={e => setSort(e.target.value)}
            aria-label="Sort questions"
          >
            <option value="date">Sort by Date</option>
            <option value="text">Sort by Text</option>
          </select>
        </div>
        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginated.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-16">
              <div className="mb-4">No questions found.</div>
            </div>
          )}
          {paginated.map((q, idx) => (
            <div key={q.id} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-lg transition-shadow group cursor-pointer" tabIndex={0} aria-label={`Preview question: ${q.text}`}
              onClick={() => openPreview((page - 1) * QUESTIONS_PER_PAGE + idx)}
              onKeyDown={e => { if (e.key === 'Enter') openPreview((page - 1) * QUESTIONS_PER_PAGE + idx); }}
            >
              <div className="flex items-center gap-3 mb-2">
                {q.image ? (
                  <img src={typeof q.image === 'string' ? q.image : URL.createObjectURL(q.image)} alt="Question" className="w-16 h-16 object-cover rounded bg-muted" />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded bg-muted text-muted-foreground"><ImageIcon className="w-8 h-8" /></div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base text-foreground truncate">{q.text}</div>
                  <div className="text-xs text-muted-foreground truncate">Quiz: {quizzes.find(quiz => quiz.id === q.quiz)?.name || "-"}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-1">
                {q.options.slice(0, 3).map((opt, i) => (
                  <span key={i} className="px-2 py-1 rounded text-xs border bg-background border-border text-foreground">{opt}</span>
                ))}
                {q.options.length > 3 && <span className="text-xs text-muted-foreground">+{q.options.length - 3} more</span>}
              </div>
              <div className="flex flex-wrap gap-2 mb-1">
                {q.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>By {q.createdBy}</span>
                <span>•</span>
                <span>{q.createdAt}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Link href={`/questions/${q.id}`} passHref legacyBehavior>
                  <Button size="sm" variant="outline" asChild><a><Edit className="w-4 h-4" /></a></Button>
                </Link>
                <Button size="sm" variant="destructive" onClick={e => { e.stopPropagation(); setDeleteIdx((page - 1) * QUESTIONS_PER_PAGE + idx); setShowDelete(true); }}><Trash2 className="w-4 h-4" /></Button>
                <Button size="sm" variant="ghost" onClick={e => { e.stopPropagation(); openPreview((page - 1) * QUESTIONS_PER_PAGE + idx); }}><Eye className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-12">
            <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
              Next
            </Button>
          </div>
        )}
        {/* Preview Modal */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-lg w-full bg-card rounded-xl p-6">
            {previewIdx !== null && (
              <>
                <div className="flex items-center gap-4 mb-4">
                  {filtered[previewIdx]?.image ? (
                    <img src={typeof filtered[previewIdx].image === 'string' ? filtered[previewIdx].image : URL.createObjectURL(filtered[previewIdx].image)} alt="Question" className="w-32 h-32 object-cover rounded bg-muted" />
                  ) : (
                    <div className="w-32 h-32 flex items-center justify-center rounded bg-muted text-muted-foreground"><ImageIcon className="w-12 h-12" /></div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-lg text-foreground mb-1">{filtered[previewIdx].text}</div>
                    <div className="text-xs text-muted-foreground mb-1">Quiz: {quizzes.find(quiz => quiz.id === filtered[previewIdx].quiz)?.name || "-"}</div>
                    <div className="flex flex-wrap gap-2 mb-1">
                      {filtered[previewIdx].tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">By {filtered[previewIdx].createdBy} • {filtered[previewIdx].createdAt}</div>
                  </div>
                </div>
                <div className="mb-4">
                  {filtered[previewIdx].options.map((opt, i) => (
                    <div key={i} className={`px-3 py-2 rounded mb-2 ${opt === filtered[previewIdx].answer ? 'bg-primary text-primary-foreground font-semibold' : 'bg-muted text-foreground'}`}>{opt}</div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <Link href={`/quiz/1/preview?edit=${filtered[previewIdx].id}`} passHref legacyBehavior>
                    <Button size="sm" variant="outline" asChild><a><Edit className="w-4 h-4" /></a></Button>
                  </Link>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteIdx(previewIdx); setShowDelete(true); setShowPreview(false); }}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog open={showDelete} onOpenChange={setShowDelete}>
          <DialogContent className="max-w-sm w-full bg-card rounded-xl p-6">
            <div className="text-lg font-semibold mb-4">Are you sure you want to delete this question?</div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Toast */}
        <Toast open={toast.open} onOpenChange={open => setToast(t => ({ ...t, open }))} duration={3000} className="bg-card border border-border rounded-xl p-4">
          <ToastTitle>{toast.title}</ToastTitle>
          <ToastDescription>{toast.description}</ToastDescription>
        </Toast>
      </div>
    </ToastProvider>
  );
} 