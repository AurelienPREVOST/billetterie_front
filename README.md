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

## Etape 3 - Modifier l'existant:

<pre>
  project/config.js
</pre>
![image](https://github.com/AurelienPREVOST/billetterie_front/assets/102169301/3477c05d-7c14-48b4-b37c-d7682d7f10b0)


Dans ce projet les images sont herbergées directement sans cloud sur le serveur Node(back). Verifier que la route d'accès est correct entre votre back et front (notamment en production)
