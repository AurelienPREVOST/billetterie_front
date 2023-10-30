import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import iconSearch from '../assets/loupe.svg';
import iconProfil from '../assets/avatar.svg';
import iconBasket from '../assets/ticket.svg';
import iconClose from '../assets/close.svg';
import iconHome from '../assets/home.svg';
import iconLogin from '../assets/login.svg';
import iconAdmin from '../assets/admin.svg';
import { selectUser } from '../slices/userSlice';
import { searchEventsWithKeyWord } from '../api/product';

const Header = () => {
  const user = useSelector(selectUser);
  const [searchResult, setSearchResult] = useState([]);
  const searchBarRef = useRef(null)
  const inputSearchRef = useRef(null)

  useEffect(() => {
    searchBarRef.current = document.querySelector('#searchBarDiv')
    inputSearchRef.current = document.querySelector('#inputSearch')
  }, [])

  const toggleDisplaySearchBar = () => {
    const screenCoveringFilter = document.querySelector('#screenCoveringFilter')
    screenCoveringFilter.classList.toggle("hidden")
    screenCoveringFilter.classList.toggle("opacity")

    if (searchBarRef.current) {
      searchBarRef.current.classList.toggle("initialTopPositon")
      searchBarRef.current.classList.toggle("usefullPosition")
    }
  }

  const onClickResultOrCloseSearchBar = () => {
    let searchResultList = document.querySelector('#searchResultList')
    searchResultList.classList.add("hidden")

    if (inputSearchRef.current) {
      inputSearchRef.current.value = ""
    }

    setSearchResult([]);
    inputSearchRef.current.classList.remove("borderR24pxTLandTR")
    inputSearchRef.current.classList.add("borderR24px")
  };

  const searchResultsPreview = (keyword) => {
    if (keyword.length === 0) {
      if (inputSearchRef.current) {
        inputSearchRef.current.classList.add("borderR24px")
        inputSearchRef.current.classList.remove("borderR24pxTLandTR")
      }
    }
    if (keyword.length > 0) {
      if (inputSearchRef.current) {
        inputSearchRef.current.classList.remove("borderR24px")
        inputSearchRef.current.classList.add("borderR24pxTLandTR")
      }
    }
    searchEventsWithKeyWord(keyword)
      .then((res) => {
        setSearchResult(res.result);
      })
      .catch((err) => {
        console.log("bug=>", err);
      });
  };

  return (
    <header>
      <Link to="/"><img src={iconHome} alt="home" aria-label="Accueil" /></Link>
        <img src={iconSearch} onClick={toggleDisplaySearchBar} alt="loupeClickable" aria-label="Rechercher" />
      <div id="searchBarDiv" className="initialTopPositon">
      <label htmlFor="inputSearch" className="hidden">Rechercher</label>
        <input
          id="inputSearch"
          placeholder="Rechercher un évènement"
          type="text"
          className="borderR24px"
          onChange={(e) => {
            searchResultsPreview(e.currentTarget.value);
          }}
        />
        <img id="hideSearchBar" alt="Fermer la recherche" src={iconClose} onClick={() => {
          toggleDisplaySearchBar();
          onClickResultOrCloseSearchBar();
        }}/>
        {inputSearchRef.current && inputSearchRef.current.value.length > 0 ? (
          searchResult.length > 0 ? (
            <table id="searchResultList">
              <tbody>
                {searchResult.map((sr) => (
                  <tr key={sr.id}>
                    <td>
                    <Link to={`/detail/${sr.id}`} onClick={() => {
                      toggleDisplaySearchBar();
                      onClickResultOrCloseSearchBar();
                    }} aria-label={`Détails de ${sr.name}`}>
                      {sr.name}
                    </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table id="searchResultList">
              <tbody>
                <tr>
                  <td><p>Aucuns résultats...</p></td>
                </tr>
              </tbody>
            </table>
          )
        ) : null}
      </div>
      <Link to="/basket"><img src={iconBasket} alt="basket" aria-label="Panier" /></Link>
      {user.isLogged ? (
        <>
          {user.infos.role === 'admin' ? (
            <Link to="/admin"><img src={iconAdmin} alt="admin" aria-label="portail admin" /></Link>
          ) : (
            <Link to="/profil"><img src={iconProfil} alt="profil" aria-label="portail utilisateur"/></Link>
          )}
        </>
      ) : (
        <Link to="/login"><img id="profil" src={iconLogin} alt="profil" aria-label="Se connecter" /></Link>
      )}
      <div id="screenCoveringFilter" className="hidden"></div>
    </header>
  );
};

export default Header;
