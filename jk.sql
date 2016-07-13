-- MySQL dump 10.13  Distrib 5.5.49, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: jk
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

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
-- Table structure for table `jk_comments`
--

DROP TABLE IF EXISTS `jk_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_comments` (
  `cm_id` int(11) NOT NULL AUTO_INCREMENT,
  `fs_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `cm_content` varchar(200) NOT NULL,
  `cm_create_time` datetime NOT NULL,
  PRIMARY KEY (`cm_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `jk_comments_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `jk_users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_comments`
--

LOCK TABLES `jk_comments` WRITE;
/*!40000 ALTER TABLE `jk_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `jk_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_countries`
--

DROP TABLE IF EXISTS `jk_countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_countries` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(48) NOT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_countries`
--

LOCK TABLES `jk_countries` WRITE;
/*!40000 ALTER TABLE `jk_countries` DISABLE KEYS */;
INSERT INTO `jk_countries` VALUES (15,'印度'),(16,'中国'),(17,'尼泊尔'),(18,'台湾'),(19,'泰国'),(20,'柬埔寨'),(21,'马来西亚'),(22,'斯里兰卡'),(23,'日本'),(24,'韩国'),(25,'法国'),(26,'丹麦'),(27,'西班牙');
/*!40000 ALTER TABLE `jk_countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_events`
--

DROP TABLE IF EXISTS `jk_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_events` (
  `et_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `et_type` varchar(200) NOT NULL,
  `et_create_time` datetime NOT NULL,
  PRIMARY KEY (`et_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `jk_events_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `jk_users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_events`
--

LOCK TABLES `jk_events` WRITE;
/*!40000 ALTER TABLE `jk_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `jk_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_followers`
--

DROP TABLE IF EXISTS `jk_followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_followers` (
  `fl_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `fl_fl_id` int(11) NOT NULL,
  `fl_create_time` datetime NOT NULL,
  `fl_update_time` datetime NOT NULL,
  PRIMARY KEY (`fl_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `jk_followers_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `jk_users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_followers`
--

LOCK TABLES `jk_followers` WRITE;
/*!40000 ALTER TABLE `jk_followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `jk_followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_footsteps`
--

DROP TABLE IF EXISTS `jk_footsteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_footsteps` (
  `fs_id` int(11) NOT NULL AUTO_INCREMENT,
  `fs_pic` varchar(200) NOT NULL,
  `fs_des` varchar(200) NOT NULL,
  `fs_from` varchar(16) NOT NULL,
  `u_id` int(11) NOT NULL,
  `fs_create_time` datetime NOT NULL,
  `fs_update_time` datetime NOT NULL,
  PRIMARY KEY (`fs_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `jk_footsteps_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `jk_users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_footsteps`
--

LOCK TABLES `jk_footsteps` WRITE;
/*!40000 ALTER TABLE `jk_footsteps` DISABLE KEYS */;
INSERT INTO `jk_footsteps` VALUES (131,'http://o99spo2ev.bkt.clouddn.com/images/21/1468399718347.jpg','每个来到这里的人都是如此的徘徊.  不愿离去','尼泊尔',21,'2016-07-13 16:45:28','2016-07-13 16:45:28');
/*!40000 ALTER TABLE `jk_footsteps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_likes`
--

DROP TABLE IF EXISTS `jk_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_likes` (
  `lk_id` int(11) NOT NULL AUTO_INCREMENT,
  `fs_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `lk_create_time` datetime NOT NULL,
  PRIMARY KEY (`lk_id`),
  KEY `fs_id` (`fs_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `jk_likes_ibfk_1` FOREIGN KEY (`fs_id`) REFERENCES `jk_footsteps` (`fs_id`) ON DELETE CASCADE,
  CONSTRAINT `jk_likes_ibfk_2` FOREIGN KEY (`u_id`) REFERENCES `jk_users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_likes`
--

LOCK TABLES `jk_likes` WRITE;
/*!40000 ALTER TABLE `jk_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `jk_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_messages`
--

DROP TABLE IF EXISTS `jk_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_messages` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `m_content` varchar(1000) NOT NULL,
  `m_create_time` datetime NOT NULL,
  `m_update_time` datetime NOT NULL,
  PRIMARY KEY (`m_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `jk_messages_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `jk_users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_messages`
--

LOCK TABLES `jk_messages` WRITE;
/*!40000 ALTER TABLE `jk_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `jk_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_sticks`
--

DROP TABLE IF EXISTS `jk_sticks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_sticks` (
  `st_id` int(11) NOT NULL AUTO_INCREMENT,
  `fs_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `st_create_time` datetime NOT NULL,
  PRIMARY KEY (`st_id`),
  KEY `fs_id` (`fs_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `jk_sticks_ibfk_1` FOREIGN KEY (`fs_id`) REFERENCES `jk_footsteps` (`fs_id`) ON DELETE CASCADE,
  CONSTRAINT `jk_sticks_ibfk_2` FOREIGN KEY (`u_id`) REFERENCES `jk_users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_sticks`
--

LOCK TABLES `jk_sticks` WRITE;
/*!40000 ALTER TABLE `jk_sticks` DISABLE KEYS */;
/*!40000 ALTER TABLE `jk_sticks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_topics`
--

DROP TABLE IF EXISTS `jk_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_topics` (
  `tp_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `tp_about` varchar(200) NOT NULL,
  `tp_content` text NOT NULL,
  `tp_img` varchar(200) DEFAULT NULL,
  `tp_title` varchar(200) NOT NULL,
  `tp_create_time` datetime NOT NULL,
  `tp_update_time` datetime NOT NULL,
  PRIMARY KEY (`tp_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `jk_topics_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `jk_users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_topics`
--

LOCK TABLES `jk_topics` WRITE;
/*!40000 ALTER TABLE `jk_topics` DISABLE KEYS */;
INSERT INTO `jk_topics` VALUES (13,21,'印度','<p>从印度回来将近两个月了，某天早上收到斋浦尔的包车司机Shahid的voice call，他问我回国后的情况，我突然觉得有点恍惚，坐在舒适的沙发中，印度是如此遥远而模糊，但透过Shahid的声音，回忆渐渐变得清晰。我们谈到他即将去日本工作，谈到斋浦尔，也谈到猴庙，谈到在进入猴庙前的一小段对话，他说回程时要&ldquo;show&rdquo;&ldquo;eat lips&rdquo;，由于当时的各种防备心理，我以为他有不轨的企图，就很生气的说&ldquo;Do not try to kiss me&ldquo;。我问他为什么当时要这么说，电话那边传来了爆笑，原来eat lips是一种雕像还是绘画，在猴庙返回市区的路上的一个花园中，他当时没有解释是因为他没反应过来并且被吓懵了，不敢再说话（看来我还是很有威慑力的~）。OMG！此时我也只能继续用一阵爆笑来掩饰自我良好的尴尬，同时我终于释怀了，确信他是个好人。</p>\n\n<p>&nbsp;</p>\n\n<p>提起这件小事，是因为它特别能反映我在印度独行两周时的状态：高度防备的同时又总是期望上天赐我一个好的印度人。很多人问我印度怎么样，我想100个人眼中会有100种印度，你若到了印度，绝对会有一些独一无二的经历，是从任何游记里都看不到的，正是这样的想法，鼓励着我以自己的视觉去观看这个国家，去经历自己希望经历的。曾经有人告诉我，他在路上问了很多人，喜不喜欢印度，回答的人几乎都处于两个极端，很喜欢，和很不喜欢。但如此简单的概括，我觉得太难。</p>\n\n<p>&nbsp;</p>\n\n<p>印度是个很特别的存在，懂它的过去，你才会懂它的现在，它在很多方面有自己独特而源远流长的见解。很多人会说印度很脏很乱，底层人民受教育程度不高，但很少有人知道受教育在印度是权利，并不是义务，意味着你想上可以免费上，不想上政府也会尊重你。去过吴哥的人大概都知道，塔普伦寺是《古墓丽影》的拍摄地，以盘根错节的树木和建筑共生出名。但不知有多少人知道，在各个国家力求完美修复而把树木一概砍掉时，是印度人让它保留了被发现时的样子，因为印度人认为经过500年的生长，树木已经长成了塔普伦寺记忆的一部分，犹如5千年或繁盛或破落的历史已经融合在当今印度的方方面面，它成为了它应该成为的样子。</p>\n\n<p>&nbsp;</p>\n\n<p>如果你喜欢本文，或本文对你有帮助，请点个喜欢鼓励鼓励我吧，大爱你们~ &nbsp;<img alt=\"angry\" height=\"23\" src=\"http://180.76.152.112:8080/app/js/ckeditor/plugins/smiley/images/angry_smile.png\" title=\"angry\" width=\"23\" /></p>\n','','100个人眼中有100种印度【北印16天，洒红节及详细宗教文化城市地图攻略】','2016-07-13 16:45:29','2016-07-13 16:45:29');
/*!40000 ALTER TABLE `jk_topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_topics_clicks`
--

DROP TABLE IF EXISTS `jk_topics_clicks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_topics_clicks` (
  `tp_ck_id` int(11) NOT NULL AUTO_INCREMENT,
  `tp_id` int(11) NOT NULL,
  `u_id` int(11) DEFAULT NULL,
  `tp_ck_create_time` datetime NOT NULL,
  PRIMARY KEY (`tp_ck_id`),
  KEY `tp_id` (`tp_id`),
  CONSTRAINT `jk_topics_clicks_ibfk_1` FOREIGN KEY (`tp_id`) REFERENCES `jk_topics` (`tp_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_topics_clicks`
--

LOCK TABLES `jk_topics_clicks` WRITE;
/*!40000 ALTER TABLE `jk_topics_clicks` DISABLE KEYS */;
INSERT INTO `jk_topics_clicks` VALUES (29,13,21,'2016-07-13 16:45:29'),(30,13,21,'2016-07-13 16:45:29'),(31,13,21,'2016-07-13 16:45:29'),(32,13,21,'2016-07-13 16:45:29');
/*!40000 ALTER TABLE `jk_topics_clicks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_topics_comments`
--

DROP TABLE IF EXISTS `jk_topics_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_topics_comments` (
  `tp_cm_id` int(11) NOT NULL AUTO_INCREMENT,
  `tp_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `tp_cm_to` int(11) DEFAULT NULL,
  `tp_cm_content` text NOT NULL,
  `tp_cm_create_time` datetime NOT NULL,
  PRIMARY KEY (`tp_cm_id`),
  KEY `u_id` (`u_id`),
  KEY `tp_id` (`tp_id`),
  CONSTRAINT `jk_topics_comments_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `jk_users` (`u_id`) ON DELETE CASCADE,
  CONSTRAINT `jk_topics_comments_ibfk_2` FOREIGN KEY (`tp_id`) REFERENCES `jk_topics` (`tp_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_topics_comments`
--

LOCK TABLES `jk_topics_comments` WRITE;
/*!40000 ALTER TABLE `jk_topics_comments` DISABLE KEYS */;
INSERT INTO `jk_topics_comments` VALUES (29,13,21,0,'<p><img alt=\"heart\" height=\"23\" src=\"http://180.76.152.112:8080/app/js/ckeditor/plugins/smiley/images/heart.png\" title=\"heart\" width=\"23\" /><img alt=\"heart\" height=\"23\" src=\"http://180.76.152.112:8080/app/js/ckeditor/plugins/smiley/images/heart.png\" title=\"heart\" width=\"23\" /><img alt=\"heart\" height=\"23\" src=\"http://180.76.152.112:8080/app/js/ckeditor/plugins/smiley/images/heart.png\" title=\"heart\" width=\"23\" /></p>\n','2016-07-13 16:45:29');
/*!40000 ALTER TABLE `jk_topics_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_topics_likes`
--

DROP TABLE IF EXISTS `jk_topics_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_topics_likes` (
  `tp_lk_id` int(11) NOT NULL AUTO_INCREMENT,
  `tp_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `tp_cm_id` int(11) DEFAULT NULL,
  `tp_lk_create_time` datetime NOT NULL,
  PRIMARY KEY (`tp_lk_id`),
  KEY `u_id` (`u_id`),
  KEY `tp_id` (`tp_id`),
  CONSTRAINT `jk_topics_likes_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `jk_users` (`u_id`) ON DELETE CASCADE,
  CONSTRAINT `jk_topics_likes_ibfk_2` FOREIGN KEY (`tp_id`) REFERENCES `jk_topics` (`tp_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_topics_likes`
--

LOCK TABLES `jk_topics_likes` WRITE;
/*!40000 ALTER TABLE `jk_topics_likes` DISABLE KEYS */;
INSERT INTO `jk_topics_likes` VALUES (4,13,21,NULL,'2016-07-13 16:45:29');
/*!40000 ALTER TABLE `jk_topics_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jk_users`
--

DROP TABLE IF EXISTS `jk_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jk_users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_phone_num` varchar(13) NOT NULL,
  `u_pwd` varchar(48) NOT NULL,
  `u_name` varchar(16) NOT NULL,
  `u_status` tinyint(10) NOT NULL DEFAULT '1',
  `u_avatar` varchar(200) DEFAULT NULL,
  `u_link` varchar(200) DEFAULT NULL,
  `u_slogan` varchar(200) DEFAULT NULL,
  `u_create_time` datetime NOT NULL,
  `u_update_time` datetime NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_phone_num` (`u_phone_num`),
  UNIQUE KEY `u_phone_num_2` (`u_phone_num`),
  UNIQUE KEY `u_phone_num_3` (`u_phone_num`),
  UNIQUE KEY `u_name` (`u_name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jk_users`
--

LOCK TABLES `jk_users` WRITE;
/*!40000 ALTER TABLE `jk_users` DISABLE KEYS */;
INSERT INTO `jk_users` VALUES (21,'13917455041','123456','miwang',1,'http://o99spo2ev.bkt.clouddn.com/images/21/1468399681689.jpg','www.buybs.com/miwang','being strong is the only thing you can do.','2016-07-13 16:45:28','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `jk_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-13 17:11:24
