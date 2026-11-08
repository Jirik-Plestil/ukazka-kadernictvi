
document.addEventListener("DOMContentLoaded", () => {
  // Mobilní menu
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });

  // Animace při scrollování
  const elements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element => element.classList.add("visible"));
  }

  // Datum rezervace nesmí být v minulosti
  const dateInput = document.getElementById("date");

  function updateMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${year}-${month}-${day}`;
  }

  updateMinDate();

  // Ukázková rezervace bez odesílání osobních údajů
  const form = document.getElementById("bookingForm");
  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", event => {
    event.preventDefault();
    updateMinDate();

    if (!form.reportValidity()) return;

    if (dateInput.value < dateInput.min) {
      formMessage.textContent = "Vyberte prosím dnešní nebo pozdější datum.";
      return;
    }

    formMessage.textContent =
      "Toto je ukázka webu. Formulář funguje pouze jako demonstrace a žádná rezervace nebyla odeslána.";
    form.reset();
  });

  // Aktuální rok
  document.getElementById("year").textContent =
    new Date().getFullYear();
});
