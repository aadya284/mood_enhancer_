import type { RequestHandler } from "express";

function stripCDATA(s: string) {
  return s.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1");
}

function decodeHtml(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseRSS(xml: string) {
  const items: {
    title: string;
    link: string;
    pubDate: string;
    source: string;
  }[] = [];
  const itemBlocks = xml.split(/<item>/g).slice(1);
  for (const raw of itemBlocks) {
    const block = raw.split(/<\/item>/)[0];
    const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/i);
    const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/i);
    const dateMatch =
      block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i) ||
      block.match(/<updated>([\s\S]*?)<\/updated>/i);
    const sourceMatch =
      block.match(/<source[^>]*>([\s\S]*?)<\/source>/i) ||
      block.match(/<dc:creator[^>]*>([\s\S]*?)<\/dc:creator>/i);
    const title = decodeHtml(stripCDATA(titleMatch?.[1] || ""));
    const link = decodeHtml(stripCDATA(linkMatch?.[1] || ""));
    const pubDate = decodeHtml(stripCDATA(dateMatch?.[1] || ""));
    const source = decodeHtml(stripCDATA(sourceMatch?.[1] || "Global News"));
    if (title && link) items.push({ title, link, pubDate, source });
  }
  return items;
}

export const handleMentalUpdates: RequestHandler = async (_req, res) => {
  try {
    const feeds = [
      "https://news.google.com/rss/search?q=mental+health&hl=en-US&gl=US&ceid=US:en",
      "https://news.google.com/rss/search?q=wellbeing+mindfulness&hl=en-US&gl=US&ceid=US:en",
    ];
    const results: any[] = [];
    for (const url of feeds) {
      try {
        const r = await fetch(url);
        const xml = await r.text();
        results.push(...parseRSS(xml));
      } catch {}
    }
    const seen = new Set<string>();
    const items = results
      .filter((i) => {
        if (seen.has(i.title)) return false;
        seen.add(i.title);
        return true;
      })
      .slice(0, 12)
      .map((i) => ({
        title: i.title,
        link: i.link,
        publishedAt: i.pubDate,
        source: i.source,
      }));
    res.json({ items });
  } catch (e) {
    res.status(200).json({ items: [] });
  }
};

export const handleDailyQuote: RequestHandler = async (_req, res) => {
  try {
    // Try ZenQuotes "today"
    const r = await fetch("https://zenquotes.io/api/today");
    if (r.ok) {
      const data = await r.json();
      const first = Array.isArray(data) ? data[0] : null;
      if (first && first.q) {
        return res.json({ quote: first.q, author: first.a || "Unknown" });
      }
    }
  } catch {}
  // Fallback to deterministic daily quote from local list
  const quotes = [
    {
      q: "Keep going. Everything you need will come to you at the perfect time.",
      a: "Unknown",
    },
    { q: "You are stronger than you think.", a: "Unknown" },
    { q: "Small steps every day.", a: "Unknown" },
    { q: "This too shall pass.", a: "Persian Proverb" },
    {
      q: "Start where you are. Use what you have. Do what you can.",
      a: "Arthur Ashe",
    },
    { q: "One day at a time.", a: "Unknown" },
    { q: "Be kind to your mind.", a: "Unknown" },
  ];
  const idx = new Date().getUTCDate() % quotes.length;
  const { q, a } = quotes[idx];
  res.json({ quote: q, author: a });
};
