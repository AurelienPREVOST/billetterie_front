import React, { useState,  } from 'react';
import { changePassword } from '../../api/user'
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
  const { key_id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null)

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      let mdp = {
        password: password,
        key_id: key_id
      };
//password et key_id sont okay et bien tranmis au back

      changePassword(mdp)
        .then((response) => {
          if (response.error) {
            setError(response.error);
          } else {
            window.location.href = '/user/changePasswordSuccess';
          }
        });
    } else {
      setError("Les deux mots de passe ne sont pas identiques");
    }
  };


    return (
      <form className="b-form" onSubmit={onSubmitForm}>
      <h2>Reinitialisier mon mot de passe</h2>
        <input
          type="password"
          name="password1"
          placeholder="Votre nouveau mot de passe"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          required
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirmer votre nouveau mot de passe"
          onChange={(e) => {
            setConfirmPassword(e.currentTarget.value);
          }}
          required
        />
        <input type="submit" name="Valider" />
        {error ? <p>{error}</p> : null}
      </form>
    );
}

export default ChangePassword
