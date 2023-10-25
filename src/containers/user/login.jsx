import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { connectUser } from "../../slices/userSlice";
import { checkIfValidateIsYes } from "../../api/user"

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [connexionTry, setConnexionTry] = useState(0);
  const [connexionBlocked, setConnexionBlocked] = useState(false);
  const [remainingDelay, setRemainingDelay] = useState(0);
  const [validateError, setValidateError] = useState(null)

  const onSubmitForm = (e) => {
    e.preventDefault();
    setError(null);

    if (connexionBlocked) {
      return
    }

    setConnexionTry((prevConnexionTry) => prevConnexionTry + 1);

    let datas = {
      email: email,
      password: password,
    };

    checkIfValidateIsYes(datas.email)
    .then((res) => {
      console.log("checkIfValidateIsYes res", res.result[0].validate)
      if (res.result[0].validate === 'no') {
        setValidateError("Vous n'avez pas valider votre adresse email. Consultez votre messagerie")
        return
      } else {
        setValidateError(null)
        loginUser(datas)
        .then((res) => {
          if (res.status === 200) {
            setConnexionTry(0);
            window.localStorage.setItem("tutorial-token", res.token);
            let newUser = res.user;
            newUser.token = res.token;
            dispatch(connectUser(newUser));
            setRedirect(true);
          } else {
            setError(res.msg);

            if (connexionTry >= 3) {
              setConnexionBlocked(true);
              const blockingDelay =
              connexionTry === 3
              ? 5000 // Délai de 5 secondes après 3 tentatives
              : connexionTry === 4
              ? 15000 // Délai de 15 secondes après 4 tentatives
              : connexionTry === 5
              ? 60000 // Délai de 1 minute après 5 tentatives
              : 1800000; // Délai de 30 minutes après 6 tentatives

              // Décompte du délai restant
              setRemainingDelay(blockingDelay);

              // Démarrer un compte à rebours
              const interval = setInterval(() => {
                setRemainingDelay((prevRemaining) => prevRemaining - 1000);
              }, 1000);

              // Effacer le compte à rebours après le délai de blocage
              setTimeout(() => {
                setConnexionBlocked(false);
                setRemainingDelay(0);
                clearInterval(interval);
              }, blockingDelay);
            }
          }
        })
        .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err)
      setValidateError("Aucun Email reconnu. Erreur lors du controle de validation mail")
    });


  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <section id="login">
      {error !== null && <p>{error}</p>}
      {connexionBlocked ? (
        <p style={{ color: 'red', textAlign: 'center', Margin: '3em' }}>Connexion bloquée. Attendez {remainingDelay / 1000} secondes.</p>
      ) : (
        <form className="b-form" onSubmit={onSubmitForm}>
        <h2>Se connecter</h2>
          <input
            type="email"
            placeholder="Votre mail"
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Votre mot de passe"
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            required
          />
          <input type="submit" name="Se connecter" />
          <Link to="/forgot" className="formLink">Mot de passe oublié?</Link>
          <Link to="/register" className="formLink">Pas encore de compte?</Link>
        </form>
      )}
      {validateError !== null && <p>{validateError}</p>}
    </section>
  );
};

export default Login;
