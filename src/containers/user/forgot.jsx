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
          {redirect && <Navigate to="/login" />}
          <h1 className="">
            JE SUIS  <span className="">DANS</span>
            <span className="">FORGOT.JSX FRONT</span> <span>!</span>
          </h1>
          {error !== null && <p className="">{error}</p>}
          <div className="">
            <div className="">
              <div className="">
                <Link to="/login">Login :</Link>
              </div>
              <div className="">
                <Link to="/register">Register :</Link>
              </div>
            </div>
            <div>
              <h3>Mot de passe oublié</h3>
              <div className="">
              <form
                className=""
                onSubmit={onSubmitForm}
              >
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
                  value="Envoyer un nouveau mot de passe"
                />
              </form>
            </div>
            <div className="">
            </div>
        </div>
      </div>
    </div>
    );
}

export default Forgot
