import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Pouce from '../../assets/pouceUp.svg';

const PasswordLostCheckMail = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      setRedirect(true);
    }, 5000);
    return () => clearTimeout(redirectTimeout); // Clear timeout lors du démontage du composant (bug fuite mémoire)
  }, []);

  if (redirect) {
    return <Navigate to="/login" />; // Retournez Navigate pour déclencher la redirection
  }

  return (
    <div id="successEvent">
      <h2>Reinitialisation en attente de votre validation</h2>
      <p>Un e-mail vient de vous être adréssé. Cliquez sur le lien dans le mail pour valider votre nouveau mot de passe</p>
      <p>Vous allez être redirigez sur la page de connexion.</p>
      <p>Si la redirection échoue, cliquez </p>
      <Link to="/login">ICI</Link>
      <img src={Pouce} alt="pouce en l'air" />
    </div>
  );
}

export default PasswordLostCheckMail;
