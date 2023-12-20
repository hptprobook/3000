-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: 3000
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `quantity` bigint(20) unsigned NOT NULL,
  `variants` varchar(128) NOT NULL,
  `price` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  KEY `cart_items_cart_id_foreign` (`cart_id`),
  CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (4,1,20,1,'',21000000),(5,1,19,1,'',21000000),(13,1,15,1,'[]',20000000),(14,1,11,7,'[]',20000000),(45,3,19,1,'[]',21000000);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_user_id_foreign` (`user_id`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,13,'2023-11-06 01:19:44','2023-11-06 01:19:44'),(2,14,'2023-12-03 04:53:18','2023-12-03 04:53:18'),(3,49,'2023-12-19 06:34:13','2023-12-19 06:34:13');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `quantity` tinyint(20) unsigned NOT NULL,
  `discount` tinyint(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_details_product_id_foreign` (`product_id`),
  KEY `order_details_order_id_foreign` (`order_id`),
  CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (8,9,11,6,0),(9,9,10,2,0),(10,12,11,1,0),(11,13,11,1,0),(12,14,11,1,0),(13,15,11,1,0),(14,16,11,1,0),(15,17,11,1,0),(16,18,10,1,0),(17,18,11,1,0),(18,19,11,1,0),(19,20,13,1,0),(20,21,13,1,0);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `total_amount` bigint(20) unsigned NOT NULL,
  `ship_fee` int(11) unsigned NOT NULL,
  `address_id` bigint(20) unsigned NOT NULL,
  `status` varchar(50) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  KEY `orders_address_id_foreign` (`address_id`),
  CONSTRAINT `orders_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (8,14,500000,400000,45,'cancelled',NULL,'2023-12-16 20:42:10','2023-12-17 01:32:10'),(9,14,160828002,828002,48,'processing',NULL,'2023-12-16 20:55:12','2023-12-17 01:32:24'),(10,14,160828002,828002,48,'delivered',NULL,'2023-12-16 20:57:18','2023-12-17 01:57:03'),(11,14,160828002,828002,48,'delivered',NULL,'2023-12-16 20:57:30','2023-12-17 01:34:59'),(12,14,20115500,115500,48,'cancelled',NULL,'2023-12-16 20:59:41','2023-12-17 01:38:06'),(13,14,20115500,115500,48,'refunded',NULL,'2023-12-16 21:00:37','2023-12-17 01:36:24'),(14,14,20115500,115500,48,'pending',NULL,'2023-12-17 00:13:17','2023-12-17 01:40:04'),(15,14,20115500,115500,48,'pending',NULL,'2023-12-17 00:15:50','2023-12-17 01:43:38'),(16,14,20115500,115500,48,'cancelled',NULL,'2023-12-17 01:28:22','2023-12-17 01:47:46'),(17,14,20115500,115500,48,'pending',NULL,'2023-12-17 01:48:11','2023-12-17 01:48:11'),(18,14,40228002,228002,48,'pending',NULL,'2023-12-18 01:14:56','2023-12-18 01:14:56'),(19,14,18105500,105500,48,'pending',NULL,'2023-12-18 08:46:18','2023-12-18 08:46:18'),(20,49,20000000,0,49,'delivered',NULL,'2023-12-19 07:08:13','2023-12-19 20:43:40'),(21,49,20000000,0,49,'pending',NULL,'2023-12-19 07:59:08','2023-12-19 07:59:08');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-20 11:00:29
