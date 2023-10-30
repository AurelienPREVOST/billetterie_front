import React, { useState, useEffect } from 'react';
import charityReinsurrance from "../assets/charityReinsurrance.svg";
import safeTransaction from "../assets/safeTransaction.svg";
import refundSecure from "../assets/refundSecure.svg";
import noDataStolen from "../assets/noDataStolen.svg";
import { addToNewsletter } from "../api/newsletter/";
import loupeIncrease from "../assets/loupeIncrease.svg"
import loupeDecrease from "../assets/loupeDecrease.svg"


const Footer = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  function increaseFontSize() {
    const elements = document.querySelectorAll('*');
    elements.forEach((element) => {
      const currentFontSize = window.getComputedStyle(element).getPropertyValue('font-size');
      const currentSize = parseFloat(currentFontSize);
      const newSize = currentSize * 1.05;
      element.style.fontSize = newSize + 'px';
    });
  }

  function decreaseFontSize() {
    const elements = document.querySelectorAll('*');
    elements.forEach((element) => {
      const currentFontSize = window.getComputedStyle(element).getPropertyValue('font-size');
      const currentSize = parseFloat(currentFontSize);
      const newSize = currentSize / 1.05;
      element.style.fontSize = newSize + 'px';
    });
  }

  const handleSubmit = async (e) => {
    setStatusMessage("Enregistrement en cours...")
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const requestData = {
      email: email,
    }
    if (!emailRegex.test(requestData.email)) {
      setTimeout(function() {
        setStatusMessage("Veuillez saisir un email valide")
      }, 2500)
      return
    }
    addToNewsletter(requestData)
      .then((res) => {
        setEmail('');
        setTimeout(function() {
          setStatusMessage(res.msg)
        }, 2500)
      })
      .catch((err) => {
        setTimeout(function() {
          setStatusMessage('Erreur lors de l\'enregistrement de l\'e-mail.')
        }, 2500)
      });
  };

  const toggleDisplayAccessibility = () => {
    const access = document.querySelector("#hiddenOrShowAccessibility")
    access.classList.toggle("displayAccess")
    access.classList.toggle("hiddenAccess")
  }

  useEffect(() => {
    const increaseButton = document.getElementById('increase-font-size');
    const decreaseButton = document.getElementById('decrease-font-size');

    if (increaseButton) {
      increaseButton.addEventListener('click', increaseFontSize);
      decreaseButton.addEventListener('click', decreaseFontSize);

      return () => {
        increaseButton.removeEventListener('click', increaseFontSize);
        decreaseButton.addEventListener('click', decreaseFontSize);

      };
    }
  }, []);


  return (
    <>
      <div
        id="hiddenOrShowAccessibility"
        className="hiddenAccess"
        onClick={toggleDisplayAccessibility}
      >
        <h2 id="accessibilityTitle" aria-label="Accessibilité de l'interface">
          Accessibilité de l'interface
        </h2>
        <div id="accessibilityArea">
          <button
            id="increase-font-size"
            aria-label="Augmenter la taille de la police"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={loupeIncrease} alt="Bouton d'augmentation de la taille de la police" aria-label="augmenter la taille de la police"/>
          </button>
          <button
            id="decrease-font-size"
            aria-label="Réduire la taille de la police"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={loupeDecrease} alt="Bouton de réduction de la taille de la police" aria-label="reduire la taille de la police" />
          </button>
          <img src={loupeIncrease} id="iconAccessDeploy" alt="click_for_help" aria-label="deploiement au click pour ameliorer la visibilité"/>
        </div>
      </div>

      <div className="reinsurrance">
        <figure>
          <img src={refundSecure} alt="logo representatnt un process de remboursement" />
          <figcaption aria-label="Possibilité de remboursement sous conditions">Remboursement possible</figcaption>
        </figure>
        <figure>
          <img src={noDataStolen} alt="logo aucun stockage de données tierce" />
          <figcaption aria-label="Confidentialité préservée lors de votre navigation en limitant les données colléctés au strict minimum">Confidentialité préservée</figcaption>
        </figure>
        <figure>
          <img src={safeTransaction} alt="logo représentant une transaction séurisée" />
          <figcaption aria-label="Paiement sécurisé par un intermediaire de paiement certifié">Paiement sécurisé</figcaption>
        </figure>
        <figure>
          <img src={charityReinsurrance} alt="logo représentant la charité" />
          <figcaption aria-label="5 pourcent reversé aux œuvres de charité">5% reversé*</figcaption>
        </figure>
      </div>
      <footer>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newsletter">Inscription à la newsletter</label>
          <input
            type="email"
            name="newsletter"
            id="newsletter"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Adresse e-mail pour l'inscription à la newsletter"
          />
          <input type="submit" value="Valider" aria-label="Valider l'inscription à la newsletter" />
          {statusMessage && <p>{statusMessage}</p>}
        </form>
        <a href="/contact" aria-label="Lien vers la page de contact">Contact</a>
        <a href="/faq" aria-label="Lien vers la page FAQ">FAQ</a>
        <a href="/cgv" aria-label="Lien vers les Conditions générales de ventes">Conditions générales de ventes</a>
        <a href="/mentions" aria-label="Lien vers la page Mentions légales">Mentions légales</a>
      </footer>
    </>
  );
};

export default Footer;
