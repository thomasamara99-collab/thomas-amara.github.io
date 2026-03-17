const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealElements = document.querySelectorAll("[data-reveal]");

if (prefersReducedMotion) {
  revealElements.forEach((el) => el.classList.add("is-revealed"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-reveal-delay");
          if (delay) {
            entry.target.style.transitionDelay = `${delay}ms`;
          }
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

const spotlightCards = document.querySelectorAll(".spotlight");

spotlightCards.forEach((card) => {
  const updateSpotlight = (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  card.addEventListener("mousemove", updateSpotlight);
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--x", "50%");
    card.style.setProperty("--y", "50%");
  });
});
