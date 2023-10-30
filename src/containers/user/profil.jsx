import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { selectUser, connectUser } from "../../slices/userSlice";
import { getUserPlaces, updateProfil, checkMyToken } from "../../api/user";
import OrderList from "../../components/orderList";
import QRCode from "qrcode.react";


const Profil = (props) => {
  let dateActuelle = new Date()
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [userPlaces, setUserPlaces] = useState([]);
  const [zoomPlace, setZoomPlace] = useState(false)
  const [zoomPlaceCode, setZoomPlaceCode] = useState("")



  const onClickQrCode = (code) => {
    setZoomPlaceCode(code)
    setZoomPlace(!zoomPlace)
  }


  useEffect(() => {
    setFirstName(user.infos.firstName);
    setLastName(user.infos.lastName);
    setAddress(user.infos.address);
    setZip(user.infos.zip);
    setCity(user.infos.city);
    setPhone(user.infos.phone);

    getUserPlaces(user.infos.id)
      .then((places) => {
        setUserPlaces(places);
      })
      .catch((err) => {
        console.error(
          "Erreur lors de la récupération des places de l'utilisateur :",
          err
        );
      });
  }, [user]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log("je soumet le formulaire")

    let datas = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      zip: zip,
      city: city,
      phone: phone,
    };

    console.log("datas")
    console.log("datas.firstName typeOf =>", typeof firstName)
    console.log("datas.lastName typeOf =>", typeof lastName)
    console.log("datas.address typeOf =>", typeof address)
    console.log("datas.zip typeOf =>", typeof zip)
    console.log("datas.city typeOf =>", typeof city)
    console.log("datas.phone typeOf =>", typeof phone)

    updateProfil(datas, user.infos.id)
      .then((res) => {
        console.log('j entre dans updateProfil')
        console.log("datas =>", datas)
        console.log("user.infos.id =>", user.infos.id)
        if (res.status !== 200) {
          console.log("res.status=>", res.status)
          setMsg("Erreur lors de la modification!");
        } else {
          console.log("avant checkMyToken()");
          checkMyToken()
            .then((response) => {
              console.log("dans le then response =>", response);
              if (response.status !== 200) {
                console.log("response.status2=>", response.status);
                setMsg("Erreur lors de la modification!");
              } else {
                const token = window.localStorage.getItem("tutorial-token");
                console.log("token", token);
                let newUser = res.newUser;
                console.log("newUser=>", newUser);
                newUser.token = token;
                console.log("newUser.token=>", newUser.token);
                dispatch(connectUser(newUser));
                setMsg("Profil modifié avec succès!");
              }
            })
            .catch((err) => console.log("ERROR DU CATCH===>", err));
        }
      })
      .catch((err) => console.log("ERROR DU CATCH NUMERO2 ===>", err));
  };

  return (
    <section>
      <h1>Mon profil</h1>
      <Link to="/logout" className="logoutHref"><button>Me déconnecter</button></Link>
      {msg !== null && <p>{msg}</p>}
      <form className="b-form" onSubmit={onSubmitForm}>
      <label htmlFor="firstName">Prénom :</label>
      <input
        type="text"
        id="firstName"
        defaultValue={user.infos.firstName}
        onChange={(e) => {
          setFirstName(e.currentTarget.value);
        }}
      />

      <label htmlFor="lastName">Nom de famille :</label>
      <input
        type="text"
        id="lastName"
        defaultValue={user.infos.lastName}
        onChange={(e) => {
          setLastName(e.currentTarget.value);
        }}
      />

      <label htmlFor="address">Adresse :</label>
      <input
        type="text"
        id="address"
        defaultValue={user.infos.address}
        onChange={(e) => {
          setAddress(e.currentTarget.value);
        }}
      />

      <label htmlFor="zip">Code postal :</label>
      <input
        type="text"
        id="zip"
        defaultValue={user.infos.zip}
        onChange={(e) => {
          setZip(e.currentTarget.value);
        }}
      />

      <label htmlFor="city">Ville :</label>
      <input
        type="text"
        id="city"
        defaultValue={user.infos.city}
        onChange={(e) => {
          setCity(e.currentTarget.value);
        }}
      />

      <label htmlFor="phone">Téléphone :</label>
      <input
        type="text"
        id="phone"
        defaultValue={user.infos.phone}
        onChange={(e) => {
          setPhone(e.currentTarget.value);
        }}
      />
      <input type="submit" value="Enregistrer" />
    </form>

      {userPlaces.length > 0 && (
        <>
          <h2>Mes évènements prochains :</h2>
          <div className="my-ticket-list">
            {userPlaces.map((place, index) => {
              if (new Date(place.date) - new Date(dateActuelle) > 0) {
                return (
                  <div key={index} className="my-ticket">
                    <h3>{place.name}</h3>
                    <p>{place.price} € TTC</p>
                    <p>{place.lieu}</p>
                    <p><b>Le {new Date(place.date).toISOString().split("T")[0].substring(0, 10)}</b></p>
                    <p><b>à {new Date(place.date).toISOString().split("T")[1].substring(0, 5)}</b></p>
                    <QRCode value={place.code} onClick={() => onClickQrCode(place.code)} />
                    <p><i>{place.code}</i></p>
                  </div>
                );
              }
              return null;
            })}
          </div>
          {zoomPlace ? (
            <div id="zoomPlaceQrCode" onClick={() => onClickQrCode("")}>
              <QRCode value={zoomPlaceCode} style={{height:"50vh", width:"auto", padding:"2rem"}}/>
            </div>
          ) : null}
          <h3>Mes événements passés :</h3>
          <div className="my-ticket-list">
            {userPlaces.map((place, index) => {
              if (new Date(place.date) - new Date(dateActuelle) < 0) {
                return (
                  <div key={index} className="my-ticket-passed">
                    <h3>{place.name}</h3>
                    <p>{place.price} € TTC</p>
                    <p>{place.lieu}</p>
                    <p><b>Le {new Date(place.date).toISOString().split("T")[0].substring(0, 10)}</b></p>
                    <p><b>à {new Date(place.date).toISOString().split("T")[1].substring(0, 5)}</b></p>
                    <QRCode value={place.code} />
                    <p><i>{place.code}</i></p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </>
      )}

      <OrderList userId={user.infos.id} />
    </section>
  );
}

export default Profil;
