/**
 * Profile Selection Page Logic
 * Dynamically renders profile cards from config.js
 * Redirects to home.html when a profile is selected
 */

// ============================================================
// PROFILE CONFIGURATION
// To change profile names/images, edit /data/config.js:
//
// profiles: [
//   { name: "Priya",  image: "assets/profiles/profile1.jpg" },
//   { name: "Friend", image: "assets/profiles/profile2.jpg" },
//   ...
// ]
// ============================================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const profileGrid = document.getElementById('profile-grid');

  // Get profiles from config.js
  const profiles = CONFIG.profiles || [];

  // Check if profiles exist
  if (profiles.length === 0) {
    console.warn('No profiles found in CONFIG.profiles');
    profileGrid.innerHTML = '<p style="color: var(--netflix-text-grey);">No profiles configured. Please add profiles to config.js</p>';
    return;
  }

  // Render each profile card
  profiles.forEach((profile, index) => {
    const profileCard = createProfileCard(profile, index);
    profileGrid.appendChild(profileCard);
  });
});

/**
 * Create a profile card element
 * @param {object} profile - Profile object with name and image
 * @param {number} index - Profile index (for accessibility)
 * @returns {HTMLElement} - Profile card element
 */
function createProfileCard(profile, index) {
  // Create card container
  const card = document.createElement('div');
  card.className = 'profile-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Select ${profile.name} profile`);

  // Create avatar image
  const avatar = document.createElement('img');
  avatar.className = 'profile-avatar';
  avatar.src = profile.image;
  avatar.alt = `${profile.name} profile picture`;
  
  // Fallback if image fails to load
  avatar.onerror = () => {
    avatar.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name) + '&size=200&background=E50914&color=fff&bold=true';
  };

  // Create name label
  const name = document.createElement('div');
  name.className = 'profile-name';
  name.textContent = profile.name;

  // Append elements to card
  card.appendChild(avatar);
  card.appendChild(name);

  // Add click handler - redirect to home page
  card.addEventListener('click', () => {
    selectProfile(profile);
  });

  // Add keyboard support (Enter or Space)
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectProfile(profile);
    }
  });

  return card;
}

/**
 * Handle profile selection
 * @param {object} profile - Selected profile object
 */
function selectProfile(profile) {
  // Store selected profile in sessionStorage (optional - for use in home.html)
  sessionStorage.setItem('selectedProfile', JSON.stringify(profile));
  
  // Optional: Add a brief animation delay for better UX
  // Redirect to home page
  window.location.href = 'home.html';
}