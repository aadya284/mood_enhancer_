import { RequestHandler } from "express";
import OpenAI from "openai";

// Simple cache to avoid repeating images in the same session
const usedImages = new Set<string>();


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
      // Use diverse high-quality images from Pexels based on specific content
      const specificImages: Record<string, string> = {
        // Movies
        'spider-man': 'https://images.pexels.com/photos/163077/mario-luigi-yoschi-figures-163077.jpeg?w=400&h=600&fit=crop',
        'dune': 'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?w=400&h=600&fit=crop',
        'movie': 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=400&h=600&fit=crop',

        // Music
        'weeknd': 'https://images.pexels.com/photos/3693586/pexels-photo-3693586.jpeg?w=400&h=600&fit=crop',
        'dua lipa': 'https://images.pexels.com/photos/3756242/pexels-photo-3756242.jpeg?w=400&h=600&fit=crop',
        'music': 'https://images.pexels.com/photos/3764004/pexels-photo-3764004.jpeg?w=400&h=600&fit=crop',

        // Podcasts
        'joe rogan': 'https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?w=400&h=600&fit=crop',
        'conan': 'https://images.pexels.com/photos/6956912/pexels-photo-6956912.jpeg?w=400&h=600&fit=crop',
        'podcast': 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?w=400&h=600&fit=crop',

        // Books
        'atomic habits': 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?w=400&h=600&fit=crop',
        'midnight library': 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?w=400&h=600&fit=crop',
        'book': 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?w=400&h=600&fit=crop',

        // Games
        'hades': 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?w=400&h=600&fit=crop',
        'zelda': 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?w=400&h=600&fit=crop',
        'game': 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?w=400&h=600&fit=crop'
      };

      // Try to find specific image based on query content
      const lowerQuery = query.toLowerCase();
      for (const [key, url] of Object.entries(specificImages)) {
        if (lowerQuery.includes(key)) {
          return url;
        }
      }

      // Fallback to category-based images
      const categoryImages = ['movie', 'music', 'podcast', 'book', 'game'];
      for (const category of categoryImages) {
        if (lowerQuery.includes(category)) {
          return specificImages[category];
        }
      }

      // Random fallback to avoid same image, ensuring uniqueness
      const randomImages = [
        // Movies
        'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=400&h=600&fit=crop',
        'https://images.pexels.com/photos/33450578/pexels-photo-33450578.jpeg?w=400&h=600&fit=crop',

        // Music
        'https://images.pexels.com/photos/3764004/pexels-photo-3764004.jpeg?w=400&h=600&fit=crop',
        'https://images.pexels.com/photos/3693108/pexels-photo-3693108.jpeg?w=400&h=600&fit=crop',
        'https://images.pexels.com/photos/3693586/pexels-photo-3693586.jpeg?w=400&h=600&fit=crop',

        // Podcasts
        'https://images.pexels.com/photos/6956912/pexels-photo-6956912.jpeg?w=400&h=600&fit=crop',
        'https://images.pexels.com/photos/33456955/pexels-photo-33456955.jpeg?w=400&h=600&fit=crop',

        // Books
        'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?w=400&h=600&fit=crop',
        'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?w=400&h=600&fit=crop',
        'https://images.pexels.com/photos/33451743/pexels-photo-33451743.jpeg?w=400&h=600&fit=crop',

        // Games
        'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?w=400&h=600&fit=crop',
        'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?w=400&h=600&fit=crop',
        'https://images.pexels.com/photos/9833533/pexels-photo-9833533.jpeg?w=400&h=600&fit=crop',

        // Additional variety
        'https://images.pexels.com/photos/163077/mario-luigi-yoschi-figures-163077.jpeg?w=400&h=600&fit=crop',
        'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?w=400&h=600&fit=crop'
      ];

      // Try to find an unused image
      for (const img of randomImages) {
        if (!usedImages.has(img)) {
          usedImages.add(img);
          return img;
        }
      }

      // If all images used, clear cache and start over
      usedImages.clear();
      const randomImg = randomImages[Math.floor(Math.random() * randomImages.length)];
      usedImages.add(randomImg);
      return randomImg;
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const imageUrl = data.results[0].urls.regular;
      usedImages.add(imageUrl);
      return imageUrl;
    }

    // Fallback to high-quality Pexels images
    const fallbackUrl = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=400&h=600&fit=crop';
    usedImages.add(fallbackUrl);
    return fallbackUrl;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    // Return high-quality fallback instead of placeholder.svg
    const fallbackUrl = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=400&h=600&fit=crop';
    usedImages.add(fallbackUrl);
    return fallbackUrl;
  }
}

// Function to get AI recommendations
async function getAIRecommendations(assessment: MoodAssessment): Promise<RecommendationResponse> {
  // Add randomness to get different recommendations each time
  const randomSeed = Math.floor(Math.random() * 1000);

  const prompt = `
You are a mood-based content curator. Return high-quality, diverse picks.
Provide 2 varied recommendations per category that fit the user's mood and energy.
Include a thoughtful reason for each.

Mood Assessment:
- Current mood: ${assessment.mood}
- Day rating: ${assessment.day}
- Energy level: ${assessment.energy}
- Personal story: ${assessment.story}
- Content preferences: ${assessment.preferences}
- Desired activity: ${assessment.activity}
- Random seed: ${randomSeed}

QUALITY RULES:
- Mix mainstream hits with lesser-known gems; avoid repeating the same famous titles.
- Prefer recent releases when relevant, but include timeless picks.
- Balance genres and lengths; offer approachable options.
- Be factual; only include real content that exists.
- For images, give SPECIFIC search terms to find posters/covers.

Return ONLY valid JSON in this exact shape:
{
  "movies": [{"title":"","description":"","genre":"","duration":"","rating":4.7,"reason":"","searchQuery":""}],
  "music": [{"title":"","description":"","genre":"","duration":"","rating":4.7,"reason":"","searchQuery":""}],
  "podcasts": [{"title":"","description":"","genre":"","duration":"","rating":4.7,"reason":"","searchQuery":""}],
  "audiobooks": [{"title":"","description":"","genre":"","duration":"","rating":4.7,"reason":"","searchQuery":""}],
  "games": [{"title":"","description":"","genre":"","rating":4.7,"reason":"","searchQuery":""}]
}
`;

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OPENAI_API_KEY');
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const messages = [
      { role: "system", content: "You are a mood-based content recommendation expert. Always respond with valid JSON only, no additional text." },
      { role: "user", content: prompt },
    ] as const;

    const models = ["gpt-4o-mini", "gpt-4o", "gpt-3.5-turbo"] as const;
    let content: string | undefined;
    for (const m of models) {
      try {
        const completion = await openai.chat.completions.create({
          model: m,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
        });
        content = completion.choices[0]?.message?.content;
        if (content) break;
      } catch (_) {
        // try next model
      }
    }
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
          
          const query = encodeURIComponent(`${item.title} ${item.genre || ""}`.trim());
          const externalUrl = `https://www.google.com/search?q=${query}`;
          return {
            id: `${category}_${index + 1}`,
            title: item.title,
            description: item.description,
            genre: item.genre,
            duration: item.duration,
            rating: item.rating,
            reason: item.reason,
            imageUrl,
            externalUrl,
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
        imageUrl: await getUnsplashImage("spider-man into spider-verse animated"),
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
        imageUrl: await getUnsplashImage("dune desert sci-fi"),
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
            imageUrl: await getUnsplashImage("weeknd blinding lights neon"),
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
            imageUrl: await getUnsplashImage("dua lipa disco colorful"),
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
            imageUrl: await getUnsplashImage("joe rogan microphone studio"),
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
            imageUrl: await getUnsplashImage("conan comedy podcast"),
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
            imageUrl: await getUnsplashImage("atomic habits self improvement"),
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
            imageUrl: await getUnsplashImage("midnight library books"),
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
            imageUrl: await getUnsplashImage("hades mythology gaming"),
            externalUrl: "#"
          },
          {
            id: "fallback_10",
            title: "The Legend of Zelda: Breath of the Wild",
            description: "Open-world adventure masterpiece",
            genre: "Adventure",
            rating: 4.8,
            reason: "Immersive exploration and discovery",
            imageUrl: await getUnsplashImage("zelda adventure fantasy"),
            externalUrl: "#"
          }
        ]
      }
    };
  }
}

export const handleRecommendations: RequestHandler = async (req, res) => {
  try {
    // Validate API keys (non-fatal in dev; fall back when missing)
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured. Using fallback recommendations.');
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
