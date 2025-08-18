import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  Film,
  Music,
  Headphones,
  BookOpen,
  Gamepad2,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Sparkles,
  Clock,
  Star,
  Play,
  Download,
  RefreshCw,
  Heart,
} from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  genre: string;
  duration?: string;
  rating: number;
  reason: string;
  imageUrl: string;
  externalUrl: string;
}

interface RecommendationData {
  mood: string;
  categories: {
    movies: Recommendation[];
    music: Recommendation[];
    podcasts: Recommendation[];
    audiobooks: Recommendation[];
    games: Recommendation[];
  };
}

export default function Recommendations() {
  const [recommendations, setRecommendations] =
    useState<RecommendationData | null>(null);
  const [feedback, setFeedback] = useState<Record<string, "like" | "dislike">>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    // Get assessment data from localStorage
    const assessmentData = localStorage.getItem("moodAssessment");

    if (!assessmentData) {
      navigate("/assess");
      return;
    }

    try {
      const answers = JSON.parse(assessmentData);
      console.log('Making API call with data:', answers);

      // Call real backend API for AI-powered recommendations
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      console.log('API Response status:', response.status);
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const aiRecommendations: RecommendationData = await response.json();
      console.log('Received recommendations:', aiRecommendations);
      setRecommendations(aiRecommendations);

    } catch (error) {
      console.error('Error loading recommendations:', error);

      // Fallback to mock data if API fails
      const answers = JSON.parse(assessmentData);
      const mockRecommendations: RecommendationData = generateMockRecommendations(answers.mood || 'happy');
      setRecommendations(mockRecommendations);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockRecommendations = (mood: string): RecommendationData => {
    // Ensure mood is defined and valid
    if (!mood || typeof mood !== "string") {
      mood = "happy";
    }

    const baseRecommendations = {
      happy: {
        movies: [
          {
            id: "1",
            title: "The Pursuit of Happyness",
            description: "An inspiring story of perseverance",
            genre: "Drama",
            rating: 4.8,
            reason: "Matches your uplifting mood",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "1h 57m",
          },
          {
            id: "2",
            title: "La La Land",
            description: "A musical love story",
            genre: "Musical",
            rating: 4.6,
            reason: "Light-hearted and joyful",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "2h 8m",
          },
        ],
        music: [
          {
            id: "3",
            title: "Happy Vibes Playlist",
            description: "Upbeat songs to keep your energy high",
            genre: "Pop",
            rating: 4.9,
            reason: "Perfect for your current mood",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "2h 30m",
          },
          {
            id: "4",
            title: "Uplifting Indie Rock",
            description: "Feel-good indie tracks",
            genre: "Indie Rock",
            rating: 4.7,
            reason: "Energetic and positive",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "1h 45m",
          },
        ],
        podcasts: [
          {
            id: "5",
            title: "The Happiness Lab",
            description: "Science-backed ways to feel happier",
            genre: "Self-Help",
            rating: 4.8,
            reason: "Enhance your positive mindset",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "45m",
          },
          {
            id: "6",
            title: "Comedy Bang! Bang!",
            description: "Hilarious comedy podcast",
            genre: "Comedy",
            rating: 4.5,
            reason: "Keep the laughter going",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "1h 20m",
          },
        ],
        audiobooks: [
          {
            id: "7",
            title: "The Power of Positive Thinking",
            description: "Classic self-help audiobook",
            genre: "Self-Help",
            rating: 4.6,
            reason: "Reinforce your positive outlook",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "8h 30m",
          },
          {
            id: "8",
            title: "Yes Please by Amy Poehler",
            description: "Funny and uplifting memoir",
            genre: "Biography",
            rating: 4.4,
            reason: "Humorous and inspiring",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "6h 45m",
          },
        ],
        games: [
          {
            id: "9",
            title: "Stardew Valley",
            description: "Peaceful farming simulation",
            genre: "Simulation",
            rating: 4.9,
            reason: "Relaxing and rewarding",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
          },
          {
            id: "10",
            title: "Animal Crossing",
            description: "Charming life simulation",
            genre: "Life Sim",
            rating: 4.8,
            reason: "Wholesome and delightful",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
          },
        ],
      },
      sad: {
        movies: [
          {
            id: "11",
            title: "Inside Out",
            description: "Understanding emotions through animation",
            genre: "Animation",
            rating: 4.7,
            reason: "Helps process feelings",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "1h 35m",
          },
          {
            id: "12",
            title: "A Monster Calls",
            description: "A touching story about grief",
            genre: "Drama",
            rating: 4.5,
            reason: "Therapeutic and understanding",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "1h 48m",
          },
        ],
        music: [
          {
            id: "13",
            title: "Comfort Songs",
            description: "Gentle melodies for tough times",
            genre: "Ambient",
            rating: 4.6,
            reason: "Soothing and comforting",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "1h 50m",
          },
          {
            id: "14",
            title: "Healing Instrumentals",
            description: "Peaceful piano and strings",
            genre: "Classical",
            rating: 4.8,
            reason: "Helps emotional healing",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "2h 15m",
          },
        ],
        podcasts: [
          {
            id: "15",
            title: "Mental Health Happy Hour",
            description: "Honest conversations about mental health",
            genre: "Mental Health",
            rating: 4.7,
            reason: "Validates your feelings",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "1h 10m",
          },
          {
            id: "16",
            title: "Terrible, Thanks for Asking",
            description: "Real stories about difficult times",
            genre: "Storytelling",
            rating: 4.5,
            reason: "You're not alone in struggles",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "35m",
          },
        ],
        audiobooks: [
          {
            id: "17",
            title: "Option B",
            description: "Building resilience in adversity",
            genre: "Self-Help",
            rating: 4.6,
            reason: "Guidance through difficult times",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "7h 20m",
          },
          {
            id: "18",
            title: "The Gifts of Imperfection",
            description: "Embracing vulnerability and courage",
            genre: "Psychology",
            rating: 4.7,
            reason: "Self-compassion and acceptance",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
            duration: "5h 30m",
          },
        ],
        games: [
          {
            id: "19",
            title: "Journey",
            description: "Beautiful exploration adventure",
            genre: "Adventure",
            rating: 4.8,
            reason: "Peaceful and meditative",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
          },
          {
            id: "20",
            title: "GRIS",
            description: "Artistic platformer about emotions",
            genre: "Platformer",
            rating: 4.7,
            reason: "Expressive and cathartic",
            imageUrl: "/placeholder.svg",
            externalUrl: "#",
          },
        ],
      },
    };

    const result =
      baseRecommendations[mood as keyof typeof baseRecommendations];
    if (!result) {
      return {
        mood: "happy",
        categories: baseRecommendations.happy,
      };
    }
    return {
      mood,
      categories: result,
    };
  };

  const handleFeedback = (itemId: string, type: "like" | "dislike") => {
    setFeedback((prev) => ({
      ...prev,
      [itemId]: type,
    }));
  };

  const handleGetMoreRecommendations = () => {
    navigate("/assess");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gradient-start via-primary/20 to-gradient-end flex items-center justify-center">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-8 text-center">
          <Brain className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Analyzing Your Responses
          </h2>
          <p className="text-white/70 mb-4">
            Creating personalized recommendations just for you...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </Card>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gradient-start via-primary/20 to-gradient-end flex items-center justify-center">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            No Assessment Found
          </h2>
          <p className="text-white/70 mb-6">
            Please check your mood first.
          </p>
          <Link to="/assess">
            <Button className="bg-white text-primary hover:bg-white/90">
              Check Your Mood
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const renderRecommendationCard = (item: Recommendation, category: string) => (
    <div key={item.id}>
      <Card className="dark-card hover:bg-white/10 transition-all duration-300 overflow-hidden">
      {/* Recommendation Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent" style={{top: '26px'}} />
        <Badge className="absolute top-3 right-3 bg-primary/90 text-white border-none">
          <Star className="w-3 h-3 mr-1" />
        </Badge>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-white mb-2">
              {item.title}
            </CardTitle>
            <CardDescription className="text-white/70 mb-2">
              {item.description}
            </CardDescription>
            <div className="flex gap-2 mb-2">
              <Badge className="bg-white/10 text-white border-white/20 text-xs">
                {item.genre}
              </Badge>
              {item.duration && (
                <Badge className="bg-white/10 text-white border-white/20 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.duration}
                </Badge>
              )}
            </div>
            <p className="text-sm text-primary font-medium flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              {item.reason}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={feedback[item.id] === "like" ? "default" : "outline"}
              onClick={() => handleFeedback(item.id, "like")}
              className={
                feedback[item.id] === "like"
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-white/30 text-white hover:bg-white/10"
              }
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={feedback[item.id] === "dislike" ? "default" : "outline"}
              onClick={() => handleFeedback(item.id, "dislike")}
              className={
                feedback[item.id] === "dislike"
                  ? "bg-red-600 hover:bg-red-700"
                  : "border-white/30 text-white hover:bg-white/10"
              }
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
          </div>
          <Button size="sm" className="bg-white text-primary hover:bg-white/90">
            <ExternalLink className="w-4 h-4 mr-1" />
            Open
          </Button>
        </div>
      </CardContent>
    </Card>
    <span className="text-white text-sm">{item.rating}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-background to-gradient-end dark">
      {/* Navigation */}
      <nav className="dark-nav">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-white">
                Moody
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              {recommendations && (
                <Badge className="bg-white/10 text-white border-white/20">
                  <Heart className="w-4 h-4 mr-1" />
                  Mood: {recommendations.mood}
                </Badge>
              )}
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Personalized Recommendations
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-6">
            Based on your responses, we've curated content designed to enhance
            your current mood and well-being.
          </p>
          <Button
            onClick={handleGetMoreRecommendations}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Get New Recommendations
          </Button>
        </div>

        {recommendations && recommendations.categories && (
          <Tabs defaultValue="movies" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-black/20 border-white/20">
              <TabsTrigger
                value="movies"
                className="data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <Film className="w-4 h-4 mr-2" />
                Movies
              </TabsTrigger>
              <TabsTrigger
                value="music"
                className="data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <Music className="w-4 h-4 mr-2" />
                Music
              </TabsTrigger>
              <TabsTrigger
                value="podcasts"
                className="data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <Headphones className="w-4 h-4 mr-2" />
                Podcasts
              </TabsTrigger>
              <TabsTrigger
                value="audiobooks"
                className="data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Audiobooks
              </TabsTrigger>
              <TabsTrigger
                value="games"
                className="data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                Games
              </TabsTrigger>
            </TabsList>

            {Object.entries(recommendations.categories).map(
              ([category, items]) => (
                <TabsContent
                  key={category}
                  value={category}
                  className="space-y-4"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    {items.map((item) =>
                      renderRecommendationCard(item, category),
                    )}
                  </div>
                </TabsContent>
              ),
            )}
          </Tabs>
        )}

        {/* Feedback Summary */}
        <Card className="mt-8 dark-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Help Us Improve
            </CardTitle>
            <CardDescription className="text-white/70">
              Your feedback helps us provide better recommendations for you and
              others.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Button
                onClick={handleGetMoreRecommendations}
                className="bg-white text-primary hover:bg-white/90"
              >
                <Brain className="w-4 h-4 mr-2" />
                Take New Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
