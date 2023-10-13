import {useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {selectUser} from '../slices/userSlice'
import {selectBasket, modifyBasket, cleanBasket} from '../slices/basketSlice'
import {Navigate, Link} from 'react-router-dom'
import {saveOneOrder} from '../api/order'
import {config} from '../../config'
import { divIcon } from "leaflet"
import trashIcon from "../assets/trash.svg"
import deleteIcon from "../assets/close.svg"
import ticketsSVG from "../assets/tickets.svg"


const Basket = (props)=>{
    const basket = useSelector(selectBasket)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [redirect2, setRedirect2] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [redirect, setRedirect] = useState(false)

    console.log("BASKET =>", basket)

      //au click enregistre une commande
      const onClickSaveOrder = (e)=>{
        e.preventDefault()
        //si l'utilisateur est connecté
        if(user.isLogged){
            //on crée un objet qui récup l'id de l'utilisateur et son panier
            let datas = {
                user_id: user.infos.id,
                basket: basket.basket
            }
            //on enregistre la commande (pas encore payée) et fonction à coder
            saveOneOrder(datas)
            .then((res)=>{
                if(res.status === 200){
                    setOrderId(res.orderId)
                    setRedirect(true)
                }else {
                    console.log(res)
                }
            })
            .catch(err=>console.log(err))
        } else {
            //sinon on le redirige vers login
            setRedirect2(true) // Redirect2 à definir en constante
        }
      }

    //au click on vide le panier
    const vider = () => {
      //on supprime le panier du storage et de redux pour réinitialiser la state globale
      window.localStorage.removeItem("ecommerce-tutorial-basket")
      dispatch(cleanBasket())
    }

    //au click on ajoute de la quantité sur un produit
    const addQuantity = (oldBasket, myProduct) => {
        let newBasket = JSON.parse(JSON.stringify(oldBasket))
        //on cherche dans le panier l'élément sur lequel on veut travailler
        let same = newBasket.findIndex((nb) => nb.id === myProduct.id)
        if(same !== -1){
            newBasket[same].quantityInCart += 1
        }
        //je vais devoir écraser mon panier mis à jour dans le localStorage et redux
        let lsBasket = JSON.stringify(newBasket)
        window.localStorage.setItem("ecommerce-tutorial-basket", lsBasket)
        dispatch(modifyBasket(newBasket))
    }

    //au click on supprime de la quantité sur un produit
    const removeQuantity = (oldBasket, myProduct) => {
      let newBasket = JSON.parse(JSON.stringify(oldBasket))
        //on cherche dans le panier l'élément sur lequel on veut travailler
        let same = newBasket.findIndex((nb) => nb.id === myProduct.id)
        if(same !== -1){
            newBasket[same].quantityInCart -= 1
        }
        //je vais devoir écraser mon panier mis à jour dans le localStorage et redux
        let lsBasket = JSON.stringify(newBasket)
        window.localStorage.setItem("ecommerce-tutorial-basket", lsBasket)
        dispatch(modifyBasket(newBasket))
    }

    const removeThisSeat = (productId, seatIdToRemove) => {
      // Copiez le panier actuel depuis Redux
      let newBasket = [...basket.basket];

      // Recherchez l'élément du panier correspondant au produit en utilisant son ID
      let productIndex = newBasket.findIndex((product) => product.id === productId);

      if (productIndex !== -1) {
        // Obtiens la référence à l'objet produit
        let product = { ...newBasket[productIndex] }; // Créez une copie du produit

        // Supprime le seatId de la liste selectedSeatIds
        let updatedSeatIds = product.selectedSeatIds.filter((seatId) => seatId !== seatIdToRemove);

        // Mett à jour la liste selectedSeatIds du produit
        product.selectedSeatIds = updatedSeatIds;
        //Met à jour la quantité pour le total et la colonne quantité
        product.quantityInCart = product.selectedSeatIds.length
        // Met à jour le panier dans Redux
        newBasket[productIndex] = product;
        dispatch(modifyBasket(newBasket));
        // Mettez à jour le panier dans le stockage local (localStorage)
        let lsBasket = JSON.stringify(newBasket);
        window.localStorage.setItem("ecommerce-tutorial-basket", lsBasket);
      }
    };

    //au click on supprime un produit du panier
    const removeToBasket = (oldBasket, myProduct) =>{
      //suppression via un filter et mise à jour du panier dans le storage et redux
      let newBasket = JSON.parse(JSON.stringify(oldBasket))
      //on va filter l'ancien panier pour créer un nouveau sans l'élément qu'on veut supprimer
      let basketDel = newBasket.filter(b => b.id !== myProduct.id)
      //je vais devoir écraser mon panier mis à jour dans le localStorage et redux
      let lsBasket = JSON.stringify(basketDel)
      window.localStorage.setItem("ecommerce-tutorial-basket", lsBasket)
      dispatch(modifyBasket(basketDel))
    }

    if(redirect){
      return <Navigate to={`/payment/${orderId}`} />
      // ICI IL FAUT PASSER DATA POUR POUVOIR RECUPERER LES CODES DES PLACES ET LES ENVOYER PAR MAIL AU CLIENT
    }

    if(redirect2){
      return <Navigate to={`/login`} />
    }

    return (<section className="myBasket">
      <p className="buyingStep"> Etape 1 sur 2</p>
      <h3 className="buyingStepTitle">1. Panier en cours</h3>

      <h1>JAI LU ET JACCEPTE LES CGV</h1>
      <h1>JAI LU ET JACCEPTE LES CGV</h1>
      <h1>JAI LU ET JACCEPTE LES CGV</h1>
      <h1>JAI LU ET JACCEPTE LES CGV</h1>
      <h1>JAI LU ET JACCEPTE LES CGV</h1>

      {basket.basket.length > 0 ?
          <table>
              <tfoot>
                <tr>
                  <td colSpan={5}>
                  <p onClick={(e)=>{
                          vider()
                          }}
                  >
                  Vider le panier
                  </p>
                  </td>
                </tr>
              </tfoot>
              <tbody>
                {basket.basket.map((product) => ([
                  <tr key={`product-${product.id}`} className="basketEvent">
                    <td>
                      <img src={config.pict_url + product.photo} alt={product.name} />
                    </td>
                    <td>
                      <Link to={`/detail/${product.id}`}>{product.name}</Link>
                    </td>
                    <td>
                      <img
                        className="icon trash"
                        src={trashIcon}
                        onClick={() => {
                          removeToBasket(basket.basket, product);
                        }}
                      />
                    </td>
                  </tr>,
                  <tr key={`seats-${product.id}`}>
                    <td colSpan={2} className="uniquePlaceContainer">
                      {product.selectedSeatIds.map((seatId, index) => (
                        <p key={index}>
                          <span>place {seatId}</span> <span>x1</span>{" "}
                          <span>{product.price}€</span>
                          <img
                            className="icon remove"
                            src={deleteIcon}
                            onClick={() => removeThisSeat(product.id, seatId)}
                          />
                        </p>
                      ))}
                    </td>
                  </tr>
                ]))}
              </tbody>
          </table> :
            <div className="emptyCart">
              <img src={ticketsSVG}/>
              <p>Votre panier est vide.</p>
              <button><Link to="/">Voir les evenements du moment</Link></button>
            </div>}
          {basket.basket.length > 0 && (
            <div>
              <button onClick={onClickSaveOrder} className="goStripe"><b>Valider ma commande : </b><i>{(basket.totalPrice).toFixed(2)} €</i></button>
            </div>
          )}

    </section>)
}
export default Basket
