import { useState, useEffect} from 'react'
import { Link, Navigate } from 'react-router-dom';
import Pouce from '../../assets/pouceUp.svg'

const Success = () => {

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      setRedirect(true);
    }, 5000);
    return () => clearTimeout(redirectTimeout)
  }, []);

  if (redirect) {
    return <Navigate to="/login" />
  }

  return (
    <div id="successEvent">
      <h2>Mot de passe modifié avec succès!</h2>
      <p>Vous serez redirigez vers la page de connexion après quelques seconde ou en cliquant</p>
      <Link to="/login">ICI</Link>
      <img src={Pouce} alt="pouce en l'air"/>
    </div>
  );
}

export default Success;
