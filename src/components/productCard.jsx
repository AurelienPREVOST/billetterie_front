import { Link } from 'react-router-dom';
import {config} from '../../config'
/* eslint-disable react/prop-types */

const ProductCard = ({product}) => {
  return (
    <article key={product.id} className="eventCard">
      <Link to={`/detail/${product.id}`}>
        <img src={config.pict_url + product.photo}/>
        <h3>{product.name}</h3>
        <p><b>{new Date(product.date).toISOString().split("T")[0]}</b></p>
        <p>{product.lieu}</p>
        <p>{product.price} € TTC</p>
      </Link>
    </article>
  );
}

export default ProductCard;
