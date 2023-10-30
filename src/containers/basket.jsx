import {useState, useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {selectUser} from '../slices/userSlice'
import {selectBasket, modifyBasket, cleanBasket} from '../slices/basketSlice'
import {Navigate, Link} from 'react-router-dom'
import {saveOneOrder} from '../api/order'
import {config} from '../../config'
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
    const [acceptCGV, setAcceptCGV] = useState(false);
    const [cgvTips, setCgvTips] = useState(false)


    useEffect(() => {
      window.scrollTo(0, 0) // Remonte le scroll sinon on ne vois pas forcément la zone de paiement
    }, []);

    const pleaseValidCgvFirst = (e) => {
      e.preventDefault();
      let cgv = document.querySelector("#CGVform");
      const cgvRect = cgv.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const targetY = cgvRect.top + scrollTop - (window.innerHeight - cgvRect.height) / 2;
      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });
      cgv.style.border = "2px solid red";
      setCgvTips(true)
    }

    const handleAcceptCGVChange = () => {
      setAcceptCGV(!acceptCGV)
    };

      const onClickSaveOrder = (e)=>{
        e.preventDefault()
        if(user.isLogged){
            let datas = {
                user_id: user.infos.id,
                basket: basket.basket
            }
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
            setRedirect2(true)
        }
      }

    const vider = () => {
      window.localStorage.removeItem("ecommerce-tutorial-basket")
      dispatch(cleanBasket())
    }

    // const addQuantity = (oldBasket, myProduct) => {
    //     let newBasket = JSON.parse(JSON.stringify(oldBasket))
    //     let same = newBasket.findIndex((nb) => nb.id === myProduct.id)
    //     if(same !== -1){
    //         newBasket[same].quantityInCart += 1
    //     }
    //     let lsBasket = JSON.stringify(newBasket)
    //     window.localStorage.setItem("ecommerce-tutorial-basket", lsBasket)
    //     dispatch(modifyBasket(newBasket))
    // }

    // const removeQuantity = (oldBasket, myProduct) => {
    //   let newBasket = JSON.parse(JSON.stringify(oldBasket))
    //     let same = newBasket.findIndex((nb) => nb.id === myProduct.id)
    //     if(same !== -1){
    //         newBasket[same].quantityInCart -= 1
    //     }
    //     let lsBasket = JSON.stringify(newBasket)
    //     window.localStorage.setItem("ecommerce-tutorial-basket", lsBasket)
    //     dispatch(modifyBasket(newBasket))
    // }

    const removeThisSeat = (productId, seatIdToRemove) => {
      // Copiez le panier actuel depuis Redux
      let newBasket = [...basket.basket]
      // Recherchez l'élément du panier correspondant au produit en utilisant son ID
      let productIndex = newBasket.findIndex((product) => product.id === productId)
      if (productIndex !== -1) {
        // Obtiens la référence à l'objet produit
        let product = { ...newBasket[productIndex] } // Créez une copie du produit
        // Supprime le seatId de la liste selectedSeatIds
        let updatedSeatIds = product.selectedSeatIds.filter((seatId) => seatId !== seatIdToRemove)
        // Mett à jour la liste selectedSeatIds du produit
        product.selectedSeatIds = updatedSeatIds
        // Mett à jour la quantité pour le total et la colonne quantité
        product.quantityInCart = product.selectedSeatIds.length

        // Si la longueur de selectedSeatIds est de 0, supprimez le produit du panier
        if (product.selectedSeatIds.length === 0) {
          newBasket.splice(productIndex, 1)
        } else {
          // Sinon, mettez à jour le produit dans le panier
          newBasket[productIndex] = product
        }

        dispatch(modifyBasket(newBasket))
        // Mettez à jour le panier dans le stockage local (localStorage)
        let lsBasket = JSON.stringify(newBasket)
        window.localStorage.setItem("ecommerce-tutorial-basket", lsBasket)
      }
    }

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
    }

    if(redirect2){
      return <Navigate to={`/login`} />
    }

    return (<section className="myBasket">
      <h1 className="buyingStep"> Etape 1 sur 2</h1>
      <h2 className="buyingStepTitle">1. Panier en cours</h2>

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
                        alt="supprimer toute les places pour cet evenement"
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
                            alt="supprimer cette place pour cet evenement"
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
              <img src={ticketsSVG} alt="tickets_spectacle" aria-label="tickets de spectacle invitant à selectionner un évènement"/>
              <p>Votre panier est vide.</p>
              <button><Link to="/">Voir les evenements du moment</Link></button>
            </div>}
          {basket.basket.length > 0 && (
            <>
              <form id="CGVform">
                <input
                  type="checkbox"
                  id="acceptCGV"
                  checked={acceptCGV}
                  onChange={handleAcceptCGVChange}
                />
                <label htmlFor="acceptCGV">J'ai lu et j'accepte les <Link to="/cgv" target="_blank" id="cgvlink">conditions générales de ventes</Link></label>
              </form>
              {cgvTips ? <p style={{ color: "red", margin: "10%", textAlign: "center" }}>Pour valider votre commande, vous devez accepter les conditions générales</p> : null}

              {acceptCGV ?(
                <button
                  onClick={onClickSaveOrder}
                  className="goStripe"
                >
                  <b>Valider ma commande : </b>
                  <i>{(basket.totalPrice).toFixed(2)} €</i>
                </button>
                ) : (
                <button
                  onClick={pleaseValidCgvFirst}
                  className="goStripe"
                  >
                  <b>Valider ma commande : </b>
                  <i>{(basket.totalPrice).toFixed(2)} €</i>
                </button>
                )
              }
            </>
          )}

    </section>)
}
export default Basket
