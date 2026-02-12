const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el, index) => {
  el.style.transitionDelay = `${index * 40}ms`;
  revealObserver.observe(el);
});

const navLinks = document.querySelectorAll(".nav-links a");
const navContainer = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const current = window.location.pathname.replace("/", "") || "index.html";

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (href === current || (current.includes("resources") && href.includes("resources"))) {
    link.classList.add("active");
  }
});

if (menuToggle && navContainer) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navContainer.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

const openButtons = document.querySelectorAll("[data-modal-open]");
const closeButtons = document.querySelectorAll("[data-modal-close]");
const modals = document.querySelectorAll(".modal");

const openModal = (modal) => {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.classList.add("confetti-burst");
  setTimeout(() => modal.classList.remove("confetti-burst"), 900);
};

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-modal-open");
    const modal = document.querySelector(`[data-modal='${target}']`);
    openModal(modal);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    if (modal) {
      modal.classList.remove("is-open");
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("is-open");
    }
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => modal.classList.remove("is-open"));
  }
});

window.addEventListener("load", () => {
  const firstModal = document.querySelector(".modal[data-modal='textbook']");
  openModal(firstModal);
});

const testimonialText = document.getElementById("testimonial-text");
const testimonialAuthor = document.getElementById("testimonial-author");
const testimonialDots = document.querySelectorAll(".dot");

const testimonials = [
  {
    text: "Thank you so much for teaching the coding class. I had so much fun and learned a lot!",
    author: "– Code For ME Student",
  },
  {
    text: "Before this week I was only able to do scratch. I am excited to use python in real world scenarios",
    author: "– Code For ME Student",
  },
  {
    text: "Thank you so much for putting on this program.",
    author: "– Parent of a 6th grader",
  },
  {
    text: "print(\"Harper is amazing\")",
    author: "– Code For ME Student",
  },
];

let currentTestimonial = 1;

const showTestimonial = (index) => {
  if (!testimonialText || !testimonialAuthor) return;
  currentTestimonial = index;
  testimonialText.style.opacity = 0;
  testimonialAuthor.style.opacity = 0;

  setTimeout(() => {
    testimonialText.textContent = testimonials[index].text;
    testimonialAuthor.textContent = testimonials[index].author;
    testimonialText.style.opacity = 1;
    testimonialAuthor.style.opacity = 1;

    testimonialDots.forEach((dot) => dot.classList.remove("active"));
    if (testimonialDots[index]) testimonialDots[index].classList.add("active");
  }, 200);
};

testimonialDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.testimonial);
    if (!Number.isNaN(index)) {
      showTestimonial(index);
    }
  });
});

if (testimonialText) {
  setInterval(() => {
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
  }, 5000);
}
