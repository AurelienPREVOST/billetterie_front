import React from 'react';
import { Link } from 'react-router-dom';
import Pouce from '../assets/pouceUp.svg'

const Success = () => {
  return (
    <div id="successEvent">
      <h2>Commande réussie !</h2>
      <p>Votre commande a été passée avec succès.</p>
      <p>Merci d'avoir fait vos achats chez nous !</p>
      <p>Vous recevrez bientôt une confirmation par e-mail.</p>
      <p>N'hésitez pas à nous contacter si vous avez des questions.</p>
      <Link to="/">Retour à la page d'accueil</Link>
      <img src={Pouce} alt="pouce en l'air"/>
    </div>
  );
}

export default Success;
