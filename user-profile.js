// === user-profile.js ===

document.addEventListener('DOMContentLoaded', () => {

    // ===== تطبيق الثيم فوراً عند التحميل =====
    const savedTheme = localStorage.getItem('appTheme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // ===== Toast (رسائل التنبيه) =====
    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // ===== Theme (تعديل ليدعم التغيير اللحظي) =====
    const btnDark = document.getElementById('btn-dark');
    const btnLight = document.getElementById('btn-light');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            btnDark.classList.add('active-theme');
            btnLight.classList.remove('active-theme');
        } else {
            document.body.classList.remove('dark-mode');
            btnLight.classList.add('active-theme');
            btnDark.classList.remove('active-theme');
        }
        localStorage.setItem('appTheme', theme);
    }

    // تحديث الأزرار بناءً على الحالة المحفوظة
    applyTheme(savedTheme);

    btnDark.addEventListener('click', () => {
        applyTheme('dark');
        showToast('Dark mode enabled');
    });

    btnLight.addEventListener('click', () => {
        applyTheme('light');
        showToast('Light mode enabled');
    });

    // ===== Country / Flag =====
    const countrySelect = document.getElementById('country-select');
    const flagImg = document.getElementById('flag-img');

    if (countrySelect && flagImg) {
        const saved = localStorage.getItem('userCountry') || 'eg';
        countrySelect.value = saved;
        flagImg.src = `https://flagcdn.com/w20/${saved}.png`;

        countrySelect.addEventListener('change', () => {
            const val = countrySelect.value;
            flagImg.src = `https://flagcdn.com/w20/${val}.png`;
            localStorage.setItem('userCountry', val);
            showToast('Country updated');
        });
    }

    // ===== Language =====
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = localStorage.getItem('userLang') || 'en';
        langSelect.addEventListener('change', () => {
            localStorage.setItem('userLang', langSelect.value);
            showToast('Language updated');
        });
    }

    // ===== Credit Card Modal =====
    const cardBtn = document.getElementById('add-card-btn');
    const cardModal = document.getElementById('card-modal');
    
    if (cardBtn && cardModal) {
        cardBtn.addEventListener('click', () => cardModal.classList.add('open'));
        
        // إغلاق المودال
        document.getElementById('modal-cancel').addEventListener('click', () => cardModal.classList.remove('open'));
        cardModal.addEventListener('click', (e) => { if (e.target === cardModal) cardModal.classList.remove('open'); });

        document.getElementById('modal-save').addEventListener('click', () => {
            const num = document.getElementById('card-number').value.trim();
            if (num.length === 16 && /^\d+$/.test(num)) {
                cardModal.classList.remove('open');
                document.getElementById('card-number').value = '';
                showToast('Card saved successfully!');
            } else {
                showToast('Enter a valid 16-digit card number');
            }
        });
    }

    // ===== Logout =====
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to log out?')) {
                // نحذف فقط بيانات المستخدم ونحتفظ بالثيم إذا أردت، أو نحذف الكل
                localStorage.removeItem('userName');
                localStorage.removeItem('userCountry');
                localStorage.removeItem('userLang');
                window.location.href = 'index.html';
            }
        });
    }

    // ===== التزامن بين الصفحات (إضافي) =====
    window.addEventListener('storage', (e) => {
        if (e.key === 'appTheme') {
            applyTheme(e.newValue);
        }
    });
});