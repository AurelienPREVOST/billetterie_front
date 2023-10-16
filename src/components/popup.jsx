import { Link } from 'react-router-dom';
import closeButton from '../assets/closeButton.svg';

const PopUp = (props) => {
  return (
    <div>
      {props.isPopUp && (
        <div className="popUpBasketConfirmation">
          <img
            src={closeButton}
            className="closePopUp"
            alt="Close"
            onClick={() => {
              props.onClickClose();
            }}
          />
          <h4>Panier mis à jour</h4>
          <p>{props.msg}</p>
            <Link to="/basket">Accéder au panier</Link>
        </div>
      )}
    </div>
  );
};

export default PopUp;
