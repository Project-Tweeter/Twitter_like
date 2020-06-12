-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Ven 12 Juin 2020 à 15:54
-- Version du serveur :  5.7.30-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Twitter`
--

-- --------------------------------------------------------

--
-- Structure de la table `follows`
--

CREATE TABLE `follows` (
  `id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL,
  `followed_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `follows`
--

INSERT INTO `follows` (`id`, `follower_id`, `followed_id`) VALUES
(1, 7, 5),
(2, 7, 6);

-- --------------------------------------------------------

--
-- Structure de la table `tweets`
--

CREATE TABLE `tweets` (
  `tweet_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(140) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `tweets`
--

INSERT INTO `tweets` (`tweet_id`, `user_id`, `content`, `created_at`) VALUES
(17, 6, 'I\'M BATMAN !', '2020-06-01 18:39:11'),
(18, 5, 'Salut Batman !', '2020-06-01 19:39:26'),
(22, 8, 'Hello tout le monde !', '2020-06-02 11:19:43'),
(26, 7, '« Peu importe ce qu’on pourra vous dire, les mots et les idées peuvent changer le monde. »', '2020-06-03 11:16:01'),
(38, 7, 'Je recherche un stage pour le mois de Septembre 2020 ! ', '2020-06-11 20:07:30'),
(40, 7, 'Contactez moi sur mon Linkedin : https://www.linkedin.com/in/andreia-pena/', '2020-06-12 14:40:08');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` text NOT NULL,
  `birthday` date NOT NULL,
  `password` text NOT NULL,
  `username` varchar(20) NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `birthday`, `password`, `username`, `link`) VALUES
(5, 'Mobil', 'Play', 'playmobyl@google.com', '2020-06-17', '$2a$12$xyk0gzcc/YDszvNlBglqQO4pS79Etoy8oI4MsRXpjsjxjUzFFfSW6', 'Playmobil', 'https://randomuser.me/api/portraits/lego/1.jpg'),
(6, 'Hadef', 'Amine', 'amine@google.fr', '2020-06-16', '$2a$12$nh7o6q.LxQayeaOvv3/gPenM8XyNgnLXfcytkfegHmbG5WRaX8/cm', 'Batman', 'https://randomuser.me/api/portraits/lego/2.jpg'),
(7, 'Pena Ferreira', 'Andreia', 'andreia.pena.ferreira@gmail.com', '2020-06-10', '$2a$12$Bl0EB0v4r96Idcnww18q8esTNh4Ve8iLxg2wkkFWyl8uvBlV4Kzly', 'andreia', 'https://randomuser.me/api/portraits/lego/9.jpg'),
(8, 'El Housny', 'Imane', 'amine@google.com', '2020-06-09', '$2a$12$J6WFHRJCi55tBqGLroMlLu7fqhWKNfOZBpYe/SIpWaWzZJCNMvFme', 'WonderWoman', 'https://randomuser.me/api/portraits/lego/4.jpg'),
(13, 'Ferreira', 'Jude', 'google@google.com', '2016-06-01', '$2a$12$JECGHpixP1X24rW6u./D6uTXwWJ3QDvCMUV/q84PJnanvWNDlfLq6', 'Judy', 'https://randomuser.me/api/portraits/lego/5.jpg');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tweets`
--
ALTER TABLE `tweets`
  ADD PRIMARY KEY (`tweet_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `follows`
--
ALTER TABLE `follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `tweets`
--
ALTER TABLE `tweets`
  MODIFY `tweet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
