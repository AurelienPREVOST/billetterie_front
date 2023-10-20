<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




////////////////////////////////////////

Developpement à concevoir:

dans le checkout-form il faut faire la requete en DB checkSeatStatus et décommentez la partie du code qui permet de verifier avant une tentative de paiement que les places présente au panier sont toujours au status available. Sinon on ârrete tout
on peut verifier si l'user_id est null tout simplement sur chaque place.

faire une zone litige client ou on retrouve tout les tickets acheté soit avec un email soit avec un nom et prenom ou un telephone

WIP - il faut ajouter un type de spectacle pour avoir un front detail différent et un selecteur de genre en dessous de la navbar à l'acceuil plus un menu burger ailleurs

quand on clic sur le numero de la place ca bug car l'addeventlistener n'est pas sur la div


probleme sur les sieges ca devrait plutot etre l'index qui s'affiche à l'utilisateur et dans le panier car sinon les chiffres vont etre d'ordre de grandeur enorme à terme
<!--
VOIR UNE BANDE ANNONCE DANS LE DETAIL IFRAME YOUTUBE
AJOUTER LE LINK EMBED ET LE HTML+JS AVEC EXTENSION AUTOPLAY MUTE ET COMMANDE 0 OU 1 voir chatgpt -->




certifié les requete avec une API_KEY, voir exemple ci dessous:
    <!-- return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`) -->



DANS order.jsx => export function saveOneOrder(datas){

dans datas il y a for each des selected seat id
L'idée serait de les stocké dans table ordersdetails dans une colonne "seats"
grace a ca on pourrait ensuite croisé les id avec la table place et recupéré le code associé

dès lors on peut editer le QRCODE en base 64 et l'envoyer par mail en confirmation de commande.
=======
# billetterie_front
webApp made with a front built in react 18 and a backend built in node JS - db is in SQL and hosted on phpmyadmin. Fonctionne conjointement à billetterie_back
>>>>>>> 32258708e6fb00db00d62d91ed77f85a3babae91
