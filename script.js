const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const copyEmail = document.getElementById("copyEmail");
const toast = document.getElementById("toast");

const sections = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener(
  "scroll",
  () => {
    const scrollPosition = window.scrollY + 120;

    let currentId = sections[0]?.id;

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        currentId = section.id;
      }
    });

    navAnchors.forEach((anchor) => {
      anchor.classList.toggle(
        "active",
        anchor.getAttribute("href") === `#${currentId}`
      );
    });
  },
  { passive: true }
);

copyEmail.addEventListener("click", async () => {
  const email = "parthdudhe08@gmail.com";

  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = "Email copied";
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 1600);
  } catch {
    toast.textContent = email;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2200);
  }
});

// Prevent placeholder project links from jumping to the top.
document.querySelectorAll(".disabled-link").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

