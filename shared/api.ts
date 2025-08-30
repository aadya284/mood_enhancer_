/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface QuoteResponse {
  quote: string;
  author: string;
}

export interface MentalUpdateItem {
  title: string;
  link: string;
  publishedAt: string;
  source: string;
}

export interface MentalUpdatesResponse {
  items: MentalUpdateItem[];
}
