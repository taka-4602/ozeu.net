// 背景のパララックス効果
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.7; // スクロール速度（大きくして効果強化）
            document.body.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
            ticking = false;
        });
        ticking = true;
    }
});

console.log("⚡ OZEU ⚡");

// ランダムにOZEUロゴを選択
window.addEventListener('DOMContentLoaded', () => {
    const ozeuLogo = document.getElementById('ozeu-logo');
    if (ozeuLogo) {
        const logoImages = [
            'icons/text.png',
            'icons/text1.png',
            'icons/text2.png',
            'icons/text3.png',
            'icons/text4.png',
            'icons/text5.png'
        ];
        const randomLogo = logoImages[Math.floor(Math.random() * logoImages.length)];
        ozeuLogo.src = randomLogo;
    }
});

// ローディング画面（初回アクセス時のみ）
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        // セッションストレージで初回アクセスかチェック
        const hasVisited = sessionStorage.getItem('hasVisited');
        
        if (hasVisited) {
            // 2回目以降は即座に非表示
            loadingScreen.style.display = 'none';
        } else {
            sessionStorage.setItem('hasVisited', 'true');
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2500);
        }
    }
});

// パーティクル生成
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.width = (Math.random() * 5 + 3) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素を監視
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    const animateElements = document.querySelectorAll('.feature-card, .gallery-item');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(el);
    });
});

// ギャラリー画像のクリックで拡大表示
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
            overlay.style.zIndex = '9999';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.cursor = 'pointer';
            overlay.style.animation = 'fadeIn 0.3s ease';
            
            const enlargedImg = document.createElement('img');
            enlargedImg.src = img.src;
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.objectFit = 'contain';
            enlargedImg.style.borderRadius = '10px';
            enlargedImg.style.animation = 'slideUp 0.3s ease';
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            });
        });
    });
});

// マウス追従
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const mouseX = clientX / window.innerWidth;
    const mouseY = clientY / window.innerHeight;
    
    const floatImages = document.querySelectorAll('.float-image');
    floatImages.forEach((img, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        img.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
    });
});

// ランダムな絵文字を降らせる
function createEmojiRain() {
    const emojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐱', '🐈', '✨', '💖', '🌟', '💫'];
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '-50px';
            emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
            emoji.style.zIndex = '9999';
            emoji.style.pointerEvents = 'none';
            emoji.style.animation = 'float 5s linear forwards';
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                if (emoji.parentNode) {
                    document.body.removeChild(emoji);
                }
            }, 5000);
        }
    }, 200);
}

setTimeout(createEmojiRain, 3000);

console.log("All effects loaded! Enjoy your stay at Utuneko World! 🎉");
