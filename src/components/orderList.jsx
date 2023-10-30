import { useEffect, useState } from "react";
import { getOrderByUserId } from "../api/order";
import moment from "moment";


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
      {orders === undefined || orders.length === 0 ? (
        <p>Aucune commandes en mémoire</p>
      ) : (
        <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Numéro</th>
                    <th>Prix total</th>
                    <th>Date de confirmation</th>
                    <th>Etat</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => {
                    if (o.status === "payed") {
                      return (
                        <tr key={o.id}>
                          <td>{o.id}</td>
                          <td>{o.totalAmount} euros</td>
                          <td>{moment(o.creationTimestamp).format("DD-MM-YYYY")}</td>
                          <td>{o.status}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
      )}
    </div>
  );
};

export default OrderList;
