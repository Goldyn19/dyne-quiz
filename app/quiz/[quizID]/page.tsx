"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppNavigation } from "@/components/custom/app-navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ToastProvider, Toast, ToastTitle, ToastDescription } from "@radix-ui/react-toast";
import { ChevronLeft, Trash2, Edit, Eye, Play, Plus, Copy } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

// Mock data
const mockQuizzes = [
  { id: "1", name: "General Knowledge", description: "A fun quiz to test your general knowledge.", tags: ["General", "Fun"], createdBy: { name: "Alice", avatar: "/avatar1.jpg" }, questions: [1, 2], modes: ["Classic", "Team"] },
  { id: "2", name: "Science Trivia", description: "Challenge your science smarts!", tags: ["Science"], createdBy: { name: "Bob", avatar: "/avatar1.jpg" }, questions: [3], modes: ["Classic", "Accuracy"] },
];
const mockQuestions = [
  { id: 1, text: "What is the capital of France?", image: null, options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris", tags: ["Geography"] },
  { id: 2, text: "What is H2O?", image: null, options: ["Water", "Oxygen", "Hydrogen", "Salt"], answer: "Water", tags: ["Science"] },
  { id: 3, text: "Who wrote Hamlet?", image: null, options: ["Shakespeare", "Dickens", "Austen", "Hemingway"], answer: "Shakespeare", tags: ["Literature"] },
  { id: 4, text: "What is the largest planet in our solar system?", image: null, options: ["Earth", "Jupiter", "Mars", "Venus"], answer: "Jupiter", tags: ["Science"] },
  { id: 5, text: "What is the boiling point of water?", image: null, options: ["100°C", "0°C", "50°C", "200°C"], answer: "100°C", tags: ["Science"] },
  { id: 6, text: "What is the capital of Japan?", image: null, options: ["Tokyo", "Kyoto", "Osaka", "Nagoya"], answer: "Tokyo", tags: ["Geography"] },
];
const mockSessions = [
  { id: 1, pin: "ABC123", status: "Active", mode: "Classic", started: "2024-06-01", analytics: true },
  { id: 2, pin: "XYZ789", status: "Completed", mode: "Team", started: "2024-05-28", analytics: true },
];
const gameModeDescriptions: { [key: string]: string } = {
  Classic: "Standard quiz mode. Players answer questions individually. Points for correct answers.",
  Team: "Players are split into teams. Team with most correct answers wins.",
  Accuracy: "Points only for correct answers. No partial credit.",
};

export default function EditQuizPage() {
  const { quizID } = useParams();
  const router = useRouter();
  const quiz = mockQuizzes.find((q) => q.id === quizID) || mockQuizzes[0];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [name, setName] = useState(quiz.name);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [description, setDescription] = useState(quiz.description);
  const [quizQuestions, setQuizQuestions] = useState<number[]>(quiz.questions);
  const [search, setSearch] = useState("");
  const [showSession, setShowSession] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; title: string; description: string }>({ open: false, title: '', description: '' });
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const [mode, setMode] = useState(quiz.modes[0]);
  const [timer, setTimer] = useState(30);
  const [teamSize, setTeamSize] = useState(4);
  const [showPin, setShowPin] = useState(false);
  const sessionPin = "ABC123";
  const QUESTIONS_PER_PAGE = 4;
  const [questionPage, setQuestionPage] = useState(1);

  // Questions in this quiz
  const currentQuestions = mockQuestions.filter((q) => quizQuestions.includes(q.id));
  const totalQuestionPages = Math.ceil(currentQuestions.length / QUESTIONS_PER_PAGE);
  const paginatedQuestions = currentQuestions.slice((questionPage - 1) * QUESTIONS_PER_PAGE, questionPage * QUESTIONS_PER_PAGE);
  // Questions not in this quiz
  const availableQuestions = mockQuestions.filter(
    (q) => !quizQuestions.includes(q.id) && (q.text.toLowerCase().includes(search.toLowerCase()) || q.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
  );

  function handleAddQuestion(id: number) {
    setQuizQuestions((prev) => [...prev, id]);
  }
  function handleRemoveQuestion(id: number) {
    setQuizQuestions((prev) => prev.filter((qid) => qid !== id));
  }
  function handleSave() {
    setToast({ open: true, title: "Quiz Updated", description: "Quiz details saved." });
  }
  function handleDelete() {
    setConfirmDelete(false);
    setToast({ open: true, title: "Quiz Deleted", description: name });
    router.push("/quiz");
  }
  function handleStartSession() {
    setShowSession(false);
    setShowPin(true);
    setToast({ open: true, title: "Session Started", description: `Session PIN: ${sessionPin}` });
  }

  useEffect(() => { setQuestionPage(1); }, [quizQuestions.length]);

  return (
    <ToastProvider swipeDirection="right">
      <AppNavigation />
      <div className="pt-20 max-w-7xl mx-auto px-2 sm:px-4 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Button variant="ghost" size="icon" onClick={() => router.push('/quiz')} aria-label="Back to Quizzes">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="cursor-pointer" onClick={() => router.push('/quiz')}>Quizzes</span>
          <span>/</span>
          <span className="text-foreground font-semibold">{name}</span>
        </div>
        {/* Responsive two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Quiz Overview & Actions */}
          <div className="flex-1 min-w-0">
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h1 className="text-3xl font-bold mb-1">{name}</h1>
                <div className="flex gap-2 flex-wrap">
                  {quiz.modes.map((m) => (
                    <Badge key={m} variant="secondary" className="flex items-center gap-1">
                      {m === "Classic" && <Play className="w-4 h-4" />} 
                      {m === "Team" && <UsersIcon className="w-4 h-4" />} 
                      {m === "Accuracy" && <Eye className="w-4 h-4" />} 
                      {m}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-2">{description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {quiz.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <img src={quiz.createdBy.avatar} alt={quiz.createdBy.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm">By {quiz.createdBy.name}</span>
                <span className="text-xs text-muted-foreground">• {currentQuestions.length} Questions</span>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button onClick={() => setShowSession(true)}><Play className="w-4 h-4 mr-1" /> Start Session</Button>
                <Button variant="outline" onClick={handleSave}><Edit className="w-4 h-4 mr-1" /> Save</Button>
                <Button variant="outline" onClick={() => router.push(`/quiz/${quizID}/preview`)}><Eye className="w-4 h-4 mr-1" /> Preview</Button>
                <Button variant="destructive" onClick={() => setConfirmDelete(true)}><Trash2 className="w-4 h-4 mr-1" /> Delete</Button>
              </div>
            </div>
            {/* Game Mode Details */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-2">Game Modes</h2>
              <div className="space-y-3">
                {quiz.modes.map((m) => (
                  <div key={m} className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-1">{m}</Badge>
                    <span className="text-sm text-muted-foreground">{gameModeDescriptions[m]}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Session Management */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-2">Recent Sessions</h2>
              <div className="flex flex-col gap-3">
                {mockSessions.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 bg-muted rounded px-4 py-2">
                    <span className="font-semibold">{s.status}</span>
                    <span className="text-xs text-muted-foreground">Mode: {s.mode}</span>
                    <span className="text-xs text-muted-foreground">PIN: {s.pin}</span>
                    <Button size="sm" variant="outline">View Analytics</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Questions List */}
          <div className="flex-1 min-w-0">
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Questions</h2>
                <Dialog>
                  <Link href="/questions" passHref legacyBehavior>
                    <Button size="sm" variant="outline" asChild><a><Plus className="w-4 h-4 mr-1" /> Add Question</a></Button>
                  </Link>
                  <DialogContent className="max-w-lg w-full bg-card rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-2">Add Question from Bank</h3>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2 mb-3"
                      placeholder="Search questions..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="flex flex-col gap-3 max-h-64 overflow-auto">
                      {availableQuestions.length === 0 && <div className="text-muted-foreground">No questions found.</div>}
                      {availableQuestions.map((q) => (
                        <div key={q.id} className="flex items-center gap-2 bg-card border border-border rounded px-4 py-2">
                          <span className="flex-1">{q.text}</span>
                          <div className="flex gap-1">
                            {q.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                          <Button size="sm" onClick={() => handleAddQuestion(q.id)}>
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {/* Questions Accordion/List */}
              <div className="flex flex-col gap-4">
                {paginatedQuestions.length === 0 && <div className="text-muted-foreground mb-4">No questions in this quiz.</div>}
                {paginatedQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-muted rounded px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{(questionPage - 1) * QUESTIONS_PER_PAGE + idx + 1}. {q.text}</span>
                      <div className="flex gap-2">
                        <Link href={`/questions?edit=${(questionPage - 1) * QUESTIONS_PER_PAGE + idx}`} passHref legacyBehavior>
                          <Button size="sm" variant="outline" asChild><a><Edit className="w-4 h-4" /></a></Button>
                        </Link>
                        <Button size="sm" variant="destructive" onClick={() => handleRemoveQuestion(q.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    {q.image && <img src={q.image} alt="Question" className="w-full max-h-40 object-cover rounded mb-2" />}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {q.options.map((opt) => (
                        <span key={opt} className="px-2 py-1 bg-background border border-border rounded text-xs">{opt}</span>
                      ))}
                    </div>
                      <div className="text-xs text-primary font-semibold">Correct: {q.answer}</div>
                  </div>
                ))}
              </div>
              {/* Pagination Controls */}
              {totalQuestionPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button size="sm" variant="outline" disabled={questionPage === 1} onClick={() => setQuestionPage(p => Math.max(1, p - 1))}>
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">Page {questionPage} of {totalQuestionPages}</span>
                  <Button size="sm" variant="outline" disabled={questionPage === totalQuestionPages} onClick={() => setQuestionPage(p => Math.min(totalQuestionPages, p + 1))}>
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Start Session Modal */}
        <Dialog open={showSession} onOpenChange={setShowSession}>
          <DialogContent className="max-w-lg w-full bg-card rounded-xl p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">Start Game Session</h2>
              <button onClick={() => setShowSession(false)} className="text-muted-foreground text-xl">×</button>
            </div>
            <label className="block font-medium mb-1">Game Mode</label>
            <select className="w-full border rounded px-3 py-2 mb-2" value={mode} onChange={e => setMode(e.target.value)}>
              {quiz.modes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <label className="block font-medium mb-1">Timer per question (seconds)</label>
            <input type="number" className="w-full border rounded px-3 py-2 mb-2" value={timer} onChange={e => setTimer(Number(e.target.value))} min={5} max={120} />
            {mode === 'Team' && (
              <>
                <label className="block font-medium mb-1">Team Size</label>
                <input type="number" className="w-full border rounded px-3 py-2 mb-2" value={teamSize} onChange={e => setTeamSize(Number(e.target.value))} min={2} max={10} />
              </>
            )}
            <div className="flex gap-2 mt-6">
              <Button onClick={handleStartSession}>Start Session</Button>
              <Button variant="ghost" onClick={() => setShowSession(false)}>Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Session PIN Modal */}
        <Dialog open={showPin} onOpenChange={setShowPin}>
          <DialogContent className="max-w-sm w-full bg-card rounded-xl p-6 flex flex-col items-center gap-4">
            <div className="text-lg font-semibold">Session PIN</div>
            <div className="text-3xl font-bold bg-muted px-8 py-4 rounded-lg">{sessionPin}</div>
            <Button onClick={() => {navigator.clipboard.writeText(sessionPin); setToast({ open: true, title: 'PIN Copied', description: sessionPin });}}><Copy className="w-4 h-4 mr-1" /> Copy PIN</Button>
            <Button variant="ghost" onClick={() => setShowPin(false)}>Close</Button>
          </DialogContent>
        </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
          <DialogContent className="max-w-sm w-full bg-card rounded-xl p-6">
            <div className="text-lg font-semibold mb-4">Are you sure you want to delete this quiz?</div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setConfirmDelete(false)}>Cancel</Button>
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

// Icon for Team mode
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UsersIcon(props: any) {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m9-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
    </svg>
  );
} 