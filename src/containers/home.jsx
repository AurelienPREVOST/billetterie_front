import { useSelector } from 'react-redux';
import { selectProducts } from '../slices/productSlice';
import ProductCard from '../components/productCard'
import QuickButtonMenu from '../components/quickButtonMenu';

const Home = () => {
  const produits = useSelector(selectProducts);

  return (
    <div>
      <div className="homeBanner"></div>
      <QuickButtonMenu/>
      <h1>LES EVENEMENTS DU MOMENT</h1>
      {produits.products.length > 0 && (
        <div className='mainEvent'>
          {produits.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
