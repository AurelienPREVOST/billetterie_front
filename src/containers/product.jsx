import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { testProductSql } from '../api/product';
import QuickButtonMenu from '../components/quickButtonMenu';
import ProductCard from '../components/productCard';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Product = () => {
  const { type } = useParams();
  const location = useLocation();
  const [typeProducts, setTypeProducts] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [uniqueCities, setUniqueCities] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [priceRange, setPriceRange] = useState([0, 500]); // Prix minimum et maximum

  const [fixedMinMax, setFixedMinMax] = useState([0, 500])
  const [firstSetting, setFirstSetting] = useState(true)


  useEffect(() => {
    testProductSql(type)
      .then((res) => {
        if (res.status === 200) {
          setTypeProducts(res.result);
          const citiesSet = new Set(res.result.map((product) => product.ville));
          const citiesArray = Array.from(citiesSet);
          setUniqueCities(citiesArray);

          const minProductPrice = Math.min(...res.result.map((product) => product.price));
          const maxProductPrice = Math.max(...res.result.map((product) => product.price));
          setPriceRange([minProductPrice, maxProductPrice]);
          if (firstSetting) {
            setFixedMinMax([minProductPrice, maxProductPrice])
            setFirstSetting(false)
          }
        } else {
          console.log("erreur dans testProductSql");
        }
      })
      .catch((err) => console.log(err));
  }, [type]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePriceRangeChange = (value) => {
    // Mettez à jour les valeurs du curseur à chaque changement
    setPriceRange(value);
  };

  return (
    <div className="minHeightFullpage productType">
      <QuickButtonMenu/>
      <section>
        <h1>Categorie : {type}</h1>
        <div className="cityAndSortFilterContainer">
          <select onChange={handleCityChange} value={selectedCity}>
            <option value="">Toutes les villes</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select onChange={handleSortChange} value={sortOrder}>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>

        <div className="rangeFilterContainer">
          <label>Gamme de prix:</label>
          <Slider
            range
            min={fixedMinMax[0]}
            max={fixedMinMax[1]}
            value={priceRange}
            onChange={handlePriceRangeChange}
          />
          {priceRange[0]} - {priceRange[1]}
        </div>
      </section>
      <div className="mainEvent">
      {typeProducts &&
        typeProducts
          .filter((product) => selectedCity === '' || product.ville === selectedCity)
          .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
          .sort((a, b) => {
            if (sortOrder === 'asc') {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          })
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
      }
      </div>
    </div>
  );
};

export default Product;
