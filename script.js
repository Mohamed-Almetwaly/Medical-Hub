// 1. كود الـ Navbar السلايدر (يعمل في كل الصفحات)
const indicator = document.querySelector('.nav-indicator');
const items = document.querySelectorAll('.nav-item');
const nav = document.querySelector('.sliding-nav');

if (indicator && items.length > 0 && nav) {
    items.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const navRect = nav.getBoundingClientRect();
            const itemRect = e.target.getBoundingClientRect();
            indicator.style.width = `${e.target.offsetWidth}px`;
            indicator.style.left = `${itemRect.left - navRect.left}px`;
            indicator.style.opacity = "1";
        });
    });

    nav.addEventListener('mouseleave', () => {
        indicator.style.opacity = "0";
    });
}

// 2. كود حركة الماوس التفاعلية (يعمل فقط في صفحة الـ Home)
const hero = document.querySelector('.hero-section');
const doctorImg = document.querySelector('.main-doctors-img');

if (hero && doctorImg) {
    hero.addEventListener('mousemove', (e) => {
        const moveX = (window.innerWidth / 2 - e.pageX) / 40;
        const moveY = (window.innerHeight / 2 - e.pageY) / 40;
        doctorImg.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    });

    hero.addEventListener('mouseleave', () => {
        doctorImg.style.transform = `scale(1) translate(0, 0)`;
    });
}

// 3. بيانات التحاليل
const tests = [
    { name: "Complete Blood Count (CBC)", p: 200, d: 180 },
    { name: "Blood Glucose Test", p: 120, d: 100 },
    { name: "Liver Function Tests (LFTs)", p: 400, d: 350 },
    { name: "Kidney Function Tests (KFTs)", p: 350, d: 300 },
    { name: "Lipid Profile", p: 500, d: 450 },
    { name: "Electrolytes Test", p: 250, d: 200 },
    { name: "Coagulation Profile (PT, PTT, INR)", p: 300, d: 270 },
    { name: "CRP (C-Reactive Protein)", p: 150, d: 130 },
    { name: "Erythrocyte Sedimentation Rate", p: 100, d: 80 },
    { name: "ANA Test", p: 600, d: 550 },
    { name: "Cholesterol Test", p: 150, d: 120 },
    { name: "Glucose Test", p: 100, d: 80 }
];

// 4. دالة فتح/إغلاق المدن
function toggleCity(itemId, districtsId) {
    const allItems = document.querySelectorAll('.city-item');
    const allDistricts = document.querySelectorAll('.districts-list');
    const clickedItem = document.getElementById(itemId);
    const clickedDistricts = document.getElementById(districtsId);
    const isOpen = clickedDistricts.style.display === 'block';

    allItems.forEach(i => i.classList.remove('active'));
    allDistricts.forEach(d => d.style.display = 'none');
    document.querySelectorAll('.city-arrow').forEach(a => a.textContent = '›');

    if (!isOpen) {
        clickedItem.classList.add('active');
        clickedDistricts.style.display = 'block';
        const arrowId = itemId.replace('-item', '-arrow');
        document.getElementById(arrowId).textContent = '∧';
    }
}

// 5. دالة إضافة المنتج للسلة
function addToCart(btn) {
    const card = btn.closest('.php-card');
    const imgSrc = card.querySelector('img').getAttribute('src');
    const priceText = card.querySelector('.php-price').textContent;

    const product = {
        name: "Children's replacement mask for inhaler",
        image: imgSrc,
        price: parseInt(priceText) || 20
    };

    localStorage.setItem('selectedProduct', JSON.stringify(product));
    btn.textContent = '✓ Added';
    btn.classList.add('added');
}

// 6. عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {

    // استرجاع حالة زر السلة
    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedProduct) {
        const productData = JSON.parse(savedProduct);
        const allCards = document.querySelectorAll('.php-card');
        allCards.forEach(card => {
            const imgSrc = card.querySelector('img').getAttribute('src');
            if (imgSrc === productData.image) {
                const btn = card.querySelector('.php-add-btn');
                btn.textContent = '✓ Added';
                btn.classList.add('added');
            }
        });
    }

    // --- user-profile.js ---

    // جلب اسم المستخدم
    const userNameDisplay = document.getElementById('display-user-name');
    if (userNameDisplay) {
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            userNameDisplay.textContent = savedName;
        }
    }

    // الوضع الليلي والنهاري
    const btnDark = document.getElementById('btn-dark');
    const btnLight = document.getElementById('btn-light');

    if (btnDark && btnLight) {
        function applyTheme(theme) {
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
                btnDark.classList.replace('inactive-theme', 'active-theme');
                btnLight.classList.replace('active-theme', 'inactive-theme');
                localStorage.setItem('appTheme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                btnLight.classList.replace('inactive-theme', 'active-theme');
                btnDark.classList.replace('active-theme', 'inactive-theme');
                localStorage.setItem('appTheme', 'light');
            }
        }

        const savedTheme = localStorage.getItem('appTheme') || 'light';
        applyTheme(savedTheme);

        btnDark.addEventListener('click', () => applyTheme('dark'));
        btnLight.addEventListener('click', () => applyTheme('light'));
    }

    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                localStorage.removeItem('userName');
                window.location.href = 'index.html';
            }
        });
    }

});