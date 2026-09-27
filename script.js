const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const publications = Array.from(document.querySelectorAll(".publication-card"));
const publicationCount = document.querySelector("#publication-count");

function setPublicationFilter(filter) {
  let shown = 0;

  publications.forEach((publication) => {
    const tags = publication.dataset.tags.split(" ");
    const visible = filter === "all" || tags.includes(filter);
    publication.hidden = !visible;
    if (visible) {
      shown += 1;
    }
  });

  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (publicationCount) {
    publicationCount.textContent = String(shown);
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPublicationFilter(button.dataset.filter);
  });
});

const revealItems = Array.from(document.querySelectorAll(".reveal"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
