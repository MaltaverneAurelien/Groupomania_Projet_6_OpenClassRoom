# MySQL commandes
- TRUNCATE TABLE utilisateur; // Permet de supprimer toutes les données d'une table
- SELECT * FROM utilisateur; // Selectionne toutes les colonnes d'une table
- USE groupomania; // Selectionne la base de donnée
- ALTER TABLE utilisateur ADD nom_colonne type_donnee; // Ajoute une colonne dans une table
- INTER INTO utilisateur VALUES (1,username,email,password,admin); // Ajoute un élément dans une table
- DELETE FROM utilisateur WHERE id=5; // Supprime un élément d'une table avec un id

## MySQL Query
USE groupomania;
SELECT username FROM utilisateur WHERE id=2;
SELECT 
posts.title,
posts.postText,
utilisateur.username 
FROM posts
INNER JOIN utilisateur ON utilisateur.id=posts.userId;

// Récupèré le commentaire et le nom de l'utilisateur du commentaire et le titre et texte du posts.
USE groupomania;
SELECT
comments.text,
utilisateur.username,
posts.postText,
posts.title
FROM comments
INNER JOIN utilisateur ON utilisateur.id=comments.userId
INNER JOIN posts ON posts.id=comments.postId;

// Recupere tout les com des post crée par l'user
USE groupomania;
SELECT 
comments.text,
posts.title
FROM comments
INNER JOIN posts ON posts.id=comments.postId
WHERE posts.userId=2;

// Recupere tout les com de tout les posts crée par l'user username : 'test'
USE groupomania;
SELECT 
comments.text,
posts.title
FROM comments
INNER JOIN posts ON posts.id=comments.postId
INNER JOIN utilisateur ON utilisateur.id=posts.userId
WHERE utilisateur.username='test';

// Initialise updateAt à la valeur de createAt puis modifie la valeur updateAt quand il y a une modification
USE groupomania;
ALTER TABLE utilisateur
 CHANGE updateAt
 updateAt TIMESTAMP NOT NULL
 DEFAULT CURRENT_TIMESTAMP 
 ON UPDATE CURRENT_TIMESTAMP;

### Colors
- color--primary : #22223B
- color--secondary : #4A4E69
- color--tertiaire : #9A8C98
- color--quaternaire : #C9ADA7
- white--primary : #F2E9E4

#### npm install
- npm install --save react-use-password-validator