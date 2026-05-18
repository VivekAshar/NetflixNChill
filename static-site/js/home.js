/**
 * Netflix Birthday Homepage
 * Dynamically renders hero, content rows, tiles with TMDB data
 */

// ============================================================
// STATE MANAGEMENT
// ============================================================
let allFilms = [];
let isLoading = true;

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Show loading indicator
    showLoading();
    
    // Initialize hero banner
    initHero();
    
    // Initialize navbar scroll behavior
    initNavbar();
    
    // Fetch all films from TMDB
    console.log('🎬 Fetching films from TMDB...');
    allFilms = await TMDB.fetchAllFilms(CONFIG.srkFilmIds, CONFIG.TMDB_API_KEY);
    console.log(`✅ Fetched ${allFilms.length} films`);
    
    // Render all content rows
    renderAllRows();
    
    // Hide loading indicator
    hideLoading();
    isLoading = false;
    
  } catch (error) {
    console.error('❌ Error initializing homepage:', error);
    hideLoading();
    showError('Failed to load content. Please refresh the page.');
  }
});

// ============================================================
// HERO BANNER
// ============================================================
function initHero() {
  const heroImage = document.getElementById('hero-image');
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  
  if (CONFIG.hero) {
    heroImage.src = CONFIG.hero.image;
    heroImage.onerror = () => {
      // Fallback to a gradient if image fails
      heroImage.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #434343 100%)';
    };
    heroTitle.textContent = CONFIG.hero.heading || 'Welcome';
    heroSubtitle.textContent = CONFIG.hero.subtext || '';
  }
}

// ============================================================
// NAVBAR SCROLL BEHAVIOR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger-btn');
  const menu = document.getElementById('navbar-menu');
  
  // Scroll behavior: transparent → solid
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
    });
  }
}

// ============================================================
// RENDER ALL CONTENT ROWS
// ============================================================
function renderAllRows() {
  const container = document.getElementById('content-rows');
  if (!container) return;
  
  container.innerHTML = ''; // Clear any existing content
  
  const rowTitles = CONFIG.rows || [];
  const friendTiles = CONFIG.friendTiles || [];
  
  // Render each row
  rowTitles.forEach((rowTitle, rowIndex) => {
    const rowElement = createRow(rowTitle, rowIndex, friendTiles[rowIndex]);
    container.appendChild(rowElement);
  });
  
  // Add Birthday Girl Photos Row after a few rows
  if (CONFIG.birthdayGirlTiles && CONFIG.birthdayGirlTiles.length > 0) {
    const birthdayRow = createBirthdayGirlRow();
    // Insert after row 3 (index 3)
    const rows = container.children;
    if (rows.length > 3) {
      container.insertBefore(birthdayRow, rows[4]);
    } else {
      container.appendChild(birthdayRow);
    }
  }
}

// ============================================================
// CREATE SINGLE CONTENT ROW
// ============================================================
function createRow(title, rowIndex, friendTile) {
  const rowContainer = document.createElement('div');
  rowContainer.className = 'row-container';
  
  // Row title
  const rowTitleElem = document.createElement('h2');
  rowTitleElem.className = 'row-title';
  rowTitleElem.textContent = title;
  rowContainer.appendChild(rowTitleElem);
  
  // Row content (scrollable tiles)
  const rowContent = document.createElement('div');
  rowContent.className = 'row-content';
  
  const rowTiles = document.createElement('div');
  rowTiles.className = 'row-tiles';
  
  // Get films for this row (distribute films across rows)
  const filmsPerRow = Math.ceil(allFilms.length / CONFIG.rows.length);
  const startIdx = rowIndex * filmsPerRow;
  const endIdx = startIdx + filmsPerRow;
  const rowFilms = allFilms.slice(startIdx, endIdx);
  
  // Check if this is "Continue Watching" row
  const isContinueWatching = title.toLowerCase().includes('continue watching');
  
  // Add film tiles
  rowFilms.forEach((film, filmIndex) => {
    const tile = createFilmTile(film, isContinueWatching);
    rowTiles.appendChild(tile);
    
    // Add friend tile after 3rd film
    if (filmIndex === 2 && friendTile) {
      const friendTileElem = createFriendTile(friendTile);
      rowTiles.appendChild(friendTileElem);
    }
  });
  
  // Add special video tile to last row
  if (rowIndex === CONFIG.rows.length - 1 && CONFIG.video) {
    const videoTile = createVideoTile();
    rowTiles.appendChild(videoTile);
  }
  
  rowContent.appendChild(rowTiles);
  rowContainer.appendChild(rowContent);
  
  return rowContainer;
}

// ============================================================
// CREATE FILM TILE
// ============================================================
function createFilmTile(film, showProgress = false) {
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.setAttribute('data-testid', `film-tile-${film.id}`);
  
  // Poster image
  const img = document.createElement('img');
  img.className = 'tile-image';
  img.src = film.posterUrl || 'https://via.placeholder.com/250x140/2F2F2F/808080?text=No+Image';
  img.alt = film.title;
  img.loading = 'lazy';
  tile.appendChild(img);
  
  // Netflix Original badge (if applicable)
  if (CONFIG.srkBadgeIds && CONFIG.srkBadgeIds.includes(film.id)) {
    const badge = document.createElement('div');
    badge.className = 'tile-badge';
    badge.textContent = 'N';
    tile.appendChild(badge);
  }
  
  // Progress bar for "Continue Watching"
  if (showProgress) {
    const progressData = CONFIG.continueWatching?.find(p => p.id === film.id);
    if (progressData) {
      const progressBar = document.createElement('div');
      progressBar.className = 'tile-progress';
      const progressFill = document.createElement('div');
      progressFill.className = 'tile-progress-fill';
      progressFill.style.width = `${progressData.progress}%`;
      progressBar.appendChild(progressFill);
      tile.appendChild(progressBar);
    }
  }
  
  // Hover overlay with metadata
  const overlay = document.createElement('div');
  overlay.className = 'tile-overlay';
  
  const overlayTitle = document.createElement('div');
  overlayTitle.className = 'tile-title';
  overlayTitle.textContent = film.title;
  overlay.appendChild(overlayTitle);
  
  const meta = document.createElement('div');
  meta.className = 'tile-meta';
  const metaItems = [];
  if (film.year) metaItems.push(film.year);
  if (film.runtime) metaItems.push(`${film.runtime}min`);
  if (film.rating) metaItems.push(`⭐ ${film.rating.toFixed(1)}`);
  meta.textContent = metaItems.join(' • ');
  overlay.appendChild(meta);
  
  tile.appendChild(overlay);
  
  return tile;
}

// ============================================================
// CREATE FRIEND MESSAGE TILE
// ============================================================
function createFriendTile(friendData) {
  const tile = document.createElement('div');
  tile.className = 'tile friend-tile';
  tile.setAttribute('data-testid', 'friend-tile');
  
  // Friend image
  const img = document.createElement('img');
  img.className = 'tile-image';
  img.src = friendData.image;
  img.alt = friendData.title;
  img.loading = 'lazy';
  img.onerror = () => {
    img.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(friendData.title) + '&size=250&background=random';
  };
  tile.appendChild(img);
  
  // Gold/red glow border (via CSS class)
  tile.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(229, 9, 20, 0.3)';
  tile.style.border = '2px solid rgba(255, 215, 0, 0.3)';
  
  // Overlay with message
  const overlay = document.createElement('div');
  overlay.className = 'tile-overlay';
  
  const title = document.createElement('div');
  title.className = 'tile-title';
  title.textContent = friendData.title;
  overlay.appendChild(title);
  
  const synopsis = document.createElement('div');
  synopsis.className = 'tile-meta';
  synopsis.textContent = friendData.synopsis;
  synopsis.style.fontSize = '0.75rem';
  synopsis.style.lineHeight = '1.3';
  synopsis.style.marginTop = '0.5rem';
  overlay.appendChild(synopsis);
  
  tile.appendChild(overlay);
  
  return tile;
}

// ============================================================
// CREATE BIRTHDAY GIRL PHOTOS ROW
// ============================================================
function createBirthdayGirlRow() {
  const rowContainer = document.createElement('div');
  rowContainer.className = 'row-container';
  
  // Row title
  const rowTitle = document.createElement('h2');
  rowTitle.className = 'row-title';
  rowTitle.textContent = `${CONFIG.birthdayPersonName}'s Story`;
  rowContainer.appendChild(rowTitle);
  
  // Row content
  const rowContent = document.createElement('div');
  rowContent.className = 'row-content';
  
  const rowTiles = document.createElement('div');
  rowTiles.className = 'row-tiles';
  
  // Add photo tiles
  CONFIG.birthdayGirlTiles.forEach(photoData => {
    const tile = createPhotoTile(photoData);
    rowTiles.appendChild(tile);
  });
  
  rowContent.appendChild(rowTiles);
  rowContainer.appendChild(rowContent);
  
  return rowContainer;
}

// ============================================================
// CREATE PHOTO TILE (Birthday Girl)
// ============================================================
function createPhotoTile(photoData) {
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.setAttribute('data-testid', 'photo-tile');
  
  // Photo image
  const img = document.createElement('img');
  img.className = 'tile-image';
  img.src = photoData.image;
  img.alt = photoData.title;
  img.loading = 'lazy';
  img.onerror = () => {
    img.src = 'https://via.placeholder.com/250x140/2F2F2F/808080?text=' + encodeURIComponent(photoData.title);
  };
  tile.appendChild(img);
  
  // Overlay with caption
  const overlay = document.createElement('div');
  overlay.className = 'tile-overlay';
  
  const title = document.createElement('div');
  title.className = 'tile-title';
  title.textContent = photoData.title;
  overlay.appendChild(title);
  
  const subtitle = document.createElement('div');
  subtitle.className = 'tile-meta';
  subtitle.textContent = photoData.subtitle;
  overlay.appendChild(subtitle);
  
  tile.appendChild(overlay);
  
  return tile;
}

// ============================================================
// CREATE SPECIAL VIDEO TILE (Stub for Part 5)
// ============================================================
function createVideoTile() {
  const tile = document.createElement('div');
  tile.className = 'tile video-tile';
  tile.setAttribute('data-testid', 'video-tile');
  tile.style.cursor = 'pointer';
  
  // Video poster image
  const img = document.createElement('img');
  img.className = 'tile-image';
  img.src = CONFIG.video.posterImage;
  img.alt = CONFIG.video.tileTitle;
  img.loading = 'lazy';
  img.onerror = () => {
    img.style.background = 'linear-gradient(135deg, #E50914 0%, #8a0508 100%)';
  };
  tile.appendChild(img);
  
  // Netflix Original badge
  const badge = document.createElement('div');
  badge.className = 'tile-badge';
  badge.textContent = 'N';
  tile.appendChild(badge);
  
  // Special red glow
  tile.style.boxShadow = '0 0 30px rgba(229, 9, 20, 0.7)';
  tile.style.border = '2px solid rgba(229, 9, 20, 0.5)';
  
  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'tile-overlay';
  
  const title = document.createElement('div');
  title.className = 'tile-title';
  title.textContent = CONFIG.video.tileTitle;
  overlay.appendChild(title);
  
  const subtitle = document.createElement('div');
  subtitle.className = 'tile-meta';
  subtitle.textContent = CONFIG.video.tileSubtext;
  overlay.appendChild(subtitle);
  
  tile.appendChild(overlay);
  
  // Click handler (stub for Part 5)
  tile.addEventListener('click', () => {
    openVideoModal();
  });
  
  return tile;
}

// ============================================================
// VIDEO MODAL STUB (TO BE COMPLETED IN PART 5)
// ============================================================
function openVideoModal() {
  alert('🎬 Video modal will be implemented in Part 5!\\n\\nThis special birthday video will play in a cinematic modal overlay.');
  console.log('Video modal stub called. Part 5 will implement the full video player.');
}

// ============================================================
// LOADING INDICATOR
// ============================================================
function showLoading() {
  const indicator = document.getElementById('loading-indicator');
  if (indicator) {
    indicator.style.display = 'flex';
  }
}

function hideLoading() {
  const indicator = document.getElementById('loading-indicator');
  if (indicator) {
    indicator.style.display = 'none';
  }
}

// ============================================================
// ERROR HANDLING
// ============================================================
function showError(message) {
  const container = document.getElementById('content-rows');
  if (container) {
    container.innerHTML = `
      <div style=\"
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        padding: 40px;
        text-align: center;
        color: var(--netflix-text-grey);
      \">
        <div style=\"font-size: 48px; margin-bottom: 20px;\">⚠️</div>
        <h2 style=\"color: var(--netflix-white); margin-bottom: 10px;\">Oops!</h2>
        <p>${message}</p>
        <button 
          onclick=\"location.reload()\" 
          style=\"
            margin-top: 20px;
            padding: 12px 24px;
            background: var(--netflix-red);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
          \"
        >
          Retry
        </button>
      </div>
    `;
  }
}

// ============================================================
// UTILITY: Create Skeleton Tiles (Optional - for loading states)
// ============================================================
function createSkeletonTile() {
  const tile = document.createElement('div');
  tile.className = 'tile tile-skeleton';
  return tile;
}

console.log('🎬 Netflix Birthday Homepage loaded successfully');
