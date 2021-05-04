-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: crowdsource
-- ------------------------------------------------------
-- Server version	8.0.19

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
  `submit_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_answer`),
  KEY `id_survey` (`id_survey`),
  KEY `id_question` (`id_question`),
  CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`id_question`) REFERENCES `question` (`id_question`),
  CONSTRAINT `FK_SurveyAnswer` FOREIGN KEY (`id_survey`) REFERENCES `survey` (`id_survey`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (1,32,9,'Budi','2021-04-09 19:51:42'),(2,33,9,'25','2021-04-09 19:51:42'),(3,34,9,'Ya','2021-04-09 19:51:43'),(4,32,9,'Tono','2021-04-09 19:52:02'),(5,33,9,'30','2021-04-09 19:52:02'),(6,34,9,'Tidak','2021-04-09 19:52:02'),(7,32,9,'Doni','2021-04-09 19:52:27'),(8,33,9,'33','2021-04-09 19:52:27'),(9,34,9,'Ya','2021-04-09 19:52:27'),(10,35,10,'[\"Tebih keraton\",\"Tangkuban Perahu\"]','2021-04-09 20:35:12'),(11,36,10,'Sudah baik','2021-04-09 20:35:13'),(12,35,10,'[\"Tangkuban Perahu\",\"Bukit Moko\"]','2021-04-09 20:35:31'),(13,36,10,'Kebersihan bisa ditingkatkan','2021-04-09 20:35:31'),(14,11,1,'Budi budi','2021-04-09 20:35:57'),(15,12,1,'Laki-laki','2021-04-09 20:35:57'),(16,13,1,'Sudah memuaskan','2021-04-09 20:35:57'),(17,11,1,'Siti','2021-04-09 20:36:10'),(18,12,1,'Perempuan','2021-04-09 20:36:10'),(19,13,1,'Mantap','2021-04-09 20:36:10');
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
INSERT INTO `link` VALUES ('asQYB4JvlaqTKIjLkllSY',5,1),('CsY4nIqjt0foMQW0yVl98',4,2),('ft-yzcCgQ5Uzf09gtZTuB',7,2),('G6WTi2zJ_65lmGn0P-Qgj',8,1),('jOV0DJswUHagLWsFLnqlT',10,1),('kZgkc6uhacfs8nbMMYkt6',3,3),('NNVY3TOuIfcV2AELI830S',9,2),('o8yAx2MXiNG4bpSvGxOBT',6,2),('pOw_ZkQ-08uSru0hDYe7D',2,3),('uxEJF3p7l0cOeqK2DJxGU',1,1);
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
  `section` int DEFAULT NULL,
  `details` text,
  PRIMARY KEY (`id_question`),
  KEY `id_survey` (`id_survey`),
  CONSTRAINT `FK_SurveyQuestion` FOREIGN KEY (`id_survey`) REFERENCES `survey` (`id_survey`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (11,1,0,1,'{\"type\": \"text\",\"required\": true,\"label\": \"Nama lengkap\",\"className\": \"form-control\",\"name\": \"text-1617374044157\"}'),(12,1,1,1,'{\"type\": \"select\",\"required\": true,\"label\": \"Jenis Kelamin\",\"className\": \"form-control\",\"name\": \"select-1617374054717\",\"multiple\": false,\"values\": [{\"label\": \"Laki-laki\",\"value\": \"Laki-laki\",\"selected\": true},{\"label\": \"Perempuan\",\"value\": \"Perempuan\",\"selected\": false}]}'),(13,1,2,1,'{\"type\": \"textarea\",\"required\": true,\"label\": \"Ceritakan kesan Anda terhadap layanan Jabar Digital Service\",\"className\": \"form-control\",\"name\": \"textarea-1617374090840\"}'),(14,2,0,1,'{\"type\": \"text\",\"required\": true,\"label\": \"Nama lengkap\",\"className\": \"form-control\",\"name\": \"text-1617375191346\"}'),(15,2,1,1,'{\"type\": \"date\",\"required\": false,\"label\": \"Tanggal lahir\",\"className\": \"form-control\",\"name\": \"date-1617375186637\"}'),(16,2,2,1,'{\"type\": \"textarea\",\"required\": true,\"label\": \"Ceritakan kesan Anda terhadap pelayanan pendidikan dasar di Jawa Barat\",\"className\": \"form-control\",\"name\": \"textarea-1617375062677\"}'),(17,3,0,1,'{\"type\": \"text\",\"required\": true,\"label\": \"Nama Sekolah\",\"className\": \"form-control\",\"name\": \"text-1617378526872\"}'),(18,3,1,1,'{\"type\": \"number\",\"required\": false,\"label\": \"Usia\",\"className\": \"form-control\",\"name\": \"number-1617378547431\"}'),(19,3,2,1,'{\"type\": \"textarea\",\"required\": true,\"label\": \"Ceritakan kesan Anda selama pembelajaran jarak jauh\",\"className\": \"form-control\",\"name\": \"textarea-1617378557983\"}'),(20,4,0,1,'{\"type\": \"text\",\"required\": true,\"label\": \"Nama\",\"className\": \"form-control\",\"name\": \"text-1617378740241\"}'),(21,4,1,1,'{\"type\": \"number\",\"required\": false,\"label\": \"Seberapa puas Anda terhadap pelayanan kesehatan (skala 1-10)\",\"className\": \"form-control\",\"name\": \"number-1617378745785\"}'),(22,5,0,1,'{\"type\": \"text\",\"required\": true,\"label\": \"Nama\",\"className\": \"form-control\",\"name\": \"text-1617378993562\"}'),(23,5,1,1,'{\"type\": \"textarea\",\"required\": true,\"label\": \"Ceritakan kesan Anda selama pembelajaran jarak jauh\",\"className\": \"form-control\",\"name\": \"textarea-1617379000717\"}'),(24,6,0,1,'{\"type\": \"number\",\"required\": false,\"label\": \"Usia\",\"className\": \"form-control\",\"name\": \"number-1617420026411\"}'),(25,6,0,1,'{\"type\": \"number\",\"required\": false,\"label\": \"Berapa kali dalam sehari Anda makan berat?\",\"className\": \"form-control\",\"name\": \"number-1617420027792\"}'),(26,6,1,1,'{\"type\": \"textarea\",\"required\": true,\"label\": \"Bagaimana kondisi kesehatan Anda berkaitan dengan makanan yang Anda konsumsi?\",\"className\": \"form-control\",\"name\": \"textarea-1617420031904\"}'),(27,7,0,1,'{\"type\": \"text\",\"required\": true,\"label\": \"Pekerjaan\",\"className\": \"form-control\",\"name\": \"text-1617420268572\"}'),(28,7,0,1,'{\"type\": \"number\",\"required\": true,\"label\": \"Berapa penghasilan Anda selama sebulan?\",\"className\": \"form-control\",\"name\": \"number-1617420274001\"}'),(29,7,1,1,'{\"type\": \"radio-group\",\"required\": true,\"label\": \"Apakah penghasilan itu cukup untuk memenuhi kebutuhan Anda?\",\"inline\": false,\"name\": \"radio-group-1617420353538\",\"other\": false,\"values\": [{\"label\": \"Ya\",\"value\": \"Ya\",\"selected\": false},{\"label\": \"Tidak\",\"value\": \"Tidak\",\"selected\": false}]}'),(30,8,0,1,'{\"type\":\"radio-group\",\"required\":true,\"label\":\"Seberapa sering Anda menggunakan transportasi umum?\",\"inline\":false,\"name\":\"radio-group-1617420820052\",\"other\":false,\"values\":[{\"label\":\"Sering\",\"value\":\"Sering\",\"selected\":true},{\"label\":\"Sedang\",\"value\":\"Sedang\",\"selected\":false},{\"label\":\"Jarang\",\"value\":\"Jarang\",\"selected\":false}]}'),(31,8,1,1,'{\"type\":\"textarea\",\"required\":true,\"label\":\"Apa saja yang perlu ditingkatkan dari layanan transportasi umum di Kota Bandung?\",\"className\":\"form-control\",\"name\":\"textarea-1617420868936\"}'),(32,9,0,1,'{\"type\":\"text\",\"required\":true,\"label\":\"Nama\",\"className\":\"form-control\",\"name\":\"text-1617421200014\"}'),(33,9,1,1,'{\"type\":\"number\",\"required\":true,\"label\":\"Usia\",\"className\":\"form-control\",\"name\":\"number-1617421221706\"}'),(34,9,2,1,'{\"type\":\"radio-group\",\"required\":false,\"label\":\"Apakah menurut Anda aksebilitas dokter sudah baik?\",\"inline\":false,\"name\":\"radio-group-1617421231830\",\"other\":false,\"values\":[{\"label\":\"Ya\",\"value\":\"Ya\",\"selected\":false},{\"label\":\"Tidak\",\"value\":\"Tidak\",\"selected\":false}]}'),(35,10,0,1,'{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Tempat wisata di Jawa Barat yang pernah Anda kunjungi\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1617421484500\",\"other\":true,\"values\":[{\"label\":\"Tebing keraton\",\"value\":\"Tebih keraton\",\"selected\":false},{\"label\":\"Tangkuban Perahu\",\"value\":\"Tangkuban Perahu\",\"selected\":false},{\"label\":\"Bukit Moko\",\"value\":\"Bukit Moko\",\"selected\":false}]}'),(36,10,1,1,'{\"type\":\"textarea\",\"required\":false,\"label\":\"Bagaimana kesan Anda terhadap fasilitas yang tersedia di tempat wisata tersebut?\",\"className\":\"form-control\",\"name\":\"textarea-1617421560994\"}');
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
  `status` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id_survey`),
  KEY `id_admin` (`id_admin`),
  CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey`
--

LOCK TABLES `survey` WRITE;
/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
INSERT INTO `survey` VALUES (1,1,'Survey Kepuasan Layanan','','Aktif'),(2,3,'Survey Kepuasan Pelayanan Pendidikan Sekolah Dasar','','Aktif'),(3,3,'Evaluasi Kualitas Pembelajaran Jarak Jauh','Survey untuk menilai kualitas dari pelaksanaan Pembelajaran Jarak Jauh','Aktif'),(4,2,'Feedback Pelayanan Kesehatan','Survey ini digunakan untuk mengetahui performansi dari pelayanan kesehatan yang disediakan oleh XYZ. Mohon diisi sesuai dengan pengalaman masing-masing','Aktif'),(5,1,'Survey Mengenai User Experience','Survey untuk mengukur user experience yang dialami oleh pengguna website Crowd Source. Hasil dari survey ini akan digunakan untuk meningkatkan kualitas dari website Crowd Source. Estimasi waktu pengisian survey ini adalah 5 menit.','Aktif'),(6,2,'Survey Konsumsi Makanan','Survey untuk mengetahui tren dari konsumsi makanan','Aktif'),(7,1,'Survey Pengeluaran Sehari-hari','Survey untuk mendata pengeluaran masyarakat untuk kebutuhan sehari-hari','Aktif'),(8,1,'Pengalaman Terhadap Transportasi Umum','','Aktif'),(9,2,'Survey Aksesibilitas Dokter','','Aktif'),(10,1,'Survey Sarana dan Prasarana Tempat Wisata','','Aktif');
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

-- Dump completed on 2021-05-04 15:51:42
