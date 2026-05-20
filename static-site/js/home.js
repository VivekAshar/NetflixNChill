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
    
    // Initialize polish features
    initPolishFeatures();
    
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
  
  // Row content (with pagination)
  const rowContent = document.createElement('div');
  rowContent.className = 'row-content';
  
  const rowTiles = document.createElement('div');
  rowTiles.className = 'row-tiles';
  rowTiles.setAttribute('data-current-page', '0');
  
  // Get films for this row (distribute films across rows)
  const filmsPerRow = Math.ceil(allFilms.length / CONFIG.rows.length);
  const startIdx = rowIndex * filmsPerRow;
  const endIdx = startIdx + filmsPerRow;
  const rowFilms = allFilms.slice(startIdx, endIdx);
  
  // Check if this is "Continue Watching" row
  const isContinueWatching = title.toLowerCase().includes('continue watching');
  
  // Randomize friend tile position per row
  const friendTilePositions = [0, 1, 2, 4, 0, 3, 1, 4, 2, 3];
  const friendTilePosition = friendTilePositions[rowIndex % friendTilePositions.length];
  
  // Add film tiles with friend tile at random position
  rowFilms.forEach((film, filmIndex) => {
    // Insert friend tile at predetermined position
    if (filmIndex === friendTilePosition && friendTile) {
      const friendTileElem = createFriendTile(friendTile);
      rowTiles.appendChild(friendTileElem);
    }
    
    const tile = createFilmTile(film, isContinueWatching);
    rowTiles.appendChild(tile);
  });
  
  // If friend tile position is beyond films length, add at end
  if (friendTilePosition >= rowFilms.length && friendTile) {
    const friendTileElem = createFriendTile(friendTile);
    rowTiles.appendChild(friendTileElem);
  }
  
  // Add special video tile to last row
  if (rowIndex === CONFIG.rows.length - 1 && CONFIG.video) {
    const videoTile = createVideoTile();
    rowTiles.appendChild(videoTile);
  }
  
  // Add scroll buttons
  const leftBtn = createScrollButton('left', rowTiles);
  const rightBtn = createScrollButton('right', rowTiles);
  
  rowContent.appendChild(leftBtn);
  rowContent.appendChild(rowTiles);
  rowContent.appendChild(rightBtn);
  rowContainer.appendChild(rowContent);
  
  // Initialize button visibility
  updateScrollButtons(rowTiles, leftBtn, rightBtn);
  
  return rowContainer;
}

// ============================================================
// CREATE SCROLL BUTTONS
// ============================================================
function createScrollButton(direction, rowTiles) {
  const button = document.createElement('button');
  button.className = `row-scroll-btn row-scroll-btn-${direction}`;
  button.setAttribute('aria-label', `Scroll ${direction}`);
  
  // Chevron SVG icon
  const chevron = direction === 'left' 
    ? '<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>'
    : '<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';
  
  button.innerHTML = chevron;
  
  // Add click handler
  button.addEventListener('click', () => {
    scrollRowPage(rowTiles, direction, button.parentElement);
  });
  
  return button;
}

// ============================================================
// HELPER: GET TILES PER PAGE BASED ON VIEWPORT WIDTH
// ============================================================
function getTilesPerPage() {
  const width = window.innerWidth;
  
  if (width >= 1400) return 6;
  if (width >= 1100) return 5;
  if (width >= 800) return 4;
  if (width >= 500) return 3;
  return 2; // Mobile
}

// ============================================================
// SCROLL ROW PAGINATION
// ============================================================
function scrollRowPage(rowTiles, direction, rowContent) {
  const tilesPerPage = getTilesPerPage();
  const currentPage = parseInt(rowTiles.getAttribute('data-current-page') || '0');
  const totalTiles = rowTiles.children.length;
  const totalPages = Math.ceil(totalTiles / tilesPerPage);
  
  let newPage = currentPage;
  
  if (direction === 'right' && currentPage < totalPages - 1) {
    newPage = currentPage + 1;
  } else if (direction === 'left' && currentPage > 0) {
    newPage = currentPage - 1;
  }
  
  // Calculate transform using row width
  // This ensures we scroll by exactly one full page of visible tiles
  const rowWidth = rowContent.offsetWidth;
  const offset = newPage * rowWidth;
  
  // Apply transform
  rowTiles.style.transform = `translateX(-${offset}px)`;
  rowTiles.setAttribute('data-current-page', newPage);
  
  // Update button visibility
  const leftBtn = rowContent.querySelector('.row-scroll-btn-left');
  const rightBtn = rowContent.querySelector('.row-scroll-btn-right');
  updateScrollButtons(rowTiles, leftBtn, rightBtn);
}

// ============================================================
// UPDATE SCROLL BUTTON VISIBILITY
// ============================================================
function updateScrollButtons(rowTiles, leftBtn, rightBtn) {
  const tilesPerPage = getTilesPerPage();
  const currentPage = parseInt(rowTiles.getAttribute('data-current-page') || '0');
  const totalTiles = rowTiles.children.length;
  const totalPages = Math.ceil(totalTiles / tilesPerPage);
  
  // Hide left button on first page
  if (currentPage === 0) {
    leftBtn.classList.add('hidden');
  } else {
    leftBtn.classList.remove('hidden');
  }
  
  // Hide right button on last page or if not enough tiles
  if (currentPage >= totalPages - 1 || totalTiles <= tilesPerPage) {
    rightBtn.classList.add('hidden');
  } else {
    rightBtn.classList.remove('hidden');
  }
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
  
  // Genre pills (Netflix style)
  if (film.genres && film.genres.length > 0) {
    const genresContainer = document.createElement('div');
    genresContainer.className = 'tile-genres';
    
    film.genres.slice(0, 3).forEach(genre => {
      const pill = document.createElement('span');
      pill.className = 'genre-pill';
      pill.textContent = genre;
      genresContainer.appendChild(pill);
    });
    
    overlay.appendChild(genresContainer);
  }
  
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
  
  // Row content (with pagination)
  const rowContent = document.createElement('div');
  rowContent.className = 'row-content';
  
  const rowTiles = document.createElement('div');
  rowTiles.className = 'row-tiles';
  rowTiles.setAttribute('data-current-page', '0');
  
  // Add photo tiles
  CONFIG.birthdayGirlTiles.forEach(photoData => {
    const tile = createPhotoTile(photoData);
    rowTiles.appendChild(tile);
  });
  
  // Add scroll buttons
  const leftBtn = createScrollButton('left', rowTiles);
  const rightBtn = createScrollButton('right', rowTiles);
  
  rowContent.appendChild(leftBtn);
  rowContent.appendChild(rowTiles);
  rowContent.appendChild(rightBtn);
  rowContainer.appendChild(rowContent);
  
  // Initialize button visibility
  updateScrollButtons(rowTiles, leftBtn, rightBtn);
  
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
// POLISH FEATURES (PART 5)
// ============================================================
function initPolishFeatures() {
  // 1. Smooth page fade-in
  document.body.classList.add('fade-in');
  
  // 2. Animate progress bars on load
  animateProgressBars();
  
  // 3. Ambient row scroll animations
  initScrollAnimations();
  
  // 4. Handle window resize for responsive pagination
  initResizeHandler();
  
  console.log('✨ Polish features initialized');
}

// Handle window resize to reset pagination
function initResizeHandler() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reset all rows to page 0 on resize
      const allRowTiles = document.querySelectorAll('.row-tiles');
      allRowTiles.forEach(rowTiles => {
        rowTiles.style.transform = 'translateX(0)';
        rowTiles.setAttribute('data-current-page', '0');
        
        // Update button visibility
        const rowContent = rowTiles.parentElement;
        const leftBtn = rowContent.querySelector('.row-scroll-btn-left');
        const rightBtn = rowContent.querySelector('.row-scroll-btn-right');
        if (leftBtn && rightBtn) {
          updateScrollButtons(rowTiles, leftBtn, rightBtn);
        }
      });
    }, 250); // Debounce resize events
  });
}

// Animate "Continue Watching" progress bars
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.tile-progress-fill');
  progressBars.forEach((bar, index) => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
      bar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
      bar.style.width = targetWidth;
    }, 500 + (index * 100));
  });
}

// Ambient scroll animations using IntersectionObserver
function initScrollAnimations() {
  const rowContainers = document.querySelectorAll('.row-container');
  
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);
  
  rowContainers.forEach(container => {
    container.classList.add('scroll-animate');
    observer.observe(container);
  });
}

// ============================================================
// VIDEO MODAL (PART 5 - COMPLETE IMPLEMENTATION)
// ============================================================
function openVideoModal() {
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('birthday-video');
  const closeBtn = document.getElementById('modal-close-btn');
  
  if (!modal || !video) {
    console.error('Video modal elements not found');
    return;
  }
  
  // Set video source from config
  if (CONFIG.video && CONFIG.video.path) {
    video.querySelector('source').src = CONFIG.video.path;
    video.poster = CONFIG.video.posterImage || '';
    video.load();
  }
  
  // Show modal with fade-in
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent body scroll
  
  // Autoplay video
  setTimeout(() => {
    video.play().catch(err => {
      console.log('Autoplay prevented:', err);
      // Autoplay blocked - user will need to click play
    });
  }, 300);
  
  // Close button handler
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
    
    // Pause and reset video
    video.pause();
    video.currentTime = 0;
  };
  
  closeBtn.onclick = closeModal;
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal();
    }
  };
  
  // Close on Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
  
  console.log('🎬 Video modal opened');
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
