// Search comics from ComicK API
export default async function handler(req, res) {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query required' });
  }

  try {
    const response = await fetch(
      `https://api.comick.cc/v1.0/search?q=${encodeURIComponent(q)}&limit=20`
    );
    
    if (!response.ok) {
      throw new Error('ComicK API error');
    }
    
    const data = await response.json();
    
    // Transform the data to match your format
    const comics = data.map(comic => ({
      id: comic.hid || comic.slug,
      title: comic.title,
      slug: comic.slug,
      author: comic.author || 'Unknown',
      cover_image: comic.cover_url ? `https://meo.comick.pictures/${comic.cover_url}` : null,
      type: comic.content_rating || 'manga',
      status: comic.status || 'unknown',
      description: comic.desc || '',
      // Store the original comick data for reference
      comick_id: comic.hid,
    }));
    
    res.status(200).json(comics);
  } catch (error) {
    console.error('Error fetching from ComicK:', error);
    res.status(500).json({ error: 'Failed to search comics' });
  }
}