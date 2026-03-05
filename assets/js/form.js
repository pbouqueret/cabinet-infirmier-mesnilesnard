/* =========================================
   VALIDATION FORMULAIRE - Cabinet Infirmier Qual'Idel
   ========================================= */

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    initFormValidation(contactForm);
  }
});

// ============================================
// RÈGLES DE VALIDATION
// ============================================

const validationRules = {
  nom: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
    messages: {
      required: 'Le nom est requis',
      minLength: 'Le nom doit contenir au moins 2 caractères',
      maxLength: 'Le nom ne peut pas dépasser 50 caractères',
      pattern: 'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets'
    }
  },
  prenom: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
    messages: {
      required: 'Le prénom est requis',
      minLength: 'Le prénom doit contenir au moins 2 caractères',
      maxLength: 'Le prénom ne peut pas dépasser 50 caractères',
      pattern: 'Le prénom ne peut contenir que des lettres, espaces, apostrophes et tirets'
    }
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: 'L\'adresse email est requise',
      pattern: 'Veuillez entrer une adresse email valide'
    }
  },
  telephone: {
    required: true,
    pattern: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    messages: {
      required: 'Le numéro de téléphone est requis',
      pattern: 'Veuillez entrer un numéro de téléphone français valide (ex: 02 35 23 42 19)'
    }
  },
  sujet: {
    required: true,
    messages: {
      required: 'Veuillez sélectionner un sujet'
    }
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    messages: {
      required: 'Le message est requis',
      minLength: 'Le message doit contenir au moins 10 caractères',
      maxLength: 'Le message ne peut pas dépasser 1000 caractères'
    }
  }
};

// ============================================
// VALIDATION DU FORMULAIRE
// ============================================

function initFormValidation(form) {
  const fields = form.querySelectorAll('input, textarea, select');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Validation en temps réel
  fields.forEach(field => {
    // Validation au blur (perte de focus)
    field.addEventListener('blur', () => {
      validateField(field);
    });

    // Validation à la saisie (pour feedback immédiat)
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field);
      }
    });
  });

  // Validation à la soumission
  form.addEventListener('submit', (e) => {
    let isValid = true;

    // Valider tous les champs
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      e.preventDefault(); // On bloque l'envoi uniquement si le formulaire est invalide
      // Scroller vers le premier champ en erreur
      const firstError = form.querySelector('.form-group.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    // Si isValid est true, on laisse le navigateur poursuivre l'action native vers Formspree
  });
}

// ============================================
// VALIDATION D'UN CHAMP
// ============================================

function validateField(field) {
  const fieldName = field.name;
  const fieldValue = field.value.trim();
  const formGroup = field.closest('.form-group');
  const errorElement = formGroup?.querySelector('.form-error');

  // Si pas de règles de validation pour ce champ
  if (!validationRules[fieldName]) {
    return true;
  }

  const rules = validationRules[fieldName];
  let isValid = true;
  let errorMessage = '';

  // Vérification: champ requis
  if (rules.required && !fieldValue) {
    isValid = false;
    errorMessage = rules.messages.required;
  }

  // Vérification: longueur minimale
  if (isValid && rules.minLength && fieldValue.length < rules.minLength) {
    isValid = false;
    errorMessage = rules.messages.minLength;
  }

  // Vérification: longueur maximale
  if (isValid && rules.maxLength && fieldValue.length > rules.maxLength) {
    isValid = false;
    errorMessage = rules.messages.maxLength;
  }

  // Vérification: pattern (regex)
  if (isValid && rules.pattern && !rules.pattern.test(fieldValue)) {
    isValid = false;
    errorMessage = rules.messages.pattern;
  }

  // Afficher ou masquer l'erreur
  if (formGroup) {
    if (isValid) {
      formGroup.classList.remove('error');
      formGroup.classList.add('valid');
      if (errorElement) {
        errorElement.textContent = '';
      }
    } else {
      formGroup.classList.remove('valid');
      formGroup.classList.add('error');
      if (errorElement) {
        errorElement.textContent = errorMessage;
      }
    }
  }

  return isValid;
}

// ============================================
// MESSAGES DE SUCCÈS/ERREUR
// ============================================

function showSuccessMessage(form) {
  let successMessage = form.querySelector('.form-success');

  if (!successMessage) {
    successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    form.insertBefore(successMessage, form.firstChild);
  }

  successMessage.innerHTML = `
    <strong>✓ Message envoyé avec succès !</strong><br>
    Nous vous répondrons dans les plus brefs délais.
  `;
  successMessage.classList.add('show');

  // Masquer le message après 5 secondes
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 5000);

  // Scroller vers le message
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showErrorMessage(form, message) {
  let errorMessage = form.querySelector('.form-error-global');

  if (!errorMessage) {
    errorMessage = document.createElement('div');
    errorMessage.className = 'form-error-global';
    errorMessage.style.cssText = `
      padding: var(--spacing-lg);
      background-color: var(--color-error);
      color: var(--color-white);
      border-radius: var(--border-radius-md);
      text-align: center;
      margin-bottom: var(--spacing-lg);
    `;
    form.insertBefore(errorMessage, form.firstChild);
  }

  errorMessage.textContent = message;
  errorMessage.style.display = 'block';

  // Masquer le message après 5 secondes
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 5000);
}

// ============================================
// COMPTEUR DE CARACTÈRES (pour textarea)
// ============================================

function initCharCounter() {
  const textareas = document.querySelectorAll('textarea[maxlength]');

  textareas.forEach(textarea => {
    const maxLength = textarea.getAttribute('maxlength');
    const formGroup = textarea.closest('.form-group');

    if (formGroup && maxLength) {
      // Créer l'élément compteur
      const counter = document.createElement('div');
      counter.className = 'char-counter';
      counter.style.cssText = `
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        text-align: right;
        margin-top: var(--spacing-xs);
      `;
      formGroup.appendChild(counter);

      // Fonction de mise à jour du compteur
      const updateCounter = () => {
        const currentLength = textarea.value.length;
        counter.textContent = `${currentLength} / ${maxLength} caractères`;

        if (currentLength >= maxLength * 0.9) {
          counter.style.color = 'var(--color-warning)';
        } else {
          counter.style.color = 'var(--color-text-secondary)';
        }
      };

      // Initialiser et écouter les changements
      updateCounter();
      textarea.addEventListener('input', updateCounter);
    }
  });
}

// Initialiser le compteur de caractères si des textareas sont présents
if (document.querySelectorAll('textarea[maxlength]').length > 0) {
  initCharCounter();
}

// ============================================
// FORMATAGE AUTOMATIQUE DU TÉLÉPHONE
// ============================================

function initPhoneFormatting() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '');

      // Formater le numéro: XX XX XX XX XX
      if (value.length > 0) {
        value = value.match(/.{1,2}/g)?.join(' ') || value;
      }

      e.target.value = value;
    });
  });
}

// Initialiser le formatage du téléphone si des champs sont présents
if (document.querySelectorAll('input[type="tel"]').length > 0) {
  initPhoneFormatting();
}

// ============================================
// EXPORT DES FONCTIONS
// ============================================

window.formValidation = {
  validateField,
  submitForm,
  showSuccessMessage,
  showErrorMessage
};
