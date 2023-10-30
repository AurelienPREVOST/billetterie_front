import { getPlacesFromOrder } from '../../../api/order'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const [orderInfo, setOrderInfo] = useState([]);
  const order = useParams();

  useEffect(() => {
    window.scrollTo(0, 0) // Remonte le scroll
  }, []);

  useEffect(() => {
    getPlacesFromOrder(order.id)
      .then((res) => {
        setOrderInfo(res.result);
      })
      .catch((err) => console.log(err));
  }, [order.id]);

  return (
    <div>
      {orderInfo.length > 0 ? (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Place ID</th>
                <th>N° Commande</th>
                <th>Product ID</th>
                <th>Status</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {orderInfo.map((order) => (
                <tr key={order.id}>
                  <td>{order.code}</td>
                  <td>{order.id}</td>
                  <td>{order.order_id}</td>
                  <td>{order.product_id}</td>
                  <td>{order.status}</td>
                  <td>{order.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Aucune information disponible</p>
      )}
    </div>
  );
};

export default OrderDetail;
