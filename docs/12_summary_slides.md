---
description: Download or view the summarized presentation slides for all 10 SWALPA lessons. Perfect for quick review and on-the-go reference.
---

# 📚 Lesson Summary Slides

Need a quick refresher on the core concepts, vocabulary, and linguistic hacks? We've compiled all 10 lessons into a sleek, high-contrast slide deck for easy reading and review.

<style>
.swalpa-carousel-container {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 2rem auto 0.5rem auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    aspect-ratio: 16 / 9;
    background: #000;
}

.swalpa-slide {
    display: none;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.swalpa-slide.active {
    display: block;
}

.swalpa-carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 1rem 1.2rem;
    cursor: pointer;
    font-size: 1.5rem;
    border-radius: 50%;
    transition: background 0.3s;
    z-index: 10;
}

.swalpa-carousel-btn:hover {
    background: rgba(0, 0, 0, 0.8);
}

.swalpa-carousel-btn.prev {
    left: 15px;
}

.swalpa-carousel-btn.next {
    right: 15px;
}

.swalpa-carousel-counter {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-family: monospace;
}
</style>

<div class="swalpa-carousel-container" id="slides-carousel" tabindex="0">
    <button class="swalpa-carousel-btn prev" id="prev-btn" aria-label="Previous Slide">❮</button>
    <button class="swalpa-carousel-btn next" id="next-btn" aria-label="Next Slide">❯</button>
    
    <div id="slide-track">
        <!-- Javascript will inject the 10 slides here -->
    </div>
    
    <div class="swalpa-carousel-counter" id="slide-counter">1 / 10</div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('slide-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const counter = document.getElementById('slide-counter');
    const carouselContainer = document.getElementById('slides-carousel');
    
    const totalSlides = 15;
    let currentSlide = 1;

    // Load images
    for (let i = 1; i <= totalSlides; i++) {
        const img = document.createElement('img');
        const num = i.toString().padStart(2, '0');
        img.src = `../assets/img/slides/slide_${num}.jpg`;
        img.className = 'swalpa-slide';
        if (i === 1) img.classList.add('active');
        img.alt = `Slide ${i}`;
        track.appendChild(img);
    }

    const slides = document.querySelectorAll('.swalpa-slide');

    function updateCarousel() {
        slides.forEach((slide, index) => {
            if (index + 1 === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        counter.textContent = `${currentSlide} / ${totalSlides}`;
        
        // Disable buttons at edges
        prevBtn.style.opacity = currentSlide === 1 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentSlide === 1 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentSlide === totalSlides ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentSlide === totalSlides ? 'none' : 'auto';
    }

    function nextSlide() {
        if (currentSlide < totalSlides) {
            currentSlide++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentSlide > 1) {
            currentSlide--;
            updateCarousel();
        }
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    carouselContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        }
    });
    
    // Focus the container so keyboard events work immediately
    carouselContainer.focus();
    
    updateCarousel();
});
</script>

<div style="text-align: right; max-width: 900px; margin: 0 auto; font-size: 0.85rem; opacity: 0.7;">
    <a href="../assets/pdfs/slides.pdf" download style="color: inherit; margin-right: 15px; text-decoration: none; border-bottom: 1px dashed currentColor;">⬇️ Download PDF</a>
    <a href="../assets/pdfs/slides.pdf" target="_blank" style="color: inherit; text-decoration: none; border-bottom: 1px dashed currentColor;">👁️ Open in New Tab</a>
</div>
