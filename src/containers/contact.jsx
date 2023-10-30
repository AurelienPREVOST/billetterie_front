import React, { useState } from 'react';
import { sendMail } from "../api/user"

function contact() {
  const [subject, setSubject] = useState('Besoin d\'assistance pour acheter une ou des places');
  const [myContact, setMyContact] = useState('')
  const [message, setMessage] = useState('');
  const [mailSent, setMailSent] = useState(false);
  const maxMessageLength = 3500;

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  }

  const handleMessageChange = (e) => {
    // Supprime les balises "<" ou ">"(securité light)
    const newMessage = e.target.value.replace(/[<>]/g, '');
    setMessage(newMessage);
  }

  const characterCount = message.length;
  const remainingCharacters = maxMessageLength - characterCount;

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMail(subject, myContact, message )
    setMailSent(true)

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
          <label htmlFor="email">Mon adresse email :</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="monmail@gmail.com"
            onChange={(e) => {
              setMyContact(e.currentTarget.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            maxLength={3500}
            rows="6"
            required
          />
          <div className="character-count">
            Caractères restants : {remainingCharacters} / 3500
          </div>
        </div>
        <button type="submit">Envoyer</button>
        {mailSent ? <p>Votre mail à bien été transmis vous pouvez continuer votre navigation</p> : null}
      </form>
    </div>
  );
}

export default contact;
