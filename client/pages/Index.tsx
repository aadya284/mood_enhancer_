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
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">Moody</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/signin">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign in
                </Button>
              </Link>
              <Link to="/assess">
                <Button className="bg-white text-black hover:bg-white/90">
                  Start Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: "url(https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg)" }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <Badge className="mb-6 bg-white text-black border-white hover:bg-white/90">
            <Sparkles className="w-4 h-4 mr-2" /> AI-Powered Mood Support
          </Badge>

          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            Your Mood Tracker
          </h1>

          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            Track how you feel daily, get better recommendations, and use simple tools
            to feel better—now in a clean, high-contrast black theme.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/assess">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-4">
                <Brain className="w-5 h-5 mr-2" /> Check Your Mood
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/games">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                <Gamepad2 className="w-5 h-5 mr-2" /> Play Mini Games
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Activity, title: "Daily Check-ins", desc: "Log your mood daily with quick, simple prompts." },
              { icon: TrendingUp, title: "Mood Trends", desc: "Visualize progress and patterns over time." },
              { icon: Sparkles, title: "Better AI Recos", desc: "Smarter, diverse suggestions tailored to you." },
              { icon: Gamepad2, title: "Mini Games", desc: "Short activities to relax and refocus." },
              { icon: Shield, title: "Privacy First", desc: "Your data stays with you on your device." },
              { icon: PhoneCall, title: "Crisis Support", desc: "Quick access to nearby professional help." },
            ].map((f, i) => (
              <Card key={i} className="bg-zinc-900 border border-white/10">
                <CardHeader>
                  <f.icon className="w-10 h-10 text-white mb-3" />
                  <CardTitle className="text-white">{f.title}</CardTitle>
                  <CardDescription className="text-white/70">{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">All Your Favorite Content</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Film, label: "Movies", color: "text-red-400", description: "Curated films for every mood", bgImage: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg" },
              { icon: Music, label: "Music", color: "text-green-400", description: "Perfect playlists and songs", bgImage: "https://images.pexels.com/photos/3764004/pexels-photo-3764004.jpeg" },
              { icon: Headphones, label: "Podcasts", color: "text-purple-400", description: "Inspiring conversations", bgImage: "https://images.pexels.com/photos/6724383/pexels-photo-6724383.jpeg" },
              { icon: BookOpen, label: "Audiobooks", color: "text-blue-400", description: "Stories that heal", bgImage: "https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg" },
              { icon: Gamepad2, label: "Games", color: "text-yellow-400", description: "Interactive entertainment", bgImage: "https://images.pexels.com/photos/11790883/pexels-photo-11790883.jpeg" },
            ].map((item, index) => (
              <Card key={index} className="relative bg-zinc-900 border border-white/10 text-center overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-15" style={{ backgroundImage: `url(${item.bgImage})` }} />
                <CardContent className="relative z-10 p-6">
                  <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
                  <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Share your mood, let AI analyze your inputs, and receive personalized recommendations that support your well-being.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-zinc-900 border border-white/10">
              <CardHeader>
                <Heart className="w-12 h-12 text-yellow-400 mb-4" />
                <CardTitle>Share Your Mood</CardTitle>
                <CardDescription className="text-white/70">Tell us about your day through a quick questionnaire.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-zinc-900 border border-white/10">
              <CardHeader>
                <Zap className="w-12 h-12 text-blue-400 mb-4" />
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription className="text-white/70">We analyze your responses to understand your needs.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-zinc-900 border border-white/10">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
                <CardTitle>Get Recommendations</CardTitle>
                <CardDescription className="text-white/70">Receive content suggestions designed to improve your mood.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Support & Activities */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-zinc-900 border border-white/10">
              <CardHeader>
                <PhoneCall className="w-10 h-10 text-red-400 mb-3" />
                <CardTitle>Feeling Really Low?</CardTitle>
                <CardDescription className="text-white/70">Reach out to a nearby professional for help.</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="https://www.google.com/maps/search/mental+health+doctor+near+me" target="_blank" rel="noreferrer">
                  <Button className="w-full bg-white text-black hover:bg-white/90">Find Nearby Doctors</Button>
                </a>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border border-white/10">
              <CardHeader>
                <Gamepad2 className="w-10 h-10 text-indigo-400 mb-3" />
                <CardTitle>Mini Games</CardTitle>
                <CardDescription className="text-white/70">Short interactive games to relax and refocus.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/games">
                  <Button className="w-full bg-white text-black hover:bg-white/90">Play Now</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border border-white/10">
              <CardHeader>
                <Activity className="w-10 h-10 text-emerald-400 mb-3" />
                <CardTitle>Daily Mood Tracking</CardTitle>
                <CardDescription className="text-white/70">Log your mood every day and watch your trends improve.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/dashboard">
                  <Button className="w-full bg-white text-black hover:bg-white/90">View Your Progress</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Happy Users", icon: Users },
              { number: "50K+", label: "Recommendations", icon: Sparkles },
              { number: "95%", label: "Satisfaction Rate", icon: Heart },
              { number: "24/7", label: "Available", icon: Shield },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-white" />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Track and Improve Your Mood?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are building healthier habits with guided tracking and activities.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/assess">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-4">
                <Brain className="w-5 h-5 mr-2" /> Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/signin">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8">
        <div className="container mx-auto px-4 text-center text-white/70">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-white" />
            <span className="text-lg font-semibold text-white">Moody</span>
          </div>
          <p>&copy; 2024 Moody. Boosting your mood through personalized content.</p>
        </div>
      </footer>
    </div>
  );
}
