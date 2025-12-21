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

// Command Display - Single Command
function initCommandCycling() {
  const command = "cat contact.txt";
  const commandOutput = "Email: heyan@ou.edu\nLocation: University of Oklahoma, Norman, OK\nLinkedIn: linkedin.com/in/heyanok\nGoogle Scholar: scholar.google.com/citations?user=JjMvRJMAAAAJ";

  const commandTextEl = document.getElementById('command-text');
  const commandOutputEl = document.getElementById('command-output');
  const commandCursorEl = document.getElementById('command-cursor');

  if (!commandTextEl || !commandOutputEl) return;

  // Clear initial state
  commandTextEl.textContent = '';
  commandOutputEl.textContent = '';

  // Type command
  typewriterEffect(commandTextEl, command, 100, () => {
    // Show output after command is typed
    setTimeout(() => {
      commandOutputEl.textContent = commandOutput;
      // Hide cursor after output is shown
      if (commandCursorEl) {
        commandCursorEl.style.display = 'none';
      }
    }, 300);
  });

  // Cursor blink (only while typing)
  if (commandCursorEl) {
    const cursorInterval = setInterval(() => {
      if (commandTextEl.textContent.length < command.length) {
        commandCursorEl.style.opacity = commandCursorEl.style.opacity === '0' ? '1' : '0';
      } else {
        clearInterval(cursorInterval);
      }
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
    threshold: 0.01,
    rootMargin: '100px 0px 100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, observerOptions);

  // Observe publication items for fade-in effect
  const publicationItems = document.querySelectorAll('.publication-item');
  publicationItems.forEach((item, index) => {
    // Set initial state but ensure visibility fallback
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.4s ease-out ${index * 0.05}s, transform 0.4s ease-out ${index * 0.05}s`;
    item.style.willChange = 'opacity, transform';
    
    // Fallback: make visible after a delay if observer doesn't trigger
    setTimeout(() => {
      if (item.style.opacity === '0') {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }
    }, 1000 + (index * 100));
    
    observer.observe(item);
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
      "PhD Candidate in Computer Science",
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

