import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, loadProducts } from "../../slices/productSlice";
import { Link } from "react-router-dom";
import { config } from "../../../config";
import { deleteOneProduct, displayProducts } from "../../api/product";
import { getAllOrders } from "../../api/order";
import moment from "moment";
import ScanBarcode from "../../assets/scanBarcode.svg"
import NewProduct from "../../assets/newProduct.svg"

const Admin = (props) => {
  const product = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  //suppression d'un produit
  const onClickDeleteProduct = (id) => {
    deleteOneProduct(id)
      .then((res) => {
        if (res.status === 200) {
          displayProducts()
            .then((response) => {
              if (response.status === 200) {
                dispatch(loadProducts(response.result));
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    getAllOrders()
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
        <Link to="/logout"><button>Me déconnecter</button></Link>
      <div>
        <h1>Administration</h1>
        <div id="adminMainAction">
          <Link to="/qrcodescanner">
            <button id="scanCheck"><img src={ScanBarcode}/></button>
          </Link>
          <Link to="/addProduct">
            <button id="addProduct"><img src={NewProduct}/></button>
          </Link>
        </div>
        <h2>Produits disponibles</h2>
        <div className="product-cards">
          {product.products.length > 0 ? (
            product.products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img
                    src={config.pict_url + product.photo}
                    alt={`affiche de l'événement ${product.name}`}
                  />
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>Date: {product.date}</p>
                  <p>
                    Nombre de place restante : {product.count} /{" "}
                    {product.quantity}
                  </p>
                  <div className="product-actions">
                    {product.count === product.quantity ? (
                      <>
                        <Link to={`/editProduct/${product.id}`}>modifier</Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            onClickDeleteProduct(product.id);
                          }}
                        >
                          supprimer
                        </button>
                      </>
                    ) : (
                      <button onClick={(e) => {
                          e.preventDefault();
                          alert("OUBLIE PAS DE ME CODER (doc stripe à éplucher pour voir comment on fait un virement retour automatique)")
                        }}
                      >Annuler et rembourser les clients</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun produit disponible.</p>
          )}
        </div>
      </div>
      <hr />
      <article>
        <h3>Commande payée</h3>
        <div>
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
              {orders.length > 0
                ? orders.map((o) => {
                    if (o.status === "payed") {
                      return (
                        <tr key={o.id}>
                          <td>
                            <Link to={`/orderDetail/${o.id}`}>{o.id}</Link>
                          </td>
                          <td>{o.totalAmount} euros</td>
                          <td>
                            {moment(o.creationTimestamp).format("DD-MM-YYYY")}
                          </td>
                          <td>{o.status}</td>
                        </tr>
                      );
                    }
                  })
                : (
                  <tr>
                    <td colSpan="3"></td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};

export default Admin;
