-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2023 at 01:05 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digistream`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(10, 'testemail@gmail.com', '$2b$10$aoA0UE4oQBYxNgVJ.8ldZ.XqpJRtGR98uKdL.YI0TWyVOWijiEIc.'),
(11, 'testeremail@gmail.com', '$2b$10$veIrhNTODpJcDnlFVmqYUusUu17nUg7s69fhBqLcARm0B.HOr8VXW'),
(12, 'patel826@uwindsor.ca', '$2b$10$xE60xIbSEk1V.tBvs949oeL74bd333H57BKgZmZ5w74OAIPo4hq66'),
(13, 'patel8266@uwindsor.ca', '$2b$10$PkEvWX.gQGPzwAlZk/n0VuwdD4JqFgV0wA4ONRSWzFVhT.NtqDZ6a'),
(14, 'patelnaiket08@gmail.com', '$2b$10$h56oAK2wxVMOqhXLr0IKNeAzrFsVPrGYcKQxdLpfHU.tU5Pu9VUmi');

-- --------------------------------------------------------

--
-- Table structure for table `web3users`
--

CREATE TABLE `web3users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `walletaddress` varchar(255) DEFAULT NULL,
  `subscriber` tinyint(1) DEFAULT NULL,
  `subscriptionTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `expiryTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web3users`
--

INSERT INTO `web3users` (`id`, `walletaddress`, `subscriber`, `subscriptionTime`, `expiryTime`) VALUES
(5, '0xd2BBb0650eaeCE5b60f9D38253f076EEDC4270Eb', 0, '2023-08-01 22:56:49', '2023-10-31 15:56:21'),
(16, '0xAbCdEfGhIjKlMnOpQrStUvWxYz', 1, '2023-08-01 19:39:28', '2023-11-01 00:00:00'),
(17, '0xZzYxWwVvUtSrQpOnMlKjIhGfEdCbA', 0, '2023-08-01 19:39:28', '2023-11-01 00:00:00'),
(18, '0xHhGgFeDcBaZzXxVuTsQpOnMlKiJhY', 1, '2023-08-01 19:39:28', '2023-11-01 00:00:00'),
(19, '0xYuWxVvTrSpQoNmLkIjHgFeDcBaZzX', 0, '2023-08-01 19:39:28', '2023-11-01 00:00:00'),
(20, '0xMnOpQrStUvWxYzAbCdEfGhIjKlYxW', 1, '2023-08-01 19:39:28', '2023-11-01 00:00:00'),
(21, '0xGgFeDcBaZzXxVuTsQpOnMlKjIhYwV', 0, '2023-08-01 19:39:28', '2023-11-01 00:00:00'),
(22, '0xQrStUvWxYzAbCdEfGhIjKlMnOpYxW', 1, '2023-08-01 19:39:28', '2023-11-01 00:00:00'),
(23, '0xIjKlMnOpQrStUvWxYzAbCdEfGhYwV', 0, '2023-08-01 19:39:28', '2023-11-01 00:00:00'),
(24, '0xWxYzAbCdEfGhIjKlMnOpQrStUvYzX', 1, '2023-08-01 19:39:28', '2023-11-01 00:00:00'),
(25, '0xAaBbCcDdEeFfGgHhIiJjKkLlMmNnOo', 0, '2023-08-01 19:39:28', '2023-11-01 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `web3users`
--
ALTER TABLE `web3users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `web3users`
--
ALTER TABLE `web3users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
