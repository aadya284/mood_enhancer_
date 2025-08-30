import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  ArrowRight,
  PhoneCall,
  Activity,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur border-b border-black/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-black" />
              <span className="text-2xl font-bold text-black">Moody</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="text-black hover:bg-black/5">
                  Dashboard
                </Button>
              </Link>
              <Link to="/assess">
                <Button className="bg-black text-white hover:bg-black/90">
                  Start Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 text-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg)",
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <Badge className="mb-6 bg-black text-white border-black hover:bg-black/90">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Mood Support
          </Badge>

          <h1 className="text-6xl font-extrabold mb-6 text-black leading-tight">
            Your Mood Tracker
          </h1>

          <p className="text-xl text-black/70 max-w-3xl mx-auto mb-8 leading-relaxed">
            Track how you feel every day, get personalized suggestions, and use
            simple tools to feel better. Clean, high-contrast design for
            readability and focus.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/assess">
              <Button size="lg" className="bg-black text-white hover:bg-black/90 text-lg px-8 py-4">
                <Brain className="w-5 h-5 mr-2" />
                Check Your Mood
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/games">
              <Button
                size="lg"
                variant="outline"
                className="border-black/30 text-black hover:bg-black/5 text-lg px-8 py-4"
              >
                <Gamepad2 className="w-5 h-5 mr-2" />
                Play Mini Games
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-black mb-12">
            All Your Favorite Content in One Place
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: Film,
                label: "Movies",
                color: "text-red-500",
                description: "Curated films for every mood",
                bgImage:
                  "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
              },
              {
                icon: Music,
                label: "Music",
                color: "text-green-600",
                description: "Perfect playlists and songs",
                bgImage:
                  "https://images.pexels.com/photos/3764004/pexels-photo-3764004.jpeg",
              },
              {
                icon: Headphones,
                label: "Podcasts",
                color: "text-purple-600",
                description: "Inspiring conversations",
                bgImage:
                  "https://images.pexels.com/photos/6724383/pexels-photo-6724383.jpeg",
              },
              {
                icon: BookOpen,
                label: "Audiobooks",
                color: "text-blue-600",
                description: "Stories that heal",
                bgImage:
                  "https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg",
              },
              {
                icon: Gamepad2,
                label: "Games",
                color: "text-yellow-600",
                description: "Interactive entertainment",
                bgImage:
                  "https://images.pexels.com/photos/11790883/pexels-photo-11790883.jpeg",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="relative bg-white border border-black/10 hover:border-black/20 shadow-sm hover:shadow-md transition-all duration-300 text-center overflow-hidden group"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-10"
                  style={{ backgroundImage: `url(${item.bgImage})` }}
                />
                <CardContent className="relative z-10 p-6">
                  <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {item.label}
                  </h3>
                  <p className="text-black/70 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Share your mood, let AI analyze your inputs, and receive
              personalized recommendations that support your well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border border-black/10 shadow-sm">
              <CardHeader>
                <Heart className="w-12 h-12 text-yellow-600 mb-4" />
                <CardTitle className="text-black">Share Your Mood</CardTitle>
                <CardDescription className="text-black/70">
                  Tell us about your day, feelings, and current emotional state
                  through our guided questionnaire.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-black/10 shadow-sm">
              <CardHeader>
                <Zap className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-black">AI Analysis</CardTitle>
                <CardDescription className="text-black/70">
                  Our AI processes your responses to understand your
                  preferences and emotional needs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-black/10 shadow-sm">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle className="text-black">Get Recommendations</CardTitle>
                <CardDescription className="text-black/70">
                  Receive content suggestions designed to improve your mood and
                  well-being.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Support & Activities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border border-black/10 shadow-sm">
              <CardHeader>
                <PhoneCall className="w-10 h-10 text-red-600 mb-3" />
                <CardTitle className="text-black">Feeling Really Low?</CardTitle>
                <CardDescription className="text-black/70">
                  If you are feeling very depressed, please reach out to a nearby
                  professional for help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="https://www.google.com/maps/search/mental+health+doctor+near+me"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="w-full bg-black text-white hover:bg-black/90">
                    Find Nearby Doctors
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white border border-black/10 shadow-sm">
              <CardHeader>
                <Gamepad2 className="w-10 h-10 text-indigo-600 mb-3" />
                <CardTitle className="text-black">Mini Games</CardTitle>
                <CardDescription className="text-black/70">
                  Short interactive games to relax and refocus.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/games">
                  <Button className="w-full bg-black text-white hover:bg-black/90">
                    Play Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white border border-black/10 shadow-sm">
              <CardHeader>
                <Activity className="w-10 h-10 text-emerald-600 mb-3" />
                <CardTitle className="text-black">Daily Mood Tracking</CardTitle>
                <CardDescription className="text-black/70">
                  Log your mood every day and watch your trends improve.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/dashboard">
                  <Button className="w-full bg-black text-white hover:bg-black/90">
                    View Your Progress
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Happy Users", icon: Users },
              { number: "50K+", label: "Recommendations", icon: Sparkles },
              { number: "95%", label: "Satisfaction Rate", icon: Heart },
              { number: "24/7", label: "Available", icon: Shield },
            ].map((stat, index) => (
              <div key={index} className="text-black">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-black" />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-black/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Track and Improve Your Mood?
          </h2>
          <p className="text-xl text-black/70 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are building healthier habits with
            guided tracking and activities.
          </p>
          <Link to="/assess">
            <Button size="lg" className="bg-black text-white hover:bg-black/90 text-lg px-8 py-4">
              <Brain className="w-5 h-5 mr-2" />
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white py-8">
        <div className="container mx-auto px-4 text-center text-black/60">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-black" />
            <span className="text-lg font-semibold text-black">Moody</span>
          </div>
          <p>&copy; 2024 Moody. Boosting your mood through personalized content.</p>
        </div>
      </footer>
    </div>
  );
}
