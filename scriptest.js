const RECAPTCHA_SITE_KEY = '6LcWMl0sAAAAAHeJEJ-v3oEUUAenJ5ON0MXKERrw';
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
        window.location.href = '/admin';
    } else if (email.endsWith('@teacher.vsma')) {
        window.location.href = '/teacher';
    } else if (email.endsWith('@parent.vsma')) {
        window.location.href = '/parent';
    }
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    setLoading(true);

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (typeof grecaptcha === 'undefined') {
        showError('reCAPTCHA failed to load. Please check your connection.');
        setLoading(false);
        return;
    }

    grecaptcha.ready(async () => {
        try {
            const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'login' });
            
            if (!token) {
                throw new Error('Failed to acquire captcha token.');
            }

            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
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
            console.error(err);
            showError('Security check failed. Please try again.');
            setLoading(false);
        }
    });
});

(async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session?.user) {
        redirectByRole(session.user.email);
    }
})();