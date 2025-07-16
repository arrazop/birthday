// Date cible : 25 juillet de l'année en cours, 20h00
const countdownDate = new Date(`2025-07-25T20:00:00`).getTime();
const el = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    el.innerHTML = `<span>🎂 C'est le jour J !</span>`;
    return;
  }

  const JOURS = Math.floor(distance / (1000 * 60 * 60 * 24));
  const HEURES = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const MINUTES = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const SECONDES = Math.floor((distance % (1000 * 60)) / 1000);

  el.innerHTML = `
      <span>${JOURS}j</span>
      <span>${HEURES}h</span>
      <span>${MINUTES}m</span>
      <span>${SECONDES}s</span>
    `;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Animation confettis fond blanc chic
const confettiColors = ["#f8f9fa", "#efefef", "#d8dee9", "#fff", "#cce3dc"];

function createConfettiPiece() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti-piece");
  confetti.style.background = `linear-gradient(135deg, ${
    confettiColors[Math.floor(Math.random() * confettiColors.length)]
  } 65%, #fff 100%)`;
  confetti.style.left = Math.random() * 98 + "vw";
  confetti.style.top = -15 + "px";
  confetti.style.opacity = 0.7 + Math.random() * 0.3;
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

  document.body.querySelector(".confetti").appendChild(confetti);

  const fallTime = 2200 + Math.random() * 2000;
  confetti.animate(
    [
      { transform: `translateY(0) rotate(${Math.random() * 360}deg)` },
      {
        transform: `translateY(${window.innerHeight + 40}px) rotate(${
          Math.random() * 720
        }deg)`,
      },
    ],
    { duration: fallTime, easing: "linear" }
  );

  setTimeout(() => confetti.remove(), fallTime);
}

// Création du conteneur confetti sur le body
if (!document.querySelector(".confetti")) {
  document.body.insertAdjacentHTML("beforeend", `<div class="confetti"></div>`);
}
// Lancer des confettis régulièrement
setInterval(createConfettiPiece, 180);

// Animation de fond au clic (optionnel)
document.querySelector(".container").addEventListener("click", function () {
  document.body.style.background = "#f0f4f8";
  setTimeout(() => (document.body.style.background = "#fff"), 700);
});

// Fonctionnalité de déplacement aléatoire du bouton WhatsApp
let clickCount = 0;
const maxClicks = 3;

function moveButtonRandomly() {
  const button = document.querySelector(".whatsapp-btn");
  const container = document.querySelector(".container");

  // Obtenir les dimensions du conteneur et du bouton
  const containerRect = container.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();

  // Calculer les limites pour le déplacement dans la zone du conteneur
  const maxX = containerRect.width - buttonRect.width;
  const maxY = containerRect.height - buttonRect.height;

  // Générer des positions aléatoires dans les limites du conteneur
  const randomX = Math.max(0, Math.random() * maxX);
  const randomY = Math.max(0, Math.random() * maxY);

  // Appliquer la transformation avec une transition fluide
  button.style.transition = "transform 0.3s ease-out";
  button.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // Réinitialiser la transition après l'animation
  setTimeout(() => {
    button.style.transition = "";
  }, 300);
}

function resetButtonPosition() {
  const button = document.querySelector(".whatsapp-btn");

  // Revenir à la position d'origine
  button.style.transition = "transform 0.3s ease-out";
  button.style.transform = "translate(0px, 0px)";

  // Réinitialiser la transition après l'animation
  setTimeout(() => {
    button.style.transition = "";
  }, 300);
}

// Gestionnaire d'événements pour le bouton WhatsApp
document.querySelector(".whatsapp-btn").addEventListener("click", function (e) {
  clickCount++;

  if (clickCount <= maxClicks) {
    // Empêcher la navigation vers WhatsApp lors des 3 premiers clics
    e.preventDefault();

    if (clickCount === 2) {
      // Au 2ème clic, revenir à la position d'origine
      resetButtonPosition();
    } else {
      // Aux clics 1 et 3, déplacer le bouton aléatoirement
      moveButtonRandomly();
    }

    // Afficher un message temporaire
    const originalText = this.textContent;
    this.textContent = `Cliquez encore ${maxClicks - clickCount} fois !`;

    setTimeout(() => {
      this.textContent = originalText;
    }, 1000);
  }
  // Après 3 clics, le lien fonctionne normalement
});
