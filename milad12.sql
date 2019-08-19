-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 19, 2019 at 06:08 PM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `milad12`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `mob_no` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `user_name` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `first_name`, `last_name`, `email`, `mob_no`, `image`, `user_name`, `password`) VALUES
(1, 'ali', 'karimi', 'karimi@gmial.com', '09365448822', '', 'ali', '123'),
(2, '', '', '', '', '', 'milad', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `purchased`
--

CREATE TABLE `purchased` (
  `uid` int(11) NOT NULL,
  `vid` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `num` varchar(255) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `purchased`
--

INSERT INTO `purchased` (`uid`, `vid`, `date`, `num`) VALUES
(2, 1, '2019-08-19 21:30:02', 'ab09ad6b-a62b-476d-bcce-dfcebeae860b'),
(2, 2, '2019-08-19 21:29:51', 'c7612367-8e8f-495d-a12c-c36efb0e511c'),
(2, 3, '2019-08-19 21:29:56', '7709d11b-8a6a-4c85-b65a-14f188469177');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` text CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `last_name` text CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `email` text NOT NULL,
  `mob_no` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  `balance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `mob_no`, `image`, `user_name`, `password`, `balance`) VALUES
(1, 'milad', 'babai', 'miladbabai9000@gmail.com', 937047618, 'milad.jpg', 'milad12', '123', 0),
(2, 'mohsen', 'yazdani', 'yazdani@yahoo.com', 937047618, '1065.jpg', 'mohsen24', '123', 573309),
(4, 'milad', 'babai', 'miladnynynynyn', 937, NULL, 'mil12', '123', 0),
(5, 'میلاد', 'بابایی', 'miladbabai9000@gmail.com', 654646, NULL, 'milad1224', '123', 0);

-- --------------------------------------------------------

--
-- Table structure for table `voice`
--

CREATE TABLE `voice` (
  `id` int(11) NOT NULL,
  `voice-name` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `voice-owner` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `voice-cat` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `voice-album` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `voice-text` text COLLATE utf8_persian_ci NOT NULL,
  `voice-img` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `price` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `voice`
--

INSERT INTO `voice` (`id`, `voice-name`, `voice-owner`, `voice-cat`, `voice-album`, `voice-text`, `voice-img`, `price`) VALUES
(1, 'Lalehzaar.mp3', 'ebi', 'pop', 'Lalehzaar', 'LalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaarLalehzaar', 'ebi.jpg', 0),
(2, 'chepesarisasy.mp3', 'میلاد', 'شیش و هشت', 'مسخره بازی', 'تتتتتتتتتتتتتتتتتتتتتتتتتتت', 'bahram.jpg', 100),
(3, 'Andy%20-%20Hana.mp3', 'میلاد ', 'پاپ', ' نمیدونم', 'تتتتتتتتتتتتتتتتتتتتتتتتتتت', '1065.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchased`
--
ALTER TABLE `purchased`
  ADD PRIMARY KEY (`uid`,`vid`),
  ADD KEY `vid` (`vid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voice`
--
ALTER TABLE `voice`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `voice`
--
ALTER TABLE `voice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `purchased`
--
ALTER TABLE `purchased`
  ADD CONSTRAINT `purchased_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `purchased_ibfk_2` FOREIGN KEY (`vid`) REFERENCES `voice` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
