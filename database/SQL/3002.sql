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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `name` varchar(128) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `district_id` int(20) unsigned DEFAULT NULL,
  `province_id` int(20) unsigned DEFAULT NULL,
  `ward_id` int(20) unsigned NOT NULL,
  `street` varchar(128) NOT NULL,
  `address_info` varchar(255) NOT NULL,
  `default` tinyint(1) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `addresses_user_id_foreign` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (45,14,'Phan Thanh Hóa','0332741249',2090,202,22406,'45 Nguyễn Viết Xuân','45 Nguyễn Viết Xuân, Xã Tam Thôn Hiệp, Huyện Cần Giờ, Hồ Chí Minh',0),(48,14,'Phan Thanh Tiến','0942904455',1552,210,400107,'45/19 Nguyễn Viết Xuân','45/19 Nguyễn Viết Xuân, Phường Tân Thành, Thành phố Buôn Ma Thuột, Đắk Lắk',1),(49,49,'Phan Thanh Hóa','0833129021',1552,210,400107,'45/19 Nguyễn Viết Xuân','45/19 Nguyễn Viết Xuân, Phường Tân Thành, Thành phố Buôn Ma Thuột, Đắk Lắk',1),(50,49,'Phan Long','0332741249',3695,202,90767,'45 Nguyễn Viết Xuân','45 Nguyễn Viết Xuân, Phường Bình Trưng Tây, Thành Phố Thủ Đức, Hồ Chí Minh',0),(51,13,'Phan Long','0332741249',2090,202,22406,'45 Nguyễn Viết Xuân','45 Nguyễn Viết Xuân, Xã Tam Thôn Hiệp, Huyện Cần Giờ, Hồ Chí Minh',1);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `icon_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'OPPO','https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp'),(2,'ACER','https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp'),(3,'DELL','https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp'),(4,'ihpone','https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp'),(5,'Phone','https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp'),(6,'Phone','https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp'),(7,'Phone','https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp'),(8,'Phone','https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

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
  `quantity` int(20) unsigned NOT NULL,
  `variants` varchar(128) NOT NULL,
  `price` float unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  KEY `cart_items_cart_id_foreign` (`cart_id`),
  CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (4,1,20,1,'',21000000),(65,3,13,1,'[]',20000000),(66,3,22,15,'[\"4 inch\",\"\\u0110\\u1ecf\"]',2236000),(68,1,11,1,'[]',18000000);
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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `parent_id` tinyint(3) unsigned DEFAULT NULL,
  `icon_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Đồ chơi mẹ và bé',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F1.webp?alt=media&token=24c260cb-e11a-4842-88cc-f53f107bbab0'),(4,'Điện thoại - Máy tính bảng',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F2.webp?alt=media&token=ce86a771-da84-45e0-a83f-98c3f44e520f'),(5,'NGON',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F3.webp?alt=media&token=757b002f-a22c-4d04-9aae-60b14886b4b6'),(6,'Làm đẹp - Sức khoẻ',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F4.webp?alt=media&token=5a31f1ee-b788-4eb3-8381-9c93ef477a98'),(7,'Điện gia dụng',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F5.webp?alt=media&token=efb9a1bd-011a-4a39-96b2-c52b1b4b243e'),(8,'Thời trang nữ',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F6.webp?alt=media&token=84d0afa3-dce1-4fd8-a3d2-4986fe89be14'),(9,'Thời trang nam',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F7.webp?alt=media&token=a280817a-01e5-42a9-99d1-a22cf22022cd'),(10,'Giày - dép nữ',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F8.webp?alt=media&token=357d1db9-0116-4f7b-ad5a-d79211ba631f'),(11,'Túi thời trang nữ',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F9.webp?alt=media&token=8d2ae947-2341-48de-afee-a8f808aa1a4c'),(12,'Giày - dép nam',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F10.webp?alt=media&token=bf651cf9-a069-4dea-af71-3b16c015c7b3'),(13,'Túi thời trang nam',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F11.webp?alt=media&token=ecd30763-fbb1-43cb-9e86-0cb1e723fa3e'),(14,'Balo và Vali',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F12.webp?alt=media&token=7e3efe3a-c32f-4a4f-b5bc-f6da5c4e2021'),(15,'Phụ kiện thời trang',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F13.webp?alt=media&token=ada5d542-fb88-4be3-a2e7-0fbd104506f0'),(16,'Đồng hồ và trang sức',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F14.webp?alt=media&token=1c5255d8-3f50-40a3-ba21-4b5c041253a9'),(17,'Laptop - Máy vi tính - Linh kiện',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F15.webp?alt=media&token=458f8c7c-ca67-4fe1-bc91-ca18dba7fcee'),(18,'Nhà cửa - Đời sống',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F16.webp?alt=media&token=c8cee477-2c4b-4414-9352-940274d46ae2'),(19,'Cross Border - Hàng quốc tế',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F18.webp?alt=media&token=e082797c-aa22-4f2a-bcde-aa218b1942ab'),(20,'Bách hoá Online',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F19.webp?alt=media&token=07758e1a-7a64-4edf-a1df-5c7b27595602'),(21,'Voucher - Dịch vụ',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F20.webp?alt=media&token=32c06764-4127-4dfe-a64d-85de23492aa7'),(22,'Ô tô - Xe máy - Xe đạp',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F21.webp?alt=media&token=c394fd4c-6aff-473e-89c2-e467ada90f3b'),(23,'Nhà sách 3000',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F22.webp?alt=media&token=bb4425eb-b5b8-46b2-960d-cdbfe46c3abf'),(24,'Điện tử - Điện lạnh',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F23.webp?alt=media&token=21b1dbb6-64e4-427f-9da8-e0386399296b'),(25,'Thể thao - Dã ngoại',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F25.webp?alt=media&token=f0752425-1d18-43d8-955a-a5938c58bef4'),(26,'Máy ảnh - Máy quay phim',0,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F26.webp?alt=media&token=82a68d14-b361-48f3-bf11-d4b439569935'),(27,'Đồ chơi',3,'https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FCategories%2F26.webp?alt=media&token=82a68d14-b361-48f3-bf11-d4b439569935');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_usages`
--

DROP TABLE IF EXISTS `coupon_usages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon_usages` (
  `order_id` bigint(20) unsigned DEFAULT NULL,
  `coupon_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `coupon_usages_coupon_id_foreign` (`coupon_id`),
  KEY `coupon_usages_user_id_foreign` (`user_id`),
  KEY `coupon_usages_order_id_foreign` (`order_id`),
  CONSTRAINT `coupon_usages_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `coupon_usages_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `coupon_usages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_usages`
--

LOCK TABLES `coupon_usages` WRITE;
/*!40000 ALTER TABLE `coupon_usages` DISABLE KEYS */;
INSERT INTO `coupon_usages` VALUES (58,9,49,'2023-12-20 02:28:01','2023-12-20 02:28:01'),(59,12,49,'2023-12-20 02:29:48','2023-12-20 02:29:48'),(60,11,49,'2023-12-20 07:19:47','2023-12-20 07:19:47');
/*!40000 ALTER TABLE `coupon_usages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `description` varchar(128) NOT NULL,
  `start_date` date NOT NULL DEFAULT '2023-11-05',
  `end_date` date NOT NULL,
  `amount` int(20) NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `type` enum('percent','direct','ship') NOT NULL DEFAULT 'direct',
  PRIMARY KEY (`id`),
  UNIQUE KEY `coupons_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (9,'FREESHIP','Miễn phí giao hàng','2023-11-08','2023-12-22',100,90,'ship'),(10,'NOELVUIVE','Phiếu mua hàng 500.000đ nhân dịp Noel','2023-11-08','2024-01-21',500000,92,'direct'),(11,'TETNGUYENDAN','Giảm 10% giá trị đơn hàng dịp tết','2023-11-08','2024-01-21',10,90,'percent'),(12,'TETVUIVE','Giảm 5% giá trị đơn hàng dịp tết','2023-11-08','2024-01-21',10,92,'percent');
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (9,'2014_10_12_000000_create_users_table',1),(10,'2014_10_12_100000_create_password_reset_tokens_table',1),(11,'2016_06_01_000001_create_oauth_auth_codes_table',1),(12,'2016_06_01_000002_create_oauth_access_tokens_table',1),(13,'2016_06_01_000003_create_oauth_refresh_tokens_table',1),(14,'2016_06_01_000004_create_oauth_clients_table',1),(15,'2016_06_01_000005_create_oauth_personal_access_clients_table',1),(16,'2019_08_19_000000_create_failed_jobs_table',1),(17,'2019_12_14_000001_create_personal_access_tokens_table',1),(18,'2023_10_31_010943_add_phone_number_to_users_table',2),(19,'2023_10_31_013003_create_categories_table',2),(20,'2023_10_31_122650_add_role_to_users_table',2),(21,'2023_11_01_090923_create_variant_types_table',2),(22,'2023_11_01_085530_create_brands_table',3),(24,'2023_11_01_095748_create_products_table',4),(25,'2023_11_03_023322_create_product_brands_table',4),(27,'2023_11_03_031043_create_product_images_table',5),(28,'2023_11_03_031427_create_reviews_table',5),(30,'2023_11_03_031826_create_tags_table',6),(31,'2023_11_03_075551_create_product_tags_table',6),(32,'2023_11_05_011008_add_status_and_quantity_to_products_table',7),(33,'2023_11_05_011255_add_role_and_status_to_users_table',7),(34,'2023_11_05_013358_create_hcvn_tables',8),(35,'2023_11_05_013937_create_addresses_table',9),(36,'2023_11_05_014804_add_address_id_to_users_table',10),(37,'2023_11_05_022743_create_carts_table',11),(38,'2023_11_05_022755_create_cart_items_table',11),(39,'2023_11_05_030002_create_orders_table',12),(40,'2023_11_05_030020_create_order_details_table',12),(41,'2023_11_05_030044_create_payments_table',12),(42,'2023_11_05_094653_create_coupons_table',13),(43,'2023_11_05_094704_create_coupon_usages_table',13),(44,'2023_11_04_071446_create_posts_table',14),(45,'2023_11_07_074304_add_price_to_cart_items_table',15),(48,'2023_11_08_020902_add_note_to_orders_table',16),(49,'2023_11_08_020843_drop_note_column_in_addresses_table',17),(50,'2023_11_08_034328_add_user_id_to_coupon_usages_table',18),(51,'2023_11_09_023212_create_sellers_table',19),(52,'2023_11_09_023253_add_seller_id_to_product',20),(53,'2023_11_09_033120_create_permission_tables',21),(54,'2023_11_09_091004_add_user_id_to_seller',22),(55,'2023_11_10_093059_create_settings_table',23),(56,'2023_11_13_081451_create_hot_searches_table',24),(57,'2023_11_24_033510_add_sold_to_product',25),(60,'2023_11_30_142048_create_product_variants_table',26),(61,'2023_12_03_133828_add_variants_and_delete_status_carts',27),(63,'2023_12_06_153120_add_province_to_address',28),(64,'2023_12_10_085724_add_brand_id_to_products',29),(65,'2023_12_11_125953_add_to_products',30),(66,'2023_12_12_150844_add_street_to_address',31);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
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
  `quantity` int(10) unsigned NOT NULL,
  `variants` varchar(255) NOT NULL,
  `price` float unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_details_product_id_foreign` (`product_id`),
  KEY `order_details_order_id_foreign` (`order_id`),
  CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (8,9,11,6,'',0),(9,9,10,2,'',0),(10,12,11,1,'',0),(11,13,11,1,'',0),(12,14,11,1,'',0),(13,15,11,1,'',0),(14,16,11,1,'',0),(15,17,11,1,'',0),(16,18,10,1,'',0),(17,18,11,1,'',0),(18,19,11,1,'',0),(19,20,13,1,'',0),(20,21,13,1,'',0),(21,22,23,1,'',0),(22,23,23,1,'',0),(23,24,14,2,'',0),(24,24,12,1,'',0),(25,25,13,2,'',0),(26,26,13,1,'',0),(27,45,13,2,'',0),(28,54,10,1,'',0),(32,57,11,1,'',0),(33,57,12,1,'',0),(34,57,13,2,'',0),(35,58,11,1,'',0),(36,59,11,1,'',0),(37,60,11,1,'',0),(38,63,13,1,'[]',20000000),(39,63,20,1,'[]',20000000),(40,63,11,1,'[]',18000000),(41,64,23,1,'[\"39\",\"\\u0110\\u1ecf\"]',1375000),(42,65,11,1,'[]',18000000),(43,66,19,1,'',21000000),(44,66,15,1,'[]',20000000),(45,66,11,7,'[]',20000000),(46,66,13,1,'[]',20000000);
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
  `ship_fee` float unsigned NOT NULL,
  `discount` float DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (8,14,500000,400000,NULL,45,'cancelled',NULL,'2023-12-16 20:42:10','2023-12-17 01:32:10'),(9,14,160828002,828002,NULL,48,'processing',NULL,'2023-12-16 20:55:12','2023-12-17 01:32:24'),(10,14,160828002,828002,NULL,48,'delivered',NULL,'2023-12-16 20:57:18','2023-12-17 01:57:03'),(11,14,160828002,828002,NULL,48,'delivered',NULL,'2023-12-16 20:57:30','2023-12-17 01:34:59'),(12,14,20115500,115500,NULL,48,'cancelled',NULL,'2023-12-16 20:59:41','2023-12-17 01:38:06'),(13,14,20115500,115500,NULL,48,'refunded',NULL,'2023-12-16 21:00:37','2023-12-17 01:36:24'),(14,14,20115500,115500,NULL,48,'pending',NULL,'2023-12-17 00:13:17','2023-12-17 01:40:04'),(15,14,20115500,115500,NULL,48,'pending',NULL,'2023-12-17 00:15:50','2023-12-17 01:43:38'),(16,14,20115500,115500,NULL,48,'cancelled',NULL,'2023-12-17 01:28:22','2023-12-17 01:47:46'),(17,14,20115500,115500,NULL,48,'pending',NULL,'2023-12-17 01:48:11','2023-12-17 01:48:11'),(18,14,40228002,228002,NULL,48,'pending',NULL,'2023-12-18 01:14:56','2023-12-18 01:14:56'),(19,14,18105500,105500,NULL,48,'pending',NULL,'2023-12-18 08:46:18','2023-12-18 08:46:18'),(20,49,20000000,0,NULL,49,'delivered',NULL,'2023-12-19 07:08:13','2023-12-19 20:43:40'),(21,49,20000000,0,NULL,49,'pending',NULL,'2023-12-19 07:59:08','2023-12-19 07:59:08'),(22,49,1170000,0,NULL,49,'delivered',NULL,'2023-12-19 22:22:53','2023-12-19 22:23:59'),(23,49,1400000,22500,NULL,49,'cancelled',NULL,'2023-12-20 01:14:57','2023-12-20 02:05:13'),(24,49,59500000,0,NULL,50,'pending',NULL,'2023-12-20 02:01:47','2023-12-20 02:01:47'),(25,49,39500000,0,NULL,50,'pending',NULL,'2023-12-20 02:02:54','2023-12-20 02:02:54'),(26,49,18000000,0,NULL,50,'pending',NULL,'2023-12-20 02:03:54','2023-12-20 02:03:54'),(27,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:14','2023-12-20 02:06:14'),(28,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:27','2023-12-20 02:06:27'),(29,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:29','2023-12-20 02:06:29'),(30,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:29','2023-12-20 02:06:29'),(31,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:29','2023-12-20 02:06:29'),(32,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:30','2023-12-20 02:06:30'),(33,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:40','2023-12-20 02:06:40'),(34,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:40','2023-12-20 02:06:40'),(35,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:40','2023-12-20 02:06:40'),(36,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:41','2023-12-20 02:06:41'),(37,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:41','2023-12-20 02:06:41'),(38,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:41','2023-12-20 02:06:41'),(39,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:42','2023-12-20 02:06:42'),(40,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:42','2023-12-20 02:06:42'),(41,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:42','2023-12-20 02:06:42'),(42,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:42','2023-12-20 02:06:42'),(43,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:43','2023-12-20 02:06:43'),(44,49,20000000,0,NULL,50,'pending',NULL,'2023-12-20 02:06:43','2023-12-20 02:06:43'),(45,49,40000000,0,NULL,50,'pending',NULL,'2023-12-20 02:07:17','2023-12-20 02:07:17'),(46,49,40000000,0,NULL,50,'pending',NULL,'2023-12-20 02:07:21','2023-12-20 02:07:21'),(47,49,40000000,0,NULL,50,'pending',NULL,'2023-12-20 02:07:21','2023-12-20 02:07:21'),(48,49,40000000,0,NULL,50,'pending',NULL,'2023-12-20 02:07:21','2023-12-20 02:07:21'),(49,49,40000000,0,NULL,50,'pending',NULL,'2023-12-20 02:07:22','2023-12-20 02:07:22'),(50,49,40000000,0,NULL,50,'pending',NULL,'2023-12-20 02:07:22','2023-12-20 02:07:22'),(51,49,40000000,0,NULL,50,'pending',NULL,'2023-12-20 02:07:22','2023-12-20 02:07:22'),(52,49,40000000,0,NULL,50,'pending',NULL,'2023-12-20 02:07:31','2023-12-20 02:07:31'),(53,49,40000000,0,NULL,50,'cancelled',NULL,'2023-12-20 02:08:11','2023-12-20 02:11:24'),(54,49,455500,15500,NULL,49,'cancelled',NULL,'2023-12-20 02:11:13','2023-12-20 02:11:21'),(57,49,70605500,405500,NULL,49,'pending',NULL,'2023-12-20 02:22:49','2023-12-20 02:22:49'),(58,49,18000000,105500,NULL,49,'pending',NULL,'2023-12-20 02:28:01','2023-12-20 02:28:01'),(59,49,16305500,105500,1800000,49,'cancelled',NULL,'2023-12-20 02:29:48','2023-12-20 08:30:55'),(60,49,16305500,105500,1800000,49,'cancelled',NULL,'2023-12-20 07:19:47','2023-12-20 08:24:11'),(63,49,58305500,305500,0,49,'delivered',NULL,'2023-12-20 07:44:19','2023-12-20 07:44:19'),(64,49,1397375,22375,0,49,'delivered',NULL,'2023-12-20 07:44:45','2023-12-20 07:44:45'),(65,49,18105500,105500,0,49,'pending',NULL,'2023-12-20 18:43:12','2023-12-20 18:43:12'),(66,13,201000000,0,0,51,'pending',NULL,'2023-12-20 20:07:27','2023-12-20 20:07:27');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `method` varchar(64) NOT NULL,
  `status` varchar(64) NOT NULL,
  `amount` float unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_order_id_foreign` (`order_id`),
  CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',13,'access_token','ea3bbcf128a5a2845647e5785d19b5b33a55c39d26a8d13e60bb28117e9fc62c','[\"*\"]',NULL,NULL,'2023-10-19 19:31:04','2023-10-19 19:31:04'),(2,'App\\Models\\User',13,'access_token','713da6b3fb38a72c2c6296c2c7969f5499a4ad0791c10818dab4308ad62235f5','[\"*\"]','2023-10-28 20:33:46',NULL,'2023-10-19 19:33:10','2023-10-28 20:33:46'),(3,'App\\Models\\User',13,'access_token','30711e6782890808d7840298df89eab8f2ab6d21daaf2e0fc8590a5b8e8025e4','[\"*\"]','2023-10-19 20:18:34',NULL,'2023-10-19 20:18:08','2023-10-19 20:18:34'),(4,'App\\Models\\User',13,'access_token','c72516aff34b11e00b2e9a9a911a0d0fbc346e9815b70b9c36ab31db7e81e960','[\"*\"]','2023-10-19 23:18:11',NULL,'2023-10-19 23:17:52','2023-10-19 23:18:11'),(5,'App\\Models\\User',13,'access_token','39133efc6b3ecebb69cfd2317aff68f9339c1c04b30bab4ef0b9abff73e79a11','[\"*\"]',NULL,NULL,'2023-10-28 20:35:52','2023-10-28 20:35:52'),(6,'App\\Models\\User',13,'access_token','39ecfe5ca22f76ccf21861fae759bef44847b0cda815daa8110f21751b633add','[\"*\"]',NULL,NULL,'2023-10-28 20:35:58','2023-10-28 20:35:58'),(7,'App\\Models\\User',13,'access_token','39a9a57cd47303f444c94f80701dbc1aa8531aceb35b08d9517dbedbde7a91db','[\"*\"]','2023-11-02 00:40:15',NULL,'2023-10-28 20:37:20','2023-11-02 00:40:15'),(8,'App\\Models\\User',13,'access_token','b0591bf14fc8baa260897ba126c6cb9a39dba6efe14449c9aabfd06713f86b4f','[\"*\"]','2023-11-09 02:40:47',NULL,'2023-11-01 02:20:50','2023-11-09 02:40:47'),(9,'App\\Models\\User',13,'access_token','4311aad4fcdf9848e30051ff018afdb73b162bda17ac8953fa209d58fe69e93e','[\"*\"]',NULL,NULL,'2023-11-01 02:26:25','2023-11-01 02:26:25'),(10,'App\\Models\\User',13,'access_token','b5f73d89b0914f093e44ddb4439c1c80969cf1b98ff06d257217bc50b6324d81','[\"*\"]','2023-11-07 08:11:15',NULL,'2023-11-03 20:03:52','2023-11-07 08:11:15'),(11,'App\\Models\\User',13,'access_token','01438de17b57e33e44412df757e5385d608c1f50c73821c9858a70922b7df711','[\"*\"]',NULL,NULL,'2023-11-05 19:01:36','2023-11-05 19:01:36'),(12,'App\\Models\\User',13,'access_token','4d2a78b2fca05c5095a2aab23922d64591db1c10c6d325adeaead8260040611e','[\"*\"]',NULL,NULL,'2023-11-09 02:47:54','2023-11-09 02:47:54'),(13,'App\\Models\\User',13,'access_token','0a8d663b8622c7cc8b9670d38eb3c82e1337fe8a1b4a16751001b9f5c14ca7b7','[\"*\"]',NULL,NULL,'2023-11-09 02:51:10','2023-11-09 02:51:10'),(14,'App\\Models\\User',13,'access_token','7a3164abe0bf89bcd7a279c7184aad16cf3261bb44f29a2a274ee25241f78935','[\"*\"]',NULL,NULL,'2023-11-09 03:28:04','2023-11-09 03:28:04'),(15,'App\\Models\\User',13,'access_token','2e2860d6553869dc30d4c905a71082ee267723962673d34e2314cf57d91314b3','[\"*\"]',NULL,NULL,'2023-11-09 19:12:40','2023-11-09 19:12:40'),(16,'App\\Models\\User',13,'access_token','a65315321a238e141f66cb8510b7263266355afba7e850eaa8707bc9db1ef91e','[\"*\"]','2023-11-12 20:19:35',NULL,'2023-11-09 22:58:42','2023-11-12 20:19:35'),(17,'App\\Models\\User',13,'access_token','fd9a12e99fd8a1aafab30d1f26435c2618f40b8d9a31414f5a7e086091106515','[\"*\"]','2023-11-13 00:55:19',NULL,'2023-11-12 20:14:54','2023-11-13 00:55:19'),(18,'App\\Models\\User',13,'access_token','f077a82c60e92059aa863fb5e628b4a1a48d4ebc114783865e9ad4a1a956577a','[\"*\"]','2023-11-14 03:06:58',NULL,'2023-11-13 01:09:31','2023-11-14 03:06:58'),(19,'App\\Models\\User',13,'access_token','cc709ce24f1c9b3db525190c4ae74c542a2020e0e64968dfd717752d8fa1b611','[\"*\"]','2023-11-18 08:06:42',NULL,'2023-11-18 08:06:27','2023-11-18 08:06:42'),(20,'App\\Models\\User',13,'access_token','42aea321f2a388e45049211e2db1ac15c6a8791ee7ac5d1cb70fd41d913f0acf','[\"*\"]','2023-11-24 09:02:32',NULL,'2023-11-22 07:24:15','2023-11-24 09:02:32'),(21,'App\\Models\\User',13,'access_token','6549dd944d88bcdbfc55a82df214b77012839f7ec86093dbb644049abad2151e','[\"*\"]','2023-12-20 20:13:12',NULL,'2023-11-22 07:41:53','2023-12-20 20:13:12'),(22,'App\\Models\\User',13,'access_token','c3280d349d2effb928dae2bc53ade3188bfb0549036a4bbba0753cec8f79e16c','[\"*\"]',NULL,NULL,'2023-11-22 07:49:23','2023-11-22 07:49:23'),(23,'App\\Models\\User',13,'access_token','a049818db7cf5326f50e5c449ce6039a50b9908c1622151fcf4f6bc263019d66','[\"*\"]',NULL,NULL,'2023-11-22 08:42:21','2023-11-22 08:42:21'),(24,'App\\Models\\User',13,'access_token','b9b53ac52d2a04cbd8c30d45bdc8d765a635ea1ab0b5f21bc22d3b80323bf4f7','[\"*\"]',NULL,NULL,'2023-11-22 08:42:51','2023-11-22 08:42:51'),(25,'App\\Models\\User',13,'access_token','b95124d9d8ce03426ebc98bcb1487b61728fbbf76fceb597e2db9787f5832b9c','[\"*\"]',NULL,NULL,'2023-11-22 08:43:48','2023-11-22 08:43:48'),(26,'App\\Models\\User',13,'access_token','cffae4cb741105e31453195f55c9869041737bea256d311fe676ddcd34638406','[\"*\"]',NULL,NULL,'2023-11-22 08:44:24','2023-11-22 08:44:24'),(27,'App\\Models\\User',13,'access_token','ce70d9caa59a770d39184d3f40ee49d321ab7e69a5ad11645fd96d829c033ea7','[\"*\"]',NULL,NULL,'2023-11-22 08:44:47','2023-11-22 08:44:47'),(28,'App\\Models\\User',13,'access_token','681f70e55139f82b69bc535af7f6f5e3fc6c188856af81386d3bb0fe95a72f1d','[\"*\"]',NULL,NULL,'2023-11-22 08:45:55','2023-11-22 08:45:55'),(29,'App\\Models\\User',13,'access_token','9b28e97c64de07048629c28b348327e270e13b9352d4cd3d3fb2d6a82a880c5c','[\"*\"]',NULL,NULL,'2023-11-22 08:46:47','2023-11-22 08:46:47'),(30,'App\\Models\\User',13,'access_token','107c62b9228fa5ea9e8d568c1ef20458ce353053e6003ba6a88043369c51809f','[\"*\"]',NULL,NULL,'2023-11-22 09:02:11','2023-11-22 09:02:11'),(31,'App\\Models\\User',13,'access_token','cc0975dac86e19f3dbc9ab2a783373336f7b865e037d6dc1d2c32f0a69423d78','[\"*\"]',NULL,NULL,'2023-11-22 09:02:18','2023-11-22 09:02:18'),(32,'App\\Models\\User',13,'access_token','2532631a679545bbec92ff080eb32f92f47e081d546a509a66fe41ca4b1b7751','[\"*\"]',NULL,NULL,'2023-11-22 09:02:22','2023-11-22 09:02:22'),(33,'App\\Models\\User',13,'access_token','fd1789607e4ecf6a41110b6764a8b45cf5c15f32adb139e9b674aad213f72caf','[\"*\"]',NULL,NULL,'2023-11-22 09:03:59','2023-11-22 09:03:59'),(34,'App\\Models\\User',13,'access_token','f1fae0237321ace7c04591c70e5e64c6d17006ffa9d534296942ef4421ac15d8','[\"*\"]',NULL,NULL,'2023-11-23 00:41:11','2023-11-23 00:41:11'),(35,'App\\Models\\User',13,'access_token','c5c47628023a202b2b64e0ecb1efe8a25824717e230c794d594e797277c67410','[\"*\"]',NULL,NULL,'2023-11-23 00:43:39','2023-11-23 00:43:39'),(36,'App\\Models\\User',13,'access_token','03321f5b2fecf5dc9ad95b4af14e2473ea5042f797ca9d16f1957f425a007fc2','[\"*\"]',NULL,NULL,'2023-11-23 00:49:21','2023-11-23 00:49:21'),(37,'App\\Models\\User',13,'access_token','c5daa726b84f658599718a9c30d15251f3ae37f29c1857a31d7ad8ac58e3cd4c','[\"*\"]',NULL,NULL,'2023-11-23 00:49:37','2023-11-23 00:49:37'),(38,'App\\Models\\User',13,'access_token','6a6465ee9cd688fc2f759fe31863e5a6a8ebb44609dd9e771c790ba6277f248e','[\"*\"]',NULL,NULL,'2023-11-23 00:49:56','2023-11-23 00:49:56'),(39,'App\\Models\\User',13,'access_token','ed5bd76fbfe37a6087a7073c2c70cc5db079858b8dc5e48729525b55fff97de9','[\"*\"]',NULL,NULL,'2023-11-23 00:50:00','2023-11-23 00:50:00'),(40,'App\\Models\\User',13,'access_token','9582b5b8915fa0fd7fc0eb355835524231d9cc34c597d265517327d71681bc7e','[\"*\"]',NULL,NULL,'2023-11-23 00:50:06','2023-11-23 00:50:06'),(41,'App\\Models\\User',13,'access_token','3c4dc578dfa2a9cac9c0939b4fce7811cb605fbdbe434f80fe1c39b9ef028847','[\"*\"]',NULL,NULL,'2023-11-23 00:50:28','2023-11-23 00:50:28'),(42,'App\\Models\\User',13,'access_token','b7866336db6ec06a65965597d88829507d1e4ecfc7f3e03489d13bec73a0fcff','[\"*\"]',NULL,NULL,'2023-11-23 00:51:35','2023-11-23 00:51:35'),(43,'App\\Models\\User',13,'access_token','91841b7e5a5db2d4a0f6a015c65931fbb1c7351b42bf1d2c7581cf08d74c5264','[\"*\"]',NULL,NULL,'2023-11-23 00:52:09','2023-11-23 00:52:09'),(44,'App\\Models\\User',13,'access_token','d58fb187b4adbafb0eaee4b965e50a8921d59328e0aa9b62853850ac378150f0','[\"*\"]',NULL,NULL,'2023-11-23 00:54:08','2023-11-23 00:54:08'),(45,'App\\Models\\User',13,'access_token','f173ecf1187530511cfcf609917fbb719676d28bf7fdc0fc01073e20f1d794df','[\"*\"]',NULL,NULL,'2023-11-23 00:56:39','2023-11-23 00:56:39'),(46,'App\\Models\\User',13,'access_token','ce2e545d1ece33065067cfcd354ff177c914efd185c3d7655803d466081938f9','[\"*\"]',NULL,NULL,'2023-11-23 00:56:50','2023-11-23 00:56:50'),(47,'App\\Models\\User',13,'access_token','d7a8ebeb95dc2ac3ec53443151ad74de98664adf116edab4f14c545d791c9de4','[\"*\"]',NULL,NULL,'2023-11-23 00:57:32','2023-11-23 00:57:32'),(48,'App\\Models\\User',13,'access_token','90d163a71ef6de9ae6adf3faffdc6f6570ab021f6f8caafab4354bcdae399940','[\"*\"]',NULL,NULL,'2023-11-23 01:02:20','2023-11-23 01:02:20'),(49,'App\\Models\\User',13,'access_token','06ff034181082e80a620b4d0d84166c1c2f5cdab68aacb51fa81ddd240c364ab','[\"*\"]',NULL,NULL,'2023-11-23 01:08:46','2023-11-23 01:08:46'),(50,'App\\Models\\User',13,'access_token','d34561c76b7171310cc916a7fce4b8423b880ad305bacd73422fad9f5c43670f','[\"*\"]',NULL,NULL,'2023-11-23 01:09:57','2023-11-23 01:09:57'),(51,'App\\Models\\User',13,'access_token','44838c84e3f316df9dd7edb2d7cae191dd44b26472b10fc61969ebf3ad811db9','[\"*\"]',NULL,NULL,'2023-11-23 01:11:38','2023-11-23 01:11:38'),(52,'App\\Models\\User',13,'access_token','b9183f9e5eac82e99ef3aaa9e0ed894aa506436bc50527e2cf24cbc5b48d69eb','[\"*\"]',NULL,NULL,'2023-11-23 01:15:24','2023-11-23 01:15:24'),(53,'App\\Models\\User',13,'access_token','f8cf576fdd334394eb4b7f61c1bbd1ae59d3278deb4c77c5b1ba74e810e20120','[\"*\"]',NULL,NULL,'2023-11-23 01:36:05','2023-11-23 01:36:05'),(54,'App\\Models\\User',13,'access_token','6eea0f1034e3da109158aefe462b0da445487d5fe5330858732099f10b5f22c7','[\"*\"]',NULL,NULL,'2023-11-23 01:36:51','2023-11-23 01:36:51'),(55,'App\\Models\\User',13,'access_token','d61df68ed9d39b9a6b8b904229c588a64e716280805ea8fe4c393f45da5d0a6f','[\"*\"]',NULL,NULL,'2023-11-23 01:55:39','2023-11-23 01:55:39'),(56,'App\\Models\\User',13,'access_token','74f5d7ff3ed276a3c8a7b07651079805c984a0683402bcd93e4ac088d15c1ab9','[\"*\"]',NULL,NULL,'2023-11-23 02:04:19','2023-11-23 02:04:19'),(57,'App\\Models\\User',13,'access_token','94788f2413bbda528d7c04d5cc06f13916db9a2941c32c8becf17b56e8363931','[\"*\"]',NULL,NULL,'2023-11-23 02:40:35','2023-11-23 02:40:35'),(58,'App\\Models\\User',13,'access_token','8adc09727acbcb521bec585092e951c592ee63b01e5da7500f019506494c7b1f','[\"*\"]',NULL,NULL,'2023-11-23 02:43:54','2023-11-23 02:43:54'),(59,'App\\Models\\User',13,'access_token','85eef130d1d0fdc2bd2da894f657210995d557382a1d36605fb691a9dde6d2c6','[\"*\"]',NULL,NULL,'2023-11-23 02:51:51','2023-11-23 02:51:51'),(60,'App\\Models\\User',13,'access_token','4152e937f04d20342d053d6d9373a6261e1aed4a7f82cc5d04060730cc9a3dff','[\"*\"]',NULL,NULL,'2023-11-23 03:00:54','2023-11-23 03:00:54'),(61,'App\\Models\\User',13,'access_token','0dca3d8f9043c77aa636566afee765ccaf915ed69ce0d8eb6b15d20d051e8137','[\"*\"]',NULL,NULL,'2023-11-23 03:04:22','2023-11-23 03:04:22'),(62,'App\\Models\\User',13,'access_token','d9889137a65e45539e23b7bb872839fc3c16282abb1971e8ae937af9340438c7','[\"*\"]',NULL,NULL,'2023-11-23 03:04:34','2023-11-23 03:04:34'),(63,'App\\Models\\User',13,'access_token','cae78084ba2725361c8e9f14e4afaa0f1b57f5449abf241fd81d1410f98dcf5a','[\"*\"]',NULL,NULL,'2023-11-23 03:06:38','2023-11-23 03:06:38'),(64,'App\\Models\\User',13,'access_token','0e6b6ce3a0f1a8d8feec54b01616d97883ec28af1bfa537c3e402aabc3ed4888','[\"*\"]',NULL,NULL,'2023-11-23 03:07:23','2023-11-23 03:07:23'),(65,'App\\Models\\User',13,'access_token','5bcb9d8318da724d172b5e99fbd35d3337d7ecbfc7f507a6163b96a875941926','[\"*\"]',NULL,NULL,'2023-11-23 03:08:36','2023-11-23 03:08:36'),(66,'App\\Models\\User',13,'access_token','c5b5a811ce92e17ee234afd68666fdbd5399530c2f736ca8391642ae323473ab','[\"*\"]',NULL,NULL,'2023-11-23 03:10:59','2023-11-23 03:10:59'),(67,'App\\Models\\User',13,'access_token','cf2ad17a044a6c44619e097ca3d26692335b7237908f10639dc307297213389e','[\"*\"]',NULL,NULL,'2023-11-23 03:11:40','2023-11-23 03:11:40'),(68,'App\\Models\\User',13,'access_token','b3f0b163c9d721039de7eae3b0557dbde7b5529f2f025ada02859d0544269270','[\"*\"]',NULL,NULL,'2023-11-23 03:12:18','2023-11-23 03:12:18'),(69,'App\\Models\\User',13,'access_token','dde9e61f91e4e18a225ca9e15dd2452d88e10c764b3bad6da259f689ed01c787','[\"*\"]',NULL,NULL,'2023-11-23 03:13:14','2023-11-23 03:13:14'),(70,'App\\Models\\User',13,'access_token','bbb05bbea705f8ce598d8567bb313d6574b55c7078326c57895b48e05b8d67f9','[\"*\"]',NULL,NULL,'2023-11-23 03:14:18','2023-11-23 03:14:18'),(71,'App\\Models\\User',13,'access_token','68a2ea3851abddd2c17ca97281e66025add28a159213de51ec31f056cd9c9b0b','[\"*\"]',NULL,NULL,'2023-11-23 07:23:00','2023-11-23 07:23:00'),(72,'App\\Models\\User',13,'access_token','2d52e053703ece88f16f33fe135a51e7bffd8328efe36b30d236f031b4415d8e','[\"*\"]',NULL,NULL,'2023-11-23 08:36:17','2023-11-23 08:36:17'),(73,'App\\Models\\User',13,'access_token','05ac6e41e3e6bacd44a0a3e0ebd04604f839f206674ac925f2fa5bc4462ac7fc','[\"*\"]',NULL,NULL,'2023-11-23 08:41:11','2023-11-23 08:41:11'),(74,'App\\Models\\User',13,'access_token','eafc358049b6054505c5bd51348a4cf966dad0798f787f6e9fc32a518bb677c9','[\"*\"]',NULL,NULL,'2023-11-23 08:44:47','2023-11-23 08:44:47'),(75,'App\\Models\\User',13,'access_token','73bc761022aff84963b0a97b6c37be251a9e55777c0bc984802ab4158079ca0c','[\"*\"]',NULL,NULL,'2023-11-23 08:45:29','2023-11-23 08:45:29'),(76,'App\\Models\\User',13,'access_token','a8cd79f5b3826e597e181db9a8d54b016279b5c09e5f201a4dc5ed3d7e69293b','[\"*\"]',NULL,NULL,'2023-11-23 08:50:26','2023-11-23 08:50:26'),(77,'App\\Models\\User',13,'access_token','8180c3510b4a7d459fc4c1cd65f3ab979110353dc213905150fbe8ad82b53303','[\"*\"]',NULL,NULL,'2023-11-23 09:02:31','2023-11-23 09:02:31'),(78,'App\\Models\\User',13,'access_token','ca5020919bac7be654bb961cbdfea62335e40277ec94ec3b815e3768b62e9455','[\"*\"]',NULL,NULL,'2023-11-23 19:37:57','2023-11-23 19:37:57'),(79,'App\\Models\\User',13,'access_token','be42925a9eb19ad0f90c632dc42b2ff71ccebefb63de2296dab8f041ae06705a','[\"*\"]',NULL,NULL,'2023-11-23 19:41:28','2023-11-23 19:41:28'),(80,'App\\Models\\User',13,'access_token','015a3c36bbda3010816015f24dc85e3e93398a8a7b9828af7a8a168e25eb21f1','[\"*\"]',NULL,NULL,'2023-11-23 19:56:12','2023-11-23 19:56:12'),(81,'App\\Models\\User',13,'access_token','1c54f2a1c8a603259bc4762af8278e6f8eca33fe9c5287b5e867b17db9054ae1','[\"*\"]',NULL,NULL,'2023-11-24 00:51:34','2023-11-24 00:51:34'),(82,'App\\Models\\User',13,'access_token','fd77092a1bb2c87b7a40f9907c7dce9268e7b406efb1bf024a0069a8cf9069f9','[\"*\"]',NULL,NULL,'2023-11-24 00:51:39','2023-11-24 00:51:39'),(83,'App\\Models\\User',13,'access_token','ef37201d8a8b60dc1913e76697ef060bbeef50d1fb9e3fada06d5127509e883f','[\"*\"]',NULL,NULL,'2023-11-24 00:51:49','2023-11-24 00:51:49'),(84,'App\\Models\\User',13,'access_token','e62124e438d124f40d508a206d859eb4688059a0c827a1494b0b592a8707d455','[\"*\"]',NULL,NULL,'2023-11-24 07:23:06','2023-11-24 07:23:06'),(85,'App\\Models\\User',13,'access_token','c84b8973a856f4bc088befa8648514296a1709eec3e37680f5ecca5e6476cb38','[\"*\"]',NULL,NULL,'2023-11-24 07:23:39','2023-11-24 07:23:39'),(86,'App\\Models\\User',13,'access_token','0a7772aaa3df3a0d573ab8b3b9516ae8de6c83015e21fd112113b7f094ae545c','[\"*\"]',NULL,NULL,'2023-11-24 07:23:51','2023-11-24 07:23:51'),(87,'App\\Models\\User',13,'access_token','bd0c51449d23efa3b57786fe9451c5c735256a031a39594f65d88b817a77752c','[\"*\"]',NULL,NULL,'2023-11-24 07:27:51','2023-11-24 07:27:51'),(88,'App\\Models\\User',13,'access_token','cc35b0ddf726fac267e7579949fdfa0b0f796c6fa4e8cfdb15bba983e5addf99','[\"*\"]',NULL,NULL,'2023-11-24 07:28:43','2023-11-24 07:28:43'),(89,'App\\Models\\User',13,'access_token','4a3059dc69e987f7cf6b1e333f7207bff75b97e0506b0b93cba24adf643c3480','[\"*\"]',NULL,NULL,'2023-11-24 07:28:54','2023-11-24 07:28:54'),(90,'App\\Models\\User',13,'access_token','50d87fc6c1b9f5da84420b9da397cda2b93816e65828651f5315a5626c49f9c0','[\"*\"]',NULL,NULL,'2023-11-25 01:19:46','2023-11-25 01:19:46'),(91,'App\\Models\\User',13,'access_token','ac81ab68ae716e940ef0c267d21a244e6a909e403ae4ca9e6f7527f1579de943','[\"*\"]',NULL,NULL,'2023-11-25 02:07:05','2023-11-25 02:07:05'),(92,'App\\Models\\User',13,'access_token','fbf3b84f908015825d7588dfe2f7f7e9258035ce311d9d1763824a03f616ec91','[\"*\"]','2023-11-28 08:15:36',NULL,'2023-11-25 19:33:55','2023-11-28 08:15:36'),(93,'App\\Models\\User',13,'access_token','cc8e9580a2678ac6c49c156f21e24422a2560d9e380053db9bc3beebb1865bd0','[\"*\"]','2023-12-03 18:55:59',NULL,'2023-11-30 19:17:24','2023-12-03 18:55:59'),(94,'App\\Models\\User',14,'access_token','35a53563423cc6da04d9d5679ba2776536a3fb1d5ded27c65832c3b2064e6867','[\"*\"]','2023-12-03 04:53:18',NULL,'2023-12-03 04:44:56','2023-12-03 04:53:18'),(95,'App\\Models\\User',14,'access_token','ae464c1aa2045fea4f6c016ec025b0769ce3a008082e0ed3abf1826c70bd098a','[\"*\"]','2023-12-03 04:54:04',NULL,'2023-12-03 04:54:01','2023-12-03 04:54:04'),(96,'App\\Models\\User',14,'access_token','eb593c7e94029cb825d98b6974c97ac9d53c4026490a9d1c0b1f62ab34b6484f','[\"*\"]','2023-12-03 05:27:10',NULL,'2023-12-03 05:26:48','2023-12-03 05:27:10'),(97,'App\\Models\\User',14,'access_token','c2dfe512ee7981e3cc6eb178f9ac65d04e7b9ff9b6b5b31aaeff8f86ee1553f5','[\"*\"]','2023-12-03 06:54:13',NULL,'2023-12-03 05:28:52','2023-12-03 06:54:13'),(98,'App\\Models\\User',13,'access_token','97e9e9be3dffc9a363b04eed58f0c5cbda731cb52956d6f399f7b5eb1126dd2f','[\"*\"]','2023-12-06 00:36:17',NULL,'2023-12-03 06:54:45','2023-12-06 00:36:17'),(99,'App\\Models\\User',14,'access_token','afa8bf7c57396b0b2ddcca2cf3686c13f8f27c54883ddd7fc5b6c09fbc1bfae7','[\"*\"]','2023-12-06 08:50:07',NULL,'2023-12-04 00:58:16','2023-12-06 08:50:07'),(100,'App\\Models\\User',13,'access_token','2b9963ee85d8b2804895ee02bd6960bc06ad634da93b2c6bf53b402d102ebb01','[\"*\"]','2023-12-12 20:40:23',NULL,'2023-12-06 07:43:56','2023-12-12 20:40:23'),(101,'App\\Models\\User',14,'access_token','0d448f5d4d5efb246ee9006aa4e9d4e0d2e6e1c2a6611d5df3e942d28c6f7498','[\"*\"]',NULL,NULL,'2023-12-07 00:22:43','2023-12-07 00:22:43'),(102,'App\\Models\\User',14,'access_token','9f3b7e345d4143e13980b5dfb5fef1cb5cf3b6fef66dad5c7d36402ef245f97b','[\"*\"]','2023-12-15 19:32:06',NULL,'2023-12-07 00:23:56','2023-12-15 19:32:06'),(103,'App\\Models\\User',14,'access_token','5cfa1ec9da5b5f6d04086ba9333964958d266f57fb7014e5f0baf3f04f910d25','[\"*\"]','2023-12-19 19:39:01',NULL,'2023-12-12 20:41:54','2023-12-19 19:39:01'),(104,'App\\Models\\User',14,'access_token','8672d8eb4db70602b61695e1afb0cd367e9b259c0f252f44db3677a7f9753d2d','[\"*\"]','2023-12-18 08:42:42',NULL,'2023-12-18 01:14:11','2023-12-18 08:42:42'),(105,'App\\Models\\User',14,'access_token','4d41a084c9131fb37a7e48f8c506bfdf802ebf35b49645659967900d44a293ea','[\"*\"]','2023-12-18 08:51:11',NULL,'2023-12-18 08:45:26','2023-12-18 08:51:11'),(106,'App\\Models\\User',49,'access_token','115972bd67c656faa6444eea4ffc18828b8f04fe901772d4f8038f0233229a67','[\"*\"]','2023-12-20 19:09:03',NULL,'2023-12-19 06:34:00','2023-12-20 19:09:03'),(107,'App\\Models\\User',13,'access_token','ef82267f2935710bafd2fe8dada0b50dfc0b212ccaa95057aeafebaa85b24a44','[\"*\"]',NULL,NULL,'2023-12-20 19:17:28','2023-12-20 19:17:28'),(108,'App\\Models\\User',13,'access_token','be38097f9eb4c101284603842c9d4bb1c13f8f5538f04739099ec59668bdbcff','[\"*\"]','2023-12-20 19:18:26',NULL,'2023-12-20 19:18:19','2023-12-20 19:18:26'),(109,'App\\Models\\User',13,'access_token','2037abdcefef85f892159687cfc6176606e98e2014fb7b171432d6b8cc405bec','[\"*\"]','2023-12-20 19:28:16',NULL,'2023-12-20 19:19:20','2023-12-20 19:28:16'),(110,'App\\Models\\User',13,'access_token','8413e41d428cefbdd6371ddccd94a73b6660450efa185bbaccad16d907933abd','[\"*\"]','2023-12-20 19:34:16',NULL,'2023-12-20 19:32:19','2023-12-20 19:34:16'),(111,'App\\Models\\User',13,'access_token','5de72aeb0430fb8dd04d909f610c2b60b06914e3c1ac79a09fe5d28cd3b996fa','[\"*\"]',NULL,NULL,'2023-12-20 19:34:31','2023-12-20 19:34:31'),(112,'App\\Models\\User',13,'access_token','9e868c713f359cc9cffd5a81a02ef8abe4248240e95f5787e7b6f18bc176373c','[\"*\"]',NULL,NULL,'2023-12-20 19:36:12','2023-12-20 19:36:12'),(113,'App\\Models\\User',13,'access_token','07f82610ec17fbf84888c249a21f710ecc7a5b8a2643fccbd02feb44107505d6','[\"*\"]',NULL,NULL,'2023-12-20 19:38:53','2023-12-20 19:38:53'),(114,'App\\Models\\User',13,'access_token','8c2d56b113eb0a568269c287d73e876e4d33dc0304023fd831b457534c2667db','[\"*\"]',NULL,NULL,'2023-12-20 19:40:05','2023-12-20 19:40:05'),(115,'App\\Models\\User',13,'access_token','fc6b07d65f71ef574d90edd452f624282432f4df6be5da00a437c1cc3cffbe6c','[\"*\"]',NULL,NULL,'2023-12-20 19:40:30','2023-12-20 19:40:30'),(116,'App\\Models\\User',13,'access_token','a8dd10a73dbbed1f113ecbebf4276d01ba753d8a5d1f8dfc760aee84f1227cdf','[\"*\"]','2023-12-20 20:11:20',NULL,'2023-12-20 19:51:49','2023-12-20 20:11:20');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `image_alt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_images_product_id_foreign` (`product_id`),
  CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (16,10,'public/img1.png',NULL),(17,10,'public/img2.png',NULL),(18,10,'public/img3.png',NULL),(19,11,'https://salt.tikicdn.com/cache/750x750/ts/product/a7/aa/10/a854de1119e37e29c90de817e10b4635.jpg.webp',NULL),(20,11,'https://salt.tikicdn.com/cache/750x750/ts/product/4a/ef/1d/5f0a14eea86d3c25e5203f1012cfcae9.jpg.webp',NULL),(21,11,'https://salt.tikicdn.com/cache/750x750/ts/product/a5/a6/7a/e4de5d1f2cbec271b082e366ec3fec7f.jpg.webp',NULL),(22,11,'https://salt.tikicdn.com/cache/750x750/ts/product/64/42/d1/f01e3f1b6026302554d1515e244bd132.jpg.webp',NULL),(23,11,'https://salt.tikicdn.com/cache/750x750/ts/product/f6/1d/86/e3f14e9a82a05063529063a20c0d571d.jpg.webp',NULL),(24,12,'public/img3.png',NULL),(25,13,'public/img1.png',NULL),(26,13,'public/img2.png',NULL),(27,13,'public/img3.png',NULL),(28,14,'public/img1.png',NULL),(29,14,'public/img2.png',NULL),(30,14,'public/img3.png',NULL),(31,15,'public/img1.png',NULL),(32,15,'public/img2.png',NULL),(33,15,'public/img3.png',NULL),(34,16,'public/img1.png',NULL),(35,16,'public/img2.png',NULL),(36,16,'public/img3.png',NULL),(37,17,'public/img1.png',NULL),(38,17,'public/img2.png',NULL),(39,17,'public/img3.png',NULL),(40,18,'public/img1.png',NULL),(41,18,'public/img2.png',NULL),(42,18,'public/img3.png',NULL),(43,19,'public/img1.png',NULL),(44,19,'public/img2.png',NULL),(45,19,'public/img3.png',NULL),(46,20,'public/img1.png',NULL),(47,20,'public/img2.png',NULL),(48,20,'public/img3.png',NULL),(49,21,'public/img1.png',NULL),(50,21,'public/img2.png',NULL),(51,21,'public/img3.png',NULL),(52,22,'https://salt.tikicdn.com/cache/750x750/ts/product/58/3e/2c/68bb1f5e80be0e402e2736300d069547.png.webp',NULL),(53,22,'https://salt.tikicdn.com/cache/750x750/ts/product/82/f5/e2/5b3d086ce512f6d267045b208be5ee55.png.webp',NULL),(54,22,'https://salt.tikicdn.com/cache/750x750/ts/product/9c/ab/0b/b48008f2968911f54607676b5514e83f.png.webp',NULL),(55,22,'https://salt.tikicdn.com/cache/750x750/ts/product/82/8e/f2/dc23d6860005c902e6e44860bbc7e967.png.webp',NULL),(56,22,'https://salt.tikicdn.com/cache/750x750/ts/product/cf/13/c2/60356f750bc1636c04c8a0aa3d023be8.png.webp',NULL),(57,23,'https://firebasestorage.googleapis.com/v0/b/project-6817180433835635924.appspot.com/o/products%2Fbanrh%2Faef05b0f-dd79-4358-9981-5effe14735a6?alt=media&token=d34bd9a8-9b89-4022-939b-6772f756aae3',NULL),(58,23,'https://firebasestorage.googleapis.com/v0/b/project-6817180433835635924.appspot.com/o/products%2Fbanrh%2Faef05b0f-dd79-4358-9981-5effe14735a6?alt=media&token=8dd22478-50a7-4abd-8cd8-0cf46304c604',NULL);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_tags`
--

DROP TABLE IF EXISTS `product_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_tags` (
  `product_id` bigint(20) unsigned NOT NULL,
  `tag_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`product_id`,`tag_id`),
  KEY `product_tags_tag_id_foreign` (`tag_id`),
  CONSTRAINT `product_tags_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_tags`
--

LOCK TABLES `product_tags` WRITE;
/*!40000 ALTER TABLE `product_tags` DISABLE KEYS */;
INSERT INTO `product_tags` VALUES (10,1),(10,2),(10,3),(10,4),(11,1),(11,2),(11,3),(11,4),(12,1),(12,2),(12,3),(12,4),(13,1),(13,2),(13,3),(13,4),(14,1),(14,2),(14,3),(14,4),(15,1),(15,2),(15,3),(15,4),(16,1),(16,2),(16,3),(16,4),(17,1),(17,2),(17,3),(17,4),(18,1),(18,2),(18,3),(18,4),(19,1),(19,2),(19,3),(19,4),(20,1),(20,2),(20,3),(20,4),(21,1),(21,2),(21,3),(21,4),(22,1),(22,2),(23,1),(23,5);
/*!40000 ALTER TABLE `product_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variants` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `variant_type_id` bigint(20) unsigned NOT NULL,
  `value` varchar(128) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_variants_product_id_foreign` (`product_id`),
  KEY `product_variants_variant_type_id_foreign` (`variant_type_id`),
  CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_variants_variant_type_id_foreign` FOREIGN KEY (`variant_type_id`) REFERENCES `variant_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` VALUES (1,21,1,'Đỏ',26000),(2,21,1,'Vàng',26000),(3,21,1,'Cam',26000),(4,21,5,'12',25000),(5,21,2,'4',25000),(6,21,2,'5',25000),(7,22,1,'Đỏ',30000),(8,22,1,'Vàng',25000),(9,22,1,'Cam',40000),(10,22,2,'4 inch',100000),(11,22,2,'5 inch',125000),(12,23,1,'Đỏ',50000),(13,23,1,'Đen',50000),(14,23,1,'Gold',75000),(15,23,5,'39',75000),(16,23,5,'40',100000);
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` float unsigned NOT NULL,
  `discount` tinyint(3) unsigned NOT NULL,
  `short_desc` varchar(255) NOT NULL,
  `detail` text NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `sold` int(10) unsigned NOT NULL DEFAULT 0,
  `status` varchar(50) DEFAULT 'in_stock',
  `category_id` bigint(20) unsigned NOT NULL DEFAULT 100,
  `brand_id` bigint(20) unsigned DEFAULT NULL,
  `seller_id` bigint(20) unsigned DEFAULT NULL,
  `weight` int(10) unsigned NOT NULL,
  `length` int(10) unsigned NOT NULL,
  `width` int(10) unsigned NOT NULL,
  `height` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_seller_id_foreign` (`seller_id`),
  KEY `products_category_id_foreign` (`category_id`),
  KEY `products_brand_id_foreign` (`brand_id`),
  CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_seller_id_foreign` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (10,'Máy tính cầm tay',440000,0,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp',100,3,'in_stock',3,NULL,NULL,500,15,25,20,'2023-11-25 20:45:35','2023-12-16 02:27:44'),(11,'Điện thoại VSmart Bee Line',18000000,20,'Điện thoại VSmart Bee Line','Điện thoại VSmart Bee Line','https://salt.tikicdn.com/cache/750x750/ts/product/a7/aa/10/a854de1119e37e29c90de817e10b4635.jpg.webp',96,5,'in_stock',27,NULL,NULL,500,10,10,10,'2023-11-26 01:28:09','2023-12-20 20:08:24'),(12,'Samsung Galaxy Y',20000000,0,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp',100,0,'in_stock',4,NULL,NULL,0,0,0,0,'2023-11-26 01:28:43','2023-11-26 01:28:43'),(13,'Redmi Note 10T 5G',20000000,0,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/bf/75/49/c8aa5e2218348a6b422259d67bd516dc.jpg.webp',95,0,'in_stock',4,NULL,NULL,0,0,0,0,'2023-11-26 01:29:13','2023-12-20 19:52:00'),(14,'Vaseline Gluta-Hya Dưỡng Thể Nâng Tông Tức Thì Gấp 4 Lần 300ML',20000000,30,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/2f/50/38/784cf906175139d81a4919ed523806f7.png.webp',100,0,'in_stock',4,NULL,NULL,0,0,0,0,'2023-11-26 01:29:53','2023-11-26 01:29:53'),(15,'Combo 2 Sữa dưỡng thể dưỡng sáng da tức thì VASELINE Healthy Bright Instant Radiance 350ML/chai',20000000,30,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/8c/93/d5/50e72d58a2580bb4fdaf30c06dcdbda6.png.webp',100,0,'in_stock',4,NULL,NULL,0,0,0,0,'2023-11-26 01:30:16','2023-11-26 01:30:16'),(16,'Kem rửa mặt Vitamin Acnes Vitamin Cleanser 100g',20000000,30,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/7c/a6/b4/fe8b437588e231367a8275d0b077b027.jpg.webp',100,0,'in_stock',4,NULL,NULL,0,0,0,0,'2023-11-26 01:30:46','2023-11-26 01:30:46'),(17,'Dầu Gội Chống Gàu Selsun (100ml)',20000000,30,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/7c/9c/a5/4bd1312c3bcdbe0475df20cffee3c5a6.jpg.webp',100,0,'in_stock',5,NULL,NULL,0,0,0,0,'2023-11-26 01:32:00','2023-11-26 01:32:00'),(18,'[Coupon 20K đơn 299K] Bộ Nồi Inox 3 Đáy Sunhouse SH335(16cm, 20cm, 24cm ) - Dùng trên mọi loại bếp - Hàng chính hãng',20000000,30,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/72/05/67/a69641d3492b5f69e447b8d05da9257c.jpg.webp',100,0,'in_stock',5,NULL,NULL,0,0,0,0,'2023-11-26 01:32:38','2023-12-20 20:11:19'),(19,'[ TRỢ GIÁ ]Vali kéo Kiza KAMILIANT BY AMERICAN TOURISTER - MỸ : Thương hiệu Chính Hãng , bảo hành quốc tế trên 118 quốc gia',20000000,30,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/88/5b/7f/1096df0853ef100b427ff58a032c3bdc.jpg.webp',100,0,'in_stock',5,NULL,NULL,0,0,0,0,'2023-11-26 01:33:02','2023-11-26 01:33:02'),(20,'[ TIKI TRỢ GIÁ ]Vali kéo Kiza KAMILIANT BY AMERICAN TOURISTER - MỸ : Thương hiệu Chính Hãng , bảo hành quốc tế trên 118 quốc gia',20000000,30,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/88/5b/7f/1096df0853ef100b427ff58a032c3bdc.jpg.webp',99,0,'in_stock',5,NULL,NULL,0,0,0,0,'2023-11-30 22:45:25','2023-12-20 07:22:17'),(21,'[ TIKI TRỢ GIÁ ]Vali kéo Kiza KAMILIANT BY AMERICAN TOURISTER - MỸ : Thương hiệu Chính Hãng , bảo hành quốc tế trên 118 quốc gia',20000000,30,'Đây là chiếc điện thoại Iphone 14','Đây cũng là chiếc điện thoại Iphone 14','https://salt.tikicdn.com/cache/280x280/ts/product/88/5b/7f/1096df0853ef100b427ff58a032c3bdc.jpg.webp',85,0,'in_stock',5,NULL,NULL,0,0,0,0,'2023-11-30 22:50:38','2023-12-04 00:59:38'),(22,'Ốp lưng kèm bàn phím ZAGG Messenger Folio 2 iPad 10.2/10.5',988000,34,'Đây là chiếc điện thoại Iphone 14','Tính năng: Thuộc thương hiệu ốp lưng bảo vệ cao cấp dành cho iPad đến từ Mỹ Thiết kế gọn nhẹ, linh hoạt, dễ dàng mang theo, hỗ trợ tối đa các chức năng khi sử dụng Sử dụng cho các dòng: iPad 10.2’’ (iPad gen 7th & 8th), iPad 10.5’’ (iPad Air 3rd gen) Chất liệu vải Fabric cao cấp tạo sự sang trọng, bảo vệ iPad khỏi các vết bẩn, vết trầy xước khi để thiết bị cùng với các vật dụng trong túi xách của bạn. Bàn phím có độ nảy tốt, êm ái, tốc độ ghi nhận nhanh giúp dễ dàng thao tác, sử dụng Thời lượng sử dụng pin lên tới 1 năm giữa các lần sạc Tích hợp cổng sạc Type C nạp nhanh năng lượng cho thiết bị Kết nối dễ dàng, nhanh chóng thông qua bluetooth Đế gập dựng linh hoạt giúp thay đổi ở nhiều góc nhìn, thoải mái khi đánh máy hay xem phim.','https://salt.tikicdn.com/cache/750x750/ts/product/45/e4/50/49b0abca428616dbd94a67dab20590cb.png.webp',0,0,'in_stock',5,NULL,NULL,0,0,0,0,'2023-12-03 05:43:56','2023-12-20 19:01:02'),(23,'Giày Nam Pierre Cardin - PCMFWLF 752',1250000,0,'<p>Gi&agrave;y nam Pierre Cardin PCMFWLF 752&nbsp;được sản xuất từ 100% da thật nhập khẩu&nbsp;với kiểu thiết kế gi&agrave;y kh&ocirc;ng d&acirc;y gi&uacute;p cho trang phục của bạn th&ecirc;m phần sang trọng, lịch l&atilde;m. Đế gi&agrave;y được l&agrave','<h4><strong>Th&ocirc;ng tin chi tiết về sản phẩm</strong><br><strong>M&atilde; gi&agrave;y: PCMFWLF 752</strong><br><strong>Thiết kế</strong></h4>\n<ul>\n<li>Thiết kế độc đ&aacute;o, h&agrave;ng đầu hiện nay</li>\n<li>Thiết kế ấn tượng, viền chỉ may tinh xảo</li>\n<li>Logo Pierre Cardin dập nổi sang trọng</li>\n<li>&Ecirc;m &aacute;i kh&ocirc;ng g&acirc;y sưng mỏi&nbsp;v&agrave; chống b&aacute;m m&ugrave;i hiệu quả</li>\n<li>Ph&ugrave; hợp trang phục trong v&agrave; ngo&agrave;i m&ocirc;i trường c&ocirc;ng sở</li>\n</ul>\n<h4><strong>Chất liệu sản phẩm</strong></h4>\n<ul>\n<li>Chất liệu da thật&nbsp;nhập khẩu 100% c&oacute; độ gi&agrave;y lớp da mũ&nbsp;từ 1.6 mm đến 1.8 mm</li>\n<li>Da được xử l&yacute; đảm bảo về quy tr&igrave;nh n&ecirc;n sử dụng c&agrave;ng l&acirc;u th&igrave; d&acirc;y lưng sẽ c&agrave;ng được mềm mại, dẻo dai v&agrave; tăng độ b&oacute;ng mịn</li>\n<li>Tổng độ d&agrave;y da gấp 02 lần những loại gi&agrave;y th&ocirc;ng thường tr&ecirc;n thị trường, bền chắc, &ecirc;m &aacute;i.</li>\n<li>Da b&ograve; mặt&nbsp;mềm mại, lớp da l&oacute;t từ 1 mm đến 1.2 m.</li>\n<li>Kiểu d&aacute;ng gi&agrave;y Pierre Cardin được thiết kế trẻ trung, năng động v&agrave; sang trọng.</li>\n<li>Sản phẩm sử dụng c&ocirc;ng nghệ may Cement&nbsp;&nbsp;&eacute;p keo đế cho độ bền vượt trội.</li>\n<li>Pierre Cardin Paris Vietnam l&agrave; thương hiệu thời trang quốc tế h&agrave;ng đầu khẳng định gu thời trang s&agrave;nh điệu, thời thượng v&agrave; đẳng cấp.</li>\n</ul>\n<h4><strong>Cam kết về sản phẩm</strong></h4>\n<ul>\n<li>Miễn ph&iacute; vận chuyển to&agrave;n quốc cho tất cả c&aacute;c sản phẩm</li>\n<li>Cam kết đ&uacute;ng chất liệu, m&agrave;u sắc sản phẩm</li>\n</ul>\n<h4><strong>Hướng dẫn bảo quản</strong></h4>\n<ul>\n<li>Tr&aacute;nh tiếp x&uacute;c với nước v&agrave; nhiệt độ cao</li>\n<li>N&ecirc;n l&agrave;m sạch bằng xi đ&aacute;nh gi&agrave;y, lotion dưỡng da v&agrave; d&ugrave;ng khăn ẩm sạch để lau sản phẩm.</li>\n<li>Kh&ocirc;ng đ&aacute;nh xi kh&aacute;c m&agrave;u, xi nước t&aacute;c động nhiệt độ n&oacute;ng, lạnh l&ecirc;n sản phẩm.</li>\n</ul>\n<p>Gi&aacute; sản phẩm tr&ecirc;n Tiki đ&atilde; bao gồm thuế theo luật hiện h&agrave;nh. B&ecirc;n cạnh đ&oacute;, tuỳ v&agrave;o loại sản phẩm, h&igrave;nh thức v&agrave; địa chỉ giao h&agrave;ng m&agrave; c&oacute; thể ph&aacute;t sinh th&ecirc;m chi ph&iacute; kh&aacute;c như ph&iacute; vận chuyển, phụ ph&iacute; h&agrave;ng cồng kềnh, thuế nhập khẩu (đối với đơn h&agrave;ng giao từ nước ngo&agrave;i c&oacute; gi&aacute; trị tr&ecirc;n 1 triệu đồng).....</p>\n<div class=\"ddict_btn\" style=\"top: 24px; left: 246.25px;\"><img src=\"chrome-extension://bpggmmljdiliancllaapiggllnkbjocb/logo/48.png\"></div>','https://firebasestorage.googleapis.com/v0/b/project-6817180433835635924.appspot.com/o/products%2Fbanrh%2Faef05b0f-dd79-4358-9981-5effe14735a6?alt=media&token=d34bd9a8-9b89-4022-939b-6772f756aae3',9999,0,'in_stock',12,3,NULL,1,1,1,1,'2023-12-19 22:20:21','2023-12-20 07:44:39');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provinceghn`
--

DROP TABLE IF EXISTS `provinceghn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provinceghn` (
  `id` int(11) NOT NULL,
  `province_name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provinceghn`
--

LOCK TABLES `provinceghn` WRITE;
/*!40000 ALTER TABLE `provinceghn` DISABLE KEYS */;
INSERT INTO `provinceghn` VALUES (201,'Hà Nội'),(202,'Hồ Chí Minh'),(203,'Đà Nẵng'),(204,'Đồng Nai'),(205,'Bình Dương'),(206,'Bà Rịa - Vũng Tàu'),(207,'Gia Lai'),(208,'Khánh Hòa'),(209,'Lâm Đồng'),(210,'Đắk Lắk'),(211,'Long An'),(212,'Tiền Giang'),(213,'Bến Tre'),(214,'Trà Vinh'),(215,'Vĩnh Long'),(216,'Đồng Tháp'),(217,'An Giang'),(218,'Sóc Trăng'),(219,'Kiên Giang'),(220,'Cần Thơ'),(221,'Vĩnh Phúc'),(223,'Thừa Thiên - Huế'),(224,'Hải Phòng'),(225,'Hải Dương'),(226,'Thái Bình'),(227,'Hà Giang'),(228,'Tuyên Quang'),(229,'Phú Thọ'),(230,'Quảng Ninh'),(231,'Nam Định'),(232,'Hà Nam'),(233,'Ninh Bình'),(234,'Thanh Hóa'),(235,'Nghệ An'),(236,'Hà Tĩnh'),(237,'Quảng Bình'),(238,'Quảng Trị'),(239,'Bình Phước'),(240,'Tây Ninh'),(241,'Đắk Nông'),(242,'Quảng Ngãi'),(243,'Quảng Nam'),(244,'Thái Nguyên'),(245,'Bắc Kạn'),(246,'Cao Bằng'),(247,'Lạng Sơn'),(248,'Bắc Giang'),(249,'Bắc Ninh'),(250,'Hậu Giang'),(252,'Cà Mau'),(253,'Bạc Liêu'),(258,'Bình Thuận'),(259,'Kon Tum'),(260,'Phú Yên'),(261,'Ninh Thuận'),(262,'Bình Định'),(263,'Yên Bái'),(264,'Lai Châu'),(265,'Điện Biên'),(266,'Sơn La'),(267,'Hòa Bình'),(268,'Hưng Yên'),(269,'Lào Cai');
/*!40000 ALTER TABLE `provinceghn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `rating` tinyint(5) unsigned NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_product_id_foreign` (`product_id`),
  KEY `reviews_user_id_foreign` (`user_id`),
  CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (3,10,13,4,'Đã mua dùng thử và rất ưng ý, sẽ còn ủng hộ shop trong tương lai','2023-11-26 07:11:52','2023-11-26 07:11:52'),(4,10,13,5,'Good job amazing','2023-11-26 07:16:22','2023-11-26 07:16:22'),(5,10,13,3,'Good job amazing','2023-11-26 07:16:30','2023-11-26 07:16:30'),(6,11,13,5,'Good job amazing','2023-11-26 07:16:38','2023-11-26 07:16:38'),(7,12,13,4,'Good job amazing','2023-11-26 07:16:42','2023-11-26 07:16:42'),(10,15,13,5,'Good job amazing','2023-11-26 07:16:57','2023-11-26 07:16:57'),(11,15,13,5,'Good job amazing','2023-11-26 07:16:58','2023-11-26 07:16:58'),(12,15,13,5,'Good job amazing','2023-11-26 07:16:58','2023-11-26 07:16:58'),(13,15,13,5,'Good job amazing','2023-11-26 07:16:59','2023-11-26 07:16:59'),(14,11,13,5,'Good job amazing','2023-12-02 07:47:12','2023-12-02 07:47:12'),(15,11,13,5,'Sản phẩm này ngon','2023-12-02 07:47:24','2023-12-02 07:47:24'),(16,11,13,2,'Không Ok lắm','2023-12-02 07:52:07','2023-12-02 07:52:07'),(17,11,13,4,'tạm tạm được','2023-12-02 07:52:21','2023-12-02 07:52:21'),(18,11,13,3,'nhìn như cc','2023-12-02 07:52:29','2023-12-02 07:52:29'),(19,11,13,1,'k bao giờ mua nữa','2023-12-02 07:52:39','2023-12-02 07:52:39'),(20,13,49,5,'Đã dùng thử và thấy quá là OK','2023-12-20 08:11:03','2023-12-20 08:11:03'),(21,20,49,3,'Tạm','2023-12-20 08:12:20','2023-12-20 08:12:20'),(22,23,49,3,NULL,'2023-12-20 08:14:44','2023-12-20 08:14:44'),(23,23,49,1,NULL,'2023-12-20 08:15:12','2023-12-20 08:15:12');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sellers`
--

DROP TABLE IF EXISTS `sellers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sellers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `address_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT 13,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sellers_address_id_foreign` (`address_id`),
  KEY `sellers_user_id_foreign` (`user_id`),
  CONSTRAINT `sellers_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sellers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sellers`
--

LOCK TABLES `sellers` WRITE;
/*!40000 ALTER TABLE `sellers` DISABLE KEYS */;
/*!40000 ALTER TABLE `sellers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `value` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'facebook_url','https://www.facebook.com/profile.php?id=100040867566504','2023-11-10 02:45:28','2023-11-23 20:58:23'),(2,'logo','https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FSettings%2Flogo.webp?alt=media&token=99bf3c3e-1493-4bb1-9f6e-69d1f4d1b49b','2023-11-23 20:55:11','2023-11-23 20:55:11'),(3,'main_banner','https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FSettings%2Fmain-banner.webp?alt=media&token=ff1371da-13b4-480c-a21c-51cbf28eeb3b','2023-11-23 20:55:51','2023-11-23 20:55:51'),(4,'child_banner','\"https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FSettings%2F1.webp?alt=media&token=3ae20655-09c6-4d97-8ce9-8f36357620de\",\"https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FSettings%2F2.webp?alt=media&token=6fbfd929-79de-44ba-8837-8dcc21b59d77\",\"https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FSettings%2F3.webp?alt=media&token=3b2d6e3e-9b87-41bc-a286-4baeec47f406\",\"https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FSettings%2F4.webp?alt=media&token=b9d6271d-0a59-406c-8194-21bc400b122b\",\"https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FSettings%2F5.webp?alt=media&token=4c325b96-591f-4007-8ca4-06740168b7ae\",\"https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FSettings%2F6.webp?alt=media&token=862134c6-8760-4aa6-a683-fa29699183b3\",\"https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FSettings%2F7.webp?alt=media&token=e772754d-d42e-486d-a1a0-c64c31efb898\",\"https://firebasestorage.googleapis.com/v0/b/iwebapp-a2c2d.appspot.com/o/images%2FSettings%2F8.webp?alt=media&token=8e78f1fd-94bb-482d-9331-fb8b0fe1cf1d\"','2023-11-23 20:57:29','2023-11-23 20:57:29');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `description` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'banchay',NULL),(2,'sale',NULL),(3,'tivi',NULL),(4,'tulanh',NULL),(5,' sale',NULL);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `role` varchar(20) NOT NULL DEFAULT 'USER',
  `remember_token` varchar(100) DEFAULT NULL,
  `address_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_number_unique` (`phone_number`),
  KEY `users_address_id_foreign` (`address_id`),
  CONSTRAINT `users_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'hpt','hptprobook@gmail.com',NULL,NULL,'$2y$10$ubun7sQZl0RJudTdKoU8ZO6JKliwx0D5aOH17/iOn2MiPOV6j5zy2',NULL,NULL,'active','ADMIN',NULL,NULL,'2023-10-15 07:39:14','2023-10-15 07:39:14'),(2,'John Doe','user1@mail.com',NULL,NULL,'$2y$10$aaQleogwL7Et5LUKDCxm4O/GvXWxhNpkJNq3XjhFGOpdU/YgzSKLe',NULL,NULL,'active','ADMIN',NULL,NULL,'2023-10-15 19:53:14','2023-10-15 19:53:14'),(3,'Elian Morissette','erich.pollich@example.com',NULL,'2023-10-19 19:05:51','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','m0SrQM1CmG',NULL,'2023-10-19 19:05:51','2023-10-19 19:05:51'),(4,'Edmond Pfeffer','hortense.witting@example.org',NULL,'2023-10-19 19:05:51','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','sa1yACtmix',NULL,'2023-10-19 19:05:51','2023-10-19 19:05:51'),(5,'Cecelia Koch III','witting.lilyan@example.com',NULL,'2023-10-19 19:05:51','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','pLgiVKybT9',NULL,'2023-10-19 19:05:51','2023-10-19 19:05:51'),(6,'Shannon Strosin','amber38@example.net',NULL,'2023-10-19 19:05:51','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','9ejGixmXrY',NULL,'2023-10-19 19:05:51','2023-10-19 19:05:51'),(7,'Estefania Mayer','lavonne.hintz@example.net',NULL,'2023-10-19 19:05:51','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','v6xT6lg59U',NULL,'2023-10-19 19:05:51','2023-10-19 19:05:51'),(8,'Emely Ziemann','pete.murphy@example.org',NULL,'2023-10-19 19:05:51','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','zemFPO8cPr',NULL,'2023-10-19 19:05:51','2023-10-19 19:05:51'),(9,'Kaya Barrows','hhowe@example.org',NULL,'2023-10-19 19:05:51','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','hQJ7bShrbQ',NULL,'2023-10-19 19:05:51','2023-10-19 19:05:51'),(10,'Dr. Hadley Renner I','vhuels@example.org',NULL,'2023-10-19 19:05:51','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','df3Wh6aWQP',NULL,'2023-10-19 19:05:51','2023-10-19 19:05:51'),(11,'Mr. Alvis Gislason III','loraine97@example.net',NULL,'2023-10-19 19:05:51','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','0rPiNPz6yt',NULL,'2023-10-19 19:05:51','2023-10-19 19:05:51'),(12,'Beulah Johnson IV','hhilpert@example.org',NULL,'2023-10-19 19:05:51','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','5koMfSoKlA',NULL,'2023-10-19 19:05:51','2023-10-19 19:05:51'),(13,'PHT','test@gmail.com','0833129021','2023-10-19 19:05:51','$2y$10$TaqI3w5TVZipqXnqc3wFnO39uCc/0kBgSJ.5GAT5MO9bhIbzxklYC',NULL,NULL,'active','SELLER','dq1FS0CJ9V',NULL,'2023-10-19 19:05:51','2023-11-30 19:20:20'),(14,'Phan Thanh Hoá','hptp@gmail.com','0833129022',NULL,'$2y$10$2UdWu.Cp6mW0KWPLX5rqguhUzvDQuTwd4MJoqP1A6CDt3Kj4K0Lg.','female','2000-04-14','active','USER',NULL,NULL,'2023-10-28 20:40:41','2023-12-15 19:35:59'),(15,'John Doe','admin23@gmail.com',NULL,NULL,'$2y$10$vG5ejDou8wRDvv/qTpBEMOElv6h3C61xiQyFbr.deXlICp9Pzi8ke',NULL,NULL,'active','USER',NULL,NULL,'2023-10-28 20:46:38','2023-10-28 20:46:38'),(16,'Wilford Murazik','marta36@example.net',NULL,'2023-11-01 02:14:59','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','cutipOQr8d',NULL,'2023-11-01 02:14:59','2023-11-01 02:14:59'),(17,'Prof. Berta Denesik III','schmitt.keyon@example.net',NULL,'2023-11-01 02:14:59','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','ew3QJmEqaY',NULL,'2023-11-01 02:14:59','2023-11-01 02:14:59'),(18,'Jana Fay','gordon12@example.com',NULL,'2023-11-01 02:14:59','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','9XGvzXpcuX',NULL,'2023-11-01 02:14:59','2023-11-01 02:14:59'),(19,'Casey Marks','rhalvorson@example.com',NULL,'2023-11-01 02:14:59','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','NAwOU7uRaA',NULL,'2023-11-01 02:14:59','2023-11-01 02:14:59'),(20,'Maryse Mante','florine.weimann@example.org',NULL,'2023-11-01 02:14:59','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','qZ1gXDjWjj',NULL,'2023-11-01 02:14:59','2023-11-01 02:14:59'),(21,'Skylar Howell Jr.','wilhelm46@example.org',NULL,'2023-11-01 02:14:59','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','kW30BP9kzK',NULL,'2023-11-01 02:14:59','2023-11-01 02:14:59'),(22,'Dorris Cormier','unolan@example.com',NULL,'2023-11-01 02:14:59','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','HQ4iebujrV',NULL,'2023-11-01 02:14:59','2023-11-01 02:14:59'),(23,'Melba Rutherford','carolyne.pfeffer@example.com',NULL,'2023-11-01 02:14:59','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','6bQJr3Oycb',NULL,'2023-11-01 02:14:59','2023-11-01 02:14:59'),(24,'Dr. Bartholome Bosco','kenny.koelpin@example.org',NULL,'2023-11-01 02:14:59','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','Xu0jyJIHwD',NULL,'2023-11-01 02:14:59','2023-11-01 02:14:59'),(25,'Dr. Lina Kertzmann III','shanelle.mclaughlin@example.net',NULL,'2023-11-01 02:14:59','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,'active','USER','4v3qW6GTOc',NULL,'2023-11-01 02:14:59','2023-11-01 02:14:59'),(27,'Phan Thanh Hoá','hptp1@gmail.com',NULL,NULL,'$2y$10$LGGsXwlI7c0WDitu.KEqtO6JcsS24Q6x3luZnSqtYOBkDvH.uMEEG',NULL,NULL,'active','USER',NULL,NULL,'2023-11-24 00:21:47','2023-11-24 00:21:47'),(28,'Phan Thanh Hoá','hptp2@gmail.com',NULL,NULL,'$2y$10$ImyvZr3eOWcd6R1ua4DbwutNyXza/mcywOnueSc.c5a3JrSH39.GO',NULL,NULL,'active','USER',NULL,NULL,'2023-11-24 00:22:08','2023-11-24 00:22:08'),(29,'hoaphan','sd',NULL,NULL,'$2y$10$EHHHk2AXYTPIVXGH7IHGNeeTiAH3PcHiWlUb118CKwfCWBMDdyLja',NULL,NULL,'active','USER',NULL,NULL,'2023-11-24 00:26:46','2023-11-24 00:26:46'),(30,'hptprobook','123456@gmail.com',NULL,NULL,'$2y$10$iw.eWLNHEuaG2HXOyRCMB.h0ANOZj5Weld2jPZg3FgdZm566GBdii',NULL,NULL,'active','USER',NULL,NULL,'2023-11-24 00:28:04','2023-11-24 00:28:04'),(31,'hoaphan','hot@gmail.com',NULL,NULL,'$2y$10$kQZWR9p0QgCcUgsqLPJhROBcvEDJ11zNSov5vf0fmZuOTPFvJuzra',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:09:51','2023-11-25 01:09:51'),(32,'hoaphan','hot1@gmail.com',NULL,NULL,'$2y$10$GHVDAGVjNrCgetDJqDZqoOeCxxrmsn4skNTYonfONW5.UfSmbWkcO',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:16:23','2023-11-25 01:16:23'),(33,'12344','1234@gmail.com',NULL,NULL,'$2y$10$cxztEa79GFg04BUKu6twkOg27hD/RK8LrPwsw.bTrW.qqsjgMWtue',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:18:11','2023-11-25 01:18:11'),(34,'12344','12345@gmail.com',NULL,NULL,'$2y$10$1UJuc2dV3pRiZv/fju7B0eqWC5KgdUfqdiYivq6KI2o0/jKIlLivy',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:19:08','2023-11-25 01:19:08'),(35,'123456','123456@gmail.com2',NULL,NULL,'$2y$10$6OW9YDV4ZPN15mzoYfg5wOTWbgN5kOu38jGuO6U1qWyJn/TjIJ.02',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:22:29','2023-11-25 01:22:29'),(36,'123456','1234562@gmail.com2',NULL,NULL,'$2y$10$yBrADBB5/DLF66kJ104Bye0YZESc/BtWmy8lufqVCPsWpp84R3fn2',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:23:42','2023-11-25 01:23:42'),(37,'12345412','12ni@gmail.com',NULL,NULL,'$2y$10$CxBjLS2YnbMETacHcUgzCeWgnNCuuBwC/lT/2Y7EQDvH5PWEXjGa2',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:33:36','2023-11-25 01:33:36'),(38,'12345412','12n23i@gmail.com',NULL,NULL,'$2y$10$gr4gdSaW73IbFbN8TEl9FOBZpWA3yxL13Ck5oBPxaDaOWMPLmqmKK',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:33:59','2023-11-25 01:33:59'),(39,'12345412','12n23wi@gmail.com',NULL,NULL,'$2y$10$9eSG41NgA1IACqD9QF.WZ.lfudpqmrmSHFyn5ip60jPWp/u6BEyLe',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:34:12','2023-11-25 01:34:12'),(40,'12345623','admi2n@gmail.com',NULL,NULL,'$2y$10$fQG/PiN03UEiJPnKtSxcZuF1VfegRET4k4rtaPpFXaqWHQjiCg9Cm',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:35:00','2023-11-25 01:35:00'),(41,'123456213','123412@gmail.com',NULL,NULL,'$2y$10$PePC/aoZ5gSSOmqP/j9EsORdndDWnOuS6IUfOqHmbJJcgbIAwf/fS',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:35:28','2023-11-25 01:35:28'),(42,'hptprobooksd@gmail.com','hptprobooksd@gmail.com',NULL,NULL,'$2y$10$SFSqP8EfpgNTHymrlc2XW.o234eDUZZsUG69PjJLfF4ynSPI/G0YG',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:37:52','2023-11-25 01:37:52'),(43,'hptproboos3ek@gmail.com','hptproboos3ek@gmail.com',NULL,NULL,'$2y$10$hYCiB3KYGZnOQsJ0uTInDumCm0Tc2qM9ItyhwucgrwYHlHONBxXhi',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:40:12','2023-11-25 01:40:12'),(44,'hoaphan0420@gmail.com','hoaphan02420@gmail.com',NULL,NULL,'$2y$10$EPOOhENN461E.oMX9MwfSOvh6PKN28wxLsrChWRAOwYSEJ0pSbbJ.',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:46:46','2023-11-25 01:46:46'),(45,'213412','123421321@gmail.com',NULL,NULL,'$2y$10$8zorWeHrZyZPxzf9O/74oeUucyEGTKTjbf8tHIEbzMrVxkJVxIIk2',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 01:55:04','2023-11-25 01:55:04'),(46,'1231242','adminqeqw@gmail.com',NULL,NULL,'$2y$10$sOl6GdC5tnR./sJI0fTH0um4vMO7qPYhPTttk24Q4XqV1om47sYtu',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 02:03:52','2023-11-25 02:03:52'),(47,'hoaphan0420@gmail.com','admin1232@gmail.com',NULL,NULL,'$2y$10$mVYLzZmZlPhsa5ZOnNuK9O0C8CzZlU.4Tv84Pd0Dty8LOoCOwytVC',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 19:28:56','2023-11-25 19:28:56'),(48,'123213123','hotpr@gmail.com',NULL,NULL,'$2y$10$aLYcOItghc3u96MAQhtbJ.U/LdHhhU/eTsJpDMGjOVN9O.HBW3jTC',NULL,NULL,'active','USER',NULL,NULL,'2023-11-25 19:30:02','2023-11-25 19:30:02'),(49,'Phan Thanh Hóa','hp@gmail.com','0332741249',NULL,'$2y$10$3bslozlo9h7X3fQKHjtdceFeLQ/Up4WIdMkC0ABuKgv4tGMfZ0YE.','male','2000-04-14','active','USER',NULL,NULL,'2023-12-19 06:33:53','2023-12-19 07:12:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant_types`
--

DROP TABLE IF EXISTS `variant_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant_types`
--

LOCK TABLES `variant_types` WRITE;
/*!40000 ALTER TABLE `variant_types` DISABLE KEYS */;
INSERT INTO `variant_types` VALUES (1,'Màu sắc'),(2,'Kích thước'),(5,'Kích cỡ');
/*!40000 ALTER TABLE `variant_types` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-21 22:06:34
