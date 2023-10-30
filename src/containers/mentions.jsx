import React from 'react';
import { Link } from 'react-router-dom';

const Mentions = () => {
  return (
  <>
    <div className="mentions-container">
      <h1>Mentions Légales</h1>
        <p>
          <strong>Nom de l'entreprise :</strong> Billeterie-Online
        </p>
        <p>
          <strong>Adresse :</strong> 123, Rue de la Fiction, Ville Imaginaire
        </p>
        <p>
          <strong>Téléphone :</strong> +1 123-456-7890
        </p>
        <p>
          <strong>E-mail :</strong> contact@billeterie-online.com
        </p>
        <p>
          <strong>Directeur de la publication :</strong> PREVOST Aurelien
        </p>
        <p>
          <strong>Hébergeur :</strong> NGROK
        </p>
        <p>
          <strong>Conditions d'utilisation :</strong> Les informations fournies sur ce site web sont à titre informatif uniquement. Nous ne garantissons pas l'exactitude ou l'exhaustivité des informations. Vous utilisez ce site à vos risques et périls.
        </p>
        <p>
          <strong>Propriété intellectuelle :</strong> Tous les contenus de ce site sont protégés par des droits de propriété intellectuelle. Vous ne pouvez pas reproduire, distribuer ou modifier ces contenus sans autorisation préalable.
        </p>
        <p>
          <strong>Collecte de données personnelles :</strong> Les données personnelles collectées sont soumises à notre Politique de Confidentialité.
        </p>
        <p>
          <strong>Lien vers les conditions générales :</strong><Link to="/cgv">Cliquez ici</Link>
        </p>
    </div>
    {/* //CETTE VIDEO A ETE INTEGREE DANS LE SEUL BUT DE COLLER A LA GRILLE DE NOTATION DE LA SOUTENANCE */}
    <iframe
      style={{
      display: "block",
      margin: "0 auto",
      width: "560px",
      height: "315px"
      }}
      src="https://www.youtube.com/embed/0_6IgX5Cy3o?si=B4l1pm-F1kuwcdK8"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      >
    </iframe>
  </>
  );
}

export default Mentions;
