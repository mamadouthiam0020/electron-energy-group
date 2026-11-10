/* ==========================================================================
   Electron Energy Group — interactions du site
   - En-tête collant
   - Menu mobile accessible
   - Apparitions au défilement (respect de prefers-reduced-motion)
   - Formulaire de contact (validation native + envoi configurable)
   ========================================================================== */
(() => {
  'use strict';

  const doc = document;

  /* --------------------------- Année du pied de page --------------------------- */
  const annee = doc.getElementById('annee');
  if (annee) {
    annee.textContent = String(new Date().getFullYear());
  }

  /* --------------------------- En-tête collant --------------------------- */
  const entete = doc.getElementById('entete');
  if (entete) {
    const majEntete = () => {
      entete.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    majEntete();
    window.addEventListener('scroll', majEntete, { passive: true });
  }

  /* --------------------------- Menu mobile --------------------------- */
  const boutonMenu = doc.querySelector('.nav-toggle');
  const navigation = doc.getElementById('nav-principal');

  if (boutonMenu && navigation) {
    const estOuvert = () => doc.body.classList.contains('nav-open');

    const definirEtat = (ouvert) => {
      doc.body.classList.toggle('nav-open', ouvert);
      boutonMenu.setAttribute('aria-expanded', String(ouvert));
      boutonMenu.setAttribute(
        'aria-label',
        ouvert ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'
      );
    };

    boutonMenu.addEventListener('click', () => definirEtat(!estOuvert()));

    doc.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && estOuvert()) {
        definirEtat(false);
        boutonMenu.focus();
      }
    });

    navigation.querySelectorAll('a').forEach((lien) => {
      lien.addEventListener('click', () => {
        if (estOuvert()) definirEtat(false);
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1020 && estOuvert()) definirEtat(false);
    });
  }

  /* --------------------------- Apparitions au défilement --------------------------- */
  const elementsReveal = doc.querySelectorAll('.reveal');
  const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (elementsReveal.length) {
    if ('IntersectionObserver' in window && !mouvementReduit) {
      const observateur = new IntersectionObserver(
        (entrees) => {
          entrees.forEach((entree) => {
            if (entree.isIntersecting) {
              entree.target.classList.add('is-visible');
              observateur.unobserve(entree.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );
      elementsReveal.forEach((element) => observateur.observe(element));
    } else {
      elementsReveal.forEach((element) => element.classList.add('is-visible'));
    }
  }

  /* --------------------------- Formulaire de contact ---------------------------
     Pour activer l'envoi : renseigner data-endpoint sur <form> (service type
     Formspree, Netlify Forms, API interne…). Tant qu'il est vide, le site
     affiche un message d'attente sans prétendre avoir envoyé quoi que ce soit.
     ------------------------------------------------------------------------- */
  const formulaire = doc.getElementById('formulaire-contact');

  if (formulaire) {
    const statut = doc.getElementById('statut-formulaire');
    const pointEntree = (formulaire.getAttribute('data-endpoint') || '').trim();

    const afficherStatut = (message, type) => {
      if (!statut) return;
      statut.textContent = message;
      statut.className = 'form-status is-visible is-' + type;
    };

    formulaire.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!formulaire.checkValidity()) {
        formulaire.reportValidity();
        return;
      }

      const bouton = formulaire.querySelector('button[type="submit"]');

      if (!pointEntree) {
        afficherStatut(
          'Merci. Votre demande est prête : la transmission par e-mail sera activée dès la publication des coordonnées officielles d’Electron Energy Group.',
          'info'
        );
        formulaire.reset();
        return;
      }

      if (bouton) {
        bouton.disabled = true;
        bouton.dataset.libelle = bouton.textContent;
        bouton.textContent = 'Envoi en cours…';
      }

      try {
        const reponse = await fetch(pointEntree, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(formulaire)
        });

        if (!reponse.ok) throw new Error('Envoi refusé');

        afficherStatut(
          'Merci ! Votre demande a bien été envoyée. Nous revenons vers vous dans les meilleurs délais.',
          'success'
        );
        formulaire.reset();
      } catch (erreur) {
        afficherStatut(
          'Une erreur est survenue pendant l’envoi. Merci de réessayer ou d’utiliser les coordonnées qui seront publiées prochainement.',
          'error'
        );
      } finally {
        if (bouton) {
          bouton.disabled = false;
          if (bouton.dataset.libelle) bouton.textContent = bouton.dataset.libelle;
        }
      }
    });
  }
})();
