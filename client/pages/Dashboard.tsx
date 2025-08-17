import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  Brain, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Heart, 
  BarChart3,
  Plus,
  Target,
  Smile,
  Frown,
  Meh,
  Activity,
  Award,
  BookOpen,
  Headphones,
  Film,
  Music,
  Gamepad2
} from "lucide-react";

interface MoodEntry {
  date: string;
  mood: string;
  score: number;
  recommendations: {
    movies: number;
    music: number;
    podcasts: number;
    audiobooks: number;
    games: number;
  };
}

interface WeeklyStats {
  averageMood: number;
  totalSessions: number;
  mostCommonMood: string;
  improvementTrend: number;
}

export default function Dashboard() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    loadDashboardData();
  }, [selectedPeriod]);

  const loadDashboardData = () => {
    // Generate mock data for demo
    const mockHistory: MoodEntry[] = [
      {
        date: '2024-01-15',
        mood: 'happy',
        score: 8.5,
        recommendations: { movies: 2, music: 3, podcasts: 1, audiobooks: 1, games: 2 }
      },
      {
        date: '2024-01-14',
        mood: 'calm',
        score: 7.2,
        recommendations: { movies: 1, music: 4, podcasts: 2, audiobooks: 2, games: 1 }
      },
      {
        date: '2024-01-13',
        mood: 'stressed',
        score: 5.8,
        recommendations: { movies: 1, music: 2, podcasts: 3, audiobooks: 3, games: 1 }
      },
      {
        date: '2024-01-12',
        mood: 'sad',
        score: 4.5,
        recommendations: { movies: 2, music: 2, podcasts: 2, audiobooks: 2, games: 2 }
      },
      {
        date: '2024-01-11',
        mood: 'excited',
        score: 9.1,
        recommendations: { movies: 3, music: 2, podcasts: 1, audiobooks: 1, games: 3 }
      },
      {
        date: '2024-01-10',
        mood: 'calm',
        score: 7.8,
        recommendations: { movies: 1, music: 3, podcasts: 2, audiobooks: 2, games: 2 }
      },
      {
        date: '2024-01-09',
        mood: 'happy',
        score: 8.2,
        recommendations: { movies: 2, music: 3, podcasts: 2, audiobooks: 1, games: 2 }
      }
    ];

    const stats: WeeklyStats = {
      averageMood: 7.3,
      totalSessions: mockHistory.length,
      mostCommonMood: 'happy',
      improvementTrend: 12.5
    };

    setMoodHistory(mockHistory);
    setWeeklyStats(stats);
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy':
      case 'excited':
        return <Smile className="w-5 h-5 text-happy" />;
      case 'sad':
      case 'stressed':
        return <Frown className="w-5 h-5 text-sad" />;
      case 'calm':
      default:
        return <Meh className="w-5 h-5 text-calm" />;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy':
      case 'excited':
        return 'text-happy';
      case 'sad':
      case 'stressed':
        return 'text-sad';
      case 'angry':
        return 'text-angry';
      case 'calm':
      default:
        return 'text-calm';
    }
  };

  const getTotalRecommendations = () => {
    return moodHistory.reduce((total, entry) => {
      return total + Object.values(entry.recommendations).reduce((sum, count) => sum + count, 0);
    }, 0);
  };

  const getMostUsedCategory = () => {
    const totals = { movies: 0, music: 0, podcasts: 0, audiobooks: 0, games: 0 };
    
    moodHistory.forEach(entry => {
      Object.entries(entry.recommendations).forEach(([category, count]) => {
        totals[category as keyof typeof totals] += count;
      });
    });

    const maxCategory = Object.entries(totals).reduce((a, b) => totals[a[0] as keyof typeof totals] > totals[b[0] as keyof typeof totals] ? a : b);
    return { category: maxCategory[0], count: maxCategory[1] };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'movies': return <Film className="w-4 h-4" />;
      case 'music': return <Music className="w-4 h-4" />;
      case 'podcasts': return <Headphones className="w-4 h-4" />;
      case 'audiobooks': return <BookOpen className="w-4 h-4" />;
      case 'games': return <Gamepad2 className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-background to-gradient-end dark">
      {/* Navigation */}
      <nav className="dark-nav">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-white">MoodEnhancer</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/assess">
                <Button className="bg-white text-primary hover:bg-white/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Mood Dashboard</h1>
          <p className="text-xl text-white/80">Track your emotional journey and discover insights</p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-black/20 rounded-lg p-1 backdrop-blur-sm border border-white/10">
            {(['week', 'month', 'year'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'ghost'}
                onClick={() => setSelectedPeriod(period)}
                className={selectedPeriod === period 
                  ? 'bg-white text-primary' 
                  : 'text-white hover:bg-white/10'
                }
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        {weeklyStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="dark-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Average Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {weeklyStats.averageMood.toFixed(1)}/10
                </div>
                <Progress value={weeklyStats.averageMood * 10} className="h-2 bg-white/10" />
              </CardContent>
            </Card>

            <Card className="dark-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Total Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {weeklyStats.totalSessions}
                </div>
                <p className="text-white/70 text-sm">This {selectedPeriod}</p>
              </CardContent>
            </Card>

            <Card className="dark-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Most Common Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  {getMoodIcon(weeklyStats.mostCommonMood)}
                  <span className={`text-2xl font-bold capitalize ${getMoodColor(weeklyStats.mostCommonMood)}`}>
                    {weeklyStats.mostCommonMood}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="dark-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-happy mb-2">
                  +{weeklyStats.improvementTrend}%
                </div>
                <p className="text-white/70 text-sm">vs last {selectedPeriod}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content Categories Usage */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Content Usage Overview
            </CardTitle>
            <CardDescription className="text-white/70">
              Your favorite types of recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(['movies', 'music', 'podcasts', 'audiobooks', 'games'] as const).map((category) => {
                const total = moodHistory.reduce((sum, entry) => sum + entry.recommendations[category], 0);
                const percentage = total > 0 ? (total / getTotalRecommendations()) * 100 : 0;
                
                return (
                  <div key={category} className="text-center">
                    <div className="flex justify-center mb-2">
                      {getCategoryIcon(category)}
                    </div>
                    <div className="text-white font-semibold capitalize mb-1">{category}</div>
                    <div className="text-2xl font-bold text-primary mb-1">{total}</div>
                    <div className="text-xs text-white/70">{percentage.toFixed(0)}% of total</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Mood History */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Mood History
            </CardTitle>
            <CardDescription className="text-white/70">
              Your mood tracking over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodHistory.slice(0, 7).map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getMoodIcon(entry.mood)}
                      <span className={`font-semibold capitalize ${getMoodColor(entry.mood)}`}>
                        {entry.mood}
                      </span>
                    </div>
                    <Badge className="bg-white/10 text-white border-white/20">
                      Score: {entry.score}/10
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-white/70 text-sm">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex gap-1">
                      {Object.entries(entry.recommendations).map(([category, count]) => (
                        count > 0 && (
                          <Badge key={category} variant="secondary" className="bg-primary/20 text-primary text-xs">
                            {getCategoryIcon(category)}
                            <span className="ml-1">{count}</span>
                          </Badge>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {moodHistory.length === 0 && (
              <div className="text-center py-8">
                <Brain className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">No mood data yet</h3>
                <p className="text-white/70 mb-4">Take your first assessment to start tracking your mood journey</p>
                <Link to="/assess">
                  <Button className="bg-white text-primary hover:bg-white/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Start Assessment
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Insights & Goals */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Personal Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/80">
                  <div className="w-2 h-2 bg-happy rounded-full"></div>
                  <span className="text-sm">Your mood tends to improve on weekends</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <div className="w-2 h-2 bg-calm rounded-full"></div>
                  <span className="text-sm">Music recommendations work best for you</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Regular assessments boost your awareness</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-white/80 text-sm">
                  ✨ Try taking assessments at consistent times daily
                </div>
                <div className="text-white/80 text-sm">
                  🎵 Continue exploring music - it's your top mood booster!
                </div>
                <div className="text-white/80 text-sm">
                  📖 Consider adding more audiobooks to your routine
                </div>
                <Link to="/assess" className="block">
                  <Button size="sm" className="bg-white text-primary hover:bg-white/90 w-full mt-2">
                    Take Assessment Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
