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

  // Obtenir les dimensions de la fenêtre
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Obtenir les dimensions du bouton
  const buttonRect = button.getBoundingClientRect();
  const buttonWidth = buttonRect.width;
  const buttonHeight = buttonRect.height;

  // Calculer les limites pour que le bouton reste entièrement visible
  const maxX = windowWidth - buttonWidth - 20; // 20px de marge
  const maxY = windowHeight - buttonHeight - 20; // 20px de marge

  // Générer des positions aléatoires dans les limites de l'écran
  const randomX = Math.max(20, Math.random() * maxX); // Minimum 20px du bord
  const randomY = Math.max(20, Math.random() * maxY); // Minimum 20px du bord

  // Changer le positionnement en fixed et appliquer les nouvelles coordonnées
  button.style.position = "fixed";
  button.style.transition = "all 0.3s ease-out";
  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;
  button.style.transform = "none"; // Réinitialiser transform

  // Réinitialiser la transition après l'animation
  setTimeout(() => {
    button.style.transition = "";
  }, 300);
}

function resetButtonPosition() {
  const button = document.querySelector(".whatsapp-btn");

  // Revenir à la position d'origine (retirer le positionnement fixed)
  button.style.transition = "all 0.3s ease-out";
  button.style.position = "";
  button.style.left = "";
  button.style.top = "";
  button.style.transform = "";

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
