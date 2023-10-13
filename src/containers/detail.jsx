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
// import Cabaret from '../assets/cabaret.png';
// import Concert from '../assets/concert.png';
// import Enfants from '../assets/kidfriendly.jpg';
// import OneManShow from '../assets/OneManShow.jpg';
// import Opera from '../assets/opera.png';
// import Theatre from '../assets/salleTheatre.jpg';
// import SportEvent from '../assets/sport-event.png'
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
    // background: 'rgba(0,0,0,0.3)',
    width: '60%',
    padding: '0.2rem 1rem ',
    margin: '0 auto',
    borderRadius: '25px',
    height: '50px',
    fontSize: '16px', // Vous pouvez ajuster la taille de la police ici
  };

  const onClickBasket = (oldBasket, newProduct) => {
    if (quantity === 0) {
      setError2(true);
      return; // Sortir de la fonction
    }
    setError(null); // Supprimer la vérification isNaN

    let myQuantity = parseInt(quantity);
    let newBasket = JSON.parse(JSON.stringify(oldBasket));
    let same = newBasket.basket.findIndex((b) => b.id === newProduct.id);

    if (same === -1) {
      let myProduct = JSON.parse(JSON.stringify(newProduct));
      myProduct.quantityInCart = parseInt(myQuantity);
      myProduct.selectedSeatIds = choosenSeat; // Ajoutez choosenSeat à selectedSeatIds
      let myBasket = [...newBasket.basket, myProduct];
      let lsBasket = JSON.stringify(myBasket);
      window.localStorage.setItem('ecommerce-tutorial-basket', lsBasket);
      dispatch(modifyBasket(myBasket));
    } else {
      newBasket.basket[same].quantityInCart += parseInt(myQuantity);
      newBasket.basket[same].selectedSeatIds = choosenSeat; // Mettez à jour selectedSeatIds avec choosenSeat
      let lsBasket = JSON.stringify(newBasket.basket);
      window.localStorage.setItem('ecommerce-tutorial-basket', lsBasket);
      dispatch(modifyBasket(newBasket.basket));
    }
    setPopUp(true);
  }


  const scrollToMap = () => {
    // Impossible de passer par une ancre HTML car carte non chargé
    // Recherchez l'élément ayant la classe leaflet-container
    const mapContainer = document.querySelector(".leaflet-container");
    // Vérifiez si l'élément existe
    if (mapContainer) {
      // Utilisez la fonction scrollIntoView pour faire défiler jusqu'à l'élément
      mapContainer.scrollIntoView({ behavior: "smooth" });
    }
  };


  const handleSeatClick = (placeId, index) => {
    console.log("Clic sur la place avec l'ID :", placeId);
    // Utilisez querySelector pour sélectionner l'élément par son ID
    const selectedSeat = document.querySelector(`#seat-number-${index + 1}`);
    // Vérifiez si l'élément existe avant de changer sa source
    if (selectedSeat) {
      // Vérifiez si le siège est déjà vendu
      if (places.result[index].status === "sold") {
        setError("Cette place a déjà été vendue");
        // Si le siège est vendu, ne faites rien
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

      // Utilisez toggle pour changer la source de l'image entre seat et seatSelected
      selectedSeat.src = selectedSeat.src.includes("seatSelected") ? seat : seatSelected;
      // Mettez à jour la liste des sièges choisis en fonction de la sélection/désélection
      setChoosenSeat((prevChoosenSeat) => {
        if (selectedSeat.src.includes("seatSelected")) {
          // Si le siège est sélectionné, ajoutez son ID à la liste
          return [...prevChoosenSeat, placeId];
        } else {
          // Si le siège est désélectionné, filtrez-le de la liste
          return prevChoosenSeat.filter((seat) => seat !== placeId);
        }
      });
      // Mettez à jour la quantité en fonction de la longueur de la liste
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
          // Fetch places data and update the state when it's available
          getAllPlaces(params.id)
            .then((placesData) => {
              setPlaces(placesData);

              // Trouver le panier correspondant au produit actuel
              const currentProductBasket = basket.basket.find((item) => item.id === res.result.id);

              // Accéder aux selectedSeatIds du panier correspondant
              const selectedSeatIds = currentProductBasket ? currentProductBasket.selectedSeatIds : [];
              // console.log("selectedSeatIds:", selectedSeatIds);
              // Initialiser choosenSeat avec les selectedSeatIds du panier correspondant
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
        <h2>{product.name}</h2>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
          <p>Nombre de place séléctionée:</p>
            <input
              type="text"
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
      <h2>
        {isfull ? "SPECTACLE COMPLET" : "PLACES DISPONIBLE"}
      </h2>
      {/* <p><i>
        {isfull ? "" : "Pensez aux autres - Evitez de laisser une place seule au milieu"}
      </i></p> */}
        <img src={scene} style={{ width: '100%' }} />
        {places.result.map((place, index) => {
          // Trouver le panier correspondant au produit actuel
          const currentProductBasket = basket.basket.find((item) => item.id === product.id);

          // Accéder aux selectedSeatIds du panier correspondant
          const selectedSeatIds = currentProductBasket ? currentProductBasket.selectedSeatIds : [];

          return (
          <div key={place.id}
              className="seat-container">
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
            />
            <p className="seat-label">{index}</p>
          </div>
        );
        })}
        <p>{error}</p>
        <p className="advertising">Important: Une place en attente ne vous garantie pas sa disponibilité, pensez à valider votre achat rapidement</p>
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


// import { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import { takeOneProduct } from '../api/product';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectBasket, modifyBasket } from '../slices/basketSlice';
// import PopUp from "../components/popup";
// import { config } from '../../config';
// import { getAllPlaces } from "../api/place";
// import seat from '../assets/seat.svg';
// import seatSelected from '../assets/seatSelected.svg';
// import seatUnavailable from '../assets/seatUnavailable.svg';
// import seatWaiting from '../assets/seatWaiting.svg';
// import scene from '../assets/scene.svg';
// import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// // import Cabaret from '../assets/cabaret.png';
// // import Concert from '../assets/concert.png';
// // import Enfants from '../assets/kidfriendly.jpg';
// // import OneManShow from '../assets/OneManShow.jpg';
// // import Opera from '../assets/opera.png';
// // import Theatre from '../assets/salleTheatre.jpg';
// // import SportEvent from '../assets/sport-event.png'
// import { gridLayer } from "leaflet";


// const Detail = () => {
//   const basket = useSelector(selectBasket);
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(0);
//   const [error, setError] = useState(null);
//   const [isPopUp, setPopUp] = useState(false);
//   const params = useParams();
//   const [product, setProduct] = useState();
//   const [latitude, setLatitude] = useState(48.86)
//   const [longitude, setLongitude] = useState(2.3522)
//   const [places, setPlaces] = useState(null);
//   const [error2, setError2] = useState(true)
//   const [choosenSeat, setChoosenSeat] = useState([])
//   const isfull = document.querySelectorAll(`img[src="${seat}"]`).length > 0 ? false : true;

//   const locationMarker = {geocode: [latitude, longitude], popup: "spectacle ici"}

//   const errorMessageStyle = {
//     // background: 'rgba(0,0,0,0.3)',
//     width: '60%',
//     padding: '0.2rem 1rem ',
//     margin: '0 auto',
//     borderRadius: '25px',
//     height: '50px',
//     fontSize: '16px', // Vous pouvez ajuster la taille de la police ici
//   };

//   const onClickBasket = (oldBasket, newProduct) => {
//     if (quantity === 0) {
//       setError2(true);
//       return; // Sortir de la fonction
//     }
//     setError(null); // Supprimer la vérification isNaN

//     let myQuantity = parseInt(quantity);
//     let newBasket = JSON.parse(JSON.stringify(oldBasket));
//     let same = newBasket.basket.findIndex((b) => b.id === newProduct.id);

//     if (same === -1) {
//       let myProduct = JSON.parse(JSON.stringify(newProduct));
//       myProduct.quantityInCart = parseInt(myQuantity);
//       myProduct.selectedSeatIds = choosenSeat; // Ajoutez choosenSeat à selectedSeatIds
//       let myBasket = [...newBasket.basket, myProduct];
//       let lsBasket = JSON.stringify(myBasket);
//       window.localStorage.setItem('ecommerce-tutorial-basket', lsBasket);
//       dispatch(modifyBasket(myBasket));
//     } else {
//       newBasket.basket[same].quantityInCart += parseInt(myQuantity);
//       newBasket.basket[same].selectedSeatIds = choosenSeat; // Mettez à jour selectedSeatIds avec choosenSeat
//       let lsBasket = JSON.stringify(newBasket.basket);
//       window.localStorage.setItem('ecommerce-tutorial-basket', lsBasket);
//       dispatch(modifyBasket(newBasket.basket));
//     }
//     setPopUp(true);
//   }


//   const scrollToMap = () => {
//     // Impossible de passer par une ancre HTML car carte non chargé
//     // Recherchez l'élément ayant la classe leaflet-container
//     const mapContainer = document.querySelector(".leaflet-container");
//     // Vérifiez si l'élément existe
//     if (mapContainer) {
//       // Utilisez la fonction scrollIntoView pour faire défiler jusqu'à l'élément
//       mapContainer.scrollIntoView({ behavior: "smooth" });
//     }
//   };


//   const handleSeatClick = (placeId, index) => {
//     console.log("Clic sur la place avec l'ID :", placeId);
//     // Utilisez querySelector pour sélectionner l'élément par son ID
//     const selectedSeat = document.querySelector(`#seat-number-${index + 1}`);
//     // Vérifiez si l'élément existe avant de changer sa source
//     if (selectedSeat) {
//       // Vérifiez si le siège est déjà vendu
//       if (places.result[index].status === "sold") {
//         setError("Cette place a déjà été vendue");
//         // Si le siège est vendu, ne faites rien
//         return;
//       }
//       // Vérifiez si le siège n'est pas déjà au panier
//       if (selectedSeat.src.includes("seatWaiting")) {
//         setError(
//           "Vous avez déjà cette place en attente dans votre panier - dépêchez-vous de valider votre panier en cours!"
//         );
//         return;
//       }

//       setError(null);
//       setError2(false)

//       // Utilisez toggle pour changer la source de l'image entre seat et seatSelected
//       selectedSeat.src = selectedSeat.src.includes("seatSelected") ? seat : seatSelected;
//       // Mettez à jour la liste des sièges choisis en fonction de la sélection/désélection
//       setChoosenSeat((prevChoosenSeat) => {
//         if (selectedSeat.src.includes("seatSelected")) {
//           // Si le siège est sélectionné, ajoutez son ID à la liste
//           return [...prevChoosenSeat, placeId];
//         } else {
//           // Si le siège est désélectionné, filtrez-le de la liste
//           return prevChoosenSeat.filter((seat) => seat !== placeId);
//         }
//       });
//       // Mettez à jour la quantité en fonction de la longueur de la liste
//       setQuantity((prevQuantity) =>
//         selectedSeat.src.includes("seatSelected") ? prevQuantity + 1 : prevQuantity - 1
//       );
//     }
//   };




//   useEffect(() => {
//     takeOneProduct(params.id)
//       .then((res) => {
//         if (res.status === 200) {
//           setProduct(res.result);
//           if (res.result.latitude && res.result.longitude) {
//             setLatitude(res.result.latitude)
//             setLongitude(res.result.longitude)
//           }
//           // Fetch places data and update the state when it's available
//           getAllPlaces(params.id)
//             .then((placesData) => {
//               setPlaces(placesData);

//               // Trouver le panier correspondant au produit actuel
//               const currentProductBasket = basket.basket.find((item) => item.id === res.result.id);

//               // Accéder aux selectedSeatIds du panier correspondant
//               const selectedSeatIds = currentProductBasket ? currentProductBasket.selectedSeatIds : [];
//               // console.log("selectedSeatIds:", selectedSeatIds);
//               // Initialiser choosenSeat avec les selectedSeatIds du panier correspondant
//               setChoosenSeat(selectedSeatIds);

//             })
//             .catch((err) => console.log(err));
//         }
//       })
//       .catch((err) => console.log(err));
//   }, [params.id, basket.basket]);

//   return (
//     <section className="theatreDetail">
//       {product ? (
//         <div>
//           <PopUp
//             isPopUp={isPopUp}
//             msg={`${quantity} place(s) pour la représentation de "${product.name}" àjouté à votre panier, les places numero `}
//             onClickClose={(e) => {
//               setPopUp(false);
//               setQuantity(0);
//             }}
//           />
//           <div className={`bannerDetail ${product.type || 'loading'}`}>
//           <h2>{product.name}</h2>
//             <img src={config.pict_url + product.photo} alt={product.name} />
//           </div>
//           <p>Le {new Date(product.date).toISOString().split("T")[0]}</p>
//           <p>à {new Date(product.date).toISOString().split("T")[1].substring(0, 5)}</p>
//           <p onClick={scrollToMap}>{product.lieu}</p>
//           <hr></hr>
//           <p>{product.description}</p>
//           <hr></hr>
//           <p>Prix unitaire: {product.price} € TTC</p>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//             }}
//           >
//           <p>Nombre de place séléctionée:</p>
//             <input
//               type="text"
//               disabled={true}
//               value={quantity}
//               onChange={(e) => {
//                 setQuantity(e.currentTarget.value);
//               }}
//             />
//             <input
//               type="submit"
//               value="AJOUTER AU PANIER"
//               onClick={(e) => {
//                 e.preventDefault();
//                 onClickBasket(basket, product);
//               }}
//             />
//           </form>
//           {error2 ? (
//             <p style={errorMessageStyle}>
//               Cliquez sur les sièges pour sélectionner vos places
//             </p>
//               ) : (
//             <p style={errorMessageStyle}></p>
//           )}
//         </div>
//       ) : null}


//       {places ? (
//       <div className="spectacleSchema" >
//       <h2>
//         {isfull ? "SPECTACLE COMPLET" : "PLACES DISPONIBLE"}
//       </h2>
//       {/* <p><i>
//         {isfull ? "" : "Pensez aux autres - Evitez de laisser une place seule au milieu"}
//       </i></p> */}
//         <img src={scene} style={{ width: '100%' }} />
//         {places.result.map((place, index) => {
//           // Trouver le panier correspondant au produit actuel
//           const currentProductBasket = basket.basket.find((item) => item.id === product.id);

//           // Accéder aux selectedSeatIds du panier correspondant
//           const selectedSeatIds = currentProductBasket ? currentProductBasket.selectedSeatIds : [];

//           return (
//           <div key={place.id}
//               className="seat-container">
//             <img
//               id={`seat-number-${index + 1}`}
//               className="various-seat"
//               src={
//                 selectedSeatIds.includes(place.id)
//                   ? seatWaiting
//                   : place.status === "available"
//                   ? seat
//                   : seatUnavailable
//               }
//               alt={`Place ${place.id}`}
//               onClick={() => handleSeatClick(place.id, index)}
//             />
//             <p className="seat-label">{index}</p>
//           </div>
//         );
//         })}
//         <p>{error}</p>
//         <p className="advertising">Important: Une place en attente ne vous garantie pas sa disponibilité, pensez à valider votre achat rapidement</p>
//       </div>
//     ) : (
//       <p>Plan de salle en cours de chargement...</p>
//     )}
//     {product ? (
//     <div className='mapDetail'>
//       <MapContainer center={[latitude, longitude]} zoom={13}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={locationMarker.geocode}>
//           <Popup><h3>{product.lieu}</h3></Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   ) : null}
//     </section>
//   );
// };

// export default Detail;
