// Start slideshow on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
});

// DOM Elements
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('carouselDots');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentIndex = 0;
let autoSlideInterval;

// Clone first and last items for smooth circular transition
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

const allItems = document.querySelectorAll('.carousel-item');
const itemWidth = items[0].offsetWidth;

// Set initial position
let currentPosition = -itemWidth;
track.style.transform = `translateX(${currentPosition}px)`;

// Update Carousel Display
function updateCarousel() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(${currentPosition}px)`;
}

// Go to Next Slide
function nextSlide() {
    if (currentIndex >= items.length) {
        currentIndex = 0;
        currentPosition = -itemWidth;
        track.style.transition = 'none';
        track.style.transform = `translateX(${currentPosition}px)`;
        setTimeout(() => {
            currentIndex++;
            currentPosition -= itemWidth;
            updateCarousel();
        }, 50);
    } else {
        currentIndex++;
        currentPosition -= itemWidth;
        updateCarousel();
    }
}

// Go to Previous Slide
function prevSlide() {
    if (currentIndex <= 0) {
        currentIndex = items.length;
        currentPosition = -(items.length * itemWidth);
        track.style.transition = 'none';
        track.style.transform = `translateX(${currentPosition}px)`;
        setTimeout(() => {
            currentIndex--;
            currentPosition += itemWidth;
            updateCarousel();
        }, 50);
    } else {
        currentIndex--;
        currentPosition += itemWidth;
        updateCarousel();
    }
}

// Auto-Slide Functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 3000); // 3-second interval
}

// Stop Auto-Slide
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Reset Auto-Slide on Manual Interaction
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Event Listeners for Prev and Next Buttons
nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevButton.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

// Pause Auto-Slide on Hover
track.addEventListener('mouseover', stopAutoSlide);
track.addEventListener('mouseout', startAutoSlide);

// Initialize Carousel
function initializeCarousel() {
    startAutoSlide();
}
