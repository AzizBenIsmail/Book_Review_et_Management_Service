# Book_Review_et_Management_Service

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 16.14.2 ou supérieure)
- [MongoDB](https://www.mongodb.com/) (version 4.0.3 ou supérieure)
- [Git](https://github.com/AzizBenIsmail/Book_Review_et_Management_Service) (pour cloner le dépôt)

# Tester les Routes

Pour tester les routes de l'API, vous pouvez utiliser un outil comme [Postman](https://www.postman.com/) 

### 1. **Installer les dépendances**

```bash
npm install
``` 
### 2. **Configurer l'environnement**

Créez un fichier .env à la racine du projet et ajoutez les variables d'environnement suivantes :

```bash
PORT=5000
Net_Secret=votre_clé_secrète
MONGO_URI=mongodb://localhost:27017/votre_base_de_données 
``` 

### 3. **Lancer le Serveur**

Lorsque vous démarrez le serveur en utilisant la commande : 

```bash
npm run dev 
``` 

### 4. **Lancer le Serveur**

Lorsque vous démarrez le serveur en utilisant la commande : 

```bash
npm run dev 
``` 
### 5. **Routes disponibles**

#### 1. **Utilisateurs**
```bash
GET /users/getAllUsers - Récupère tous les utilisateurs.

POST /users/register - Enregistre un nouvel utilisateur.

POST /users/login - Connecte un utilisateur.

GET /users/logout - Déconnecte un utilisateur.

DELETE /users/deleteUserById/:id - Supprime un utilisateur par son ID.
``` 
#### 2. **Livres**

```bash
GET /books/getAllBooks - Récupère tous les livres.

POST /books/addBook - Ajoute un nouveau livre.

PUT /books/updateBook/:id - Met à jour un livre par son ID.

GET /books/getBookById/:id - Récupère un livre par son ID.

GET /books/searchBooks - Recherche des livres.

GET /books/searchFilterBooks - Recherche et filtre des livres.

DELETE /books/deleteBookById/:id - Supprime un livre par son ID.
``` 
#### 3. **Commentaires**

```bash
GET /reviews/getAllReviws - Récupère tous les commentaires.

POST /reviews/addReview/:id - Ajoute un commentaire à un livre.

PUT /reviews/updateReview/:id - Met à jour un commentaire par son ID.

DELETE /reviews/deleteReviewById/:id - Supprime un commentaire par son ID. 
``` 