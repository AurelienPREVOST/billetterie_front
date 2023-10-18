import { Link } from 'react-router-dom';
import {config} from '../../config'
/* eslint-disable react/prop-types */

const ProductCard = ({product}) => {
  return (
    <article key={product.id} className="eventCard">
      <Link to={`/detail/${product.id}`} aria-label={`Détails de l'évenement : ${product.name}`}>
      <img src={config.pict_url + product.photo} alt={`Affiche d'illustration de l'évenement :  ${product.name}`} />
        <h2>{product.name}</h2>
        <p><b>{new Date(product.date).toISOString().split("T")[0]}</b></p>
        <p>{product.lieu}</p>
        <p>{product.price} € TTC</p>
      </Link>
    </article>
  );
}

export default ProductCard;
