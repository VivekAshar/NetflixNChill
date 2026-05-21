/**
 * TMDB API Module
 * Fetches movie data from The Movie Database (TMDB) API v3
 * 
 * NO DOM MANIPULATION — Pure functions only
 * All functions return Promises
 */

const TMDB = (() => {
  // TMDB API configuration
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

  /**
   * Generic TMDB fetch helper
   * @param {string} endpoint - API endpoint (e.g., '/movie/123')
   * @param {string} apiKey - TMDB API key
   * @param {object} extraParams - Additional query parameters
   * @returns {Promise<object>} - API response JSON
   */
  async function fetchFromTMDB(endpoint, apiKey, extraParams = {}) {
    if (!apiKey || apiKey === 'paste-your-key-here') {
      throw new Error('❌ TMDB API key is missing! Please add your key to config.js');
    }

    const params = new URLSearchParams({
      api_key: apiKey,
      language: 'en-US',
      ...extraParams
    });

    const url = `${BASE_URL}${endpoint}?${params}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('❌ Invalid TMDB API key. Please check your key in config.js');
        }
        if (response.status === 404) {
          throw new Error(`❌ Resource not found: ${endpoint}`);
        }
        throw new Error(`❌ TMDB API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('❌ Network error: Cannot connect to TMDB. Check your internet connection.');
      }
      throw error;
    }
  }

  /**
   * Fetch details for a single movie
   * @param {number} movieId - TMDB movie ID
   * @param {string} apiKey - TMDB API key
   * @returns {Promise<object>} - Movie object with formatted data
   */
  async function getMovieDetails(movieId, apiKey) {
    try {
      const data = await fetchFromTMDB(`/movie/${movieId}`, apiKey);
      
      return {
        id: data.id,
        title: data.title || 'Shah Rukh Khan Film',
        originalTitle: data.original_title || '',
        year: data.release_date ? new Date(data.release_date).getFullYear() : null,
        releaseDate: data.release_date || null,
        runtime: data.runtime || null,
        genres: data.genres ? data.genres.map(g => g.name) : [],
        synopsis: data.overview || 'A classic Shah Rukh Khan film.',
        posterUrl: data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : null,
        backdropUrl: data.backdrop_path ? `${BACKDROP_BASE_URL}${data.backdrop_path}` : null,
        rating: data.vote_average || 0,
        voteCount: data.vote_count || 0,
        popularity: data.popularity || 0,
        tagline: data.tagline || '',
        status: data.status || '',
        originalLanguage: data.original_language || 'hi'
      };
    } catch (error) {
      console.warn(`⚠️ Failed to fetch movie ${movieId}:`, error.message);
      // Return fallback object instead of rejecting
      return {
        id: movieId,
        title: 'Shah Rukh Khan Film',
        originalTitle: '',
        year: null,
        releaseDate: null,
        runtime: null,
        genres: [],
        synopsis: 'A classic Shah Rukh Khan film.',
        posterUrl: null,
        backdropUrl: null,
        rating: 0,
        voteCount: 0,
        popularity: 0,
        tagline: '',
        status: '',
        originalLanguage: 'hi',
        error: true
      };
    }
  }

  /**
   * Fetch details for multiple movies in parallel
   * @param {number[]} movieIds - Array of TMDB movie IDs
   * @param {string} apiKey - TMDB API key
   * @returns {Promise<object[]>} - Array of movie objects
   */
  async function fetchAllFilms(movieIds, apiKey) {
    if (!Array.isArray(movieIds) || movieIds.length === 0) {
      throw new Error('❌ movieIds must be a non-empty array');
    }

    console.log(`🎬 Fetching ${movieIds.length} films from TMDB...`);
    
    // Fetch all movies in parallel
    const promises = movieIds.map(id => getMovieDetails(id, apiKey));
    const results = await Promise.all(promises);
    
    console.log(`✅ Successfully fetched ${results.filter(r => !r.error).length}/${movieIds.length} films`);
    
    return results;
  }

  /**
   * Search for a person (actor/director) by name
   * @param {string} query - Search query (e.g., "Shah Rukh Khan")
   * @param {string} apiKey - TMDB API key
   * @returns {Promise<object[]>} - Array of person results
   */
  async function searchPerson(query, apiKey) {
    const data = await fetchFromTMDB('/search/person', apiKey, { query });
    return data.results || [];
  }

  /**
   * Get movie credits for a person (films they appeared in)
   * @param {number} personId - TMDB person ID
   * @param {string} apiKey - TMDB API key
   * @returns {Promise<object[]>} - Array of movie credits
   */
  async function getPersonMovieCredits(personId, apiKey) {
    const data = await fetchFromTMDB(`/person/${personId}/movie_credits`, apiKey);
    return data.cast || [];
  }

  /**
   * Get high-quality images for a movie (posters, backdrops)
   * @param {number} movieId - TMDB movie ID
   * @param {string} apiKey - TMDB API key
   * @returns {Promise<object>} - Object with posters and backdrops arrays
   */
  async function getMovieImages(movieId, apiKey) {
    const data = await fetchFromTMDB(`/movie/${movieId}/images`, apiKey);
    return {
      posters: data.posters || [],
      backdrops: data.backdrops || []
    };
  }

  /**
   * Build complete poster URL from path
   * @param {string} posterPath - TMDB poster path (e.g., "/abc123.jpg")
   * @param {string} size - Image size (w92, w154, w185, w342, w500, w780, original)
   * @returns {string} - Full poster URL
   */
  function getPosterUrl(posterPath, size = 'w500') {
    if (!posterPath) return null;
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
  }

  /**
   * Build complete backdrop URL from path
   * @param {string} backdropPath - TMDB backdrop path
   * @param {string} size - Image size (w300, w780, w1280, original)
   * @returns {string} - Full backdrop URL
   */
  function getBackdropUrl(backdropPath, size = 'original') {
    if (!backdropPath) return null;
    return `https://image.tmdb.org/t/p/${size}${backdropPath}`;
  }

  // Public API
  return {
    fetchAllFilms,
    getMovieDetails,
    searchPerson,
    getPersonMovieCredits,
    getMovieImages,
    getPosterUrl,
    getBackdropUrl,
    BASE_URL,
    IMAGE_BASE_URL,
    BACKDROP_BASE_URL
  };
})();

// Make available globally (for vanilla JS)
if (typeof window !== 'undefined') {
  window.TMDB = TMDB;
}

// Export for ES modules (future-proof)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TMDB;
}