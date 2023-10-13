import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { checkPayment, updateOrder } from '../api/order';
import { updateStatusSeat } from '../api/place';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../slices/userSlice';
import {
  selectBasket,
  modifyBasket,
  cleanBasket,
} from '../slices/basketSlice';

const CheckoutForm = (props) => {
  const [error, setError] = useState(null);
  const [redirectSuccess, setRedirectSuccess] = useState(false);
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Problème de connexion avec l'interface de paiement");
      return;
    }

    const data = {
      email: user.infos.email,
      orderId: props.orderId,
    };

    try {
      const paymentAuth = await checkPayment(data);

      if (paymentAuth.status === 500) {
        setError('Échec du paiement');
        return;
      }

      const secret = paymentAuth.client_secret;

      const payment = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user.infos.email,
          },
        },
      });

      if (payment.error) {
        setError(payment.error.message);
      } else {
        if (payment.paymentIntent.status === 'succeeded') {
          basket.basket.forEach((b) => {
            b.selectedSeatIds.forEach((seatId) => {
              updateStatusSeat(seatId, user.infos.id);
            });
          });
          const data = {
            orderId: props.orderId,
            status: 'payed',
          };
          dispatch(cleanBasket());
          window.localStorage.removeItem('ecommerce-tutorial-basket');

          updateOrder(data)
            .then((res) => {
              if (res.status === 200) {
                setRedirectSuccess(true);
              }
            })
            .catch((err) => console.log(err));
        }
      }
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors du paiement.');
    }
  };

  if (redirectSuccess) {
    return <Navigate to="/success" />;
  }

  return (
    <section className="minHeightFullpage">
      {error && <p className="error-message">{error}</p>}
      <form id="formtest" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
              },
            },
          }}
        />
        <button disabled={!stripe}>Valider ma commande</button>
      </form>
      <style>
        {`
          #formtest .error-message {
            color: red;
            margin-top: 10px;
          }

          #formtest {
            background:#87CEFA;
            margin: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
          }

          #formtest button {
            display:flex;
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            margin: 3rem auto 1rem auto;
          }

          #formtest button:hover {
            background-color: #0056b3;
          }

          .__PrivateStripeElement iframe {
            background:white;
            border-radius:10px;
            padding:1rem
          }

        `}
      </style>
    </section>
  );
};

export default CheckoutForm;


// import {useState, useEffect} from 'react'
// // import {loadStripe} from '@stripe/stripe-js'
// import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
// import {checkPayment, updateOrder} from '../api/order'
// import {updateStatusSeat} from '../api/place'
// import {Navigate} from 'react-router-dom'
// import {useSelector, useDispatch} from 'react-redux'
// import {selectUser} from '../slices/userSlice'
// import {selectBasket, modifyBasket, cleanBasket} from '../slices/basketSlice'


// const CheckoutForm = (props) => {

//     const [error, setError] = useState(false)
//     const [redirectSuccess, setRedirectSuccess] = useState(false)
//     const basket = useSelector(selectBasket) // ON DEVRA VIDER LE PANIER APRES
//     const user = useSelector(selectUser)
//     const dispatch = useDispatch() // ET DISPATCH
//     const stripe = useStripe() //on va pouvoir utiliser les fonctions de l'api stripe
//     const elements = useElements() //on va pouvoir utiliser des éléments de consommation de la carte


//     ///LA FOREACH DE FOREACH POUR OBTENIR LES IDS DES PLACES DANS LE PANIER////



//     //fonction de paiement lors de la validation de la CB
//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         // Vérifier le statut de toutes les places du panier pour être sûr qu'elles soient toujours "availabe" en bdd
//         // let allPlacesAvailable = true;

//         // for (const product of basket.basket) {
//         //   for (const seatId of product.selectedSeatIds) {
//         //     const seatStatus = await checkSeatStatus(seatId); // Remplacez par la fonction de requête appropriée

//         //     if (seatStatus !== 'available') {
//         //       allPlacesAvailable = false;
//         //       break;
//         //     }
//         //   }

//         //   if (!allPlacesAvailable) {
//         //     setError('Certaines places ne sont plus disponibles. Veuillez mettre à jour votre panier.');
//         //     break;
//         //   }
//         // }

//         // if (!allPlacesAvailable) {
//         //   return;
//         // }
//         //si les fonctionnalitées de paiement de stripe ou du terminal de paiement ne sont pas bien connectés
//         if(!stripe || !elements){
//             setError("probleme de connexion avec l'interface de paiement")
//             return
//         }
//         //je récupère l'email de l'utilisateur qui paye et surtout le numéro de commande pour installer le suivi de commande sécurisé.
//         let data = {
//             email: user.infos.email,
//             orderId: props.orderId
//         }

//         console.log("Tentative de paiement")
//         //gestion de paiement via stripe
//         //on va checker via stripe dans le back-end si le paiement est réalisable
//         const paymentAuth = await checkPayment(data)

//         if(paymentAuth.status === 500){
//             setError("Echec du paiement")
//         }
//         //on stock la réponse de la tentative de paiement vers stripe dans une variable qui va retourner une clé sécurisée
//         const secret = paymentAuth.client_secret
//         // console.log("client secret", secret)

//         //on envoi la demande de paiement
//         const payment = await stripe.confirmCardPayment(secret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//                 billing_details: {
//                     email: user.infos.email
//                 }
//             }
//         })

//         //payment va renvoyer une réponse (succés ou echec de paiement)
//         console.log(payment)
//         //gestion des erreurs
//         if(payment.error){
//             setError(payment.error.message)
//         }else{
//             //si le paiement est réussi
//             if(payment.paymentIntent.status === "succeeded"){
//                 console.log("Transaction réalisé avec succès")
//                 //on passe les places choisi a "sold"
//                 basket.basket.forEach((b) => {
//                   b.selectedSeatIds.forEach((seatId) => {
//                     updateStatusSeat(seatId, user.infos.id) // Inclu l'ID du client actuel
//                   });
//                 });
//                 let data = {
//                     orderId: props.orderId,
//                     status: "payed"
//                 }
//                 // et dans redux on le propage
//                 dispatch(cleanBasket());


//                 window.localStorage.removeItem('ecommerce-tutorial-basket')
//                 //on enregistre dans la bdd que la status de sa commande est payée
//                 updateOrder(data)
//                 .then((res)=>{
//                     if(res.status === 200){
//                         setRedirectSuccess(true)
//                     }
//                 })
//                 .catch(err=>console.log(err))
//             }
//         }
//     }

//     if(redirectSuccess){
//         return <Navigate to="/success" />
//     }
//     return (
//         <section>
//             {error !== null && <p>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <CardElement
//                     option={{
//                         style: {
//                             base: {
//                                 color: "#32325d",
//                                 fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//                                 fontSmoothing: "antialiased",
//                                 fontSize: "16px",
//                                 "::placeholder": {
//                                 color: "#aab7c4",
//                                 },
//                             },
//                             invalid: {
//                                 color: "#fa755a",
//                                 iconColor: "#fa755a",
//                             }
//                         }
//                     }}
//                 />
//                 <button
//                     disabled={props.stripe}
//                 >Valider ma commande</button>
//             </form>
//         </section>
//     )
// }

// export default CheckoutForm
