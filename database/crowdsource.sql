-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: crowdsource
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hashed` varchar(255) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `admin_chk_2` CHECK ((`gender` in (_utf8mb4'laki-laki',_utf8mb4'perempuan')))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'example@gmail.com','example','482c811da5d5b4bc6d497ffa98491e38','laki-laki','Bandung','081123456789'),(2,'dinkesbdg@gmail.com','Dinas Kesehatan Kota Bandung','96b33694c4bb7dbd07391e0be54745fb','laki-laki','Bandung','081123456000'),(3,'disdikjabar@gmail.com','Dinas Pendidikan Jawa Barat','74ee55083a714aa3791f8d594fea00c9','laki-laki','Cirebon','081178364512'),(4,'susanto@yahoo.com','Susanto','5c06181e1485af4fc4051d2c5aa0caba','laki-laki','Cimahi','081000034521'),(12,'admin@mail.com','Admin','81dc9bdb52d04dc20036dbd8313ed055','perempuan','Bandung','12341234'),(13,'yasyfiana.yasyfiana@gmail.com','yasyfiana','25d55ad283aa400af464c76d713c07ad','perempuan','Serang, Banten, Indonesia','082110008202');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `id_answer` int NOT NULL AUTO_INCREMENT,
  `id_question` int NOT NULL,
  `id_survey` int NOT NULL,
  `answer` text NOT NULL,
  PRIMARY KEY (`id_answer`),
  KEY `id_survey` (`id_survey`),
  KEY `id_question` (`id_question`),
  CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`id_question`) REFERENCES `question` (`id_question`),
  CONSTRAINT `FK_SurveyAnswer` FOREIGN KEY (`id_survey`) REFERENCES `survey` (`id_survey`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (15,1,13,'option-1'),(16,2,13,'2021-03-02'),(17,3,13,'123'),(18,4,13,'option-2'),(19,5,13,'option-3'),(20,6,13,'Isian singkat'),(21,7,13,' Text areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText area');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link`
--

DROP TABLE IF EXISTS `link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `link` (
  `randomlink` varchar(255) NOT NULL,
  `id_survey` int NOT NULL,
  `id_admin` int NOT NULL,
  PRIMARY KEY (`randomlink`),
  KEY `id_survey` (`id_survey`),
  KEY `id_admin` (`id_admin`),
  CONSTRAINT `FK_SurveyLink` FOREIGN KEY (`id_survey`) REFERENCES `survey` (`id_survey`),
  CONSTRAINT `link_ibfk_2` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link`
--

LOCK TABLES `link` WRITE;
/*!40000 ALTER TABLE `link` DISABLE KEYS */;
INSERT INTO `link` VALUES ('uxEJF3p7l0cOeqK2DJxGU',1,1);
/*!40000 ALTER TABLE `link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id_question` int NOT NULL AUTO_INCREMENT,
  `id_survey` int NOT NULL,
  `order_number` int NOT NULL,
  `active_status` tinyint(1) DEFAULT NULL,
  `section` int DEFAULT NULL,
  `details` text,
  PRIMARY KEY (`id_question`),
  KEY `id_survey` (`id_survey`),
  CONSTRAINT `FK_SurveyQuestion` FOREIGN KEY (`id_survey`) REFERENCES `survey` (`id_survey`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,13,0,1,1,'{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkboxes\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1616919612985\",\"other\":false,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true}]}'),(2,13,1,1,1,'{\"type\":\"date\",\"required\":false,\"label\":\"Pilih Tanggal\",\"className\":\"form-control\",\"name\":\"date-1616919614893\"}'),(3,13,2,1,1,'{\"type\":\"file\",\"required\":false,\"label\":\"Upload File\",\"className\":\"form-control\",\"name\":\"file-1616919613868\",\"subtype\":\"file\",\"multiple\":false}'),(4,13,3,1,1,'{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"Header\"}'),(5,13,4,1,1,'{\"type\":\"number\",\"required\":false,\"label\":\"Angka\",\"className\":\"form-control\",\"name\":\"number-1616919618943\"}'),(6,13,5,1,1,'{\"type\":\"paragraph\",\"subtype\":\"p\",\"label\":\"Paragraf\"}'),(7,13,6,1,1,'{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1616919620087\",\"other\":false,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]}'),(8,13,7,1,1,'{\"type\":\"select\",\"required\":false,\"label\":\"Select\",\"className\":\"form-control\",\"name\":\"select-1616919620819\",\"multiple\":false,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]}'),(9,13,8,1,1,'{\"type\":\"text\",\"required\":false,\"label\":\"Isian Singkat\",\"className\":\"form-control\",\"name\":\"text-1616919621331\",\"subtype\":\"text\"}'),(10,13,9,1,1,'{\"type\":\"textarea\",\"required\":false,\"label\":\"Text Area\",\"className\":\"form-control\",\"name\":\"textarea-1616919621918\",\"subtype\":\"textarea\"}');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey` (
  `id_survey` int NOT NULL AUTO_INCREMENT,
  `id_admin` int NOT NULL,
  `survey_title` varchar(255) DEFAULT NULL,
  `decription` varchar(4096) DEFAULT NULL,
  PRIMARY KEY (`id_survey`),
  KEY `id_admin` (`id_admin`),
  CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey`
--

LOCK TABLES `survey` WRITE;
/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
INSERT INTO `survey` VALUES (1,1,'Survey Kepuasan Layanan',''),(2,3,'Survey Kepuasan Pelayanan Pendidikan Sekolah Dasar',''),(3,3,'Evaluasi Kualitas Pembelajaran Jarak Jauh','Survey untuk menilai kualitas dari pelaksanaan Pembelajaran Jarak Jauh'),(4,2,'Feedback Pelayanan Kesehatan','Survey ini digunakan untuk mengetahui performansi dari pelayanan kesehatan yang disediakan oleh XYZ. Mohon diisi sesuai dengan pengalaman masing-masing'),(5,1,'Survey Mengenai User Experience','Survey untuk mengukur user experience yang dialami oleh pengguna website Crowd Source. Hasil dari survey ini akan digunakan untuk meningkatkan kualitas dari website Crowd Source. Estimasi waktu pengisian survey ini adalah 5 menit.'),(6,2,'Survey Konsumsi Makanan','Survey untuk mengetahui tren dari konsumsi makanan'),(7,1,'Survey Pengeluaran Sehari-hari','Survey untuk mendata pengeluaran masyarakat untuk kebutuhan sehari-hari'),(8,1,'Pengalaman Terhadap Transportasi Umum',''),(9,2,'Survey Aksesibilitas Dokter',''),(10,1,'Survey Sarana dan Prasarana Tempat Wisata',''),(11,1,'',''),(12,2,'Survei Kesehatan Masyarakat','Survei untuk mengetahui kondisi kesehatan masyarakat selama pandemi COVID-19'),(13,1,'Test survey','');
/*!40000 ALTER TABLE `survey` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-28 15:52:37
