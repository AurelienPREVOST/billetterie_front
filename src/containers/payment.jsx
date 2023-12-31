import {loadStripe} from "@stripe/stripe-js"
import CheckoutForm from "../components/checkout-form"
import {Elements} from "@stripe/react-stripe-js"
import {selectUser} from '../slices/userSlice'
import {useSelector} from 'react-redux'


// import {AddressElement} from '@stripe/react-stripe-js';


const Payment = (props) => {
    //la clé publique de stripe me permet de brancher l'environnement de l'api stripe à mon compte stripe API
    const stripePromise = loadStripe("pk_test_51IzetcLJHwOB3xS8Z9ADczpOFPVzQjpcnZFrPUMb3Lcs1oRlAvtU9qUQTJaTTmP7nMF1F9d8gzaJ2COoyKcmxehH00lUA6H5EK")
    const user = useSelector(selectUser)

    return (<section>
        <h1 className="buyingStep"> Etape 2 sur 2</h1>
        <h2 className="buyingStepTitle">2. Paiement</h2>
        <Elements stripe={stripePromise}>
            <CheckoutForm orderId={props.params.orderId} clientId={user.infos.id}/>
        </Elements>
    </section>)
}

export default Payment
