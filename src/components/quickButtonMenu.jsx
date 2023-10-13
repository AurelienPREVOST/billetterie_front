import { Link } from 'react-router-dom';

const quickButtonMenu = () => {

  const buttonTypes = ['theatre', 'opera', 'concert', 'onemanshow', 'sportevent', 'enfants', 'cabaret'];

  return (
    <div className="quickButtonMenu">
    {buttonTypes.map((type, index) => (
      <Link key={index} to={{ pathname: `/product/${type}` }}>
        <button>{type.toUpperCase()}</button>
      </Link>
    ))}
    </div>
  );
};

export default quickButtonMenu;
