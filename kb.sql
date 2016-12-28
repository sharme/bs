-- MySQL dump 10.13  Distrib 5.6.25, for osx10.10 (x86_64)
--
-- Host: localhost    Database: kb
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kb_messages`
--

DROP TABLE IF EXISTS `kb_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kb_messages` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_sender` varchar(48) NOT NULL,
  `m_msg` varchar(1000) NOT NULL,
  `m_to` varchar(48) NOT NULL,
  `m_status` int(11) NOT NULL,
  `m_created_time` datetime NOT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kb_messages`
--

LOCK TABLES `kb_messages` WRITE;
/*!40000 ALTER TABLE `kb_messages` DISABLE KEYS */;
INSERT INTO `kb_messages` VALUES (2,'品尚珠宝工厂','在？','品味珠宝',1,'2016-12-21 23:59:43');
/*!40000 ALTER TABLE `kb_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kb_stone_comments`
--

DROP TABLE IF EXISTS `kb_stone_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kb_stone_comments` (
  `sc_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `sc_content` varchar(200) NOT NULL,
  `sc_created_time` datetime NOT NULL,
  PRIMARY KEY (`sc_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `kb_stone_comments_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `kb_users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kb_stone_comments`
--

LOCK TABLES `kb_stone_comments` WRITE;
/*!40000 ALTER TABLE `kb_stone_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `kb_stone_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kb_stones`
--

DROP TABLE IF EXISTS `kb_stones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kb_stones` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `s_present` varchar(200) NOT NULL,
  `s_pic` varchar(200) NOT NULL,
  `s_pic_2` varchar(200) DEFAULT NULL,
  `s_pic_3` varchar(200) DEFAULT NULL,
  `s_pic_4` varchar(200) DEFAULT NULL,
  `s_description` varchar(200) NOT NULL,
  `s_updated_time` datetime NOT NULL,
  `s_created_time` datetime NOT NULL,
  PRIMARY KEY (`s_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `kb_stones_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `kb_users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kb_stones`
--

LOCK TABLES `kb_stones` WRITE;
/*!40000 ALTER TABLE `kb_stones` DISABLE KEYS */;
INSERT INTO `kb_stones` VALUES (4,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336044697.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336044697.jpg','','','','斯里兰卡] 蓝宝石钻石戒指, 可定做. 蓝宝石可单独挑选, 加工、金价、人工费另算. 如有兴趣请私信.','2016-12-21 23:59:42','2016-12-21 23:59:42'),(5,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336100907.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336100907.jpg','','','','1.26克拉皇家蓝 - 蓝宝石. 简约式加工工艺. 喜欢的请私信.','2016-12-21 23:59:42','2016-12-21 23:59:42'),(6,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336130952.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336130952.jpg','','','','蓝宝石- 全净, 切工好. 心形 1.06 克拉. 斯里兰卡原产采购. 价格优惠. 感兴趣私信','2016-12-21 23:59:42','2016-12-21 23:59:42'),(7,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336164594.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336164594.jpg','','','','斯里兰卡蓝宝石 - 1.20克拉. 3000拿走. 全净, 无损伤. 接近皇家蓝的颜色','2016-12-21 23:59:42','2016-12-21 23:59:42'),(8,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336285439.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336285439.jpg','','','','彩色蓝宝石, 1.56克拉. 全净. 正面超大.  吊坠戒指都可以加工. 5000rmb. 需要私信','2016-12-21 23:59:42','2016-12-21 23:59:42'),(9,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336412795.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336412795.jpg','','','','10克拉以上的［ 托帕 ］石.   联系私信.','2016-12-21 23:59:42','2016-12-21 23:59:42'),(10,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336468122.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336468122.jpg','','','','新鲜加工出炉的. 黄金钻石戒指. 可定制.  需要的私信','2016-12-21 23:59:42','2016-12-21 23:59:42'),(11,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336528033.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336528033.jpg','','','','可定制 - 黄金钻石戒指. 需要的私信','2016-12-21 23:59:42','2016-12-21 23:59:42'),(12,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336581559.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336581559.jpg','','','','可定制 - 钻石吊坠.   可选择所需的小钻, 加工，白金／黄金，加工另算. 有需要的私信','2016-12-21 23:59:42','2016-12-21 23:59:42'),(13,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336649860.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336649860.jpg','','','','顶级黄钻 － 全火彩.  2克拉.  其它大小请私信','2016-12-21 23:59:42','2016-12-21 23:59:42'),(14,1,'http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482336729018.jpg','http://oi6jrdfzc.bkt.clouddn.com/images/big/1/1482336729018.jpg','','','','菩提 － 可定制. 需要的私信','2016-12-21 23:59:42','2016-12-21 23:59:42');
/*!40000 ALTER TABLE `kb_stones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kb_users`
--

DROP TABLE IF EXISTS `kb_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kb_users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_phone_num` varchar(13) DEFAULT NULL,
  `u_email` varchar(200) DEFAULT NULL,
  `u_name` varchar(16) NOT NULL,
  `u_pwd` varchar(48) NOT NULL,
  `u_avatar` varchar(200) DEFAULT NULL,
  `u_link` varchar(200) DEFAULT NULL,
  `u_slogan` varchar(200) DEFAULT NULL,
  `u_description` varchar(200) DEFAULT NULL,
  `u_status` tinyint(10) NOT NULL DEFAULT '1',
  `u_updated_time` datetime NOT NULL,
  `u_created_time` datetime NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_phone_num` (`u_phone_num`),
  UNIQUE KEY `u_email` (`u_email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kb_users`
--

LOCK TABLES `kb_users` WRITE;
/*!40000 ALTER TABLE `kb_users` DISABLE KEYS */;
INSERT INTO `kb_users` VALUES (1,'13917455041','miwangyao@unity3d.com','品味珠宝','123456','http://oi6jrdfzc.bkt.clouddn.com/images/small/1/1482308972173.jpg',NULL,'Being strong is the only thing you can do','Sapphire, Topiz',1,'2016-12-21 01:35:52','2016-12-14 01:00:54'),(3,NULL,'305204496@qq.com','品尚珠宝工厂','123456','http://oi6jrdfzc.bkt.clouddn.com/images/small/3/1482307883026.jpg',NULL,'精心打造, 最好的呈现给顾客','各类彩色宝石, 钻石，蓝宝石，蜜蜡等.  全部由老板亲自原产地挑选.',1,'2016-12-21 01:35:52','2016-12-21 01:35:52');
/*!40000 ALTER TABLE `kb_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-22 12:31:07
