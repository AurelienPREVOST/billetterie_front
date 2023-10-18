import React from 'react';

const FAQ = () => {
  const faqData = [
    {
      question: "Comment puis-je acheter des billets en ligne ?",
      answer: "Pour acheter des billets en ligne, suivez les étapes suivantes : 1/ choisissez un evenement - 2/ cliquez sur les sieges qui ne sont pas grisé (signifiant que la place est disponible à la vente) - 3/ une fois l'ensemble des places selectionné cliquez sur le bouton 'ajouter au panier' - 4/ une fenêtre va s'ouvrir pour vous inviter à vous rediriger vers votre panier en cours, egalement accessible dans la barre de navigation du menu en haut de votre ecran (3eme icone) - 4/ après en avoir pris connaissance en cliquant sur le lien des conditions generales, verifier votre commande et cocher la case d'acception des CGV - 5/ cliquez sur le bouton flottant en bas de votre ecran pour être redirigé vers l'etape de paiement - 6/ finaliser votre paiement dans nos terminal de paiement securisé par notre partenaire 'stripe'",
    },
    {
      question: "Quelles méthodes de paiement acceptez-vous ?",
      answer: "Nous acceptons les paiements par carte de crédit uniquement et dans la devise du site (€uro). Les delai bancaire pour un virement etant trop important pour vous garantir la disponibilité de votre/vos place(s).",
    },
    {
      question: "Comment puis-je annuler une réservation ?",
      answer: "Pour annuler une réservation, contactez nous via notre formulaire en pied de page dans la rubrique 'contact'.",
    },
  ];

  return (
    <>
      <div className="faq-container">
      <h1>Foire aux Questions (FAQ)</h1>
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default FAQ;
