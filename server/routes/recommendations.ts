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
    if (!process.env.UNSPLASH_ACCESS_KEY) {
      // Use high-quality placeholder images from Pexels
      const categoryImages: Record<string, string> = {
        'movie': 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=400&h=600&fit=crop',
        'music': 'https://images.pexels.com/photos/3764004/pexels-photo-3764004.jpeg?w=400&h=600&fit=crop',
        'podcast': 'https://images.pexels.com/photos/6956912/pexels-photo-6956912.jpeg?w=400&h=600&fit=crop',
        'book': 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?w=400&h=600&fit=crop',
        'game': 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?w=400&h=600&fit=crop'
      };

      for (const [key, url] of Object.entries(categoryImages)) {
        if (query.toLowerCase().includes(key)) {
          return url;
        }
      }
      return categoryImages.movie; // Default fallback
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }

    // Fallback to high-quality Pexels images
    return 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=400&h=600&fit=crop';
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    // Return high-quality fallback instead of placeholder.svg
    return 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=400&h=600&fit=crop';
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
      "searchQuery": "Book Title Author book cover"
    }
  ],
  "games": [
    {
      "title": "Game Title",
      "description": "Brief description",
      "genre": "Genre",
      "rating": 4.9,
      "reason": "Why this matches their mood",
      "searchQuery": "Game Title video game poster cover art"
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
    
    // Fallback to diverse responses if AI fails
    const fallbackMovies = [
      {
        id: "fallback_1",
        title: "Spider-Man: Into the Spider-Verse",
        description: "Animated superhero adventure",
        genre: "Animation",
        duration: "1h 57m",
        rating: 4.8,
        reason: "Visually stunning and uplifting",
        imageUrl: await getUnsplashImage("Spider-Man Into Spider-Verse movie poster"),
        externalUrl: "#"
      },
      {
        id: "fallback_2",
        title: "Dune",
        description: "Epic sci-fi masterpiece",
        genre: "Sci-Fi",
        duration: "2h 35m",
        rating: 4.7,
        reason: "Immersive and visually breathtaking",
        imageUrl: await getUnsplashImage("Dune 2021 movie poster"),
        externalUrl: "#"
      }
    ];

    return {
      mood: assessment.mood,
      categories: {
        movies: fallbackMovies,
        music: [
          {
            id: "fallback_3",
            title: "Blinding Lights - The Weeknd",
            description: "Upbeat synth-pop anthem",
            genre: "Pop",
            duration: "3h 22m",
            rating: 4.9,
            reason: "Energetic and mood-lifting",
            imageUrl: await getUnsplashImage("The Weeknd Blinding Lights album cover"),
            externalUrl: "#"
          },
          {
            id: "fallback_4",
            title: "Levitating - Dua Lipa",
            description: "Disco-pop dance track",
            genre: "Pop",
            duration: "3h 23m",
            rating: 4.8,
            reason: "Infectious energy and positivity",
            imageUrl: await getUnsplashImage("Dua Lipa Future Nostalgia album cover"),
            externalUrl: "#"
          }
        ],
        podcasts: [
          {
            id: "fallback_5",
            title: "The Joe Rogan Experience",
            description: "Long-form conversations with interesting people",
            genre: "Interview",
            duration: "2h 45m",
            rating: 4.8,
            reason: "Engaging discussions to shift your focus",
            imageUrl: await getUnsplashImage("Joe Rogan Experience podcast logo"),
            externalUrl: "#"
          },
          {
            id: "fallback_6",
            title: "Conan O'Brien Needs a Friend",
            description: "Comedy podcast with celebrity guests",
            genre: "Comedy",
            duration: "1h 15m",
            rating: 4.7,
            reason: "Lighthearted humor to boost mood",
            imageUrl: await getUnsplashImage("Conan O'Brien podcast cover"),
            externalUrl: "#"
          }
        ],
        audiobooks: [
          {
            id: "fallback_7",
            title: "Atomic Habits - James Clear",
            description: "Transform your life with tiny changes",
            genre: "Self-Help",
            duration: "5h 35m",
            rating: 4.8,
            reason: "Practical strategies for positive change",
            imageUrl: await getUnsplashImage("Atomic Habits James Clear book cover"),
            externalUrl: "#"
          },
          {
            id: "fallback_8",
            title: "The Midnight Library - Matt Haig",
            description: "Philosophical novel about life's possibilities",
            genre: "Fiction",
            duration: "8h 30m",
            rating: 4.6,
            reason: "Thought-provoking and uplifting story",
            imageUrl: await getUnsplashImage("Midnight Library Matt Haig book cover"),
            externalUrl: "#"
          }
        ],
        games: [
          {
            id: "fallback_9",
            title: "Hades",
            description: "Action-packed roguelike with great story",
            genre: "Action",
            rating: 4.9,
            reason: "Engaging gameplay and positive progression",
            imageUrl: await getUnsplashImage("Hades game cover art"),
            externalUrl: "#"
          },
          {
            id: "fallback_10",
            title: "The Legend of Zelda: Breath of the Wild",
            description: "Open-world adventure masterpiece",
            genre: "Adventure",
            rating: 4.8,
            reason: "Immersive exploration and discovery",
            imageUrl: await getUnsplashImage("Zelda Breath Wild game poster"),
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
