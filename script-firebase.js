// Firebase Presentation JavaScript

let currentSlide = 1;
const totalSlides = 18;

// Check if content is scrollable
function checkScrollable() {
    const slides = document.querySelectorAll('.slide.active');
    slides.forEach(slide => {
        const content = slide.querySelector('.content');
        if (content) {
            if (content.scrollHeight > content.clientHeight) {
                content.classList.add('has-scroll');
            } else {
                content.classList.remove('has-scroll');
            }
        }
    });
}

// Initialize presentation
document.addEventListener('DOMContentLoaded', () => {
    initializePresentation();
    updateSlideDisplay();
    createSlideDots();
    setupKeyboardNavigation();
    checkScrollable();
    
    // Check scrollable on resize
    window.addEventListener('resize', checkScrollable);
});

// Initialize presentation
function initializePresentation() {
    // Show first slide
    showSlide(1);
    
    // Update total slides display
    document.getElementById('totalSlides').textContent = totalSlides;
    
    // Initialize Highlight.js for code syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

// Show specific slide
function showSlide(slideNumber) {
    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show target slide
    const targetSlide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
    if (targetSlide) {
        targetSlide.classList.add('active');
        currentSlide = slideNumber;
        updateSlideDisplay();
        updateProgressBar();
        updateDots();
        
        // Re-highlight code on slide change
        if (typeof hljs !== 'undefined') {
            targetSlide.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }
        
        // Check if content is scrollable after slide change
        setTimeout(checkScrollable, 100);
    }
}

// Navigate to next slide
function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

// Navigate to previous slide
function previousSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

// Update slide display and button states
function updateSlideDisplay() {
    document.getElementById('currentSlide').textContent = currentSlide;
    
    // Update button states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
    }
}

// Update progress bar
function updateProgressBar() {
    const progress = (currentSlide / totalSlides) * 100;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
}

// Create slide dots navigation
function createSlideDots() {
    const dotsContainer = document.getElementById('slideDots');
    if (!dotsContainer) return;
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create dots for each slide
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === currentSlide) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => showSlide(i));
        dot.title = `Slide ${i}`;
        dotsContainer.appendChild(dot);
    }
}

// Update dot indicators
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowRight':
            case ' ':
                event.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                previousSlide();
                break;
            case 'Home':
                event.preventDefault();
                showSlide(1);
                break;
            case 'End':
                event.preventDefault();
                showSlide(totalSlides);
                break;
        }
    });
}

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            previousSlide();
        }
    }
}

// Copy code to clipboard
function copyFirebaseCode(button) {
    const codeContainer = button.closest('.code-container');
    const codeBlock = codeContainer.querySelector('code');
    const code = codeBlock.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        // Change button text to show success
        const originalText = button.textContent;
        button.textContent = '✅ Copied!';
        button.style.background = '#4CAF50';
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        button.textContent = '❌ Failed';
        setTimeout(() => {
            button.textContent = '📋 Copy';
        }, 2000);
    });
}

// Print current slide number (useful for debugging)
function getCurrentSlide() {
    return currentSlide;
}

// Go to specific slide (can be called from console)
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        showSlide(slideNumber);
    } else {
        console.error(`Slide ${slideNumber} does not exist. Valid range: 1-${totalSlides}`);
    }
}

// Export functions for use in HTML
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.showSlide = showSlide;
window.goToSlide = goToSlide;
window.getCurrentSlide = getCurrentSlide;
window.copyFirebaseCode = copyFirebaseCode;

// Console message
console.log('🔥 Firebase Presentation Loaded');
console.log(`Total Slides: ${totalSlides}`);
console.log('Keyboard Controls:');
console.log('  → or Space: Next slide');
console.log('  ←: Previous slide');
console.log('  Home: First slide');
console.log('  End: Last slide');
console.log('\nConsole Commands:');
console.log('  goToSlide(n) - Jump to slide n');
console.log('  getCurrentSlide() - Get current slide number');
