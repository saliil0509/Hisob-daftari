/**
 * YouTube Utility Helper
 * Extracts video IDs, formats embed URLs, and provides thumbnail image links.
 */

export const extractYouTubeId = (url?: string): string | null => {
  if (!url || typeof url !== 'string') return null;
  const clean = url.trim();
  
  // Standard formats:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  // - VIDEO_ID directly (11 chars)
  
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = clean.match(regExp);
  if (match && match[1]) {
    return match[1];
  }

  // If directly an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }

  return null;
};

export const getYouTubeEmbedUrl = (url?: string): string => {
  const id = extractYouTubeId(url);
  if (id) {
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
  }
  // Default educational finance video fallback
  return 'https://www.youtube-nocookie.com/embed/PHe0bXAIuk8?rel=0&modestbranding=1';
};

export const getYouTubeThumbnail = (url?: string): string => {
  const id = extractYouTubeId(url);
  if (id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80';
};
