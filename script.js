// Simple typewriter effect (kept for potential reuse)
function typewriterEffect(el, text, speed = 45, done) {
  if (!el) return;
  let i = 0;
  el.textContent = '';
  (function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (done) {
      done();
    }
  })();
}

const CONTACT = {
  email: 'heyan@ou.edu',
  location: 'University of Oklahoma, Norman, OK',
  linkedin: 'https://www.linkedin.com/in/heyanok/',
  scholar: 'https://scholar.google.com/citations?user=JjMvRJMAAAAJ'
};

const PUBLICATIONS = [
  {
    key: 'ndss2026',
    title: 'PhantomMotion: Laser-Based Motion Injection Attacks on Wireless Security Surveillance Systems',
    venue: 'NDSS 2026 (San Diego)',
    status: 'Accepted',
    pdf: null,
    note: 'Laser-based motion injection attacks on wireless security surveillance systems.'
  },
  {
    key: 'raid2025',
    title: 'MotionDecipher: General Video-assisted Passcode Inference In Virtual Reality',
    venue: 'RAID 2025',
    status: 'Published',
    pdf: 'RAID25.pdf'
  },
  {
    key: 'tmc2023',
    title: 'Precise wireless camera localization leveraging traffic-aided spatial analysis',
    venue: 'IEEE TMC 2023',
    status: 'Published',
    pdf: 'TMC.pdf'
  },
  {
    key: 'ccs2023',
    title: 'When free tier becomes free to enter: Identifying security cameras with no cloud subscription',
    venue: 'CCS 2023',
    status: 'Published',
    pdf: 'CCS.pdf'
  },
  {
    key: 'mobisys2021',
    title: 'MotionCompass: Pinpointing wireless cameras via motion-activated traffic',
    venue: 'MobiSys 2021',
    status: 'Published',
    pdf: 'MobiSys.pdf'
  },
  {
    key: 'mass2020',
    title: 'Virtual Step PIN Pad: Towards foot-input authentication using geophones',
    venue: 'MASS 2020',
    status: 'Published',
    pdf: 'MASS.pdf'
  }
];

const COURSES = [
  'Embedded Systems',
  'Operating Systems',
  'Computer Security',
  'Machine Learning',
  'Database Management',
  'Computer Organization'
];

let gameActive = false;
let gameNumber = null;
let gameAttempts = 0;

function appendLine(container, text, className) {
  const line = document.createElement('div');
  line.className = className ? `terminal-line ${className}` : 'terminal-line';
  line.textContent = text;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

function publicationLines() {
  return PUBLICATIONS.map(p => {
    const pdfPart = p.pdf ? `pdf: ${p.pdf}` : 'pdf pending';
    return `${p.title} — ${p.venue} (${p.status}) [${pdfPart}] [key: ${p.key}]`;
  });
}

function formatPublicationDetail(key) {
  const pub = PUBLICATIONS.find(p => p.key === key.toLowerCase());
  if (!pub) return `No publication found for key '${key}'. Try 'publications' to see keys.`;
  const link = pub.pdf ? `Link: ${pub.pdf}` : 'Link: pending';
  const note = pub.note ? `Note: ${pub.note}` : '';
  return `${pub.title}\n${pub.venue} — ${pub.status}\n${link}${note ? `\n${note}` : ''}`;
}

function appendContactLines(outputEl) {
  appendLine(outputEl, `Email: ${CONTACT.email}`);
  appendLine(outputEl, `Location: ${CONTACT.location}`);
  appendLine(outputEl, `LinkedIn: linkedin.com/in/heyanok`);
  appendLine(outputEl, 'Google Scholar: scholar.google.com/citations?user=JjMvRJMAAAAJ');
}

function startGame(outputEl) {
  gameActive = true;
  gameNumber = Math.floor(Math.random() * 20) + 1;
  gameAttempts = 0;
  appendLine(outputEl, 'Guess a number between 1 and 20. Type quit to exit.');
}

function handleGameGuess(outputEl, input) {
  const guess = Number(input);
  if (Number.isNaN(guess)) {
    appendLine(outputEl, 'Enter a number between 1 and 20, or type quit to exit.');
    return;
  }
  gameAttempts += 1;
  if (guess === gameNumber) {
    appendLine(outputEl, `Correct! You guessed it in ${gameAttempts} tries.`);
    gameActive = false;
    gameNumber = null;
    gameAttempts = 0;
  } else if (guess < gameNumber) {
    appendLine(outputEl, 'Too low.');
  } else {
    appendLine(outputEl, 'Too high.');
  }
}

function initTerminal() {
  const outputEl = document.getElementById('terminal-output');
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  if (!outputEl || !form || !input) return;

  const helpText = [
    "help                show available commands",
    "about               brief bio",
    "contact             email, location, LinkedIn, Scholar",
    "cat contact.txt     print contact info",
    "email               print email",
    "linkedin            print LinkedIn profile",
    "scholar             print Google Scholar",
    "location            print location",
    "publications        list all publications (keys)",
    "pub <key>           details for a publication",
    "courses             list courses assisted",
    "cv                  link to CV",
    "game                play a number guess (1-20)",
    "quit                exit game mode",
    "theme <light|dark>  switch terminal/page theme",
    "clear               clear the terminal"
  ];

  function runCommand(raw) {
    const cmd = raw.trim();
    if (!cmd) {
      appendLine(outputEl, "Welcome to my page! Type 'help' to explore this cute terminal.");
      return;
    }
    appendLine(outputEl, `$ ${cmd}`, 'user');

    const [base, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(' ');

    if (gameActive && base.toLowerCase() !== 'quit') {
      handleGameGuess(outputEl, cmd);
      return;
    }

    switch (base.toLowerCase()) {
      case 'help':
        helpText.forEach(line => appendLine(outputEl, line));
        break;
      case 'theme':
        if (arg.toLowerCase() === 'dark') {
          document.body.classList.add('theme-dark');
          appendLine(outputEl, 'Theme set to dark.');
        } else if (arg.toLowerCase() === 'light') {
          document.body.classList.remove('theme-dark');
          appendLine(outputEl, 'Theme set to light.');
        } else {
          appendLine(outputEl, "Usage: theme <light|dark>");
        }
        break;
      case 'about':
        appendLine(outputEl, 'Yan He — PhD candidate focusing on cybersecurity, cyber-physical systems, and computer vision.');
        break;
      case 'contact':
        appendContactLines(outputEl);
        break;
      case 'cat':
        if (arg.toLowerCase() === 'contact.txt') {
          appendContactLines(outputEl);
        } else {
          appendLine(outputEl, "Usage: cat contact.txt");
        }
        break;
      case 'email':
        appendLine(outputEl, CONTACT.email);
        break;
      case 'linkedin':
        appendLine(outputEl, CONTACT.linkedin);
        break;
      case 'scholar':
        appendLine(outputEl, CONTACT.scholar);
        break;
      case 'location':
        appendLine(outputEl, CONTACT.location);
        break;
      case 'publications':
        publicationLines().forEach(line => appendLine(outputEl, line));
        break;
      case 'pub':
        if (!arg) {
          appendLine(outputEl, "Usage: pub <key>. Run 'publications' to see keys.");
        } else {
          const pub = PUBLICATIONS.find(p => p.key === arg.toLowerCase());
          if (!pub) {
            appendLine(outputEl, `No publication found for key '${arg}'. Try 'publications' to see keys.`);
          } else {
            appendLine(outputEl, formatPublicationDetail(arg));
            if (pub.pdf) {
              appendLine(outputEl, `Opening ${pub.pdf}`);
              window.open(pub.pdf, '_blank');
            }
          }
        }
        break;
      case 'courses':
        COURSES.forEach(c => appendLine(outputEl, c));
        break;
      case 'cv':
        appendLine(outputEl, 'Opening CV: cv.pdf');
        window.location.href = 'cv.pdf';
        break;
      case 'game':
        startGame(outputEl);
        break;
      case 'quit':
        if (gameActive) {
          appendLine(outputEl, 'Exited game.');
          gameActive = false;
          gameNumber = null;
          gameAttempts = 0;
        } else {
          appendLine(outputEl, 'No active game to quit.');
        }
        break;
      case 'clear':
        outputEl.innerHTML = '';
        break;
      default:
        appendLine(outputEl, `Command not found: ${base}. Try 'help'.`);
    }
  }

  appendLine(outputEl, "Welcome to my page! Type 'help' to explore this cute terminal.");

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.slice(0, 120);
    runCommand(value);
    input.value = '';
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initHeroType() {
  const el = document.getElementById('hero-type');
  typewriterEffect(el, '');
}

window.addEventListener('DOMContentLoaded', () => {
  initHeroType();
  initTerminal();
  initSmoothAnchors();
  initReveal();
});

function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}
