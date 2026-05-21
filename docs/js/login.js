/**
 * Login Page Logic
 * Validates credentials from config.js and redirects to profiles page
 */

// ============================================================
// CREDENTIALS CONFIGURATION
// To change login credentials, edit /data/config.js:
//
// credentials: {
//   username: "your-username",  // <-- Change this
//   password: "your-password"   // <-- Change this
// }
// ============================================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔐 Login.js loaded');
  console.log('CONFIG loaded:', typeof CONFIG !== 'undefined');
  
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('error-message');
  
  console.log('Form elements found:', {
    form: !!loginForm,
    username: !!usernameInput,
    password: !!passwordInput,
    error: !!errorMessage
  });

  if (!loginForm) {
    console.error('❌ Login form not found!');
    return;
  }

  // Handle form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting normally
    console.log('📝 Form submitted');

    // Get input values
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value;
    
    console.log('Entered credentials:', { username: enteredUsername, password: enteredPassword });

    // Get credentials from config.js
    const correctUsername = CONFIG.credentials.username;
    const correctPassword = CONFIG.credentials.password;
    
    console.log('Expected credentials:', { username: correctUsername, password: correctPassword });

    // Validate credentials
    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
      // ✅ Login successful!
      console.log('✅ Login successful! Redirecting to profiles.html');
      // Hide error message if it was showing
      errorMessage.classList.add('hidden');
      
      // Redirect to profiles page
      console.log('Attempting redirect...');
      window.location.href = 'profiles.html';
    } else {
      // ❌ Login failed - show error message
      console.log('❌ Login failed - credentials do not match');
      errorMessage.classList.remove('hidden');
      
      // Clear password field for security
      passwordInput.value = '';
      
      // Focus back on username field
      usernameInput.focus();
      
      // Shake animation is handled by CSS automatically
    }
  });

  // Hide error message when user starts typing again
  usernameInput.addEventListener('input', hideError);
  passwordInput.addEventListener('input', hideError);

  function hideError() {
    if (!errorMessage.classList.contains('hidden')) {
      errorMessage.classList.add('hidden');
    }
  }
  
  console.log('✅ Login event listeners attached');
});