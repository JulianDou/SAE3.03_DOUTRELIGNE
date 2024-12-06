Pour cet examen vous disposez d'une base de code quasi identique à celle qui vous avez été donnée
pour débuter la SAÉ 3.01. A savoir : 
    . api/ : La partie serveur en PHP avec un "router" (index.php) et une organisation en class/controller/repository.
    . client : La partie navigateur en JS/Tailwind avec une organisation en composants avec d'un côté leur ui (src/ui) 
      et de l'autre les données (src/data) obtenues du serveur pour les formater. Les liens entre composants et data 
      et la gestion des événements se faisant au niveau du main.js

Le but de l'examen est d'utiliser cette base pour développer un simple blog en one page (index.html). Pour ce faire, 
vous disposez déjà de 3 composants : 
    . src/ui/header : un composant statique, c'est le titre du blog, il est déjà inclus dans la page principale.
    . src/ui/article : un composant dynamique prévu pour afficher un ou plusieurs articles (issus de la table Articles de votre bdd)
    . src/ui/form : un composant statique qui est un formulaire destiné à saisir un nouvel article.
Note : Vous constaterez que les articles sont présentés avec des images aléatoires (picsum). C'est purement décoratif.

Installation / Configuration du projet :

    - dans votre BDD sur mmi.unilim.fr, importez via PHPMyAdmin le fichier Articles.sql
    - éditez le fichier api/Repository/EntityRepository.php et mettez à jour vos identifiants de connexion à votre BDD
    - uploadez le dossier api sur votre hébergement mmi.unilim.fr (à faire à chaque modification)
    - éditez le fichier client/src/lib/api-request.js et mettez à jour la variable API_URL


Questions / Etapes 

A. CONSULTER LES ARTICLES DISPONIBLES

    A.1 api/ : Création d'une route http://.../api/articles en GET pour retourner tous les articles de la BDD

        - api/Class : complétez la classe Article.php en cohérence avec la table Articles de votre BDD.
        - api/Repository : créez et complétez une classe ArticleRepository qui hérite de EntityRepository.
        Vous devez au moins avoir la méthode findAll de fonctionnelle à ce stade.
        - api/Controller : créez et complétez une classe ArticleController qui hérite de Controller.php. 
        A ce stade vous devez au moins avoir la méthode processGetRequest de fonctionnelle.
        - éditez index.php pour activer la route (et testez là via le navigateur directement)

    A.2 client/ : Visualisation des articles de la BDD 

        - src/data : créez un fichier/module article.js qui déclare/exporte un objet ArticleData contenant une méthode 
        asynchrone fetchAll. Cette méthode interroge la partie serveur pour obtenir les articles disponibles.
        - src/ : éditez le fichier main.js de sorte qu'au lancement de l'application, on récupère les données des articles
        que l'on affichera (dans la section #main) à l'aide du composant src/ui/article.


B. POSTER DE NOUVEAUX ARTICLES
    
    B.1 api/ : Activez la route http://.../articles en POST pour enregistrer un nouvel article dans la BDD. 
        Mettre à jour tous les fichiers/class nécessaires.

    B.2 client/ : Ajoutez le composant src/ui/form en bas de page (section #form). Editez src/data/article.js pour ajouter 
        une méthode save à ArticleData qui enverra en POST un article à l'api serveur. Editez main.js pour, 
        lorsque l'on valide le formulaire, ses données soient envoyées au serveur.


C. SUPPRIMER DES ARTICLES

    C.1 api/ : Activez la route http://.../articles en DELETE.

    C.2 client/ : Apportez les modifications nécessaire pour faire apparaître une "x" sur chaque article
        et le supprimer si l'on clique dessus


D. EDITER DES ARTICLES
Apportez toutes les modifications utiles pour permettre la modification des messages (par exemple en cliquant sur 
un symbole "crayon" ou un bouton "modifier"). Attention, vous aurez certainement besoin de compléter des choses 
dans src/lib/api-request.js.
