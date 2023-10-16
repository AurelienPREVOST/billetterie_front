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
          let numOrder = props.orderId
          console.log("numOrder ==>", numOrder)
          basket.basket.forEach((b) => {
            b.selectedSeatIds.forEach((seatId) => {
              updateStatusSeat(seatId, user.infos.id, numOrder);
            });
            // PROBLEME CA ENVOI AUTANT DE MAIL QUE DE PLACE VENDU
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
            {/* font-size: 16px; */}
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
