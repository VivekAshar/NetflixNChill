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
    username: "quest@crisp.com",
    password: "Chilis"
  },

  // ============================================================
  // Name of the birthday person — used across all pages
  // ============================================================
  birthdayPersonName: "Neha",

  // ============================================================
  // PROFILE CARDS — replace images in /assets/profiles/
  // Add your profile photos as profile1.jpg, profile2.jpg, etc.
  // ============================================================
  profiles: [
    { name: "Sleepy Bubu",  image: "assets/profiles/sleepy.jpg" },
    { name: "Angy Bubu", image: "assets/profiles/angry.jpg" },
    { name: "Hungry Bubu", image: "assets/profiles/hungry.jpg" },
    { name: "Goofy Bubu",  image: "assets/profiles/goofy.jpg" }
  ],

  // ============================================================
  // HERO BANNER — replace image in /assets/hero/
  // This is the big banner at the top of the main page
  // ============================================================
  hero: {
    image:   "assets/hero/Hero.png",
    heading: "Happy Birthday, Neha",
    subtext: "A world of SRK. A universe of love. All for you. I love you! <3333"
  },

  // ============================================================
  // ROW TITLES — These are the category labels for movie rows
  // You can edit, add, or remove rows as needed
  // ============================================================
  rows: [
    "SRK Classics",
    "Pyaar Dosti Hai Cinematic Universe",
    "Wankhede Files - 'Yahi zinda gaad dunga mad****od'",
    "Movies That Made Indian Men Open Their Arms In Public",
    "Salmaan is my besstttt fraaaaaand",
    "Because You Watched DDLJ",
    "SRK Running After Trains Cardio Collection",
    "Mitroooon, Naam Toh Suna Hoga Collection",
    "Your Birthday? You mean our...",
    "Garudwar, Naagshakti, Cheelghaat and Mehnatkash",
    "Because you are dating Vivek, Senorita"
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
    25519,  // Pardes (1997)

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
    25519,  // Pardes (1997)
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
    { image: "assets/birthday-girl/1.jpg",  title: "Chapter 1",  subtitle: "Pilot - The one with MS WORD" },
    { image: "assets/birthday-girl/2.jpg",  title: "Chapter 2",  subtitle: "The one where he teaches her dandiya" },
    { image: "assets/birthday-girl/3.jpg",  title: "Chapter 3",  subtitle: "The one where she drugs him" },
    { image: "assets/birthday-girl/4.jpg",  title: "Chapter 4",  subtitle: "The one where they discover (veg) sushi" },
    { image: "assets/birthday-girl/5.jpg",  title: "Chapter 5",  subtitle: "The one where they say goodbye... for a bit" },
    { image: "assets/birthday-girl/6.jpg",  title: "Chapter 6",  subtitle: "The one where they meet a celebrity" },
    { image: "assets/birthday-girl/7.jpg",  title: "Chapter 7",  subtitle: "The one where they become a celebrity" },
    { image: "assets/birthday-girl/8.jpg",  title: "Chapter 8",  subtitle: "The one where they visit le musée du Louvre" },
    { image: "assets/birthday-girl/9.jpg",  title: "Chapter 9",  subtitle: "The one where they join Kami's maketing team" },
    { image: "assets/birthday-girl/10.jpg", title: "Chapter 10", subtitle: "The one where they watch Chelsea FC play" },
    { image: "assets/birthday-girl/11.jpg", title: "Chapter 11", subtitle: "The one with Hyderabadi Irani chai" },
    { image: "assets/birthday-girl/12.jpg", title: "Chapter 12", subtitle: "The one where they lose their minds... errrr" }
  ],

  // ============================================================
  // FRIEND MESSAGE TILES — one per row (10 total)
  // Add friend photos to /assets/friends/
  // synopsis = the birthday wish shown on hover
  // ============================================================
  friendTiles: [
    {
      image: "assets/friends/bhavs.jpg",
      title: "From Bhavs",
      synopsis: "In a world moving too fast, she arrives like yellow sunlight — soft, steady, and impossible not to gravitate toward. By day, she can unravel the world with thought-provoking conversations; by night, she’s laughing on a dance floor with a drink in hand, living like joy is its own rebellion.Happy Birthday, my moon."
    },
    {
      image: "assets/friends/ruchi.jpg",
      title: "From Ruchi",
      synopsis: "Two girls growing up through gossip sessions, chaotic college days, unfiltered conversations, protecting each other from bad decisions (and sometimes encouraging them :P), and somehow becoming each other’s safe space in the middle of life’s madness.Happy Birthday Babe, love you"
    },
    {
      image: "assets/friends/saee.jpg",
      title: "From Saee",
      synopsis: "Happy birthday! Thanks for being awesome. Not just because you're nice to me (which you are), but for just being nice. I think the ideals you keep are admirable. It makes me feel like I'm not delusional for believing in good things. I feel like I can talk you about anything. Thanks for being a great senior/manager. You're my favorite person in Hyderabad."
    },
    {
      image: "assets/friends/amrita.jpg",
      title: "From Amrita",
      synopsis: "Neha, Many many happy returns of the day! Needless to say that you get all the happiness and prosperity that you wish and desire for. I wish for your well-being in all aspects and hope that you are content in whatever you do. The flat misses you and we miss you more. Come back soooooon"
    },
    {
      image: "assets/friends/rishi.jpg",
      title: "From Rishi",
      synopsis: "Happy Birthday! Because you didn't call me back, I have to wish you via a picture"
    },
    {
      image: "assets/friends/smirthi.jpg",
      title: "From Smirthi",
      synopsis: "Fellow survivor of the horrors of AP and surviving life with instincts correct 99% of the time, CEO ma’am now continues her journey as the sole carrier of CRISP chaos. Wise beyond her years, undefeated in intuition, the person i will win garba season with — this season promises more lore, madness, and the city of her dreams. HBD"
    },
    {
      image: "assets/friends/manisha.jpg",
      title: "From Manisha",
      synopsis: "3 years, 2 strong-headed girls, 1 workplace. Co-workers by day, besties by night.Balancing deadlines with existential crises, trauma-bonding over bad bosses, evaluating budgets and boys (not always in that order), and working out of cafes, fields, trains, flights, buses, cabs, and occasionally, the office. What a wild ride, happy birthday"
    },
    {
      image: "assets/friends/modiji.jpg",
      title: "From PMO",
      synopsis: "Mitronnnn… aaj Neha ji ka janmadin sirf birthday nahi, ek maha-utsav hai! Main deshvasiyon se kehna chahta hoon, 'yaad rakhiye… acche din toh aate jaate rahenge, lekin Neha ji jaisi woke communist baar baar nahi aati!'"
    },
    {
      image: "assets/friends/marx.jpg",
      title: "From Karl Marx",
      synopsis: "Neha, your birthday is not just a celebration… it is a revolution against the bourgeoisie. The means of cake production must now belong to the people. Party lovers of the world, unite — and wish Comrade Neha the happiest birthday!"
    },
    {
      image: "assets/friends/harry.jpg",
      title: "From Hermione Granger",
      synopsis: "Honestly, Nehaaa, Harry and Ron can barely remember their own homework, but forgetting your birthday? Completely mental. Wishing you a year full of Felix Felicis luck, endless Butterbeer, and absolutely no detentions from McGonagall."
    }
  ],

  // ============================================================
  // BIRTHDAY VIDEO TILE
  // Place MP4 in /assets/video/ and poster in /assets/hero/
  // The video modal will play this when the tile is clicked
  // ============================================================
  video: {
    path:        "assets/video/HBDNetflixCompressed.mp4",
    posterImage: "assets/hero/thumbnail.jpg",
    tileTitle:   "Go Goa Gone",
    tileSubtext: "Here is something for you, it ain't much but it's honest work"
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