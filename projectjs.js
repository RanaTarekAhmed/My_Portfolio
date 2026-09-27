document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTypingEffect();
  initPortfolioFilter();
  initResumeTabs();
  initContactForm();
  initThemeToggle();
  initScrollAnimations();
  initBackToTop();
});

function initNavigation() {
  const header = document.querySelector(".header");
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".nav_cont");
  const sidebar = document.querySelector(".mobile-sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  const close = document.querySelector(".close-sidebar");

  const closeMenu = () => {
    hamburger?.classList.remove("active");
    nav?.classList.remove("active");
    sidebar?.classList.remove("active");
    overlay?.classList.remove("active");
    document.body.classList.remove("no-scroll");
  };

  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 30);
  });

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav?.classList.toggle("active");
    sidebar?.classList.toggle("active");
    overlay?.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  close?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      closeMenu();
      const offset = (header?.offsetHeight || 0) + 12;
      window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
    });
  });
}

function initTypingEffect() {
  const element = document.querySelector(".typing-text");
  if (!element) return;

  const roles = [
    "Full-Stack .NET Developer",
    "Backend Developer",
    "C# & ASP.NET Core Developer",
    "Problem Solver"
  ];

  let role = 0, index = 0, deleting = false;

  const type = () => {
    const current = roles[role];
    element.textContent = current.slice(0, deleting ? index - 1 : index + 1);
    index += deleting ? -1 : 1;

    let delay = deleting ? 45 : 85;
    if (!deleting && index === current.length) {
      deleting = true;
      delay = 1500;
    } else if (deleting && index === 0) {
      deleting = false;
      role = (role + 1) % roles.length;
      delay = 350;
    }
    setTimeout(type, delay);
  };

  setTimeout(type, 700);
}

function initResumeTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  if (!buttons.length || !contents.length) return;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tab;

      buttons.forEach(btn => btn.classList.remove("active"));
      contents.forEach(content => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(targetId)?.classList.add("active");
    });
  });
}

function initPortfolioFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".portfolio-item");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      cards.forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("formStatus");

    if (!name || !email || !message) {
      showStatus(status, "Please complete all fields.", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus(status, "Please enter a valid email address.", "error");
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
    window.location.href = `mailto:r.tarekahmed@gmail.com?subject=${subject}&body=${body}`;
  });
}

function showStatus(element, message, type) {
  element.textContent = message;
  element.className = `form-status ${type}`;
}

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  const icon = toggle?.querySelector("i");
  if (!toggle || !icon) return;

  const saved = localStorage.getItem("theme") || "dark";
  document.documentElement.dataset.theme = saved;
  updateThemeIcon(saved, icon);

  toggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    updateThemeIcon(next, icon);
  });
}

function updateThemeIcon(theme, icon) {
  icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".service-card, .resume-item, .project-card, .skill-category, .about-card, .about-text");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("animate-in"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 600);
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
