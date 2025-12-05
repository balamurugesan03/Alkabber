// ===========================
// ABOUT PAGE ANIMATIONS & INTERACTIONS
// ===========================

document.addEventListener('DOMContentLoaded', function() {

  // ===========================
  // SCROLL ANIMATIONS
  // ===========================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        // Trigger counter animation for stats
        if (entry.target.classList.contains('stat-card')) {
          animateCounter(entry.target.querySelector('.stat-number'));
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    '.fade-in-up, .slide-in-left, .slide-in-right, .stat-card, .value-card, .team-card'
  );

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // ===========================
  // COUNTER ANIMATION
  // ===========================
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString() + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }

  // ===========================
  // PARALLAX EFFECT
  // ===========================
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.backgroundPositionY = scrolled * speed + 'px';
    });

    // Smooth navbar background on scroll
    const header = document.querySelector('header');
    if (scrolled > 100) {
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      header.style.transition = 'all 0.3s ease';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // ===========================
  // SMOOTH SCROLL FOR SCROLL INDICATOR
  // ===========================
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const statsSection = document.querySelector('.stats-section');
      if (statsSection) {
        statsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===========================
  // IMAGE LAZY LOADING EFFECT
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
  // TEAM CARD TILT EFFECT
  // ===========================
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ===========================
  // VALUE CARDS STAGGER ANIMATION
  // ===========================
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // ===========================
  // MISSION & VISION CARD EFFECTS
  // ===========================
  const mvCards = document.querySelectorAll('.mv-card');
  mvCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f5f2 100%)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.background = 'white';
    });
  });

  // ===========================
  // STATS SECTION PROGRESS BARS
  // ===========================
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
  });

  // ===========================
  // PAGE LOAD ANIMATIONS
  // ===========================
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // ===========================
  // HEADER SCROLL HIDE/SHOW
  // ===========================
  let lastScroll = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

  // ===========================
  // ENHANCED BUTTON RIPPLE EFFECT
  // ===========================
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // ===========================
  // SECTION PROGRESS INDICATOR
  // ===========================
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        section.style.opacity = '1';
      }
    });
  });

  // ===========================
  // PRELOAD IMAGES
  // ===========================
  const imageUrls = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80'
  ];

  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });

  // ===========================
  // CONSOLE BRANDING
  // ===========================
  console.log('%c Al Kabeer - Premium Events & Real Estate ',
    'background: linear-gradient(135deg, #55331e, #8b6f47); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
  );
  console.log('%c Crafted with precision and excellence ',
    'color: #55331e; font-size: 12px; font-style: italic;'
  );
});

// ===========================
// RIPPLE EFFECT STYLES (DYNAMIC)
// ===========================
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  header {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
`;
document.head.appendChild(style);
