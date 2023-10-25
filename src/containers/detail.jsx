import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { takeOneProduct } from '../api/product';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasket, modifyBasket } from '../slices/basketSlice';
import PopUp from "../components/popup";
import { config } from '../../config';
import { getAllPlaces } from "../api/place";
import seat from '../assets/seat.svg';
import seatSelected from '../assets/seatSelected.svg';
import seatUnavailable from '../assets/seatUnavailable.svg';
import seatWaiting from '../assets/seatWaiting.svg';
import scene from '../assets/scene.svg';
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { gridLayer } from "leaflet";


const Detail = () => {
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [isPopUp, setPopUp] = useState(false);
  const params = useParams();
  const [product, setProduct] = useState();
  const [latitude, setLatitude] = useState(48.86)
  const [longitude, setLongitude] = useState(2.3522)
  const [places, setPlaces] = useState(null);
  const [error2, setError2] = useState(true)
  const [choosenSeat, setChoosenSeat] = useState([])
  const isfull = document.querySelectorAll(`img[src="${seat}"]`).length > 0 ? false : true;

  const locationMarker = {geocode: [latitude, longitude], popup: "spectacle ici"}

  const errorMessageStyle = {
    width: '60%',
    padding: '0.2rem 1rem ',
    margin: '0 auto',
    borderRadius: '25px',
    height: '50px',
    fontSize: '16px'
  };

  const onClickBasket = (oldBasket, newProduct) => {
    if (quantity === 0) {
      setError2(true);
      return
    }
    setError(null)

    let myQuantity = parseInt(quantity);
    let newBasket = JSON.parse(JSON.stringify(oldBasket));
    let same = newBasket.basket.findIndex((b) => b.id === newProduct.id);

    if (same === -1) {
      let myProduct = JSON.parse(JSON.stringify(newProduct));
      myProduct.quantityInCart = parseInt(myQuantity);
      myProduct.selectedSeatIds = choosenSeat
      let myBasket = [...newBasket.basket, myProduct];
      let lsBasket = JSON.stringify(myBasket);
      window.localStorage.setItem('ecommerce-tutorial-basket', lsBasket);
      dispatch(modifyBasket(myBasket));
    } else {
      newBasket.basket[same].quantityInCart += parseInt(myQuantity);
      newBasket.basket[same].selectedSeatIds = choosenSeat
      let lsBasket = JSON.stringify(newBasket.basket);
      window.localStorage.setItem('ecommerce-tutorial-basket', lsBasket);
      dispatch(modifyBasket(newBasket.basket));
    }
    setPopUp(true);
  }


  const scrollToMap = () => {
    const mapContainer = document.querySelector(".leaflet-container");
    if (mapContainer) {
      mapContainer.scrollIntoView({ behavior: "smooth" });
    }
  };


  const handleSeatClick = (placeId, index) => {
    const selectedSeat = document.querySelector(`#seat-number-${index + 1}`);
    if (selectedSeat) {
      // Vérifiez si le siège est déjà vendu
      if (places.result[index].status === "sold") {
        setError("Cette place a déjà été vendue");
        // Si le siège est vendu, on ne fait rien (juste l'erreur s'affiche en front)
        return;
      }
      // Vérifiez si le siège n'est pas déjà au panier
      if (selectedSeat.src.includes("seatWaiting")) {
        setError(
          "Vous avez déjà cette place en attente dans votre panier - dépêchez-vous de valider votre panier en cours!"
        );
        return;
      }

      setError(null);
      setError2(false)

      selectedSeat.src = selectedSeat.src.includes("seatSelected") ? seat : seatSelected;
      setChoosenSeat((prevChoosenSeat) => {
        if (selectedSeat.src.includes("seatSelected")) {
          // Si le siège est sélectionné, ajoutez son ID à la liste
          return [...prevChoosenSeat, placeId];
        } else {
          // Si le siège est désélectionné, on le supprime de la liste
          return prevChoosenSeat.filter((seat) => seat !== placeId);
        }
      });
      // Met à jour la quantité en fonction de la longueur de la liste
      setQuantity((prevQuantity) =>
        selectedSeat.src.includes("seatSelected") ? prevQuantity + 1 : prevQuantity - 1
      );
    }
  };




  useEffect(() => {
    takeOneProduct(params.id)
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.result);
          if (res.result.latitude && res.result.longitude) {
            setLatitude(res.result.latitude)
            setLongitude(res.result.longitude)
          }
          getAllPlaces(params.id)
            .then((placesData) => {
              setPlaces(placesData);
              const currentProductBasket = basket.basket.find((item) => item.id === res.result.id);
              const selectedSeatIds = currentProductBasket ? currentProductBasket.selectedSeatIds : [];
              setChoosenSeat(selectedSeatIds);

            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, [params.id, basket.basket]);

  return (
  <>
    {product ? (
      <div className={`bannerDetail ${product.type || 'loading'}`}>
        <h1>{product.name}</h1>
        <img src={config.pict_url + product.photo} alt={product.name} />
      </div>
    ) : null }


    <section className="theatreDetail">
      {product ? (
        <div className="theatreInformations">
          <PopUp
            isPopUp={isPopUp}
            msg={`${quantity} place(s) pour la représentation de "${product.name}" àjouté à votre panier, les places numero `}
            onClickClose={(e) => {
              setPopUp(false);
              setQuantity(0);
            }}
          />
          <p>Le {new Date(product.date).toISOString().split("T")[0]}</p>
          <p>à {new Date(product.date).toISOString().split("T")[1].substring(0, 5)}</p>
          <p onClick={scrollToMap}>{product.lieu}</p>
          <hr></hr>
          <p>{product.description}</p>
          <hr></hr>
          <p>Prix unitaire: {product.price} € TTC</p>
          <form>
            <label htmlFor="quantity">Nombre de places sélectionnées:</label>
            <input
              type="text"
              id="quantity"
              disabled={true}
              value={quantity}
              onChange={(e) => {
                setQuantity(e.currentTarget.value);
              }}
            />
            <input
              type="submit"
              value="AJOUTER AU PANIER"
              onClick={(e) => {
                e.preventDefault();
                onClickBasket(basket, product);
              }}
            />
          </form>
          {error2 ? (
            <p style={errorMessageStyle}>
              Cliquez sur les sièges pour sélectionner vos places
            </p>
              ) : (
            <p style={errorMessageStyle}></p>
          )}
        </div>
      ) : null}


      {places ? (
      <div className="spectacleSchema" >
      <h2>{isfull ? "SPECTACLE COMPLET" : "PLACES DISPONIBLE"}</h2>
        <img src={scene} alt="illustration d'un rideau de scene de spectacle" style={{ width: '100%' }} />
        {places.result.map((place, index) => {
          const currentProductBasket = basket.basket.find((item) => item.id === product.id);
          const selectedSeatIds = currentProductBasket ? currentProductBasket.selectedSeatIds : [];

          return (
          <div key={place.id} className="seat-container">
            <img
              id={`seat-number-${index + 1}`}
              className="various-seat"
              src={
                selectedSeatIds.includes(place.id)
                  ? seatWaiting
                  : place.status === "available"
                  ? seat
                  : seatUnavailable
              }
              alt={`Place ${place.id}`}
              onClick={() => handleSeatClick(place.id, index)}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSeatClick(place.id, index);
                }
              }}
            />
            <p className="seat-label">{index + 1}</p>
          </div>
        );
        })}
        <p className="advertising">Important: Une place en attente ne vous garantie pas sa disponibilité, pensez à valider votre achat rapidement</p>
        <p>{error}</p>
      </div>
    ) : (
      <p>Plan de salle en cours de chargement...</p>
    )}
    {product ? (
    <div className='mapDetail'>
      <MapContainer center={[latitude, longitude]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={locationMarker.geocode}>
          <Popup><h3>{product.lieu}</h3></Popup>
        </Marker>
      </MapContainer>
    </div>
  ) : null}
    </section>
</>
  );
};


export default Detail;
