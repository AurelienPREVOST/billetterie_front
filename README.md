# Instructions

Bonjour,

Cette application est une billetterie qui fonctionnera de concert avec le repo billetterie_back.
Uniquement la partie front-end se trouve ici, codé en REACT 18.

## Etape 1 - instancier un nouveau projet sous vite (React, Javascript):

```bash
npm create vite@latest
```

## Etape 2 - installer les dependances suivantes :

````bash
npm i @fortawesome/fontawesome-svg-core @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @reduxjs/toolkit @stripe/react-stripe-js @stripe/stripe-js axios moment react-redux react-router-dom redux redux-thunk sass html5-qrcode qrcode qrcode.react chai mocha sinon sinon-chai
````


OU 
```bash
git clone https://github.com/AurelienPREVOST/billetterie_back.git
nom_du_projet
cd nom_du_projet
npm install
npm run dev
```

## Etape 3 - Modifier l'existant:

```plaintext
projet/config.js
```
![image](https://github.com/AurelienPREVOST/billetterie_front/assets/102169301/3477c05d-7c14-48b4-b37c-d7682d7f10b0)


Dans ce projet les images sont herbergées directement sans cloud sur le serveur Node(back). Verifier que la route d'accès est correct entre votre back et front (notamment en production)


```plaintext
projet/src/containers/payment.jsx
```
![image](https://github.com/AurelienPREVOST/billetterie_front/assets/102169301/b6cb8786-fdfa-4a7c-8478-5b28991e99b6)

On modifie ici la clé publique en mettant celle de test disponible sur son profil stripe . Si pas de profil, créez un profil stripe gratuitement sur https://dashboard.stripe.com/register




## Etape 4 - Lancer le serveur front

```bash
npm run dev
```
