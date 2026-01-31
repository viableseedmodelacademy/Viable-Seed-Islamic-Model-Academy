const RECAPTCHA_SITE_KEY = '6LccbFwsAAAAAMqRmdoAqn-25xLz2E6zqS0cTJRU';
const { createClient } = supabase;
const supabaseClient = createClient('https://chhkghparlgsikxzxasw.supabase.co', 'sb_publishable_z0Fv9IFDXOCCdCCUqF6j0w_J0bWFIET');

const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
const eyeOffIcon = document.getElementById('eyeOffIcon');

togglePassword.addEventListener('click', () => {
const type = passwordInput.type === 'password' ? 'text' : 'password';
passwordInput.type = type;
eyeIcon.classList.toggle('hidden');
eyeOffIcon.classList.toggle('hidden');
});

function showError(message) {
const errorMsg = document.getElementById('errorMsg');
errorMsg.textContent = message;
errorMsg.classList.remove('hidden');
}

function hideError() {
document.getElementById('errorMsg').classList.add('hidden');
}

function setLoading(loading) {
const btn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
btn.disabled = loading;
btnText.classList.toggle('hidden', loading);
btnLoader.classList.toggle('hidden', !loading);
}

function redirectByRole(email) {
if (email.endsWith('@admin.vsma')) {
    window.location.href = 'admin.html';
} else if (email.endsWith('@teacher.vsma')) {
    window.location.href = 'teacher.html';
} else if (email.endsWith('@parent.vsma')) {
    window.location.href = 'parent.html';
}
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
e.preventDefault();
hideError();
setLoading(true);

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

try {
    const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'login' });

const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
    options: {
        captchaToken: token 
    }
});

    if (error) {
        showError(error.message);
        setLoading(false);
        return;
    }

    if (data.user) {
        redirectByRole(data.user.email);
    }
} catch (err) {
    showError('An error occurred. Please try again.');
    setLoading(false);
}
});

(async () => {
const { data: { session } } = await supabaseClient.auth.getSession();
if (session?.user) {
    redirectByRole(session.user.email);
}
})();