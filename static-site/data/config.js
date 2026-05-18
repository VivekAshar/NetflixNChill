const CONFIG = {

  // ============================================================
  // PASTE YOUR FREE TMDB API KEY HERE
  // Get it free in 2 minutes at: https://www.themoviedb.org/settings/api
  // Instructions: See README.md "Getting Your FREE TMDB API Key" section
  // ============================================================
  TMDB_API_KEY: "paste-your-key-here",

  // ============================================================
  // LOGIN CREDENTIALS — change these to whatever you want
  // The login page will check against these values
  // ============================================================
  credentials: {
    username: "your-username",
    password: "your-password"
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
    9542,   // Dilwale Dulhania Le Jayenge (DDLJ)
    9543,   // Kabhi Khushi Kabhie Gham
    19911,  // Kal Ho Naa Ho
    11645,  // Dil To Pagal Hai
    9548,   // Devdas (2002)
    14367,  // Chak De! India
    29754,  // My Name Is Khan
    25452,  // Swades
    846433, // Pathaan
    83901,  // Jab Tak Hai Jaan
    9550,   // Veer-Zaara
    384592, // Raees
    11788,  // Om Shanti Om
    111838, // Chennai Express
    296906, // Dilwale (2015)
    9555,   // Kuch Kuch Hota Hai
    9541,   // Mohabbatein
    9549,   // Asoka
    9551,   // Kabhi Alvida Naa Kehna
    9552,   // Don (2006)
    57212,  // Don 2
    9556,   // Dil Se
    9557,   // Karan Arjun
    9558,   // Baazigar
    9559,   // Darr
    9560,   // Yes Boss
    9561,   // Pardes
    9562,   // Deewana
    9563,   // Badshah
    9564,   // Josh
    9565,   // Koyla
    9566,   // Duplicate
    391378, // Zero
    927107, // Jawan
    11054,  // Fan
    9568,   // Anjaam
    9569,   // Guddu
    9570,   // Ram Jaane
    9571,   // Chamatkaar
    9572,   // King Uncle
    9573,   // Raju Ban Gaya Gentleman
    9574,   // English Babu Desi Mem
    9575,   // Trimurti
    9576,   // Kabhi Haan Kabhi Naa
    9577,   // Hum Tumhare Hain Sanam
    248477, // Happy New Year
    9579,   // Mohabbat
    9566    // Duplicate (repeated for variety)
  ],

  // ============================================================
  // NETFLIX ORIGINAL BADGE — These TMDB IDs get a special badge
  // ============================================================
  srkBadgeIds: [9542, 14367, 846433, 927107],

  // ============================================================
  // CONTINUE WATCHING — fake progress percentages per film
  // These create the progress bar under tiles in "Continue Watching" row
  // ============================================================
  continueWatching: [
    { id: 9542,  progress: 72 },  // DDLJ - 72% watched
    { id: 9543,  progress: 45 },  // K3G - 45% watched
    { id: 19911, progress: 88 },  // Kal Ho Naa Ho - 88% watched
    { id: 11645, progress: 30 },  // Dil To Pagal Hai - 30% watched
    { id: 9548,  progress: 60 }   // Devdas - 60% watched
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
    path:        "assets/video/birthday.mp4",
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