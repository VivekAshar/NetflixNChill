# Netflix-Inspired Birthday Website 🎉

A personalized birthday website themed around Shah Rukh Khan films, styled like Netflix. This is a static site that uses the TMDB API to automatically fetch movie posters, titles, and metadata.

---

## 📁 What's Included in Part 1

This is **Part 1 of 5** — the foundation scaffold:

- ✅ **Folder structure** with organized asset directories
- ✅ **README.md** (this file) with setup instructions
- ✅ **`/data/config.js`** — All editable data in one place
- ✅ **`/js/tmdb.js`** — TMDB API module for fetching movie data
- ✅ **`/css/style.css`** — Complete Netflix-themed stylesheet
- ❌ **HTML pages** — Coming in Part 2-5

---

## 📂 Folder Structure

```
/static-site/
├── README.md                 ← You are here
├── data/
│   └── config.js            ← EDIT THIS to customize names, messages, images
├── js/
│   └── tmdb.js              ← TMDB API module (no edits needed)
├── css/
│   └── style.css            ← Netflix theme (no edits needed)
├── assets/
│   ├── profiles/            ← Add profile photos here (profile1.jpg, profile2.jpg, etc.)
│   ├── hero/                ← Add hero banner image here (hero.jpg)
│   ├── birthday-girl/       ← Add 12 birthday photos here (photo1.jpg - photo12.jpg)
│   ├── friends/             ← Add 10 friend photos here (friend1.jpg - friend10.jpg)
│   └── video/               ← Add birthday video here (birthday.mp4, video-poster.jpg)
└── pages/                   ← HTML pages will go here in Parts 2-5
```

---

## 🎬 Getting Your FREE TMDB API Key (2 Minutes)

The TMDB (The Movie Database) API is **100% free** and lets this site automatically fetch Shah Rukh Khan movie posters, titles, descriptions, and ratings. No credit card needed!

### Step-by-Step Instructions:

#### 1. Create a TMDB Account
- Go to: **https://www.themoviedb.org/signup**
- Fill in:
  - Username (any username you want)
  - Password (create a secure password)
  - Email (your real email — you'll need to verify it)
- Check the box to agree to Terms of Use
- Click **"Sign Up"**

#### 2. Verify Your Email
- Check your email inbox for a message from TMDB
- Click the verification link in the email
- Your account is now active!

#### 3. Request an API Key
- Log in to TMDB: **https://www.themoviedb.org/login**
- Go to your account settings: **https://www.themoviedb.org/settings/api**
- Click **"Request an API Key"**
- Choose **"Developer"** (not Commercial)
- Fill out the form:
  - **Type of Use**: Personal / Educational
  - **Application Name**: "Birthday Website" (or any name)
  - **Application URL**: You can write "N/A" or "localhost"
  - **Application Summary**: "Personal birthday website project"
- Click **"Submit"**

#### 4. Copy Your API Key
- You'll see your **API Key (v3 auth)** — it looks like a long string of random letters and numbers
- Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
- **Copy this entire key**

#### 5. Paste Your API Key into config.js
- Open the file: **`/data/config.js`**
- Find this section at the top:

```javascript
// ============================================================
// PASTE YOUR FREE TMDB API KEY HERE
// Get it free in 2 minutes at: https://www.themoviedb.org/settings/api
// ============================================================
TMDB_API_KEY: "paste-your-key-here",
```

- Replace `"paste-your-key-here"` with your actual key:

```javascript
TMDB_API_KEY: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
```

- **Save the file**

✅ **Done!** Your site can now fetch movie data automatically.

---

## ✏️ How to Customize the Site

### All Edits Happen in ONE File: `/data/config.js`

Open `/data/config.js` and you'll see clearly labeled sections with comments explaining everything:

#### 1. **Change the Birthday Person's Name**
```javascript
birthdayPersonName: "Priya",  // ← Change this to any name
```

#### 2. **Change Login Credentials**
```javascript
credentials: {
  username: "your-username",  // ← Change this
  password: "your-password"   // ← Change this
},
```

#### 3. **Update Profile Names**
```javascript
profiles: [
  { name: "Priya",  image: "assets/profiles/profile1.jpg" },
  { name: "Friend", image: "assets/profiles/profile2.jpg" },
  // Edit names, keep image paths
],
```

#### 4. **Change Hero Banner Text**
```javascript
hero: {
  image:   "assets/hero/hero.jpg",
  heading: "Happy Birthday, Priya",        // ← Change this
  subtext: "A world of SRK. A universe of love. All for you."  // ← Change this
},
```

#### 5. **Customize Row Titles**
```javascript
rows: [
  "SRK Classics",              // ← Edit these
  "SRK Romance Universe",
  "SRK Bollywood Comfort Cinema",
  // ... add or remove rows
],
```

#### 6. **Update Friend Birthday Messages**
```javascript
friendTiles: [
  {
    image: "assets/friends/friend1.jpg",
    title: "From Rahul",  // ← Change name
    synopsis: "Happy birthday! You make every room brighter..."  // ← Edit message
  },
  // ... 10 friend tiles total
],
```

#### 7. **Birthday Girl Photo Captions**
```javascript
birthdayGirlTiles: [
  {
    image: "assets/birthday-girl/photo1.jpg",
    title: "Chapter 1",           // ← Edit title
    subtitle: "Where it all began"  // ← Edit subtitle
  },
  // ... 12 photo tiles total
],
```

---

## 🖼️ How to Add Your Images

### Step 1: Prepare Your Images
- **Profiles**: 4 square images (recommended 300x300px) → Name them `profile1.jpg`, `profile2.jpg`, `profile3.jpg`, `profile4.jpg`
- **Hero Banner**: 1 wide image (recommended 1920x600px) → Name it `hero.jpg`
- **Birthday Girl Photos**: 12 images (any size) → Name them `photo1.jpg` through `photo12.jpg`
- **Friend Photos**: 10 square images (recommended 300x300px) → Name them `friend1.jpg` through `friend10.jpg`
- **Video Poster**: 1 image (recommended 1280x720px) → Name it `video-poster.jpg`
- **Birthday Video**: 1 MP4 video file → Name it `birthday.mp4`

### Step 2: Place Files in Correct Folders
- Place profile images in: **`/assets/profiles/`**
- Place hero banner in: **`/assets/hero/`**
- Place birthday photos in: **`/assets/birthday-girl/`**
- Place friend photos in: **`/assets/friends/`**
- Place video files in: **`/assets/video/`**

### Step 3: Update config.js (if needed)
If you use different file names, update the paths in `/data/config.js`. For example:

```javascript
profiles: [
  { name: "Priya", image: "assets/profiles/my-custom-name.jpg" },  // ← Custom filename
],
```

---

## 🧪 Testing the TMDB Module (Optional)

Once you've pasted your API key, you can test if it works:

1. Open any HTML page (when created in Part 2+)
2. Open browser DevTools (press F12)
3. Go to the **Console** tab
4. Paste this test code:

```javascript
// Test: Fetch a single SRK film
fetch(`https://api.themoviedb.org/3/movie/9542?api_key=${CONFIG.TMDB_API_KEY}&language=en-US`)
  .then(res => res.json())
  .then(data => {
    console.log('✅ TMDB API works!');
    console.log('Film:', data.title);
    console.log('Poster:', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
  })
  .catch(err => console.error('❌ Error:', err));
```

- If you see **"✅ TMDB API works!"** and film data → Success!
- If you see **"❌ Error"** → Check that you pasted your API key correctly

---

## 🚀 Deploying to GitHub Pages (Later)

This site is designed to work on **GitHub Pages** with zero configuration. Instructions will be provided in Part 5 after all HTML pages are built.

**Quick Preview:**
1. Push this folder to a GitHub repository
2. Go to repo Settings → Pages
3. Choose "Deploy from main branch"
4. Your site will be live at: `https://yourusername.github.io/repo-name/`

---

## 📝 What's Next?

- **Part 2**: Login page HTML
- **Part 3**: Profile selection page HTML  
- **Part 4**: Main page with hero, rows, tiles, modals
- **Part 5**: Final polish, testing, deployment guide

---

## 🆘 Troubleshooting

### Movies Not Loading?
- ✅ Check that you pasted your TMDB API key correctly in `/data/config.js`
- ✅ Make sure your API key is inside quotes: `"your-key-here"`
- ✅ Verify your TMDB account email is verified

### Images Not Showing?
- ✅ Check that image files are in the correct `/assets/` subfolders
- ✅ Verify filenames match exactly (case-sensitive: `photo1.jpg` ≠ `Photo1.JPG`)
- ✅ Make sure paths in `config.js` match your actual filenames

### Site Not Working Locally?
- ✅ Use a local server (e.g., VS Code Live Server extension)
- ✅ Don't open HTML files directly with `file://` — TMDB API won't work

---

## 🎨 Technical Details

- **Framework**: None (pure HTML, CSS, vanilla JavaScript)
- **API**: TMDB API v3 (free tier, no rate limits for personal use)
- **Theme**: Netflix dark theme (black backgrounds, `#E50914` red accents)
- **Font**: Roboto / Helvetica / system sans-serif
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile**: Fully responsive

---

**Built with ❤️ for birthday celebrations**