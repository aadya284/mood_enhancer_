import { RequestHandler } from "express";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface MoodAssessment {
  mood: string;
  day: string;
  energy: string;
  story: string;
  preferences: string;
  activity: string;
}

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

interface RecommendationResponse {
  mood: string;
  categories: {
    movies: Recommendation[];
    music: Recommendation[];
    podcasts: Recommendation[];
    audiobooks: Recommendation[];
    games: Recommendation[];
  };
}

// Function to get images from Unsplash
async function getUnsplashImage(query: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
    
    // Fallback to placeholder if no image found
    return `/placeholder.svg`;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return `/placeholder.svg`;
  }
}

// Function to get AI recommendations
async function getAIRecommendations(assessment: MoodAssessment): Promise<RecommendationResponse> {
  // Add randomness to get different recommendations each time
  const randomSeed = Math.floor(Math.random() * 1000);

  const prompt = `
Based on this person's mood assessment, provide 2 DIVERSE and DIFFERENT personalized recommendations for each category. Use variety and avoid repeating the same popular titles.

Mood Assessment:
- Current mood: ${assessment.mood}
- Day rating: ${assessment.day}
- Energy level: ${assessment.energy}
- Personal story: ${assessment.story}
- Content preferences: ${assessment.preferences}
- Desired activity: ${assessment.activity}
- Random seed: ${randomSeed}

IMPORTANT:
- Provide DIFFERENT recommendations each time, not the same popular ones
- Include both mainstream AND lesser-known quality content
- For images, provide SPECIFIC search terms that will find actual movie posters, album covers, etc.

Please provide recommendations in this exact JSON format:
{
  "movies": [
    {
      "title": "Movie Title",
      "description": "Brief description",
      "genre": "Genre",
      "duration": "1h 30m",
      "rating": 4.5,
      "reason": "Why this matches their mood",
      "searchQuery": "Movie Title 2023 movie poster"
    }
  ],
  "music": [
    {
      "title": "Song/Album/Playlist Title",
      "description": "Brief description",
      "genre": "Genre",
      "duration": "3:45",
      "rating": 4.8,
      "reason": "Why this matches their mood",
      "searchQuery": "Artist Name Album Title album cover"
    }
  ],
  "podcasts": [
    {
      "title": "Podcast Title",
      "description": "Brief description",
      "genre": "Category",
      "duration": "45m",
      "rating": 4.7,
      "reason": "Why this matches their mood",
      "searchQuery": "Podcast Title podcast logo cover"
    }
  ],
  "audiobooks": [
    {
      "title": "Book Title",
      "description": "Brief description", 
      "genre": "Genre",
      "duration": "8h 30m",
      "rating": 4.6,
      "reason": "Why this matches their mood",
      "searchQuery": "book cover audiobook"
    }
  ],
  "games": [
    {
      "title": "Game Title",
      "description": "Brief description",
      "genre": "Genre", 
      "rating": 4.9,
      "reason": "Why this matches their mood",
      "searchQuery": "video game screenshot"
    }
  ]
}

Make sure all recommendations are real, popular content that exists. Focus on content that would genuinely help improve or complement their current emotional state.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a mood-based content recommendation expert. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Parse the AI response
    const aiRecommendations = JSON.parse(content);
    
    // Process each category and add images + IDs
    const processedCategories: any = {};
    
    for (const [category, items] of Object.entries(aiRecommendations)) {
      processedCategories[category] = await Promise.all(
        (items as any[]).map(async (item, index) => {
          const imageUrl = await getUnsplashImage(item.searchQuery || item.title);
          
          return {
            id: `${category}_${index + 1}`,
            title: item.title,
            description: item.description,
            genre: item.genre,
            duration: item.duration,
            rating: item.rating,
            reason: item.reason,
            imageUrl,
            externalUrl: "#" // You can add real URLs later
          };
        })
      );
    }

    return {
      mood: assessment.mood,
      categories: processedCategories
    };

  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    
    // Fallback to a basic response if AI fails
    return {
      mood: assessment.mood,
      categories: {
        movies: [
          {
            id: "fallback_1",
            title: "The Pursuit of Happyness",
            description: "An inspiring story of perseverance",
            genre: "Drama",
            duration: "1h 57m",
            rating: 4.8,
            reason: "Uplifting story to match your mood",
            imageUrl: await getUnsplashImage("movie happy"),
            externalUrl: "#"
          }
        ],
        music: [
          {
            id: "fallback_2", 
            title: "Feel Good Playlist",
            description: "Upbeat songs to boost your energy",
            genre: "Pop",
            duration: "2h 30m",
            rating: 4.9,
            reason: "Perfect for your current mood",
            imageUrl: await getUnsplashImage("music headphones"),
            externalUrl: "#"
          }
        ],
        podcasts: [
          {
            id: "fallback_3",
            title: "The Happiness Lab",
            description: "Science-backed ways to feel happier",
            genre: "Self-Help",
            duration: "45m",
            rating: 4.8,
            reason: "Enhance your positive mindset",
            imageUrl: await getUnsplashImage("podcast microphone"),
            externalUrl: "#"
          }
        ],
        audiobooks: [
          {
            id: "fallback_4",
            title: "The Power of Positive Thinking",
            description: "Classic self-help audiobook",
            genre: "Self-Help",
            duration: "8h 30m",
            rating: 4.6,
            reason: "Reinforce your positive outlook",
            imageUrl: await getUnsplashImage("audiobook headphones"),
            externalUrl: "#"
          }
        ],
        games: [
          {
            id: "fallback_5",
            title: "Stardew Valley",
            description: "Peaceful farming simulation",
            genre: "Simulation",
            rating: 4.9,
            reason: "Relaxing and rewarding",
            imageUrl: await getUnsplashImage("peaceful game"),
            externalUrl: "#"
          }
        ]
      }
    };
  }
}

export const handleRecommendations: RequestHandler = async (req, res) => {
  try {
    // Validate API keys
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.' 
      });
    }

    if (!process.env.UNSPLASH_ACCESS_KEY) {
      console.warn('Unsplash API key not found. Using placeholder images.');
    }

    const assessment: MoodAssessment = req.body;
    
    // Validate request body
    if (!assessment || !assessment.mood) {
      return res.status(400).json({ 
        error: 'Invalid request. Mood assessment data is required.' 
      });
    }

    // Get AI-powered recommendations
    const recommendations = await getAIRecommendations(assessment);
    
    res.json(recommendations);
    
  } catch (error) {
    console.error('Error in recommendations endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendations. Please try again.' 
    });
  }
};
