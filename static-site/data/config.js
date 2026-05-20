const CONFIG = {

  // ============================================================
  // PASTE YOUR FREE TMDB API KEY HERE
  // Get it free in 2 minutes at: https://www.themoviedb.org/settings/api
  // Instructions: See README.md "Getting Your FREE TMDB API Key" section
  // ============================================================
  TMDB_API_KEY: "e7f16058c1bcd52af4e0f3f03f5e7bc8",

  // ============================================================
  // LOGIN CREDENTIALS — change these to whatever you want
  // The login page will check against these values
  // ============================================================
  credentials: {
    username: "xxx",
    password: "xxx"
  },

  // ============================================================
  // Name of the birthday person — used across all pages
  // ============================================================
  birthdayPersonName: "Priya",

  // ============================================================
  // PROFILE CARDS — replace images in /assets/profiles/
  // Add your profile photos as profile1.jpg, profile2.jpg, etc.
  // ============================================================
  profiles: [
    { name: "Priya",  image: "assets/profiles/profile1.jpg" },
    { name: "Friend", image: "assets/profiles/profile2.jpg" },
    { name: "Family", image: "assets/profiles/profile3.jpg" },
    { name: "Guest",  image: "assets/profiles/profile4.jpg" }
  ],

  // ============================================================
  // HERO BANNER — replace image in /assets/hero/
  // This is the big banner at the top of the main page
  // ============================================================
  hero: {
    image:   "assets/hero/hero.jpg",
    heading: "Happy Birthday, Priya",
    subtext: "A world of SRK. A universe of love. All for you."
  },

  // ============================================================
  // ROW TITLES — These are the category labels for movie rows
  // You can edit, add, or remove rows as needed
  // ============================================================
  rows: [
    "SRK Classics",
    "SRK Romance Universe",
    "SRK Bollywood Comfort Cinema",
    "Continue Watching",
    "Recommended For You",
    "Because You Watched DDLJ",
    "SRK Birthday Specials",
    "Top 10 SRK Films",
    "SRK Award Winners",
    "More Like Pathaan"
  ],

  // ============================================================
  // SRK FILMS — TMDB Movie IDs
  // Posters, titles, synopses, genres, ratings fetched automatically.
  // No image files needed. To add more films, find the ID in the
  // URL at themoviedb.org/movie/XXXXX and add it to this list.
  // ============================================================
  srkFilmIds: [
    // ---- Verified TMDB IDs (confirmed at themoviedb.org) ----
    19404,  // Dilwale Dulhania Le Jayenge (1995)
    10757,  // Kabhi Khushi Kabhie Gham (2001)
    4254,   // Kal Ho Naa Ho (2003)
    13986,  // Dil To Pagal Hai (1997)
    15917,  // Devdas (2002)
    14163,  // Chak De! India (2007)
    26022,  // My Name Is Khan (2010)
    15774,  // Swades (2004)
    864692, // Pathaan (2023)
    132316, // Jab Tak Hai Jaan (2012)
    4251,   // Veer-Zaara (2004)
    363343, // Raees (2017)
    8079,   // Om Shanti Om (2007)
    205022, // Chennai Express (2013)
    370665, // Dilwale (2015)
    11854,  // Kuch Kuch Hota Hai (1998)
    11518,  // Mohabbatein (2000)
    17501,  // Don (2006)
    41109,  // Don 2 (2011)
    21210,  // Dil Se.. (1998)
    19657,  // Baazigar (1993)
    35053,  // Darr (1993)
    14395,  // Kabhi Alvida Naa Kehna (2006)
    377985, // Fan (2016)
    496076, // Zero (2018)
    872906, // Jawan (2023)
    93519,  // Karan Arjun (1995)
    159090, // Duplicate (1998)
    4435,   // Asoka (2001)
    14072,  // Rab Ne Bana Di Jodi (2008)
    277432, // Happy New Year (2014)
    4252,   // Chalte Chalte (2003)
    14134,  // Main Hoon Na (2004)
    960876, // Dunki (2023)
    131940, // Josh (2000)
    114436, // Anjaam (1994)
    15419,  // Kabhi Haan Kabhi Naa (1994)
    41902,  // Baadshah (1999)
    41517,  // Ra.One (2011)
    // ---- To add more: go to themoviedb.org, search the film, copy the ID from the URL ----
  ],

  // These TMDB IDs get a "Netflix Original" badge
  srkBadgeIds: [19404, 14163, 864692, 872906],

  // "Continue Watching" row — fake progress percentages per film
  continueWatching: [
    { id: 19404,  progress: 72 },
    { id: 10757,  progress: 45 },
    { id: 4254,   progress: 88 },
    { id: 13986,  progress: 30 },
    { id: 15917,  progress: 60 }
  ],

  // ============================================================
  // BIRTHDAY GIRL PHOTO ROW
  // Add photos to /assets/birthday-girl/ and edit text below
  // Add 12 photos: photo1.jpg, photo2.jpg, ... photo12.jpg
  // ============================================================
  birthdayGirlTiles: [
    { image: "assets/birthday-girl/photo1.jpg",  title: "Chapter 1",  subtitle: "Where it all began" },
    { image: "assets/birthday-girl/photo2.jpg",  title: "Chapter 2",  subtitle: "The glow-up era" },
    { image: "assets/birthday-girl/photo3.jpg",  title: "Chapter 3",  subtitle: "Iconic moments" },
    { image: "assets/birthday-girl/photo4.jpg",  title: "Chapter 4",  subtitle: "Pure chaos" },
    { image: "assets/birthday-girl/photo5.jpg",  title: "Chapter 5",  subtitle: "Main character energy" },
    { image: "assets/birthday-girl/photo6.jpg",  title: "Chapter 6",  subtitle: "The squad" },
    { image: "assets/birthday-girl/photo7.jpg",  title: "Chapter 7",  subtitle: "Unmatched vibes" },
    { image: "assets/birthday-girl/photo8.jpg",  title: "Chapter 8",  subtitle: "That one trip" },
    { image: "assets/birthday-girl/photo9.jpg",  title: "Chapter 9",  subtitle: "Celebrations" },
    { image: "assets/birthday-girl/photo10.jpg", title: "Chapter 10", subtitle: "Legends only" },
    { image: "assets/birthday-girl/photo11.jpg", title: "Chapter 11", subtitle: "Still going strong" },
    { image: "assets/birthday-girl/photo12.jpg", title: "Chapter 12", subtitle: "To be continued..." }
  ],

  // ============================================================
  // FRIEND MESSAGE TILES — one per row (10 total)
  // Add friend photos to /assets/friends/
  // synopsis = the birthday wish shown on hover
  // ============================================================
  friendTiles: [
    {
      image: "assets/friends/friend1.jpg",
      title: "From Rahul",
      synopsis: "Happy birthday! You make every room brighter. Wishing you a year as amazing as you are!"
    },
    {
      image: "assets/friends/friend2.jpg",
      title: "From Anjali",
      synopsis: "To my favourite person — thank you for being you. Have the most magical birthday!"
    },
    {
      image: "assets/friends/friend3.jpg",
      title: "From Simran",
      synopsis: "You deserve every happiness today and always. Love you loads, happy birthday bestie!"
    },
    {
      image: "assets/friends/friend4.jpg",
      title: "From Rohit",
      synopsis: "Many more years of laughter, adventures, and terrible decisions together. Happy birthday!"
    },
    {
      image: "assets/friends/friend5.jpg",
      title: "From Pooja",
      synopsis: "Wishing you a birthday as stunning and warm as your smile. Truly one of a kind!"
    },
    {
      image: "assets/friends/friend6.jpg",
      title: "From Arjun",
      synopsis: "Here's to you — the person who makes everything more fun. Happy birthday, legend!"
    },
    {
      image: "assets/friends/friend7.jpg",
      title: "From Meera",
      synopsis: "You are the SRK of our friend group — effortlessly charming. Happy birthday!"
    },
    {
      image: "assets/friends/friend8.jpg",
      title: "From Karan",
      synopsis: "Cheers to another year of you being absolutely iconic. We love you endlessly!"
    },
    {
      image: "assets/friends/friend9.jpg",
      title: "From Nisha",
      synopsis: "Happy birthday to the person who deserves the whole world. Today is all about you!"
    },
    {
      image: "assets/friends/friend10.jpg",
      title: "From Dev",
      synopsis: "May this year bring you everything you have ever dreamed of. Happy birthday superstar!"
    }
  ],

  // ============================================================
  // BIRTHDAY VIDEO TILE
  // Place MP4 in /assets/video/ and poster in /assets/hero/
  // The video modal will play this when the tile is clicked
  // ============================================================
  video: {
    path:        "assets/video/HappyBirthdayN.mp4",
    posterImage: "assets/hero/video-poster.jpg",
    tileTitle:   "A Special Birthday Feature",
    tileSubtext: "A message just for you"
  }

};

// Make config available globally (for vanilla JS)
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}

// Export for ES modules (future-proof)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}