const API_URL = 'http://localhost:8000';
let isRegistering = false;

// DOM Elements
const authSection = document.getElementById('auth-section');
const dashboard = document.getElementById('dashboard');
const extraFields = document.getElementById('extra-fields');
const submitBtn = document.getElementById('submit-btn');
const toggleLink = document.getElementById('toggle-link');
const logoutBtn = document.getElementById('logout-btn');

// --- EVENT LISTENERS ---

toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    isRegistering = !isRegistering;
    document.getElementById('form-title').innerText = isRegistering ? 'Register' : 'Login';
    submitBtn.innerText = isRegistering ? 'Sign Up' : 'Login';
    extraFields.classList.toggle('hidden');
    toggleLink.innerText = isRegistering ? 'Already have an account? Login' : 'Need an account? Register';
});

submitBtn.addEventListener('click', handleAuth);
logoutBtn.addEventListener('click', () => location.reload());

// --- FUNCTIONS ---

async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const fname = document.getElementById('fname').value;

    const endpoint = isRegistering ? '/register' : '/login';
    const payload = isRegistering 
        ? { email, password, username, fname } 
        : { email, password };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            showDashboard(data);
        } else {
            alert(data.error || 'Authentication failed');
        }
    } catch (err) {
        alert('Server connection failed. Is your Express server running on port 8000?');
    }
}

function showDashboard(user) {
    authSection.classList.add('hidden');
    dashboard.classList.remove('hidden');
    document.getElementById('user-display').innerText = user.fname || user.username;
    fetchJobs();
}

async function fetchJobs() {
    try {
        const res = await fetch(`${API_URL}/jobs`);
        const jobs = await res.json();
        const list = document.getElementById('jobs-list');
        
        if (jobs.length === 0) {
            list.innerHTML = '<p>No jobs available.</p>';
            return;
        }

        list.innerHTML = jobs.map(j => `
            <div class="job-card">
                <strong>${j.title}</strong><br>
                <span>${j.company || 'Unknown Company'}</span>
            </div>
        `).join('');
    } catch (err) {
        document.getElementById('jobs-list').innerText = 'Error loading jobs.';
    }
}