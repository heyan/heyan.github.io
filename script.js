// Typewriter Effect
function typewriterEffect(element, text, speed = 50, callback) {
  let index = 0;
  element.textContent = '';

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  type();
}

// Command Cycling
function initCommandCycling() {
  const commands = [
    "whoami",
    "cat publications.txt",
    "cat contact.txt"
  ];

  const commandOutputs = [
    "heyan@ou.edu - PhD Student in Computer Science | Seeking faculty jobs!",
    "NDSS 2026: PhantomMotion laser attacks\nRAID 2025: MotionDecipher VR inference\nIEEE TMC 2023: Camera localization\nCCS 2023: Free tier camera identification\nMobiSys 2021: MotionCompass camera pinpointing\nMASS 2020: Virtual Step PIN Pad foot-input authentication",
    "Email: heyan@ou.edu\nLocation: University of Oklahoma, Norman, OK\nLinkedIn: linkedin.com/in/heyanok\nGoogle Scholar: scholar.google.com/citations?user=JjMvRJMAAAAJ"
  ];

  const commandTextEl = document.getElementById('command-text');
  const commandOutputEl = document.getElementById('command-output');
  const commandCursorEl = document.getElementById('command-cursor');

  if (!commandTextEl || !commandOutputEl) return;

  let currentCommand = 0;
  let isTyping = false;

  function showCommand(index) {
    if (isTyping) return;
    isTyping = true;

    // Clear previous
    commandTextEl.textContent = '';
    commandOutputEl.textContent = '';

    // Type command
    typewriterEffect(commandTextEl, commands[index], 100, () => {
      // Show output after command is typed
      setTimeout(() => {
        commandOutputEl.textContent = commandOutputs[index];
        isTyping = false;
      }, 300);
    });
  }

  // Show first command
  showCommand(0);

  // Cycle through commands
  setInterval(() => {
    currentCommand = (currentCommand + 1) % commands.length;
    showCommand(currentCommand);
  }, 4000);

  // Cursor blink
  if (commandCursorEl) {
    setInterval(() => {
      commandCursorEl.style.opacity = commandCursorEl.style.opacity === '0' ? '1' : '0';
    }, 500);
  }
}

// Smooth Scroll
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Make scrollToSection available globally
window.scrollToSection = scrollToSection;

// Intersection Observer for animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe publication cards
  const publicationCards = document.querySelectorAll('.publication-card');
  publicationCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(card);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Matrix Rain disabled for better visibility

  // Initialize Typewriter for hero subtitle
  const typewriterTextEl = document.getElementById('typewriter-text');
  if (typewriterTextEl) {
    typewriterEffect(
      typewriterTextEl,
      "PhD Student in Computer Science | Seeking Faculty Jobs | Terminal Access Granted",
      30
    );
  }

  // Initialize Command Cycling
  initCommandCycling();

  // Initialize Scroll Animations
  initScrollAnimations();

  // Add smooth scroll behavior to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

