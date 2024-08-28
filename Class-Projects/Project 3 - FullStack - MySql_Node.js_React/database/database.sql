CREATE DATABASE  IF NOT EXISTS `vacationdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacationdb`;
-- MySQL dump 10.13  Distrib 8.4.0, for Win64 (x86_64)
--
-- Host: localhost    Database: vacationdb
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `vacationId_idx` (`vacationId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userID`),
  CONSTRAINT `vacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (2,3),(3,3),(25,3),(2,6),(31,6),(2,7),(3,7),(4,7),(25,7),(26,7),(27,7),(28,7),(29,7),(2,10),(31,10),(31,15),(2,16),(31,16),(2,19);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userFname` varchar(45) NOT NULL,
  `userLname` varchar(45) NOT NULL,
  `userEmail` varchar(45) NOT NULL,
  `userPass` varchar(45) NOT NULL,
  `userAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Dima','Kuznets','dim@email.com','123456',1),(2,'Vika','Kuznets','vik@kuz.ru','456789',0),(3,'Serg','Kovala','se@walla.co.il','1234asd123',0),(4,'Rafi','Kuznets','rakuz@gmail.com','123xzcca412451',0),(25,'Karolina','Moznie','karmoz@gmail.com','123456789',0),(26,'Veronica','Moznie','veronika16@walla.com','123asd456qwe789',0),(27,'Tatyna','Petrov','tanyap@yahoo.ru','123qwe456',0),(28,'Anna','Denesova','anna@hotmail.com','Anna18',0),(29,'Anton','Kandy','sanchis30@mexico.esp','asdQWE',0),(30,'Valeri','Pazornik','bigpazor@gmail.com','veryBIGpazor',0),(31,'Andrey','Haimov','therope@jmail.co.il','7777',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationId` int NOT NULL AUTO_INCREMENT,
  `vacationDest` varchar(45) NOT NULL,
  `vacationDesc` varchar(1000) NOT NULL,
  `vacationStart` date NOT NULL,
  `vacationEnd` date NOT NULL,
  `vacationPrice` varchar(45) NOT NULL,
  `vacationImageName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vacationId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (3,'New York','Travel to New York is to travel to the great city par excellence. Icon of the United States and the world in general, to this great city you have to travel at least once in your life. Even if it is done, you run the risk of wanting to return again and again to discover new corners, to stroll through its charming neighborhoods, to feel protagonist in one of its innumerable movie sets, to know one of the most multicultural cities in the world.','2024-10-10','2024-10-24','1500','3ec8c2e3-5855-41ca-ac53-479130f516fc.jpg'),(4,'Switzerland','Enjoy spectacular Switzerland at its holiday best. With the glistening peaks of Swiss Alps as your backdrop; you will experience the holiday traditions of Europe on an active itinerary as you explore Switzerland during the Christmas season.','2024-12-22','2025-01-28','2000','1c8be465-1c45-426f-bf63-9b4f3ad1c860.jpeg'),(6,'Morocco','In a place where riding a camel over dunes at sunset is not unusual, where tagines spiked with saffron perfume the air and Amazigh people herd goats on the slopes of the High Atlas Mountains, the word remarkable just does not cut it. Whether you are wandering the wind-battered port town of Essaouira, exploring the famous Kasbah in Aït Benhaddou or sleeping beneath the Saharan stars, a healthy dose of Maghreb hospitality will make a Morocco tour truly unforgettable.','2024-08-24','2024-08-31','1250','bb15c5d7-d2c8-45a5-bde8-459b16bdf800.jpg'),(7,'Greece','Greece is ancient sun-bleached ruins piercing blue skies, the balmy Aegean lapping an endless coastline and a culture alive with passionate music, wonderful cuisine and thrill-seeking activities.','2024-08-23','2024-08-30','700','f3bb6182-2c0a-4b78-b678-f95b40106327.jpg'),(8,'Japan','Japan is truly timeless, a place where ancient traditions fuse with modern life, as if it were the most natural thing in the world.','2024-08-30','2024-09-13','4000','072c6a89-2be8-4365-aafd-310c680f83d0.jpg'),(9,'Canada','The changing colors of forested valleys and national parks, the freeze and flow of glacial lakes, the light and shade of the Rockies snow-capped mountains – Canada is North Americas natural masterpiece. Summer is for surfing and whale-watching off Vancouver Island and seeing Lake Louise in all its blue-hued glory. Winter is for snowshoeing and cross-country skiing in Alberta and soaking in natural hot springs in British Colombia. Whatever the season, you will be able to find friendly locals, First Nations cultures, pristine landscapes, and a delicious plate of poutine.','2024-11-01','2024-11-30','5000','e13c28d8-9f6d-43f0-bf68-37e8113dca85.jpg'),(10,'Budapest','Capital is blessed with a bounty of art nouveau architecture, quirky ruin bars and gorgeous bathhouses replenished by mineral-rich hot springs.','2024-11-06','2024-11-09','500','90c5da86-1f93-46d2-82a2-ca059682240b.jpg'),(11,'Sydney','Sydney, spectacularly draped around its glorious harbor and beaches, has visual wow factor like few other cities. Scratch the surface and it only gets better.','2024-10-06','2024-10-20','3500','d60ce58e-fed4-4d39-a342-533419390d8f.jpg'),(13,'India','With its sumptuous mix of traditions, spiritual beliefs, festivals, architecture and landscapes, India will set your memories ablaze long after you have left its shores.','2024-11-01','2024-11-30','4500','57b58541-7c2f-4110-9b56-44240b08e74f.jpg'),(14,'New Zealand','Get ready for mammoth national parks, dynamic Māori culture and world-class surfing and skiing. New Zealand can be mellow or action-packed, but it is always epic.','2025-03-02','2025-03-16','3750','279cc2dd-225b-4ad0-b45a-62a23f4f1bbc.jpg'),(15,'Tuscany','With its lyrical landscapes, world-class art and a superb cucina contadina (farmer kitchen), the Tuscan experience is perfectly in symbiosis with the land.','2024-09-25','2024-09-28','500','739241de-0c4c-4d69-8ae0-4592e6339fdc.jpg'),(16,'Cape Town','A coming-together of cultures, cuisines and landscapes, there is nowhere quite like Cape Town, a singularly beautiful city crowned by the magnificent Table Mountain National Park.','2025-03-02','2025-03-13','2500','c89eb5d9-a385-4f3b-8fbb-8447690be5ec.jpg'),(17,'Jamaica','Jamaica comes with its own soundtrack. Groove to its singular rhythm as you explore the sandy beaches, lush mountains and unique flavors of this powerfully beautiful island.','2024-08-23','2024-08-30','1500','f7916a8f-679e-4e88-b0ae-a8fb224d90b9.jpg'),(18,'Hong Kong','Hong Kong welcomes visitors with an iconic skyline, a legendary kitchen, and lush, protected nature where rare birds and colorful traditions thrive.','2024-08-29','2024-09-10','2500','ff2dd7e0-0936-44e3-836a-8ac9b216456a.jpg'),(19,'Copenhagen','Copenhagen is the epitome of Scandi cool. Modernist lamps light New Nordic tables, bridges buzz with cycling commuters and locals dive into pristine waterways.','2025-01-04','2025-01-11','4250','ff349180-956d-4df9-8f33-7f9aeedea906.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-28  9:28:22
