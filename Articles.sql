-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mar. 05 nov. 2024 à 09:52
-- Version du serveur :  5.7.34
-- Version de PHP : 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Structure de la table `Articles`
--

CREATE TABLE `Articles` (
  `id` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Articles`
--

INSERT INTO `Articles` (`id`, `title`, `content`, `date`) VALUES
(20, 'Les nouveautés de JavaScript ES2023', 'Découvrez les dernières fonctionnalités de JavaScript ES2023 qui vont révolutionner votre façon de coder. De nouvelles syntaxes plus concises aux améliorations de la performance, cet article vous présente tout ce que vous devez savoir.', '2024-01-15 00:00:00'),
(21, 'React vs Angular vs Vue : quel framework choisir en 2024 ?', 'Le choix du framework JavaScript est crucial pour le développement d\'applications web modernes. Comparons les avantages et inconvénients de React, Angular et Vue pour vous aider à prendre la meilleure décision.', '2024-02-08 00:00:00'),
(22, 'Introduction à GraphQL : un langage de requête pour les API', 'Découvrez GraphQL, un langage de requête pour les API qui permet de récupérer exactement les données dont vous avez besoin. Plus efficace et flexible que les API REST traditionnelles, GraphQL est l\'avenir du développement d\'API.', '2024-03-05 00:00:00'),
(23, 'Optimiser les performances de votre application web : conseils pratiques', 'Apprenez à optimiser la vitesse de chargement et les performances de votre application web grâce à des techniques de minification, de compression et de mise en cache. Découvrez également comment améliorer l\'expérience utilisateur.', '2024-04-12 00:00:00'),
(24, 'Sécurité web : comment protéger votre application des attaques les plus courantes', 'La sécurité web est une priorité absolue. Découvrez les principales vulnérabilités web et apprenez à les prévenir grâce à de bonnes pratiques de développement.', '2024-05-19 00:00:00'),
(25, 'Développement d\'une application mobile hybride avec Flutter', 'Flutter, le SDK de Google pour créer des applications mobiles multiplateformes, est de plus en plus populaire. Découvrez comment développer une application mobile performante et native à l\'aide de Flutter.', '2024-06-26 00:00:00'),
(26, 'Introduction au machine learning : créer votre premier modèle prédictif', 'Le machine learning est une branche de l\'intelligence artificielle qui permet aux machines d\'apprendre à partir de données. Découvrez comment créer votre premier modèle de prédiction avec Python et scikit-learn.', '2024-07-13 00:00:00'),
(27, 'Les bases de la programmation back-end avec Node.js', 'Node.js est un environnement d\'exécution JavaScript qui vous permet de développer des applications web côté serveur. Découvrez les fondamentaux de Node.js et comment créer votre première API.', '2024-08-20 00:00:00'),
(28, 'Intégrer des paiements sécurisés dans votre application web', 'Acceptez les paiements en ligne en toute sécurité grâce à des passerelles de paiement comme Stripe ou PayPal. Découvrez les meilleures pratiques pour intégrer des paiements dans votre application web.', '2024-09-27 00:00:00'),
(29, 'Les tendances du développement web en 2024', 'Quelles sont les technologies et les tendances qui vont marquer le développement web en 2024 ? Découvrez les nouveautés à suivre de près pour rester à la pointe.', '2024-10-14 00:00:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Articles`
--
ALTER TABLE `Articles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Articles`
--
ALTER TABLE `Articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
