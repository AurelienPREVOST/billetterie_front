import { useEffect, useState } from "react";
import { getOrderByUserId } from "../api/order";

const OrderList = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrderByUserId(userId)
      .then((data) => {
        setOrders(data.result);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des commandes :", error);
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
          </li>
        ) : (
          orders.map((order) => (
            <li key={order.id}>
              Commande #{order.id} - Date: {order.creationTimestamp}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default OrderList;
