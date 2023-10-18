import React, { useState } from 'react';

function contact() {
  const [subject, setSubject] = useState('Besoin d\'assistance pour acheter une ou des places');
  const [message, setMessage] = useState('');
  const maxMessageLength = 3500;

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  }

  const handleMessageChange = (e) => {
    // Supprime les balises "<" ou ">"
    const newMessage = e.target.value.replace(/[<>]/g, '');
    setMessage(newMessage);
  }

  const characterCount = message.length;
  const remainingCharacters = maxMessageLength - characterCount;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez traiter les données du formulaire ici
    console.log('Sujet :', subject);
    console.log('Message :', message);
  }

  return (
    <div id="contact-form" className="">
      <h1>Contactez-nous</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Sujet :</label>
          <select
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
          >
            <option value="Besoin d'assistance pour acheter une ou des places">
              Besoin d'assistance pour acheter une ou des places
            </option>
            <option value="Signaler un bug ou une erreur sur le site">
              Signaler un bug ou une erreur sur le site
            </option>
            <option value="Annuler une commande">Annuler une commande</option>
            <option value="Autres...">Autres...</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            maxLength={3500}
            rows="6"
          />
          <div className="character-count">
            Caractères restants : {remainingCharacters} / 3500
          </div>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default contact;
