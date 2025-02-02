# Book_Review_et_Management_Service

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

Il est recommandé d’installer npm pour mieux gérer les versions de Node.

- [Node.js](https://nodejs.org/) (version 16.14.2 ou supérieure)
- [MongoDB](https://www.mongodb.com/) (version 4.0.3 ou supérieure)
- [Git](https://github.com/AzizBenIsmail/Book_Review_et_Management_Service) (pour cloner le dépôt)

# Tester les Routes

Pour tester les routes de l'API, vous pouvez utiliser un outil comme [Postman](https://www.postman.com/) 

! Important : Une base de données sera automatiquement créée (si elle n'existe pas déjà) et remplie avec des données d'exemple pour faciliter les tests. Cela vous permet de gagner du temps en ayant des données prêtes à l'emploi lors de vos tests. 

### Utilisateurs ajoutés par défaut :

- **admin** : 
  - Email : admin.tn@gmail.com
  - Mot de passe : Azerty123&
  - Rôle : admin
- **client** : 
  - Email : client.tn@gmail.com
  - Mot de passe : Azerty123&
  - Rôle : user
- **client1** : 
  - Email : client1.tn@gmail.com
  - Mot de passe : Azerty123&
  - Rôle : user

### Livres ajoutés par défaut :

1. **To Kill a Mockingbird** (Harper Lee) - Genre : Fiction
2. **1984** (George Orwell) - Genre : Dystopian
3. **The Great Gatsby** (F. Scott Fitzgerald) - Genre : Classic
4. **Pride and Prejudice** (Jane Austen) - Genre : Romance
5. **Moby-Dick** (Herman Melville) - Genre : Adventure
6. **The Catcher in the Rye** (J.D. Salinger) - Genre : Coming of Age
7. **The Hobbit** (J.R.R. Tolkien) - Genre : Fantasy
8. **Fahrenheit 451** (Ray Bradbury) - Genre : Science Fiction
9. **Crime and Punishment** (Fyodor Dostoevsky) - Genre : Crime
10. **The Picture of Dorian Gray** (Oscar Wilde) - Genre : Philosophical

Ces données sont insérées automatiquement lorsque vous exécutez le serveur pour la première fois. Elles vous permettent de tester rapidement les fonctionnalités de votre API sans avoir besoin de les insérer manuellement.


### 1. **Installer les dépendances**

```bash
npm install
``` 
### 2. **Configurer l'environnement**

Créez un fichier .env à la racine du projet et ajoutez les variables d'environnement suivantes :

! Important : Dans cet exemple, j'ai pusher le dotenv pour faciliter la tâche .

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
### 4. **Routes disponibles**

! Important : il faut être authentifié pour tester les routes.

#### 1. **Utilisateurs**
```bash
GET /users/getAllUsers - Récupère tous les utilisateurs.  

POST /users/register - Enregistre un nouvel utilisateur.

body :{
        "email": "admin.tn@gmail.com",
        "userName" : "user1",
        "password": "Azerty123&"
    }

POST /users/login - Connecte un utilisateur.

body :{
        "email": "admin.tn@gmail.com",
        "password": "Azerty123&"
    }

GET /users/logout - Déconnecte un utilisateur.

DELETE /users/deleteUserById/:id - Supprime un utilisateur par son ID.
``` 
#### 2. **Livres**

```bash
GET /books/getAllBooks - Récupère tous les livres.

POST /books/addBook - Ajoute un nouveau livre.

form-date avec une image 

PUT /books/updateBook/:id - Met à jour un livre par son ID.

GET /books/getBookById/:id - Récupère un livre par son ID.

GET /books/searchBooks - Recherche des livres.

body : {
    "title":"javaScript",
    "author":"AzizBenIsmail",
    "genre":"dev"
}

GET /books/searchFilterBooks?title=javaScript&author=AzizBenIsmail&genre=web&page=1&limit=2 - Recherche et filtre des livres.

DELETE /books/deleteBookById/:id - Supprime un livre par son ID.
``` 
#### 3. **Commentaires**

```bash
GET /reviews/getAllReviws - Récupère tous les commentaires.

POST /reviews/addReview/:id - Ajoute un commentaire à un livre.

bpdy : {
    "rating" : 4.5,
    "comment" : "bad news "
}

PUT /reviews/updateReview/:id - Met à jour un commentaire par son ID.

bpdy : {
    "rating" : 4.5,
    "comment" : "bad news "
}

DELETE /reviews/deleteReviewById/:id - Supprime un commentaire par son ID. 
``` 