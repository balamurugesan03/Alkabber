// ===========================
// HEADER ANIMATIONS & INTERACTIONS
// ===========================

document.addEventListener('DOMContentLoaded', function() {

  // ===========================
  // MOBILE MENU TOGGLE
  // ===========================
  const header = document.querySelector('header');

  // Create mobile menu toggle if it doesn't exist
  if (!document.querySelector('.mobile-menu-toggle')) {
    const mobileToggle = document.createElement('div');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '<span></span><span></span><span></span>';

    const nav = document.querySelector('nav');
    if (nav && header) {
      header.insertBefore(mobileToggle, nav);
    }

    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target) && nav.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ===========================
  // HEADER SCROLL EFFECTS
  // ===========================
  let lastScroll = 0;
  const scrollThreshold = 100;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add shadow and background change on scroll
    if (currentScroll > scrollThreshold) {
      header.style.background = 'rgba(198, 177, 151, 0.98)';
      header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.background = 'linear-gradient(135deg, rgba(198, 177, 151, 0.95) 0%, rgba(229, 210, 184, 0.95) 100%)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }

    // Hide header on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

  // ===========================
  // LOGO ANIMATION ON CLICK
  // ===========================
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function(e) {
      // Don't navigate if clicking logo
      e.preventDefault();

      // Add bounce animation
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'logoBounce 0.6s ease';
      }, 10);

      // Navigate to home after animation
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 300);
    });
  }

  // ===========================
  // NAVIGATION LINK RIPPLE EFFECT
  // ===========================
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'nav-ripple';

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ===========================
  // ACTIVE PAGE DETECTION
  // ===========================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ===========================
  // HEADER ENTRANCE ANIMATION
  // ===========================
  setTimeout(() => {
    header.style.opacity = '1';
    header.style.transform = 'translateY(0)';
  }, 100);

  // ===========================
  // LOGO TEXT TYPING EFFECT
  // ===========================
  const logoText = document.querySelector('.logo h2');
  if (logoText && !sessionStorage.getItem('logoAnimated')) {
    const text = logoText.textContent;
    logoText.textContent = '';
    logoText.style.opacity = '1';

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        logoText.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typeInterval);
        sessionStorage.setItem('logoAnimated', 'true');
      }
    }, 100);
  }

  // ===========================
  // KEYBOARD NAVIGATION
  // ===========================
  document.addEventListener('keydown', function(e) {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
      const nav = document.querySelector('nav');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');

      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (mobileToggle) {
          mobileToggle.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
      }
    }
  });

  // ===========================
  // SMOOTH SCROLL TO TOP ON LOGO CLICK
  // ===========================
  if (logo) {
    logo.addEventListener('dblclick', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});

// ===========================
// DYNAMIC ANIMATIONS STYLES
// ===========================
const style = document.createElement('style');
style.textContent = `
  @keyframes logoBounce {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
  }

  .nav-ripple {
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(85, 51, 30, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: navRippleExpand 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes navRippleExpand {
    to {
      transform: translate(-50%, -50%) scale(15);
      opacity: 0;
    }
  }

  /* Add smooth transition to header */
  header {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Prevent text selection on logo */
  .logo {
    user-select: none;
    -webkit-user-select: none;
  }

  /* Mobile menu overlay */
  @media (max-width: 768px) {
    nav.active::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 30%;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      z-index: -1;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;
document.head.appendChild(style);
