import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Pouce from '../../assets/pouceUp.svg';

const AccountValidate = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      setRedirect(true);
    }, 5000);
    return () => clearTimeout(redirectTimeout); // Clear timeout lors du démontage du composant (problème de fuite mémoire)
  }, []);

  if (redirect) {
    return <Navigate to="/login" />
  }

  return (
    <div id="successEvent">
      <h2>Félicitation!</h2>
      <p>Votre compte a été créé avec succès. Vous serez automatiquement redirigé vers la page de connexion dans quelques secondes</p>
      <p>Si la redirection échoue, cliquez </p>
      <Link to="/login">ICI</Link>
      <img src={Pouce} alt="pouce en l'air" />
    </div>
  );
}

export default AccountValidate;
