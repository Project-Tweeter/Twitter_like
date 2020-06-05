-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Ven 05 Juin 2020 à 15:58
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
-- Structure de la table `Follow`
--

CREATE TABLE `Follow` (
  `id_follower` int(11) NOT NULL,
  `id_followed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Follow`
--

INSERT INTO `Follow` (`id_follower`, `id_followed`) VALUES
(7, 5),
(5, 6),
(7, 8),
(7, 6),
(6, 8);

-- --------------------------------------------------------

--
-- Structure de la table `Tweet`
--

CREATE TABLE `Tweet` (
  `Id_tweet` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `content` varchar(140) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Tweet`
--

INSERT INTO `Tweet` (`Id_tweet`, `id_user`, `content`, `created_at`) VALUES
(16, 5, 'Bonjour !', '2020-06-01 18:38:19'),
(17, 6, 'I\'M BATMAN !', '2020-06-01 18:39:11'),
(18, 5, 'Salut Batman !', '2020-06-01 19:39:26'),
(19, 6, 'Salut Andreia !', '2020-06-01 19:39:46'),
(20, 7, 'Hello Batman et Andreiaa !', '2020-06-01 23:00:50'),
(22, 8, 'Hello tout le monde !', '2020-06-02 11:19:43'),
(26, 7, '« Peu importe ce qu’on pourra vous dire, les mots et les idées peuvent changer le monde. »', '2020-06-03 11:16:01'),
(27, 5, '\" Je veux dire, j\'ai tout ce qu\'il me faut ici avec moi : j\'ai de l\'air dans les poumons et quelques feuilles blanches pour travailler.\"', '2020-06-03 12:00:32'),
(31, 6, 'La colère décuple ta puissance mais si tu la laisses te dominer, elle va te détruire.', '2020-06-05 14:25:36'),
(32, 6, 'Le héros peut être en chacun, même en celui qui fait une chose aussi simple et rassurante que mettre un manteau sur les épaules d’un garçon.', '2020-06-05 14:26:07');

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id_user` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` text NOT NULL,
  `birthday` date NOT NULL,
  `password` text NOT NULL,
  `username` varchar(20) NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `User`
--

INSERT INTO `User` (`id_user`, `nom`, `prenom`, `email`, `birthday`, `password`, `username`, `link`) VALUES
(5, 'Pena', 'Andreia', 'andreia@google.com', '2020-06-17', '$2a$12$xyk0gzcc/YDszvNlBglqQO4pS79Etoy8oI4MsRXpjsjxjUzFFfSW6', 'Andreiaa', 'https://randomuser.me/api/portraits/lego/1.jpg'),
(6, 'Hadef', 'Amine', 'amine@google.fr', '2020-06-16', '$2a$12$nh7o6q.LxQayeaOvv3/gPenM8XyNgnLXfcytkfegHmbG5WRaX8/cm', 'Batman', 'https://randomuser.me/api/portraits/lego/2.jpg'),
(7, 'Kabongo', 'Léonardo', 'leo@google.com', '2020-06-10', '$2a$12$Bl0EB0v4r96Idcnww18q8esTNh4Ve8iLxg2wkkFWyl8uvBlV4Kzly', 'KFC', 'https://randomuser.me/api/portraits/lego/3.jpg'),
(8, 'El Housny', 'Imane', 'amine@google.com', '2020-06-09', '$2a$12$J6WFHRJCi55tBqGLroMlLu7fqhWKNfOZBpYe/SIpWaWzZJCNMvFme', 'WonderWoman', 'https://randomuser.me/api/portraits/lego/4.jpg');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Tweet`
--
ALTER TABLE `Tweet`
  ADD PRIMARY KEY (`Id_tweet`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Tweet`
--
ALTER TABLE `Tweet`
  MODIFY `Id_tweet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
