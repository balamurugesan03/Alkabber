// ===========================
// SERVICES PAGE ANIMATIONS & INTERACTIONS
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
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    '.fade-in-up, .service-card, .timeline-item, .why-item'
  );

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // ===========================
  // CATEGORY FILTERING
  // ===========================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.getAttribute('data-category');

      // Update active tab
      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter services with animation
      serviceCards.forEach((card, index) => {
        const cardCategories = card.classList;

        if (category === 'all') {
          // Show all cards
          setTimeout(() => {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          }, index * 100);
        } else if (cardCategories.contains(category)) {
          // Show matching cards
          setTimeout(() => {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          }, index * 100);
        } else {
          // Hide non-matching cards
          card.style.opacity = '0';
          card.style.transform = 'translateY(40px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });

      // Scroll to services section
      const servicesSection = document.querySelector('.services-section');
      if (servicesSection) {
        setTimeout(() => {
          servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    });
  });

  // ===========================
  // PARALLAX EFFECT
  // ===========================
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const servicesHero = document.querySelector('.services-hero');
    if (servicesHero) {
      servicesHero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }

    // CTA parallax
    const servicesCta = document.querySelector('.services-cta');
    if (servicesCta) {
      const ctaOffset = servicesCta.offsetTop;
      const ctaScroll = scrolled - ctaOffset;
      if (ctaScroll > -window.innerHeight && ctaScroll < servicesCta.offsetHeight) {
        servicesCta.style.backgroundPositionY = ctaScroll * 0.3 + 'px';
      }
    }
  });

  // ===========================
  // SCROLL INDICATOR
  // ===========================
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const categoriesSection = document.querySelector('.service-categories');
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===========================
  // SERVICE CARD HOVER EFFECTS
  // ===========================
  const serviceCards2 = document.querySelectorAll('.service-card');
  serviceCards2.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add subtle tilt effect
      this.addEventListener('mousemove', tiltCard);
    });

    card.addEventListener('mouseleave', function() {
      this.removeEventListener('mousemove', tiltCard);
      this.style.transform = 'translateY(-10px) rotateX(0) rotateY(0)';
    });
  });

  function tiltCard(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
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
  // BUTTON RIPPLE EFFECTS
  // ===========================
  const buttons = document.querySelectorAll('.service-btn, .btn-cta-primary, .btn-cta-secondary');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ===========================
  // TIMELINE ANIMATION SEQUENCE
  // ===========================
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('timeline-visible');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });

  // ===========================
  // COUNT ANIMATION FOR NUMBERS (if any)
  // ===========================
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

  // ===========================
  // TAB BUTTON KEYBOARD NAVIGATION
  // ===========================
  tabButtons.forEach((btn, index) => {
    btn.addEventListener('keydown', function(e) {
      let newIndex;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = (index + 1) % tabButtons.length;
        tabButtons[newIndex].focus();
        tabButtons[newIndex].click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[newIndex].focus();
        tabButtons[newIndex].click();
      }
    });
  });

  // ===========================
  // SERVICE FEATURES ANIMATION
  // ===========================
  const serviceFeatures = document.querySelectorAll('.service-features li');
  serviceFeatures.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      feature.style.transition = 'all 0.4s ease';
      feature.style.opacity = '1';
      feature.style.transform = 'translateX(0)';
    }, index * 100);
  });

  // ===========================
  // PAGE LOAD ANIMATION
  // ===========================
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // ===========================
  // SMOOTH SCROLL FOR ALL INTERNAL LINKS
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===========================
  // CONSOLE BRANDING
  // ===========================
  console.log('%c Al Kabeer Services ',
    'background: linear-gradient(135deg, #55331e, #8b6f47); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
  );
  console.log('%c Premium Events & Real Estate Solutions ',
    'color: #55331e; font-size: 12px; font-style: italic;'
  );

});

// ===========================
// DYNAMIC STYLES
// ===========================
const style = document.createElement('style');
style.textContent = `
  .ripple-effect {
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

  .timeline-visible .timeline-icon {
    animation: bounceIn 0.6s ease-out;
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .service-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
document.head.appendChild(style);
