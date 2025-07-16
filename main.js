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
