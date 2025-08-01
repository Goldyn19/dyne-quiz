"use client";
import { useState, useRef, useEffect } from "react";
import { AppNavigation } from "@/components/custom/app-navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@radix-ui/react-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";


type Quiz = {
  id: number;
  name: string;
  description: string;
  questions: number;
  created_by_username: string;
  tags: string[];
  modes: string[];
  popularity: number;
  difficulty: string;
  date: string;
};

type Question = {
  id: number;
  text: string;
  quiz?: string;
  options: object;
  correct_answer: string;
  image?: string;
  created_by_username: string;
};

const mockQuizzes: Quiz[] = [
  {
    id: 1,
    name: "General Knowledge",
    description: "A fun quiz to test your general knowledge.",
    questions: 20,
    created_by_username: "Alice",
    tags: ["General", "Fun"],
    modes: ["Classic", "Team"],
    popularity: 120,
    difficulty: "Easy",
    date: "2024-05-01",
  },
  {
    id: 2,
    name: "Science Trivia",
    description: "Challenge your science smarts!",
    questions: 15,
    created_by_username: "Bob",
    tags: ["Science"],
    modes: ["Classic", "Accuracy"],
    popularity: 80,
    difficulty: "Medium",
    date: "2024-04-20",
  },
  // Add more quizzes as needed
];

const mockSessions = [
  {
    id: 1,
    quiz: "General Knowledge",
    host: "Alice",
    pin: "123456",
    players: 5,
    status: "Live",
  },
  {
    id: 2,
    quiz: "Science Trivia",
    host: "Bob",
    pin: "654321",
    players: 3,
    status: "Live",
  },
];

const gameModeInfo: { [key: string]: string } = {
  Classic: "Standard quiz mode",
  Team: "Play in teams",
  Accuracy: "Points for correct answers only",
};

const sortOptions = [
  { value: "date", label: "Date" },
  { value: "popularity", label: "Popularity" },
  { value: "difficulty", label: "Difficulty" },
];


export default function QuizPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [filter, setFilter] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({ open: false, title: "", description: "" });
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const quizTitleRef = useRef<HTMLInputElement>(null);
  const [joinPin, setJoinPin] = useState("");
  const [questionSearch, setQuestionSearch] = useState("");
  const [questionPage, setQuestionPage] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const QUESTIONS_PER_PAGE = 6;

  const { data: session } = useSession();

  // fetch question from API
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

  // Filter and sort quizzes
  let quizzes = mockQuizzes.filter(
    (q) =>
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
      q.created_by_username.toLowerCase().includes(search.toLowerCase())
  );
  if (filter) quizzes = quizzes.filter((q) => q.tags.includes(filter));
  if (sort === "date")
    quizzes = quizzes.sort((a, b) => b.date.localeCompare(a.date));
  if (sort === "popularity")
    quizzes = quizzes.sort((a, b) => b.popularity - a.popularity);
  if (sort === "difficulty")
    quizzes = quizzes.sort((a, b) => a.difficulty.localeCompare(b.difficulty));

  // Filter questions
  const filteredQuestions = questions.filter(
    (q) =>
      q.text.toLowerCase().includes(questionSearch.toLowerCase()) ||
      (q.quiz && q.quiz.toLowerCase().includes(questionSearch.toLowerCase())) ||
      q.created_by_username.toLowerCase().includes(questionSearch.toLowerCase())
  );
  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const paginatedQuestions = questions.slice(
    (questionPage - 1) * QUESTIONS_PER_PAGE,
    questionPage * QUESTIONS_PER_PAGE
  );

  // Quiz Details Modal
  function QuizDetailsModal() {
    if (!selectedQuiz) return null;
    return (
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-lg w-full bg-card rounded-xl  p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">{selectedQuiz.name}</h2>
            {/* <button onClick={() => setShowDetails(false)} className="text-muted-foreground text-xl">×</button> */}
          </div>
          <p className="mb-4 text-muted-foreground">
            {selectedQuiz.description}
          </p>
          <div className="mb-4">
            <div className="font-semibold mb-1">Game Modes</div>
            <div className="flex gap-2 mb-2">
              {selectedQuiz.modes.map((mode) => (
                <Badge key={mode} variant="secondary">
                  {mode}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-1">Questions</div>
            <ul className="list-disc pl-5 text-sm text-muted-foreground max-h-32 overflow-auto">
              {questions
                .filter((q) => q.quiz === selectedQuiz.name)
                .map((q) => (
                  <li key={q.id}>{q.text}</li>
                ))}
            </ul>
          </div>
          <div className="flex gap-2  mt-6">
            <Button
              onClick={() => {
                setShowStart(true);
                setShowDetails(false);
              }}
            >
              Start Session
            </Button>
            <Button variant="outline">Edit Quiz</Button>
            <Button variant="destructive">Delete Quiz</Button>
            {/* <Button variant="ghost" onClick={() => setShowDetails(false)}>Close</Button> */}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Quiz Creation Modal (as pop-up)
  function QuizCreateModal() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    function handleCreate(close: () => void) {
      close();
      setToast({
        open: true,
        title: "Quiz Created",
        description: `Quiz "${title}" was created.`,
      });
      setTitle("");
      setDesc("");
    }
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-12 text-lg font-semibold"
            onClick={() => {}}
          >
            Create New Quiz
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg w-full bg-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">Create New Quiz</h2>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Title</label>
            <input
              ref={quizTitleRef}
              className="w-full border rounded px-3 py-2 mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2 mb-2"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-6">
            <DialogTrigger asChild>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleCreate(() => {});
                }}
              >
                Create
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogTrigger>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Start Session Modal
  function StartSessionModal() {
    const [mode, setMode] = useState("Classic");
    const [timer, setTimer] = useState(30);
    const [teamSize, setTeamSize] = useState(2);
    const [showPin, setShowPin] = useState(false);
    const sessionPin = "123456";
    function handleStart() {
      setShowPin(true);
      setToast({
        open: true,
        title: "Session Started",
        description: `Session PIN: ${sessionPin}`,
      });
    }
    return (
      <Dialog open={showStart} onOpenChange={setShowStart}>
        <DialogContent className="max-w-lg w-full bg-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">Start Game Session</h2>
            <button
              onClick={() => setShowStart(false)}
              className="text-muted-foreground text-xl"
            >
              ×
            </button>
          </div>
          {!showPin ? (
            <div>
              <label className="block font-medium mb-1">Game Mode</label>
              <select
                className="w-full border rounded px-3 py-2 mb-2"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="Classic">Classic</option>
                <option value="Team">Team</option>
                <option value="Accuracy">Accuracy</option>
              </select>
              <label className="block font-medium mb-1">
                Timer per question (seconds)
              </label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 mb-2"
                value={timer}
                onChange={(e) => setTimer(Number(e.target.value))}
                min={5}
                max={120}
              />
              {mode === "Team" && (
                <>
                  <label className="block font-medium mb-1">Team Size</label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2 mb-2"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    min={2}
                    max={10}
                  />
                </>
              )}
              <div className="flex gap-2 mt-6">
                <Button onClick={handleStart}>Start Session</Button>
                <Button variant="ghost" onClick={() => setShowStart(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 mt-4">
              <div className="text-lg font-semibold">Session PIN</div>
              <div className="text-3xl font-bold bg-muted px-8 py-4 rounded-lg">
                {sessionPin}
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(sessionPin);
                  setToast({
                    open: true,
                    title: "PIN Copied",
                    description: sessionPin,
                  });
                }}
              >
                Copy PIN
              </Button>
              <Button variant="ghost" onClick={() => setShowStart(false)}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <ToastProvider swipeDirection="right">
      <AppNavigation />
      <main className="pt-20 max-w-7xl mx-auto px-2 sm:px-4 w-full overflow-x-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 w-full">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-foreground mb-1">
              Available Quizzes
            </h1>
            <p className="text-muted-foreground">
              Browse, create, and join quizzes. Filter by category, creator, or
              game mode.
            </p>
          </div>
          <QuizCreateModal />
        </div>
        {/* Search, Sort, Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center w-full">
          <input
            type="text"
            placeholder="Search quizzes..."
            className="border border-border rounded-lg px-4 py-2 w-full sm:w-72 bg-card text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search quizzes"
          />
          <select
            className="border border-border rounded-lg px-4 py-2 bg-card text-base w-full sm:w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort quizzes"
          >
            {sortOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
              >{`Sort by ${opt.label}`}</option>
            ))}
          </select>
          <select
            className="border border-border rounded-lg px-4 py-2 bg-card text-base w-full sm:w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter quizzes"
          >
            <option value="">All Categories</option>
            {[...new Set(mockQuizzes.flatMap((q) => q.tags))].map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        {/* Quiz Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full">
          {quizzes.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-16">
              <div className="mb-4">No quizzes found.</div>
              <QuizCreateModal />
            </div>
          )}
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-card border border-border rounded-xl shadow-sm p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow group cursor-pointer w-full min-w-0"
              tabIndex={0}
              aria-label={`View details for ${quiz.name}`}
              onClick={() => {
                setSelectedQuiz(quiz);
                setShowDetails(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSelectedQuiz(quiz);
                  setShowDetails(true);
                }
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {quiz.name}
                </h2>
                <div className="flex gap-1">
                  {quiz.modes.map((mode) => (
                    <Badge
                      key={mode}
                      variant="secondary"
                      className="text-xs cursor-help"
                      title={gameModeInfo[mode] || mode}
                    >
                      {mode}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-muted-foreground text-sm mb-2 line-clamp-2">
                {quiz.description}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span>{quiz.questions} Questions</span>
                <span>•</span>
                <span>By {quiz.created_by_username}</span>
                <span>•</span>
                <span>{quiz.difficulty}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {quiz.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-auto">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedQuiz(quiz);
                    setShowStart(true);
                  }}
                >
                  Start
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation(); /* join logic */
                  }}
                >
                  Join
                </Button>
                <Link href={`/quiz/${quiz.id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a>Edit</a>
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    /* delete logic */ setToast({
                      open: true,
                      title: "Quiz Deleted",
                      description: quiz.name,
                    });
                  }}
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedQuiz(quiz);
                    setShowDetails(true);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* Live Sessions Section */}
        <div className="bg-card border border-border rounded-xl p-4 mb-12 w-full overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-foreground">Live Sessions</h2>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Join by PIN"
                className="border border-border rounded-lg px-4 py-2 bg-background text-base w-40"
                value={joinPin}
                onChange={(e) => setJoinPin(e.target.value)}
                aria-label="Join by PIN"
              />
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => {
                  /* join by pin logic */
                }}
              >
                Join
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-[600px] divide-y divide-border w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Quiz
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Host
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    PIN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Players
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockSessions.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-muted-foreground"
                    >
                      No live sessions.
                    </td>
                  </tr>
                )}
                {mockSessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {session.quiz}
                    </td>
                    <td className="px-6 py-4">{session.host}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <span>{session.pin}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          navigator.clipboard.writeText(session.pin);
                        }}
                        aria-label="Copy PIN"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </td>
                    <td className="px-6 py-4">{session.players}</td>
                    <td className="px-6 py-4">{session.status}</td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Organization Question Bank Section */}
        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12 w-full overflow-x-auto shadow-md">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Organization Question Bank
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search questions..."
                value={questionSearch}
                onChange={(e) => {
                  setQuestionSearch(e.target.value);
                  setQuestionPage(1);
                }}
                aria-label="Search questions"
                className="border border-border rounded-lg px-4 py-2 bg-background text-sm w-full sm:w-72"
              />

              <Link href="/questions/new-question">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                  + Create Question
                </Button>
              </Link>
            </div>
          </div>

          {/* Questions List */}
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {paginatedQuestions.length === 0 ? (
              <div className="text-center text-muted-foreground py-16 col-span-full">
                No questions found.
              </div>
            ) : (
              paginatedQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-background border border-border rounded-xl p-4 flex flex-col gap-2 shadow-sm h-full"
                >
                  <img
                    src={q.image || "/default.jpg"}
                    alt="Question illustration"
                    className="max-h-48 object-contain rounded-lg mb-2"
                  />
                  <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground">
                    <span>{q.quiz}</span>
                  </div>
                  <p className="text-base text-foreground line-clamp-3">
                    {q.text}
                  </p>
                  {/* ✅ Display Options */}
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
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                size="sm"
                variant="outline"
                disabled={questionPage === 1}
                onClick={() => setQuestionPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {questionPage} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={questionPage === totalPages}
                onClick={() =>
                  setQuestionPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Next
              </Button>
            </div>
          )}

          {/* Start Game Button */}
          <div className="flex justify-end mt-10">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-lg font-semibold"
              onClick={() => {
                // open start game session modal
              }}
            >
              Start New Game Session
            </Button>
          </div>
        </section>

        {/* Modals for Create, Details, Start Session, etc. would go here */}
        {/* Quiz Details Modal */}
        {showDetails && <QuizDetailsModal />}
        {/* Start Session Modal */}
        {showStart && <StartSessionModal />}
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
      </main>
    </ToastProvider>
  );
}
