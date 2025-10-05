import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Shield, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface Question {
  id: string;
  category: string;
  question: string;
  options: { value: string; label: string; score: number }[];
  info?: string;
}

const Assessment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions: Question[] = [
    {
      id: "q1",
      category: "Facility Infrastructure",
      question: "Does your farm have a designated clean and dirty zone separation?",
      options: [
        { value: "yes_proper", label: "Yes, with proper barriers and signage", score: 10 },
        { value: "yes_basic", label: "Yes, but not clearly marked", score: 5 },
        { value: "no", label: "No separation", score: 0 }
      ],
      info: "Clean/dirty zone separation is critical for preventing disease transmission"
    },
    {
      id: "q2",
      category: "Visitor Management",
      question: "What visitor control measures are in place at your farm?",
      options: [
        { value: "strict", label: "Strict protocols with shower-in/out and biosecurity training", score: 10 },
        { value: "moderate", label: "Basic sign-in and protective clothing requirement", score: 6 },
        { value: "minimal", label: "Sign-in register only", score: 2 },
        { value: "none", label: "No formal visitor controls", score: 0 }
      ]
    },
    {
      id: "q3",
      category: "Disinfection Protocols",
      question: "How often are farm facilities and equipment disinfected?",
      options: [
        { value: "daily", label: "Daily with documented procedures", score: 10 },
        { value: "weekly", label: "Weekly disinfection routine", score: 6 },
        { value: "monthly", label: "Monthly or as needed", score: 3 },
        { value: "rarely", label: "Rarely or never", score: 0 }
      ],
      info: "Regular disinfection is essential for pathogen control"
    },
    {
      id: "q4",
      category: "Animal Health Monitoring",
      question: "Do you maintain daily health records for all animals?",
      options: [
        { value: "digital", label: "Yes, using digital health passport system", score: 10 },
        { value: "paper", label: "Yes, using paper records", score: 7 },
        { value: "occasional", label: "Occasional monitoring only", score: 3 },
        { value: "no", label: "No regular health monitoring", score: 0 }
      ]
    },
    {
      id: "q5",
      category: "Feed & Water Security",
      question: "How do you protect feed and water sources from contamination?",
      options: [
        { value: "comprehensive", label: "Covered storage, regular testing, pest control", score: 10 },
        { value: "basic", label: "Covered storage only", score: 6 },
        { value: "minimal", label: "Limited protection measures", score: 3 },
        { value: "none", label: "No specific protection", score: 0 }
      ]
    },
    {
      id: "q6",
      category: "Vaccination Programs",
      question: "Is your flock/herd up to date with vaccination schedules?",
      options: [
        { value: "full", label: "Fully vaccinated with complete records", score: 10 },
        { value: "partial", label: "Partially vaccinated", score: 5 },
        { value: "outdated", label: "Vaccinations overdue", score: 2 },
        { value: "none", label: "No vaccination program", score: 0 }
      ]
    },
    {
      id: "q7",
      category: "Waste Management",
      question: "How do you dispose of dead animals and farm waste?",
      options: [
        { value: "proper", label: "Proper incineration or burial following regulations", score: 10 },
        { value: "burial", label: "Burial on-site without permit", score: 4 },
        { value: "improper", label: "Irregular disposal methods", score: 1 },
        { value: "none", label: "No formal disposal system", score: 0 }
      ]
    },
    {
      id: "q8",
      category: "Biosecurity Training",
      question: "Have farm workers received biosecurity training in the last 12 months?",
      options: [
        { value: "certified", label: "Yes, certified training with assessments", score: 10 },
        { value: "basic", label: "Yes, basic orientation", score: 6 },
        { value: "informal", label: "Informal on-the-job training", score: 3 },
        { value: "none", label: "No formal training", score: 0 }
      ]
    }
  ];

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep];
  const progressPercentage = ((currentStep + 1) / totalQuestions) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) {
      toast.error(t('assessment.selectAnswer'));
      return;
    }
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    
    questions.forEach((question) => {
      const selectedValue = answers[question.id];
      const selectedOption = question.options.find(opt => opt.value === selectedValue);
      if (selectedOption) {
        totalScore += selectedOption.score;
      }
      maxScore += Math.max(...question.options.map(opt => opt.score));
    });

    return Math.round((totalScore / maxScore) * 100);
  };

  const handleSubmit = async () => {
    if (!answers[currentQuestion.id]) {
      toast.error(t('assessment.answerCurrent'));
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const score = calculateScore();
    
    // Store score for dashboard
    localStorage.setItem("biosecurity_score", score.toString());
    localStorage.setItem("assessment_date", new Date().toISOString());
    
    toast.success(t('assessment.completed'));
    
    // Navigate to results/dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">BioSecure India</h1>
              <p className="text-xs text-muted-foreground">{t('assessment.title')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
              {t('nav.exitAssessment')}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {t('assessment.questionOf', { current: currentStep + 1, total: totalQuestions })}
                </span>
                <span className="text-muted-foreground">
                  {Math.round(progressPercentage)}% {t('assessment.complete')}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {currentQuestion.category}
                </div>
                <CardTitle className="text-2xl leading-tight">
                  {currentQuestion.question}
                </CardTitle>
                {currentQuestion.info && (
                  <CardDescription className="flex items-start gap-2 text-sm">
                    <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    {currentQuestion.info}
                  </CardDescription>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                    answers[currentQuestion.id] === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer text-base leading-relaxed"
                  >
                    {option.label}
                  </Label>
                  {answers[currentQuestion.id] === option.value && (
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  )}
                </div>
              ))}
            </RadioGroup>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex-1"
              >
                {t('assessment.previous')}
              </Button>
              {currentStep < totalQuestions - 1 ? (
                <Button
                  variant="default"
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className="flex-1"
                >
                  {t('assessment.nextQuestion')}
                </Button>
              ) : (
                <Button
                  variant="hero"
                  onClick={handleSubmit}
                  disabled={!answers[currentQuestion.id] || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? t('assessment.analyzing') : t('assessment.completeAssessment')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold">{Object.keys(answers).length}</p>
              <p className="text-xs text-muted-foreground">{t('assessment.answered')}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalQuestions - Object.keys(answers).length}</p>
              <p className="text-xs text-muted-foreground">{t('assessment.remaining')}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalQuestions}</p>
              <p className="text-xs text-muted-foreground">{t('assessment.totalQuestions')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
