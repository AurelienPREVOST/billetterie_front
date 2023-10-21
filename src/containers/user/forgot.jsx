import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { forgotPassword } from "../../api/user";

const Forgot = () => {

    const [email, setEmail] = useState("")
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);

    const onSubmitForm = (e) => {
      e.preventDefault()
      let data = {
        email: email
      }
      forgotPassword(data)
      .then((res)=>{
        console.log(res)
        setRedirect(true)
      })
      .catch((err)=>{
        setError(err)
      })
    }
    return (
      <div>
      {redirect && <Navigate to="/user/passwordLostCheckMail" />}
      {error !== null && <p className="">{error}</p>}
        <form
        className="b-form"
        onSubmit={onSubmitForm}
        >
          <h2>Mot de passe oublié</h2>
          <label>Email</label>
          <input
          type="text"
          name="email"
          onChange={(e) => {
          setEmail(e.currentTarget.value);
          }}
          />
          <input
          className=""
          type="submit"
          value="Reinitialisation"
          />
          <Link to="/login">Se connecter ?</Link>
          <Link to="/register">Pas encore de compte?</Link>
        </form>
      </div>
    );
}

export default Forgot
