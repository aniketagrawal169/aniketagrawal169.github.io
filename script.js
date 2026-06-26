// Splash Screen Exit Animation
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    
    // Auto-exit splash screen after 3.2 seconds
    setTimeout(() => {
        splashScreen.classList.add('exit');
        // Remove splash screen from DOM after animation completes
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    }, 3200);
    
    // Allow user to click to skip splash screen
    splashScreen.addEventListener('click', function() {
        splashScreen.classList.add('exit');
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const scrollPos = window.pageYOffset;

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrollPos * speed}px)`;
    });
});

// Sticky Navigation with enhanced effects
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Scroll-triggered Animations with Reveal Effects
const scrollRevealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // If it's a scroll-reveal element, add active class
            if (entry.target.classList.contains('scroll-reveal')) {
                entry.target.classList.add('active');
            }
            
            // Stagger animation for child elements
            const children = entry.target.querySelectorAll('.scroll-reveal, .feature, .testimonial, .gallery-item');
            children.forEach((child, i) => {
                if (child.classList.contains('scroll-reveal')) {
                    setTimeout(() => {
                        child.classList.add('active');
                    }, i * 100);
                } else {
                    setTimeout(() => {
                        child.style.animation = `fadeInUp 0.8s ease-out forwards`;
                    }, i * 100);
                }
            });
        }
    });
}, scrollRevealOptions);

document.querySelectorAll('.scroll-reveal, section').forEach(element => {
    scrollRevealObserver.observe(element);
});

// Initialize mobile menu toggle
document.getElementById('mobile-menu-toggle').addEventListener('click', toggleMobileMenu);

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');

    if (!navContainer.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Enhanced Gallery Hover Effect with 3D transforms
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08) rotateY(5deg)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Add perspective for 3D effect
    item.style.perspective = '1000px';
    item.style.transformStyle = 'preserve-3d';
});

// Add hover ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripples = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripples.style.width = ripples.style.height = size + 'px';
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        ripples.classList.add('ripple');

        this.appendChild(ripples);

        setTimeout(() => {
            ripples.remove();
        }, 600);
    });
});

// Add mouse move glow effect to features
document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('mousemove', function(e) {
        const x = e.clientX - this.getBoundingClientRect().left;
        const y = e.clientY - this.getBoundingClientRect().top;

        this.style.setProperty('--mouse-x', x + 'px');
        this.style.setProperty('--mouse-y', y + 'px');
    });
});

// Animate numbers on scroll (for testimonials or stats)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe elements for number animation
document.querySelectorAll('[data-count]').forEach(element => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                const count = parseInt(entry.target.getAttribute('data-count'));
                animateValue(entry.target, 0, count, 2000);
                entry.target.setAttribute('data-animated', 'true');
            }
        });
    }, { threshold: 0.5 });

    observer.observe(element);
});

// Enhanced page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.querySelectorAll('section').forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, index * 100);
    });
});

// Menu Item Hover Effect
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Feature Card Hover Effect
document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    feature.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Button Hover Effects (additional micro-interactions)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy Loading Images (additional performance)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Trust Badge Animation
const trustBadge = document.querySelector('.trust-badge');
if (trustBadge) {
    setTimeout(() => {
        trustBadge.style.animation = 'fadeInUp 0.8s ease-out';
    }, 1000);
}

// Menu Data
const menuData = {
    "BREAKFAST (10:30 AM ONWARDS)": [
        { name: "Bread Pakora (4 Pcs.)", price: "₹100" },
        { name: "Butter Toast", price: "₹60" },
        { name: "Aloo Bonda With Chutni", price: "₹95" },
        { name: "Aloo Sandwich", price: "₹90" },
        { name: "Aloo Paratha with Curd and Pickle", price: "₹125" },
        { name: "Paneer / Mix Paratha with Curd and Pickle", price: "₹135" },
        { name: "Crispy Corn", price: "₹160" },
        { name: "Veg. Kebab Paratha", price: "₹145" }
    ],
    "BEVERAGES": [
        { name: "Special Tea", price: "₹45" },
        { name: "Hot Coffee", price: "₹75" },
        { name: "Cold Coffee", price: "₹190" },
        { name: "Gold Coffee With Ice-cream", price: "₹205" },
        { name: "Thick Shake (Regular)", price: "₹185" },
        { name: "Thick Shake (Special)", price: "₹210" },
        { name: "Mattha", price: "₹70" },
        { name: "Punjabi Lassi (Sweet/Salt)", price: "₹90" },
        { name: "Cold Drink", price: "₹40" },
        { name: "Fresh Lime Soda (Sweet/Salt)", price: "₹90" },
        { name: "Mineral Water", price: "M.R.P." },
        { name: "Mojitos", price: "₹140" }
    ],
    "CHATPATI CHAAT (4 PM TO 10:30 PM)": [
        { name: "Aloo Tikki", price: "₹125" },
        { name: "Matar Tikki", price: "₹125" },
        { name: "Papdi Chaat", price: "₹125" },
        { name: "Dahi Bada", price: "₹145" },
        { name: "Dahi Batasha (4 Pcs.)", price: "₹125" },
        { name: "Bhelpuri", price: "₹125" },
        { name: "Rai Kachori", price: "₹185" },
        { name: "Richi Rich Basket Chaat", price: "₹205" }
    ],
    "SOUTH INDIAN PLATTER": [
        { name: "Mini Dosa, Mini Uttapam, 2 Pcs. Idli, 2 Pcs. Vada", price: "₹375" }
    ],
    "MADRASI NATURE": [
        { name: "Plain/Paper Dosa", price: "₹170" },
        { name: "Masala Dosa", price: "₹195" },
        { name: "Onion Masala Dosa", price: "₹200" },
        { name: "Paneer Masala Dosa", price: "₹210" },
        { name: "Rawa Plain Dosa", price: "₹190" },
        { name: "Rawa Masala Dosa", price: "₹200" },
        { name: "Rawa Paneer Dosa", price: "₹210" },
        { name: "Richi Rich Special Dosa", price: "₹225" },
        { name: "Uttapam (Tomato, Onion, Chilly)", price: "₹200" },
        { name: "Mix Uttapam", price: "₹210" },
        { name: "Idli Sambhar", price: "₹165" },
        { name: "Vada Sambhar", price: "₹165" },
        { name: "Fried Idli", price: "₹185" }
    ],
    "RICHI RICH SPECIAL": [
        { name: "Veg Momo (Steam/Fried)", price: "₹190" },
        { name: "Chola Kulcha", price: "₹190" },
        { name: "Mumbai Pav Bhaji", price: "₹195" },
        { name: "Stuffed Bhatura with Chola", price: "₹205" },
        { name: "Chola-bhatura", price: "₹180" },
        { name: "Extra Pav", price: "₹85" },
        { name: "Veg Pakoda", price: "₹185" },
        { name: "Paneer Pakoda", price: "₹215" },
        { name: "Veg Cutlet", price: "₹190" },
        { name: "Veg Spring Roll", price: "₹250" },
        { name: "Veg Sandwich", price: "₹165" },
        { name: "Cheese Sandwich", price: "₹175" },
        { name: "Grilled Sandwich", price: "₹175" },
        { name: "Club Sandwich", price: "₹185" },
        { name: "Finger Chips", price: "₹165" },
        { name: "Chatpata Roll", price: "₹165" }
    ],
    "BURGER & FRANKIES": [
        { name: "Veg Burger", price: "₹140" },
        { name: "Cheese Burger", price: "₹150" },
        { name: "Veg Kebab Burger", price: "₹150" },
        { name: "Veg Frankie", price: "₹175" },
        { name: "Paneer Frankie", price: "₹190" },
        { name: "Paneer Tikka Kathi Roll", price: "₹225" },
        { name: "Paneer Chilly Roll", price: "₹225" }
    ],
    "DESI HAAT": [
        { name: "Paneer Lababdar", price: "₹380" },
        { name: "Paneer Sunaheri", price: "₹380" },
        { name: "Paneer Butter Masala", price: "₹380" },
        { name: "Paneer Do-Pyaza", price: "₹380" },
        { name: "Paneer Bhurji", price: "₹380" },
        { name: "Paneer Makhmali", price: "₹390" },
        { name: "Paneer Tikka Masala", price: "₹405" },
        { name: "Paneer Kaju Masala", price: "₹405" },
        { name: "Paneer Mushroom Taka-Tak", price: "₹405" },
        { name: "Paneer Jhalfreazi", price: "₹380" },
        { name: "Paneer Malai Korma", price: "₹390" },
        { name: "Shahi Paneer", price: "₹400" },
        { name: "Palak Paneer", price: "₹380" },
        { name: "Handi Paneer", price: "₹380" },
        { name: "Matar Paneer", price: "₹380" },
        { name: "Kadhai Paneer", price: "₹395" },
        { name: "Hydrabadi Paneer", price: "₹395" },
        { name: "Paneer Lajawab", price: "₹395" }
    ],
    "DALS": [
        { name: "Dal Handi", price: "₹295" },
        { name: "Dal Sultani (Arhar Fry)", price: "₹285" },
        { name: "Dal Makhani", price: "₹295" },
        { name: "Chana Pindi", price: "₹285" },
        { name: "Chola", price: "₹290" }
    ],
    "CHINA TOWN": [
        { name: "Veg Chilly / Veg Manchurian", price: "₹340" },
        { name: "Paneer Chilly / Paneer Manchurian", price: "₹365" },
        { name: "Mushroom Manchurian", price: "₹375" },
        { name: "Paneer Shanghai", price: "₹375" },
        { name: "Paneer 65", price: "₹375" },
        { name: "Paneer Hot Green Crispy / Honey Chilly Potato", price: "₹345" },
        { name: "Corn Chilly", price: "₹360" },
        { name: "Baby Corn Mushroom Salt-n-pepper", price: "₹375" },
        { name: "Paneer Thread", price: "₹375" }
    ],
    "NOODLES & CHOPSUEY": [
        { name: "Veg Chowmien", price: "₹315" },
        { name: "Paneer Chowmien", price: "₹335" },
        { name: "Hakka Noodles (Gravy)", price: "₹325" },
        { name: "Ginger Garlic Noodles", price: "₹335" },
        { name: "Singapore Noodles", price: "₹335" },
        { name: "Richi Rich Special Chowmien", price: "₹370" },
        { name: "Chinese Chopsuey", price: "₹330" },
        { name: "Chinese & Tomato Chopsuey", price: "₹325" },
        { name: "American Chopsuey", price: "₹335" }
    ],
    "BEAUTY RICE": [
        { name: "Veg Fried Rice", price: "₹325" },
        { name: "Mix Veg Fried Rice", price: "₹335" },
        { name: "Ginger-Garlic Fried Rice", price: "₹330" },
        { name: "Schezwan Fried Rice", price: "₹340" }
    ],
    "THALI": [
        { name: "Veg Thali (Paneer, Dry Veg, Dal Fry, Rice, Raita, Naan, Sweet, Salad)", price: "₹330" },
        { name: "Richi Rich Thali (Paneer, Dal Makhani, Dry Veg, Raita, Rice, Paratha, Naan, Sweet, Paped, Salad)", price: "₹350" }
    ],
    "SUBJ BAHAR": [
        { name: "Veg Kadhai Chaap (Gravy)", price: "₹305" },
        { name: "Veg Handi Chaap (Gravy)", price: "₹310" },
        { name: "Veg Leg Piece Chaap (Gravy)", price: "₹325" },
        { name: "Veg Navratan Chaap (Gravy)", price: "₹325" },
        { name: "Veg Malai Chaap (Gravy)", price: "₹355" },
        { name: "Malai Kofta", price: "₹355" },
        { name: "Haryali Kofta", price: "₹355" },
        { name: "Punjabi Kofta", price: "₹355" },
        { name: "Amritsari Kofta", price: "₹355" },
        { name: "Mushroom Matar", price: "₹375" },
        { name: "Kashmiri Dum Aloo", price: "₹365" },
        { name: "Banarasi Dum Aloo", price: "₹355" },
        { name: "Navratan Korma", price: "₹355" },
        { name: "Mushroom Jhalfreazi", price: "₹370" },
        { name: "Mix Vegetable", price: "₹335" },
        { name: "Mushroom Do-Pyaza", price: "₹380" },
        { name: "Veg Jhalfreazi", price: "₹330" },
        { name: "Aloo Matar Dry", price: "₹300" },
        { name: "Aloo Gobhi/Jeera (Dry)", price: "₹300" },
        { name: "Mushroom Masala", price: "₹380" },
        { name: "Methi Matar Malai Corn", price: "₹360" },
        { name: "Bhindi Do-Pyaza", price: "₹350" }
    ],
    "KHUSBU-E-BASMATI": [
        { name: "Plain Rice", price: "₹250" },
        { name: "Jeera Rice", price: "₹260" },
        { name: "Matar Pulao", price: "₹265" },
        { name: "Mix Veg Pulao", price: "₹280" },
        { name: "Kashmiri Pulao", price: "₹305" },
        { name: "Veg Biryani (Served with Raita)", price: "₹370" }
    ],
    "SALADS": [
        { name: "Onion Salad", price: "₹100" },
        { name: "Green Salad", price: "₹140" },
        { name: "Kachumber Salad", price: "₹120" },
        { name: "Roasted Papad", price: "₹50" },
        { name: "Fry Papad", price: "₹50" },
        { name: "Masala Papad", price: "₹60" }
    ],
    "LOVELY PIZZARIA": [
        { name: "Veg Regular Pizza (Onion, Capsicum, Cheese)", price: "₹305" },
        { name: "Veg Delight Pizza (Tomato, Onion, Capsicum, Cheese)", price: "₹315" },
        { name: "Paneer Chilly Pizza", price: "₹340" },
        { name: "Mushroom Spicy Pizza", price: "₹350" },
        { name: "Veg Corn Pizza", price: "₹340" },
        { name: "Richi Rich Special Pizza", price: "₹375" }
    ],
    "ITALIAN": [
        { name: "Pasta (Red Sauce)", price: "₹310" },
        { name: "Pasta (White Sauce)", price: "₹320" }
    ],
    "BARBEQUE": [
        { name: "Paneer Tikka", price: "₹340" },
        { name: "Mushroom Tikka", price: "₹350" },
        { name: "Soya Chaap", price: "₹305" },
        { name: "Aloo Tikka", price: "₹275" },
        { name: "Paneer Achari Tikka", price: "₹350" },
        { name: "Tandoori Platter (2 pcs Paneer Tikka, Paneer Achari Tikka, Soyachaap Tikka, Aloo Tikka, 4 pc Stuffed Mushroom)", price: "₹475" }
    ],
    "SOUPS": [
        { name: "Cream of Tomato Soup", price: "₹175" },
        { name: "Veg Hot-N-Sour Soup", price: "₹175" },
        { name: "Veg Peking Soup", price: "₹175" },
        { name: "Veg Sweet Corn Soup", price: "₹175" },
        { name: "Veg Noodle Soup", price: "₹175" },
        { name: "Cream of Mushroom Soup", price: "₹185" }
    ],
    "RAITA": [
        { name: "Plain Curd", price: "₹140" },
        { name: "Boondi Raita", price: "₹170" },
        { name: "Kheera Raita", price: "₹160" },
        { name: "Aloo Raita", price: "₹160" },
        { name: "Pudina Raita", price: "₹160" },
        { name: "Mix Raita", price: "₹180" },
        { name: "Pineapple Raita", price: "₹200" },
        { name: "Fruit Raita", price: "₹200" }
    ],
    "TANDOORI ROTIYAN": [
        { name: "Tandoori Roti", price: "₹35" },
        { name: "Butter Roti", price: "₹45" },
        { name: "Plain Naan", price: "₹80" },
        { name: "Butter Naan", price: "₹90" },
        { name: "Lucknowi Naan", price: "₹100" },
        { name: "Stuff Naan", price: "₹100" },
        { name: "Paneer Naan", price: "₹110" },
        { name: "Lachha Paratha", price: "₹90" },
        { name: "Onion Kulcha", price: "₹95" },
        { name: "Stuff Kulcha", price: "₹100" },
        { name: "Paneer Kulcha", price: "₹110" },
        { name: "Missi Roti", price: "₹80" },
        { name: "Bhatura (Extra)", price: "₹65" },
        { name: "Garlic Naan", price: "₹100" }
    ],
    "SWEETS & DESSERTS": [
        { name: "Gulab Jamun (1 Pcs.)", price: "₹40" },
        { name: "Rasgulla (1 Pcs.)", price: "₹45" },
        { name: "Ice-cream (Single Scoop)", price: "₹60" },
        { name: "Ice-cream (Double Scoop)", price: "₹90" },
        { name: "Matka Kulfi (Ice-Cream)", price: "₹75" }
    ],
    "MINI MEAL": [
        { name: "Paneer + Naan (2 Baby)", price: "₹285" },
        { name: "Dal Makhani + Naan 2", price: "₹275" },
        { name: "Dal Arhar + Jeera Rice", price: "₹255" },
        { name: "Veg Fried Rice + Paneer Chilly", price: "₹280" },
        { name: "Veg Chowmien + Manchurian", price: "₹270" },
        { name: "Pizza (6 Inch) + Small Cold-Drink", price: "₹270" },
        { name: "Veg Burger / Veg Frankie + Cold-Drink", price: "₹195" },
        { name: "Pasta + Cold-Drink", price: "₹275" },
        { name: "Paneer Tikka + Cold-Drink", price: "₹320" },
        { name: "French Fries + Cold-Drink", price: "₹180" }
    ]
};

// Function to generate category buttons
function generateCategoryButtons() {
    const buttonContainer = document.getElementById('category-buttons');
    let html = '';

    for (const category in menuData) {
        html += `<button class="category-btn" data-category="${category}">${category}</button>`;
    }

    buttonContainer.innerHTML = html;

    const buttons = document.querySelectorAll('.category-btn');
    if (buttons.length > 0) {
        buttons[0].classList.add('active');
    }

    // Add event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter menu items
            filterMenuItems(this.dataset.category);
        });
    });
}

// Function to generate menu table
function generateMenuTable(category = Object.keys(menuData)[0]) {
    const tableBody = document.getElementById('menu-table-body');
    let html = '';

    if (category === 'all') {
        // Show all categories
        for (const [catName, items] of Object.entries(menuData)) {
            // Add category header row
            html += `<tr class="category-header">
                <td colspan="2" class="category-title">${catName}</td>
            </tr>`;

            // Add items for this category
            items.forEach(item => {
                const isPopular = item.name.includes('Special') || item.name.includes('Richi Rich') || Math.random() > 0.8;
                html += `<tr class="${isPopular ? 'popular' : ''}">
                    <td class="item-name">${item.name}</td>
                    <td class="item-price">${item.price}</td>
                </tr>`;
            });
        }
    } else {
        // Show only selected category
        const items = menuData[category];
        if (items) {
            items.forEach(item => {
                const isPopular = item.name.includes('Special') || item.name.includes('Richi Rich') || Math.random() > 0.8;
                html += `<tr class="${isPopular ? 'popular' : ''}">
                    <td class="item-name">${item.name}</td>
                    <td class="item-price">${item.price}</td>
                </tr>`;
            });
        }
    }

    tableBody.innerHTML = html;
}

// Function to filter menu items by category
function filterMenuItems(category) {
    generateMenuTable(category);
}

function initializeMenuSection() {
    if (!document.getElementById('category-buttons') || !document.getElementById('menu-table-body')) {
        return;
    }
    generateCategoryButtons();
    const defaultCategory = Object.keys(menuData)[0];
    generateMenuTable(defaultCategory);
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.classList.add('visible');
    }
}

// Initialize menu on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenuSection);
} else {
    initializeMenuSection();
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll handler
window.addEventListener('scroll', debounce(function() {
    // Any scroll-based logic can go here
}, 10));