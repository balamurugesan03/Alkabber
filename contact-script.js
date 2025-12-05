// ===========================
// CONTACT PAGE ANIMATIONS & INTERACTIONS
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
    '.fade-in-up, .contact-card, .faq-item'
  );

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // ===========================
  // FORM VALIDATION
  // ===========================
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  // Input validation
  const validators = {
    name: (value) => {
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters';
      }
      return '';
    },
    phone: (value) => {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
      return '';
    },
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      return '';
    },
    subject: (value) => {
      if (!value) {
        return 'Please select a service type';
      }
      return '';
    },
    message: (value) => {
      if (value.trim().length < 10) {
        return 'Message must be at least 10 characters';
      }
      return '';
    }
  };

  // Real-time validation on blur
  contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function() {
      validateField(this);
    });

    field.addEventListener('input', function() {
      if (this.parentElement.parentElement.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  function validateField(field) {
    const fieldName = field.name;
    const value = field.value;
    const formGroup = field.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');

    if (validators[fieldName]) {
      const errorMsg = validators[fieldName](value);

      if (errorMsg) {
        formGroup.classList.add('error');
        errorSpan.textContent = errorMsg;
        return false;
      } else {
        formGroup.classList.remove('error');
        errorSpan.textContent = '';
        return true;
      }
    }

    return true;
  }

  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    const fields = contactForm.querySelectorAll('input, select, textarea');

    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        successMessage.classList.add('show');
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 5000);

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 2000);
    } else {
      // Show error message
      errorMessage.classList.add('show');

      setTimeout(() => {
        errorMessage.classList.remove('show');
      }, 5000);

      // Scroll to first error
      const firstError = contactForm.querySelector('.form-group.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // ===========================
  // FAQ ACCORDION
  // ===========================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function() {
      // Close all other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current FAQ
      item.classList.toggle('active');
    });
  });

  // Keyboard navigation for FAQs
  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');

    question.setAttribute('tabindex', '0');

    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextItem = faqItems[index + 1];
        if (nextItem) {
          nextItem.querySelector('.faq-question').focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevItem = faqItems[index - 1];
        if (prevItem) {
          prevItem.querySelector('.faq-question').focus();
        }
      }
    });
  });

  // ===========================
  // PARALLAX EFFECT
  // ===========================
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const contactHero = document.querySelector('.contact-hero');
    if (contactHero) {
      contactHero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
  });

  // ===========================
  // SCROLL INDICATOR
  // ===========================
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const quickContact = document.querySelector('.quick-contact');
      if (quickContact) {
        quickContact.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===========================
  // CONTACT CARD ANIMATIONS
  // ===========================
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  // ===========================
  // FLOATING LABEL EFFECT
  // ===========================
  const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea, .input-wrapper select');

  inputs.forEach(input => {
    // Check if input has value on load
    if (input.value) {
      input.parentElement.classList.add('has-value');
    }

    input.addEventListener('blur', function() {
      if (this.value) {
        this.parentElement.classList.add('has-value');
      } else {
        this.parentElement.classList.remove('has-value');
      }
    });
  });

  // ===========================
  // SOCIAL ICON EFFECTS
  // ===========================
  const socialIcons = document.querySelectorAll('.social-icons a');
  socialIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();

        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      }
    });
  });

  // ===========================
  // CHARACTER COUNTER FOR TEXTAREA
  // ===========================
  const messageField = document.getElementById('message');
  if (messageField) {
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.textContent = '0 characters';

    const messageGroup = messageField.closest('.form-group');
    messageGroup.appendChild(charCounter);

    messageField.addEventListener('input', function() {
      const length = this.value.length;
      charCounter.textContent = `${length} character${length !== 1 ? 's' : ''}`;

      if (length >= 10 && length <= 500) {
        charCounter.style.color = '#28a745';
      } else if (length > 500) {
        charCounter.style.color = '#dc3545';
      } else {
        charCounter.style.color = '#666';
      }
    });
  }

  // ===========================
  // PAGE LOAD ANIMATION
  // ===========================
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // ===========================
  // SMOOTH ANCHOR LINKS
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
  // FORM FIELD AUTO-FORMAT
  // ===========================
  const phoneField = document.getElementById('phone');
  if (phoneField) {
    phoneField.addEventListener('input', function(e) {
      // Remove non-numeric characters except + and spaces
      let value = this.value.replace(/[^\d\+\s]/g, '');
      this.value = value;
    });
  }

  // ===========================
  // CONSOLE BRANDING
  // ===========================
  console.log('%c Al Kabeer Contact ',
    'background: linear-gradient(135deg, #55331e, #8b6f47); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
  );
  console.log('%c Get in touch with us today! ',
    'color: #55331e; font-size: 12px; font-style: italic;'
  );

  // ===========================
  // PREVENT FORM RESUBMISSION
  // ===========================
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }

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

  .char-counter {
    font-size: 0.85rem;
    color: #666;
    text-align: right;
    margin-top: 5px;
    transition: color 0.3s ease;
  }

  .ripple-effect {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
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

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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
