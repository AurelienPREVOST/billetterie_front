# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




////////////////////////////////////////

Developpement à concevoir:

dans le checkout-form il faut faire la requete en DB checkSeatStatus et décommentez la partie du code qui permet de verifier avant une tentative de paiement que les places présente au panier sont toujours au status available. Sinon on ârrete tout
on peut verifier si l'user_id est null tout simplement sur chaque place.

<!-- dans le panier il faut supprimer la possibilité de modifier la quantité des places -->
<!-- par contre il faut display les places acheté par evenements et donner la possibilité de les supprimer une a une -->

au niveau des evenements, il faut qu'il y ai plusieurs date de disponible

<!-- au niveau des evements il faut qu'ils aient une localisation et une carte associé pour voir où c'est -->

<!-- on doit afficher aussi l'adresse de l'evenement la date et l'heure dans la fiche produit -->

<!-- dans le profil de l'utilisateur il faut que pour chaque commande l'utilisateur puisse retrouver ses QRCODE associés à ses tickets pour être scanné avant de rentrer ainsi que les evenement associé -->


il doit recevoir par mail ses QRCODE et ses evenements associé sous forme de PDF ou en base64


dans le addproduct il faut pouvoir créé plusieurs dates en meme temps en modifiant le formulaire et en ajouter au SQL et à la DB la colonne associé

faire du front bien sûr en commencant par mobile first


<!-- dans la partie admin intégrer un lecteur de QR CODE via la webcam -->
<!-- une fois le code QR scanné requete a la db pour verifié si le statut est à "sold"(verifier en db le nom) et si c'est le cas passé le status à "used" en db -->

<!-- si la date de l'evenement est inférieur à la date du jour il faut que les tickets passe en perimé dans le profil
(evenement passé et evenement à venir) -->

<!-- la latitude et la longitude doivent être donné a la creation d'un spectacle -->

<!-- dans le panier on doit voir la photo du spectacle en cours d'achat -->


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
