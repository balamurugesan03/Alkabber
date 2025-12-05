// ===========================
// HOME PAGE ANIMATIONS & INTERACTIONS
// ===========================

document.addEventListener('DOMContentLoaded', function() {

  // ===========================
  // PARTICLE ANIMATION
  // ===========================
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random positioning
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.width = particle.style.height = (Math.random() * 3 + 2) + 'px';

      particlesContainer.appendChild(particle);
    }
  }

  createParticles();

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

        // Trigger counter animation
        if (entry.target.classList.contains('stat-item')) {
          const counter = entry.target.querySelector('.counter');
          if (counter) {
            animateCounter(counter);
          }
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    '.fade-in-up, .slide-in-left, .slide-in-right, .stat-item, .feature-card, .portfolio-item, .testimonial-card'
  );

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // ===========================
  // COUNTER ANIMATION
  // ===========================
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // ===========================
  // PARALLAX EFFECT
  // ===========================
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const heroHome = document.querySelector('.hero-home');
    if (heroHome) {
      heroHome.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }

    // CTA parallax
    const ctaHome = document.querySelector('.cta-home');
    if (ctaHome) {
      const ctaOffset = ctaHome.offsetTop;
      const ctaScroll = scrolled - ctaOffset;
      if (ctaScroll > -window.innerHeight && ctaScroll < ctaHome.offsetHeight) {
        ctaHome.style.backgroundPositionY = ctaScroll * 0.3 + 'px';
      }
    }
  });

  // ===========================
  // SMOOTH SCROLL FOR SCROLL DOWN
  // ===========================
  const scrollDown = document.querySelector('.scroll-down');
  if (scrollDown) {
    scrollDown.addEventListener('click', function() {
      const quickStats = document.querySelector('.quick-stats');
      if (quickStats) {
        quickStats.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===========================
  // TESTIMONIAL SLIDER
  // ===========================
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialNext = document.querySelector('.testimonial-next');
  const testimonialPrev = document.querySelector('.testimonial-prev');
  const testimonialDots = document.querySelector('.testimonial-dots');

  let currentTestimonial = 0;

  // Create dots
  if (testimonialDots && testimonialCards.length > 0) {
    testimonialCards.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToTestimonial(index));
      testimonialDots.appendChild(dot);
    });
  }

  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.remove('active');
      if (i === index) {
        card.classList.add('active');
      }
    });

    // Update dots
    const dots = testimonialDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  }

  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  }

  function goToTestimonial(index) {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  }

  if (testimonialNext) {
    testimonialNext.addEventListener('click', nextTestimonial);
  }

  if (testimonialPrev) {
    testimonialPrev.addEventListener('click', prevTestimonial);
  }

  // Auto-play testimonials
  let testimonialAutoplay = setInterval(nextTestimonial, 5000);

  // Pause autoplay on hover
  const testimonialSlider = document.querySelector('.testimonials-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(testimonialAutoplay);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
      testimonialAutoplay = setInterval(nextTestimonial, 5000);
    });
  }

  // ===========================
  // PORTFOLIO HOVER EFFECTS
  // ===========================
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });

    item.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  // ===========================
  // FEATURE CARD EFFECTS
  // ===========================
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(85, 51, 30, 0.1)';
      ripple.style.borderRadius = '50%';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.animation = 'ripple-expand 0.6s ease-out';
      ripple.style.pointerEvents = 'none';

      card.style.position = 'relative';
      card.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ===========================
  // HEADER SCROLL EFFECT
  // ===========================
  let lastScroll = 0;
  const header = document.querySelector('#main-header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 100) {
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      header.style.background = 'rgba(198, 177, 151, 0.98)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = '#c6b197';
      header.style.backdropFilter = 'none';
    }

    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

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
  // BUTTON HOVER EFFECTS
  // ===========================
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta-primary, .btn-cta-secondary');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '100%';
      ripple.style.height = '100%';
      ripple.style.top = '0';
      ripple.style.left = '0';
      ripple.style.background = 'rgba(255, 255, 255, 0.2)';
      ripple.style.borderRadius = '50px';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'button-ripple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';

      this.style.position = 'relative';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ===========================
  // STAGGER ANIMATIONS
  // ===========================
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // ===========================
  // PAGE LOAD ANIMATION
  // ===========================
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // ===========================
  // CONSOLE BRANDING
  // ===========================
  console.log('%c Al Kabeer - Premium Events & Real Estate ',
    'background: linear-gradient(135deg, #55331e, #8b6f47); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
  );
  console.log('%c Crafted with excellence and innovation ',
    'color: #55331e; font-size: 12px; font-style: italic;'
  );

  // ===========================
  // SMOOTH SCROLL FOR ALL LINKS
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
});

// ===========================
// DYNAMIC STYLES
// ===========================
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-expand {
    to {
      transform: translate(-50%, -50%) scale(30);
      opacity: 0;
    }
  }

  @keyframes button-ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  #main-header {
    transition: all 0.3s ease;
  }

  .portfolio-item {
    z-index: 1;
    transition: z-index 0s;
  }
`;
document.head.appendChild(style);
