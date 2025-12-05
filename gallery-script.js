// ===========================
// GALLERY PAGE ANIMATIONS & INTERACTIONS
// ===========================

document.addEventListener('DOMContentLoaded', function() {

  // ===========================
  // SCROLL ANIMATIONS
  // ===========================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    observer.observe(item);
  });

  // ===========================
  // CATEGORY FILTERING
  // ===========================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const allGalleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter gallery items with stagger animation
      allGalleryItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          // Show item with delay
          setTimeout(() => {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) scale(1)';
            }, 50);
          }, index * 50);
        } else {
          // Hide item
          item.style.opacity = '0';
          item.style.transform = 'translateY(40px) scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // ===========================
  // LIGHTBOX FUNCTIONALITY
  // ===========================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let currentImageIndex = 0;
  let visibleImages = [];

  // Get visible images for navigation
  function getVisibleImages() {
    return Array.from(allGalleryItems).filter(item =>
      item.style.display !== 'none' &&
      window.getComputedStyle(item).display !== 'none'
    );
  }

  // Open lightbox
  allGalleryItems.forEach((item, index) => {
    const viewBtn = item.querySelector('.view-btn');
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-info h3');
    const description = item.querySelector('.gallery-info p');

    viewBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      openLightbox(item, index);
    });

    item.addEventListener('click', function() {
      openLightbox(item, index);
    });
  });

  function openLightbox(item, index) {
    visibleImages = getVisibleImages();
    currentImageIndex = visibleImages.indexOf(item);

    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-info h3');
    const description = item.querySelector('.gallery-info p');

    lightboxImg.src = img.src;
    lightboxTitle.textContent = title.textContent;
    lightboxDescription.textContent = description.textContent;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Navigate lightbox
  lightboxPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  lightboxNext.addEventListener('click', function(e) {
    e.stopPropagation();
    navigateLightbox(1);
  });

  function navigateLightbox(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
      currentImageIndex = visibleImages.length - 1;
    } else if (currentImageIndex >= visibleImages.length) {
      currentImageIndex = 0;
    }

    const currentItem = visibleImages[currentImageIndex];
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-info h3');
    const description = currentItem.querySelector('.gallery-info p');

    // Add fade effect
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxTitle.textContent = title.textContent;
      lightboxDescription.textContent = description.textContent;
      lightboxImg.style.opacity = '1';
    }, 200);
  }

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    }
  });

  // ===========================
  // PARALLAX EFFECT
  // ===========================
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const galleryHero = document.querySelector('.gallery-hero');
    if (galleryHero) {
      galleryHero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
  });

  // ===========================
  // SCROLL INDICATOR
  // ===========================
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const filterSection = document.querySelector('.gallery-filter');
      if (filterSection) {
        filterSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===========================
  // LOAD MORE FUNCTIONALITY
  // ===========================
  const loadMoreBtn = document.querySelector('.load-more-btn');
  let itemsToShow = 12; // Initial number of items shown
  const itemIncrement = 6; // Number of items to add

  // Initially hide extra items
  allGalleryItems.forEach((item, index) => {
    if (index >= itemsToShow) {
      item.style.display = 'none';
      item.classList.add('hidden-item');
    }
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      const hiddenItems = document.querySelectorAll('.gallery-item.hidden-item');

      let count = 0;
      hiddenItems.forEach((item, index) => {
        if (count < itemIncrement) {
          setTimeout(() => {
            item.style.display = 'block';
            item.classList.remove('hidden-item');
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) scale(1)';
            }, 50);
          }, index * 100);
          count++;
        }
      });

      // Hide button if no more items
      setTimeout(() => {
        const remainingHidden = document.querySelectorAll('.gallery-item.hidden-item');
        if (remainingHidden.length === 0) {
          loadMoreBtn.style.display = 'none';
        }
      }, 1000);

      // Scroll to new items
      setTimeout(() => {
        const firstNewItem = hiddenItems[0];
        if (firstNewItem) {
          firstNewItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    });
  }

  // ===========================
  // IMAGE LAZY LOADING
  // ===========================
  const images = document.querySelectorAll('img[src^="https://images.unsplash.com"]');
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';

    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
  });

  // ===========================
  // HOVER SOUND EFFECTS (Optional)
  // ===========================
  allGalleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.zIndex = '20';
    });

    item.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  // ===========================
  // FILTER KEYBOARD NAVIGATION
  // ===========================
  filterButtons.forEach((btn, index) => {
    btn.addEventListener('keydown', function(e) {
      let newIndex;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = (index + 1) % filterButtons.length;
        filterButtons[newIndex].focus();
        filterButtons[newIndex].click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = (index - 1 + filterButtons.length) % filterButtons.length;
        filterButtons[newIndex].focus();
        filterButtons[newIndex].click();
      }
    });
  });

  // ===========================
  // TOUCH SWIPE FOR LIGHTBOX (Mobile)
  // ===========================
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next image
      navigateLightbox(1);
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous image
      navigateLightbox(-1);
    }
  }

  // ===========================
  // PAGE LOAD ANIMATION
  // ===========================
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // ===========================
  // COUNT VISIBLE ITEMS
  // ===========================
  function updateItemCount() {
    const activeFilter = document.querySelector('.filter-btn.active');
    const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';

    const visibleCount = Array.from(allGalleryItems).filter(item => {
      return item.style.display !== 'none' &&
             window.getComputedStyle(item).display !== 'none';
    }).length;

    console.log(`Showing ${visibleCount} ${filterValue} items`);
  }

  // Call on filter change
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      setTimeout(updateItemCount, 500);
    });
  });

  // ===========================
  // CONSOLE BRANDING
  // ===========================
  console.log('%c Al Kabeer Gallery ',
    'background: linear-gradient(135deg, #55331e, #8b6f47); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
  );
  console.log('%c Showcasing Excellence in Events & Real Estate ',
    'color: #55331e; font-size: 12px; font-style: italic;'
  );

  // Initial count
  updateItemCount();

});

// ===========================
// DYNAMIC STYLES
// ===========================
const style = document.createElement('style');
style.textContent = `
  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .lightbox-content img {
    transition: opacity 0.3s ease;
  }

  .gallery-item {
    will-change: transform, opacity;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
document.head.appendChild(style);
