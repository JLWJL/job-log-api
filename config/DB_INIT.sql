--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `app_id` int(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `title` varchar(30) DEFAULT NULL,
  `company` varchar(30) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  `salary` int(15) DEFAULT NULL,
  `expire` date DEFAULT NULL,
  `status` int(1) DEFAULT '0',
  `contact` varchar(100) DEFAULT NULL,
  `link` mediumtext,
  `description` mediumtext,
  `other` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`app_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `app_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;


--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `application_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;



--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(50) NOT NULL,
  `email` varchar(25) NOT NULL,
  `first_name` varchar(20) DEFAULT 'Dear',
  `last_name` varchar(20) DEFAULT 'user',
  `password` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `unique_key` (`email`),
  ADD KEY `user_id` (`user_id`);
