import { useState, useEffect  } from "react";
import { Navigate } from "react-router-dom";
import { addOneUser } from "../../api/user";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("Mot de passe - Faible");


  useEffect(()=> {
    setError(null)
    if(password !== "" && confirmPassword !== "" && password !== confirmPassword) {
      setError("les mots de passes ne sont pas identiques")
    }
    updatePasswordStrength(password);
  }, [password, confirmPassword])

  const updatePasswordStrength = (password) => {
    const regexDigits = /^\d+$/;
    const regexLetters = /^[a-zA-Z]+$/;

    if (password.length < 5 || regexDigits.test(password) || regexLetters.test(password)) {
      setPasswordStrength("faible");
    } else if (password.length >= 7 && /[0-9]/.test(password) && /[a-zA-Z]/.test(password) && /[!@#$%^&*]/.test(password)) {
      setPasswordStrength("fort");
    } else {
      setPasswordStrength("moyen");
    }
  };

  const onSubmitForm = (e) => {
      e.preventDefault();
      setError(null)
      if (password === confirmPassword) {
        let datas = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          address: address,
          zip: zip,
          city: city,
          phone: phone,
        }

      const isConfirmed = window.confirm(
        "Attention! En cas de perte de vos billets ses informations seront necessaire pour retrouver vos places lors des évènements, veillez à saisir des informations factuelle. Cliquez sur confirmer si c'est le cas sinon merci de saisir de nouveaux vos informations pour enregistrement"
      );

      if (isConfirmed) {
        addOneUser(datas)
          .then((res) => {
            if (res.status === 200) {
              setRedirect(true);
            } else {
              setError(res.msg);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  if (redirect) {
    return <Navigate to="/user/registerWaiting" />;
  }

  return (
    <section>
      <form className="b-form" onSubmit={onSubmitForm}>
      <h2>S'enregistrer</h2>
        <input
          type="text"
          placeholder="Votre prénom"
          onChange={(e) => {
            setFirstName(e.currentTarget.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Votre nom"
          onChange={(e) => {
            setLastName(e.currentTarget.value);
          }}
          required
        />
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
        {passwordStrength !== null && <p class={passwordStrength}>Mot de passe : {passwordStrength}</p>}
        <input
          type="password"
          placeholder="Confirmer votre mot de passe"
          onChange={(e) => {
            setConfirmPassword(e.currentTarget.value);
          }}
          required
        />
        {error !== null && <p>{error}</p>}
        <input
          type="text"
          placeholder="Votre adresse"
          onChange={(e) => {
            setAddress(e.currentTarget.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Votre code postal"
          onChange={(e) => {
            setZip(e.currentTarget.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Votre ville"
          onChange={(e) => {
            setCity(e.currentTarget.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Votre téléphone"
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
          required
        />
        <input type="submit" name="Enregistrer" />
      </form>
    </section>
  );
};

export default Register;
