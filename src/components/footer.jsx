import React, { useState } from 'react';
import charityReinsurrance from "../assets/charityReinsurrance.svg";
import safeTransaction from "../assets/safeTransaction.svg";
import refundSecure from "../assets/refundSecure.svg";
import noDataStolen from "../assets/noDataStolen.svg";
import { addToNewsletter } from "../api/newsletter/";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

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

  return (
    <>
      <div className="reinsurrance">
        <figure>
          <img src={refundSecure} alt="remboursement possible" />
          <figcaption>Remboursement possible</figcaption>
        </figure>
        <figure>
          <img src={noDataStolen} alt="aucun stockage de données tierce" />
          <figcaption>confidentialité préservées</figcaption>
        </figure>
        <figure>
          <img src={safeTransaction} alt="Paiement sécurisé" />
          <figcaption>Paiement sécurisé</figcaption>
        </figure>
        <figure>
          <img src={charityReinsurrance} alt="5% reversé*" />
          <figcaption>5% reversé*</figcaption>
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
          />
          <input type="submit" value="Valider" />
          {statusMessage && <p>{statusMessage}</p>}
        </form>
        <a href="/contact">Contact</a>
        <a href="/faq">FAQ</a>
        <a href="/cgv">Conditions générales de ventes</a>
        <a href="/mentions">Mention Légal</a>
      </footer>
    </>
  );
};

export default Footer;


// import charityReinsurrance from "../assets/charityReinsurrance.svg"
// import safeTransaction from "../assets/safeTransaction.svg"
// import refundSecure from "../assets/refundSecure.svg"
// import noDataStolen from "../assets/noDataStolen.svg"
// import {addToNewsletter} from "../api/newsletter/"


// const footer = () => {

//   return (
//     <>
//     <div className="reinsurrance">
//         <figure>
//           <img src={refundSecure} alt="remboursement possible" />
//           <figcaption>Remboursement possible</figcaption>
//         </figure>
//         <figure>
//           <img src={noDataStolen} alt="aucun stockage de données tierce" />
//           <figcaption>confidentialité préservées</figcaption>
//         </figure>
//         <figure>
//           <img src={safeTransaction} alt="Paiement securisé" />
//           <figcaption>Paiement securisé</figcaption>
//         </figure>
//         <figure>
//           <img src={charityReinsurrance} alt="5% reversé*" />
//           <figcaption>5% reversé*</figcaption>
//         </figure>
//       </div>
//     <footer>
//       <form onSubmit={addToNewsletter(data)}>
//         <label htmlFor="newsletter">Inscription à la newsletter</label>
//         <input type="text" name="newsletter" id="newsletter" placeholder="Votre email" />
//         <input type="submit" value="Valider" />
//       </form>
//       <a href="/contact">Contact</a>
//       <a href="/faq">FAQ</a>
//       <a href="/cgv">Conditions générales de ventes</a>
//       <a href="/mentions">Mention Légal</a>
//     </footer>
//     </>
//   )
// }

// export default footer
