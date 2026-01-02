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

// 鬱猫界隈 ギャラリーページ
console.log("Gallery page loaded! 🎨");

// パーティクル生成（script.jsから）
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

const imageList = [
    "absolutely_destroy_the_server_ozeu_chan.png",
    "dadadada_tenshi.png",
    "denpa_maid.png",
    "furo_hairu_profile.png",
    "i_am_not_mentally_unstable.png",
    "i_d_k.png",
    "i_d_k_2.png",
    "i_love_acvr.png",
    "kyu_kurarin.png",
    "mon_mon_fan_mou_ran.png",
    "onii_chan_ha_oshimai.png",
    "ozeu_is_here.png",
    "peropero_dick.jpeg",
    "senbon_sakura.png",
    "take_medicine_and_go_to_sleep.png",
    "telepathy.png",
    "trendy_ice_cream.png"
];

function loadGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    imageList.forEach((filename, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'translateY(50px)';
        galleryItem.style.transition = 'all 0.6s ease';
        galleryItem.style.transitionDelay = (index * 0.05) + 's';

        const img = document.createElement('img');
        img.src = `gallery_images/${filename}`;
        img.alt = filename;
        img.loading = 'lazy';
        
        // エラーとか
        img.onerror = () => {
            galleryItem.style.display = 'none';
        };

        galleryItem.appendChild(img);
        container.appendChild(galleryItem);

        // クリックで拡大表示
        galleryItem.addEventListener('click', () => {
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

    setTimeout(() => {
        const items = container.querySelectorAll('.gallery-item');
        items.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    createParticles();
    loadGallery();
});

console.log(`Loaded ${imageList.length} images! 🖼️`);
