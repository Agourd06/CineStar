# Application de Gestion de Cinéma

## Contexte
Cette application permet de gérer les films, les réservations, les salles, les séances et les places disponibles dans un cinéma. Elle offre des fonctionnalités pour les clients et les administrateurs, avec un accent sur la sécurité et l'authentification.

## Objectifs
- Gérer les films, les séances, les salles et les réservations.
- Authentifier les utilisateurs (clients et administrateurs).
- Permettre aux administrateurs de gérer d'autres administrateurs et l'ensemble du système.
- Exiger l'authentification des clients pour effectuer des réservations.

## Fonctionnalités
### Utilisateurs
- **Inscription et Connexion**: Création de comptes pour les clients et les administrateurs.
- **Gestion des Administrateurs**: Création, modification et suppression des comptes administrateurs.

### Films et Séances
- **Gestion des Films**: Ajout, modification et suppression des films.
- **Gestion des Salles**: Définition des caractéristiques des salles.
- **Planification des Séances**: Organisation des séances avec horaires et tarifs.

### Réservations
- **Réservation de Places**: Les clients peuvent réserver des places après authentification.
- **Confirmation par Email**: Envoi d'une confirmation et des détails de réservation.
- **Historique des Réservations**: Consultation des réservations passées.

## Technologies
- **Backend**: Node.js avec Express.js pour créer une API RESTful.
- **Base de Données**: MongoDB avec Mongoose pour la gestion des données.
- **Authentification**: JWT (JSON Web Token) pour sécuriser les sessions.

## Installation
1. Clonez le dépôt : `git clone <(https://github.com/sanaahamliri/Cin-Manager.git)>`
2. Installez les dépendances : `npm install`
3. Configurez votre environnement.
4. Démarrez l'application : `npm start`

## Contribuer
Pour contribuer, soumettez une demande de tirage (pull request) après avoir discuté de vos modifications.

## Auteurs
- [Hamliri Sanaa](sanahamlirifr01@gmail.com)

## Licence
Sous licence MIT.
