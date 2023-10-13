import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { getOrderByUserId } from "../api/order";

const OrderList = ({ userId }) => {
  // const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Utilisez la fonction pour récupérer les commandes de l'utilisateur
    getOrderByUserId(userId)
      .then((data) => {
        setOrders(data.result);
        // setLoading(false); // Indiquez que le chargement est terminé
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des commandes :", error);
        // setLoading(false); // Indiquez que le chargement est terminé (avec erreur)
      });
  }, [userId]);

  const refreshOrders = () => {
    window.location.reload();
  };

  return (
    <div>
      <h3>Mes Commandes</h3>
      <ul>
        {orders === undefined || orders.length === 0 ? (
          <li>
            <button onClick={refreshOrders}>Voir mes commandes</button>
            {/* Aucune commande trouvée. */}
          </li>
        ) : (
          orders.map((order) => (
            <li key={order.id}>
              {/* Utilisez Link pour créer un lien vers les détails de la commande */}
              Commande #{order.id} - Date: {order.creationTimestamp}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default OrderList;
