import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Music, 
  Film, 
  Headphones, 
  Gamepad2, 
  BookOpen, 
  Sparkles,
  Heart,
  TrendingUp,
  Users,
  Zap,
  Shield,
  ArrowRight
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-background to-gradient-end dark">
      {/* Navigation */}
      <nav className="dark-nav">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-white">Moody</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Dashboard
                </Button>
              </Link>
              <Link to="/assess">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Start Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 text-center text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50" />
        <div className="relative z-10 container mx-auto px-4">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Mood Enhancement
          </Badge>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Transform Your Mood with
            <span className="block text-transparent bg-gradient-to-r from-happy to-calm bg-clip-text">
              Moody
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            Share your mood, experiences, and preferences. Get instant recommendations for movies, music, 
            podcasts, audiobooks, and games tailored specifically to enhance your emotional well-being.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/assess">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                <Brain className="w-5 h-5 mr-2" />
                Start Mood Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            All Your Favorite Content in One Place
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: Film,
                label: "Movies",
                color: "text-red-400",
                description: "Curated films for every mood",
                bgImage: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg"
              },
              {
                icon: Music,
                label: "Music",
                color: "text-green-400",
                description: "Perfect playlists and songs",
                bgImage: "https://images.pexels.com/photos/3764004/pexels-photo-3764004.jpeg"
              },
              {
                icon: Headphones,
                label: "Podcasts",
                color: "text-purple-400",
                description: "Inspiring conversations",
                bgImage: "https://images.pexels.com/photos/6724383/pexels-photo-6724383.jpeg"
              },
              {
                icon: BookOpen,
                label: "Audiobooks",
                color: "text-blue-400",
                description: "Stories that heal",
                bgImage: "https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg"
              },
              {
                icon: Gamepad2,
                label: "Games",
                color: "text-yellow-400",
                description: "Interactive entertainment",
                bgImage: "https://images.pexels.com/photos/11790883/pexels-photo-11790883.jpeg"
              },
            ].map((item, index) => (
              <Card key={index} className="relative dark-card hover:bg-white/10 transition-all duration-300 text-center overflow-hidden group">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-30"
                  style={{ backgroundImage: `url(${item.bgImage})` }}
                />
                <CardContent className="relative z-10 p-6">
                  <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.label}</h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              How MoodEnhancer Works
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our AI analyzes your responses to provide personalized content recommendations that match your current emotional state.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="dark-card">
              <CardHeader>
                <Heart className="w-12 h-12 text-happy mb-4" />
                <CardTitle className="text-white">Share Your Mood</CardTitle>
                <CardDescription className="text-white/70">
                  Tell us about your day, feelings, and current emotional state through our guided questionnaire.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="dark-card">
              <CardHeader>
                <Zap className="w-12 h-12 text-calm mb-4" />
                <CardTitle className="text-white">AI Analysis</CardTitle>
                <CardDescription className="text-white/70">
                  Our advanced AI processes your responses to understand your preferences and emotional needs.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="dark-card">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-happy mb-4" />
                <CardTitle className="text-white">Get Recommendations</CardTitle>
                <CardDescription className="text-white/70">
                  Receive personalized content suggestions designed to improve your mood and well-being.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Happy Users", icon: Users },
              { number: "50K+", label: "Recommendations", icon: Sparkles },
              { number: "95%", label: "Satisfaction Rate", icon: Heart },
              { number: "24/7", label: "Available", icon: Shield },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Enhance Your Mood?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their daily experience with personalized content recommendations.
          </p>
          <Link to="/assess">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              <Brain className="w-5 h-5 mr-2" />
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-white/60">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-white">MoodEnhancer</span>
          </div>
          <p>&copy; 2024 MoodEnhancer. Enhancing well-being through personalized content.</p>
        </div>
      </footer>
    </div>
  );
}
