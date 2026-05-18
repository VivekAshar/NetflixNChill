# 🔧 Troubleshooting Guide - Can't See Pages in VS Code Live Server

## Problem
Unable to see the splash screen or login page when opening `index.html` or `login.html` in VS Code Live Server.

---

## ✅ Quick Fixes (Try These First)

### 1. **Open Test Page**
Open `/app/static-site/test.html` in Live Server first:
- Right-click `test.html` in VS Code
- Select "Open with Live Server"
- **Can you see a styled test page?**
  - ✅ YES → CSS is working, proceed to step 2
  - ❌ NO → Your Live Server isn't working correctly

### 2. **Check Browser Console (F12)**
Open Developer Tools while viewing `index.html`:
- Press **F12** (Windows) or **Cmd+Option+I** (Mac)
- Look at the **Console** tab
- Do you see any red errors?

**Common Errors:**
```
Failed to load resource: css/style.css (404)
→ FIX: Make sure you're opening from the static-site folder

Uncaught ReferenceError: CONFIG is not defined
→ FIX: config.js isn't loading, check path
```

### 3. **Hard Refresh**
Clear browser cache:
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`
- Or: `Ctrl/Cmd + F5`

### 4. **Check Network Tab**
In DevTools, go to **Network** tab:
- Refresh the page
- Look for `style.css` - does it load? (should be status 200)
- Look for `config.js` (on login.html) - does it load?

---

## 🎯 Root Causes & Solutions

### Issue 1: **Working Directory Problem**

**Problem:** You opened Live Server from the wrong folder.

**Symptoms:**
- Blank white page
- 404 errors for CSS
- Page shows but no styling

**Solution:**
```
❌ WRONG: Opening from /app/ or /app/static-site/pages/
✅ CORRECT: Right-click on /app/static-site/index.html
```

**To Fix:**
1. In VS Code, navigate to `/app/static-site/`
2. Right-click directly on `index.html`
3. Select "Open with Live Server"
4. URL should be: `http://127.0.0.1:5500/index.html`

---

### Issue 2: **CSS Not Loading**

**Problem:** CSS file path is incorrect or file doesn't exist.

**Check:**
```bash
# Verify CSS exists
ls -la /app/static-site/css/style.css
# Should show: -rw-r--r-- ... 24269 ... style.css
```

**In index.html, the path should be:**
```html
<link rel="stylesheet" href="css/style.css">
```

**Not:**
```html
<link rel="stylesheet" href="/css/style.css">      ❌ Wrong (absolute path)
<link rel="stylesheet" href="../css/style.css">    ❌ Wrong (going up)
<link rel="stylesheet" href="./static-site/css/"> ❌ Wrong (too deep)
```

---

### Issue 3: **Live Server Not Installed**

**Problem:** VS Code Live Server extension isn't installed.

**Solution:**
1. Open VS Code Extensions (Ctrl/Cmd + Shift + X)
2. Search for "Live Server" by Ritwick Dey
3. Click "Install"
4. Reload VS Code
5. Try again

---

### Issue 4: **JavaScript Errors Preventing Display**

**Check Console for:**
```javascript
// This would break the page:
Uncaught ReferenceError: CONFIG is not defined
Uncaught SyntaxError: Unexpected token
```

**Fix:** Make sure all files exist:
- `css/style.css` ✅
- `data/config.js` ✅ (for login.html, profiles.html)
- `js/login.js` ✅ (for login.html)
- `js/profiles.js` ✅ (for profiles.html)

---

## 🧪 Diagnostic Steps

### Step 1: Test HTML Only
Create `test-minimal.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
  <style>body { background: red; color: white; }</style>
</head>
<body>
  <h1>Can you see red background?</h1>
</body>
</html>
```

- If YES → HTML works, CSS path is the issue
- If NO → Live Server isn't working

### Step 2: Test CSS Loading
Open DevTools → Network tab:
1. Refresh page
2. Find `style.css` in the list
3. Check status:
   - **200** = ✅ Loaded successfully
   - **404** = ❌ File not found (path issue)
   - **304** = ✅ Loaded from cache

### Step 3: Test Inline Styles
Temporarily add inline styles to `index.html`:
```html
<head>
  <style>
    body { background: black; }
    .splash-logo { color: red; font-size: 100px; }
  </style>
</head>
```

- If you see red "N" → CSS wasn't loading before
- If still blank → JavaScript error or other issue

---

## 📋 Checklist

Before opening a page, verify:

- [ ] You're in the `/app/static-site/` directory
- [ ] `css/style.css` exists (24 KB file)
- [ ] Live Server extension is installed
- [ ] You right-click on the HTML file itself
- [ ] Browser DevTools Console shows no errors
- [ ] Browser cache cleared (hard refresh)
- [ ] Port 5500 isn't blocked by firewall

---

## 🎯 Expected Behavior

### **index.html (Splash Screen)**
**What you should see:**
- **Black background**
- **Large red "N" logo** in the center
- Logo animates (scales and bounces)
- After 3.5 seconds → redirects to login.html

### **login.html (Login Page)**
**What you should see:**
- **Blurred background** (movie posters)
- **"NETFLIX" logo** top-left in red
- **"Sign In" heading**
- **Email/username input** field
- **Password input** field
- **Red "Sign In" button**
- Form centered in semi-transparent black card

### **profiles.html (Profile Selection)**
**What you should see:**
- **Black background**
- **"Who's watching?" heading** centered
- **4 profile cards** in a grid
- Profile images or colored placeholders
- Names below each profile
- Hover effects (scale up, white border)

---

## 🚨 Still Not Working?

### Try This Alternate Method:

#### Option A: Use Python HTTP Server
```bash
cd /app/static-site
python3 -m http.server 8000
```
Then open: `http://localhost:8000/index.html`

#### Option B: Use Node.js HTTP Server
```bash
cd /app/static-site
npx http-server -p 8000
```
Then open: `http://localhost:8000/index.html`

#### Option C: Open Directly in Browser
1. Navigate to `/app/static-site/` in your file explorer
2. Double-click `index.html`
3. Should open in your default browser
4. **Note:** Some features might not work (CORS issues)

---

## 📸 Share Your Console

If still not working, share:
1. Screenshot of Browser Console (F12 → Console tab)
2. Screenshot of Network tab showing `style.css`
3. The exact URL showing in your browser address bar
4. Output of: `ls -la /app/static-site/`

---

## ✅ Verify File Structure

Run this command to verify structure:
```bash
cd /app/static-site && tree -L 2 -I ".gitkeep"
```

**Expected output:**
```
.
├── index.html
├── login.html
├── profiles.html
├── home.html
├── test.html
├── css/
│   └── style.css
├── js/
│   ├── login.js
│   ├── profiles.js
│   └── tmdb.js
├── data/
│   └── config.js
└── assets/
    ├── profiles/
    ├── hero/
    ├── birthday-girl/
    ├── friends/
    └── video/
```

---

## 💡 Pro Tips

1. **Always use Live Server**, not "Open in Browser"
2. **Check Console first** - 90% of issues show there
3. **Hard refresh often** - browser cache causes issues
4. **One folder at a time** - don't mix paths
5. **Relative paths only** - no absolute paths like `/css/`

---

**Still stuck? Let me know what errors you see in the console!**
