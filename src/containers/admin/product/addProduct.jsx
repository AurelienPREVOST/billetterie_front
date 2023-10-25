import {useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {selectUser} from '../../../slices/userSlice'
import {loadProducts} from '../../../slices/productSlice'
import {Navigate} from 'react-router-dom'
import {addOneProduct, displayProducts} from '../../../api/product'
import axios from 'axios'
import {config} from '../../../../config'

const AddProduct = (props)=>{
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [type, setType] = useState("theatre")
    const [description, setDescription] = useState("")
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [ville, setVille] = useState("")
    const [lieu, setLieu] = useState("")
    const [date, setDate] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [selectedFile, setFile] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)

    const [address, setAddress] = useState('')
    const [apiResponse, setApiResponse] = useState(null)
    const [addressVerified, setAddressVerified] = useState(false);


    useEffect(() => {
      if (apiResponse) {
        // Si la réponse de l'API a été reçue, mettez à jour la latitude et la longitude
        setLatitude(apiResponse.features[0].geometry.coordinates[1]);
        setLongitude(apiResponse.features[0].geometry.coordinates[0]);
      }
    }, [apiResponse]);


    const onSubmitForm = (e) => {
        e.preventDefault()
        setError(null)
        if(name === "" || description === "" || price === "" || quantity === ""){
            setError("Tous les champs ne sont pas encore remplis!")
        } else if(isNaN(quantity) || isNaN(price)){
            setError("Les champs prix et quantité doivent obligatoirement être des chiffres!")
        } else {
            saveCompleteProduct()
        }
    }



    // Fonction pour envoyer la requête à l'API
    const verifyAddress = () => {
    // Remplacez les espaces par des "+" dans l'adresse
      const formattedAddress = encodeURIComponent(address);

    // Envoyez la requête à l'API
    axios.get(`https://api-adresse.data.gouv.fr/search/?q=${formattedAddress}`)
    .then((response) => {
      if (response.data.features[0].geometry) {
        setApiResponse(response.data); // Stockez la réponse de l'API dans l'état
        console.log(response.data);
        console.log(response.data.features[0].geometry.coordinates[0]);
        console.log(response.data.features[0].geometry.coordinates[1]);
        if (response.data.features.length === 1) {
          setAddressVerified(true);
        } else {
          setAddressVerified(false);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };


    const saveCompleteProduct = ()=>{
        if(selectedFile === null){
            let datas = {
                name: name,
                type: type,
                description: description,
                address: address, // aucun usage en DB pour l'instant
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                ville: ville,
                lieu: lieu,
                date: date,
                price: price,
                quantity: quantity,
                photo: "no-pict.jpg"
              }
            addProd(datas)
        } else {
            let formData = new FormData()
            formData.append("image", selectedFile)
            axios({
              method: "post",
              url: `${config.api_url}/api/v1/product/pict`,
              data: formData,
              headers: {
                    'Content-type': 'multipart/form-data',
                    'x-access-token': user.infos.token
                }
            })
            .then((res)=>{
                if(res.data.status === 200){
                    let datas = {
                        name: name,
                        type: type,
                        description: description,
                        address: address, // aucun usage en DB pour l'instant
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        ville: ville.toUpperCase(),
                        lieu: lieu,
                        date: date,
                        price: price,
                        quantity: quantity,
                        photo: res.data.url
                    }
                    addProd(datas)
                  }
                })
                .catch(err=>console.log(err))
        }
    }

    const addProd = (datas) =>{
        addOneProduct(datas)
        .then((res)=>{
            if(res.status === 200){
                displayProducts()
                .then((response)=>{
                    if(response.status === 200){
                        dispatch(loadProducts(response.result))
                        setRedirect(true)
                    }
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }

    if(redirect){
        return <Navigate to="/admin"/>
    }
    return (
      <section>
        <form className="b-form" onSubmit={onSubmitForm}>
          <h1>Ajouter un produit</h1>
          <label htmlFor="productName">Nom du produit:</label>
          <input
            type="text"
            id="productName"
            placeholder="Nom du produit"
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
          <label htmlFor="productImage">Image du produit:</label>
          <input
            type="file"
            id="productImage"
            onChange={(e) => {
              setFile(e.currentTarget.files[0]);
            }}
          />
          <label htmlFor="productType">Type de produit:</label>
          <select
            id="productType"
            onChange={(e) => {
              setType(e.currentTarget.value);
            }}
          >
            <option value="theatre">Théâtre</option>
            <option value="opera">Opéra</option>
            <option value="concert">Concert</option>
            <option value="onemanshow">One-Man-Show</option>
            <option value="sportevent">Événement sportif</option>
            <option value="enfants">Spectacle pour enfants</option>
            <option value="cabaret">Cabaret</option>
          </select>
          <label htmlFor="productDescription">Description du produit:</label>
          <textarea
            id="productDescription"
            name="description"
            onChange={(e) => {
              setDescription(e.currentTarget.value);
            }}
          ></textarea>
          <label htmlFor="address">Adresse de l'événement:</label>
          <input
            type="text"
            id="address"
            placeholder="Adresse de l'événement"
            value={address}
            onChange={(e) => {
            setAddress(e.currentTarget.value);
            }}
          />
          {addressVerified ? <p style={{ color: 'green' }}>Adresse trouvée</p> : <p style={{ color: 'red' }}>Précisez mieux l'adresse</p>}
          <button type="button" onClick={verifyAddress}>
            Vérifier
          </button>
      {/* // PLUS BESOIN LA RECHERCHE D'ADRESSE REMPLI LES 2 CHAMPS */}
      {/* <label htmlFor="productLatitude">Latitude:</label>
          <input
            type="text"
            id="productLatitude"
            placeholder="Latitude"
            onChange={(e) => {
              setLatitude(e.currentTarget.value);
            }}
          />
          <label htmlFor="productLongitude">Longitude:</label>
          <input
            type="text"
            id="productLongitude"
            placeholder="Longitude"
            onChange={(e) => {
              setLongitude(e.currentTarget.value);
            }}
          /> */}
          <label htmlFor="productCity">Ville:</label>
          <input
            type="text"
            id="productCity"
            placeholder="Ville"
            onChange={(e) => {
              setVille(e.currentTarget.value);
            }}
          />
          <label htmlFor="productLocation">Lieu:</label>
          <input
            type="text"
            id="productLocation"
            placeholder="Lieu"
            onChange={(e) => {
              setLieu(e.currentTarget.value);
            }}
          />
          <label htmlFor="productDate">Date:</label>
          <input
            type="datetime-local"
            id="productDate"
            value={date}
            min="2023-09-04T00:00"
            max="2035-12-31T00:00"
            onChange={(e) => {
              setDate(e.currentTarget.value);
            }}
          />
          <label htmlFor="productQuantity">Nombre de places disponibles:</label>
          <input
            type="text"
            id="productQuantity"
            placeholder="Nombre de places disponibles"
            onChange={(e) => {
              setQuantity(e.currentTarget.value);
            }}
          />
          <label htmlFor="productPrice">Prix de vente:</label>
          <input
            type="text"
            id="productPrice"
            placeholder="Prix de vente"
            onChange={(e) => {
              setPrice(e.currentTarget.value);
            }}
          />
          <button>Enregistrer</button>
        </form>
        {error !== null && <p>{error}</p>}
      </section>
    )
  }

export default AddProduct
