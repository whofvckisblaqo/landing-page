// Password strength checker
const checkPasswordStrength = (password) => {
    const strengthBar = document.getElementById('passwordStrength');
    if (!strengthBar) return;

    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    if (length >= 8) strength++;
    if (length >= 12) strength++;
    if (hasUpperCase && hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChar) strength++;

    strengthBar.className = 'password-strength';
    
    if (length === 0) {
        strengthBar.className = 'password-strength';
    } else if (strength <= 2) {
        strengthBar.classList.add('weak');
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
};

// Handle signup form
const handleSignup = (e) => {
    e.preventDefault();
    
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
    
    const form = e.target;
    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form['confirm-password'].value;
    const termsAccepted = form.terms.checked;

    // Validation
    if (!fullname || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error', form);
        return;
    }

    if (password.length < 8) {
        showMessage('Password must be at least 8 characters long', 'error', form);
        return;
    }

    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error', form);
        return;
    }

    if (!termsAccepted) {
        showMessage('Please accept the terms and conditions', 'error', form);
        return;
    }

    // Simulate signup (replace with actual API call)
    simulateSignup({ fullname, email, password });
};

// Handle login form
const handleLogin = (e) => {
    e.preventDefault();
    
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
    
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    const remember = form.remember ? form.remember.checked : false;

    // Validation
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error', form);
        return;
    }

    // Simulate login (replace with actual API call)
    simulateLogin({ email, password, remember });
};

// Show error or success message
const showMessage = (message, type, form) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message show`;
    messageDiv.textContent = message;
    
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
};

// Simulate signup API call
const simulateSignup = (userData) => {
    const form = document.getElementById('signupForm');
    const submitButton = form.querySelector('.auth-button');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Creating account...';
    submitButton.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        // Store user data (in real app, this would be sent to server)
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === userData.email)) {
            showMessage('An account with this email already exists', 'error', form);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            return;
        }
        
        users.push({
            fullname: userData.fullname,
            email: userData.email,
            password: userData.password, // In real app, NEVER store plain passwords!
            createdAt: new Date().toISOString()
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        
        showMessage('Account created successfully! Redirecting...', 'success', form);
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 1500);
};

// Simulate login API call
const simulateLogin = (credentials) => {
    const form = document.getElementById('loginForm');
    const submitButton = form.querySelector('.auth-button');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => 
            u.email === credentials.email && u.password === credentials.password
        );
        
        if (user) {
            // Store session (in real app, use proper authentication tokens)
            localStorage.setItem('currentUser', JSON.stringify({
                email: user.email,
                fullname: user.fullname,
                loggedInAt: new Date().toISOString()
            }));
            
            showMessage('Login successful! Redirecting...', 'success', form);
            
            // Redirect to home page after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage('Invalid email or password', 'error', form);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }, 1500);
};

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                checkPasswordStrength(e.target.value);
            });
        }
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Handle social login buttons
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Social login would be integrated here with OAuth providers (Google, Facebook, etc.)');
        });
    });
    
    console.log('Auth page loaded! 🔐');
});