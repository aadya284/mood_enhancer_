# 🧠 Moody - AI-Powered Mood Enhancement Platform

A beautiful, modern web application that uses AI to analyze your mood and provide personalized recommendations for movies, music, podcasts, audiobooks, and games to enhance your emotional well-being.

![Moody Preview](https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?w=800&h=400&fit=crop)

## ✨ Features

- **🤖 AI-Powered Analysis**: Uses OpenAI to understand your mood and preferences
- **🎯 Personalized Recommendations**: Get tailored content suggestions across 5 categories
- **📸 Beautiful Imagery**: Real photos from Unsplash for every recommendation
- **📊 Mood Tracking**: Dashboard to track your emotional journey over time
- **🎨 Modern UI**: Beautiful gradient design with glass-morphism effects
- **📱 Responsive**: Works perfectly on all devices

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/AK050744/mood_enhancer_.git
cd mood_enhancer_
```

### 2. Install Dependencies
```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 3. Set Up API Keys

#### Get OpenAI API Key (Required)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy your API key

#### Get Unsplash API Key (Optional - for better images)
1. Visit [Unsplash Developers](https://unsplash.com/developers)
2. Create an account and register an application
3. Copy your Access Key

#### Configure Environment Variables
You can set environment variables in two ways:

**Option A: Using DevServerControl (Recommended for secrets)**
```bash
# Start the dev server first
pnpm dev

# Then use the DevServerControl in the Builder.io interface to set:
# OPENAI_API_KEY: your_actual_openai_key
# UNSPLASH_ACCESS_KEY: your_actual_unsplash_key
```

**Option B: Create .env file**
```bash
cp .env.example .env
# Edit .env and add your actual API keys
```

### 4. Run the Application
```bash
pnpm dev
```

Visit `http://localhost:8080` to see your app! 🎉

## 🏗️ Project Structure

```
mood_enhancer_/
├── client/                 # React frontend
│   ├── pages/             # Route components
│   │   ├── Index.tsx      # Homepage with hero section
│   │   ├── Assessment.tsx # Mood questionnaire
│   │   ├── Recommendations.tsx # AI recommendations
│   │   └── Dashboard.tsx  # Mood tracking dashboard
│   ├── components/ui/     # Reusable UI components
│   └── global.css         # Tailwind styles & theme
├── server/                # Express backend
│   ├── routes/           # API endpoints
│   │   └── recommendations.ts # AI-powered recommendations
│   └── index.ts          # Server setup
└── shared/               # Shared TypeScript types
```

## 🎨 Design Features

### Color Scheme
- **Purple to Cyan Gradient**: Main brand colors
- **Mood-specific Colors**: 
  - Happy: Yellow (`#FFEB3B`)
  - Calm: Cyan (`#00BCD4`)
  - Sad: Blue (`#2196F3`)
  - Angry: Red (`#F44336`)

### UI Components
- **Glass-morphism**: Translucent cards with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Responsive Grid**: Adapts to all screen sizes
- **Beautiful Typography**: Clear hierarchy and readability

## 🤖 AI Integration

### OpenAI Integration
- Uses GPT-3.5-turbo for content recommendations
- Analyzes mood, energy level, preferences, and personal story
- Generates contextual reasons for each recommendation
- Fallback to mock data if API fails

### Unsplash Integration
- Fetches real, beautiful images for each recommendation
- Dynamic search based on content type and title
- Automatic fallback to placeholder images
- Optimized image sizes for performance

## 📊 Features Breakdown

### 1. Homepage (`/`)
- Gradient hero section with call-to-action
- Content category overview with background images
- Feature explanations and statistics
- Modern navigation with glass-morphism

### 2. Mood Assessment (`/assess`)
- Multi-step questionnaire with progress tracking
- Emoji-based mood selection
- Text areas for personal stories
- Smooth navigation between questions

### 3. AI Recommendations (`/recommendations`)
- Tabbed interface for 5 content categories
- Beautiful image cards for each recommendation
- Thumbs up/down feedback system
- Reasons why each item was recommended

### 4. Dashboard (`/dashboard`)
- Mood history visualization
- Weekly/monthly statistics
- Content usage analytics
- Personal insights and trends

## 🔧 Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm test       # Run Vitest tests
pnpm typecheck  # TypeScript validation
```

## 🌟 Key Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Express, Node.js
- **AI**: OpenAI GPT-3.5-turbo
- **Images**: Unsplash API
- **UI Components**: Radix UI, Lucide React icons
- **Routing**: React Router 6
- **State Management**: React hooks + localStorage

## 🎯 Hackathon Ready

This project is perfect for hackathons because it:
- ✅ **Solves a real problem**: Mental health and mood enhancement
- ✅ **Uses cutting-edge AI**: OpenAI integration for smart recommendations
- ✅ **Beautiful UI/UX**: Professional, modern design
- ✅ **Full-stack**: Complete frontend and backend
- ✅ **Demo-ready**: Works with mock data if APIs aren't configured
- ✅ **Scalable**: Built with production-ready tools and patterns

## 📝 API Endpoints

### POST `/api/recommendations`
Generate AI-powered content recommendations based on mood assessment.

**Request Body:**
```json
{
  "mood": "happy",
  "day": "Amazing",
  "energy": "High",
  "story": "Had a great day at work...",
  "preferences": "Uplifting movies",
  "activity": "Watch something"
}
```

**Response:**
```json
{
  "mood": "happy",
  "categories": {
    "movies": [...],
    "music": [...],
    "podcasts": [...],
    "audiobooks": [...],
    "games": [...]
  }
}
```

## 🚀 Deployment

The app is ready for deployment on:
- **Netlify**: Static site hosting
- **Vercel**: Full-stack deployment
- **Railway**: Backend hosting
- **Heroku**: Traditional cloud platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for the powerful GPT-3.5 API
- **Unsplash** for beautiful, free images
- **Pexels** for additional stock photography
- **Radix UI** for accessible components
- **Tailwind CSS** for utility-first styling

---

**Built with ❤️ for better mental health and emotional well-being**

*Transform your day with AI-powered mood enhancement!* 🌈
