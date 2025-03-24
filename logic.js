// script.js - Complete Firebase Authentication Solution

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.querySelector('button');
const closeBtn = document.querySelector('.close-btn');

// Close Window Functionality
closeBtn.addEventListener('click', () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'about:blank';
  }
});

// Login Function with Enhanced Validation
async function handleLogin() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validation
  if (!validateEmail(email)) {
    showError('Please enter a valid email address');
    return;
  }

  if (password.length < 6) {
    showError('Password must be at least 6 characters');
    return;
  }

  // UI Feedback
  loginBtn.disabled = true;
  loginBtn.textContent = 'Logging in...';
  loginBtn.style.opacity = '0.7';

  try {
    // Firebase Authentication
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    
    // Successful login
    window.location.href = 'dashboard.html';
    
  } catch (error) {
    // Error Handling
    let errorMessage = 'Login failed. Please try again.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Account temporarily locked due to many failed attempts';
        break;
    }
    
    showError(errorMessage);
    passwordInput.value = '';
    passwordInput.focus();
  } finally {
    // Reset UI
    loginBtn.disabled = false;
    loginBtn.textContent = 'Login';
    loginBtn.style.opacity = '1';
  }
}

// Helper Functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(message) {
  alert(message); // Replace with a proper error display in your UI
}

// Event Listeners
loginBtn.addEventListener('click', handleLogin);

// Allow login on Enter key
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleLogin();
  }
});

// Check if user is already logged in (persistent session)
auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = 'dashboard.html';
  }
});
