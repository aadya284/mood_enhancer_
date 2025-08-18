import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { 
  Brain, 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  Frown, 
  Smile, 
  Meh, 
  Sun,
  Cloud,
  CloudRain,
  Zap
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  type: 'radio' | 'textarea' | 'mood-emoji';
  options?: string[];
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: "mood",
    question: "How are you feeling right now?",
    type: "mood-emoji",
    options: ["happy", "sad", "angry", "calm", "stressed", "excited", "confused", "lonely", "grateful", "anxious"]
  },
  {
    id: "energy",
    question: "What's your current energy level?",
    type: "radio",
    options: ["Very High - Ready to conquer the world!", "High - Feeling energetic", "Medium - Balanced and steady", "Low - Feeling drained", "Very Low - Exhausted"]
  },
  {
    id: "social",
    question: "How do you feel about social interaction right now?",
    type: "radio",
    options: ["Want to connect with others", "Prefer some company", "Need alone time", "Want to be completely isolated", "Feeling social anxiety"]
  },
  {
    id: "stress",
    question: "What's your stress level today?",
    type: "radio",
    options: ["No stress at all", "Mild pressure", "Moderate stress", "High stress", "Overwhelmed"]
  },
  {
    id: "motivation",
    question: "How motivated do you feel right now?",
    type: "radio",
    options: ["Super motivated", "Ready to take on tasks", "Neutral", "Low motivation", "Completely unmotivated"]
  },
  {
    id: "sleep",
    question: "How did you sleep last night?",
    type: "radio",
    options: ["Amazing - 8+ hours", "Good - 6-8 hours", "Okay - 5-6 hours", "Poor - 3-5 hours", "Terrible - Less than 3 hours"]
  },
  {
    id: "weather_impact",
    question: "How is the weather affecting your mood?",
    type: "radio",
    options: ["Loving the weather", "Weather is perfect", "Weather is okay", "Weather is bothering me", "Weather is really affecting me negatively"]
  },
  {
    id: "story",
    question: "Tell us what's happening in your life right now. What's on your mind?",
    type: "textarea",
    placeholder: "Share your thoughts, recent experiences, challenges, or anything that's affecting your mood today..."
  },
  {
    id: "goals",
    question: "What do you hope to achieve or feel after this session?",
    type: "textarea",
    placeholder: "Describe what would make you feel better or what you're looking to get out of this experience..."
  },
  {
    id: "preferences",
    question: "What type of content usually helps you feel better?",
    type: "radio",
    options: ["Uplifting movies & shows", "Calming music & sounds", "Inspiring podcasts & talks", "Engaging games & activities", "Educational audiobooks & content", "Comedy & humor"]
  },
  {
    id: "genre_mood",
    question: "What genre matches your current vibe?",
    type: "radio",
    options: ["Action & Adventure", "Romance & Drama", "Comedy & Light-hearted", "Mystery & Thriller", "Sci-Fi & Fantasy", "Documentary & Educational"]
  },
  {
    id: "time_available",
    question: "How much time do you have for content right now?",
    type: "radio",
    options: ["Just a few minutes (5-15 min)", "Half an hour (15-30 min)", "About an hour (30-60 min)", "Couple of hours (1-2 hours)", "All day - no rush"]
  },
  {
    id: "activity",
    question: "What would you like to do right now?",
    type: "radio",
    options: ["Watch something engaging", "Listen to music or audio", "Play interactive games", "Learn something new", "Relax and unwind", "Get motivated and inspired"]
  },
  {
    id: "mood_goal",
    question: "What mood are you hoping to achieve?",
    type: "radio",
    options: ["More happiness & joy", "Peace & calmness", "Energy & motivation", "Comfort & healing", "Inspiration & creativity", "Just distraction from current feelings"]
  }
];

const moodEmojis = {
  happy: { emoji: "😊", label: "Happy", color: "text-happy" },
  sad: { emoji: "😢", label: "Sad", color: "text-sad" },
  angry: { emoji: "😠", label: "Angry", color: "text-angry" },
  calm: { emoji: "😌", label: "Calm", color: "text-calm" },
  stressed: { emoji: "😰", label: "Stressed", color: "text-orange-500" },
  excited: { emoji: "🤩", label: "Excited", color: "text-happy" },
  confused: { emoji: "😕", label: "Confused", color: "text-purple-400" },
  lonely: { emoji: "😔", label: "Lonely", color: "text-blue-400" },
  grateful: { emoji: "🙏", label: "Grateful", color: "text-green-400" },
  anxious: { emoji: "😟", label: "Anxious", color: "text-yellow-500" }
};

export default function Assessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store responses in localStorage for demo
    localStorage.setItem('moodAssessment', JSON.stringify(answers));
    
    navigate('/recommendations');
  };

  const isCurrentAnswered = () => {
    return answers[currentQuestion.id] && answers[currentQuestion.id].trim() !== '';
  };

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'mood-emoji':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentQuestion.options?.map((mood) => {
              const moodData = moodEmojis[mood as keyof typeof moodEmojis];
              return (
                <Card
                  key={mood}
                  className={`cursor-pointer transition-all duration-200 border-2 hover:scale-105 ${
                    answers[currentQuestion.id] === mood
                      ? 'border-primary bg-primary/20 dark-card'
                      : 'dark-card hover:bg-white/5'
                  }`}
                  onClick={() => handleAnswer(mood)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">{moodData.emoji}</div>
                    <div className={`font-medium ${moodData.color}`}>{moodData.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        );

      case 'radio':
        return (
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <RadioGroupItem value={option} id={`option-${index}`} className="border-white/30" />
                <Label htmlFor={`option-${index}`} className="text-white cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'textarea':
        return (
          <Textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="min-h-32 bg-black/20 border-white/20 text-white placeholder:text-white/50 resize-none"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-background to-gradient-end relative dark">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/4098218/pexels-photo-4098218.jpeg)'
        }}
      />
      {/* Navigation */}
      <nav className="relative z-10 dark-nav">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-white">MoodEnhancer</span>
            </Link>
            <Badge className="bg-white/10 text-white border-white/20">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-white/70 text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/10" />
          </div>

          {/* Question Card */}
          <Card className="dark-card mb-8">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                {currentQuestion.type === 'mood-emoji' && <Heart className="w-6 h-6 text-happy" />}
                {currentQuestion.type === 'radio' && <Zap className="w-6 h-6 text-calm" />}
                {currentQuestion.type === 'textarea' && <Brain className="w-6 h-6 text-primary" />}
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  {currentQuestion.type === 'mood-emoji' ? 'Mood Check' : 
                   currentQuestion.type === 'textarea' ? 'Tell Your Story' : 'Quick Question'}
                </Badge>
              </div>
              <CardTitle className="text-2xl text-white mb-2">
                {currentQuestion.question}
              </CardTitle>
              {currentQuestion.type === 'textarea' && (
                <CardDescription className="text-white/70">
                  Take your time to share what's on your mind. The more you tell us, the better we can help.
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {renderQuestionInput()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="text-white/50 text-sm">
              {currentQuestionIndex + 1} / {questions.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={!isCurrentAnswered() || isLoading}
              className="bg-white text-primary hover:bg-white/90"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-4 h-4 mr-2 border-2 border-primary border-t-transparent rounded-full" />
                  Analyzing...
                </>
              ) : currentQuestionIndex === questions.length - 1 ? (
                <>
                  Get Recommendations
                  <Brain className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center text-white/60 text-sm">
            <p>Your responses help us understand you better. All information is kept private and secure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
