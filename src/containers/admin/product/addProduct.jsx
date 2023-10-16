import {useState} from 'react'
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
    const [type, setType] = useState("")
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

    const saveCompleteProduct = ()=>{
        if(selectedFile === null){
            let datas = {
                name: name,
                type: type,
                description: description,
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
            //on prépare l'objet formData qui permet le transport dans la requète ajax
            let formData = new FormData()
            formData.append("image", selectedFile)
            //requète d'ajout d'une image
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
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        ville: ville,
                        lieu: lieu,
                        date: date,
                        price: price,
                        quantity: quantity,
                        // codedPlaces: buildCodedPlaces(quantity),
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
            //si il a rajouté une produit on met immédiatement à jour notre store de redux
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
    return(<section>
        <h2>Ajouter un produit</h2>
        {error !== null && <p>{error}</p>}
        <form
            className="b-form"
            onSubmit={onSubmitForm}
        >
            <input
                type="text"
                placeholder="Nom de la produit"
                onChange={(e)=>{
                  setName(e.currentTarget.value)
                }}
            />
            <input
                type="file"
                onChange={(e)=>{
                  setFile(e.currentTarget.files[0])
                }}
            />
            <select
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
            <textarea
                name="description"
                onChange={(e)=>{
                  setDescription(e.currentTarget.value)
                }}
            ></textarea>
            <input
                type="text"
                placeholder="Latitude"
                onChange={(e)=>{
                  setLatitude(e.currentTarget.value)
                }}
            />
            <input
                type="text"
                placeholder="Longitude"
                onChange={(e)=>{
                  setLongitude(e.currentTarget.value)
                }}
            />
            <input
                type="text"
                placeholder="Ville"
                onChange={(e)=>{
                  setVille(e.currentTarget.value)
                }}
            />
            <input
                type="text"
                placeholder="Lieu"
                onChange={(e)=>{
                  setLieu(e.currentTarget.value)
                }}
            />
            <input
              type="datetime-local"
              value={date}
              min="2023-09-04T00:00"
              max="2035-12-31T00:00"
                onChange={(e)=>{
                  setDate(e.currentTarget.value)
                }}
            />
            <input
                type="text"
                placeholder="Nombre de place disponible"
                onChange={(e)=>{
                  setQuantity(e.currentTarget.value)
                }}
            />
            <input
                type="text"
                placeholder="Prix de vente"
                onChange={(e)=>{
                  setPrice(e.currentTarget.value)
                }}
            />
            <button>Enregistrer</button>
        </form>
    </section>)
}

export default AddProduct
