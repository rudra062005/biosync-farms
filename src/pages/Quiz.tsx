import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Shield, CheckCircle, XCircle, Award, 
  BookOpen, Clock, TrendingUp, Download, Video
} from "lucide-react";
import { toast } from "sonner";

interface QuizQuestion {
  id: string;
  type: "mcq_single" | "true_false";
  prompt: string;
  options?: { id: string; text: string }[];
  correct: string[];
  marks: number;
  remedialVideo?: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Sample quiz data
  const quiz = {
    id: "quiz_001",
    title: "Farm-level Disinfection Basics",
    description: "Test your knowledge on proper disinfection protocols for farm biosecurity",
    passThreshold: 70,
    totalMarks: 25,
    videoId: "vid_001",
    questions: [
      {
        id: "q1",
        type: "mcq_single" as const,
        prompt: "Which concentration of bleach is most effective for surface disinfection in farm facilities?",
        options: [
          { id: "a", text: "0.05% (500 ppm)" },
          { id: "b", text: "0.5% (5000 ppm)" },
          { id: "c", text: "5% (50000 ppm)" }
        ],
        correct: ["b"],
        marks: 5,
        remedialVideo: "vid_001"
      },
      {
        id: "q2",
        type: "true_false" as const,
        prompt: "Disinfection procedures are only necessary when animals show signs of illness.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" }
        ],
        correct: ["false"],
        marks: 5,
        remedialVideo: "vid_001"
      },
      {
        id: "q3",
        type: "mcq_single" as const,
        prompt: "How long should foot dips be maintained at farm entrances?",
        options: [
          { id: "a", text: "Once per week" },
          { id: "b", text: "Daily with fresh disinfectant" },
          { id: "c", text: "Only during outbreak periods" }
        ],
        correct: ["b"],
        marks: 5,
        remedialVideo: "vid_001"
      },
      {
        id: "q4",
        type: "mcq_single" as const,
        prompt: "What is the recommended contact time for most farm disinfectants to be effective?",
        options: [
          { id: "a", text: "30 seconds" },
          { id: "b", text: "5-10 minutes" },
          { id: "c", text: "30 minutes or more" }
        ],
        correct: ["b"],
        marks: 5,
        remedialVideo: "vid_001"
      },
      {
        id: "q5",
        type: "true_false" as const,
        prompt: "Organic matter (dirt, manure) can reduce the effectiveness of disinfectants.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" }
        ],
        correct: ["true"],
        marks: 5,
        remedialVideo: "vid_001"
      }
    ] as QuizQuestion[]
  };

  const totalQuestions = quiz.questions.length;
  const question = quiz.questions[currentQuestion];
  const progressPercentage = isSubmitted ? 100 : ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (!answers[question.id]) {
      toast.error("Please select an answer to continue");
      return;
    }
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    quiz.questions.forEach((q) => {
      const userAnswer = answers[q.id];
      if (q.correct.includes(userAnswer)) {
        totalScore += q.marks;
      }
    });
    return totalScore;
  };

  const handleSubmit = () => {
    if (!answers[question.id]) {
      toast.error("Please answer the current question");
      return;
    }

    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);

    const percentage = Math.round((finalScore / quiz.totalMarks) * 100);
    if (percentage >= quiz.passThreshold) {
      toast.success("Congratulations! You passed the quiz!");
    } else {
      toast.error("You didn't pass this time. Review the material and try again.");
    }
  };

  const getQuestionResult = (questionId: string) => {
    const q = quiz.questions.find(qu => qu.id === questionId);
    if (!q) return null;
    const userAnswer = answers[questionId];
    const isCorrect = q.correct.includes(userAnswer);
    return { isCorrect, correctAnswer: q.correct[0] };
  };

  if (isSubmitted) {
    const percentage = Math.round((score / quiz.totalMarks) * 100);
    const passed = percentage >= quiz.passThreshold;

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">BioSecure India</h1>
                <p className="text-xs text-muted-foreground">Quiz Results</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
          {/* Results Card */}
          <Card className={`border-2 ${passed ? "border-success/50 bg-success/5" : "border-warning/50 bg-warning/5"}`}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {passed ? (
                  <Award className="h-20 w-20 text-success" />
                ) : (
                  <BookOpen className="h-20 w-20 text-warning" />
                )}
              </div>
              <CardTitle className="text-3xl">
                {passed ? "Congratulations! 🎉" : "Keep Learning! 📚"}
              </CardTitle>
              <CardDescription className="text-lg">
                {passed 
                  ? "You've successfully completed the quiz!" 
                  : "Review the material and try again to pass"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-background">
                  <div className={`text-4xl font-bold ${passed ? "text-success" : "text-warning"}`}>
                    {percentage}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Your Score</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                  <div className="text-4xl font-bold text-primary">
                    {score}/{quiz.totalMarks}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Points Earned</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                  <div className="text-4xl font-bold text-accent">
                    {quiz.questions.filter(q => getQuestionResult(q.id)?.isCorrect).length}/{totalQuestions}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Correct Answers</p>
                </div>
              </div>

              {passed && (
                <div className="p-4 rounded-lg border border-success/30 bg-success/10 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-success shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-success">Badge Unlocked!</p>
                    <p className="text-sm text-muted-foreground">You've earned points toward your Silver badge</p>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                {passed ? (
                  <>
                    <Button variant="hero" className="flex-1" onClick={() => navigate("/learning")}>
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Continue Learning
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-5 w-5" />
                      Download Certificate
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="default" className="flex-1" onClick={() => navigate(`/video/${quiz.videoId}`)}>
                      <Video className="mr-2 h-5 w-5" />
                      Review Video
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
                      Retry Quiz
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card>
            <CardHeader>
              <CardTitle>Answer Review</CardTitle>
              <CardDescription>See which questions you got right and wrong</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quiz.questions.map((q, index) => {
                const result = getQuestionResult(q.id);
                if (!result) return null;

                return (
                  <div 
                    key={q.id} 
                    className={`p-4 rounded-lg border-2 ${
                      result.isCorrect ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {result.isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-success shrink-0" />
                      ) : (
                        <XCircle className="h-6 w-6 text-destructive shrink-0" />
                      )}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <p className="font-medium">Question {index + 1}</p>
                          <Badge variant={result.isCorrect ? "default" : "destructive"}>
                            {result.isCorrect ? `+${q.marks} pts` : "0 pts"}
                          </Badge>
                        </div>
                        <p className="text-sm">{q.prompt}</p>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Your answer: </span>
                          <span className={result.isCorrect ? "text-success font-medium" : "text-destructive font-medium"}>
                            {q.options?.find(opt => opt.id === answers[q.id])?.text}
                          </span>
                        </div>
                        {!result.isCorrect && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Correct answer: </span>
                            <span className="text-success font-medium">
                              {q.options?.find(opt => opt.id === result.correctAnswer)?.text}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">BioSecure India</h1>
              <p className="text-xs text-muted-foreground">{quiz.title}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/learning")}>
            Exit Quiz
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">Pass: {quiz.passThreshold}%</Badge>
                  <Badge variant="outline">{question.marks} marks</Badge>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl leading-tight">{question.prompt}</CardTitle>
            <CardDescription>Select the correct answer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {question.options?.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                    answers[question.id] === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 cursor-pointer text-base leading-relaxed"
                  >
                    {option.text}
                  </Label>
                  {answers[question.id] === option.id && (
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  )}
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1"
              >
                Previous
              </Button>
              {currentQuestion < totalQuestions - 1 ? (
                <Button
                  variant="default"
                  onClick={handleNext}
                  disabled={!answers[question.id]}
                  className="flex-1"
                >
                  Next Question
                </Button>
              ) : (
                <Button
                  variant="hero"
                  onClick={handleSubmit}
                  disabled={!answers[question.id]}
                  className="flex-1"
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
