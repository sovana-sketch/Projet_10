<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Prérequis
Pour démarrer cet applicatif web vous devez avoir les outils suivants:
- Docker
- NodeJs

# Installation et démarrage
Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
Pour démarrer l'API avec ça base de données.
```
docker compose up -d
```
# Pour démarrer le frontend de l'applicatif
Rendez-vous dans le dossier frontend
```
cd ./frontend
```
Installez les dépendances du projet
```
npm i
ou
npm install (si vous préférez)
```
## Tests automatisés Cypress

Ce projet teste le site Eco Bliss Bath avec Cypress.

Les tests couvrent l'API, la connexion et le panier.

## Prérequis

- Docker, pour l'API et la base de données.
- Node en version 22 ou plus.
- Un navigateur Chrome ou Firefox.

## Installation

1. À la racine du projet, lance l'API :

```bash
docker compose up -d
```

2. Va dans le dossier du site :

```bash
cd frontend
```

3. Installe les dépendances :

```bash
npm install
```

4. Démarre le site :

```bash
npm start
```

Le site s'ouvre sur http://localhost:4200.

L'API répond sur http://localhost:8081.

Laisse le site tourner pendant les tests.

## Lancer les tests

Les commandes se tapent dans le dossier `frontend`.

L'API et le site doivent déjà être démarrés.

### Avec l'interface

```bash
npx cypress open
```

1. Choisis « E2E Testing ».
2. Choisis un navigateur.
3. Clique sur le fichier de test à lancer.

### Dans le terminal

```bash
npx cypress run
```
les 8 fichiers et 31 tests se lancent avec npx cypress run

Tous les tests se lancent sans ouvrir de fenêtre.

Les résultats s'affichent dans le terminal.

## Générer le rapport

Le rapport est une page web.

Il montre les tests réussis et échoués.

On utilise Mochawesome (`cypress-mochawesome-reporter`).

1. Dans `frontend`, installe l'outil :

```bash
npm install --save-dev cypress-mochawesome-reporter
```

2. Dans `cypress.config.ts`, ajoute la ligne `reporter` et la ligne `require` :

```ts
export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
```

3. Dans `cypress/support/e2e.ts`, ajoute cette ligne :

```ts
import 'cypress-mochawesome-reporter/register';
```

4. Lance les tests :

```bash
npx cypress run
```

5. Ouvre le rapport dans ton navigateur :
`cypress/reports/html/index.html`

## Structure des tests

Les tests sont dans `frontend/cypress/e2e`.

- `Api_test` : les tests de l'API.
- `Smoke_test` : les tests de base, pour vérifier que le site s'affiche.
- `login.cy.ts` : les tests de connexion.
- `Cart.cy.ts` : le parcours d'achat, de la fiche produit au panier.

Les données de connexion sont dans `cypress/fixtures/user.json`.

La commande `cy.login()` est dans `cypress/support/commands.ts`.