/* =========================================
   JAVASCRIPT PRINCIPAL - Cabinet Infirmier Qual'Idel
   ========================================= */

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initBackToTop();
  initPageLoader();
  initSmoothScroll();
  initAnimations();
  highlightActiveNav();
  initPhoneModal();
});

// ============================================
// NAVIGATION MOBILE
// ============================================

function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    // Toggle du menu mobile
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');

      // Empêcher le scroll quand le menu est ouvert
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// ============================================
// EFFETS AU SCROLL
// ============================================

function initScrollEffects() {
  const header = document.querySelector('.header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Masquer le header lors du scroll vers le bas
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }

      lastScroll = currentScroll;
    });
  }
}

// ============================================
// BOUTON RETOUR EN HAUT
// ============================================

function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    // Afficher/masquer le bouton selon la position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // Scroll vers le haut au clic
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ============================================
// LOADER DE PAGE
// ============================================

function initPageLoader() {
  const loader = document.querySelector('.page-loader');

  if (loader) {
    // Masquer le loader une fois la page chargée
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 500);
    });
  }
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
  // Smooth scroll pour tous les liens internes
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignorer les liens vides
      if (href === '#' || href === '#!') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// ANIMATIONS AU SCROLL
// ============================================

function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer les éléments à animer
  const animatedElements = document.querySelectorAll('.card, .testimonial, .info-item, .hero-text, .hero-image');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ============================================
// HIGHLIGHT NAVIGATION ACTIVE
// ============================================

function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    // Comparer les chemins
    if (currentPath === linkPath ||
      (currentPath === '/' && linkPath.includes('index.html')) ||
      (currentPath.includes('index.html') && linkPath === '/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Initialiser le lazy loading si des images sont présentes
if (document.querySelectorAll('img[data-src]').length > 0) {
  initLazyLoading();
}

// ============================================
// BOUTON D'APPEL
// ============================================

function formatPhoneNumber(phone) {
  // Formater le numéro de téléphone pour les liens tel:
  return phone.replace(/\s/g, '');
}

// Ajouter des liens tel: aux numéros de téléphone
document.querySelectorAll('.phone-number').forEach(el => {
  const phone = el.textContent.trim();
  const formattedPhone = formatPhoneNumber(phone);

  if (!el.href) {
    el.href = `tel:${formattedPhone}`;
  }
});

// ============================================
// UTILITAIRES
// ============================================

// Fonction pour débouncer les événements
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Fonction pour vérifier si un élément est visible
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ============================================
// MODE SOMBRE (BONUS)
// ============================================

function initDarkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');

  if (darkModeToggle) {
    // Vérifier la préférence sauvegardée
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    }

    // Toggle du mode sombre
    darkModeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      const isNowDark = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isNowDark);
    });
  }
}

// Initialiser le mode sombre si le toggle existe
if (document.querySelector('.dark-mode-toggle')) {
  initDarkMode();
}

// ============================================
// MODAL TÉLÉPHONE (DESKTOP)
// ============================================

function initPhoneModal() {
  const modalHTML = `
    <div id="phone-modal" class="modal-overlay">
      <div class="modal-content text-center">
        <button class="modal-close" aria-label="Fermer">×</button>
        <div class="modal-icon">📞</div>
        <h3 class="modal-title">Pour nous joindre</h3>
        <p class="modal-text mb-2">Composez le :</p>
        <div id="modal-phone-display" class="modal-number mb-3">02 35 23 42 19</div>
        <button id="copy-phone-btn" class="btn btn-primary">
          <span class="btn-icon">📋</span> Copier le numéro
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modalDisplay = document.getElementById('modal-phone-display');
  const phoneModal = document.getElementById('phone-modal');
  const closeModalBtn = phoneModal.querySelector('.modal-close');
  const copyBtn = document.getElementById('copy-phone-btn');
  let currentNumberToCopy = '';

  // Sur ordinateur (largeur > 768px), on intercepte tous les clics sur un lien "tel:"
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="tel:"]');
    if (link) {
      if (window.innerWidth > 768) {
        e.preventDefault(); // Bloque l'ouverture de xdg-open / skype
        e.stopPropagation();
        
        // Extraire le numéro pour l'affichage et la copie
        const rawNumber = link.getAttribute('href').replace('tel:', '');
        
        // Formater joliment pour l'affichage (ex: +33235234219 -> 02 35 23 42 19)
        let displayStr = rawNumber;
        if (rawNumber.startsWith('+33')) {
          const mainPart = rawNumber.substring(3); // Les 9 chiffres après +33
          // On ajoute le 0 et on espace 2 par 2
          displayStr = '0' + mainPart.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
        }
        
        modalDisplay.textContent = displayStr;
        currentNumberToCopy = displayStr.replace(/\s+/g, '');
        
        phoneModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  const closeModal = () => {
    phoneModal.classList.remove('active');
    document.body.style.overflow = '';
    // On remet le texte du bouton à son état initial après la fermeture
    setTimeout(() => {
      copyBtn.innerHTML = '<span class="btn-icon">📋</span> Copier le numéro';
    }, 300);
  };

  closeModalBtn.addEventListener('click', closeModal);

  phoneModal.addEventListener('click', (e) => {
    if (e.target === phoneModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && phoneModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Copie dans le presse-papiers
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(currentNumberToCopy).then(() => {
      copyBtn.innerHTML = '<span class="btn-icon">✅</span> Copié !';
      setTimeout(() => {
        if (phoneModal.classList.contains('active')) {
          copyBtn.innerHTML = '<span class="btn-icon">📋</span> Copier le numéro';
        }
      }, 2000);
    }).catch(err => {
      console.error('Erreur lors de la copie :', err);
      copyBtn.innerHTML = '<span class="btn-icon">❌</span> Erreur';
    });
  });
}

// ============================================
// GESTION DES ERREURS
// ============================================

// Log des erreurs pour le débogage
window.addEventListener('error', (e) => {
  console.error('Erreur JavaScript:', e.error);
});

// ============================================
// EXPORT DES FONCTIONS (si besoin)
// ============================================

window.cabinetInfirmier = {
  debounce,
  isElementInViewport,
  formatPhoneNumber
};
