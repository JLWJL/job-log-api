CREATE TABLE IF NOT EXISTS user ( user_id varchar(50) PRIMARY KEY, email varchar(25) UNIQUE NOT NULL, first_name
varchar(20) NOT NULL, last_name varchar(20) NOT NULL, password varchar(60) NOT NULL ) ENGINE=INNODB DEFAULT
CHARSET=utf8;CREATE TABLE IF NOT EXISTS application (app_id int(50) AUTO_INCREMENT PRIMARY KEY, user_id varchar(50) NOT
NULL,
title
varchar(30) DEFAULT NULL, company varchar(30) DEFAULT NULL, location varchar(20) DEFAULT NULL, salary int(15) DEFAULT
 NULL, expire date DEFAULT NULL, status int(1) DEFAULT '0', starred int(1) DEFAULT '0', contact varchar(100) DEFAULT
 NULL, link
 mediumtext, description mediumtext, other mediumtext, FOREIGN KEY(user_id) REFERENCES user (user_id) ON DELETE CASCADE ) ENGINE=INNODB DEFAULT CHARSET=utf8;