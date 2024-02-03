-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 12 nov. 2023 à 19:57
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `schoolpayementmanager1`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `applications_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE applications 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE applications.id = id 
	 AND applications.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `applications_delete` (`id` INT)   BEGIN
	 DELETE FROM applications 
	 WHERE applications.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `applications_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE applications 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE applications.id = id 
	 AND applications.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `applications_insert` (`nom` VARCHAR(45), `description` VARCHAR(45), `logo` VARCHAR(45), `proprietaire` VARCHAR(45), `emplacementLog` VARCHAR(100), `repInstallation` VARCHAR(100), `urlRacine` VARCHAR(100), `emailAdmin` VARCHAR(35), `couleur1Id` INT(11), `couleur2Id` INT(11), `version` VARCHAR(5), `observations` MEDIUMTEXT, `creationUserId` INT)   BEGIN
	 INSERT INTO applications( 
		 id, 
		 nom,
		 description,
		 logo,
		 proprietaire,
		 emplacementLog,
		 repInstallation,
		 urlRacine,
		 emailAdmin,
		 couleur1Id,
		 couleur2Id,
		 version,
		 observations,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 nom,
			 description,
			 logo,
			 proprietaire,
			 emplacementLog,
			 repInstallation,
			 urlRacine,
			 emailAdmin,
			 couleur1Id,
			 couleur2Id,
			 version,
			 observations,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `applications_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			applications.id,
			applications.nom,
			applications.description,
			applications.logo,
			applications.proprietaire,
			applications.emplacementLog,
			applications.repInstallation,
			applications.urlRacine,
			applications.emailAdmin,
			applications.couleur1Id,
			applications.couleur2Id,
			applications.version,
			applications.observations,
			applications.estActif,
			applications.creationDate,
			applications.creationUserId,
			applications.modifDate,
			applications.modifUserId
		 FROM applications';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE applications.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `applications_selectBy` (`id` INT(11), `nom` VARCHAR(45), `description` VARCHAR(45), `logo` VARCHAR(45), `proprietaire` VARCHAR(45), `emplacementLog` VARCHAR(100), `repInstallation` VARCHAR(100), `urlRacine` VARCHAR(100), `emailAdmin` VARCHAR(35), `couleur1Id` INT(11), `couleur2Id` INT(11), `version` VARCHAR(5), `observations` MEDIUMTEXT, `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			applications.id,
			applications.nom,
			applications.description,
			applications.logo,
			applications.proprietaire,
			applications.emplacementLog,
			applications.repInstallation,
			applications.urlRacine,
			applications.emailAdmin,
			applications.couleur1Id,
			applications.couleur2Id,
			applications.version,
			applications.observations,
			applications.estActif,
			applications.creationDate,
			applications.creationUserId,
			applications.modifDate,
			applications.modifUserId
		 FROM applications
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.id = ' ,id); 
	 END IF; 
	 IF nom IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.nom = "',nom,'"');
	 END IF; 
	 IF description IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.description = "',description,'"');
	 END IF; 
	 IF logo IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.logo = "',logo,'"');
	 END IF; 
	 IF proprietaire IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.proprietaire = "',proprietaire,'"');
	 END IF; 
	 IF emplacementLog IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.emplacementLog = "',emplacementLog,'"');
	 END IF; 
	 IF repInstallation IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.repInstallation = "',repInstallation,'"');
	 END IF; 
	 IF urlRacine IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.urlRacine = "',urlRacine,'"');
	 END IF; 
	 IF emailAdmin IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.emailAdmin = "',emailAdmin,'"');
	 END IF; 
	 IF couleur1Id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.couleur1Id = ' ,couleur1Id); 
	 END IF; 
	 IF couleur2Id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.couleur2Id = ' ,couleur2Id); 
	 END IF; 
	 IF version IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.version = "',version,'"');
	 END IF; 
	 IF observations IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.observations = "',observations,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND applications.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `applications_selectById` (`id` INT)   BEGIN
		 SELECT 
			applications.id,
			applications.nom,
			applications.description,
			applications.logo,
			applications.proprietaire,
			applications.emplacementLog,
			applications.repInstallation,
			applications.urlRacine,
			applications.emailAdmin,
			applications.couleur1Id,
			applications.couleur2Id,
			applications.version,
			applications.observations,
			applications.estActif,
			applications.creationDate,
			applications.creationUserId,
			applications.modifDate,
			applications.modifUserId
		 FROM applications
		 WHERE applications.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `applications_update` (`id` INT, `nom` VARCHAR(45), `description` VARCHAR(45), `logo` VARCHAR(45), `proprietaire` VARCHAR(45), `emplacementLog` VARCHAR(100), `repInstallation` VARCHAR(100), `urlRacine` VARCHAR(100), `emailAdmin` VARCHAR(35), `couleur1Id` INT(11), `couleur2Id` INT(11), `version` VARCHAR(5), `observations` MEDIUMTEXT, `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE applications
		 SET 
			nom = nom, 
			description = description, 
			logo = logo, 
			proprietaire = proprietaire, 
			emplacementLog = emplacementLog, 
			repInstallation = repInstallation, 
			urlRacine = urlRacine, 
			emailAdmin = emailAdmin, 
			couleur1Id = couleur1Id, 
			couleur2Id = couleur2Id, 
			version = version, 
			observations = observations, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE applications.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `classses_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE classses 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE classses.id = id 
	 AND classses.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `classses_delete` (`id` INT)   BEGIN
	 DELETE FROM classses 
	 WHERE classses.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `classses_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE classses 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE classses.id = id 
	 AND classses.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `classses_insert` (`ecoleId` INT(11), `enseignantId` INT(11), `niveau` INT(11), `etape` VARCHAR(245), `libelle` VARCHAR(150), `creationUserId` INT)   BEGIN
	 INSERT INTO classses( 
		 id, 
		 ecoleId,
		 enseignantId,
		 niveau,
         etape,
		 libelle,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 ecoleId,
			 enseignantId,
			 niveau,
             etape,
			 libelle,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `classses_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			classses.id,
			classses.ecoleId,
			classses.enseignantId,
			classses.niveau,
			classses.libelle,
			classses.estActif,
			classses.creationDate,
			classses.creationUserId, 
			classses.modifDate,
			classses.modifUserId
		 FROM classses';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE classses.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `classses_selectBy` (`id` INT(11), `ecoleId` INT(11), `enseignantId` INT(11), `niveau` INT(11), `etape` VARCHAR(245), `libelle` VARCHAR(150), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			classses.id,
			classses.ecoleId,
			classses.enseignantId,
			classses.niveau,
            `users`.`name` as enseignantName,
            `users`.`prenoms` as enseignantPrenoms,
            classses.etape,
			classses.libelle,
			classses.estActif,
			classses.creationDate,
			classses.creationUserId,
			classses.modifDate,
			classses.modifUserId
		 FROM classses
		INNER JOIN `users` ON classses.enseignantId = `users`.`id`

		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.id = ' ,id); 
	 END IF; 
	 IF ecoleId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.ecoleId = ' ,ecoleId); 
	 END IF; 
	 IF enseignantId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.enseignantId = ' ,enseignantId); 
	 END IF; 
	 IF niveau IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.niveau = ' ,niveau); 
	 END IF; 
      IF etape IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.etape = "',etape,'"');
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.libelle = "',libelle,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND classses.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `classses_selectById` (`id` INT)   BEGIN
		 SELECT 
			classses.id,
			classses.ecoleId,
			classses.enseignantId,
			classses.niveau,
			classses.etape,
			classses.libelle,
			classses.estActif,
			classses.creationDate,
			classses.creationUserId,
			classses.modifDate,
			classses.modifUserId
		 FROM classses
		 WHERE classses.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `classses_update` (`id` INT, `ecoleId` INT(11), `enseignantId` INT(11), `niveau` INT(11), `etape` VARCHAR(245), `libelle` VARCHAR(150), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE classses
		 SET 
			ecoleId = ecoleId, 
			enseignantId = enseignantId, 
			niveau = niveau, 
            etape = etape, 
			libelle = libelle, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE classses.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `communes_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE communes 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE communes.id = id 
	 AND communes.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `communes_delete` (`id` INT)   BEGIN
	 DELETE FROM communes 
	 WHERE communes.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `communes_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE communes 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE communes.id = id 
	 AND communes.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `communes_insert` (`prefectureId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `creationUserId` INT)   BEGIN
	 INSERT INTO communes( 
		 id, 
		 prefectureId,
		 libelle,
		 code,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 prefectureId,
			 libelle,
			 code,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `communes_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			communes.id,
			communes.prefectureId,
			communes.libelle,
			communes.code,
			communes.estActif,
			communes.creationDate,
			communes.creationUserId,
			communes.modifDate,
			communes.modifUserId
		 FROM communes';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE communes.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `communes_selectBy` (`id` INT(11), `prefectureId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			communes.id,
			communes.prefectureId,
			communes.libelle,
			communes.code,
			communes.estActif,
			communes.creationDate,
			communes.creationUserId,
			communes.modifDate,
			communes.modifUserId
		 FROM communes
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND communes.id = ' ,id); 
	 END IF; 
	 IF prefectureId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND communes.prefectureId = ' ,prefectureId); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND communes.libelle = "',libelle,'"');
	 END IF; 
	 IF code IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND communes.code = "',code,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND communes.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND communes.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND communes.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND communes.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND communes.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `communes_selectById` (`id` INT)   BEGIN
		 SELECT 
			communes.id,
			communes.prefectureId,
			communes.libelle,
			communes.code,
			communes.estActif,
			communes.creationDate,
			communes.creationUserId,
			communes.modifDate,
			communes.modifUserId
		 FROM communes
		 WHERE communes.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `communes_update` (`id` INT, `prefectureId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE communes
		 SET 
			prefectureId = prefectureId, 
			libelle = libelle, 
			code = code, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE communes.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `couleurs_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE couleurs 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE couleurs.id = id 
	 AND couleurs.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `couleurs_delete` (`id` INT)   BEGIN
	 DELETE FROM couleurs 
	 WHERE couleurs.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `couleurs_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE couleurs 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE couleurs.id = id 
	 AND couleurs.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `couleurs_insert` (`libelle` VARCHAR(45), `codeHtml` VARCHAR(10), `creationUserId` INT)   BEGIN
	 INSERT INTO couleurs( 
		 id, 
		 libelle,
		 codeHtml,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 libelle,
			 codeHtml,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `couleurs_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			couleurs.id,
			couleurs.libelle,
			couleurs.codeHtml,
			couleurs.estActif,
			couleurs.creationDate,
			couleurs.creationUserId,
			couleurs.modifDate,
			couleurs.modifUserId
		 FROM couleurs';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE couleurs.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `couleurs_selectBy` (`id` INT(11), `libelle` VARCHAR(45), `codeHtml` VARCHAR(10), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			couleurs.id,
			couleurs.libelle,
			couleurs.codeHtml,
			couleurs.estActif,
			couleurs.creationDate,
			couleurs.creationUserId,
			couleurs.modifDate,
			couleurs.modifUserId
		 FROM couleurs
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND couleurs.id = ' ,id); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND couleurs.libelle = "',libelle,'"');
	 END IF; 
	 IF codeHtml IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND couleurs.codeHtml = "',codeHtml,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND couleurs.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND couleurs.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND couleurs.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND couleurs.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND couleurs.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `couleurs_selectById` (`id` INT)   BEGIN
		 SELECT 
			couleurs.id,
			couleurs.libelle,
			couleurs.codeHtml,
			couleurs.estActif,
			couleurs.creationDate,
			couleurs.creationUserId,
			couleurs.modifDate,
			couleurs.modifUserId
		 FROM couleurs
		 WHERE couleurs.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `couleurs_update` (`id` INT, `libelle` VARCHAR(45), `codeHtml` VARCHAR(10), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE couleurs
		 SET 
			libelle = libelle, 
			codeHtml = codeHtml, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE couleurs.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `devises_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE devises 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE devises.id = id 
	 AND devises.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `devises_delete` (`id` INT)   BEGIN
	 DELETE FROM devises 
	 WHERE devises.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `devises_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE devises 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE devises.id = id 
	 AND devises.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `devises_insert` (`libelle` VARCHAR(45), `symbole` VARCHAR(10), `creationUserId` INT)   BEGIN
	 INSERT INTO devises( 
		 id, 
		 libelle,
		 symbole,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 libelle,
			 symbole,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `devises_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			devises.id,
			devises.libelle,
			devises.symbole,
			devises.estActif,
			devises.creationDate,
			devises.creationUserId,
			devises.modifDate,
			devises.modifUserId
		 FROM devises';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE devises.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `devises_selectBy` (`id` INT(11), `libelle` VARCHAR(45), `symbole` VARCHAR(10), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			devises.id,
			devises.libelle,
			devises.symbole,
			devises.estActif,
			devises.creationDate,
			devises.creationUserId,
			devises.modifDate,
			devises.modifUserId
		 FROM devises
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND devises.id = ' ,id); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND devises.libelle = "',libelle,'"');
	 END IF; 
	 IF symbole IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND devises.symbole = "',symbole,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND devises.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND devises.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND devises.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND devises.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND devises.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `devises_selectById` (`id` INT)   BEGIN
		 SELECT 
			devises.id,
			devises.libelle,
			devises.symbole,
			devises.estActif,
			devises.creationDate,
			devises.creationUserId,
			devises.modifDate,
			devises.modifUserId
		 FROM devises
		 WHERE devises.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `devises_update` (`id` INT, `libelle` VARCHAR(45), `symbole` VARCHAR(10), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE devises
		 SET 
			libelle = libelle, 
			symbole = symbole, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE devises.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ecoles_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE ecoles 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE ecoles.id = id 
	 AND ecoles.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ecoles_delete` (`id` INT)   BEGIN
	 DELETE FROM ecoles 
	 WHERE ecoles.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ecoles_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE ecoles 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE ecoles.id = id 
	 AND ecoles.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ecoles_insert` (`libelle` VARCHAR(45), `slogan` LONGTEXT, `dateCreation` VARCHAR(45), `creationUserId` INT)   BEGIN
	 INSERT INTO ecoles( 
		 id, 
		 libelle,
		 slogan,
		 dateCreation,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 libelle,
			 slogan,
			 dateCreation,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ecoles_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			ecoles.id,
			ecoles.libelle,
			ecoles.slogan,
			ecoles.dateCreation,
			ecoles.estActif,
			ecoles.creationDate,
			ecoles.creationUserId,
			ecoles.modifDate,
			ecoles.modifUserId
		 FROM ecoles';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE ecoles.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ecoles_selectBy` (`id` INT(11), `libelle` VARCHAR(45), `slogan` VARCHAR(5), `dateCreation` VARCHAR(45), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			ecoles.id,
			ecoles.libelle,
			ecoles.slogan,
			ecoles.dateCreation,
			ecoles.estActif,
			ecoles.creationDate,
			ecoles.creationUserId,
			ecoles.modifDate,
			ecoles.modifUserId
		 FROM ecoles
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND ecoles.id = ' ,id); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND ecoles.libelle = "',libelle,'"');
	 END IF; 
	 IF slogan IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND ecoles.slogan = "',slogan,'"');
	 END IF; 
	 IF dateCreation IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND ecoles.dateCreation = "',dateCreation,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND ecoles.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND ecoles.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND ecoles.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND ecoles.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND ecoles.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ecoles_selectById` (`id` INT)   BEGIN
		 SELECT 
			ecoles.id,
			ecoles.libelle,
			ecoles.slogan,
			ecoles.dateCreation,
			ecoles.estActif,
			ecoles.creationDate,
			ecoles.creationUserId,
			ecoles.modifDate,
			ecoles.modifUserId
		 FROM ecoles
		 WHERE ecoles.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ecoles_update` (`id` INT, `libelle` VARCHAR(45), `slogan` LONGTEXT, `dateCreation` VARCHAR(45), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE ecoles
		 SET 
			libelle = libelle, 
			slogan = slogan, 
			dateCreation = dateCreation, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE ecoles.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eleves_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE eleves 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE eleves.id = id 
	 AND eleves.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eleves_delete` (`id` INT)   BEGIN
	 DELETE FROM eleves 
	 WHERE eleves.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eleves_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE eleves 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE eleves.id = id 
	 AND eleves.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eleves_getEleveByMatriculeAndEcoleId` (`ecoleId` INT, `matricule` VARCHAR(100))   BEGIN
		 SELECT 
			eleves.id,
			eleves.classeId,
			eleves.matricule,
			eleves.nom,
			eleves.prenoms,
			eleves.numeroTuteur1,
			eleves.numeroTuteur2,
			eleves.numeroTuteur4,
			eleves.statut,
			eleves.estActif,
			eleves.creationDate,
			eleves.creationUserId,
			eleves.modifDate,
			eleves.modifUserId
             FROM eleves
             INNER JOIN classses on eleves.classeId = classses.id
             
		 WHERE classses.ecoleId= ecoleId and eleves.matricule = matricule and classses.estActif=1  and eleves.estActif=1 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eleves_insert` (`classeId` INT(11), `matricule` VARCHAR(45), `nom` VARCHAR(150), `prenoms` VARCHAR(150), `numeroTuteur1` DOUBLE, `numeroTuteur2` DOUBLE, `numeroTuteur4` DOUBLE, `statut` VARCHAR(45), `creationUserId` INT)   BEGIN
	 INSERT INTO eleves( 
		 id, 
		 classeId,
		 matricule,
		 nom,
		 prenoms,
		 numeroTuteur1,
		 numeroTuteur2,
		 numeroTuteur4,
		 statut,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 classeId,
			 matricule,
			 nom,
			 prenoms,
			 numeroTuteur1,
			 numeroTuteur2,
			 numeroTuteur4,
			 statut,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eleves_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			eleves.id,
			eleves.classeId,
			eleves.matricule,
			eleves.nom,
			eleves.prenoms,
			eleves.numeroTuteur1,
			eleves.numeroTuteur2,
			eleves.numeroTuteur4,
			eleves.statut,
			eleves.estActif,
			eleves.creationDate,
			eleves.creationUserId,
			eleves.modifDate,
			eleves.modifUserId
		 FROM eleves';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE eleves.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eleves_selectBy` (`id` INT(11), `classeId` INT(11), `matricule` VARCHAR(45), `nom` VARCHAR(150), `prenoms` VARCHAR(150), `numeroTuteur1` DOUBLE, `numeroTuteur2` DOUBLE, `numeroTuteur4` DOUBLE, `statut` VARCHAR(45), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			eleves.id,
			eleves.classeId,
			eleves.matricule,
			eleves.nom,
			eleves.prenoms,
			eleves.numeroTuteur1,
			eleves.numeroTuteur2,
			eleves.numeroTuteur4,
			eleves.statut,
			eleves.estActif,
			eleves.creationDate,
			eleves.creationUserId,
			eleves.modifDate,
			eleves.modifUserId
		 FROM eleves
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.id = ' ,id); 
	 END IF; 
	 IF classeId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.classeId = ' ,classeId); 
	 END IF; 
	 IF matricule IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.matricule = "',matricule,'"');
	 END IF; 
	 IF nom IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.nom = "',nom,'"');
	 END IF; 
	 IF prenoms IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.prenoms = "',prenoms,'"');
	 END IF; 
	 IF numeroTuteur1 IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.numeroTuteur1 = "',numeroTuteur1,'"');
	 END IF; 
	 IF numeroTuteur2 IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.numeroTuteur2 = "',numeroTuteur2,'"');
	 END IF; 
	 IF numeroTuteur4 IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.numeroTuteur4 = "',numeroTuteur4,'"');
	 END IF; 
	 IF statut IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.statut = "',statut,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND eleves.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eleves_selectById` (`id` INT)   BEGIN
		 SELECT 
			eleves.id,
			eleves.classeId,
			eleves.matricule,
			eleves.nom,
			eleves.prenoms,
			eleves.numeroTuteur1,
			eleves.numeroTuteur2,
			eleves.numeroTuteur4,
			eleves.statut,
			eleves.estActif,
			eleves.creationDate,
			eleves.creationUserId,
			eleves.modifDate,
			eleves.modifUserId
		 FROM eleves
		 WHERE eleves.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eleves_update` (`id` INT, `classeId` INT(11), `matricule` VARCHAR(45), `nom` VARCHAR(150), `prenoms` VARCHAR(150), `numeroTuteur1` DOUBLE, `numeroTuteur2` DOUBLE, `numeroTuteur4` DOUBLE, `statut` VARCHAR(45), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE eleves
		 SET 
			classeId = classeId, 
			matricule = matricule, 
			nom = nom, 
			prenoms = prenoms, 
			numeroTuteur1 = numeroTuteur1, 
			numeroTuteur2 = numeroTuteur2, 
			numeroTuteur4 = numeroTuteur4, 
			statut = statut, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE eleves.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fiche_renseignements_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE fiche_renseignements 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE fiche_renseignements.id = id 
	 AND fiche_renseignements.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fiche_renseignements_delete` (`id` INT)   BEGIN
	 DELETE FROM fiche_renseignements 
	 WHERE fiche_renseignements.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fiche_renseignements_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE fiche_renseignements 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE fiche_renseignements.id = id 
	 AND fiche_renseignements.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fiche_renseignements_insert` (`prestationId` INT(11), `classeId` INT(11), `ecoleId` INT(11), `prix` DOUBLE, `creationUserId` INT)   BEGIN
	 INSERT INTO fiche_renseignements( 
		 id, 
		 prestationId,
		 classeId,
		 ecoleId,
		 prix,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 prestationId,
			 classeId,
			 ecoleId,
			 prix,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fiche_renseignements_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			fiche_renseignements.id,
			fiche_renseignements.prestationId,
            `classses`.`libelle` as classse,
            `prestations`.`libelle` as prestation,
            `prestations`.`modePaiement`,
            `prestations`.`uniteDuree`,
            `prestations`.`duree` as dureePrestation,
            `ecoles`.`libelle` as ecole,
			fiche_renseignements.classeId,
			fiche_renseignements.ecoleId,
			fiche_renseignements.prix,
			fiche_renseignements.estActif,
			fiche_renseignements.creationDate,
			fiche_renseignements.creationUserId,
			fiche_renseignements.modifDate,
			fiche_renseignements.modifUserId
		 FROM fiche_renseignements
		 LEFT JOIN `prestations` ON fiche_renseignements.prestationId=`prestations`.`id`
		 LEFT JOIN `classses` ON fiche_renseignements.classeId=`classses`.`id`
         LEFT JOIN `ecoles` ON fiche_renseignements.ecoleId=`ecoles`.`id`
         ';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE fiche_renseignements.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fiche_renseignements_selectBy` (`id` INT(11), `prestationId` INT(11), `classeId` INT(11), `ecoleId` INT(11), `prix` DOUBLE, `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			fiche_renseignements.id,
			fiche_renseignements.prestationId,
			fiche_renseignements.classeId,
			fiche_renseignements.ecoleId,
			fiche_renseignements.prix,
			fiche_renseignements.estActif,
			fiche_renseignements.creationDate,
			fiche_renseignements.creationUserId,
			fiche_renseignements.modifDate,
			fiche_renseignements.modifUserId
		 FROM fiche_renseignements
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND fiche_renseignements.id = ' ,id); 
	 END IF; 
	 IF prestationId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND fiche_renseignements.prestationId = ' ,prestationId); 
	 END IF; 
	 IF classeId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND fiche_renseignements.classeId = ' ,classeId); 
	 END IF; 
	 IF ecoleId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND fiche_renseignements.ecoleId = ' ,ecoleId); 
	 END IF; 
	 IF prix IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND fiche_renseignements.prix = "',prix,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND fiche_renseignements.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND fiche_renseignements.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND fiche_renseignements.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND fiche_renseignements.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND fiche_renseignements.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fiche_renseignements_selectById` (`id` INT)   BEGIN
		 SELECT 
			fiche_renseignements.id,
			fiche_renseignements.prestationId,
			fiche_renseignements.classeId,
			fiche_renseignements.ecoleId,
			fiche_renseignements.prix,
			fiche_renseignements.estActif,
			fiche_renseignements.creationDate,
			fiche_renseignements.creationUserId,
			fiche_renseignements.modifDate,
			fiche_renseignements.modifUserId
		 FROM fiche_renseignements
		 WHERE fiche_renseignements.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fiche_renseignements_update` (`id` INT, `prestationId` INT(11), `classeId` INT(11), `ecoleId` INT(11), `prix` DOUBLE, `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE fiche_renseignements
		 SET 
			prestationId = prestationId, 
			classeId = classeId, 
			ecoleId = ecoleId, 
			prix = prix, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE fiche_renseignements.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTableField` (`tableName` VARCHAR(155), `dbName` VARCHAR(45))   SELECT 
		
		column_name as libelle,
        Column_Type as typeColumn,
        DATA_TYPE  as dataType
        
        FROM information_schema.columns
	where table_name= tableName and table_schema= dbName$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTablesByDbName` (`dbName` VARCHAR(30))   BEGIN
	SELECT table_name FROM information_schema.tables WHERE table_schema=dbName;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `groupes_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE groupes 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE groupes.id = id 
	 AND groupes.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `groupes_delete` (`id` INT)   BEGIN
	 DELETE FROM groupes 
	 WHERE groupes.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `groupes_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE groupes 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE groupes.id = id 
	 AND groupes.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `groupes_insert` (`libelle` VARCHAR(45), `observations` MEDIUMTEXT, `creationUserId` INT)   BEGIN
	 INSERT INTO groupes( 
		 id, 
		 libelle,
		 observations,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 libelle,
			 observations,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `groupes_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			groupes.id,
			groupes.libelle,
			groupes.observations,
			groupes.estActif,
			groupes.creationDate,
			groupes.creationUserId,
			groupes.modifDate,
			groupes.modifUserId
		 FROM groupes';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE groupes.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `groupes_selectBy` (`id` INT(11), `libelle` VARCHAR(45), `observations` MEDIUMTEXT, `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			groupes.id,
			groupes.libelle,
			groupes.observations,
			groupes.estActif,
			groupes.creationDate,
			groupes.creationUserId,
			groupes.modifDate,
			groupes.modifUserId
		 FROM groupes
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND groupes.id = ' ,id); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND groupes.libelle = "',libelle,'"');
	 END IF; 
	 IF observations IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND groupes.observations = "',observations,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND groupes.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND groupes.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND groupes.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND groupes.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND groupes.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `groupes_selectById` (`id` INT)   BEGIN
		 SELECT 
			groupes.id,
			groupes.libelle,
			groupes.observations,
			groupes.estActif,
			groupes.creationDate,
			groupes.creationUserId,
			groupes.modifDate,
			groupes.modifUserId
		 FROM groupes
		 WHERE groupes.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `groupes_update` (`id` INT, `libelle` VARCHAR(45), `observations` MEDIUMTEXT, `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE groupes
		 SET 
			libelle = libelle, 
			observations = observations, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE groupes.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE menus 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE menus.id = id 
	 AND menus.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_delete` (`id` INT)   BEGIN
	 DELETE FROM menus 
	 WHERE menus.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE menus 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE menus.id = id 
	 AND menus.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_getFilsAffecteAUnGroupe` (`menuPereId` INT, `groupeId` INT)   BEGIN

   SELECT `menus`.`id`,
    `menus`.`reference`,
    `menus`.`libelle`,
    `menus`.`descriptions`,
    `menus`.`url`,
    `menus`.`menuPereId`,
    `menus`.`ordre`,
    `menus`.`typeMenu`,
    `menus`.`image`,
    `menus`.`estActif`,
    `menus`.`creationDate`,
    `menus`.`creationUserId`,
    `menus`.`modifDate`,
    `menus`.`modifUserId`
FROM `menus`
    WHERE `menus`.`menuPereId` = menuPereId 
    AND `menus`.`estActif` = 1
    AND `menus`.`id` IN
    (
        SELECT distinct(`privileges`.`menuId`)
        FROM `privileges`
        INNER JOIN `menus` ON `privileges`.`menuId` AND `menus`.`id`
        WHERE `menus`.`menuPereId` = menuPereId
        AND `privileges`.`groupeId` = groupeId
    )    
    ORDER BY `menus`.`ordre`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_getFilsByPere` (IN `pereId` INT)   BEGIN

  SELECT
    `menus`.`id`,
    `menus`.`reference`,
    `menus`.`libelle`,
    `menus`.`descriptions`,
    `menus`.`url`,
    `menus`.`menuPereId`,
    `menus`.`ordre`,
    `menus`.`typeMenu`,
    `menus`.`image`,
    `menus`.`estActif`,
    `menus`.`creationDate`,
    `menus`.`creationUserId`,
    `menus`.`modifDate`,
    `menus`.`modifUserId`
	FROM `menus`
    WHERE `menus`.`estActif` = 1
    AND `menus`.`menuPereId` = pereId
	ORDER BY `menus`.`ordre`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_getMenuFils` ()   BEGIN

   SELECT `menus`.`id`,
    `menus`.`reference`,
    `menus`.`libelle`,
    `menus`.`descriptions`,
    `menus`.`url`,
    `menus`.`menuPereId`,
    `menus`.`ordre`,
    `menus`.`typeMenu`,
    `menus`.`image`,
    `menus`.`estActif`,
    `menus`.`creationDate`,
    `menus`.`creationUserId`,
    `menus`.`modifDate`,
    `menus`.`modifUserId`
FROM `menus`
    WHERE `menus`.`estActif` = 1 AND `menus`.`menuPereId` != 0
	ORDER BY `menus`.`ordre` ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_getMenuFilsByGroupe` (`menuPereId` INT, `groupeId` INT)   BEGIN
    SELECT `menus`.`id`,
    `menus`.`reference`,
    `menus`.`libelle`,
    `menus`.`descriptions`,
    `menus`.`url`,
    `menus`.`menuPereId`,
    `menus`.`ordre`,
    `menus`.`typeMenu`,
    `menus`.`image`,
    `menus`.`estActif`,
    `menus`.`creationDate`,
    `menus`.`creationUserId`,
    `menus`.`modifDate`,
    `menus`.`modifUserId`
	FROM `menus`
    WHERE `menus`.`menuPereId` = menuPereId
    AND `menus`.`estActif` = 1
    AND `menus`.`id` NOT IN (
        SELECT distinct(`privileges`.`menuId`)
        FROM `privileges`
        INNER JOIN `menus` ON `privileges`.`menuId` = `menus`.`id`
        WHERE `menus`.`menuPereId` = menuPereId
        AND `privileges`.`groupeId` = groupeId
        AND `privileges`.`modeAccesId` = 
        (
            SELECT `modeaccess`.`id` FROM `modeaccess` WHERE `modeaccess`.`libelle` ='Tout' and `modeaccess`.`estActif`=1
        )
    )
    ORDER BY `menus`.`ordre`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_getMenuFilsByUserReference` (`userId` INT, `referenceMenu` VARCHAR(50))   BEGIN
	SELECT  distinct(`menus`.`id`),
		`menus`.`reference`,
		`menus`.`libelle`,
		`menus`.`descriptions`,
		`menus`.`url`,
		`menus`.`menuPereId`,
		`menus`.`ordre`,
		`menus`.`typeMenu`,
		`menus`.`image`,
		`menus`.`estActif`,
		`menus`.`creationDate`,
		`menus`.`creationUserId`,
		`menus`.`modifDate`,
		`menus`.`modifUserId`
	FROM `menus`
	INNER JOIN `privileges` ON `menus`.`id` = `privileges`.`menuId`
	INNER JOIN `groupes`  ON `privileges`.`groupeId` = `groupes`.`id`
	INNER JOIN `usergroupes` ON `groupes`.`id` = `usergroupes`.`groupeId`
	WHERE `privileges`.`estActif`=1 AND `usergroupes`.`estActif`=1 AND `groupes`.`estActif`=1
	AND `menus`.`estActif` = 1 AND `usergroupes`.`userId` = userId
	AND `menus`.`menuPereId` IN (
		  SELECT  `menus`.`id`
		  from `menus`
		where `menus`.`reference`=referenceMenu
)
order by `menus`.`ordre`
;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_getMenuPere` ()   BEGIN

   SELECT `menus`.`id`,
    `menus`.`reference`,
    `menus`.`libelle`,
    `menus`.`descriptions`,
    `menus`.`url`,
    `menus`.`menuPereId`,
    `menus`.`ordre`,
    `menus`.`typeMenu`,
    `menus`.`image`,
    `menus`.`estActif`,
    `menus`.`creationDate`,
    `menus`.`creationUserId`,
    `menus`.`modifDate`,
    `menus`.`modifUserId`
FROM `menus`
    WHERE `menus`.`estActif` = 1 AND `menus`.`menuPereId` = 0
	ORDER BY `menus`.`ordre` ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_getMenuPrincipalByUser` (`userId` INT)   BEGIN 
	SELECT  distinct(`menus`.`id`),
		`menus`.`reference`,
		`menus`.`libelle`,
		`menus`.`descriptions`,
		`menus`.`url`,
		`menus`.`menuPereId`,
		`menus`.`ordre`,
		`menus`.`typeMenu`,
		`menus`.`image`,
		`menus`.`estActif`,
		`menus`.`creationDate`,
		`menus`.`creationUserId`,
		`menus`.`modifDate`,
		`menus`.`modifUserId`
	FROM `menus`
	INNER JOIN `privileges` ON `menus`.`id` = `privileges`.`menuId`
	INNER JOIN `groupes`  ON `privileges`.`groupeId` = `groupes`.`id`
	INNER JOIN `usergroupes` ON `groupes`.`id` = `usergroupes`.`groupeId`
	WHERE `privileges`.`estActif`=1 AND `usergroupes`.`estActif`=1 AND `groupes`.`estActif`=1
	AND `menus`.`estActif` = 1 AND `menus`.`menuPereId` = 0
	AND `usergroupes`.`userId` = userId
    order by `menus`.`ordre`;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_getOngletsAffecteAUnGroupe` (`groupeId` INT)   BEGIN
SELECT DISTINCT `menus`.`id`,
   `menus`.`reference`,
    `menus`.`libelle`,
    `menus`.`descriptions`,
    `menus`.`url`,
    `menus`.`menuPereId`,
    `menus`.`ordre`,
    `menus`.`typeMenu`,
    `menus`.`image`,
    `menus`.`estActif`,
    `menus`.`creationDate`,
    `menus`.`creationUserId`,
    `menus`.`modifDate`,
    `menus`.`modifUserId`
    FROM `menus`
	INNER JOIN `onglets` ON `menus`.`id` = `onglets`.`menuId`
	INNER JOIN `privileges` ON `onglets`.`id` = `privileges`.`ongletId`
    WHERE `menus`.`estActif` = 1 AND `onglets`.`estActif` = 1
	AND `privileges`.`groupeId` = groupeId 
    ORDER BY `menus`.`ordre`;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_getPrincipalAffecteAUnGroupe` (`groupeId` INT)   BEGIN
   SELECT `menus`.`id`,
    `menus`.`reference`,
    `menus`.`libelle`,
    `menus`.`descriptions`,
    `menus`.`url`,
    `menus`.`menuPereId`,
    `menus`.`ordre`,
    `menus`.`typeMenu`,
    `menus`.`image`,
    `menus`.`estActif`,
    `menus`.`creationDate`,
    `menus`.`creationUserId`,
    `menus`.`modifDate`,
    `menus`.`modifUserId`
FROM `menus`
    WHERE `menus`.`menuPereId` = 0 
    AND `menus`.`estActif` = 1
    AND `menus`.`id` IN
    (
        SELECT distinct(`privileges`.`menuId`)
        FROM `privileges`
        INNER JOIN `menus` ON `privileges`.`menuId` AND `menus`.`id`
        WHERE `menus`.`menuPereId` = 0
        AND `privileges`.`groupeId` = groupeId
    )   
    
    ORDER BY `menus`.`ordre`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_getWithOnglets` (`typeMenu` VARCHAR(20))   BEGIN
    SELECT DISTINCT(`menus`.`id`),
    `menus`.`reference`,
    `menus`.`libelle`,
    `menus`.`descriptions`,
    `menus`.`url`,
    `menus`.`menuPereId`,
    `menus`.`ordre`,
    `menus`.`typeMenu`,
    `menus`.`image`,
    `menus`.`estActif`,
    `menus`.`creationDate`,
    `menus`.`creationUserId`,
    `menus`.`modifDate`,
    `menus`.`modifUserId`
FROM `menus`
    WHERE `menus`.`estActif` = 1 	
    AND `menus`.`typeMenu` = typeMenu
	AND `menus`.`id` IN (
		SELECT DISTINCT `onglets`.`menuId`
		FROM `onglets`
		WHERE `onglets`.`estActif` = 1
	)
	ORDER BY `menus`.`libelle`, `menus`.`id`
 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_insert` (`reference` VARCHAR(45), `libelle` VARCHAR(45), `descriptions` MEDIUMTEXT, `url` VARCHAR(120), `menuPereId` INT(11), `ordre` INT(11), `typeMenu` ENUM('Public','Prive'), `image` VARCHAR(45), `creationUserId` INT)   BEGIN
	 INSERT INTO menus( 
		 id, 
		 reference,
		 libelle,
		 descriptions,
		 url,
		 menuPereId,
		 ordre,
		 typeMenu,
		 image,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 reference,
			 libelle,
			 descriptions,
			 url,
			 menuPereId,
			 ordre,
			 typeMenu,
			 image,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			menus.id,
			menus.reference,
			menus.libelle,
			menus.descriptions,
			menus.url,
			menus.menuPereId,
			menus.ordre,
			menus.typeMenu,
			menus.image,
			menus.estActif,
			menus.creationDate,
			menus.creationUserId,
			menus.modifDate,
			menus.modifUserId
		 FROM menus';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE menus.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_selectBy` (`id` INT(11), `reference` VARCHAR(45), `libelle` VARCHAR(45), `descriptions` MEDIUMTEXT, `url` VARCHAR(120), `menuPereId` INT(11), `ordre` INT(11), `typeMenu` ENUM('Public','Prive'), `image` VARCHAR(45), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			menus.id,
			menus.reference,
			menus.libelle,
			menus.descriptions,
			menus.url,
			menus.menuPereId,
			menus.ordre,
			menus.typeMenu,
			menus.image,
			menus.estActif,
			menus.creationDate,
			menus.creationUserId,
			menus.modifDate,
			menus.modifUserId
		 FROM menus
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.id = ' ,id); 
	 END IF; 
	 IF reference IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.reference = "',reference,'"');
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.libelle = "',libelle,'"');
	 END IF; 
	 IF descriptions IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.descriptions = "',descriptions,'"');
	 END IF; 
	 IF url IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.url = "',url,'"');
	 END IF; 
	 IF menuPereId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.menuPereId = ' ,menuPereId); 
	 END IF; 
	 IF ordre IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.ordre = ' ,ordre); 
	 END IF; 
	 IF typeMenu IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.typeMenu = "',typeMenu,'"');
	 END IF; 
	 IF image IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.image = "',image,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND menus.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_selectById` (`id` INT)   BEGIN
		 SELECT 
			menus.id,
			menus.reference,
			menus.libelle,
			menus.descriptions,
			menus.url,
			menus.menuPereId,
			menus.ordre,
			menus.typeMenu,
			menus.image,
			menus.estActif,
			menus.creationDate,
			menus.creationUserId,
			menus.modifDate,
			menus.modifUserId
		 FROM menus
		 WHERE menus.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menus_update` (`id` INT, `reference` VARCHAR(45), `libelle` VARCHAR(45), `descriptions` MEDIUMTEXT, `url` VARCHAR(120), `menuPereId` INT(11), `ordre` INT(11), `typeMenu` ENUM('Public','Prive'), `image` VARCHAR(45), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE menus
		 SET 
			reference = reference, 
			libelle = libelle, 
			descriptions = descriptions, 
			url = url, 
			menuPereId = menuPereId, 
			ordre = ordre, 
			typeMenu = typeMenu, 
			image = image, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE menus.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE modeaccess 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE modeaccess.id = id 
	 AND modeaccess.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_delete` (`id` INT)   BEGIN
	 DELETE FROM modeaccess 
	 WHERE modeaccess.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE modeaccess 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE modeaccess.id = id 
	 AND modeaccess.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_getAffectedByOngletAndGroupe` (`ongletId` INT, `groupeId` INT)   BEGIN
     SELECT
    `modeaccess`.`id`,
    `modeaccess`.`libelle`,
    `modeaccess`.`estActif`,
    `modeaccess`.`creationDate`,
    `modeaccess`.`creationUserId`,
    `modeaccess`.`modifDate`,
    `modeaccess`.`modifUserId`
    FROM `modeaccess`
    WHERE `modeaccess`.`id` IN
    (
        SELECT distinct(`privileges`.`modeAccesId`)
        FROM `privileges`
        WHERE `privileges`.`ongletId` = ongletId
        AND `privileges`.`groupeId` = groupeId
    )
    ORDER BY `modeaccess`.`libelle`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_getAffectesByMenuAndGroupe` (`menuId` INT, `groupeId` INT)   BEGIN

     SELECT
    `modeaccess`.`id`,
    `modeaccess`.`libelle`,
    `modeaccess`.`estActif`,
    `modeaccess`.`creationDate`,
    `modeaccess`.`creationUserId`,
    `modeaccess`.`modifDate`,
    `modeaccess`.`modifUserId`
    FROM `modeaccess`
    WHERE `modeaccess`.`id` IN
    (
        SELECT distinct(`privileges`.`modeAccesId`)
        FROM `privileges`
        WHERE `privileges`.`menuId` = menuId
        AND `privileges`.`groupeId` = groupeId
    )
    ORDER BY `modeaccess`.`libelle`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_getNonAffectedByMenuAndGroupe` (`menuId` INT, `groupeId` INT)   BEGIN

    SELECT
    `modeaccess`.`id`,
    `modeaccess`.`libelle`,
    `modeaccess`.`estActif`,
    `modeaccess`.`creationDate`,
    `modeaccess`.`creationUserId`,
    `modeaccess`.`modifDate`,
    `modeaccess`.`modifUserId`
    FROM `modeaccess`
    WHERE `modeaccess`.`id` NOT IN
    (
        SELECT `privileges`.`modeAccesId`
        FROM `privileges`
        WHERE `privileges`.`menuId` = menuId
        AND `privileges`.`groupeId` = groupeId
    )
    ORDER BY `modeaccess`.`libelle`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_getNotAffectedByOngletAndGroupe` (`ongletId` INT, `groupeId` INT)   BEGIN

    SELECT
    `modeaccess`.`id`,
    `modeaccess`.`libelle`,
    `modeaccess`.`estActif`,
    `modeaccess`.`creationDate`,
    `modeaccess`.`creationUserId`,
    `modeaccess`.`modifDate`,
    `modeaccess`.`modifUserId`
    FROM `modeaccess`
    WHERE `modeaccess`.`id` NOT IN
    (
        SELECT `privileges`.`modeAccesId`
        FROM `privileges`
        WHERE `privileges`.`ongletId` = ongletId
        AND `privileges`.`groupeId` = groupeId
    )
    ORDER BY `modeaccess`.`libelle`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_insert` (`libelle` VARCHAR(50), `creationUserId` INT)   BEGIN
	 INSERT INTO modeaccess( 
		 id, 
		 libelle,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 libelle,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			modeaccess.id,
			modeaccess.libelle,
			modeaccess.estActif,
			modeaccess.creationDate,
			modeaccess.creationUserId,
			modeaccess.modifDate,
			modeaccess.modifUserId
		 FROM modeaccess';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE modeaccess.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_selectBy` (`id` INT(11), `libelle` VARCHAR(50), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			modeaccess.id,
			modeaccess.libelle,
			modeaccess.estActif,
			modeaccess.creationDate,
			modeaccess.creationUserId,
			modeaccess.modifDate,
			modeaccess.modifUserId
		 FROM modeaccess
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND modeaccess.id = ' ,id); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND modeaccess.libelle = "',libelle,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND modeaccess.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND modeaccess.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND modeaccess.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND modeaccess.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND modeaccess.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_selectById` (`id` INT)   BEGIN
		 SELECT 
			modeaccess.id,
			modeaccess.libelle,
			modeaccess.estActif,
			modeaccess.creationDate,
			modeaccess.creationUserId,
			modeaccess.modifDate,
			modeaccess.modifUserId
		 FROM modeaccess
		 WHERE modeaccess.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modeaccess_update` (`id` INT, `libelle` VARCHAR(50), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE modeaccess
		 SET 
			libelle = libelle, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE modeaccess.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE onglets 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE onglets.id = id 
	 AND onglets.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_delete` (`id` INT)   BEGIN
	 DELETE FROM onglets 
	 WHERE onglets.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE onglets 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE onglets.id = id 
	 AND onglets.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_getAffectesByGroupeAndMenu` (`groupeId` INT, `menuId` INT)   BEGIN

	SELECT `onglets`.`id`,
		`onglets`.`menuId`,
		`menus`.`libelle` as menuPere,
		`onglets`.`reference`,
		`onglets`.`libelle`,
		`onglets`.`descriptions`,
		`onglets`.`type`,
		`onglets`.`ordre`,
		`onglets`.`url`,
		`onglets`.`image`,
		`onglets`.`estActif`,
		`onglets`.`creationDate`,
		`onglets`.`creationUserId`,
		`onglets`.`modifDate`,
		`onglets`.`modifUserId`
	FROM `onglets`
	INNER JOIN `menus` ON `onglets`.`menuId` = `menus`.`id`
    WHERE `onglets`.`menuId` = menuId
    AND `onglets`.`estActif` = 1 
    AND `onglets`.`id` IN (
        SELECT distinct(`privileges`.`ongletId`)
        FROM `privileges`
        INNER JOIN `onglets` ON `privileges`.`ongletId` = `onglets`.`id`
        WHERE `onglets`.`menuId` = menuId
        AND `privileges`.`groupeId` = groupeId
    )
   ORDER BY `onglets`.`menuId`, `onglets`.`ordre`, `onglets`.`libelle`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_getOngletByGroupe` (`menuId` INT, `groupeId` INT)   BEGIN
   SELECT 
    `onglets`.`id`,
    `onglets`.`menuId`,
    `onglets`.`reference`,
    `onglets`.`libelle`,
    `onglets`.`descriptions`,
    `onglets`.`type`,
    `onglets`.`ordre`,
    `onglets`.`url`,
    `onglets`.`image`,
    `onglets`.`estActif`,
    `onglets`.`creationDate`,
    `onglets`.`creationUserId`,
    `onglets`.`modifDate`,
    `onglets`.`modifUserId`
    FROM `onglets`
    WHERE `onglets`.`menuId` = menuId
    AND `onglets`.`estActif` = 1
    AND `onglets`.`id` NOT IN (
        SELECT distinct(`privileges`.`ongletId`)
        FROM `privileges`
        INNER JOIN `onglets` ON `privileges`.`ongletId` = `onglets`.`id`
        WHERE `onglets`.`menuId` = menuId
        AND `privileges`.`groupeId` = groupeId
        AND `privileges`.`modeAccesId` = 
        (
            SELECT `modeaccess`.`id` FROM `modeaccess` WHERE `modeaccess`.`libelle` ='Tout' and `modeaccess`.`estActif`=1
        )
    )
    ORDER BY `onglets`.`ordre`;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_getOngletByUserReferenceMenu` (`userId` INT, `referenceMenu` VARCHAR(50))   BEGIN
	SELECT  distinct(`onglets`.`id`),
    `onglets`.`menuId`,
    `onglets`.`reference`,
    `onglets`.`libelle`,
    `onglets`.`descriptions`,
    `onglets`.`type`,
    `onglets`.`ordre`,
    `onglets`.`url`,
    `onglets`.`image`,
    `onglets`.`estActif`,
    `onglets`.`creationDate`,
    `onglets`.`creationUserId`,
    `onglets`.`modifDate`,
    `onglets`.`modifUserId`
FROM `onglets`
	INNER JOIN `privileges` ON `onglets`.`id` = `privileges`.`ongletId`
	INNER JOIN `groupes`  ON `privileges`.`groupeId` = `groupes`.`id`
	INNER JOIN `usergroupes` ON `groupes`.`id` = `usergroupes`.`groupeId`
	WHERE `privileges`.`estActif`=1 AND `usergroupes`.`estActif`=1 AND `groupes`.`estActif`=1
	AND `onglets`.`estActif` = 1 AND `usergroupes`.`userId` = userId
	AND `onglets`.`menuId` IN (
		  SELECT  `menus`.`id`
		  FROM `menus`
		WHERE `menus`.`reference`=referenceMenu
)
ORDER BY `onglets`.`ordre`;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_insert` (`menuId` INT(11), `reference` VARCHAR(30), `libelle` VARCHAR(45), `descriptions` MEDIUMTEXT, `type` ENUM('Public','Prive'), `ordre` INT(11), `url` VARCHAR(120), `image` VARCHAR(45), `creationUserId` INT)   BEGIN
	 INSERT INTO onglets( 
		 id, 
		 menuId,
		 reference,
		 libelle,
		 descriptions,
		 type,
		 ordre,
		 url,
		 image,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 menuId,
			 reference,
			 libelle,
			 descriptions,
			 type,
			 ordre,
			 url,
			 image,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			onglets.id,
			onglets.menuId,
			onglets.reference,
			onglets.libelle,
			onglets.descriptions,
			onglets.type,
			onglets.ordre,
			onglets.url,
			onglets.image,
			onglets.estActif,
			onglets.creationDate,
			onglets.creationUserId,
			onglets.modifDate,
			onglets.modifUserId
		 FROM onglets';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE onglets.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_selectBy` (`id` INT(11), `menuId` INT(11), `reference` VARCHAR(30), `libelle` VARCHAR(45), `descriptions` MEDIUMTEXT, `type` ENUM('Public','Prive'), `ordre` INT(11), `url` VARCHAR(120), `image` VARCHAR(45), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			onglets.id,
			onglets.menuId,
			onglets.reference,
			onglets.libelle,
			onglets.descriptions,
			onglets.type,
			onglets.ordre,
			onglets.url,
			onglets.image,
			onglets.estActif,
			onglets.creationDate,
			onglets.creationUserId,
			onglets.modifDate,
			onglets.modifUserId
		 FROM onglets
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.id = ' ,id); 
	 END IF; 
	 IF menuId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.menuId = ' ,menuId); 
	 END IF; 
	 IF reference IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.reference = "',reference,'"');
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.libelle = "',libelle,'"');
	 END IF; 
	 IF descriptions IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.descriptions = "',descriptions,'"');
	 END IF; 
	 IF type IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.type = "',type,'"');
	 END IF; 
	 IF ordre IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.ordre = ' ,ordre); 
	 END IF; 
	 IF url IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.url = "',url,'"');
	 END IF; 
	 IF image IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.image = "',image,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND onglets.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_selectById` (`id` INT)   BEGIN
		 SELECT 
			onglets.id,
			onglets.menuId,
			onglets.reference,
			onglets.libelle,
			onglets.descriptions,
			onglets.type,
			onglets.ordre,
			onglets.url,
			onglets.image,
			onglets.estActif,
			onglets.creationDate,
			onglets.creationUserId,
			onglets.modifDate,
			onglets.modifUserId
		 FROM onglets
		 WHERE onglets.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onglets_update` (`id` INT, `menuId` INT(11), `reference` VARCHAR(30), `libelle` VARCHAR(45), `descriptions` MEDIUMTEXT, `type` ENUM('Public','Prive'), `ordre` INT(11), `url` VARCHAR(120), `image` VARCHAR(45), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE onglets
		 SET 
			menuId = menuId, 
			reference = reference, 
			libelle = libelle, 
			descriptions = descriptions, 
			type = type, 
			ordre = ordre, 
			url = url, 
			image = image, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE onglets.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payements_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE payements 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE payements.id = id 
	 AND payements.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payements_delete` (`id` INT)   BEGIN
	 DELETE FROM payements 
	 WHERE payements.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payements_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE payements 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE payements.id = id 
	 AND payements.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payements_getElevePasPaye` (`classeId` INT, `mois` VARCHAR(54))   BEGIN
	SELECT 
			eleves.id,
			eleves.classeId,
			eleves.matricule,
			eleves.nom,
			eleves.prenoms,
			eleves.numeroTuteur1,
			eleves.numeroTuteur2,
			eleves.numeroTuteur4,
			eleves.statut
		 FROM eleves
		 WHERE eleves.estActif= 1 AND eleves.id NOT IN
         (
			select 
				payements.eleveId
			from payements
            INNER JOIN eleves E on payements.eleveId = E.id
            
            where payements.estActif = 1 AND  
			payements.datePayement like concat(mois,'%') 
            
         )
         AND eleves.classeId = classeId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payements_getStudentSituationByClasseId` (`classeId` INT, `mois` VARCHAR(54))   BEGIN
	SELECT 
			eleves.id,
			eleves.classeId,
			eleves.matricule,
			eleves.nom,
			eleves.prenoms,
			eleves.numeroTuteur1,
			eleves.numeroTuteur2,
			eleves.numeroTuteur4,
			eleves.statut
		 FROM eleves
		 WHERE eleves.estActif= 1 AND eleves.id in
         (
			select 
				payements.eleveId
			from payements
            INNER JOIN eleves E on payements.eleveId = E.id
			#LEFT JOIN classses E on E.classeId = classses.id	
            
            where payements.estActif = 1 AND  E.classeId = classeId AND 
			payements.datePayement like concat(mois,'%') 
            
         );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payements_insert` (`eleveId` INT(11), `trancheId` INT(11), `prestationId` INT(11), `typePayements` VARCHAR(100), `mois` VARCHAR(45), `prix` DOUBLE, `datePayement` DATETIME, `creationUserId` INT)   BEGIN
	 INSERT INTO payements( 
		 id, 
		 eleveId,
		 trancheId,
		 prestationId,
		 typePayements,
		 mois,
		 prix,
		 datePayement,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 eleveId,
			 trancheId,
			 prestationId,
			 typePayements,
			 mois,
			 prix,
			 CURRENT_TIMESTAMP,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payements_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			payements.id,
			payements.eleveId,
			payements.trancheId,
			payements.prestationId,
			payements.typePayements,
			payements.mois,
			payements.prix,
			payements.datePayement,
			payements.estActif,
			payements.creationDate,
			payements.creationUserId,
			payements.modifDate,
			payements.modifUserId
		 FROM payements';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE payements.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payements_selectBy` (`id` INT(11), `eleveId` INT(11), `trancheId` INT(11), `prestationId` INT(11), `typePayements` ENUM('partiel','totalite'), `mois` VARCHAR(45), `prix` DOUBLE UNSIGNED ZEROFILL, `datePayement` VARCHAR(45), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			payements.id,
			payements.eleveId,
			payements.trancheId,
			payements.prestationId,
			payements.typePayements,
			payements.mois,
			payements.prix,
			payements.datePayement,
			payements.estActif,
			payements.creationDate,
			payements.creationUserId,
			payements.modifDate,
			payements.modifUserId
		 FROM payements
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.id = ' ,id); 
	 END IF; 
	 IF eleveId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.eleveId = ' ,eleveId); 
	 END IF; 
	 IF trancheId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.trancheId = ' ,trancheId); 
	 END IF; 
	 IF prestationId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.prestationId = ' ,prestationId); 
	 END IF; 
	 IF typePayements IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.typePayements = "',typePayements,'"');
	 END IF; 
	 IF mois IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.mois = "',mois,'"');
	 END IF; 
	 IF prix IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.prix = "',prix,'"');
	 END IF; 
	 IF datePayement IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.datePayement = "',datePayement,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payements.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payements_selectById` (`id` INT)   BEGIN
		 SELECT 
			payements.id,
			payements.eleveId,
			payements.trancheId,
			payements.prestationId,
			payements.typePayements,
			payements.mois,
			payements.prix,
			payements.datePayement,
			payements.estActif,
			payements.creationDate,
			payements.creationUserId,
			payements.modifDate,
			payements.modifUserId
		 FROM payements
		 WHERE payements.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payements_update` (`id` INT, `eleveId` INT(11), `trancheId` INT(11), `prestationId` INT(11), `typePayements` ENUM('partiel','totalite'), `mois` VARCHAR(45), `prix` DOUBLE UNSIGNED ZEROFILL, `datePayement` VARCHAR(45), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE payements
		 SET 
			eleveId = eleveId, 
			trancheId = trancheId, 
			prestationId = prestationId, 
			typePayements = typePayements, 
			mois = mois, 
			prix = prix, 
			datePayement = datePayement, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE payements.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payss_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE payss 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE payss.id = id 
	 AND payss.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payss_delete` (`id` INT)   BEGIN
	 DELETE FROM payss 
	 WHERE payss.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payss_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE payss 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE payss.id = id 
	 AND payss.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payss_insert` (`libelle` VARCHAR(50), `indicatifTel` INT(11), `deviseId` INT(11), `creationUserId` INT)   BEGIN
	 INSERT INTO payss( 
		 id, 
		 libelle,
		 indicatifTel,
		 deviseId,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 libelle,
			 indicatifTel,
			 deviseId,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payss_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			payss.id,
			payss.libelle,
			payss.indicatifTel,
			payss.deviseId,
			payss.estActif,
			payss.creationDate,
			payss.creationUserId,
			payss.modifDate,
			payss.modifUserId
		 FROM payss';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE payss.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payss_selectBy` (`id` INT(11), `libelle` VARCHAR(50), `indicatifTel` INT(11), `deviseId` INT(11), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			payss.id,
			payss.libelle,
			payss.indicatifTel,
			payss.deviseId,
			payss.estActif,
			payss.creationDate,
			payss.creationUserId,
			payss.modifDate,
			payss.modifUserId
		 FROM payss
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payss.id = ' ,id); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payss.libelle = "',libelle,'"');
	 END IF; 
	 IF indicatifTel IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payss.indicatifTel = ' ,indicatifTel); 
	 END IF; 
	 IF deviseId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payss.deviseId = ' ,deviseId); 
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payss.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payss.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payss.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payss.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND payss.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payss_selectById` (`id` INT)   BEGIN
		 SELECT 
			payss.id,
			payss.libelle,
			payss.indicatifTel,
			payss.deviseId,
			payss.estActif,
			payss.creationDate,
			payss.creationUserId,
			payss.modifDate,
			payss.modifUserId
		 FROM payss
		 WHERE payss.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payss_update` (`id` INT, `libelle` VARCHAR(50), `indicatifTel` INT(11), `deviseId` INT(11), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE payss
		 SET 
			libelle = libelle, 
			indicatifTel = indicatifTel, 
			deviseId = deviseId, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE payss.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prefectures_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE prefectures 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE prefectures.id = id 
	 AND prefectures.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prefectures_delete` (`id` INT)   BEGIN
	 DELETE FROM prefectures 
	 WHERE prefectures.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prefectures_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE prefectures 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE prefectures.id = id 
	 AND prefectures.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prefectures_insert` (`regionId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `creationUserId` INT)   BEGIN
	 INSERT INTO prefectures( 
		 id, 
		 regionId,
		 libelle,
		 code,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 regionId,
			 libelle,
			 code,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prefectures_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			prefectures.id,
			prefectures.regionId,
			prefectures.libelle,
			prefectures.code,
			prefectures.estActif,
			prefectures.creationDate,
			prefectures.creationUserId,
			prefectures.modifDate,
			prefectures.modifUserId
		 FROM prefectures';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE prefectures.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prefectures_selectBy` (`id` INT(11), `regionId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			prefectures.id,
			prefectures.regionId,
			prefectures.libelle,
			prefectures.code,
			prefectures.estActif,
			prefectures.creationDate,
			prefectures.creationUserId,
			prefectures.modifDate,
			prefectures.modifUserId
		 FROM prefectures
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prefectures.id = ' ,id); 
	 END IF; 
	 IF regionId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prefectures.regionId = ' ,regionId); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prefectures.libelle = "',libelle,'"');
	 END IF; 
	 IF code IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prefectures.code = "',code,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prefectures.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prefectures.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prefectures.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prefectures.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prefectures.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prefectures_selectById` (`id` INT)   BEGIN
		 SELECT 
			prefectures.id,
			prefectures.regionId,
			prefectures.libelle,
			prefectures.code,
			prefectures.estActif,
			prefectures.creationDate,
			prefectures.creationUserId,
			prefectures.modifDate,
			prefectures.modifUserId
		 FROM prefectures
		 WHERE prefectures.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prefectures_update` (`id` INT, `regionId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE prefectures
		 SET 
			regionId = regionId, 
			libelle = libelle, 
			code = code, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE prefectures.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prestations_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE prestations 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE prestations.id = id 
	 AND prestations.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prestations_delete` (`id` INT)   BEGIN
	 DELETE FROM prestations 
	 WHERE prestations.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prestations_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE prestations 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE prestations.id = id 
	 AND prestations.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prestations_insert` (`libelle` VARCHAR(45), `modePaiement` VARCHAR(55), `duree` INT, `uniteDuree` VARCHAR(55), `creationUserId` INT)   BEGIN
	 INSERT INTO prestations( 
		 id, 
		 libelle,
		 modePaiement,
         duree,
		 uniteDuree,
		 estActif,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 libelle,
			 modePaiement,
             duree,
			 uniteDuree,
			 estActif,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prestations_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			prestations.id,
			prestations.libelle,
			prestations.modePaiement,
			prestations.uniteDuree,
			prestations.estActif,
			prestations.creationDate,
			prestations.creationUserId,
			prestations.modifDate,
			prestations.modifUserId,
			prestations.duree
		 FROM prestations';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE prestations.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prestations_selectBy` (`id` INT(11), `libelle` VARCHAR(45), `modePaiement` VARCHAR(55), `duree` INT, `uniteDuree` VARCHAR(55), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			prestations.id,
			prestations.libelle,
			prestations.modePaiement,
			prestations.uniteDuree,
            prestations.duree,
			prestations.estActif,
			prestations.creationDate,
			prestations.creationUserId,
			prestations.modifDate,
			prestations.modifUserId,
			prestations.duree
		 FROM prestations
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.id = ' ,id); 
	 END IF; 
      IF duree IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.duree = ' ,duree); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.libelle = "',libelle,'"');
	 END IF; 
	 IF modePaiement IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.modePaiement = "',modePaiement,'"');
	 END IF; 
	 IF uniteDuree IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.uniteDuree = "',uniteDuree,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.modifUserId = ' ,modifUserId); 
	 END IF; 
	 IF duree IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND prestations.duree = ' ,duree); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prestations_selectById` (`id` INT)   BEGIN
		 SELECT 
			prestations.id,
			prestations.libelle,
			prestations.modePaiement,
			prestations.uniteDuree,
			prestations.estActif,
			prestations.creationDate,
			prestations.creationUserId,
			prestations.modifDate,
			prestations.modifUserId,
			prestations.duree
		 FROM prestations
		 WHERE prestations.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prestations_update` (`id` INT, `libelle` VARCHAR(45), `modePaiement` VARCHAR(55), `duree` INT, `uniteDuree` VARCHAR(55), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE prestations
		 SET 
			libelle = libelle, 
			modePaiement = modePaiement, 
            duree = duree, 
			uniteDuree = uniteDuree, 
			estActif = estActif, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE prestations.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privileges_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE privileges 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE privileges.id = id 
	 AND privileges.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privileges_delete` (`id` INT)   BEGIN
	 DELETE FROM privileges 
	 WHERE privileges.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privileges_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE privileges 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE privileges.id = id 
	 AND privileges.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privileges_getCountPrivilegeForActionMenu` (`userId` INT, `referenceMenu` VARCHAR(50), `modeAccesId` INT)   BEGIN
	SELECT count(*) as `nombre`
    FROM `privileges` 
    INNER JOIN `groupes`  ON `privileges`.`groupeId` = `groupes`.`id`
    INNER JOIN `usergroupes`  ON `groupes`.`id` = `usergroupes`.`groupeId`
    INNER JOIN `menus` ON `privileges`.`menuId` = `menus`.`id`
    WHERE `privileges`.`estActif` = 1 AND `groupes`.`estActif` = 1 AND `menus`.`estActif` = 1
     AND ( `privileges`.`modeAccesId` = modeAccesId OR `privileges`.`modeAccesId` = 5)
     AND `menus`.`reference` =referenceMenu
     AND `usergroupes`.`userId`=userId ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privileges_getCountPrivilegeForActionOnglet` (`userId` INT, `referenceMenu` VARCHAR(50), `referenceOnglet` VARCHAR(50))   BEGIN
	SELECT  `privileges`.`modeAccesId`
    FROM `privileges` 
    INNER JOIN `groupes`  ON `privileges`.`groupeId` = `groupes`.`id`
    INNER JOIN `usergroupes`  ON `groupes`.`id` = `usergroupes`.`groupeId`
    INNER JOIN `onglets` ON `privileges`.`ongletId` = `onglets`.`id`
    INNER JOIN `menus` ON `onglets`.`menuId` = `menus`.`id`
    WHERE `privileges`.`estActif` = 1 AND `groupes`.`estActif` = 1
    AND `menus`.`estActif` = 1 AND `onglets`.`estActif` = 1
	AND `menus`.`reference` =referenceMenu
	AND `onglets`.`reference` =referenceOnglet
	AND `usergroupes`.`userId`=userId;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privileges_insert` (`menuId` INT(11), `ongletId` INT(11), `groupeId` INT(11), `modeAccesId` INT(11), `creationUserId` INT)   BEGIN
	 INSERT INTO privileges( 
		 id, 
		 menuId,
		 ongletId,
		 groupeId,
		 modeAccesId,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 menuId,
			 ongletId,
			 groupeId,
			 modeAccesId,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privileges_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			privileges.id,
			privileges.menuId,
			privileges.ongletId,
			privileges.groupeId,
			privileges.modeAccesId,
			privileges.estActif,
			privileges.creationDate,
			privileges.creationUserId,
			privileges.modifDate,
			privileges.modifUserId
		 FROM privileges';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE privileges.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privileges_selectBy` (`id` INT(11), `menuId` INT(11), `ongletId` INT(11), `groupeId` INT(11), `modeAccesId` INT(11), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			privileges.id,
			privileges.menuId,
			privileges.ongletId,
			privileges.groupeId,
			privileges.modeAccesId,
			privileges.estActif,
			privileges.creationDate,
			privileges.creationUserId,
			privileges.modifDate,
			privileges.modifUserId
		 FROM privileges
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND privileges.id = ' ,id); 
	 END IF; 
	 IF menuId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND privileges.menuId = ' ,menuId); 
	 END IF; 
	 IF ongletId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND privileges.ongletId = ' ,ongletId); 
	 END IF; 
	 IF groupeId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND privileges.groupeId = ' ,groupeId); 
	 END IF; 
	 IF modeAccesId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND privileges.modeAccesId = ' ,modeAccesId); 
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND privileges.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND privileges.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND privileges.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND privileges.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND privileges.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privileges_selectById` (`id` INT)   BEGIN
		 SELECT 
			privileges.id,
			privileges.menuId,
			privileges.ongletId,
			privileges.groupeId,
			privileges.modeAccesId,
			privileges.estActif,
			privileges.creationDate,
			privileges.creationUserId,
			privileges.modifDate,
			privileges.modifUserId
		 FROM privileges
		 WHERE privileges.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privileges_update` (`id` INT, `menuId` INT(11), `ongletId` INT(11), `groupeId` INT(11), `modeAccesId` INT(11), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE privileges
		 SET 
			menuId = menuId, 
			ongletId = ongletId, 
			groupeId = groupeId, 
			modeAccesId = modeAccesId, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE privileges.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quartierdistricts_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE quartierdistricts 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE quartierdistricts.id = id 
	 AND quartierdistricts.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quartierdistricts_delete` (`id` INT)   BEGIN
	 DELETE FROM quartierdistricts 
	 WHERE quartierdistricts.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quartierdistricts_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE quartierdistricts 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE quartierdistricts.id = id 
	 AND quartierdistricts.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quartierdistricts_insert` (`communeId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `creationUserId` INT)   BEGIN
	 INSERT INTO quartierdistricts( 
		 id, 
		 communeId,
		 libelle,
		 code,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 communeId,
			 libelle,
			 code,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quartierdistricts_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			quartierdistricts.id,
			quartierdistricts.communeId,
			quartierdistricts.libelle,
			quartierdistricts.code,
			quartierdistricts.estActif,
			quartierdistricts.creationDate,
			quartierdistricts.creationUserId,
			quartierdistricts.modifDate,
			quartierdistricts.modifUserId
		 FROM quartierdistricts';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE quartierdistricts.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quartierdistricts_selectBy` (`id` INT(11), `communeId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			quartierdistricts.id,
			quartierdistricts.communeId,
			quartierdistricts.libelle,
			quartierdistricts.code,
			quartierdistricts.estActif,
			quartierdistricts.creationDate,
			quartierdistricts.creationUserId,
			quartierdistricts.modifDate,
			quartierdistricts.modifUserId
		 FROM quartierdistricts
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND quartierdistricts.id = ' ,id); 
	 END IF; 
	 IF communeId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND quartierdistricts.communeId = ' ,communeId); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND quartierdistricts.libelle = "',libelle,'"');
	 END IF; 
	 IF code IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND quartierdistricts.code = "',code,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND quartierdistricts.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND quartierdistricts.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND quartierdistricts.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND quartierdistricts.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND quartierdistricts.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quartierdistricts_selectById` (`id` INT)   BEGIN
		 SELECT 
			quartierdistricts.id,
			quartierdistricts.communeId,
			quartierdistricts.libelle,
			quartierdistricts.code,
			quartierdistricts.estActif,
			quartierdistricts.creationDate,
			quartierdistricts.creationUserId,
			quartierdistricts.modifDate,
			quartierdistricts.modifUserId
		 FROM quartierdistricts
		 WHERE quartierdistricts.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quartierdistricts_update` (`id` INT, `communeId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE quartierdistricts
		 SET 
			communeId = communeId, 
			libelle = libelle, 
			code = code, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE quartierdistricts.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `regions_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE regions 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE regions.id = id 
	 AND regions.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `regions_delete` (`id` INT)   BEGIN
	 DELETE FROM regions 
	 WHERE regions.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `regions_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE regions 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE regions.id = id 
	 AND regions.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `regions_insert` (`paysId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `creationUserId` INT)   BEGIN
	 INSERT INTO regions( 
		 id, 
		 paysId,
		 libelle,
		 code,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 paysId,
			 libelle,
			 code,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `regions_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			regions.id,
			regions.paysId,
			regions.libelle,
			regions.code,
			regions.estActif,
			regions.creationDate,
			regions.creationUserId,
			regions.modifDate,
			regions.modifUserId
		 FROM regions';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE regions.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `regions_selectBy` (`id` INT(11), `paysId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			regions.id,
			regions.paysId,
			regions.libelle,
			regions.code,
			regions.estActif,
			regions.creationDate,
			regions.creationUserId,
			regions.modifDate,
			regions.modifUserId
		 FROM regions
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND regions.id = ' ,id); 
	 END IF; 
	 IF paysId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND regions.paysId = ' ,paysId); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND regions.libelle = "',libelle,'"');
	 END IF; 
	 IF code IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND regions.code = "',code,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND regions.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND regions.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND regions.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND regions.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND regions.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `regions_selectById` (`id` INT)   BEGIN
		 SELECT 
			regions.id,
			regions.paysId,
			regions.libelle,
			regions.code,
			regions.estActif,
			regions.creationDate,
			regions.creationUserId,
			regions.modifDate,
			regions.modifUserId
		 FROM regions
		 WHERE regions.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `regions_update` (`id` INT, `paysId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE regions
		 SET 
			paysId = paysId, 
			libelle = libelle, 
			code = code, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE regions.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `secteurs_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE secteurs 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE secteurs.id = id 
	 AND secteurs.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `secteurs_delete` (`id` INT)   BEGIN
	 DELETE FROM secteurs 
	 WHERE secteurs.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `secteurs_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE secteurs 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE secteurs.id = id 
	 AND secteurs.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `secteurs_insert` (`quartierDistrictId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `creationUserId` INT)   BEGIN
	 INSERT INTO secteurs( 
		 id, 
		 quartierDistrictId,
		 libelle,
		 code,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 quartierDistrictId,
			 libelle,
			 code,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `secteurs_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			secteurs.id,
			secteurs.quartierDistrictId,
			secteurs.libelle,
			secteurs.code,
			secteurs.estActif,
			secteurs.creationDate,
			secteurs.creationUserId,
			secteurs.modifDate,
			secteurs.modifUserId
		 FROM secteurs';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE secteurs.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `secteurs_selectBy` (`id` INT(11), `quartierDistrictId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			secteurs.id,
			secteurs.quartierDistrictId,
			secteurs.libelle,
			secteurs.code,
			secteurs.estActif,
			secteurs.creationDate,
			secteurs.creationUserId,
			secteurs.modifDate,
			secteurs.modifUserId
		 FROM secteurs
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND secteurs.id = ' ,id); 
	 END IF; 
	 IF quartierDistrictId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND secteurs.quartierDistrictId = ' ,quartierDistrictId); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND secteurs.libelle = "',libelle,'"');
	 END IF; 
	 IF code IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND secteurs.code = "',code,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND secteurs.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND secteurs.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND secteurs.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND secteurs.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND secteurs.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `secteurs_selectById` (`id` INT)   BEGIN
		 SELECT 
			secteurs.id,
			secteurs.quartierDistrictId,
			secteurs.libelle,
			secteurs.code,
			secteurs.estActif,
			secteurs.creationDate,
			secteurs.creationUserId,
			secteurs.modifDate,
			secteurs.modifUserId
		 FROM secteurs
		 WHERE secteurs.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `secteurs_update` (`id` INT, `quartierDistrictId` INT(11), `libelle` VARCHAR(50), `code` VARCHAR(5), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE secteurs
		 SET 
			quartierDistrictId = quartierDistrictId, 
			libelle = libelle, 
			code = code, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE secteurs.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smsenvoyes_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE smsenvoyes 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE smsenvoyes.id = id 
	 AND smsenvoyes.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smsenvoyes_delete` (`id` INT)   BEGIN
	 DELETE FROM smsenvoyes 
	 WHERE smsenvoyes.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smsenvoyes_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE smsenvoyes 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE smsenvoyes.id = id 
	 AND smsenvoyes.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smsenvoyes_insert` (`objet` VARCHAR(100), `description` TINYINT(4), `destinataire` VARCHAR(45), `creationUserId` INT)   BEGIN
	 INSERT INTO smsenvoyes( 
		 id, 
		 objet,
		 description,
		 destinataire,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 objet,
			 description,
			 destinataire,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smsenvoyes_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			smsenvoyes.id,
			smsenvoyes.objet,
			smsenvoyes.description,
			smsenvoyes.destinataire,
			smsenvoyes.message,
			smsenvoyes.creationDate,
			smsenvoyes.creationUserId,
			smsenvoyes.modifDate,
			smsenvoyes.modifUserId
		 FROM smsenvoyes';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE smsenvoyes.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smsenvoyes_selectBy` (`id` INT(11), `objet` VARCHAR(100), `description` TINYINT(4), `destinataire` VARCHAR(45), `message` TEXT, `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			smsenvoyes.id,
			smsenvoyes.objet,
			smsenvoyes.description,
			smsenvoyes.destinataire,
			smsenvoyes.message,
			smsenvoyes.creationDate,
			smsenvoyes.creationUserId,
			smsenvoyes.modifDate,
			smsenvoyes.modifUserId
		 FROM smsenvoyes
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND smsenvoyes.id = ' ,id); 
	 END IF; 
	 IF objet IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND smsenvoyes.objet = "',objet,'"');
	 END IF; 
	 IF description IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND smsenvoyes.description = "',description,'"');
	 END IF; 
	 IF destinataire IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND smsenvoyes.destinataire = "',destinataire,'"');
	 END IF; 
	 IF message IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND smsenvoyes.message = "',message,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND smsenvoyes.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND smsenvoyes.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND smsenvoyes.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND smsenvoyes.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smsenvoyes_selectById` (`id` INT)   BEGIN
		 SELECT 
			smsenvoyes.id,
			smsenvoyes.objet,
			smsenvoyes.description,
			smsenvoyes.destinataire,
			smsenvoyes.message,
			smsenvoyes.creationDate,
			smsenvoyes.creationUserId,
			smsenvoyes.modifDate,
			smsenvoyes.modifUserId
		 FROM smsenvoyes
		 WHERE smsenvoyes.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smsenvoyes_update` (`id` INT, `objet` VARCHAR(100), `description` TINYINT(4), `destinataire` VARCHAR(45), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE smsenvoyes
		 SET 
			objet = objet, 
			description = description, 
			destinataire = destinataire, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE smsenvoyes.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `storysales_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE storysales 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE storysales.id = id 
	 AND storysales.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `storysales_delete` (`id` INT)   BEGIN
	 DELETE FROM storysales 
	 WHERE storysales.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `storysales_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE storysales 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE storysales.id = id 
	 AND storysales.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `storysales_insert` (`eleveId` INT(11), `trancheId` INT(11), `prestationId` INT(11), `typePayements` VARCHAR(45), `mois` VARCHAR(45), `prix` DOUBLE, `datePayement` VARCHAR(45), `creationUserId` INT)   BEGIN
	 INSERT INTO storysales( 
		 id, 
		 eleveId,
		 trancheId,
		 prestationId,
		 typePayements,
		 mois,
		 prix,
		 datePayement,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 eleveId,
			 trancheId,
			 prestationId,
			 typePayements,
			 mois,
			 prix,
			 CURRENT_TIMESTAMP,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `storysales_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			storysales.id,
			storysales.eleveId,
			storysales.trancheId,
			storysales.prestationId,
			storysales.typePayements,
			storysales.mois,
			storysales.prix,
			storysales.datePayement,
			storysales.estActif,
			storysales.creationDate,
			storysales.creationUserId,
			storysales.modifDate,
			storysales.modifUserId
		 FROM storysales';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE storysales.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `storysales_selectBy` (`id` INT(11), `eleveId` INT(11), `trancheId` INT(11), `prestationId` INT(11), `typePayements` VARCHAR(45), `mois` VARCHAR(45), `prix` DOUBLE, `datePayement` VARCHAR(45), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			storysales.id,
			storysales.eleveId,
			storysales.trancheId,
			storysales.prestationId,
			storysales.typePayements,
			storysales.mois,
			storysales.prix,
			storysales.datePayement,
			storysales.estActif,
			storysales.creationDate,
			storysales.creationUserId,
			storysales.modifDate,
			storysales.modifUserId
		 FROM storysales
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.id = ' ,id); 
	 END IF; 
	 IF eleveId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.eleveId = ' ,eleveId); 
	 END IF; 
	 IF trancheId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.trancheId = ' ,trancheId); 
	 END IF; 
	 IF prestationId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.prestationId = ' ,prestationId); 
	 END IF; 
	 IF typePayements IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.typePayements = "',typePayements,'"');
	 END IF; 
	 IF mois IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.mois = "',mois,'"');
	 END IF; 
	 IF prix IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.prix = "',prix,'"');
	 END IF; 
	 IF datePayement IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.datePayement = "',datePayement,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND storysales.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `storysales_selectById` (`id` INT)   BEGIN
		 SELECT 
			storysales.id,
			storysales.eleveId,
			storysales.trancheId,
			storysales.prestationId,
			storysales.typePayements,
			storysales.mois,
			storysales.prix,
			storysales.datePayement,
			storysales.estActif,
			storysales.creationDate,
			storysales.creationUserId,
			storysales.modifDate,
			storysales.modifUserId
		 FROM storysales
		 WHERE storysales.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `storysales_update` (`id` INT, `eleveId` INT(11), `trancheId` INT(11), `prestationId` INT(11), `typePayements` VARCHAR(45), `mois` VARCHAR(45), `prix` DOUBLE, `datePayement` VARCHAR(45), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE storysales
		 SET 
			eleveId = eleveId, 
			trancheId = trancheId, 
			prestationId = prestationId, 
			typePayements = typePayements, 
			mois = mois, 
			prix = prix, 
			datePayement = datePayement, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE storysales.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tranches_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE tranches 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE tranches.id = id 
	 AND tranches.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tranches_delete` (`id` INT)   BEGIN
	 DELETE FROM tranches 
	 WHERE tranches.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tranches_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE tranches 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE tranches.id = id 
	 AND tranches.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tranches_insert` (`ecoleId` INT(11), `prestationId` INT(11), `libelle` VARCHAR(45), `pourcentage` INT(11), `creationUserId` INT)   BEGIN
	 INSERT INTO tranches( 
		 id, 
		 ecoleId,
		 prestationId,
		 libelle,
		 pourcentage,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 ecoleId,
			 prestationId,
			 libelle,
			 pourcentage,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tranches_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			tranches.id,
			tranches.ecoleId,
			tranches.prestationId,
			tranches.libelle,
			tranches.pourcentage,
			tranches.estActif,
			tranches.creationDate,
			tranches.creationUserId,
			tranches.modifDate,
			tranches.modifUserId
		 FROM tranches';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE tranches.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tranches_selectBy` (`id` INT(11), `ecoleId` INT(11), `prestationId` INT(11), `libelle` VARCHAR(45), `pourcentage` INT(11), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			tranches.id,
			tranches.ecoleId,
			tranches.prestationId,
		    `prestations`.`libelle` as prestation,
			tranches.libelle,
			tranches.pourcentage,
			tranches.estActif,
			tranches.creationDate,
			tranches.creationUserId,
			tranches.modifDate,
			tranches.modifUserId
		 FROM tranches
         INNER JOIN `prestations` ON tranches.prestationId=`prestations`.`id`
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND tranches.id = ' ,id); 
	 END IF; 
	 IF ecoleId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND tranches.ecoleId = ' ,ecoleId); 
	 END IF; 
	 IF prestationId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND tranches.prestationId = ' ,prestationId); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND tranches.libelle = "',libelle,'"');
	 END IF; 
	 IF pourcentage IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND tranches.pourcentage = ' ,pourcentage); 
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND tranches.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND tranches.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND tranches.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND tranches.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND tranches.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tranches_selectById` (`id` INT)   BEGIN
		 SELECT 
			tranches.id,
			tranches.ecoleId,
			tranches.prestationId,
			tranches.libelle,
			tranches.pourcentage,
			tranches.estActif,
			tranches.creationDate,
			tranches.creationUserId,
			tranches.modifDate,
			tranches.modifUserId
		 FROM tranches
		 WHERE tranches.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tranches_update` (`id` INT, `ecoleId` INT(11), `prestationId` INT(11), `libelle` VARCHAR(45), `pourcentage` INT(11), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE tranches
		 SET 
			ecoleId = ecoleId, 
			prestationId = prestationId, 
			libelle = libelle, 
			pourcentage = pourcentage, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE tranches.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `unites_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE unites 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE unites.id = id 
	 AND unites.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `unites_delete` (`id` INT)   BEGIN
	 DELETE FROM unites 
	 WHERE unites.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `unites_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE unites 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE unites.id = id 
	 AND unites.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `unites_insert` (`libelle` VARCHAR(45), `symbole` VARCHAR(5), `creationUserId` INT)   BEGIN
	 INSERT INTO unites( 
		 id, 
		 libelle,
		 symbole,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 libelle,
			 symbole,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `unites_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			unites.id,
			unites.libelle,
			unites.symbole,
			unites.estActif,
			unites.creationDate,
			unites.creationUserId,
			unites.modifDate,
			unites.modifUserId
		 FROM unites';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE unites.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `unites_selectBy` (`id` INT(11), `libelle` VARCHAR(45), `symbole` VARCHAR(5), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			unites.id,
			unites.libelle,
			unites.symbole,
			unites.estActif,
			unites.creationDate,
			unites.creationUserId,
			unites.modifDate,
			unites.modifUserId
		 FROM unites
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND unites.id = ' ,id); 
	 END IF; 
	 IF libelle IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND unites.libelle = "',libelle,'"');
	 END IF; 
	 IF symbole IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND unites.symbole = "',symbole,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND unites.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND unites.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND unites.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND unites.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND unites.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `unites_selectById` (`id` INT)   BEGIN
		 SELECT 
			unites.id,
			unites.libelle,
			unites.symbole,
			unites.estActif,
			unites.creationDate,
			unites.creationUserId,
			unites.modifDate,
			unites.modifUserId
		 FROM unites
		 WHERE unites.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `unites_update` (`id` INT, `libelle` VARCHAR(45), `symbole` VARCHAR(5), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE unites
		 SET 
			libelle = libelle, 
			symbole = symbole, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE unites.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userconnexions_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE userconnexions 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE userconnexions.id = id 
	 AND userconnexions.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userconnexions_delete` (`id` INT)   BEGIN
	 DELETE FROM userconnexions 
	 WHERE userconnexions.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userconnexions_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE userconnexions 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE userconnexions.id = id 
	 AND userconnexions.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userconnexions_insert` (`userId` INT(11), `adressIp` VARCHAR(20), `fin` DATETIME, `creationUserId` INT)   BEGIN
	 INSERT INTO userconnexions( 
		 id, 
		 userId,
		 adressIp,
		 fin,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 userId,
			 adressIp,
			 fin,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userconnexions_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			userconnexions.id,
			userconnexions.userId,
			userconnexions.adressIp,
			userconnexions.fin,
			userconnexions.estActif,
			userconnexions.creationDate,
			userconnexions.creationUserId,
			userconnexions.modifDate,
			userconnexions.modifUserId
		 FROM userconnexions';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE userconnexions.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userconnexions_selectBy` (`id` INT(11), `userId` INT(11), `adressIp` VARCHAR(20), `fin` DATETIME, `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			userconnexions.id,
			userconnexions.userId,
			userconnexions.adressIp,
			userconnexions.fin,
			userconnexions.estActif,
			userconnexions.creationDate,
			userconnexions.creationUserId,
			userconnexions.modifDate,
			userconnexions.modifUserId
		 FROM userconnexions
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userconnexions.id = ' ,id); 
	 END IF; 
	 IF userId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userconnexions.userId = ' ,userId); 
	 END IF; 
	 IF adressIp IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userconnexions.adressIp = "',adressIp,'"');
	 END IF; 
	 IF fin IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userconnexions.fin = "',fin,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userconnexions.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userconnexions.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userconnexions.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userconnexions.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userconnexions.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userconnexions_selectById` (`id` INT)   BEGIN
		 SELECT 
			userconnexions.id,
			userconnexions.userId,
			userconnexions.adressIp,
			userconnexions.fin,
			userconnexions.estActif,
			userconnexions.creationDate,
			userconnexions.creationUserId,
			userconnexions.modifDate,
			userconnexions.modifUserId
		 FROM userconnexions
		 WHERE userconnexions.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userconnexions_update` (`id` INT, `userId` INT(11), `adressIp` VARCHAR(20), `fin` DATETIME, `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE userconnexions
		 SET 
			userId = userId, 
			adressIp = adressIp, 
			fin = fin, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE userconnexions.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usergroupes_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE usergroupes 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE usergroupes.id = id 
	 AND usergroupes.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usergroupes_delete` (`id` INT)   BEGIN
	 DELETE FROM usergroupes 
	 WHERE usergroupes.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usergroupes_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE usergroupes 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE usergroupes.id = id 
	 AND usergroupes.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usergroupes_insert` (`userId` INT(11), `groupeId` INT(11), `creationUserId` INT)   BEGIN
	 INSERT INTO usergroupes( 
		 id, 
		 userId,
		 groupeId,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 userId,
			 groupeId,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usergroupes_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			usergroupes.id,
			usergroupes.userId,
			usergroupes.groupeId,
			usergroupes.estActif,
			usergroupes.creationDate,
			usergroupes.creationUserId,
			usergroupes.modifDate,
			usergroupes.modifUserId
		 FROM usergroupes';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE usergroupes.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usergroupes_selectBy` (`id` INT(11), `userId` INT(11), `groupeId` INT(11), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			usergroupes.id,
			usergroupes.userId,
			usergroupes.groupeId,
			usergroupes.estActif,
			usergroupes.creationDate,
			usergroupes.creationUserId,
			usergroupes.modifDate,
			usergroupes.modifUserId
		 FROM usergroupes
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND usergroupes.id = ' ,id); 
	 END IF; 
	 IF userId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND usergroupes.userId = ' ,userId); 
	 END IF; 
	 IF groupeId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND usergroupes.groupeId = ' ,groupeId); 
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND usergroupes.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND usergroupes.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND usergroupes.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND usergroupes.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND usergroupes.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usergroupes_selectById` (`id` INT)   BEGIN
		 SELECT 
			usergroupes.id,
			usergroupes.userId,
			usergroupes.groupeId,
			usergroupes.estActif,
			usergroupes.creationDate,
			usergroupes.creationUserId,
			usergroupes.modifDate,
			usergroupes.modifUserId
		 FROM usergroupes
		 WHERE usergroupes.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usergroupes_update` (`id` INT, `userId` INT(11), `groupeId` INT(11), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE usergroupes
		 SET 
			userId = userId, 
			groupeId = groupeId, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE usergroupes.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userpasswords_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE userpasswords 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE userpasswords.id = id 
	 AND userpasswords.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userpasswords_delete` (`id` INT)   BEGIN
	 DELETE FROM userpasswords 
	 WHERE userpasswords.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userpasswords_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE userpasswords 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE userpasswords.id = id 
	 AND userpasswords.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userpasswords_insert` (`userId` INT(11), `type` ENUM('Auto','Perso'), `creationUserId` INT)   BEGIN
	 INSERT INTO userpasswords( 
		 id, 
		 userId,
		 type,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 userId,
			 type,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userpasswords_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			userpasswords.id,
			userpasswords.userId,
			userpasswords.type,
			userpasswords.estActif,
			userpasswords.creationDate,
			userpasswords.creationUserId,
			userpasswords.modifDate,
			userpasswords.modifUserId
		 FROM userpasswords';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE userpasswords.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userpasswords_selectBy` (`id` INT(11), `userId` INT(11), `type` ENUM('Auto','Perso'), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			userpasswords.id,
			userpasswords.userId,
			userpasswords.type,
			userpasswords.estActif,
			userpasswords.creationDate,
			userpasswords.creationUserId,
			userpasswords.modifDate,
			userpasswords.modifUserId
		 FROM userpasswords
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userpasswords.id = ' ,id); 
	 END IF; 
	 IF userId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userpasswords.userId = ' ,userId); 
	 END IF; 
	 IF type IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userpasswords.type = "',type,'"');
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userpasswords.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userpasswords.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userpasswords.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userpasswords.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND userpasswords.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userpasswords_selectById` (`id` INT)   BEGIN
		 SELECT 
			userpasswords.id,
			userpasswords.userId,
			userpasswords.type,
			userpasswords.estActif,
			userpasswords.creationDate,
			userpasswords.creationUserId,
			userpasswords.modifDate,
			userpasswords.modifUserId
		 FROM userpasswords
		 WHERE userpasswords.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userpasswords_update` (`id` INT, `userId` INT(11), `type` ENUM('Auto','Perso'), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE userpasswords
		 SET 
			userId = userId, 
			type = type, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE userpasswords.id = id
		 AND modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_activate` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE users 
	 SET 
	 estActif= 1 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE users.id = id 
	 AND users.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_delete` (`id` INT)   BEGIN
	 DELETE FROM users 
	 WHERE users.id = id; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_disable` (`id` INT, `modifUserId` INT, `modifDate` DATETIME)   BEGIN 
	 UPDATE users 
	 SET 
	 estActif= 0 , 
	 modifDate= CURRENT_TIMESTAMP, 
	 modifUserId= modifUserId 
	 WHERE users.id = id 
	 AND users.modifDate = modifDate; 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_getAffecteByGroupe` (`groupeId` INT)   BEGIN

	SELECT `users`.`id`,
			`users`.`name`,
			`users`.`prenoms`,
			`users`.`telephone`
	FROM `users`
	WHERE `users`.`estActif`=1
	AND  `users`.`id`  IN (
	SELECT 
		`usergroupes`.`userId`
			FROM `usergroupes`
			INNER JOIN `users` ON `usergroupes`.`userId`=`users`.`id`
			INNER JOIN `groupes` ON `usergroupes`.`groupeId`=`groupes`.`id`
			WHERE `usergroupes`.`groupeId`=groupeId
			AND `usergroupes`.`estActif`=1
			AND `users`.`estActif`=1
			AND `groupes`.`estActif`=1
	)
	ORDER BY `users`.`prenoms`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_getEnseignantByEcoleId` (`ecoleId` INT)   BEGIN
     Select
			users.id,
			users.ecoleId,
			users.name,
			users.prenoms,
			users.fonction,
			users.telephone,
			users.password,
			users.adresse            
            FROM users			
            
            Where users.id IN ( 
				select
					`usergroupes`.`userId`
				from usergroupes
				INNER JOIN `groupes` ON `usergroupes`.`groupeId` = `groupes`.`id`
                where groupes.libelle = 'Enseignant'
                ) and users.ecoleId = ecoleId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_getEnseignantNotAffectedToClasses` (`ecoleId` INT)   BEGIN
	SELECT 
			users.id,
			users.ecoleId,
			users.name,
			users.prenoms,
			users.fonction,
			users.telephone,
			users.password,
            `quartierdistricts`.`id` as quartierId,
            `communes`.`id` as communeId,
            `prefectures`.`id` as prefectureId,
            `regions`.`id` as regionId,
            `payss`.`id` as paysId,
			users.adresse
		 FROM users
         INNER JOIN `quartierdistricts` ON users.adresse = `quartierdistricts`.`id`
         INNER JOIN `communes` ON `quartierdistricts`.`communeId` = `communes`.`id`
		 INNER JOIN `prefectures` ON `communes`.`prefectureId` = `prefectures`.`id`
		 INNER JOIN `regions` ON `prefectures`.`regionId` = `regions`.`id`
         INNER JOIN `payss` ON `regions`.`paysId` = `payss`.`id`
         where users.id NOT IN (
			select 
				classses.enseignantId
			from classses
            where classses.ecoleId = ecoleId AND classses.estActif = 1) 
            AND users.ecoleId= ecoleId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_getNonAffecteByGroupe` (`groupeId` INT)   BEGIN
	SELECT `users`.`id`,
			`users`.`name`,
			`users`.`prenoms`,
			`users`.`telephone`
	FROM `users`
	WHERE `users`.`estActif`=1
	AND  `users`.`id` NOT IN (
	SELECT 
		`usergroupes`.`userId`
			FROM `usergroupes`
			INNER JOIN `users` ON `usergroupes`.`userId`=`users`.`id`
			INNER JOIN `groupes` ON `usergroupes`.`groupeId`=`groupes`.`id`
			WHERE `usergroupes`.`groupeId`=groupeId
			AND `usergroupes`.`estActif`=1
			AND `users`.`estActif`=1
			AND `groupes`.`estActif`=1
	)
	ORDER BY `users`.`prenoms`;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_insert` (`ecoleId` INT(11), `name` VARCHAR(150), `prenoms` VARCHAR(150), `fonction` VARCHAR(45), `telephone` VARCHAR(16), `password` VARCHAR(255), `adresse` INT(11), `creationUserId` INT)   BEGIN
	 INSERT INTO users( 
		 id, 
		 ecoleId,
		 name,
		 prenoms,
		 fonction,
		 telephone,
		 password,
		 adresse,
		 creationDate, 
		 creationUserId, 
		 modifDate, 
		 modifUserId) 
		 VALUES 
		   ( 
			 null, 
			 ecoleId,
			 name,
			 prenoms,
			 fonction,
			 telephone,
			 password,
			 adresse,
			 CURRENT_TIMESTAMP, 
			 creationUserId, 
			 CURRENT_TIMESTAMP, 
			 creationUserId 
			 ); 
             select last_insert_id() as lastUserId;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_selectAll` (`estActif` TINYINT, `debut` INT, `fin` INT)   BEGIN 
	 DECLARE requeteSql varchar(500); 
	 Set @requeteSql := 'SELECT 
			users.id,
			users.ecoleId,
			users.name,
			users.prenoms,
			users.fonction,
			users.telephone,
			users.password,
			users.adresse,
			users.estActif,
			users.creationDate,
			users.creationUserId,
			users.modifDate,
			users.modifUserId
		 FROM users';
 	 SET @requeteSql := CONCAT(@requeteSql,' WHERE users.estActif = ', estActif); 
	 IF debut IS NOT NULL THEN 
	 SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ',debut, ', ',fin); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_selectBy` (`id` INT(11), `ecoleId` INT(11), `name` VARCHAR(150), `prenoms` VARCHAR(150), `fonction` VARCHAR(45), `telephone` VARCHAR(16), `password` VARCHAR(255), `adresse` INT(11), `estActif` TINYINT(4), `creationDate` DATETIME, `creationUserId` INT(11), `modifDate` DATETIME, `modifUserId` INT(11))   BEGIN
 DECLARE requeteSql varchar(500); 
	 SET @requeteSql :=   
		 'SELECT
			users.id,
			users.ecoleId,
			users.name,
			users.prenoms,
			users.fonction,
			users.telephone,
			users.password,
			users.adresse,
			users.estActif,
			users.creationDate,
			users.creationUserId,
			users.modifDate,
			users.modifUserId
		 FROM users
		WHERE 1';
	 IF id IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.id = ' ,id); 
	 END IF; 
	 IF ecoleId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.ecoleId = ' ,ecoleId); 
	 END IF; 
	 IF name IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.name = "',name,'"');
	 END IF; 
	 IF prenoms IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.prenoms = "',prenoms,'"');
	 END IF; 
	 IF fonction IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.fonction = "',fonction,'"');
	 END IF; 
	 IF telephone IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.telephone = "',telephone,'"');
	 END IF; 
	 IF password IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.password = "',password,'"');
	 END IF; 
	 IF adresse IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.adresse = ' ,adresse); 
	 END IF; 
	 IF estActif IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.estActif = "',estActif,'"');
	 END IF; 
	 IF creationDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.creationDate = "',creationDate,'"');
	 END IF; 
	 IF creationUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.creationUserId = ' ,creationUserId); 
	 END IF; 
	 IF modifDate IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.modifDate = "',modifDate,'"');
	 END IF; 
	 IF modifUserId IS NOT NULL THEN 
		 SET @requeteSql := CONCAT(@requeteSql, ' AND users.modifUserId = ' ,modifUserId); 
	 END IF; 
	 PREPARE statement FROM @requeteSql;
	 EXECUTE statement;
	 DEALLOCATE PREPARE statement;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_selectById` (`id` INT)   BEGIN
		 SELECT 
			users.id,
			users.ecoleId,
			users.name,
			users.prenoms,
			users.fonction,
			users.telephone,
			users.password,
            `quartierdistricts`.`id` as quartierId,
            `communes`.`id` as communeId,
            `prefectures`.`id` as prefectureId,
            `regions`.`id` as regionId,
            `payss`.`id` as paysId,
			users.adresse,
			users.estActif,
			users.creationDate,
			users.creationUserId,
			users.modifDate,
			users.modifUserId
		 FROM users
         INNER JOIN `quartierdistricts` ON users.adresse = `quartierdistricts`.`id`
         INNER JOIN `communes` ON `quartierdistricts`.`communeId` = `communes`.`id`
		 INNER JOIN `prefectures` ON `communes`.`prefectureId` = `prefectures`.`id`
		 INNER JOIN `regions` ON `prefectures`.`regionId` = `regions`.`id`
         INNER JOIN `payss` ON `regions`.`paysId` = `payss`.`id`

		 WHERE users.id= id ;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_update` (`id` INT, `ecoleId` INT(11), `name` VARCHAR(150), `prenoms` VARCHAR(150), `fonction` VARCHAR(45), `telephone` VARCHAR(16), `password` VARCHAR(255), `adresse` INT(11), `modifDate` DATETIME, `modifUserId` INT)   BEGIN
	 UPDATE users
		 SET 
			ecoleId = ecoleId, 
			name = name, 
			prenoms = prenoms, 
			fonction = fonction, 
			telephone = telephone, 
			password = password, 
			adresse = adresse, 
			 modifDate= CURRENT_TIMESTAMP, 
			 modifUserId= modifUserId 
		 WHERE users.id = id
		 AND modifDate = modifDate; 
 END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `logo` varchar(45) DEFAULT NULL,
  `proprietaire` varchar(45) DEFAULT NULL,
  `emplacementLog` varchar(100) DEFAULT NULL,
  `repInstallation` varchar(100) DEFAULT NULL,
  `urlRacine` varchar(100) DEFAULT NULL,
  `emailAdmin` varchar(35) DEFAULT NULL,
  `couleur1Id` int(11) DEFAULT NULL,
  `couleur2Id` int(11) DEFAULT NULL,
  `version` varchar(5) NOT NULL,
  `observations` mediumtext DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `classses`
--

CREATE TABLE `classses` (
  `id` int(11) NOT NULL,
  `ecoleId` int(11) NOT NULL,
  `enseignantId` int(11) NOT NULL,
  `niveau` int(11) NOT NULL,
  `etape` varchar(245) NOT NULL,
  `libelle` varchar(150) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `classses`
--

INSERT INTO `classses` (`id`, `ecoleId`, `enseignantId`, `niveau`, `etape`, `libelle`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 2, 7, 1, 'primaire', '1ere année', 1, '2023-10-17 00:09:47', 1, '2023-10-17 00:09:47', 1),
(2, 2, 5, 2, 'primaire', '2eme année', 1, '2023-10-17 00:11:53', 1, '2023-10-17 00:11:53', 1),
(3, 2, 5, 3, 'primaire', '3eme Année', 1, '2023-10-17 00:11:53', 1, '2023-10-17 00:11:53', 1),
(4, 2, 7, 4, 'primaire', '4eme Année', 1, '2023-10-17 00:13:11', 1, '2023-10-17 00:13:11', 1),
(5, 2, 7, 5, 'primaire', '5eme Année', 1, '2023-10-17 00:13:11', 1, '2023-10-17 00:13:11', 1),
(6, 2, 7, 6, 'primaire', '6eme Année', 1, '2023-10-17 00:16:30', 1, '2023-10-17 00:16:30', 1),
(7, 1, 9, 1, 'primaire', '1ere année', 1, '2023-10-18 22:38:04', 5, '2023-10-19 20:25:10', 5),
(8, 1, 10, 2, 'primaire', '2eme Anné', 1, '2023-10-18 23:19:22', 5, '2023-10-19 20:25:49', 5),
(9, 1, 11, 3, 'primaire', '3eme Année', 0, '2023-10-19 19:52:23', 5, '2023-10-19 19:52:29', 5);

-- --------------------------------------------------------

--
-- Structure de la table `communes`
--

CREATE TABLE `communes` (
  `id` int(11) NOT NULL,
  `prefectureId` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `code` varchar(5) DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `communes`
--

INSERT INTO `communes` (`id`, `prefectureId`, `libelle`, `code`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 6, 'N\'ZÉRÉKORÉ', NULL, 1, '0000-00-00 00:00:00', 0, '2020-08-14 12:26:02', 1),
(2, 6, 'Bounouma', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(3, 6, 'Gouecké', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-25 17:19:42', 1),
(4, 6, 'Kobela', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(6, 6, 'Koulé', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-25 17:19:54', 1),
(7, 6, 'Palé', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-25 17:20:32', 1),
(8, 6, 'Samoé', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-25 17:20:47', 1),
(9, 6, 'Soulouta', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(10, 6, 'Womey', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-18 11:58:58', 13),
(11, 6, 'Yalenzou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(12, 34, 'Yomou centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:42:18', 18),
(13, 34, 'Banié', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-25 18:41:02', 1),
(14, 34, 'Behta', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(15, 34, 'Bignamou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(16, 34, 'Bowé', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-25 18:41:14', 1),
(17, 34, 'Diecké', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-25 18:41:27', 1),
(18, 34, 'Pela', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(19, 27, 'Lola centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:41:09', 15),
(20, 27, 'Bossou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(21, 27, 'Foumbadou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(22, 27, 'Gama berema', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-18 09:50:14', 12),
(23, 27, 'Gueasso', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(24, 27, 'Kokota', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(25, 27, 'Laine', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(26, 27, 'N\'zoo', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(27, 27, 'Tounkarata', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(28, 20, 'Beyla centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:40:29', 15),
(29, 20, 'Boola', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(30, 20, 'Diaraguerela', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(31, 20, 'Diassodou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(32, 20, 'Fouala', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(33, 20, 'Gbakedou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(34, 20, 'Gbessoba', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(35, 20, 'Karala', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(36, 20, 'Koumandou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(37, 20, 'Mousadou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(38, 20, 'Nionsomoridou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(39, 20, 'Samana', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(40, 20, 'Sinko', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(41, 20, 'Sokourala', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(42, 10, 'Guécké', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:42:06', 15),
(43, 10, 'Bolodou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(44, 10, 'Fangamadou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(45, 10, 'Guendembou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(46, 10, 'Kassadou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(47, 10, 'Koundou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(48, 10, 'Nongoa', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(49, 10, 'Ouende-kenema', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-18 12:52:25', 12),
(50, 10, 'Tekoulo', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(51, 10, 'Temmessadou', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-18 12:05:58', 12),
(52, 11, 'Macenta centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:41:04', 18),
(53, 11, 'Balizia', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(54, 11, 'Binikala', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(55, 11, 'Bofossou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(56, 11, 'Daro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(57, 11, 'Fassankoni', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-18 10:07:58', 13),
(58, 11, 'Kouankan', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(59, 11, 'Koyamah', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-25 16:07:16', 1),
(60, 11, 'N\'zebela', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(61, 11, 'Oremai', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(62, 11, 'Panziazou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(63, 11, 'Sengbedou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(64, 11, 'Seredou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(65, 11, 'Vasseredou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(66, 11, 'Watanka', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(67, 8, 'Commune urbaine', NULL, 1, '0000-00-00 00:00:00', 0, '2021-03-30 12:02:05', 1),
(68, 8, 'Dalein', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(69, 8, 'Daralabe', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(70, 8, 'Diari', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(71, 8, 'Dionfo', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(72, 8, 'Garambe', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(73, 8, 'Hafia', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(74, 8, 'Kalan', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(75, 8, 'Kouramangui', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(76, 8, 'Noussy', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(77, 8, 'Popodara', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(78, 8, 'Sannoun', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(79, 8, 'Tountouroun', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(80, 38, 'Koubia centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:36:22', 15),
(81, 38, 'Fafaya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(82, 38, 'Gadawoundou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(83, 38, 'Matakaou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(84, 38, 'Missira', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(85, 38, 'Pilimini', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(86, 32, 'Lelouma centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:32:31', 18),
(87, 32, 'Balaya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(88, 32, 'Diountou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(89, 32, 'Heriko', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(90, 32, 'Korbe', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(91, 32, 'Lafou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(92, 32, 'Linsan', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(93, 32, 'Manda saran', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(94, 32, 'Parawol', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(95, 32, 'Sagale', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(96, 32, 'Thiaguel-bory ', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(97, 21, 'Mali centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:34:06', 18),
(98, 21, 'Balaki', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(99, 21, 'Donguel sigon', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(100, 21, 'Dougountouny', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(101, 21, 'Fougou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(102, 21, 'Gayah', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(103, 21, 'Hydayatou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(104, 21, 'Lebekere', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(105, 21, 'Madina wora', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(106, 21, 'Madina salambande', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(107, 21, 'Telire', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(108, 21, 'Touba baga dadji', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-21 19:19:13', 2),
(109, 21, 'Yembering', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(110, 36, 'Tougué centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:34:44', 18),
(111, 36, 'Fatako', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(112, 36, 'Fello Koundoua', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-24 17:28:17', 13),
(113, 36, 'Kansagui', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(114, 36, 'Koin', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(115, 36, 'Kollagui', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(116, 36, 'Kollet', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(117, 36, 'Konah', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(118, 36, 'Kouratongo', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(119, 36, 'Tangaly', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(120, 7, 'Commune urbaine', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-22 22:05:40', 1),
(121, 7, 'Balandou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(122, 7, 'Baté nafadji', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-23 09:37:13', 1),
(123, 7, 'Boula', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(124, 7, 'Gberedou baranama', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(125, 7, 'Karifamoriah', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 10:51:38', 12),
(126, 7, 'Koumban', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(127, 7, 'Mamouroudou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(128, 7, 'Missamana', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(129, 7, 'Moribaya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(130, 7, 'Sabadou - baranama', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-16 17:27:52', 1),
(131, 7, 'Tintioulen', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(132, 7, 'Toukounou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(133, 4, 'Siguiri centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:31:34', 18),
(134, 4, 'Bankon', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(135, 4, 'Doko', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(136, 4, 'Franwalia', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(137, 4, 'Kiniebakoura', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(138, 4, 'Kintinian', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(139, 4, 'Maleah', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(140, 4, 'Naboun', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(141, 4, 'Niandankoro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(142, 4, 'Norassoba', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(143, 4, 'Nounkounkan', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(144, 4, 'Niagassola', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(145, 4, 'Siguirini', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(146, 23, 'Mandiana centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:31:53', 15),
(147, 23, 'Balandou-gouba', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 13:49:27', 12),
(148, 23, 'Dialakoro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(149, 23, 'Faralako', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(150, 23, 'Kantoumanina', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(151, 23, 'Kinieran', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(152, 23, 'Kondiana-koro', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 15:13:26', 12),
(153, 23, 'Koundian', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(154, 23, 'Morodou', NULL, 1, '0000-00-00 00:00:00', 0, '2015-06-16 13:49:40', 27),
(155, 23, 'Niantanina', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(156, 23, 'Saladou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(157, 23, 'Sansando', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(158, 18, 'Kérouané', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:29:35', 15),
(159, 18, 'Banankoro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(160, 18, 'Damaro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(161, 18, 'Komodou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(162, 18, 'Konsakoro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(163, 18, 'Linko', NULL, 1, '0000-00-00 00:00:00', 0, '2017-01-19 19:25:28', 1),
(164, 18, 'Sibiribaro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(165, 18, 'Soromaya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(167, 24, 'Kouroussa centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:30:21', 15),
(168, 24, 'Babila', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(169, 24, 'Balato', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(170, 24, 'Banfele', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(171, 24, 'Baro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(172, 24, 'Cissela', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(173, 24, 'Douako', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(174, 24, 'Doura', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(175, 24, 'Kiniero', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(176, 24, 'Komolakoura', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 11:53:38', 12),
(177, 24, 'Koumana', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(178, 24, 'Sanguiana', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(179, 12, 'Kissidougou centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:30:37', 18),
(180, 12, 'Albadaria', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(181, 12, 'Banama', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(182, 12, 'Bardou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(183, 12, 'Beindou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(184, 12, 'Fermesadou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(185, 12, 'Firawa', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(186, 12, 'Gbanbadou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(187, 12, 'Kondiadou', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-16 16:57:10', 1),
(188, 12, 'Manfran', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(189, 12, 'Sangardo', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(190, 12, 'Yendemilllimou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(191, 12, 'Yombiro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(192, 15, 'Faranah centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:28:22', 18),
(193, 15, 'Banian', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(194, 15, 'Beindou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(195, 15, 'Hermakono', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(196, 15, 'Kobikoro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(197, 15, 'Marela', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(198, 15, 'Nialia', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(199, 15, 'Passaya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(200, 15, 'Sandenia', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(201, 15, 'Songoyah', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(202, 15, 'Tiro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(203, 29, 'Dabola centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:21:53', 18),
(204, 29, 'Arfamoussaya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(205, 29, 'Banko', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(206, 29, 'Bissikirima', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(207, 29, 'Dogomet', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(208, 29, 'Kankama', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(209, 29, 'Kindoye', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(210, 29, 'Konindou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(211, 29, 'N\'dema', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(212, 31, 'Dinguiraye centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:24:59', 18),
(213, 31, 'Banora', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(214, 31, 'Dialakoro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(215, 31, 'Diatifere', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(216, 31, 'Gagnakaly', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(217, 31, 'Kalinko', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(218, 31, 'Lansanaya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(219, 31, 'Selouma', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(220, 1, 'Matoto centre', '', 1, '2020-07-03 20:43:35', 1, '2022-03-01 13:31:49', 9),
(221, 2, 'Ratoma centre', '', 1, '2020-07-03 20:43:35', 1, '2022-03-01 13:07:32', 9),
(222, 17, 'Dixinn centre', '', 1, '2020-07-02 00:00:00', 1, '2022-03-01 13:20:36', 9),
(223, 19, 'Matam centre', '', 1, '2020-07-02 00:00:00', 1, '2022-03-01 13:32:21', 9),
(224, 33, 'Kaloum centre', '', 1, '2020-07-02 00:00:00', 1, '2022-03-01 13:32:01', 9),
(225, 5, 'Boké centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:33:30', 15),
(235, 35, 'Fria centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-08-31 10:06:34', 2),
(239, 37, 'Koundara centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:20:31', 18),
(240, 37, 'Guingan', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(241, 37, 'Kamaby', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(242, 37, 'Sambailo', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(243, 37, 'Sareboido', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(244, 37, 'Termesse', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(245, 37, 'Youkounkoun', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(246, 28, 'Gaoual centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 12:58:07', 18),
(247, 28, 'Foulamory', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(248, 28, 'Kakony', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(249, 28, 'Koumbia', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(250, 28, 'Kounsitel', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(251, 28, 'Malanta', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(252, 28, 'Touba ', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(253, 28, 'Wendou borou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(254, 26, 'Boffa centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-08-31 10:03:25', 2),
(262, 3, 'Kindia centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:34:56', 15),
(263, 3, 'Bangouya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(264, 3, 'Damakania', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 16:26:45', 13),
(265, 3, 'Friguiagbe', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(266, 3, 'Kolente', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(267, 3, 'Madina oula', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(268, 3, 'Mambia', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(269, 3, 'Molota', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(270, 3, 'Samaya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(271, 3, 'Sougueta', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-18 20:16:42', 2),
(272, 22, 'Coyah centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:32:30', 15),
(273, 22, 'Kouriah', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(274, 22, 'Maneyah', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-16 12:34:24', 1),
(275, 22, 'Wonkifong', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(276, 16, 'Dubréka centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:33:09', 15),
(277, 16, 'Bady', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(278, 16, 'Falessade', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(279, 16, 'Khorira', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(280, 16, 'Ouassou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(281, 16, 'Tanéné', NULL, 1, '0000-00-00 00:00:00', 0, '2014-04-13 12:04:10', 2),
(282, 16, 'Tondon', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(283, 25, 'Forécariah', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:34:22', 15),
(284, 25, 'ALASSOYAH', NULL, 1, '0000-00-00 00:00:00', 0, '2020-08-14 12:26:48', 1),
(285, 25, 'Benty', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(286, 25, 'Farmoreah', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 14:50:55', 13),
(287, 25, 'Kaback', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(288, 25, 'Kakossa', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(289, 25, 'Kaliah', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(290, 25, 'Maferenyah', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 15:23:47', 13),
(291, 25, 'Moussayah', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-18 18:58:03', 2),
(292, 25, 'Sikhourou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(293, 13, 'Telemele centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:35:39', 15),
(294, 13, 'Brouwal ', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(295, 13, 'Daramagnaki ', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(296, 13, 'Gougoudje', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-16 16:31:54', 1),
(297, 13, 'Koba ', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(298, 13, 'Kollet ', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(299, 13, 'Konsotami', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(300, 13, 'Missira', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(301, 13, 'Santou', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(302, 13, 'Sarekaly', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(303, 13, 'Sinta', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(304, 13, 'Sogolon', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(305, 13, 'Tarihoye', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(306, 13, 'Thionthian', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 10:40:38', 13),
(307, 30, 'Dabola centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:37:05', 18),
(308, 30, 'Bodie', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(309, 30, 'Ditinn', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(310, 30, 'Kaala', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(311, 30, 'Kankalabe', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(312, 30, 'Kebaly', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(313, 30, 'Koba', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(314, 30, 'Mafara', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(315, 30, 'Mitty', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(316, 30, 'Monbeya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(317, 9, 'Mamou centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:37:42', 18),
(318, 9, 'Bouliwel', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(319, 9, 'Dounet', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(320, 9, 'Gongoret', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 11:58:54', 14),
(321, 9, 'Kegneko', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(322, 9, 'Konkoure', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(323, 9, 'Niagara', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(324, 9, 'Oure-kaba', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(325, 9, 'Poredaka', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(326, 9, 'Saramoussaya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(327, 9, 'Soya', NULL, 1, '0000-00-00 00:00:00', 0, '2013-06-20 21:41:38', 2),
(328, 9, 'Teguereya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(329, 9, 'Timbo', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(330, 9, 'Tolo', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(331, 14, 'Pita centre', NULL, 1, '0000-00-00 00:00:00', 0, '2014-09-04 16:38:49', 15),
(332, 14, 'Bantignel', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(333, 14, 'Brouwal tappe', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(334, 14, 'Donghol touma', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 16:03:27', 14),
(335, 14, 'Gongore ', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(336, 14, 'Ley miro', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(337, 14, 'Maci ', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(338, 14, 'Ninguelande', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(339, 14, 'Sangareya', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(340, 14, 'Sintaly', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(341, 14, 'Timbi-madina ', NULL, 1, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
(342, 14, 'Timbi tounni', NULL, 1, '0000-00-00 00:00:00', 0, '2013-09-17 15:50:36', 14),
(433, 16, 'Kagbelein', NULL, 1, '2014-09-04 12:56:31', 18, '2014-09-04 12:56:31', 18),
(434, 16, 'Tercè', NULL, 1, '2014-09-04 12:56:51', 18, '2014-09-04 12:56:51', 18),
(437, 16, 'Gbantama', NULL, 1, '2014-09-04 13:28:22', 18, '2014-09-04 13:28:22', 18),
(439, 16, 'Pamelap', NULL, 1, '2015-04-21 16:46:13', 15, '2015-04-21 16:46:13', 15),
(441, 7, 'Kakan koura', NULL, 1, '2015-04-21 16:54:21', 15, '2015-04-21 16:54:21', 15),
(442, 4, 'Bokaria', NULL, 1, '2015-04-21 17:04:10', 15, '2015-04-21 17:04:10', 15),
(443, 4, 'Tabakoro', NULL, 1, '2015-04-21 17:14:38', 15, '2015-04-21 17:14:38', 15),
(444, 4, 'Kodiaran', NULL, 0, '2015-04-21 17:16:19', 15, '2015-04-21 17:18:07', 15),
(445, 23, 'Kodiaran', NULL, 1, '2015-04-21 17:18:27', 15, '2015-04-21 17:18:27', 15),
(446, 4, 'Balato', NULL, 1, '2015-04-21 17:20:34', 15, '2015-04-21 17:20:34', 15),
(447, 4, 'Djelibakoro', NULL, 1, '2015-04-21 17:21:39', 15, '2015-04-21 17:21:39', 15),
(448, 6, 'Dorota', NULL, 1, '2015-04-21 17:25:10', 15, '2015-04-21 17:25:10', 15),
(449, 22, 'Sanoyah', NULL, 1, '2015-04-22 09:50:28', 15, '2015-04-22 09:50:28', 15),
(450, 4, 'Tomboko', NULL, 1, '2015-04-22 09:52:04', 15, '2015-04-22 09:52:04', 15),
(451, 23, 'Oudiala', NULL, 1, '2015-04-22 09:57:37', 15, '2015-04-22 09:57:37', 15),
(452, 10, 'Sandia', NULL, 1, '2015-04-22 09:59:23', 15, '2015-04-22 09:59:23', 15),
(453, 23, 'Lero', NULL, 1, '2015-04-22 10:01:32', 15, '2015-04-22 10:01:32', 15),
(454, 4, 'Koniakoro', NULL, 1, '2015-04-22 10:02:39', 15, '2015-04-22 10:02:39', 15),
(455, 4, 'Tiguibiri', NULL, 1, '2015-04-22 10:03:24', 15, '2015-04-22 10:03:24', 15),
(456, 7, 'Kignéba', NULL, 1, '2015-04-22 10:15:47', 15, '2015-04-22 10:15:47', 15),
(457, 16, 'Bailobaya', NULL, 1, '2015-04-22 17:09:30', 15, '2017-01-19 19:25:42', 1),
(458, 18, 'Balandougouba', NULL, 1, '2015-04-23 16:27:25', 15, '2015-04-23 16:27:25', 15),
(459, 25, 'Pamelap', NULL, 1, '2015-04-23 17:40:37', 15, '2015-04-23 17:40:37', 15),
(460, 38, 'Bansoumai', NULL, 0, '2015-05-08 11:38:48', 24, '2015-05-08 11:39:37', 24),
(461, 18, 'Morodou', NULL, 1, '2015-05-11 10:50:43', 27, '2015-06-16 13:54:40', 27),
(462, 18, 'Fodessia banankoro', NULL, 1, '2015-06-16 13:09:04', 27, '2015-06-16 13:16:15', 27),
(463, 152, 'Mlkk', NULL, 1, '2020-04-28 23:57:52', 1, '2020-04-28 23:57:52', 1),
(464, 153, 'Tores', NULL, 1, '2020-04-29 00:01:10', 1, '2020-04-29 00:01:10', 1),
(465, 154, 'Bilima', NULL, 1, '2020-05-01 12:34:15', 1, '2020-05-01 12:34:15', 1),
(466, 116, 'Courbevoieui', '', 1, '2020-05-23 11:32:25', 1, '2022-02-09 19:55:00', 9),
(467, 1, 'MATOT', NULL, 0, '2020-08-14 12:09:27', 1, '2020-08-14 12:10:44', 1),
(468, 108, 'communeFrance', NULL, 1, '2020-07-02 00:00:00', 1, '2020-07-29 00:00:00', 1),
(469, 38, 'COMMUNE URBAINE', NULL, 1, '2020-12-04 09:32:05', 1, '2020-12-04 09:32:05', 1),
(470, 8, 'COMMUNE URBAINE', NULL, 0, '2020-12-04 10:08:56', 1, '2021-01-05 18:27:01', 1),
(471, 30, 'Ratoma1', '', 0, '2021-11-02 09:51:57', 1, '2021-11-02 09:57:42', 1),
(472, 2, 'Ratoma2', '', 0, '2021-11-02 09:55:27', 1, '2021-11-02 09:57:54', 1),
(473, 26, 'Kokaya', '', 1, '2023-07-06 23:10:36', 1, '2023-07-07 15:42:32', 1),
(474, 26, 'Soumbouyady', '', 1, '2023-07-13 14:21:57', 1, '2023-07-13 14:21:57', 1);

-- --------------------------------------------------------

--
-- Structure de la table `couleurs`
--

CREATE TABLE `couleurs` (
  `id` int(11) NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `codeHtml` varchar(10) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `devises`
--

CREATE TABLE `devises` (
  `id` int(11) NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `symbole` varchar(10) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ecoles`
--

CREATE TABLE `ecoles` (
  `id` int(11) NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `slogan` longtext DEFAULT NULL,
  `dateCreation` varchar(45) DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `ecoles`
--

INSERT INTO `ecoles` (`id`, `libelle`, `slogan`, `dateCreation`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 'Sékou sylla\'s school', 'Formation pour tous', '2023-09-22', 1, '2023-10-14 22:50:23', 1, '2023-10-21 18:42:55', 5),
(2, 'Mariame thiam', 'Ouvrir une école c\'est fermer 1000 prisons.', '2023-09-22', 1, '2023-10-14 23:15:37', 1, '2023-10-22 00:12:42', 5);

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `id` int(11) NOT NULL,
  `classeId` int(11) NOT NULL,
  `matricule` varchar(45) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenoms` varchar(150) NOT NULL,
  `numeroTuteur1` double NOT NULL,
  `numeroTuteur2` double DEFAULT NULL,
  `numeroTuteur4` double DEFAULT NULL,
  `statut` varchar(45) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`id`, `classeId`, `matricule`, `nom`, `prenoms`, `numeroTuteur1`, `numeroTuteur2`, `numeroTuteur4`, `statut`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(85, 1, 'AC0000', 'Camara', 'Aboulaye', 621134573, 0, 0, '', 0, '2023-10-28 15:36:01', 5, '2023-10-28 16:57:15', 5),
(86, 1, 'TS0001', 'Souleymane', 'Thierno', 621134575, 0, 0, '', 0, '2023-10-28 15:36:01', 5, '2023-10-28 17:01:17', 5),
(87, 1, 'MS0002', 'Sylla', 'mamadou', 621123456, 0, 0, '', 0, '2023-10-28 15:36:51', 5, '2023-10-28 16:58:38', 5),
(88, 1, 'MS0003', 'Sylla', 'mamadou', 621123456, 0, 0, '', 1, '2023-10-28 15:37:04', 5, '2023-10-28 15:37:04', 5),
(89, 1, 'MS0004', 'Sylla', 'mamadou', 621123456, 0, 0, '', 0, '2023-10-28 15:37:15', 5, '2023-10-28 16:57:24', 5),
(90, 1, 'MS0005', 'Sylla', 'mamadou', 621123456, 0, 0, '', 0, '2023-10-28 15:38:58', 5, '2023-11-08 21:54:28', 5),
(91, 2, 'FB0000', 'Bangoura', 'Fatoumata', 621121213, 621154309, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(92, 2, 'TSS0001', 'Sylla', 'Thierno Souleymane', 629334509, 610309876, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(93, 2, 'AY0002', 'Yansané', 'Abdoulaye', 654333333, 621106376, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(94, 2, 'SAL0003', 'Lankono', 'Sekou Ahmed', 657101234, 627132456, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(95, 2, 'FLB0004', 'Bangoura', 'Fodé lansana', 621134567, 655780987, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(96, 2, 'FS0005', 'sow', 'Fatoumata', 623445678, 620212325, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(97, 2, 'AB0006', 'Bangoura', 'Amara', 620150233, 0, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(98, 2, 'ISB0007', 'Barry', 'Ibrahima Sory', 664256739, 620101010, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(99, 2, 'AT0008', 'Tolno', 'Augustin', 629304418, 610214367, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(100, 2, 'FBS0009', 'Sow', 'Fatoumata Bindy', 624567687, 654331008, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(101, 2, 'TMS0010', 'Sylla', 'Thierno Mamadou', 620109876, 625331002, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(102, 2, 'MB0011', 'Bah', 'Mamadou', 627000000, 623540016, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(103, 2, 'FB0012', 'Bakayoko', 'Fodé', 628094517, 7621123465, 0, '', 1, '2023-11-05 22:21:43', 5, '2023-11-05 22:21:43', 5),
(104, 6, 'AC0000', 'Camara', 'Abdoulaye', 620303030, 0, 0, '', 1, '2023-11-11 02:17:29', 5, '2023-11-11 02:17:29', 5),
(105, 1, 'FC0006', 'conté', 'Fatoumata', 621330015, 0, 0, '', 1, '2023-11-11 22:53:42', 5, '2023-11-11 22:53:42', 5),
(106, 1, 'AB0007', 'Barrty', 'Abdoulay', 621134565, 0, 0, '', 1, '2023-11-11 22:53:42', 5, '2023-11-11 22:53:42', 5),
(107, 3, 'SN0000', 'nanahara', 'Souha', 623540016, 0, 0, '', 1, '2023-11-12 16:54:50', 5, '2023-11-12 16:54:50', 5),
(108, 3, 'SD0001', 'Diallo', 'Saliou', 655101191, 0, 0, '', 1, '2023-11-12 16:54:50', 5, '2023-11-12 16:54:50', 5),
(109, 4, 'MFT0000', 'Touré', 'Mohamed Fassya', 610202020, 0, 0, '', 1, '2023-11-12 16:59:37', 5, '2023-11-12 16:59:37', 5),
(110, 4, 'AS0001', 'Sembene', 'Abdoulaye', 654303030, 0, 0, '', 1, '2023-11-12 16:59:37', 5, '2023-11-12 16:59:37', 5);

-- --------------------------------------------------------

--
-- Structure de la table `fiche_renseignements`
--

CREATE TABLE `fiche_renseignements` (
  `id` int(11) NOT NULL,
  `prestationId` int(11) DEFAULT NULL,
  `classeId` int(11) DEFAULT NULL,
  `ecoleId` int(11) DEFAULT NULL,
  `prix` double NOT NULL DEFAULT 0,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `fiche_renseignements`
--

INSERT INTO `fiche_renseignements` (`id`, `prestationId`, `classeId`, `ecoleId`, `prix`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(2, 2, 1, 2, 10000, 1, '2023-10-21 15:12:32', 5, '2023-10-21 15:12:32', 5),
(3, 3, NULL, 2, 10000, 0, '2023-10-21 15:15:51', 5, '2023-10-21 18:36:46', 5),
(4, 4, 3, 2, 500000, 1, '2023-10-21 15:25:32', 5, '2023-10-21 18:11:41', 5),
(5, 5, 1, 2, 3000, 1, '2023-10-21 15:33:34', 5, '2023-10-21 18:11:49', 5),
(6, 5, 5, 2, 5000, 1, '2023-10-21 15:34:02', 5, '2023-10-21 18:12:26', 5),
(7, 3, 3, 2, 50000, 1, '2023-10-21 15:36:09', 5, '2023-11-06 23:41:21', 5),
(8, 4, 4, 2, 500000, 1, '2023-10-21 16:30:38', 5, '2023-10-21 18:19:56', 5),
(9, 4, 1, 2, 300000, 1, '2023-10-21 18:23:28', 5, '2023-10-21 18:23:28', 5),
(10, 4, 2, 2, 40000, 1, '2023-10-21 18:23:45', 5, '2023-10-21 18:23:45', 5),
(11, 4, 5, 2, 60000, 1, '2023-10-21 18:24:31', 5, '2023-10-21 18:24:31', 5),
(12, 4, 6, 2, 80000, 1, '2023-10-21 18:25:03', 5, '2023-10-21 18:25:03', 5),
(13, 7, NULL, 2, 70000, 1, '2023-10-21 18:27:14', 5, '2023-10-21 18:27:14', 5),
(14, 3, 1, 2, 90000, 1, '2023-11-08 21:55:34', 5, '2023-11-08 21:55:34', 5);

-- --------------------------------------------------------

--
-- Structure de la table `groupes`
--

CREATE TABLE `groupes` (
  `id` int(11) NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `observations` mediumtext DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `groupes`
--

INSERT INTO `groupes` (`id`, `libelle`, `observations`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(2, 'administration', NULL, 1, '2022-04-08 10:57:25', 10, '2022-05-05 16:35:14', 2022),
(9, 'Consultation', 'groupe de consultant', 1, '2022-04-23 11:55:35', 13, '2022-05-18 15:40:35', 2022),
(15, 'Bureau exécutif', NULL, 0, '2022-05-18 15:31:56', 51, '2022-06-28 17:36:45', 51),
(16, 'Pointeur', '', 1, '2023-07-07 15:47:02', 1, '2023-07-07 15:47:02', 1),
(17, 'Clôtureur', '', 1, '2023-07-09 18:21:26', 1, '2023-07-09 18:21:26', 1),
(18, 'Enseignant', '', 1, '2023-10-15 08:05:05', 1, '2023-10-15 08:05:05', 1);

-- --------------------------------------------------------

--
-- Structure de la table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `reference` varchar(45) DEFAULT NULL,
  `libelle` varchar(45) NOT NULL,
  `descriptions` mediumtext DEFAULT NULL,
  `url` varchar(120) NOT NULL,
  `menuPereId` int(11) NOT NULL DEFAULT 0,
  `ordre` int(11) NOT NULL,
  `typeMenu` enum('Public','Prive') NOT NULL DEFAULT 'Prive',
  `image` varchar(45) DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `menus`
--

INSERT INTO `menus` (`id`, `reference`, `libelle`, `descriptions`, `url`, `menuPereId`, `ordre`, `typeMenu`, `image`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 'groupe', 'Groupe', '', 'listGroupe', 2, 3, 'Prive', 'grroupes.png', 1, '2022-04-09 17:43:44', 13, '2022-04-27 16:01:01', 0),
(2, 'admintechnique', 'admin technique', 'essai descriptions', 'adminTechnique', 0, 10, 'Prive', 'sousmenuparametre.png', 1, '2022-04-09 17:55:48', 13, '2023-06-23 14:00:09', 1),
(3, 'menu', 'Privilège', NULL, 'listeMenu', 2, 5, 'Prive', 'privileges.png', 1, '2022-04-19 14:02:28', 1, '2022-04-27 00:31:54', 1),
(5, 'modeacces', 'Mode accès', NULL, 'listModeAcces', 2, 6, 'Prive', 'mode_acces.png', 1, '2022-04-19 14:12:31', 1, '2022-04-19 14:12:31', 1),
(7, 'user', 'Utilisateur', '', 'user/list', 2, 3, 'Public', 'utilisateur.png', 1, '2022-04-21 13:55:10', 13, '2022-04-21 13:55:10', 13),
(19, 'localisation', 'Localisation', '', 'localisation', 0, 9, 'Prive', 'localisation.png', 1, '2022-05-06 16:29:01', 51, '2022-05-10 10:59:30', 0),
(20, 'pays', 'Pays', '', 'listPays', 19, 1, 'Prive', 'pays.png', 1, '2022-05-06 17:02:26', 51, '2022-05-06 17:02:26', 51),
(21, 'region', 'Région', '', 'listeRegion', 19, 2, 'Prive', 'region.png', 1, '2022-05-06 17:03:36', 51, '2022-05-06 17:03:36', 51),
(22, 'prefecture', 'Préfecture', '', 'listePrefecture', 19, 3, 'Prive', 'prefecture.png', 1, '2022-05-06 17:04:07', 51, '2022-05-06 17:04:07', 51),
(23, 'commune', 'Commune', '', 'listeCommune', 19, 4, 'Prive', 'commune.png', 1, '2022-05-06 17:05:09', 51, '2022-05-06 17:05:09', 51),
(24, 'quartier', 'Quartier', '', 'listeQuartier', 19, 5, 'Prive', 'quartierdistrict.png', 1, '2022-05-06 17:05:31', 51, '2022-05-06 17:05:31', 51),
(29, 'suiviEvaluation', 'Suivi et Evaluation ', '', 'suiviEvaluation', 0, 3, 'Prive', 'suivi_evaluation.png', 0, '2022-05-10 11:02:50', 51, '2023-06-23 14:00:47', 1),
(30, 'tableaudebord', 'Tableau de Bord ', 'description', 'tableaudebord', 0, 1, 'Prive', 'tableau_bord.png', 1, '2022-05-10 11:04:00', 51, '2022-07-03 20:42:27', 0),
(32, 'parametre', 'Paramètre', '', 'parametre', 0, 8, 'Prive', 'parametrage.png', 1, '2022-05-10 11:21:45', 51, '2022-05-10 11:21:45', 51),
(33, 'programme', 'Programme', '', 'listProgramme', 28, 3, 'Prive', 'sousmenuaxe.png', 1, '2022-05-10 11:23:46', 51, '2022-05-11 15:34:03', 0),
(34, 'projet', 'Projet', '', 'listeProjet', 28, 5, 'Prive', 'sousmenuprojet.png', 1, '2022-05-10 11:24:17', 51, '2022-06-02 15:12:54', 0),
(35, 'devise', 'Devise', '', 'listeDevise', 32, 0, 'Prive', 'devise.png', 1, '2022-05-10 11:30:28', 51, '2022-05-10 11:30:28', 51),
(36, 'statutProjet', 'Statut Projet', '', 'listeStatutProjet', 32, 2, 'Prive', 'statut.png', 1, '2022-05-10 11:31:38', 51, '2022-05-10 12:28:07', 0),
(37, 'priorite', 'Priorité', '', 'listPriorite', 32, 4, 'Prive', 'priorité.png', 1, '2022-05-10 11:32:42', 51, '2022-05-10 11:32:42', 51),
(38, 'unite', 'Unité', '', 'listeUnite', 32, 6, 'Prive', 'unite.png', 1, '2022-05-10 11:33:37', 51, '2022-05-10 12:27:44', 0),
(54, 'menuPrincipal', 'Menu principal', '', 'mkd', 0, 0, 'Prive', 'a.jpeg', 0, '2022-06-03 09:42:33', 51, '2022-06-07 11:26:08', 51),
(88, 'typeFonction', 'Type Fonction', '', 'parametr/listeTypeFonction', 32, 10, 'Prive', 'privileges.png', 1, '2023-06-25 11:32:20', 1, '2023-06-25 11:32:20', 1),
(89, 'statut', 'Statut', '', 'parametr/listeStatut', 32, 10, 'Prive', 'statut.png', 1, '2023-06-26 09:42:14', 1, '2023-06-26 09:42:14', 1),
(90, 'generique', 'Générique', '', 'listeGenerique', 0, 15, 'Prive', 'priorité.png', 1, '2023-07-04 19:23:51', 1, '2023-07-04 19:23:51', 1),
(96, 'ecole', 'Ecole', '', 'listeEcoleSm', 90, 1, 'Prive', 'sousmenudepartement.png', 1, '2023-10-14 22:00:51', 1, '2023-10-14 22:00:51', 1),
(97, 'ficheRenseignement', 'Recueil de Prix', '', 'ficheRenseignement', 90, 1, 'Prive', 'sousmenucdmtprogramme.png', 1, '2023-10-19 20:59:14', 5, '2023-10-19 20:59:14', 5),
(98, 'prestation', 'Prestation', '', 'prestation/listePrestation', 32, 5, 'Prive', 'application.png', 1, '2023-10-20 20:01:21', 5, '2023-10-20 20:01:21', 5),
(99, 'eleveSm', 'Eleves', '', '/eleve/eleveSm', 0, 6, 'Prive', 'acteur.png', 1, '2023-10-24 22:42:20', 5, '2023-10-24 22:42:20', 5),
(100, 'Paiement', 'Paiement', '', '/paiement/listePaiement', 0, 0, 'Prive', 'devise.png', 1, '2023-11-02 22:29:08', 5, '2023-11-02 22:29:08', 5),
(101, 'suivi_paiement', 'Suivi Paie', '', '/suivi/paie', 0, 0, 'Prive', 'rubrique_evaluation.png', 1, '2023-11-11 02:06:36', 5, '2023-11-11 02:06:36', 5);

-- --------------------------------------------------------

--
-- Structure de la table `modeaccess`
--

CREATE TABLE `modeaccess` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `modeaccess`
--

INSERT INTO `modeaccess` (`id`, `libelle`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 'Ajout', 1, '2022-04-10 00:54:17', 13, '2022-10-29 14:31:00', 51),
(2, 'Modification', 1, '2022-04-10 00:55:00', 13, '2022-05-18 16:02:35', 51),
(3, 'Suppression', 1, '2022-04-10 01:10:36', 13, '2022-05-05 22:24:22', 51),
(4, 'Consultation', 1, '2022-04-18 14:24:51', 51, '2022-06-02 12:42:42', 51),
(5, 'Tout', 1, '2022-04-23 12:11:50', 12, '2022-04-29 15:19:46', 51);

-- --------------------------------------------------------

--
-- Structure de la table `onglets`
--

CREATE TABLE `onglets` (
  `id` int(11) NOT NULL,
  `menuId` int(11) NOT NULL,
  `reference` varchar(30) NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `descriptions` mediumtext DEFAULT NULL,
  `type` enum('Public','Prive') NOT NULL DEFAULT 'Prive',
  `ordre` int(11) NOT NULL,
  `url` varchar(120) NOT NULL,
  `image` varchar(45) DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `onglets`
--

INSERT INTO `onglets` (`id`, `menuId`, `reference`, `libelle`, `descriptions`, `type`, `ordre`, `url`, `image`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(16, 26, 'document', 'Document', '', 'Prive', 6, 'document', '', 1, '2022-05-10 16:49:25', 51, '2022-05-10 16:49:25', 51),
(17, 26, 'detail', 'Détail', '', 'Prive', 0, 'detail', '', 1, '2022-05-10 16:50:56', 51, '2022-05-10 16:50:56', 51),
(18, 26, 'utilisateur', 'Utilisateur', '', 'Prive', 8, 'utilisateur', '', 1, '2022-05-10 16:52:20', 51, '2022-05-10 16:52:20', 51),
(19, 27, 'projet', 'Projet', '', 'Prive', 3, 'projet', '', 1, '2022-05-10 16:53:37', 51, '2022-05-10 16:53:37', 51),
(20, 26, 'service', 'Service', '', 'Prive', 1, 'service', '', 1, '2022-05-11 09:36:26', 51, '2022-05-11 09:36:26', 51),
(21, 26, 'projet', 'Projet', '', 'Prive', 12, 'projet', '', 1, '2022-05-11 09:43:46', 51, '2022-05-11 09:43:46', 51),
(22, 27, 'detail', 'Detail', '', 'Prive', 0, 'detail', '', 1, '2022-05-11 09:52:37', 51, '2022-05-11 09:52:37', 51),
(23, 31, 'detail', 'Detail', '', 'Prive', 0, 'detail', '', 1, '2022-05-11 09:55:39', 51, '2022-05-11 09:55:39', 51),
(24, 31, 'programme', 'Programme', '', 'Prive', 2, 'programme', '', 1, '2022-05-11 09:57:31', 51, '2022-05-11 09:57:31', 51),
(25, 31, 'document', 'Document', '', 'Prive', 4, 'document', '', 1, '2022-05-11 09:58:04', 51, '2022-05-11 09:58:04', 51),
(26, 33, 'detail', 'Detail', '', 'Prive', 0, 'detail', '', 1, '2022-05-11 09:59:19', 51, '2022-05-11 09:59:19', 51),
(27, 33, 'projet', 'Projet', '', 'Prive', 4, 'projet', '', 1, '2022-05-11 10:01:23', 51, '2022-05-11 10:01:23', 51),
(28, 33, 'document', 'Document', '', 'Prive', 6, 'document', '', 1, '2022-05-11 10:01:58', 51, '2022-05-11 10:01:58', 51),
(29, 34, 'detail', 'Detail', '', 'Prive', 0, 'detail', '', 1, '2022-05-11 10:03:10', 51, '2022-05-11 10:03:10', 51),
(30, 34, 'document', 'Documents', '', 'Prive', 2, 'document', '', 1, '2022-05-11 10:03:56', 51, '2022-10-06 16:27:54', 51),
(32, 34, 'service', 'Services', '', 'Prive', 8, 'service', '', 1, '2022-05-11 10:05:05', 51, '2022-10-06 16:28:38', 51),
(33, 34, 'prestataire', 'Prestataires', '', 'Prive', 10, 'prestataire', '', 1, '2022-05-11 10:05:41', 51, '2022-10-06 16:28:55', 51),
(34, 34, 'financement', 'Financements', '', 'Prive', 12, 'structure', '', 1, '2022-05-11 10:06:29', 51, '2022-10-06 16:29:07', 51),
(37, 34, 'chaineDeResultat', 'Chaines De Resultats', 'v', 'Prive', 18, 'chaine de resultat', '', 1, '2022-05-11 10:19:15', 51, '2022-10-06 16:29:33', 51),
(38, 34, 'action', 'Actions', '', 'Prive', 20, 'action', '', 1, '2022-05-11 10:20:48', 51, '2022-10-06 16:29:49', 51),
(39, 34, 'investissement', 'Investissements', '', 'Prive', 22, 'investissement', '', 1, '2022-05-11 10:21:32', 51, '2022-10-06 16:30:04', 51),
(40, 27, 'utilisateur', 'Utilisateur', '', 'Prive', 6, 'utilisateur', '', 1, '2022-05-11 15:00:47', 51, '2022-05-11 15:00:47', 51),
(41, 27, 'document', 'Document', '', 'Prive', 10, 'document', '', 1, '2022-05-11 15:01:52', 51, '2022-05-11 15:01:52', 51),
(42, 34, 'budgetPrevisionnel', 'Budgets previsionnels', '', 'Prive', 3, 'budgetPrevisionnel', '', 1, '2022-05-11 16:49:54', 51, '2022-10-06 16:30:25', 51),
(43, 49, 'document', 'Document', '', 'Prive', 6, 'document', '', 1, '2022-05-11 17:36:17', 51, '2022-07-03 20:42:03', 51),
(44, 49, 'detail', 'Detail', 'v', 'Prive', 0, 'detail', '', 1, '2022-05-11 17:37:04', 51, '2022-05-12 10:06:52', 51),
(45, 50, 'detail', 'Detail', '', 'Prive', 0, 'detail', '', 1, '2022-05-11 17:42:04', 51, '2022-05-11 17:42:04', 51),
(46, 50, 'hypothese', 'Hypothèse', '', 'Prive', 2, 'hypothese', '', 1, '2022-05-11 17:42:57', 51, '2022-05-11 17:42:57', 51),
(47, 51, 'fds', 'qdfs', '', 'Prive', 1, 'fds', '', 0, '2022-06-02 13:15:28', 51, '2022-06-02 14:52:41', 51),
(48, 55, 'dsf', 'onglet1', '', 'Prive', 0, 'sdf', '', 1, '2022-06-03 09:44:03', 51, '2022-06-03 09:44:03', 51),
(49, 57, 'valeurCible', 'valeur cible', NULL, 'Prive', 1, 'valeurCible', NULL, 1, '2022-06-27 12:38:39', 51, '2022-06-27 12:38:39', 51),
(50, 57, 'execution', 'Execution', NULL, 'Prive', 2, 'executionEvaluation', NULL, 1, '2022-06-27 12:42:39', 51, '2022-06-27 12:42:39', 51),
(52, 58, 'projet_programme', 'projet', NULL, 'Prive', 1, 'projet_programme', NULL, 1, '2022-06-27 12:47:25', 51, '2022-06-27 12:47:25', 51),
(53, 34, 'valeurCibleExploitation', 'Valeurs cibles', NULL, 'Prive', 6, 'valeurCibleExploitation', '', 1, '2022-06-27 13:28:53', 51, '2022-10-06 16:30:39', 51),
(54, 61, 'programme_prioritaire_onglet', 'Programmes prioritaires', '', 'Prive', 4, 'listeProPrioritaireProgrammeG', '', 1, '2022-08-17 12:21:41', 51, '2022-11-17 15:15:08', 51),
(55, 61, 'programme_general_chapitre', 'Chapitres', '', 'Prive', 1, 'listeProgrammeGeneralChapitre', '', 0, '2022-08-17 12:24:26', 51, '2022-11-17 15:13:48', 51),
(56, 61, 'programme_general_papbs', 'PAPB', '', 'Prive', 5, 'listeProgrammeGeneralPapbs', '', 1, '2022-08-17 12:25:41', 51, '2022-09-22 10:21:37', 51),
(57, 61, 'programme_general_detail', 'Détail', '', 'Prive', 0, 'programmeGeneralDetail', '', 1, '2022-08-17 12:27:26', 51, '2022-08-17 12:27:26', 51),
(58, 61, 'programme_general_document', 'Documents', '', 'Prive', 2, 'listeProgrammeGeneralDocument', '', 1, '2022-08-17 12:34:29', 51, '2022-09-08 16:18:35', 51),
(59, 64, 'pro_prioritaire_sous_programme', 'Sous programmes', '', 'Prive', 1, 'listePgPrioritaireSousProgramme', '', 1, '2022-08-17 14:01:43', 51, '2022-09-14 14:38:09', 51),
(60, 64, 'programme_prioritaire_defis_pr', 'Défis', '', 'Prive', 2, 'listeProgPrioDefisProgPrioritaire', '', 1, '2022-08-17 14:03:25', 51, '2022-09-08 17:02:04', 51),
(61, 64, 'programme_prioritaire_detail', 'Détail', '', 'Prive', 0, 'detailProPrioritaire', '', 1, '2022-08-17 14:04:48', 51, '2022-08-17 14:04:48', 51),
(62, 65, 'papb_document', 'Documents', '', 'Prive', 1, 'listePapbDocument', '', 1, '2022-08-17 14:08:05', 51, '2022-09-09 15:36:21', 51),
(63, 65, 'papb_paab', 'Paabs', '', 'Prive', 3, 'listPapbPaab', '', 1, '2022-08-17 14:09:16', 51, '2022-11-17 15:18:58', 51),
(64, 65, 'papb_detail', 'Detail', '', 'Prive', 0, 'papbDetail', '', 1, '2022-08-17 14:10:24', 51, '2022-08-17 14:10:24', 51),
(65, 68, 'paab_activite', 'PAAB <==> Activités', '', 'Prive', 2, 'listePaabActivite', '', 1, '2022-08-17 14:11:57', 51, '2022-11-17 15:26:17', 51),
(66, 68, 'paab_document', 'Documents', '', 'Prive', 1, 'listePaabDocument', '', 1, '2022-08-17 14:13:12', 51, '2022-10-06 10:25:30', 51),
(67, 68, 'detail_paab', 'Détail', '', 'Prive', 0, 'detailPaab', '', 1, '2022-08-17 14:14:16', 51, '2022-08-17 14:14:16', 51),
(68, 67, 'sous_programmes_prioritaires_r', 'Résultats', '', 'Prive', 1, 'listeSousPrioritaireResultats', '', 1, '2022-08-17 14:20:13', 51, '2022-08-17 14:20:13', 51),
(69, 67, 'sous_programmes_prioritaires_a', 'Activités', '', 'Prive', 2, 'listeSousPgPrioritaireActivite', '', 0, '2022-08-17 14:21:56', 51, '2022-09-06 10:00:11', 51),
(70, 67, 'sous_programmes_prioritaires_d', 'Détail', '', 'Prive', 0, 'detailSousPgPrioritaire', '', 1, '2022-08-17 14:23:43', 51, '2022-08-17 14:23:43', 51),
(71, 69, 'activite_projet', 'Projets', '', 'Prive', 3, 'listeActiviteProjet', '', 1, '2022-08-17 14:26:36', 51, '2022-09-30 13:12:12', 51),
(72, 69, 'activite_paab', 'Paabs', '', 'Prive', 2, 'listeActivitePaab', '', 1, '2022-08-17 14:27:58', 51, '2022-09-08 16:18:03', 51),
(73, 69, 'activite_financement', 'Financements', '', 'Prive', 3, 'listeActiviteFinancement', '', 1, '2022-08-17 14:28:56', 51, '2022-09-09 15:34:29', 51),
(74, 69, 'activites_tache', 'Exécution', '', 'Prive', 8, 'listeActiviteTache', '', 1, '2022-08-17 14:30:31', 51, '2022-12-12 14:29:11', 51),
(75, 69, 'activite_detail', 'Détail', '', 'Prive', 0, 'activiteDetail', '', 1, '2022-08-17 14:34:00', 51, '2022-08-17 14:34:00', 51),
(76, 65, 'papb_activite', 'PAPB <==> Activités', '', 'Prive', 2, 'listePapbActivite', '', 1, '2022-08-28 16:18:23', 51, '2022-11-17 15:23:54', 51),
(77, 70, 'departement_detail', 'Detail', '', 'Prive', 0, 'detailDepartement', '', 1, '2022-08-29 22:29:51', 51, '2022-08-29 22:32:44', 51),
(78, 70, 'departementService', 'Services', '', 'Prive', 2, 'departementService', '', 1, '2022-08-29 22:34:08', 51, '2022-09-11 10:05:22', 51),
(79, 70, 'activite_departement', 'Activite', '', 'Prive', 3, 'activiteDepartement', '', 0, '2022-08-29 22:36:22', 51, '2022-09-11 20:50:57', 51),
(80, 67, 'sous_programmes_prioritaires_s', 'Strategie', '', 'Prive', 2, 'listeSousProPrioStrategie', '', 0, '2022-09-06 11:33:24', 51, '2022-09-08 16:20:29', 51),
(81, 72, 'cdmt_programme_detail', 'Detail', '', 'Prive', 0, 'cdmtProgrammeDetail', '', 1, '2022-09-12 12:06:31', 51, '2022-09-12 12:06:31', 51),
(82, 72, 'cdmtnat_depense', 'Cdmt_Natures_dépenses', '', 'Prive', 1, 'cdmtnat_depense', '', 1, '2022-09-12 12:08:33', 51, '2022-09-12 12:08:33', 51),
(83, 73, 'detailStrategie', 'Détail', '', 'Prive', 0, 'detailStratgie', '', 1, '2022-09-19 19:05:18', 51, '2022-09-19 19:05:18', 51),
(84, 73, 'strategieActivite', 'Activités', '', 'Prive', 1, 'listeStrategieActivite', '', 1, '2022-09-19 19:09:32', 51, '2022-09-19 19:09:32', 51),
(85, 74, 'resultatStrategie', 'Stratégies', '', 'Prive', 1, 'listeResultatStrategie', '', 1, '2022-09-20 08:56:44', 51, '2022-09-20 08:56:44', 51),
(86, 74, 'detailResultat', 'Détail', '', 'Prive', 0, 'detailResultat', '', 1, '2022-09-20 08:57:30', 51, '2022-09-20 08:57:30', 51),
(87, 34, 'activite_projet_exploitation', 'Activités', '', 'Prive', 12, 'listeActiviteProjetExploitation', '', 1, '2022-09-26 15:10:59', 51, '2022-10-06 16:30:51', 51),
(88, 74, 'resultatActivite', 'Activités', '', 'Prive', 2, 'listeResultatActivite', '', 1, '2022-09-26 16:40:48', 51, '2022-09-26 16:41:58', 51),
(89, 69, 'activite_papb', 'Papbs', '', 'Prive', 1, 'listeActivitePapb', '', 1, '2022-09-30 13:08:37', 51, '2022-09-30 13:08:37', 51),
(90, 79, 'detailTemplate', 'Détail', '', 'Prive', 0, 'detailTemplate', '', 1, '2022-10-26 11:08:53', 51, '2022-10-26 11:08:53', 51),
(91, 79, 'natureTemplate', 'Natures', '', 'Prive', 1, 'listeTemplateNature', '', 1, '2022-10-26 11:12:42', 51, '2022-10-26 15:09:51', 51),
(92, 79, 'templateTache', 'Tâches', '', 'Prive', 2, 'listeTemplateTache', '', 1, '2022-10-26 11:13:45', 51, '2022-10-26 17:06:08', 51),
(93, 78, 'detaiTache', 'Détail', '', 'Prive', 0, 'detaiTache', '', 1, '2022-10-27 12:14:30', 51, '2022-10-27 12:14:30', 51),
(94, 78, 'tacheTemplate', 'Templates', '', 'Prive', 1, 'listeTacheTemplate', '', 1, '2022-10-27 12:15:28', 51, '2022-10-27 12:15:28', 51),
(95, 78, 'tacheActivite', 'Activités', '', 'Prive', 2, 'listeTacheActivite', '', 1, '2022-10-27 12:16:55', 51, '2022-10-27 12:16:55', 51),
(96, 69, 'activitePlannif', 'Planification', '', 'Prive', 6, 'activitePlannif', '', 1, '2022-11-29 10:44:44', 51, '2022-12-12 14:28:42', 51),
(97, 69, 'activiteTacheEcart', 'Ecart', '', 'Prive', 8, 'listeActiviteEcart', '', 1, '2022-12-19 11:52:40', 51, '2022-12-19 11:53:58', 51),
(98, 69, 'listeActiviteBeneficiaire', 'Bénéficiaires', '', 'Prive', 2, 'Bénéficiaire', '', 1, '2022-12-28 15:10:03', 51, '2022-12-28 15:52:20', 51),
(99, 87, 'flotte_detail', 'Détails', '', 'Prive', 0, 'flotte_detail', '', 1, '2023-06-23 13:29:34', 1, '2023-06-23 13:29:34', 1),
(100, 87, 'flotteCamion', 'Camions', '', 'Prive', 1, 'flotteCamion', '', 1, '2023-06-23 13:46:11', 1, '2023-06-23 13:46:11', 1),
(101, 87, 'flottePersonnel', 'Personnels', '', 'Prive', 2, 'flottePersonnel', '', 1, '2023-06-23 13:46:55', 1, '2023-06-23 13:46:55', 1),
(102, 87, 'flotteSite', 'Site', '', 'Prive', 3, 'flotteSite', '', 1, '2023-06-23 13:47:27', 1, '2023-06-23 13:47:27', 1),
(103, 86, 'siteModif', 'Détail', '', 'Prive', 0, 'siteModif', '', 1, '2023-06-23 13:50:44', 1, '2023-06-23 13:50:44', 1),
(104, 86, 'sitePersonnel', 'Personnels', '', 'Prive', 1, 'sitePersonnel', '', 1, '2023-06-23 13:51:34', 1, '2023-06-23 13:51:34', 1),
(105, 86, 'siteTrajet', 'Trajets', '', 'Prive', 3, 'siteTrajet', '', 1, '2023-06-23 13:52:16', 1, '2023-06-23 13:52:16', 1),
(106, 86, 'siteFlotte', 'Flotte', '', 'Prive', 1, 'siteFlotte', '', 1, '2023-06-23 13:52:45', 1, '2023-06-23 13:52:45', 1),
(107, 86, 'siteEquipe', 'Equipe', '', 'Prive', 0, 'siteEquipe', '', 1, '2023-06-23 20:29:25', 1, '2023-06-23 20:29:25', 1),
(108, 86, 'siteCamion', 'Camion', '', 'Prive', 6, 'siteCamion', '', 1, '2023-07-04 13:53:43', 1, '2023-07-04 13:53:43', 1),
(109, 96, 'detailEcole', 'Détails', '', 'Prive', 0, 'detailEcole', '', 1, '2023-10-14 22:07:49', 1, '2023-10-14 22:07:49', 1),
(110, 96, 'tranchePaiementEcole', 'Tranches', '', 'Prive', 1, 'tranchePaiementEcole', '', 1, '2023-10-14 22:14:26', 1, '2023-10-14 22:14:26', 1),
(111, 96, 'classeEcole', 'Classes', '', 'Prive', 0, 'classeEcole', '', 1, '2023-10-14 22:15:06', 1, '2023-10-14 22:15:06', 1),
(112, 96, 'ecoleEnseignant', 'Enseignants', '', 'Prive', 0, 'ecoleEnseignant', '', 1, '2023-10-14 22:17:39', 1, '2023-10-14 22:17:39', 1);

-- --------------------------------------------------------

--
-- Structure de la table `payements`
--

CREATE TABLE `payements` (
  `id` int(11) NOT NULL,
  `eleveId` int(11) NOT NULL,
  `trancheId` int(11) DEFAULT NULL,
  `prestationId` int(11) DEFAULT NULL,
  `typePayements` enum('partiel','totalite','mensuel') NOT NULL,
  `mois` varchar(45) DEFAULT NULL,
  `prix` int(11) UNSIGNED ZEROFILL NOT NULL,
  `datePayement` datetime DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `payements`
--

INSERT INTO `payements` (`id`, `eleveId`, `trancheId`, `prestationId`, `typePayements`, `mois`, `prix`, `datePayement`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(46, 88, NULL, 2, 'totalite', 'Octobre', 00000010000, '2023-11-05 22:00:01', 1, '2023-11-05 22:00:01', 5, '2023-11-05 22:00:01', 5),
(47, 88, NULL, 2, 'totalite', 'Novembre', 00000010000, '2023-11-05 22:00:01', 1, '2023-11-05 22:00:01', 5, '2023-11-05 22:00:01', 5),
(48, 88, NULL, 2, 'totalite', 'Décembre', 00000010000, '2023-11-05 22:00:01', 1, '2023-11-05 22:00:01', 5, '2023-11-05 22:00:01', 5),
(49, 88, NULL, 2, 'totalite', 'Janvier', 00000010000, '2023-11-05 22:00:01', 1, '2023-11-05 22:00:01', 5, '2023-11-05 22:00:01', 5),
(50, 88, NULL, 2, 'totalite', 'Fevrier', 00000010000, '2023-11-05 22:00:01', 1, '2023-11-05 22:00:01', 5, '2023-11-05 22:00:01', 5),
(51, 88, NULL, 2, 'totalite', 'Mars', 00000010000, '2023-11-05 22:00:01', 1, '2023-11-05 22:00:01', 5, '2023-11-05 22:00:01', 5),
(52, 88, NULL, 2, 'totalite', 'Avril', 00000010000, '2023-11-05 22:00:01', 1, '2023-11-05 22:00:01', 5, '2023-11-05 22:00:01', 5),
(53, 88, NULL, 2, 'totalite', 'Mai', 00000010000, '2023-11-05 22:00:01', 1, '2023-11-05 22:00:01', 5, '2023-11-05 22:00:01', 5),
(54, 88, NULL, 2, 'totalite', 'Juin', 00000010000, '2023-11-05 22:00:01', 1, '2023-11-05 22:00:01', 5, '2023-11-05 22:00:01', 5),
(55, 97, NULL, 4, 'mensuel', 'Novembre', 00000040000, '2023-11-05 22:29:29', 1, '2023-11-05 22:29:29', 5, '2023-11-05 22:29:29', 5),
(56, 95, NULL, 4, 'totalite', 'Octobre', 00000040000, '2023-11-05 22:33:15', 1, '2023-11-05 22:33:15', 5, '2023-11-05 22:33:15', 5),
(57, 95, NULL, 4, 'totalite', 'Novembre', 00000040000, '2023-11-05 22:33:15', 1, '2023-11-05 22:33:15', 5, '2023-11-05 22:33:15', 5),
(58, 95, NULL, 4, 'totalite', 'Décembre', 00000040000, '2023-11-05 22:33:15', 1, '2023-11-05 22:33:15', 5, '2023-11-05 22:33:15', 5),
(59, 95, NULL, 4, 'totalite', 'Janvier', 00000040000, '2023-11-05 22:33:15', 1, '2023-11-05 22:33:15', 5, '2023-11-05 22:33:15', 5),
(60, 95, NULL, 4, 'totalite', 'Fevrier', 00000040000, '2023-11-05 22:33:15', 1, '2023-11-05 22:33:15', 5, '2023-11-05 22:33:15', 5),
(61, 95, NULL, 4, 'totalite', 'Mars', 00000040000, '2023-11-05 22:33:15', 1, '2023-11-05 22:33:15', 5, '2023-11-05 22:33:15', 5),
(62, 95, NULL, 4, 'totalite', 'Avril', 00000040000, '2023-11-05 22:33:15', 1, '2023-11-05 22:33:15', 5, '2023-11-05 22:33:15', 5),
(63, 95, NULL, 4, 'totalite', 'Mai', 00000040000, '2023-11-05 22:33:15', 1, '2023-11-05 22:33:15', 5, '2023-11-05 22:33:15', 5),
(64, 95, NULL, 4, 'totalite', 'Juin', 00000040000, '2023-11-05 22:33:15', 1, '2023-11-05 22:33:15', 5, '2023-11-05 22:33:15', 5),
(65, 88, 12, 2, '', NULL, 00000010000, '2023-11-09 23:13:19', 1, '2023-11-09 23:13:19', 5, '2023-11-09 23:13:19', 5),
(66, 88, 12, 2, 'totalite', '', 00000010000, '2023-11-09 23:45:16', 1, '2023-11-09 23:45:16', 5, '2023-11-09 23:45:16', 5),
(67, 88, 13, 2, 'totalite', '', 00000010000, '2023-11-09 23:45:16', 1, '2023-11-09 23:45:16', 5, '2023-11-09 23:45:16', 5),
(68, 88, NULL, 4, 'mensuel', 'Octobre', 00000300000, '2023-11-10 20:20:28', 1, '2023-11-10 20:20:28', 5, '2023-11-10 20:20:28', 5),
(69, 88, NULL, 4, 'mensuel', 'Novembre', 00000300000, '2023-11-10 20:22:07', 1, '2023-11-10 20:22:07', 5, '2023-11-10 20:22:07', 5),
(70, 88, NULL, 4, 'mensuel', 'Novembre', 00000300000, '2023-11-10 20:22:54', 1, '2023-11-10 20:22:54', 5, '2023-11-10 20:22:54', 5),
(71, 88, NULL, 4, 'mensuel', 'Novembre', 00000300000, '2023-11-10 20:24:20', 1, '2023-11-10 20:24:20', 5, '2023-11-10 20:24:20', 5),
(72, 88, NULL, 4, 'mensuel', 'Mais', 00000300000, '2023-11-10 20:30:10', 1, '2023-11-10 20:30:10', 5, '2023-11-10 20:30:10', 5),
(73, 88, 6, 4, '', 'Janvier', 00000300000, '2023-11-10 22:01:47', 1, '2023-11-10 22:01:47', 5, '2023-11-10 22:01:47', 5),
(74, 88, 6, 4, '', 'Fevrier', 00000300000, '2023-11-10 22:01:47', 1, '2023-11-10 22:01:47', 5, '2023-11-10 22:01:47', 5),
(75, 88, 5, 4, '', 'Octobre', 00000300000, '2023-11-10 22:30:01', 1, '2023-11-10 22:30:01', 5, '2023-11-10 22:30:01', 5),
(76, 88, 5, 4, '', 'Novembre', 00000300000, '2023-11-10 22:30:01', 1, '2023-11-10 22:30:01', 5, '2023-11-10 22:30:01', 5),
(77, 88, 5, 4, 'mensuel', 'Octobre', 00000300000, '2023-11-10 22:30:25', 1, '2023-11-10 22:30:25', 5, '2023-11-10 22:30:25', 5),
(78, 88, 5, 4, 'mensuel', 'Octobre', 00000300000, '2023-11-10 22:30:26', 1, '2023-11-10 22:30:26', 5, '2023-11-10 22:30:26', 5),
(79, 88, 5, 4, 'mensuel', 'Octobre', 00000300000, '2023-11-10 22:30:30', 1, '2023-11-10 22:30:30', 5, '2023-11-10 22:30:30', 5),
(80, 88, 5, 4, 'mensuel', 'Octobre', 00000300000, '2023-11-10 22:30:31', 1, '2023-11-10 22:30:31', 5, '2023-11-10 22:30:31', 5),
(81, 88, 5, 4, 'mensuel', 'Octobre', 00000300000, '2023-11-10 22:31:12', 1, '2023-11-10 22:31:12', 5, '2023-11-10 22:31:12', 5),
(82, 88, 5, 4, 'mensuel', 'Octobre', 00000300000, '2023-11-10 22:31:28', 1, '2023-11-10 22:31:28', 5, '2023-11-10 22:31:28', 5),
(83, 88, 5, 4, 'mensuel', 'Octobre', 00000300000, '2023-11-10 22:31:40', 1, '2023-11-10 22:31:40', 5, '2023-11-10 22:31:40', 5),
(84, 88, 6, 4, '', 'Janvier', 00000300000, '2023-11-10 22:34:51', 1, '2023-11-10 22:34:51', 5, '2023-11-10 22:34:51', 5),
(85, 88, 6, 4, '', 'Fevrier', 00000300000, '2023-11-10 22:34:51', 1, '2023-11-10 22:34:51', 5, '2023-11-10 22:34:51', 5),
(86, 88, 8, 4, '', 'Avril', 00000300000, '2023-11-10 22:35:06', 1, '2023-11-10 22:35:06', 5, '2023-11-10 22:35:06', 5),
(87, 88, 8, 4, '', 'Mai', 00000300000, '2023-11-10 22:35:06', 1, '2023-11-10 22:35:06', 5, '2023-11-10 22:35:06', 5),
(88, 88, 5, 4, '', 'Octobre', 00000300000, '2023-11-10 22:44:19', 1, '2023-11-10 22:44:19', 5, '2023-11-10 22:44:19', 5),
(89, 88, 5, 4, '', 'Novembre', 00000300000, '2023-11-10 22:44:19', 1, '2023-11-10 22:44:19', 5, '2023-11-10 22:44:19', 5),
(90, 88, 6, 4, '', 'Janvier', 00000300000, '2023-11-10 22:53:55', 1, '2023-11-10 22:53:55', 5, '2023-11-10 22:53:55', 5),
(91, 88, 6, 4, '', 'Fevrier', 00000300000, '2023-11-10 22:53:55', 1, '2023-11-10 22:53:55', 5, '2023-11-10 22:53:55', 5),
(92, 88, 6, 4, '', 'Janvier', 00000300000, '2023-11-10 22:57:19', 1, '2023-11-10 22:57:19', 5, '2023-11-10 22:57:19', 5),
(93, 88, 6, 4, '', 'Fevrier', 00000300000, '2023-11-10 22:57:19', 1, '2023-11-10 22:57:19', 5, '2023-11-10 22:57:19', 5),
(94, 88, 6, 4, '', 'Janvier', 00000300000, '2023-11-10 23:01:17', 1, '2023-11-10 23:01:17', 5, '2023-11-10 23:01:17', 5),
(95, 88, 6, 4, '', 'Fevrier', 00000300000, '2023-11-10 23:01:17', 1, '2023-11-10 23:01:17', 5, '2023-11-10 23:01:17', 5),
(96, 88, 5, 4, '', 'Octobre', 00000300000, '2023-11-10 23:04:06', 1, '2023-11-10 23:04:06', 5, '2023-11-10 23:04:06', 5),
(97, 88, 5, 4, '', 'Novembre', 00000300000, '2023-11-10 23:04:06', 1, '2023-11-10 23:04:06', 5, '2023-11-10 23:04:06', 5),
(98, 88, 6, 4, '', 'Janvier', 00000300000, '2023-11-10 23:18:45', 1, '2023-11-10 23:18:45', 5, '2023-11-10 23:18:45', 5),
(99, 88, 6, 4, '', 'Fevrier', 00000300000, '2023-11-10 23:18:45', 1, '2023-11-10 23:18:45', 5, '2023-11-10 23:18:45', 5),
(100, 88, 8, 4, '', 'Avril', 00000300000, '2023-11-10 23:25:21', 1, '2023-11-10 23:25:21', 5, '2023-11-10 23:25:21', 5),
(101, 88, 8, 4, '', 'Mai', 00000300000, '2023-11-10 23:25:21', 1, '2023-11-10 23:25:21', 5, '2023-11-10 23:25:21', 5),
(102, 88, 6, 4, '', 'Janvier', 00000300000, '2023-11-10 23:30:01', 1, '2023-11-10 23:30:01', 5, '2023-11-10 23:30:01', 5),
(103, 88, 6, 4, '', 'Fevrier', 00000300000, '2023-11-10 23:30:01', 1, '2023-11-10 23:30:01', 5, '2023-11-10 23:30:01', 5),
(104, 88, 6, 4, '', 'Janvier', 00000300000, '2023-11-10 23:36:51', 1, '2023-11-10 23:36:51', 5, '2023-11-10 23:36:51', 5),
(105, 88, 6, 4, '', 'Fevrier', 00000300000, '2023-11-10 23:36:51', 1, '2023-11-10 23:36:51', 5, '2023-11-10 23:36:51', 5),
(106, 88, NULL, 4, 'totalite', 'Octobre', 00000300000, '2023-11-10 23:46:30', 1, '2023-11-10 23:46:30', 5, '2023-11-10 23:46:30', 5),
(107, 88, NULL, 4, 'totalite', 'Novembre', 00000300000, '2023-11-10 23:46:30', 1, '2023-11-10 23:46:30', 5, '2023-11-10 23:46:30', 5),
(108, 88, NULL, 4, 'totalite', 'Octobre', 00000300000, '2023-11-10 23:49:15', 1, '2023-11-10 23:49:15', 5, '2023-11-10 23:49:15', 5),
(109, 88, NULL, 4, 'totalite', 'Novembre', 00000300000, '2023-11-10 23:49:15', 1, '2023-11-10 23:49:15', 5, '2023-11-10 23:49:15', 5),
(110, 88, NULL, 4, 'totalite', 'Octobre', 00000300000, '2023-11-11 02:14:38', 1, '2023-11-11 02:14:38', 5, '2023-11-11 02:14:38', 5),
(111, 88, NULL, 4, 'totalite', 'Novembre', 00000300000, '2023-11-11 02:14:38', 1, '2023-11-11 02:14:38', 5, '2023-11-11 02:14:38', 5),
(112, 104, 5, 4, '', 'Octobre', 00000080000, '2023-11-11 02:20:53', 1, '2023-11-11 02:20:53', 5, '2023-11-11 02:20:53', 5),
(113, 104, 5, 4, '', 'Novembre', 00000080000, '2023-11-11 02:20:53', 1, '2023-11-11 02:20:53', 5, '2023-11-11 02:20:53', 5),
(114, 88, 5, 4, '', 'Octobre', 00000300000, '2023-11-11 22:54:10', 1, '2023-11-11 22:54:10', 5, '2023-11-11 22:54:10', 5),
(115, 88, 5, 4, '', 'Novembre', 00000300000, '2023-11-11 22:54:10', 1, '2023-11-11 22:54:10', 5, '2023-11-11 22:54:10', 5),
(118, 103, NULL, 4, 'mensuel', 'Fevrier', 00000040000, '2023-11-12 09:12:29', 1, '2023-11-12 09:12:29', 5, '2023-11-12 09:12:29', 5),
(119, 88, NULL, 4, 'mensuel', 'Novembre', 00000300000, '2023-11-12 10:58:53', 1, '2023-11-12 10:58:53', 5, '2023-11-12 10:58:53', 5),
(120, 91, NULL, 4, 'mensuel', 'Novembre', 00000040000, '2023-11-12 11:00:43', 1, '2023-11-12 11:00:43', 5, '2023-11-12 11:00:43', 5),
(121, 108, NULL, 4, 'mensuel', 'Novembre', 00000500000, '2023-11-12 16:56:07', 1, '2023-11-12 16:56:07', 5, '2023-11-12 16:56:07', 5),
(122, 110, NULL, 4, 'mensuel', 'Octobre', 00000500000, '2023-11-12 17:06:41', 1, '2023-11-12 17:06:41', 5, '2023-11-12 17:06:41', 5),
(123, 92, NULL, 4, 'mensuel', 'Novembre', 00000040000, '2023-11-12 17:23:49', 1, '2023-11-12 17:23:49', 5, '2023-11-12 17:23:49', 5);

-- --------------------------------------------------------

--
-- Structure de la table `payss`
--

CREATE TABLE `payss` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `indicatifTel` int(11) NOT NULL,
  `deviseId` int(11) DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `payss`
--

INSERT INTO `payss` (`id`, `libelle`, `indicatifTel`, `deviseId`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 'GUINEE', 224, 1, 1, '2014-03-13 00:00:00', 1, '2020-08-06 10:18:26', 1),
(2, 'SIERRA-LEONE', 232, NULL, 1, '2014-03-19 00:00:00', 1, '2017-07-26 13:24:39', 10),
(3, 'FRANCE', 33, NULL, 1, '2017-01-18 23:26:00', 1, '2017-03-02 17:22:10', 1),
(4, 'Afghanistan', 93, 2, 1, '0000-00-00 00:00:00', 0, '2021-11-01 12:14:40', 1),
(5, 'ALBANIE', 355, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:27:28', 10),
(6, 'ANTARCTIQUE', 672, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:50:24', 10),
(7, 'ALGERIE', 213, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:31:05', 10),
(9, 'ANDORRE', 376, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:33:32', 10),
(10, 'ANGOLA', 244, NULL, 1, '0000-00-00 00:00:00', 0, '2017-03-02 17:52:03', 1),
(11, 'ANTIGUA-ET-BARBUDA', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:51:27', 10),
(12, 'AZERBAIDJAN', 994, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:00:20', 10),
(13, 'ARGENTINE', 54, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:53:55', 10),
(14, 'AUSTRALIE', 61, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:57:07', 10),
(15, 'AUTRICHE', 43, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:58:48', 10),
(16, 'BAHAMAS', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:22:33', 10),
(17, 'BAHREIN', 973, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:23:05', 10),
(18, 'BANGLADESH', 880, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:29:19', 10),
(19, 'ARMENIE', 374, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:55:37', 10),
(20, 'BARBADE', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:31:24', 10),
(21, 'BELGIQUE', 32, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:34:11', 10),
(22, 'BERMUDES', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:49:53', 10),
(23, 'BHOUTAN', 975, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:05:47', 10),
(24, 'BOLIVIE', 591, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:06:27', 10),
(25, 'BOSNIE-HERZEGOVINE', 387, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:08:45', 10),
(26, 'BOTSWANA', 267, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:10:15', 10),
(27, 'ILE BOUVET', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 13:53:59', 10),
(28, 'BRESIL', 55, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:11:52', 10),
(29, 'BELIZE', 501, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:34:53', 10),
(30, 'TERRITOIRE BRITANNIQUE DE L\\\'OCEAN INDIEN', 246, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:36:57', 10),
(31, 'ILES SALOMON', 677, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:08:11', 10),
(32, 'ILES VIERGES BRITANNIQUES', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:12:53', 10),
(33, 'BRUNEI DARUSSALAM', 673, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:37:07', 0),
(34, 'BULGARIE', 359, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:07:40', 10),
(35, 'MYANMAR', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:43:17', 10),
(36, 'BURUNDI', 257, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:13:29', 10),
(37, 'BELARUS', 375, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:32:54', 10),
(38, 'CAMBODGE', 855, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:14:13', 10),
(39, 'CAMEROUN', 237, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:14:43', 10),
(40, 'CANADA', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:16:06', 10),
(41, 'CAP-VERT', 238, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:23:54', 10),
(42, 'IES CAIMANS', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:42:41', 10),
(43, 'REPUBLIQUE CENTRAFRICAINE', 236, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:32:04', 10),
(44, 'SRI LANKA', 94, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:28:42', 10),
(45, 'TCHAD', 235, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:34:50', 10),
(46, 'CHILI', 56, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:25:09', 10),
(47, 'CHINE', 86, NULL, 1, '0000-00-00 00:00:00', 0, '2017-03-02 18:13:58', 1),
(48, 'TAIWAN', 886, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:33:55', 10),
(49, 'ILE CHRISTMAS', 61, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:02:11', 10),
(50, 'ILES COCOS (KEELING)', 891, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:21:25', 10),
(51, 'COLOMBIE', 57, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:27:19', 10),
(52, 'COMORES', 269, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:28:15', 10),
(53, 'MAYOTTE', 262, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:36:08', 10),
(54, 'REPUBLIQUE DU CONGO', 242, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:15:30', 10),
(55, 'REPUBLIQUE DEMOCRATIQUE DU CONGO', 243, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:41:56', 10),
(56, 'ILES COOK', 682, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:22:44', 10),
(57, 'COSTA RICA', 506, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:00:42', 10),
(58, 'CROATIE', 385, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:02:31', 10),
(59, 'CUBA', 53, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:09:45', 10),
(60, 'CHYPRE', 357, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:25:57', 10),
(61, 'REPUBLIQUE TCHEQUE', 420, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:21:00', 10),
(62, 'BENIN', 229, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:33:36', 10),
(63, 'DANEMARK', 45, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:10:48', 10),
(64, 'DOMINIQUE', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:13:21', 10),
(65, 'REPUBLIQUE DOMINICAINE', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:10:49', 10),
(66, 'EQUATEUR', 593, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:15:22', 10),
(67, 'EL SALVADOR', 503, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:14:29', 10),
(68, 'GUINEE EQUATORIALE', 240, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:28:01', 10),
(69, 'ETHIOPIE', 251, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:51:56', 10),
(70, 'ERYTHREE', 291, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:16:12', 10),
(71, 'ESTONIE', 372, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:50:15', 10),
(72, 'ILES FEROE', 298, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:23:30', 10),
(73, 'ILES (MALVINAS) FALKLAND', 500, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:16:53', 10),
(74, 'GEORGIE DU SUD ET LES ILES SANDWICH DU SUD', 500, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:58:40', 10),
(75, 'FIDJI', 679, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:54:27', 10),
(76, 'FINLANDE', 358, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:55:05', 10),
(77, 'ILES ALAND', 358, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:20:09', 10),
(78, 'GUYANE FRANCAISE', 594, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:31:47', 10),
(79, 'POLYNESIE FRANCAISE', 689, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 18:18:49', 10),
(80, 'TERRES AUSTRALES FRANCAISES', 262, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:36:01', 10),
(81, 'DJIBOUTI', 253, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:11:32', 10),
(82, 'GABON', 241, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:55:51', 10),
(83, 'GEORGIE', 995, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:10:37', 10),
(84, 'GAMBIE', 220, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:56:37', 10),
(85, 'TERRITOIRE PALESTINIEN OCCUPE', 970, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:39:18', 10),
(86, 'ALLEMAGNE', 49, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:30:10', 10),
(87, 'GHANA', 233, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:59:29', 10),
(88, 'GIBRALTAR', 350, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:00:21', 10),
(89, 'KIRIBATI', 686, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:07:37', 10),
(90, 'GRECE', 30, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:26:40', 10),
(91, 'GROENLAND', 299, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:07:49', 10),
(92, 'GRENADE', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:03:01', 10),
(93, 'GUADELOUPE', 590, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:08:44', 10),
(94, 'GUAM', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:09:22', 10),
(95, 'GUATEMALA', 502, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:10:19', 10),
(96, 'GUYANA', 594, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:33:40', 10),
(97, 'HAITI', 509, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:30:50', 10),
(98, 'ILES HEARD ET MCDONALD', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:24:43', 10),
(99, 'SAINT-SIEGE (ETAT DE LA CITE DU VATICAN)', 379, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:15:26', 10),
(100, 'HONDURAS', 504, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:37:37', 10),
(101, 'HONG-KONG', 852, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:38:48', 10),
(102, 'HONGRIE', 36, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 18:40:05', 10),
(103, 'ISLANDE', 354, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:34:13', 10),
(104, 'INDE', 91, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:30:42', 10),
(105, 'INDONESIE', 62, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:33:06', 10),
(106, 'REPUBLIQUE ISLAMIQUE D\\\'IRAN', 98, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:16:59', 10),
(107, 'IRAQ', 964, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:31:31', 10),
(108, 'IRLANDE', 353, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:33:24', 10),
(109, 'ISRAEL', 972, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:34:57', 10),
(110, 'ITALIE', 39, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:52:21', 10),
(111, 'COTE D\\\'IVOIRE', 225, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:01:34', 10),
(112, 'JAMAIQUE', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-14 17:30:05', 10),
(113, 'JAPON', 81, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-14 17:30:51', 10),
(114, 'KAZAKHSTAN', 7, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-14 17:36:59', 10),
(115, 'JORDANIE', 962, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-14 17:31:37', 10),
(116, 'KENYA', 254, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:05:36', 10),
(117, 'REPUBLIQUE POPULAIRE DEMOCRATIQUE DE COREE', 850, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:18:37', 10),
(118, 'REPUBLIQUE DE COREE', 82, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:33:32', 10),
(119, 'KOWEIT', 965, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:34:25', 10),
(120, 'KIRGHIZISTAN', 996, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:06:45', 10),
(121, 'REPUBLIQUE DEMOCRATIQUE POPULAIRE LAO', 856, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 17:48:33', 10),
(122, 'LIBAN', 961, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:11:11', 10),
(123, 'LESOTHO', 266, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:08:50', 10),
(124, 'LETTONIE', 371, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:09:58', 10),
(125, 'LIBERIA', 231, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:35:39', 10),
(127, 'LIECHTENSTEIN', 423, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:13:30', 10),
(128, 'LITUANIE', 370, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:17:21', 10),
(129, 'LUXEMBOURG', 352, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:19:35', 10),
(130, 'MACAO', 853, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:21:08', 10),
(131, 'MADAGASCAR', 261, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:22:19', 10),
(132, 'MALAWI', 265, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:30:24', 10),
(133, 'MALAISIE', 60, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:27:47', 10),
(134, 'MALDIVES', 960, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 15:32:36', 10),
(135, 'MALI', 223, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:30:27', 10),
(136, 'MALTE', 356, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:31:05', 10),
(137, 'MARTINIQUE', 596, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:33:23', 10),
(138, 'MAURITANIE', 222, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:34:59', 10),
(139, 'MAURICE', 230, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:34:11', 10),
(140, 'MEXIQUE', 52, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:36:49', 10),
(141, 'MONACO', 377, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:37:41', 10),
(142, 'MONGOLIE', 976, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:38:29', 10),
(143, 'REPUBLIQUE DE MOLDOVA', 373, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:35:43', 10),
(144, 'MONTSERRAT', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:40:22', 10),
(145, 'MAROC', 212, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:32:18', 10),
(146, 'MOZAMBIQUE', 258, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:41:30', 10),
(147, 'OMAN', 968, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 14:59:29', 10),
(148, 'NAMIBIE', 264, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:44:24', 10),
(149, 'NAURU', 674, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:45:47', 10),
(150, 'NEPAL', 977, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:37:51', 10),
(151, 'PAYS-BAS', 31, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:14:41', 10),
(153, 'ARUBA', 297, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:56:24', 10),
(154, 'NOUVELLE-CALEDONIE', 687, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:43:40', 10),
(155, 'VANUATU', 678, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:52:08', 10),
(156, 'NOUVELLE-ZELANDE', 64, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:45:40', 10),
(157, 'NICARAGUA', 505, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-19 16:48:44', 10),
(158, 'NIGER', 227, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 14:58:29', 10),
(159, 'NIGERIA', 234, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:39:08', 10),
(160, 'NIUE', 683, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:40:34', 10),
(161, 'ILE NORFOLK', 672, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:14:35', 10),
(162, 'NORVEGE', 47, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:42:24', 10),
(163, 'ILES MARIANNES DU NORD', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:26:25', 10),
(164, 'ILES MINEURES ELOIGNEES DES ETATS-UNIS', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:28:58', 10),
(165, 'ETATS FEDERES DE MICRONESIE', 691, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:51:13', 10),
(166, 'ILES MARSHALL', 692, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:27:34', 10),
(167, 'PALAOS', 680, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:04:20', 10),
(168, 'PAKISTAN', 92, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:02:37', 10),
(169, 'PANAMA', 507, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:10:58', 10),
(170, 'PAPOUASIE-NOUVELLE-GUINEE', 675, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:49:20', 10),
(171, 'PARAGUAY', 595, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:12:56', 10),
(172, 'PEROU', 51, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 18:17:38', 10),
(173, 'PHILIPPINES', 63, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:16:55', 10),
(174, 'PITCAIRN', 64, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:17:57', 10),
(175, 'POLOGNE', 48, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:20:12', 10),
(176, 'PORTUGAL', 351, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:26:08', 10),
(177, 'GUINEE-BISSAU', 245, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:29:14', 10),
(178, 'TIMOR-LESTE', 670, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:45:05', 10),
(179, 'PORTO RICO', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:23:56', 10),
(180, 'QATAR', 974, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:28:38', 10),
(181, 'REUNION', 262, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:21:51', 10),
(182, 'ROUMANIE', 40, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:22:58', 10),
(183, 'FEDERATION DE RUSSIE', 7, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:53:43', 10),
(184, 'RWANDA', 250, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:25:15', 10),
(185, 'SAINTE-HELENE', 290, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:19:06', 10),
(186, 'SAINT-KITTS-ET-NEVIS', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:31:32', 10),
(187, 'ANGUILLA', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:34:46', 10),
(188, 'SAINTE-LUCIE', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:19:41', 10),
(189, 'SAINT-PIERRE-ET-MIQUELON', 508, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:55:04', 10),
(190, 'SAINT-VINCENT-ET-LES GRENADINES', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:17:59', 10),
(191, 'SAINT-MARIN', 378, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:54:11', 10),
(192, 'SAO TOME-ET-PRINCIPE', 239, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:21:34', 10),
(193, 'ARABIE SAOUDITE', 966, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:53:36', 10),
(194, 'SENEGAL', 221, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:22:19', 10),
(195, 'SEYCHELLES', 248, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:23:57', 10),
(196, 'SINGAPOUR', 65, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:25:20', 10),
(197, 'SLOVAQUIE', 421, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:26:09', 10),
(198, 'VIET NAM', 84, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:53:08', 10),
(199, 'SLOVENIE', 386, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:26:39', 10),
(200, 'SOMALIE', 252, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:27:20', 10),
(201, 'AFRIQUE DU SUD', 27, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 15:26:20', 10),
(202, 'ZIMBABWE', 263, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:55:40', 10),
(203, 'ESPAGNE', 34, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 17:27:04', 10),
(204, 'SAHARA OCCIDENTAL', 212, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:28:11', 10),
(205, 'SOUDAN', 249, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:27:53', 10),
(206, 'SURINAME', 597, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:30:21', 10),
(207, 'SVALBARD ETELE JAN MAYEN', 47, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:31:21', 10),
(208, 'SWAZILAND', 268, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:31:42', 10),
(209, 'SUEDE', 46, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:29:14', 10),
(210, 'SUISSE', 41, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:29:52', 10),
(211, 'REPUBLIQUE ARABE SYRIENNE', 963, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:30:33', 10),
(212, 'TADJIKISTAN', 992, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:32:16', 10),
(213, 'THAILANDE', 66, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:43:14', 10),
(214, 'TOGO', 228, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:45:34', 10),
(215, 'TOKELAU', 690, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:46:52', 10),
(216, 'TONGA', 676, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:47:22', 10),
(217, 'TRINITE-ET-TOBAGO', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:48:09', 10),
(219, 'TUNISIE', 216, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:48:33', 10),
(220, 'TURQUIE', 90, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:49:57', 10),
(221, 'TURKMENISTAN', 993, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:49:12', 10),
(222, 'ILES TURKS ET CAIQUES', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 16:10:45', 10),
(223, 'TUVALU', 688, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:50:22', 10),
(224, 'OUGANDA', 256, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 15:01:17', 10),
(225, 'UKRAINE', 380, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:50:50', 10),
(226, 'MACEDOINE', 389, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:36:35', 10),
(228, 'ROYAUME-UNI', 44, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-20 18:23:59', 10),
(229, 'ILE DE MAN', 44, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-13 14:09:44', 10),
(230, 'TANZANIE', 255, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:34:24', 10),
(231, 'ETATS-UNIS', 1, NULL, 1, '0000-00-00 00:00:00', 0, '2017-03-02 17:23:11', 1),
(232, 'BURKINA FASO', 226, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-12 16:12:45', 10),
(233, 'URUGUAY', 598, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:51:21', 10),
(234, 'OUZBEKISTAN', 998, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-11 17:47:10', 10),
(235, 'VENEZUELA', 58, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:52:36', 10),
(236, 'WALLIS ET FUTUNA', 681, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:53:46', 10),
(237, 'SAMOA', 685, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:20:15', 10),
(238, 'YEMEN', 967, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:54:42', 10),
(239, 'SERBIE-ET-MONTENEGRO', 381, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:23:21', 10),
(240, 'ZAMBIE', 260, NULL, 1, '0000-00-00 00:00:00', 0, '2017-07-26 13:55:12', 10),
(241, 'ALBANI', 1, NULL, 0, '2020-08-13 17:43:26', 1, '2020-08-14 09:17:34', 1),
(242, 'Guinsenegal', 113, 2, 0, '2021-11-01 10:38:38', 1, '2021-11-01 10:40:46', 1),
(243, 'Kkk', 85, 1, 0, '2021-11-08 14:14:25', 1, '2021-11-08 14:14:31', 1);

-- --------------------------------------------------------

--
-- Structure de la table `prefectures`
--

CREATE TABLE `prefectures` (
  `id` int(11) NOT NULL,
  `regionId` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `code` varchar(5) DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `prefectures`
--

INSERT INTO `prefectures` (`id`, `regionId`, `libelle`, `code`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 1, 'MATOTO', '31', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:38:43', 28),
(2, 1, 'RATOMA', '34', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:43:19', 28),
(3, 3, 'KINDIA', '18', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:29:25', 28),
(4, 7, 'SIGUIRI', '35', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:43:52', 28),
(5, 2, 'BOKE', '03', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:15:40', 28),
(6, 8, 'N\'ZÉREKORÉ', '32', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:41:51', 28),
(7, 7, 'KANKAN', '16', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:27:55', 28),
(8, 5, 'Labé', '23', 1, '0000-00-00 00:00:00', 0, '2021-03-30 14:16:58', 1),
(9, 4, 'MAMOU', '28', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:36:23', 28),
(10, 8, 'GUÉCKEDOU', '14', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:26:40', 28),
(11, 8, 'MACENTA', '26', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:35:07', 28),
(12, 6, 'KISSIDOUGOU', '19', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:30:40', 28),
(13, 3, 'TELEMELE', '36', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:44:25', 28),
(14, 4, 'PITA', '33', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:42:39', 28),
(15, 6, 'FARANAH', '10', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:21:37', 28),
(16, 3, 'DUBREKA', '09', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:19:07', 28),
(17, 1, 'DIXINN', '08', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:18:29', 28),
(18, 7, 'KÉROUANÉ', '17', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:28:35', 28),
(19, 1, 'MATAM', '30', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:38:09', 28),
(20, 8, 'BEYLA', '01', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:15:09', 28),
(21, 5, 'MALI', '27', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:35:41', 28),
(22, 3, 'COYAH', '04', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:16:07', 28),
(23, 7, 'MANDIANA', '29', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:37:30', 28),
(24, 7, 'KOUROUSSA', '22', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:32:02', 28),
(25, 3, 'FORÉCARIAH', '11', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:22:18', 28),
(26, 2, 'BOFFA', '02', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:10:05', 28),
(27, 8, 'LOLA', '25', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:34:35', 28),
(28, 2, 'GAOUAL', '13', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:24:16', 28),
(29, 6, 'DABOLA', '05', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:16:33', 28),
(30, 4, 'DALABA', '06', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:17:04', 28),
(31, 6, 'DINGUIRAYE', '07', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:17:58', 28),
(32, 5, 'LÉLOUMA', '24', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:33:41', 28),
(33, 1, 'KALOUM', '15', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:27:11', 28),
(34, 8, 'YOMOU', '38', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:48:34', 28),
(35, 2, 'FRIA', '12', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:23:23', 28),
(36, 5, 'TOUGUÉ', '37', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:46:09', 28),
(37, 2, 'KOUNDARA', '21', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:31:33', 28),
(38, 5, 'KOUBIA', '20', 1, '0000-00-00 00:00:00', 0, '2021-01-07 17:31:03', 28),
(41, 102, 'Bourg-en-Bresse', '99', 1, '2017-01-23 20:21:32', 1, '2017-01-23 20:21:32', 1),
(42, 89, 'Laon', '99', 1, '2017-01-23 20:21:32', 1, '2017-01-23 20:21:32', 1),
(43, 21, 'Moulins', '99', 1, '2017-01-23 20:21:32', 1, '2017-01-23 20:21:32', 1),
(44, 96, 'Digne', '99', 1, '2017-01-23 20:21:32', 1, '2017-01-23 20:21:32', 1),
(45, 99, 'Gap', '99', 1, '2017-01-23 20:21:32', 1, '2017-01-23 20:21:32', 1),
(46, 97, 'Nice', '99', 1, '2017-01-23 20:21:32', 1, '2017-01-23 20:21:32', 1),
(47, 103, 'Privas', '99', 1, '2017-01-23 20:21:32', 1, '2017-01-23 20:21:32', 1),
(48, 41, 'Charleville-Mézières', '99', 1, '2017-01-23 20:21:33', 1, '2017-01-23 20:21:33', 1),
(49, 73, 'Foix', '99', 1, '2017-01-23 20:21:33', 1, '2017-01-23 20:21:33', 1),
(50, 42, 'Troyes', '99', 1, '2017-01-23 20:21:33', 1, '2017-01-23 20:21:33', 1),
(51, 61, 'Carcassonne', '99', 1, '2017-01-23 20:21:33', 1, '2017-01-23 20:21:33', 1),
(52, 74, 'Rodez', '99', 1, '2017-01-23 20:21:33', 1, '2017-01-23 20:21:33', 1),
(53, 98, 'Marseille', '99', 1, '2017-01-23 20:21:33', 1, '2017-01-23 20:21:33', 1),
(54, 25, 'Caen', '99', 1, '2017-01-23 20:21:33', 1, '2017-01-23 20:21:33', 1),
(55, 22, 'Aurillac', '99', 1, '2017-01-23 20:21:33', 1, '2017-01-23 20:21:33', 1),
(56, 92, 'Angoulême', '99', 1, '2017-01-23 20:21:33', 1, '2017-01-23 20:21:33', 1),
(57, 93, 'La Rochelle', '99', 1, '2017-01-23 20:21:34', 1, '2017-01-23 20:21:34', 1),
(58, 35, 'Bourges', '99', 1, '2017-01-23 20:21:34', 1, '2017-01-23 20:21:34', 1),
(59, 66, 'Tulle', '99', 1, '2017-01-23 20:21:34', 1, '2017-01-23 20:21:34', 1),
(60, 45, 'AJACCIO', '99', 1, '2017-01-23 20:21:34', 1, '2020-08-14 11:20:38', 1),
(61, 46, 'Bastia', '99', 1, '2017-01-23 20:21:34', 1, '2017-01-23 20:21:34', 1),
(62, 27, 'Dijon', '99', 1, '2017-01-23 20:21:34', 1, '2017-01-23 20:21:34', 1),
(63, 31, 'Saint-Brieuc', '99', 1, '2017-01-23 20:21:34', 1, '2017-01-23 20:21:34', 1),
(64, 67, 'Guéret', '99', 1, '2017-01-23 20:21:34', 1, '2017-01-23 20:21:34', 1),
(65, 16, 'Périgueux', '99', 1, '2017-01-23 20:21:34', 1, '2017-01-23 20:21:34', 1),
(66, 47, 'Besançon', '99', 1, '2017-01-23 20:21:34', 1, '2017-01-23 20:21:34', 1),
(67, 104, 'Valence', '99', 1, '2017-01-23 20:21:35', 1, '2017-01-23 20:21:35', 1),
(68, 51, 'Évreux', '99', 1, '2017-01-23 20:21:35', 1, '2017-01-23 20:21:35', 1),
(69, 36, 'Chartres', '99', 1, '2017-01-23 20:21:35', 1, '2017-01-23 20:21:35', 1),
(70, 32, 'Quimper', '99', 1, '2017-01-23 20:21:35', 1, '2017-01-23 20:21:35', 1),
(71, 62, 'Nîmes', '99', 1, '2017-01-23 20:21:35', 1, '2017-01-23 20:21:35', 1),
(72, 76, 'Toulouse', '99', 1, '2017-01-23 20:21:35', 1, '2017-01-23 20:21:35', 1),
(73, 75, 'Auch', '99', 1, '2017-01-23 20:21:35', 1, '2017-01-23 20:21:35', 1),
(74, 17, 'Bordeaux', '99', 1, '2017-01-23 20:21:35', 1, '2017-01-23 20:21:35', 1),
(75, 63, 'Montpellier', '99', 1, '2017-01-23 20:21:35', 1, '2017-01-23 20:21:35', 1),
(76, 33, 'Rennes', '99', 1, '2017-01-23 20:21:35', 1, '2017-01-23 20:21:35', 1),
(77, 37, 'Châteauroux', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(78, 38, 'Tours', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(79, 106, 'Grenoble', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(80, 49, 'Lons-le-Saunier', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(81, 18, 'Mont-de-Marsan', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(82, 40, 'Blois', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(83, 107, 'Saint-Étienne', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(84, 23, 'Le Puy-en-Velay', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(85, 84, 'Nantes', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(86, 39, 'Orléans', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(87, 78, 'Cahors', '99', 1, '2017-01-23 20:21:36', 1, '2017-01-23 20:21:36', 1),
(88, 19, 'Agen', '', 1, '2017-01-23 20:21:37', 1, '2021-11-01 14:02:36', 1),
(89, 64, 'Mende', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(90, 85, 'Angers', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(91, 83, 'Saint-Lô', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(92, 44, 'Châlons-en-Champagne', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(93, 43, 'Chaumont', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(94, 86, 'Laval', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(95, 69, 'Nancy', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(96, 70, 'Bar-le-Duc', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(97, 34, 'Vannes', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(98, 71, 'Metz', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(99, 28, 'Nevers', '99', 1, '2017-01-23 20:21:37', 1, '2017-01-23 20:21:37', 1),
(100, 81, 'Lille', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(101, 90, 'Beauvais', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(102, 26, 'Alençon', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(103, 82, 'Arras', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(104, 24, 'Clermont-Ferrand', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(105, 20, 'Pau', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(106, 77, 'Tarbes', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(107, 65, 'Perpignan', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(108, 14, 'Strasbourg', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(109, 15, 'Colmar', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(110, 108, 'Lyon', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(111, 48, 'Vesoul', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(112, 29, 'Mâcon', '99', 1, '2017-01-23 20:21:38', 1, '2017-01-23 20:21:38', 1),
(113, 87, 'Le Mans', '99', 1, '2017-01-23 20:21:39', 1, '2017-01-23 20:21:39', 1),
(114, 109, 'Chambéry', '99', 1, '2017-01-23 20:21:39', 1, '2017-01-23 20:21:39', 1),
(116, 55, 'Paris', '99', 1, '2017-01-23 20:21:39', 1, '2017-01-23 20:21:39', 1),
(117, 52, 'Rouen', '99', 1, '2017-01-23 20:21:39', 1, '2017-01-23 20:21:39', 1),
(118, 56, 'Melun', '99', 1, '2017-01-23 20:21:39', 1, '2017-01-23 20:21:39', 1),
(119, 60, 'Versailles', '99', 1, '2017-01-23 20:21:39', 1, '2017-01-23 20:21:39', 1),
(121, 94, 'Niort', '99', 1, '2017-01-23 20:24:20', 1, '2017-01-23 20:24:20', 1),
(122, 91, 'Amiens', '99', 1, '2017-01-23 20:24:20', 1, '2017-01-23 20:24:20', 1),
(123, 79, 'ALBI', '99', 1, '2017-01-23 20:24:20', 1, '2020-08-14 11:24:58', 1),
(124, 80, 'Montauban', '99', 1, '2017-01-23 20:24:20', 1, '2017-01-23 20:24:20', 1),
(125, 100, 'Toulon', '99', 1, '2017-01-23 20:24:20', 1, '2017-01-23 20:24:20', 1),
(126, 101, 'Avignon', '99', 1, '2017-01-23 20:24:21', 1, '2017-01-23 20:24:21', 1),
(127, 88, 'La Roche-sur-Yon', '99', 1, '2017-01-23 20:24:21', 1, '2017-01-23 20:24:21', 1),
(128, 95, 'Poitiers', '99', 1, '2017-01-23 20:24:21', 1, '2017-01-23 20:24:21', 1),
(129, 68, 'Limoges', '99', 1, '2017-01-23 20:24:21', 1, '2017-01-23 20:24:21', 1),
(130, 72, 'Épinal', '99', 1, '2017-01-23 20:24:21', 1, '2017-01-23 20:24:21', 1),
(131, 30, 'Auxerre', '99', 1, '2017-01-23 20:24:21', 1, '2017-01-23 20:24:21', 1),
(132, 50, 'Belfort', '99', 1, '2017-01-23 20:24:21', 1, '2017-01-23 20:24:21', 1),
(133, 53, 'Évry', '99', 1, '2017-01-23 20:24:22', 1, '2017-01-23 20:24:22', 1),
(134, 54, 'Nanterre', '99', 1, '2017-01-23 20:24:22', 1, '2017-01-23 20:24:22', 1),
(135, 57, 'Bobigny', '99', 1, '2017-01-23 20:24:22', 1, '2017-01-23 20:24:22', 1),
(136, 58, 'Créteil', '99', 1, '2017-01-23 20:24:22', 1, '2017-01-23 20:24:22', 1),
(137, 59, 'Pontoise', '99', 1, '2017-01-23 20:24:22', 1, '2017-01-23 20:24:22', 1),
(138, 110, 'Beijing', '99', 1, '2017-02-12 11:51:39', 1, '2017-02-12 11:51:39', 1),
(139, 114, 'Melbourne', '99', 1, '2017-03-10 18:52:39', 1, '2017-03-10 18:52:39', 1),
(140, 116, 'Maryland', '99', 1, '2017-03-10 18:58:10', 1, '2017-03-10 18:58:10', 1),
(141, 118, 'New York', '99', 1, '2017-03-13 18:04:44', 1, '2017-03-13 18:04:44', 1),
(142, 113, 'Luanda', '99', 1, '2017-03-13 18:56:00', 1, '2017-03-13 18:56:00', 1),
(143, 119, 'Hambourg', '99', 1, '2017-03-13 19:03:17', 1, '2017-03-13 19:03:17', 1),
(144, 60, 'Porcheville', '99', 1, '2017-03-13 19:09:47', 1, '2017-03-13 19:09:47', 1),
(145, 120, 'Luxembourg', '99', 1, '2017-03-24 22:15:49', 1, '2017-03-24 22:15:49', 1),
(146, 121, 'Kilite', '99', 1, '2017-08-17 17:35:23', 1, '2017-08-17 17:35:23', 1),
(147, 122, 'Bourokh', '99', 1, '2017-08-18 10:08:16', 1, '2017-08-18 10:08:16', 1),
(148, 123, 'AtildeAti', '99', 0, '2017-09-17 19:30:15', 1, '2021-01-07 19:05:06', 1),
(150, 141, 'World', '99', 1, '2020-04-28 23:21:31', 1, '2020-04-28 23:21:31', 1),
(151, 140, 'Spagn', '99', 1, '2020-04-28 23:23:45', 1, '2020-04-28 23:23:45', 1),
(152, 137, 'Lebo', '99', 1, '2020-04-28 23:52:07', 1, '2020-04-28 23:52:07', 1),
(153, 130, 'Ares', '99', 1, '2020-04-29 00:00:42', 1, '2020-04-29 00:00:42', 1),
(154, 142, 'Helsinki', '99', 1, '2020-05-01 12:33:41', 1, '2020-05-01 12:33:41', 1),
(155, 1, 'RATOM', '02', 0, '2020-08-14 11:17:00', 1, '2020-08-14 11:18:10', 1),
(156, 6, 'Bali', '', 0, '2021-11-01 13:50:28', 1, '2021-11-01 14:02:59', 1);

-- --------------------------------------------------------

--
-- Structure de la table `prestations`
--

CREATE TABLE `prestations` (
  `id` int(11) NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `modePaiement` enum('annuel','mensuel','modulaire','journalière','hebdomadaire') NOT NULL,
  `duree` int(11) DEFAULT NULL,
  `uniteDuree` enum('mois','semaine','jour','heure','modules','an') NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `prestations`
--

INSERT INTO `prestations` (`id`, `libelle`, `modePaiement`, `duree`, `uniteDuree`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 'Informatique', 'hebdomadaire', 3, 'semaine', 0, '2023-10-20 21:03:04', 5, '2023-10-20 21:29:32', 5),
(2, 'Informatique', 'modulaire', 2, 'semaine', 1, '2023-10-21 10:01:32', 5, '2023-10-21 10:01:32', 5),
(3, 'Cantine ', 'mensuel', 1, 'mois', 1, '2023-10-21 10:02:37', 5, '2023-10-21 18:15:29', 5),
(4, 'Cours', 'mensuel', 1, 'mois', 1, '2023-10-21 15:24:54', 5, '2023-10-21 15:24:54', 5),
(5, 'Documentation', 'annuel', 1, 'an', 1, '2023-10-21 15:33:02', 5, '2023-10-21 15:33:02', 5),
(6, 'Transport', 'mensuel', 1, 'mois', 1, '2023-10-21 15:34:48', 5, '2023-10-21 15:34:48', 5),
(7, 'Sport', 'mensuel', 1, 'mois', 1, '2023-10-21 18:26:29', 5, '2023-10-21 18:26:29', 5),
(8, 'Bibliothèque', 'mensuel', 1, 'mois', 1, '2023-10-21 18:39:50', 5, '2023-10-21 18:39:50', 5);

-- --------------------------------------------------------

--
-- Structure de la table `privileges`
--

CREATE TABLE `privileges` (
  `id` int(11) NOT NULL,
  `menuId` int(11) DEFAULT NULL,
  `ongletId` int(11) DEFAULT NULL,
  `groupeId` int(11) NOT NULL,
  `modeAccesId` int(11) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `privileges`
--

INSERT INTO `privileges` (`id`, `menuId`, `ongletId`, `groupeId`, `modeAccesId`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(68, 5, NULL, 2, 1, 1, '2022-04-25 12:19:26', 51, '2022-04-25 12:19:26', 51),
(69, 5, NULL, 2, 3, 1, '2022-04-25 12:19:44', 51, '2022-04-25 12:19:44', 51),
(72, 2, NULL, 11, 5, 1, '2022-04-25 12:31:23', 51, '2022-04-25 12:31:23', 51),
(78, 7, NULL, 2, 4, 1, '2022-04-27 16:11:19', 51, '2022-04-27 16:11:19', 51),
(79, 1, NULL, 2, 4, 1, '2022-04-27 16:11:39', 51, '2022-04-27 16:11:39', 51),
(80, 3, NULL, 2, 4, 1, '2022-04-27 16:11:56', 51, '2022-04-27 16:11:56', 51),
(82, 2, NULL, 2, 18, 1, '2022-04-25 12:31:23', 51, '2022-04-25 12:31:23', 51),
(84, 2, NULL, 2, 3, 1, '2022-04-25 12:31:23', 51, '2022-04-25 12:31:23', 51),
(85, NULL, NULL, 9, 5, 1, '2022-05-06 16:41:13', 51, '2022-05-06 16:41:13', 51),
(87, 20, NULL, 2, 5, 1, '2022-05-06 17:06:13', 51, '2022-05-06 17:06:13', 51),
(88, 21, NULL, 2, 4, 1, '2022-05-06 17:06:30', 51, '2022-05-06 17:06:30', 51),
(89, 22, NULL, 2, 2, 1, '2022-05-06 17:06:45', 51, '2022-05-06 17:06:45', 51),
(90, 23, NULL, 2, 2, 1, '2022-05-06 17:06:59', 51, '2022-05-06 17:06:59', 51),
(91, 24, NULL, 2, 5, 1, '2022-05-06 17:07:13', 51, '2022-05-06 17:07:13', 51),
(92, 25, NULL, 2, 5, 1, '2022-05-10 10:38:06', 51, '2022-05-10 10:38:06', 51),
(93, 26, NULL, 2, 5, 1, '2022-05-10 10:54:12', 51, '2022-05-10 10:54:12', 51),
(94, 27, NULL, 2, 5, 1, '2022-05-10 10:54:48', 51, '2022-05-10 10:54:48', 51),
(95, 30, NULL, 2, 5, 1, '2022-05-10 11:04:41', 51, '2022-05-10 11:04:41', 51),
(96, 28, NULL, 2, 5, 1, '2022-05-10 11:06:23', 51, '2022-05-10 11:06:23', 51),
(97, 29, NULL, 2, 5, 1, '2022-05-10 11:06:48', 51, '2022-05-10 11:06:48', 51),
(98, 32, NULL, 2, 5, 1, '2022-05-10 11:22:28', 51, '2022-05-10 11:22:28', 51),
(99, 31, NULL, 2, 4, 1, '2022-05-10 11:24:36', 51, '2022-05-10 11:24:36', 51),
(101, 33, NULL, 2, 2, 1, '2022-05-10 11:28:56', 51, '2022-05-10 11:28:56', 51),
(102, 35, NULL, 2, 2, 1, '2022-05-10 11:30:43', 51, '2022-05-10 11:30:43', 51),
(103, 36, NULL, 2, 2, 1, '2022-05-10 11:32:07', 51, '2022-05-10 11:32:07', 51),
(104, 37, NULL, 2, 5, 1, '2022-05-10 11:32:55', 51, '2022-05-10 11:32:55', 51),
(105, 38, NULL, 2, 2, 1, '2022-05-10 11:34:04', 51, '2022-05-10 11:34:04', 51),
(106, 38, NULL, 2, 5, 1, '2022-05-10 12:01:20', 51, '2022-05-10 12:01:20', 51),
(107, 39, NULL, 2, 2, 1, '2022-05-10 12:05:08', 51, '2022-05-10 12:05:08', 51),
(108, 40, NULL, 2, 2, 1, '2022-05-10 12:06:11', 51, '2022-05-10 12:06:11', 51),
(109, 41, NULL, 2, 2, 1, '2022-05-10 12:07:14', 51, '2022-05-10 12:07:14', 51),
(110, 42, NULL, 2, 3, 1, '2022-05-10 12:10:15', 51, '2022-05-10 12:10:15', 51),
(111, 42, NULL, 2, 2, 1, '2022-05-10 12:11:51', 51, '2022-05-10 12:11:51', 51),
(112, 43, NULL, 2, 5, 1, '2022-05-10 12:12:23', 51, '2022-05-10 12:12:23', 51),
(113, 43, NULL, 2, 19, 1, '2022-05-10 12:12:40', 51, '2022-05-10 12:12:40', 51),
(114, 44, NULL, 2, 5, 1, '2022-05-10 12:13:54', 51, '2022-05-10 12:13:54', 51),
(115, 45, NULL, 2, 1, 1, '2022-05-10 12:16:48', 51, '2022-05-10 12:16:48', 51),
(117, 47, NULL, 2, 1, 1, '2022-05-10 12:19:19', 51, '2022-05-10 12:19:19', 51),
(118, 26, 16, 2, 5, 1, '2022-05-10 16:49:55', 51, '2022-05-10 16:49:55', 51),
(119, 26, 17, 2, 2, 1, '2022-05-10 16:51:17', 51, '2022-05-10 16:51:17', 51),
(120, 27, 19, 2, 5, 1, '2022-05-10 16:54:08', 51, '2022-05-10 16:54:08', 51),
(121, 26, 18, 2, 2, 1, '2022-05-11 09:32:44', 51, '2022-05-11 09:32:44', 51),
(122, 26, 20, 2, 2, 1, '2022-05-11 09:36:38', 51, '2022-05-11 09:36:38', 51),
(123, 26, 21, 2, 2, 1, '2022-05-11 09:45:05', 51, '2022-05-11 09:45:05', 51),
(124, 27, 22, 2, 2, 1, '2022-05-11 09:52:51', 51, '2022-05-11 09:52:51', 51),
(125, 31, 23, 2, 19, 1, '2022-05-11 09:55:53', 51, '2022-05-11 09:55:53', 51),
(126, 31, 24, 2, 2, 1, '2022-05-11 09:57:41', 51, '2022-05-11 09:57:41', 51),
(127, 31, 25, 2, 2, 1, '2022-05-11 10:00:10', 51, '2022-05-11 10:00:10', 51),
(128, 33, 26, 2, 2, 1, '2022-05-11 10:00:55', 51, '2022-05-11 10:00:55', 51),
(129, 33, 27, 2, 19, 1, '2022-05-11 10:01:34', 51, '2022-05-11 10:01:34', 51),
(130, 33, 28, 2, 2, 1, '2022-05-11 10:02:12', 51, '2022-05-11 10:02:12', 51),
(131, 34, 29, 2, 2, 1, '2022-05-11 10:03:23', 51, '2022-05-11 10:03:23', 51),
(142, 27, 40, 2, 5, 1, '2022-05-11 15:00:58', 51, '2022-05-11 15:00:58', 51),
(143, 27, 41, 2, 5, 1, '2022-05-11 15:02:06', 51, '2022-05-11 15:02:06', 51),
(144, 48, NULL, 2, 5, 1, '2022-05-11 16:16:38', 51, '2022-05-11 16:16:38', 51),
(145, 34, 42, 2, 5, 1, '2022-05-11 16:50:17', 51, '2022-05-11 16:50:17', 51),
(146, 49, 43, 2, 5, 1, '2022-05-11 17:36:33', 51, '2022-05-11 17:36:33', 51),
(147, 49, 44, 2, 5, 1, '2022-05-11 17:37:16', 51, '2022-05-11 17:37:16', 51),
(148, 31, 24, 2, 4, 1, '2022-05-26 10:53:33', 51, '2022-05-26 10:53:33', 51),
(150, 31, 24, 2, 5, 1, '2022-05-26 11:42:10', 51, '2022-05-26 11:42:10', 51),
(151, 31, 25, 2, 1, 1, '2022-05-26 11:48:01', 51, '2022-05-26 11:48:01', 51),
(152, 31, 25, 2, 5, 1, '2022-05-26 11:48:25', 51, '2022-05-26 11:48:25', 51),
(153, 33, 28, 2, 1, 1, '2022-05-26 15:21:54', 51, '2022-05-26 15:21:54', 51),
(154, 33, 28, 2, 3, 1, '2022-05-26 15:34:41', 51, '2022-05-26 15:34:41', 51),
(155, 33, 27, 2, 5, 1, '2022-05-27 13:13:39', 51, '2022-05-27 13:13:39', 51),
(156, 28, NULL, 9, 4, 1, '2022-06-02 16:09:22', 51, '2022-06-02 16:09:22', 51),
(157, 31, NULL, 9, 1, 1, '2022-06-02 16:10:31', 51, '2022-06-02 16:10:31', 51),
(160, 54, NULL, 9, 4, 1, '2022-06-03 09:47:23', 51, '2022-06-03 09:47:23', 51),
(161, 55, NULL, 9, 1, 1, '2022-06-03 09:47:58', 51, '2022-06-03 09:47:58', 51),
(165, NULL, 30, 2, 4, 1, '2022-06-07 12:21:43', 51, '2022-06-07 12:21:43', 51),
(166, NULL, 32, 2, 5, 1, '2022-06-07 12:22:01', 51, '2022-06-07 12:22:01', 51),
(167, NULL, 34, 2, 5, 1, '2022-06-07 12:22:18', 51, '2022-06-07 12:22:18', 51),
(168, NULL, 33, 2, 5, 1, '2022-06-07 12:22:35', 51, '2022-06-07 12:22:35', 51),
(169, NULL, 38, 2, 5, 1, '2022-06-07 12:22:51', 51, '2022-06-07 12:22:51', 51),
(170, NULL, 39, 2, 5, 1, '2022-06-07 12:23:17', 51, '2022-06-07 12:23:17', 51),
(171, NULL, 37, 2, 5, 1, '2022-06-07 12:24:01', 51, '2022-06-07 12:24:01', 51),
(172, NULL, 30, 2, 5, 1, '2022-06-07 16:35:21', 51, '2022-06-07 16:35:21', 51),
(173, NULL, 20, 2, 5, 1, '2022-06-09 11:09:07', 51, '2022-06-09 11:09:07', 51),
(174, NULL, 18, 2, 5, 1, '2022-06-13 15:30:45', 51, '2022-06-13 15:30:45', 51),
(175, NULL, 21, 2, 5, 1, '2022-06-13 16:20:13', 51, '2022-06-13 16:20:13', 51),
(176, 54, NULL, 2, 5, 1, '2022-06-09 14:44:37', 51, '2022-06-09 14:44:37', 51),
(177, 55, NULL, 2, 5, 1, '2022-06-09 14:42:25', 51, '2022-06-09 14:42:25', 51),
(178, 57, NULL, 2, 5, 1, '2022-06-27 12:26:54', 51, '2022-06-27 12:26:54', 51),
(179, 58, NULL, 2, 5, 1, '2022-06-27 12:30:21', 51, '2022-06-27 12:30:21', 51),
(180, 57, 49, 2, 5, 1, '2022-06-27 12:40:47', 51, '2022-06-27 12:40:47', 51),
(181, 57, 50, 2, 5, 1, '2022-06-27 12:44:29', 51, '2022-06-27 12:44:29', 51),
(182, 58, 52, 2, 5, 1, '2022-06-27 12:48:43', 51, '2022-06-27 12:48:43', 51),
(183, 58, 52, 2, 5, 1, '2022-06-27 13:06:28', 51, '2022-06-27 13:06:28', 51),
(184, 34, 53, 2, 5, 1, '2022-06-27 13:30:21', 51, '2022-06-27 13:30:21', 51),
(185, 34, 30, 2, 5, 1, '2022-07-01 11:49:36', 51, '2022-07-01 11:49:36', 51),
(186, 60, NULL, 2, 5, 1, '2022-08-12 18:05:07', 1, '2022-08-12 18:05:07', 1),
(188, 64, NULL, 2, 5, 1, '2022-08-12 16:52:44', 51, '2022-08-12 16:52:44', 51),
(189, 65, NULL, 2, 5, 1, '2022-08-12 16:53:06', 51, '2022-08-12 16:53:06', 51),
(190, 67, NULL, 2, 5, 1, '2022-08-12 16:53:22', 51, '2022-08-12 16:53:22', 51),
(191, 68, NULL, 2, 5, 1, '2022-08-12 16:53:36', 51, '2022-08-12 16:53:36', 51),
(193, NULL, 54, 2, 5, 1, '2022-08-17 12:22:12', 51, '2022-08-17 12:22:12', 51),
(194, NULL, 57, 2, 5, 1, '2022-08-17 12:28:03', 51, '2022-08-17 12:28:03', 51),
(195, NULL, 55, 2, 5, 1, '2022-08-17 12:28:33', 51, '2022-08-17 12:28:33', 51),
(196, NULL, 56, 2, 5, 1, '2022-08-17 12:28:47', 51, '2022-08-17 12:28:47', 51),
(198, NULL, 61, 2, 5, 1, '2022-08-17 14:05:46', 51, '2022-08-17 14:05:46', 51),
(199, NULL, 59, 2, 5, 1, '2022-08-17 14:05:58', 51, '2022-08-17 14:05:58', 51),
(201, NULL, 67, 2, 5, 1, '2022-08-17 14:15:29', 51, '2022-08-17 14:15:29', 51),
(202, NULL, 65, 2, 5, 1, '2022-08-17 14:15:50', 51, '2022-08-17 14:15:50', 51),
(203, NULL, 66, 2, 5, 1, '2022-08-17 14:16:08', 51, '2022-08-17 14:16:08', 51),
(204, NULL, 64, 2, 5, 1, '2022-08-17 14:16:34', 51, '2022-08-17 14:16:34', 51),
(205, NULL, 62, 2, 5, 1, '2022-08-17 14:16:51', 51, '2022-08-17 14:16:51', 51),
(206, NULL, 63, 2, 5, 1, '2022-08-17 14:17:05', 51, '2022-08-17 14:17:05', 51),
(207, NULL, 70, 2, 5, 1, '2022-08-17 14:24:26', 51, '2022-08-17 14:24:26', 51),
(209, NULL, 69, 2, 5, 1, '2022-08-17 14:25:01', 51, '2022-08-17 14:25:01', 51),
(210, NULL, 76, 2, 5, 1, '2022-08-28 16:18:39', 51, '2022-08-28 16:18:39', 51),
(211, 70, NULL, 2, 5, 1, '2022-08-29 22:24:01', 51, '2022-08-29 22:24:01', 51),
(212, NULL, 80, 2, 5, 1, '2022-09-06 11:34:03', 51, '2022-09-06 11:34:03', 51),
(213, NULL, 75, 2, 5, 1, '2022-09-07 10:30:49', 51, '2022-09-07 10:30:49', 51),
(214, NULL, 71, 2, 5, 1, '2022-09-07 10:31:03', 51, '2022-09-07 10:31:03', 51),
(215, NULL, 72, 2, 5, 1, '2022-09-07 10:31:14', 51, '2022-09-07 10:31:14', 51),
(216, NULL, 73, 2, 5, 1, '2022-09-07 10:31:41', 51, '2022-09-07 10:31:41', 51),
(217, NULL, 74, 2, 5, 1, '2022-09-07 10:31:57', 51, '2022-09-07 10:31:57', 51),
(218, NULL, 77, 2, 5, 1, '2022-09-10 14:14:29', 51, '2022-09-10 14:14:29', 51),
(219, NULL, 78, 2, 5, 1, '2022-09-10 14:14:48', 51, '2022-09-10 14:14:48', 51),
(220, NULL, 79, 2, 5, 1, '2022-09-10 14:15:07', 51, '2022-09-10 14:15:07', 51),
(221, 72, NULL, 2, 5, 1, '2022-09-12 11:09:29', 51, '2022-09-12 11:09:29', 51),
(222, NULL, 81, 2, 5, 1, '2022-09-12 12:08:52', 51, '2022-09-12 12:08:52', 51),
(223, NULL, 82, 2, 5, 1, '2022-09-12 12:09:08', 51, '2022-09-12 12:09:08', 51),
(224, 73, NULL, 2, 5, 1, '2022-09-19 18:10:09', 51, '2022-09-19 18:10:09', 51),
(225, NULL, 83, 2, 5, 1, '2022-09-19 19:06:50', 51, '2022-09-19 19:06:50', 51),
(227, 74, NULL, 2, 5, 1, '2022-09-19 20:07:23', 51, '2022-09-19 20:07:23', 51),
(228, NULL, 86, 2, 5, 1, '2022-09-20 08:57:52', 51, '2022-09-20 08:57:52', 51),
(230, 75, NULL, 2, 5, 1, '2022-09-23 13:05:30', 51, '2022-09-23 13:05:30', 51),
(231, NULL, 87, 2, 5, 1, '2022-09-26 15:11:27', 51, '2022-09-26 15:11:27', 51),
(234, 69, NULL, 2, 1, 1, '2022-09-28 10:09:41', 51, '2022-09-28 10:09:41', 51),
(235, 69, NULL, 2, 5, 1, '2022-09-28 10:10:31', 51, '2022-09-28 10:10:31', 51),
(236, 19, NULL, 2, 4, 1, '2022-09-29 15:02:49', 51, '2022-09-29 15:02:49', 51),
(237, NULL, 89, 2, 5, 1, '2022-09-30 13:09:10', 51, '2022-09-30 13:09:10', 51),
(238, NULL, NULL, 2, 5, 1, '2022-10-11 14:36:11', 1, '2022-10-11 14:36:11', 1),
(239, 76, NULL, 2, 4, 1, '2022-10-11 12:38:17', 51, '2022-10-11 12:38:17', 51),
(240, 77, NULL, 2, 5, 1, '2022-10-11 15:05:02', 51, '2022-10-11 15:05:02', 51),
(241, 78, NULL, 2, 5, 1, '2022-10-25 14:28:41', 51, '2022-10-25 14:28:41', 51),
(242, 79, NULL, 2, 5, 1, '2022-10-25 14:48:16', 51, '2022-10-25 14:48:16', 51),
(243, NULL, 90, 2, 5, 1, '2022-10-26 11:14:47', 51, '2022-10-26 11:14:47', 51),
(244, NULL, 91, 2, 5, 1, '2022-10-26 11:15:01', 51, '2022-10-26 11:15:01', 51),
(245, NULL, 92, 2, 5, 1, '2022-10-26 11:15:14', 51, '2022-10-26 11:15:14', 51),
(246, NULL, 93, 2, 5, 1, '2022-10-27 12:20:46', 51, '2022-10-27 12:20:46', 51),
(247, NULL, 94, 2, 5, 1, '2022-10-27 12:21:11', 51, '2022-10-27 12:21:11', 51),
(248, NULL, 95, 2, 5, 1, '2022-10-27 12:21:28', 51, '2022-10-27 12:21:28', 51),
(249, NULL, 60, 2, 5, 1, '2022-11-15 10:19:49', 51, '2022-11-15 10:19:49', 51),
(250, NULL, 68, 2, 5, 1, '2022-11-15 10:56:04', 51, '2022-11-15 10:56:04', 51),
(251, NULL, 85, 2, 3, 1, '2022-11-15 11:04:51', 51, '2022-11-15 11:04:51', 51),
(252, NULL, 85, 2, 5, 1, '2022-11-15 11:05:17', 51, '2022-11-15 11:05:17', 51),
(253, NULL, 88, 2, 5, 1, '2022-11-15 11:28:26', 51, '2022-11-15 11:28:26', 51),
(254, NULL, 84, 2, 2, 1, '2022-11-15 11:55:49', 51, '2022-11-15 11:55:49', 51),
(255, NULL, 84, 2, 5, 1, '2022-11-15 11:57:40', 51, '2022-11-15 11:57:40', 51),
(256, NULL, 96, 2, 5, 1, '2022-11-29 10:45:30', 51, '2022-11-29 10:45:30', 51),
(257, 61, NULL, 2, 5, 1, '2022-12-02 11:08:09', 51, '2022-12-02 11:08:09', 51),
(258, NULL, 58, 2, 4, 1, '2022-12-02 11:19:10', 51, '2022-12-02 11:19:10', 51),
(259, NULL, 58, 2, 5, 1, '2022-12-02 11:20:54', 51, '2022-12-02 11:20:54', 51),
(260, NULL, 97, 2, 5, 1, '2022-12-19 11:53:13', 51, '2022-12-19 11:53:13', 51),
(261, 80, NULL, 2, 5, 1, '2022-12-28 10:31:33', 51, '2022-12-28 10:31:33', 51),
(262, NULL, 98, 2, 5, 1, '2022-12-28 15:12:28', 51, '2022-12-28 15:12:28', 51),
(263, 81, NULL, 2, 5, 1, '2023-01-04 09:58:28', 51, '2023-01-04 09:58:28', 51),
(264, 82, NULL, 2, 5, 1, '2023-01-06 14:56:47', 51, '2023-01-06 14:56:47', 51),
(265, 83, NULL, 2, 5, 1, '2023-01-11 16:00:13', 51, '2023-01-11 16:00:13', 51),
(266, 86, NULL, 2, 5, 1, '2023-10-14 21:40:37', 1, '2023-10-14 21:40:37', 1),
(267, 87, NULL, 2, 5, 1, '2023-10-14 21:41:01', 1, '2023-10-14 21:41:01', 1),
(268, 90, NULL, 2, 4, 1, '2023-10-14 21:41:18', 1, '2023-10-14 21:41:18', 1),
(269, 96, NULL, 2, 5, 1, '2023-10-14 22:01:13', 1, '2023-10-14 22:01:13', 1),
(270, NULL, 109, 2, 5, 1, '2023-10-14 22:18:23', 1, '2023-10-14 22:18:23', 1),
(271, NULL, 111, 2, 5, 1, '2023-10-14 22:18:41', 1, '2023-10-14 22:18:41', 1),
(272, NULL, 112, 2, 5, 1, '2023-10-14 22:18:58', 1, '2023-10-14 22:18:58', 1),
(273, NULL, 110, 2, 5, 1, '2023-10-14 22:19:21', 1, '2023-10-14 22:19:21', 1),
(274, 97, NULL, 2, 5, 1, '2023-10-19 20:59:52', 5, '2023-10-19 20:59:52', 5),
(275, 98, NULL, 2, 5, 1, '2023-10-20 20:01:52', 5, '2023-10-20 20:01:52', 5),
(276, 99, NULL, 2, 4, 1, '2023-10-24 22:42:50', 5, '2023-10-24 22:42:50', 5),
(277, 100, NULL, 2, 4, 1, '2023-11-02 22:29:27', 5, '2023-11-02 22:29:27', 5),
(278, 101, NULL, 2, 4, 1, '2023-11-11 02:07:11', 5, '2023-11-11 02:07:11', 5);

-- --------------------------------------------------------

--
-- Structure de la table `quartierdistricts`
--

CREATE TABLE `quartierdistricts` (
  `id` int(11) NOT NULL,
  `communeId` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `code` varchar(5) DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `quartierdistricts`
--

INSERT INTO `quartierdistricts` (`id`, `communeId`, `libelle`, `code`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 224, 'BOULBINET', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(2, 224, 'CORONTHIE 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 16:50:33', 1),
(3, 224, 'FOTOBA', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(4, 224, 'KASSA', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(5, 224, 'KOULEWONDY', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(6, 224, 'MANQUEPAS', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(7, 224, 'SANDERVALIA', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 16:47:06', 1),
(8, 224, 'SANS - FIL', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 16:44:18', 1),
(9, 224, 'TEMINETAYE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(10, 224, 'TOMBO', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(11, 222, 'BELLE-VUE ECOLE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 16:01:59', 1),
(12, 222, 'BELLE-VUE MARCHE 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 16:26:35', 1),
(13, 222, 'CAMAYENNE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(14, 222, 'CAMEROUN', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(15, 222, 'DIXINN CENTRE 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 16:37:01', 1),
(16, 222, 'DIXINN CENTRE 2', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(17, 222, 'DIXINN GARE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(18, 222, 'DIXINN GARE RAILS', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(19, 222, 'DIXINN MOSQUEE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(20, 222, 'DIXINN PORT', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(21, 222, 'HAFIA MINIERE 2', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 16:19:30', 1),
(22, 222, 'HAFIA MOSQUEE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 16:22:37', 1),
(23, 222, 'HAFIA 1', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(24, 222, 'HAFIA 2', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(25, 222, 'KENIEN', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(26, 222, 'LANDREAH', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(27, 222, 'MINIERE CITE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 16:32:46', 1),
(28, 223, 'BONFI', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(29, 223, 'BONFI MARCHE ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(30, 223, 'BOUSSOURA ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(31, 223, 'CARRIERE CENTRE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 09:28:24', 1),
(32, 223, 'COLEAH CENTRE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 09:32:04', 1),
(33, 223, 'COLEAH CITE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(34, 223, 'COLEAH DOMINO ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(35, 223, 'COLEAH IMPRIMERIE ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(36, 223, 'HERMAKONON', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 17:00:08', 1),
(37, 223, 'LANSEBOUNDJI', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 17:02:24', 1),
(38, 223, 'MADINA CENTRE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(39, 223, 'MADINA CITE ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(40, 223, 'MADINA ECOLE ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(41, 223, 'MADINA MARCHE ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(42, 223, 'MADINA MOSQUEE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-11 17:05:41', 1),
(43, 223, 'MAFANCO', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(44, 223, 'MAFANCO CENTRE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(45, 223, 'MATAM', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(46, 223, 'MATAM LIDO ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(47, 223, 'TOUGUIWONDY', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(49, 220, 'CITE DE L\'AIR', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(50, 220, 'DABOMPA', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(51, 220, 'DABONDY ECOLE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(52, 220, 'DABONDY 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 11:37:18', 1),
(53, 220, 'DABONDY 2', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 11:38:53', 1),
(54, 220, 'BEHANZIN', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 10:34:47', 1),
(55, 220, 'DABONDY 3', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 11:39:43', 1),
(56, 220, 'DABONDY RAILS', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 11:40:19', 1),
(57, 220, 'DAR ES SALAM ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(58, 220, 'GBESSIA CENTRE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(59, 220, 'GBESSIA CITE 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 10:46:34', 1),
(60, 220, 'GBESSIA CITE 2', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 10:47:00', 1),
(61, 220, 'GBESSIA CITE 3', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 10:47:20', 1),
(62, 220, 'GBESSIA ECOLE ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(63, 220, 'GBESSIA PORT 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 10:47:57', 1),
(64, 220, 'GBESSIA PORT 2', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 10:48:19', 1),
(65, 220, 'MATOTO CENTRE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(66, 220, 'MATOTO KHABITAYA', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(67, 220, 'MATOTO MARCHE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(68, 220, 'SANGOYAH MARCHE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 11:26:25', 1),
(69, 220, 'SANGOYAH MOSQUEE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 11:27:14', 1),
(70, 220, 'KISSOSSO', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(71, 220, 'SIMBAYA 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 11:27:44', 1),
(72, 220, 'SIMBAYA 2', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 11:28:06', 1),
(73, 220, 'TANENE MARCHE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(74, 220, 'TANENE MOSQUEE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 11:33:14', 1),
(75, 220, 'TOMBOLIA', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(76, 220, 'YIMBAYA ECOLE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(78, 220, 'YIMBAYA TANNERIE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 11:36:45', 1),
(79, 221, 'DAR ES SALAM 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 12:16:50', 1),
(80, 221, 'HAMDALLAYE 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-25 13:38:09', 1),
(81, 221, 'HAMDALLAYE 2', '', 1, '0000-00-00 00:00:00', 1, '2013-09-25 13:08:17', 1),
(82, 221, 'HAMDALLAYE MOSQUEE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-25 13:39:59', 1),
(83, 221, 'KAPORO CENTRE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(84, 221, 'KAPORO RAILS', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(85, 221, 'KIPE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(86, 221, 'KOBAYA', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(87, 221, 'KOLOMA 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 12:07:25', 1),
(88, 221, 'KOLOMA 2', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 12:38:11', 1),
(89, 221, 'LAMBANDJI', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 12:37:00', 1),
(90, 221, 'NONGO TAADY', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 12:33:49', 1),
(91, 221, 'RATOMA CENTRE', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(92, 221, 'RATOMA DISPENSAIRE', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 12:31:34', 1),
(93, 221, 'SIMBAYA GARE ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(94, 221, 'SONFONIA CENTRE 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 12:30:33', 1),
(95, 221, 'SONFONIA GARE 1', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 12:22:03', 1),
(96, 221, 'TAOUYAH', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(97, 221, 'WANINDARA 2', '', 1, '0000-00-00 00:00:00', 1, '2013-09-12 12:17:47', 1),
(98, 221, 'YATTAYA ', '', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 1),
(117, 254, 'ALMAMYA I', '', 1, '2013-06-15 20:30:53', 2, '2013-09-12 11:01:19', 1),
(118, 254, 'BOLONDE I', '', 1, '2013-06-15 20:31:51', 2, '2013-09-12 11:03:22', 1),
(119, 254, 'DAR ES SALAM', '', 1, '2013-06-15 20:32:35', 2, '2013-06-15 20:32:35', 2),
(120, 254, 'DOBIRET', '', 1, '2013-06-15 20:33:18', 2, '2013-06-15 20:33:18', 2),
(121, 254, 'LAKHATA', '', 1, '2013-06-15 20:35:45', 2, '2013-06-15 20:35:45', 2),
(122, 254, 'LONKING', '', 1, '2013-06-15 20:36:54', 2, '2013-06-15 20:36:54', 2),
(123, 254, 'MARARA', '', 1, '2013-06-15 20:37:36', 2, '2013-09-12 11:00:57', 1),
(124, 254, 'SAKAMA', '', 1, '2013-06-15 20:39:08', 2, '2013-06-15 20:39:08', 2),
(125, 254, 'THIA', '', 1, '2013-06-15 20:41:27', 2, '2013-06-15 20:41:27', 2),
(126, 254, 'WALIA', '', 1, '2013-06-15 20:42:09', 2, '2013-09-12 10:58:43', 1),
(162, 225, 'BARALANDE', '', 1, '2013-06-15 23:05:56', 2, '2013-06-15 23:07:19', 2),
(163, 225, 'CORRERAH', '', 1, '2013-06-15 23:09:12', 2, '2013-06-15 23:09:12', 2),
(164, 225, 'DIBIA', '', 1, '2013-06-15 23:11:23', 2, '2013-06-15 23:11:23', 2),
(165, 225, 'DIOUMAYA', '', 1, '2013-06-15 23:13:03', 2, '2013-06-15 23:13:03', 2),
(166, 225, 'GOREYE', '', 1, '2013-06-15 23:13:45', 2, '2013-06-15 23:13:45', 2),
(167, 225, 'GUILLERE', '', 1, '2013-06-15 23:14:38', 2, '2013-06-15 23:14:38', 2),
(168, 225, 'KADIGUIRA', '', 1, '2013-06-15 23:17:20', 2, '2013-06-15 23:17:20', 2),
(169, 225, 'KOUGNEWADE', '', 1, '2013-06-15 23:19:18', 2, '2013-09-22 16:37:32', 1),
(170, 225, 'KOULIFANYA', '', 1, '2013-06-15 23:19:52', 2, '2013-06-15 23:19:52', 2),
(171, 225, 'MADINA', '', 1, '2013-06-15 23:26:20', 2, '2013-06-15 23:26:20', 2),
(172, 225, 'TOMBOYA', '', 1, '2013-06-15 23:28:21', 2, '2013-06-15 23:28:21', 2),
(173, 225, 'WAKRYA', '', 1, '2013-06-15 23:29:15', 2, '2013-06-15 23:29:15', 2),
(174, 225, 'YOMBAYA', '', 1, '2013-06-15 23:29:49', 2, '2013-09-22 15:47:58', 1),
(188, 225, 'KASSONGONI', '', 1, '2013-06-15 23:40:02', 2, '2013-06-15 23:40:02', 2),
(237, 225, 'SANSALE CENTRE', '', 1, '2013-06-16 00:07:20', 2, '2013-06-16 00:07:20', 2),
(259, 235, 'AVIATION I', '', 1, '2013-06-16 00:27:38', 2, '2013-09-11 16:18:38', 1),
(260, 235, 'FATALA', '', 1, '2013-06-16 00:28:11', 2, '2013-06-16 00:28:11', 2),
(261, 235, 'KATOUROU III', '', 1, '2013-06-16 00:28:36', 2, '2013-09-11 16:08:16', 1),
(262, 235, 'KOLONFIKHE', '', 1, '2013-06-16 00:29:06', 2, '2013-06-16 00:29:06', 2),
(263, 235, 'KONDEKHOURE', '', 1, '2013-06-16 00:29:49', 2, '2013-09-11 16:15:51', 1),
(264, 235, 'KOUNSIKHIMBELY', '', 1, '2013-06-16 00:30:09', 2, '2013-09-11 16:15:00', 1),
(265, 235, 'SABENDE 1', '', 1, '2013-06-16 00:30:29', 2, '2013-09-11 16:06:12', 1),
(266, 235, 'TABOSSY I', '', 1, '2013-06-16 00:31:06', 2, '2013-09-11 16:19:52', 1),
(267, 235, 'TIGUE MOSQUEE', '', 1, '2013-06-16 00:31:27', 2, '2013-09-11 16:10:28', 1),
(273, 247, 'FOULAMORY CENTRE', '', 1, '2013-06-16 00:41:12', 2, '2013-06-16 00:41:12', 2),
(274, 247, 'KANKODY', '', 1, '2013-06-16 00:41:58', 2, '2013-06-16 00:41:58', 2),
(275, 247, 'KITHIAR', '', 1, '2013-06-16 00:42:16', 2, '2013-06-16 00:42:16', 2),
(276, 246, 'HAFIA', '', 1, '2013-06-16 00:42:34', 2, '2013-06-16 00:43:07', 2),
(277, 246, 'HOUMBAYA', '', 1, '2013-06-16 00:43:38', 2, '2013-06-16 00:43:38', 2),
(278, 246, 'SINTHIOUROU', '', 1, '2013-06-16 00:44:06', 2, '2013-06-16 00:44:06', 2),
(279, 248, 'BOULLERE', '', 1, '2013-06-16 00:44:36', 2, '2013-06-16 00:44:36', 2),
(280, 248, 'DAR - ES - SALAM', '', 1, '2013-06-16 00:45:03', 2, '2013-09-12 10:21:25', 1),
(281, 248, 'GALLE DARA', '', 1, '2013-06-16 00:45:41', 2, '2013-06-16 00:45:41', 2),
(282, 249, 'NETERE', '', 1, '2013-06-16 00:46:24', 2, '2013-09-12 10:27:10', 1),
(283, 248, 'SINTHIOU WARA', '', 1, '2013-06-16 00:46:52', 2, '2013-06-16 00:46:52', 2),
(284, 248, 'MADINA', '', 1, '2013-06-16 00:47:19', 2, '2013-06-16 00:47:19', 2),
(286, 248, 'TELIRE', '', 1, '2013-06-16 00:48:17', 2, '2013-06-16 00:48:17', 2),
(287, 249, 'BHOULY', '', 1, '2013-06-16 00:49:26', 2, '2013-06-16 00:49:26', 2),
(288, 249, 'DARA BOWE', '', 1, '2013-06-16 00:51:36', 2, '2013-06-16 00:51:36', 2),
(289, 249, 'DOMBYADI', '', 1, '2013-06-16 00:51:58', 2, '2013-09-22 16:20:02', 1),
(290, 249, 'KOUMBIA  CENTRE', '', 1, '2013-06-16 00:52:16', 2, '2013-06-16 00:52:16', 2),
(291, 249, 'N\\\'DIOURIAH', '', 1, '2013-06-16 00:52:40', 2, '2013-06-16 00:52:40', 2),
(292, 249, 'PETTY', '', 1, '2013-06-16 00:53:02', 2, '2013-06-16 00:53:02', 2),
(293, 249, 'KAMELE', '', 1, '2013-06-16 00:53:28', 2, '2013-06-16 00:53:28', 2),
(294, 249, 'HAKOUNDE THIANGUI', '', 1, '2013-06-16 00:53:57', 2, '2013-09-22 16:08:57', 1),
(295, 249, 'GUIDALY', '', 1, '2013-06-16 00:54:28', 2, '2013-06-16 00:54:28', 2),
(296, 249, 'MADINA GUILEDYI', '', 1, '2013-06-16 00:54:48', 2, '2013-06-16 00:54:48', 2),
(297, 249, 'KEMBERA', '', 1, '2013-06-16 00:55:40', 2, '2013-06-16 00:55:40', 2),
(298, 249, 'MADINA BOWE', '', 1, '2013-06-16 00:56:28', 2, '2013-06-16 00:56:28', 2),
(299, 250, 'BOUKOUNA', '', 1, '2013-06-16 00:57:25', 2, '2013-06-16 00:57:25', 2),
(300, 250, 'HIMAYA', '', 1, '2013-06-16 00:57:47', 2, '2013-06-16 00:57:47', 2),
(301, 250, 'DENGUETERI', '', 1, '2013-06-16 00:58:23', 2, '2013-06-16 00:58:23', 2),
(302, 250, 'KOUNSITEL CENTRE', '', 1, '2013-06-16 00:59:05', 2, '2013-06-16 00:59:05', 2),
(303, 251, 'DOGHI DABHI', '', 1, '2013-06-16 00:59:43', 2, '2013-09-12 10:32:01', 1),
(304, 251, 'GOUNGOUROUN', '', 1, '2013-06-16 01:00:30', 2, '2013-06-16 01:00:30', 2),
(305, 251, 'MALANTA CENTRE', '', 1, '2013-06-16 01:01:35', 2, '2013-06-16 01:01:35', 2),
(306, 252, 'BITTING', '', 1, '2013-06-16 01:02:01', 2, '2013-06-16 01:02:01', 2),
(307, 252, 'KALIA', '', 1, '2013-06-16 01:04:25', 2, '2013-06-16 01:04:25', 2),
(308, 252, 'SOOLOU', '', 1, '2013-06-16 01:04:45', 2, '2013-06-16 01:04:45', 2),
(309, 252, 'TOUBA CENTRE', '', 1, '2013-06-16 01:05:03', 2, '2013-06-16 01:05:03', 2),
(310, 252, 'SAALY', '', 1, '2013-06-16 01:05:31', 2, '2013-06-16 01:05:31', 2),
(311, 252, 'TAMBY', '', 1, '2013-06-16 01:06:03', 2, '2013-06-16 01:06:03', 2),
(312, 253, 'BARKERE', '', 1, '2013-06-16 01:06:34', 2, '2013-06-16 01:06:34', 2),
(313, 253, 'N\\\'DALAO', '', 1, '2013-06-16 01:06:55', 2, '2013-06-16 01:06:55', 2),
(314, 253, 'WENDOU M\\\'BOUR CENTR', '', 1, '2013-06-16 01:07:32', 2, '2013-09-12 10:44:13', 1),
(315, 253, 'TENKETA', '', 1, '2013-06-16 01:07:52', 2, '2013-06-16 01:07:52', 2),
(316, 253, 'WALINGUI', '', 1, '2013-06-16 01:08:15', 2, '2013-06-16 01:08:15', 2),
(317, 240, 'GUINGAN CENTRE', '', 1, '2013-06-16 01:09:13', 2, '2013-06-16 01:09:13', 2),
(318, 240, 'KIFFAYA', '', 1, '2013-06-16 01:09:47', 2, '2013-06-16 01:09:47', 2),
(319, 240, 'THIAGUIS', '', 1, '2013-06-16 01:10:07', 2, '2013-09-11 16:59:31', 1),
(320, 241, 'KAMABY I', '', 1, '2013-06-16 01:11:06', 2, '2013-09-11 17:05:01', 1),
(321, 241, 'SINTHIAN PATHE', '', 1, '2013-06-16 01:11:33', 2, '2013-06-16 01:11:33', 2),
(322, 239, 'ECOLE', '', 1, '2013-06-16 01:12:14', 2, '2013-06-16 01:12:14', 2),
(323, 239, 'HAFIA', '', 1, '2013-06-16 01:12:29', 2, '2013-06-16 01:12:29', 2),
(324, 239, 'HAMDALLAYE', '', 1, '2013-06-16 01:12:46', 2, '2013-09-11 16:42:24', 1),
(325, 239, 'MOSQUEE', '', 1, '2013-06-16 01:13:07', 2, '2013-06-16 01:13:07', 2),
(326, 242, 'MISSIRAH', '', 1, '2013-06-16 01:13:44', 2, '2013-09-12 09:09:23', 1),
(327, 243, 'SAREBOIDO II', '', 1, '2013-06-16 01:14:07', 2, '2013-09-12 15:06:15', 1),
(328, 243, 'KOUTTAN', '', 1, '2013-06-16 01:14:51', 2, '2013-06-16 01:14:51', 2),
(329, 243, 'SAREBOIDHO CENTRE', '', 1, '2013-06-16 01:15:10', 2, '2013-06-16 01:15:10', 2),
(331, 243, 'MAROU', '', 1, '2013-06-16 01:16:10', 2, '2013-06-16 01:16:10', 2),
(332, 244, 'BOTOMELI', '', 1, '2013-06-16 01:16:31', 2, '2013-09-12 09:45:19', 1),
(333, 244, 'TERMESSE CENTRE', '', 1, '2013-06-16 01:17:44', 2, '2013-06-16 01:17:44', 2),
(334, 244, 'KOUBIA', '', 1, '2013-06-16 01:18:09', 2, '2013-06-16 01:18:09', 2),
(335, 245, 'OURACK', '', 1, '2013-06-16 01:18:36', 2, '2013-06-16 01:18:36', 2),
(336, 245, 'YOUKOUNKOUN CENTRE', '', 1, '2013-06-16 01:18:57', 2, '2013-06-16 01:18:57', 2),
(337, 272, 'COYAH CENTRE', '', 1, '2013-06-18 17:07:27', 2, '2013-06-18 17:07:27', 2),
(338, 272, 'DOUMBOUYAH CENTRE', '', 1, '2013-06-18 17:07:50', 2, '2013-09-16 11:45:20', 1),
(339, 272, 'FILY II', '', 1, '2013-06-18 17:08:08', 2, '2013-09-16 11:53:31', 1),
(340, 272, 'KM 54', '', 1, '2013-06-18 17:08:27', 2, '2013-06-18 17:08:27', 2),
(341, 272, 'SOMAYAH CENTRE', '', 1, '2013-06-18 17:08:44', 2, '2013-09-16 11:40:45', 1),
(342, 273, 'BANGOUYAH', '', 1, '2013-06-18 17:09:14', 2, '2013-09-16 11:24:09', 1),
(343, 273, 'KOURIAH CENTRE', '', 1, '2013-06-18 17:09:57', 2, '2013-09-16 11:26:28', 1),
(344, 273, 'KOLAKHOURE', '', 1, '2013-06-18 17:10:21', 2, '2013-06-18 17:10:21', 2),
(345, 274, 'BAMBAYAH', '', 1, '2013-06-18 17:10:44', 2, '2013-09-16 12:29:45', 1),
(346, 274, 'FRIGUIADY', '', 1, '2013-06-18 17:11:23', 2, '2013-09-16 12:40:22', 1),
(349, 273, 'TANENE FIRIBADE', '', 1, '2013-06-18 17:17:36', 2, '2013-09-16 12:14:13', 1),
(350, 275, 'BALLAYAH', '', 1, '2013-06-18 17:18:09', 2, '2013-09-16 12:47:38', 1),
(351, 275, 'DONEAH', '', 1, '2013-06-18 17:18:29', 2, '2013-09-16 12:46:42', 1),
(352, 275, 'TAMBAYAH', '', 1, '2013-06-18 17:18:51', 2, '2013-09-16 12:45:43', 1),
(353, 275, 'KIRIYAH', '', 1, '2013-06-18 17:19:47', 2, '2013-09-16 12:48:32', 1),
(354, 275, 'KOUNSOUTA', '', 1, '2013-06-18 17:23:30', 2, '2013-09-16 12:50:12', 1),
(355, 275, 'KOUYEAH', '', 1, '2013-06-18 17:24:12', 2, '2013-09-16 12:49:09', 1),
(356, 275, 'MANGATA', '', 1, '2013-06-18 17:24:33', 2, '2013-06-18 17:24:33', 2),
(357, 275, 'TOGUIRON', '', 1, '2013-06-18 17:24:58', 2, '2013-06-18 17:24:58', 2),
(358, 275, 'WONKIFONG CENTRE', '', 1, '2013-06-18 17:25:46', 2, '2013-06-18 17:25:46', 2),
(359, 273, 'MORIAKHORY', '', 1, '2013-06-18 17:26:08', 2, '2013-09-16 12:15:00', 1),
(360, 277, 'BADY CENTRE', '', 1, '2013-06-18 17:27:38', 2, '2013-06-18 17:27:38', 2),
(361, 277, 'FANNABADE', '', 1, '2013-06-18 17:27:56', 2, '2013-09-17 11:05:19', 1),
(362, 277, 'MISSIDE', '', 1, '2013-06-18 17:28:20', 2, '2013-06-18 17:28:20', 2),
(363, 277, 'SAMAYAH', '', 1, '2013-06-18 17:29:18', 2, '2013-09-17 11:06:45', 1),
(364, 277, 'TONTON', '', 1, '2013-06-18 17:29:53', 2, '2013-06-18 17:29:53', 2),
(365, 277, 'YENYEN MALEAH', '', 1, '2013-06-18 17:30:18', 2, '2013-06-18 17:30:18', 2),
(366, 276, 'SAMATRAN VILLAGE', '', 1, '2013-06-18 17:30:48', 2, '2013-09-17 11:20:22', 1),
(367, 276, 'BAILOBAYA -CENTRE', '', 1, '2013-06-18 17:31:17', 2, '2013-09-17 11:16:10', 1),
(368, 276, 'GBEREIRE', '', 1, '2013-06-18 17:31:44', 2, '2013-09-17 11:17:50', 1),
(369, 276, 'DOGBERE', '', 1, '2013-06-18 17:32:26', 2, '2013-06-18 17:32:26', 2),
(371, 276, 'NEGUEYAH', '', 1, '2013-06-18 17:33:23', 2, '2013-06-18 17:33:23', 2),
(372, 276, 'TOMPETIN', '', 1, '2013-06-18 17:34:23', 2, '2013-09-17 11:12:43', 1),
(374, 278, 'FALESSADE CENTRE I', '', 1, '2013-06-18 17:35:32', 2, '2013-09-17 11:34:11', 1),
(375, 278, 'KALIFAYA', '', 1, '2013-06-18 17:36:28', 2, '2013-06-18 17:36:28', 2),
(377, 278, 'NINGUETY', '', 1, '2013-06-18 17:37:13', 2, '2013-06-18 17:37:13', 2),
(379, 279, 'BAGUEAH', '', 1, '2013-06-18 17:38:12', 2, '2013-09-17 11:37:34', 1),
(380, 279, 'GBANTAMA', '', 1, '2013-06-18 17:39:39', 2, '2013-06-18 17:39:39', 2),
(381, 279, 'KANGOLEAH', '', 1, '2013-06-18 17:40:28', 2, '2013-06-18 17:40:28', 2),
(382, 279, 'KHORIRA CENTRE', '', 1, '2013-06-18 17:40:52', 2, '2013-06-18 17:40:52', 2),
(383, 279, 'MAGNOKHOUN', '', 1, '2013-06-18 17:41:21', 2, '2013-06-18 17:41:21', 2),
(384, 279, 'SOUMAYAH', '', 1, '2013-06-18 17:43:42', 2, '2013-06-18 17:43:42', 2),
(385, 279, 'TABAN', '', 1, '2013-06-18 17:44:00', 2, '2013-06-18 17:44:00', 2),
(386, 280, 'KOROGONYAH', '', 1, '2013-06-18 17:44:58', 2, '2013-09-17 11:45:15', 1),
(387, 280, 'KOUBIA', '', 1, '2013-06-18 17:45:21', 2, '2013-06-18 17:45:21', 2),
(389, 280, 'OUASSOU CENTRE', '', 1, '2013-06-18 17:46:10', 2, '2013-06-18 17:46:10', 2),
(390, 280, 'YAFRAYAH', '', 1, '2013-06-18 17:46:34', 2, '2013-06-18 17:46:34', 2),
(391, 281, 'DEMBAYAH', '', 1, '2013-06-18 17:47:35', 2, '2013-09-17 11:52:51', 1),
(392, 281, 'FILAYA', '', 1, '2013-06-18 17:48:11', 2, '2013-06-18 17:48:11', 2),
(393, 281, 'KALETA FOTONTA', '', 1, '2013-06-18 17:48:36', 2, '2013-06-18 17:48:36', 2),
(394, 281, 'KANAGBAN', '', 1, '2013-06-18 17:49:12', 2, '2013-06-18 17:49:12', 2),
(395, 281, 'KENENDE LORY', '', 1, '2013-06-18 17:49:54', 2, '2013-06-18 17:49:54', 2),
(396, 281, 'KONDEAH', '', 1, '2013-06-18 17:50:17', 2, '2013-09-17 11:49:13', 1),
(397, 281, 'KONFONYAH', '', 1, '2013-06-18 17:50:39', 2, '2013-06-18 17:50:39', 2),
(398, 281, 'LOUMBAYA', '', 1, '2013-06-18 17:50:56', 2, '2013-06-18 17:50:56', 2),
(399, 281, 'SAMAYAH', '', 1, '2013-06-18 17:51:26', 2, '2013-06-18 17:51:26', 2),
(400, 281, 'SANAWALIA', '', 1, '2013-06-18 17:51:49', 2, '2013-06-18 17:51:49', 2),
(401, 281, 'SOGUIA', '', 1, '2013-06-18 17:52:09', 2, '2013-06-18 17:52:09', 2),
(402, 281, 'SOUBETIDE', '', 1, '2013-06-18 17:52:32', 2, '2013-06-18 17:52:32', 2),
(404, 281, 'YENOUAH', '', 1, '2013-06-18 17:58:25', 2, '2013-06-18 17:58:25', 2),
(405, 282, 'DOMIAGBE', '', 1, '2013-06-18 17:58:46', 2, '2013-09-17 12:32:52', 1),
(406, 281, 'KAWONSO', '', 1, '2013-06-18 17:59:14', 2, '2013-09-17 12:06:07', 1),
(407, 282, 'FARENYA', '', 1, '2013-06-18 18:00:38', 2, '2013-09-17 12:55:00', 1),
(408, 282, 'KAFFA', '', 1, '2013-06-18 18:01:29', 2, '2013-09-17 12:56:56', 1),
(409, 282, 'KALETA', '', 1, '2013-06-18 18:03:06', 2, '2013-06-18 18:03:06', 2),
(410, 282, 'KHAMBA', '', 1, '2013-06-18 18:03:33', 2, '2013-06-18 18:03:33', 2),
(411, 282, 'KONYEYA', '', 1, '2013-06-18 18:03:57', 2, '2013-09-17 12:08:08', 1),
(412, 282, 'MISSIRA', '', 1, '2013-06-18 18:04:30', 2, '2013-06-18 18:04:30', 2),
(413, 282, 'SIMBARAYA', '', 1, '2013-06-18 18:04:52', 2, '2013-09-17 12:30:27', 1),
(414, 282, 'TAGBE', '', 1, '2013-06-18 18:05:37', 2, '2013-06-18 18:05:37', 2),
(415, 282, 'TONDON CENTRE', '', 1, '2013-06-18 18:06:06', 2, '2013-06-18 18:06:06', 2),
(416, 282, 'YENGUISSA', '', 1, '2013-06-18 18:08:34', 2, '2013-06-18 18:08:34', 2),
(417, 284, 'ALLASOYAH CENTRE', '', 1, '2013-06-18 18:14:48', 2, '2013-06-18 18:14:48', 2),
(418, 284, 'BASSIA', '', 1, '2013-06-18 18:15:09', 2, '2013-06-18 18:15:09', 2),
(419, 284, 'DANDAYAH', '', 1, '2013-06-18 18:15:54', 2, '2013-06-18 18:15:54', 2),
(420, 284, 'DAARY', '', 1, '2013-06-18 18:16:12', 2, '2013-09-17 13:02:57', 1),
(421, 284, 'FENDEMODIAH', '', 1, '2013-06-18 18:16:34', 2, '2013-09-17 13:02:39', 1),
(423, 284, 'KOURIAH', '', 1, '2013-06-18 18:24:20', 2, '2013-06-18 18:24:20', 2),
(424, 284, 'SAFEYAH', '', 1, '2013-06-18 18:24:40', 2, '2013-06-18 18:24:40', 2),
(425, 284, 'SORY WOULAH', '', 1, '2013-06-18 18:25:31', 2, '2013-09-17 13:01:51', 1),
(426, 284, 'TABAN', '', 1, '2013-06-18 18:26:01', 2, '2013-06-18 18:26:01', 2),
(427, 284, 'TONKOYAH', '', 1, '2013-06-18 18:26:19', 2, '2013-06-18 18:26:19', 2),
(428, 285, 'BENTY CENTRE', '', 1, '2013-06-18 18:26:40', 2, '2013-06-18 18:26:40', 2),
(429, 285, 'KAKOUTOULAYE', '', 1, '2013-06-18 18:27:02', 2, '2013-06-18 18:27:02', 2),
(430, 285, 'KALEYIRE', '', 1, '2013-06-18 18:27:40', 2, '2013-09-17 14:34:46', 1),
(431, 285, 'KIGBALY', '', 1, '2013-06-18 18:28:00', 2, '2013-06-18 18:28:00', 2),
(432, 285, 'M\\\'BORO', '', 1, '2013-06-18 18:28:43', 2, '2013-06-18 18:28:43', 2),
(433, 285, 'MORKANIA', '', 1, '2013-06-18 18:29:17', 2, '2013-09-17 14:45:55', 1),
(434, 285, 'N\\\'KOMPAN', '', 1, '2013-06-18 18:29:42', 2, '2013-06-18 18:29:42', 2),
(435, 286, 'FARMOREAH CENTRE', '', 1, '2013-06-18 18:30:05', 2, '2013-09-17 14:52:42', 1),
(436, 286, 'FOROD', '', 1, '2013-06-18 18:31:53', 2, '2013-06-18 18:31:53', 2),
(437, 286, 'FORODOUGOU', '', 1, '2013-06-18 18:32:18', 2, '2013-06-18 18:32:18', 2),
(438, 286, 'KAFFOU', '', 1, '2013-06-18 18:32:45', 2, '2013-06-18 18:32:45', 2),
(439, 286, 'MALIGUIYAGBE', '', 1, '2013-06-18 18:33:05', 2, '2013-09-17 15:04:23', 1),
(440, 286, 'MOOLA', '', 1, '2013-06-18 18:33:37', 2, '2013-09-17 14:58:08', 1),
(441, 286, 'PAMELAP', '', 1, '2013-06-18 18:33:58', 2, '2013-06-18 18:33:58', 2),
(442, 286, 'TAIGBE', '', 1, '2013-06-18 18:34:21', 2, '2013-06-18 18:34:21', 2),
(443, 283, 'FATAKO I', '', 1, '2013-06-18 18:34:46', 2, '2013-09-17 15:11:47', 1),
(444, 283, 'KOUTOUMANIAH', '', 1, '2013-06-18 18:36:11', 2, '2013-09-17 15:12:33', 1),
(445, 283, 'TATAGUI I', '', 1, '2013-06-18 18:39:06', 2, '2013-09-17 15:07:53', 1),
(448, 287, 'MATAKANG', '', 1, '2013-06-18 18:41:07', 2, '2013-06-18 18:41:07', 2),
(450, 288, 'KAITE', '', 1, '2013-06-18 18:42:00', 2, '2013-09-17 15:37:01', 1),
(451, 288, 'MENYIRE', '', 1, '2013-06-18 18:42:54', 2, '2013-06-18 18:42:54', 2),
(452, 288, 'TAOUYAH', '', 1, '2013-06-18 18:45:13', 2, '2013-06-18 18:46:12', 2),
(453, 289, 'KALIAH CENTRE', '', 1, '2013-06-18 18:45:43', 2, '2013-06-20 08:55:38', 2),
(454, 289, 'GBERIKA', '', 1, '2013-06-18 18:48:21', 2, '2013-09-17 15:38:59', 1),
(455, 289, 'BOKARIAH', '', 1, '2013-06-18 18:49:25', 2, '2013-06-18 18:50:17', 2),
(456, 289, 'KALEMODIAGBE', '', 1, '2013-06-18 18:50:55', 2, '2013-09-17 15:38:11', 1),
(458, 289, 'MABALA', '', 1, '2013-06-18 18:52:15', 2, '2013-06-18 18:52:15', 2),
(459, 289, 'TANAH', '', 1, '2013-06-18 18:52:49', 2, '2013-06-18 18:52:49', 2),
(460, 290, 'FANDIE', '', 1, '2013-06-18 18:53:11', 2, '2013-06-18 18:53:50', 2),
(461, 290, 'GBEREIRE', '', 1, '2013-06-18 18:54:15', 2, '2013-06-18 18:54:15', 2),
(462, 290, 'KOKET', '', 1, '2013-06-18 18:54:34', 2, '2013-09-17 15:20:32', 1),
(463, 283, 'MADINA', '', 1, '2013-06-18 18:54:55', 2, '2013-09-17 15:16:20', 1),
(464, 290, 'MAFERENYAH CENTRE I', '', 1, '2013-06-18 18:55:20', 2, '2013-09-17 15:44:53', 1),
(465, 290, 'MALEAH', '', 1, '2013-06-18 18:56:13', 2, '2013-09-17 15:17:51', 1),
(466, 286, 'MORIBAYAH', '', 1, '2013-06-18 18:56:38', 2, '2013-06-18 18:56:38', 2),
(467, 291, 'GANIAH', '', 1, '2013-06-18 18:57:46', 2, '2013-09-17 15:50:45', 1),
(468, 291, 'KAMALAYAH', '', 1, '2013-06-18 18:58:38', 2, '2013-09-17 15:28:55', 1),
(469, 291, 'KOFFION', '', 1, '2013-06-18 18:59:10', 2, '2013-09-17 15:18:52', 1),
(470, 291, 'LAYAH', '', 1, '2013-06-18 18:59:43', 2, '2013-06-18 18:59:43', 2),
(472, 291, 'SANTIKA', '', 1, '2013-06-18 19:00:56', 2, '2013-06-18 19:00:56', 2),
(473, 291, 'TASSEEN', '', 1, '2013-06-18 19:01:18', 2, '2013-09-17 15:51:32', 1),
(475, 292, 'DALLONYA', '', 1, '2013-06-18 19:02:02', 2, '2013-09-17 14:22:44', 1),
(476, 292, 'LEFOURE', '', 1, '2013-06-18 19:02:20', 2, '2013-06-18 19:02:20', 2),
(477, 292, 'SANTIGUIYAH', '', 1, '2013-06-18 19:02:52', 2, '2013-06-18 19:02:52', 2),
(479, 292, 'SIKHOUROU CENTRE', '', 1, '2013-06-18 19:03:54', 2, '2013-06-18 19:03:54', 2),
(480, 263, 'BANGOUYAH CENTRE', '', 1, '2013-06-18 19:13:43', 2, '2013-06-18 19:13:43', 2),
(481, 263, 'DAMOUYA', '', 1, '2013-06-18 19:14:07', 2, '2013-06-18 19:14:07', 2),
(482, 263, 'KEBALY', '', 1, '2013-06-18 19:15:03', 2, '2013-06-18 19:15:03', 2),
(483, 263, 'KEBEFRIGUIA', '', 1, '2013-06-18 19:15:35', 2, '2013-09-17 16:00:57', 1),
(484, 263, 'KEREBA', '', 1, '2013-06-18 19:15:58', 2, '2013-06-18 19:15:58', 2),
(485, 263, 'KHATTIA', '', 1, '2013-06-18 19:16:24', 2, '2013-06-18 19:16:24', 2),
(486, 263, 'MADINA DIAN', '', 1, '2013-06-18 19:16:50', 2, '2013-06-18 19:16:50', 2),
(487, 263, 'MINYAYA', '', 1, '2013-06-18 19:17:26', 2, '2013-06-18 19:17:26', 2),
(488, 263, 'MISSIRA', '', 1, '2013-06-18 19:18:16', 2, '2013-06-18 19:18:16', 2),
(490, 263, 'SOKIA', '', 1, '2013-06-18 19:19:30', 2, '2013-06-18 19:19:30', 2),
(491, 263, 'WARAKHALAN', '', 1, '2013-06-18 19:19:51', 2, '2013-06-18 19:19:51', 2),
(492, 263, 'WOLEA', '', 1, '2013-06-18 19:20:29', 2, '2013-09-17 16:07:08', 1),
(493, 263, 'YATTAYA', '', 1, '2013-06-18 19:20:55', 2, '2013-06-18 19:20:55', 2),
(494, 264, 'BARENFORY', '', 1, '2013-06-18 19:21:54', 2, '2013-06-18 19:21:54', 2),
(495, 264, 'DAMAKANIA CENTRE', '', 1, '2013-06-18 19:22:18', 2, '2013-09-17 16:27:14', 1),
(496, 264, 'FOULAYA CITE', '', 1, '2013-06-18 19:22:41', 2, '2013-06-18 19:22:41', 2),
(497, 264, 'MADINA LAYA', '', 1, '2013-06-18 19:23:03', 2, '2013-06-18 19:23:03', 2),
(498, 264, 'GBEREAKHORY', '', 1, '2013-06-18 19:23:40', 2, '2013-06-18 19:23:40', 2),
(499, 264, 'KOMOYAH', '', 1, '2013-06-18 19:24:12', 2, '2013-09-17 16:24:43', 1),
(500, 264, 'SAMOREYAH', '', 1, '2013-06-18 19:26:12', 2, '2013-09-17 16:29:28', 1),
(501, 265, 'DABOYA', '', 1, '2013-06-18 19:26:37', 2, '2013-06-18 19:26:37', 2),
(502, 265, 'FRIGUIAGBE GARE', '', 1, '2013-06-18 19:27:04', 2, '2013-06-18 19:27:04', 2),
(503, 265, 'FRIGUIAGBE II', '', 1, '2013-06-18 19:27:34', 2, '2013-09-17 16:36:25', 1),
(504, 265, 'GARAYA KHORY', '', 1, '2013-06-18 19:28:53', 2, '2013-06-18 19:28:53', 2),
(505, 265, 'KINYAYA', '', 1, '2013-06-18 19:29:17', 2, '2013-06-18 19:29:17', 2),
(506, 265, 'KOLIAGBE', '', 1, '2013-06-18 19:29:46', 2, '2013-09-17 16:17:16', 1),
(507, 265, 'TEMBAYA', '', 1, '2013-06-18 19:30:28', 2, '2013-06-18 19:30:28', 2),
(508, 262, 'ABATTOIR 1', '', 1, '2013-06-18 19:30:53', 2, '2013-09-17 16:41:10', 1),
(509, 262, 'BAMBAN', '', 1, '2013-06-18 19:31:30', 2, '2013-06-18 19:31:30', 2),
(510, 262, 'BAMBAYA', '', 1, '2013-06-18 19:32:14', 2, '2013-06-18 19:32:14', 2),
(511, 262, 'BANLIEUE', '', 1, '2013-06-18 19:32:33', 2, '2013-09-23 15:57:46', 1),
(512, 262, 'BENDOUGOU', '', 1, '2013-06-18 19:33:06', 2, '2013-06-18 19:33:06', 2),
(513, 262, 'BOKARIA', '', 1, '2013-06-18 19:33:39', 2, '2013-06-18 19:33:39', 2),
(515, 262, 'CARAVANSERAIL', '', 1, '2013-06-18 19:34:23', 2, '2013-06-18 19:34:23', 2),
(517, 262, 'FISSA ECOLE', '', 1, '2013-06-18 19:35:15', 2, '2013-09-17 16:44:43', 1),
(518, 262, 'GANGAN', '', 1, '2013-06-18 19:36:02', 2, '2013-06-18 19:36:02', 2),
(520, 262, 'GARE', '', 1, '2013-06-18 19:36:56', 2, '2013-06-18 19:36:56', 2),
(522, 262, 'KAALY', '', 1, '2013-06-18 19:37:45', 2, '2013-06-18 19:37:45', 2),
(524, 262, 'KENENDE', '', 1, '2013-06-18 19:39:18', 2, '2013-06-18 19:39:18', 2),
(525, 262, 'KOBA-PASTORIA', '', 1, '2013-06-18 19:39:39', 2, '2013-09-17 17:11:20', 1),
(526, 262, 'KOLIADY 2', '', 1, '2013-06-18 19:40:25', 2, '2013-09-17 17:09:24', 1),
(527, 262, 'KONDETA', '', 1, '2013-06-18 19:41:00', 2, '2013-06-18 19:41:00', 2),
(528, 262, 'KOUMBAYA', '', 1, '2013-06-18 19:41:21', 2, '2013-06-18 19:41:21', 2),
(529, 262, 'MANQUEPAS T.P', '', 1, '2013-06-18 19:41:45', 2, '2013-09-17 16:52:31', 1),
(530, 262, 'NERIBILY', '', 1, '2013-06-18 19:42:10', 2, '2013-06-18 19:42:10', 2),
(531, 262, 'SARAKOLEAH', '', 1, '2013-06-18 19:42:32', 2, '2013-09-17 17:02:12', 1),
(532, 262, 'SEGUEYA', '', 1, '2013-06-18 19:42:59', 2, '2013-06-18 19:42:59', 2),
(533, 262, 'TABOUNA', '', 1, '2013-06-18 19:43:39', 2, '2013-06-18 19:43:39', 2),
(534, 262, 'TAFORY ALMAMIYA', '', 1, '2013-06-18 19:44:00', 2, '2013-09-17 17:04:33', 1),
(535, 262, 'TANENE KELA', '', 1, '2013-06-18 19:44:20', 2, '2013-06-18 19:44:20', 2),
(536, 262, 'TATAGUI', '', 1, '2013-06-18 19:44:44', 2, '2013-06-18 19:44:44', 2),
(537, 262, 'THIERNO DJIBYA', '', 1, '2013-06-18 19:45:13', 2, '2013-09-17 17:07:15', 1),
(538, 262, 'WONDI', '', 1, '2013-06-18 19:45:39', 2, '2013-09-17 17:05:58', 1),
(539, 262, 'YEWOLE', '', 1, '2013-06-18 19:46:05', 2, '2013-09-17 15:13:41', 1),
(540, 266, 'BOUNDOUBANTAN', '', 1, '2013-06-18 19:46:33', 2, '2013-09-17 17:53:37', 1),
(541, 266, 'DABONFARI', '', 1, '2013-06-18 19:47:22', 2, '2013-09-17 17:50:57', 1),
(542, 266, 'GANIA', '', 1, '2013-06-18 19:47:44', 2, '2013-06-18 19:47:44', 2),
(543, 266, 'KABELEYA', '', 1, '2013-06-18 19:48:28', 2, '2013-06-18 19:48:28', 2),
(544, 266, 'KIRITA', '', 1, '2013-06-18 19:48:50', 2, '2013-06-18 19:48:50', 2),
(546, 266, 'KH&Ouml;N&Ouml;YA', '', 1, '2013-06-18 19:49:44', 2, '2013-09-17 17:56:47', 1),
(547, 266, 'MISSIDE', '', 1, '2013-06-18 19:50:21', 2, '2013-09-17 17:42:03', 1),
(548, 266, 'SIGUITON', '', 1, '2013-06-18 19:50:46', 2, '2013-06-18 19:50:46', 2),
(549, 266, 'THIEWERE', '', 1, '2013-06-18 19:51:22', 2, '2013-06-18 19:52:03', 2),
(550, 266, 'WALIA', '', 1, '2013-06-18 19:52:33', 2, '2013-06-18 19:52:33', 2),
(552, 267, 'DAR-ES-SALAM', '', 1, '2013-06-18 19:53:27', 2, '2013-09-17 18:19:13', 1),
(553, 267, 'KOLAKHOURE', '', 1, '2013-06-18 19:54:21', 2, '2013-06-18 19:54:21', 2),
(554, 267, 'MADINA I', '', 1, '2013-06-18 19:54:46', 2, '2013-09-17 18:21:29', 1),
(555, 267, 'MADINA II', '', 1, '2013-06-18 19:55:17', 2, '2013-09-17 18:23:03', 1),
(556, 267, 'SAFERIN', '', 1, '2013-06-18 19:56:04', 2, '2013-06-18 19:56:04', 2),
(557, 267, 'BAS-SIMBARAYA', '', 1, '2013-06-18 19:56:37', 2, '2013-09-17 18:23:38', 1),
(558, 267, 'SOULEMANIA', '', 1, '2013-06-18 19:57:04', 2, '2013-09-17 18:29:34', 1),
(559, 267, 'TELIKO', '', 1, '2013-06-18 19:57:57', 2, '2013-06-18 19:57:57', 2),
(561, 268, 'BOURAMAYA', '', 1, '2013-06-18 19:59:05', 2, '2013-06-18 19:59:05', 2),
(562, 268, 'DEBELE', '', 1, '2013-06-18 20:02:58', 2, '2013-06-18 20:02:58', 2),
(563, 268, 'FOMAH', '', 1, '2013-06-18 20:03:23', 2, '2013-09-17 18:33:34', 1),
(564, 268, 'FOSSIKHOURE', '', 1, '2013-06-18 20:04:00', 2, '2013-06-18 20:04:00', 2),
(565, 268, 'FRIGUIADI', '', 1, '2013-06-18 20:04:29', 2, '2013-09-17 18:33:24', 1),
(567, 268, 'MAMBIA CENTRE', '', 1, '2013-06-18 20:05:28', 2, '2013-06-18 20:05:28', 2),
(568, 269, 'SEFAN', '', 1, '2013-06-18 20:06:17', 2, '2013-09-17 18:39:39', 1),
(569, 268, 'TANENE', '', 1, '2013-06-18 20:07:23', 2, '2013-09-17 18:31:00', 1),
(570, 269, 'BAKHAYAKHORY II', '', 1, '2013-06-18 20:07:48', 2, '2013-09-17 18:37:06', 1),
(571, 269, 'MOLOTA I', '', 1, '2013-06-18 20:11:30', 2, '2013-09-17 18:36:13', 1),
(572, 269, 'YIMBERING', '', 1, '2013-06-18 20:12:21', 2, '2013-06-18 20:12:21', 2),
(573, 270, 'COMOYA', '', 1, '2013-06-18 20:13:03', 2, '2013-06-18 20:13:03', 2),
(574, 270, 'DENKI - MADINA', '', 1, '2013-06-18 20:13:23', 2, '2013-09-17 18:45:30', 1),
(575, 270, 'KAPORO', '', 1, '2013-06-18 20:13:50', 2, '2013-06-18 20:13:50', 2),
(576, 270, 'YATTIAKHORY', '', 1, '2013-06-18 20:14:10', 2, '2013-09-17 18:41:51', 1),
(577, 270, 'CONDOYA', '', 1, '2013-06-18 20:14:38', 2, '2013-09-17 18:46:00', 1),
(578, 270, 'WALIA', '', 1, '2013-06-18 20:15:04', 2, '2013-09-17 18:40:48', 1),
(579, 270, 'SAMAYA CENTRE', '', 1, '2013-06-18 20:15:21', 2, '2013-06-18 20:15:21', 2),
(580, 266, 'WOLIA', '', 1, '2013-06-18 20:15:39', 2, '2013-09-17 17:49:39', 1),
(581, 271, 'DJANFOU', '', 1, '2013-06-18 20:16:26', 2, '2013-06-18 20:16:26', 2),
(582, 271, 'SOUGUETA II', '', 1, '2013-06-18 20:17:25', 2, '2013-09-18 09:32:44', 1),
(583, 271, 'GUEMESSORON', '', 1, '2013-06-18 20:17:47', 2, '2013-06-18 20:17:47', 2),
(584, 271, 'SANGOYAH', '', 1, '2013-06-18 20:18:32', 2, '2013-09-18 09:38:08', 1),
(585, 271, 'KOUYEYAH', '', 1, '2013-06-18 20:19:09', 2, '2013-09-18 09:40:09', 1),
(586, 271, 'LEMBOU', '', 1, '2013-06-18 20:19:32', 2, '2013-06-18 20:19:32', 2),
(587, 271, 'LINSAN I', '', 1, '2013-06-18 20:19:56', 2, '2013-09-18 09:35:06', 1),
(588, 271, 'TAFORY', '', 1, '2013-06-18 20:20:27', 2, '2013-06-18 20:20:27', 2),
(589, 271, 'WOLIA', '', 1, '2013-06-18 20:20:51', 2, '2013-09-18 09:40:51', 1),
(590, 271, 'YALAYA', '', 1, '2013-06-18 20:21:08', 2, '2013-06-18 20:21:08', 2),
(591, 305, 'MABHE', '', 1, '2013-06-18 21:36:23', 2, '2013-06-18 21:36:23', 2),
(592, 305, 'SILATI', '', 1, '2013-06-18 21:36:45', 2, '2013-06-18 21:36:45', 2),
(593, 305, 'TARIHOYE CENTRE', '', 1, '2013-06-18 21:37:05', 2, '2013-06-18 21:37:05', 2),
(594, 306, 'LABHANDIAN', '', 1, '2013-06-18 21:37:45', 2, '2013-09-17 10:34:58', 1),
(595, 306, 'N\\\'DIRE', '', 1, '2013-06-18 21:38:03', 2, '2013-06-18 21:38:03', 2),
(596, 293, 'BAGUIRE', '', 1, '2013-06-18 21:38:32', 2, '2013-09-17 10:54:03', 1),
(597, 294, 'BROUWAL CENTRE', '', 1, '2013-06-18 21:39:02', 2, '2013-06-18 21:39:02', 2),
(598, 294, 'DJINDJIMMA', '', 1, '2013-06-18 21:39:41', 2, '2013-06-18 21:39:41', 2),
(599, 294, 'HOLLANDE', '', 1, '2013-06-18 21:40:12', 2, '2013-09-16 13:00:53', 1),
(600, 294, 'KANSANGHI', '', 1, '2013-06-18 21:41:11', 2, '2013-09-16 12:59:46', 1),
(601, 294, 'KIMBO', '', 1, '2013-06-18 21:41:59', 2, '2013-09-16 13:01:26', 1),
(602, 294, 'TELICO', '', 1, '2013-06-18 21:42:39', 2, '2013-06-18 21:42:39', 2),
(603, 294, 'TOSSOKERE', '', 1, '2013-06-18 21:43:18', 2, '2013-06-18 21:43:18', 2),
(604, 293, 'BARKERE', '', 1, '2013-06-18 21:44:02', 2, '2013-06-18 21:44:02', 2),
(605, 293, 'GOULGOUL', '', 1, '2013-06-18 21:46:52', 2, '2013-06-18 21:46:52', 2),
(606, 293, 'FANTA', '', 1, '2013-06-18 21:47:28', 2, '2013-09-17 10:44:54', 1),
(607, 293, 'HAFIA', '', 1, '2013-06-18 21:48:02', 2, '2013-06-18 21:48:02', 2),
(608, 293, 'MENDIA', '', 1, '2013-06-18 21:48:21', 2, '2013-06-18 21:48:21', 2),
(609, 293, 'MISSIDE', '', 1, '2013-06-18 21:48:46', 2, '2013-06-18 21:48:46', 2),
(610, 293, 'NIABELY', '', 1, '2013-06-18 21:49:23', 2, '2013-06-18 21:49:23', 2),
(612, 293, 'SOKOLIBA', '', 1, '2013-06-18 21:50:19', 2, '2013-06-18 21:50:19', 2),
(613, 295, 'BAMBAYA', '', 1, '2013-06-18 21:50:57', 2, '2013-06-18 21:50:57', 2),
(614, 295, 'DARAMAGNAKI CENTRE', '', 1, '2013-06-18 21:51:27', 2, '2013-06-18 21:51:27', 2),
(615, 295, 'KABARA', '', 1, '2013-06-18 21:51:49', 2, '2013-06-18 21:51:49', 2),
(616, 295, 'KAWESSI', '', 1, '2013-06-18 21:52:11', 2, '2013-06-18 21:52:11', 2),
(617, 295, 'KOURAKOTO', '', 1, '2013-06-18 21:52:35', 2, '2013-06-18 21:52:35', 2),
(618, 295, 'BANTIGNEL', '', 1, '2013-06-18 21:52:55', 2, '2013-06-18 21:52:55', 2),
(619, 295, 'BOUBERE', '', 1, '2013-06-18 21:53:19', 2, '2013-06-18 21:53:19', 2),
(620, 296, 'GOUDOUDJE CENTRE', '', 1, '2013-06-18 21:53:48', 2, '2013-09-16 16:36:41', 1),
(621, 296, 'KOUSSY', '', 1, '2013-06-18 21:54:20', 2, '2013-09-16 16:35:02', 1),
(622, 297, 'KOBA CENTRE', '', 1, '2013-06-18 21:55:10', 2, '2013-06-18 21:55:10', 2),
(623, 297, 'MADINA - DIAN', '', 1, '2013-06-18 21:55:38', 2, '2013-09-16 16:37:22', 1),
(624, 298, 'KOLLET CENTRE', '', 1, '2013-06-18 21:56:04', 2, '2013-06-18 21:56:04', 2),
(625, 298, 'TOUMANIYA', '', 1, '2013-06-18 21:56:30', 2, '2013-09-16 16:39:59', 1),
(626, 298, 'KOUNKOURE CENTRE', '', 1, '2013-06-18 21:57:05', 2, '2013-09-16 16:41:50', 1),
(627, 299, 'BERGUE', '', 1, '2013-06-18 21:58:32', 2, '2013-06-18 21:58:32', 2),
(628, 299, 'KONSOTAMI CENTRE', '', 1, '2013-06-18 21:59:08', 2, '2013-06-18 21:59:08', 2),
(629, 299, 'N\\\'DANTABA', '', 1, '2013-06-18 21:59:41', 2, '2013-06-18 21:59:41', 2),
(630, 299, 'BHOULY', '', 1, '2013-06-18 22:00:08', 2, '2013-09-16 16:55:07', 1),
(631, 300, 'BANDOUMA', '', 1, '2013-06-18 22:00:32', 2, '2013-06-18 22:00:32', 2),
(632, 300, 'GUEME', '', 1, '2013-06-18 22:01:04', 2, '2013-06-18 22:01:04', 2),
(633, 300, 'BHOUNDOU LEINGUE', '', 1, '2013-06-18 22:01:37', 2, '2013-09-16 17:09:06', 1),
(634, 300, 'MISSIRA CENTRE', '', 1, '2013-06-18 22:02:03', 2, '2013-06-18 22:02:03', 2),
(635, 300, 'BOMMANY', '', 1, '2013-06-18 22:02:46', 2, '2013-06-18 22:02:46', 2),
(636, 300, 'KOMPETA', '', 1, '2013-06-18 22:03:14', 2, '2013-09-16 17:00:05', 1),
(637, 300, 'FOYE', '', 1, '2013-06-18 22:03:40', 2, '2013-06-18 22:03:40', 2),
(638, 300, 'KALOUMA', '', 1, '2013-06-18 22:04:23', 2, '2013-06-18 22:04:23', 2),
(639, 300, 'NDANTA BHOWRA', '', 1, '2013-06-18 22:05:01', 2, '2013-09-16 17:07:39', 1),
(640, 300, 'TELIWORA', '', 1, '2013-06-18 22:05:23', 2, '2013-06-18 22:05:23', 2),
(641, 300, 'TYINDOYE', '', 1, '2013-06-18 22:05:53', 2, '2013-09-16 17:03:06', 1),
(642, 301, 'KOURATOUTOU', '', 1, '2013-06-18 22:06:22', 2, '2013-09-16 17:21:37', 1),
(643, 301, 'N\\\'DINDA', '', 1, '2013-06-18 22:06:44', 2, '2013-09-16 17:18:21', 1),
(644, 301, 'PEGUETY CENTRE', '', 1, '2013-06-18 22:07:08', 2, '2013-06-18 22:07:08', 2),
(645, 301, 'TELITOUTE', '', 1, '2013-06-18 22:07:32', 2, '2013-09-16 17:19:30', 1),
(646, 302, 'LEY-LEGGUEL', '', 1, '2013-06-18 22:07:55', 2, '2013-09-16 15:59:13', 1),
(647, 302, 'MADINA TELICO', '', 1, '2013-06-18 22:08:19', 2, '2013-06-18 22:08:19', 2),
(648, 302, 'SAREKALY CENTRE', '', 1, '2013-06-18 22:08:50', 2, '2013-06-18 22:08:50', 2),
(649, 303, 'BEELY', '', 1, '2013-06-18 22:09:22', 2, '2013-09-16 17:27:37', 1),
(650, 303, 'BENDE', '', 1, '2013-06-18 22:09:53', 2, '2013-06-18 22:09:53', 2),
(651, 303, 'SINTA CENTRE', '', 1, '2013-06-18 22:10:16', 2, '2013-06-18 22:10:16', 2),
(652, 304, 'KA&Iuml;LLONDJI', '', 1, '2013-06-18 22:10:35', 2, '2013-09-17 10:24:33', 1),
(653, 304, 'LEY SERE', '', 1, '2013-06-18 22:10:55', 2, '2013-06-18 22:10:55', 2),
(654, 304, 'MALALCONDO', '', 1, '2013-06-18 22:11:22', 2, '2013-09-17 10:25:10', 1),
(655, 304, 'SAYONYA', '', 1, '2013-06-18 22:11:42', 2, '2013-06-18 22:11:42', 2),
(657, 304, 'TOURKOUN', '', 1, '2013-06-18 22:12:28', 2, '2013-06-18 22:12:28', 2),
(658, 308, 'BODIE CENTRE', '', 1, '2013-06-20 20:32:17', 2, '2013-06-20 20:32:17', 2),
(659, 308, 'BROUWAL DIAOUBHE', '', 1, '2013-06-20 20:32:42', 2, '2013-09-17 10:43:00', 1),
(660, 308, 'M\\\'BOURO', '', 1, '2013-06-20 20:33:05', 2, '2013-06-20 20:33:05', 2),
(661, 307, 'DALABA MISSIDE', '', 1, '2013-06-20 20:33:25', 2, '2013-06-20 20:33:25', 2),
(662, 307, 'DAR ES SALAM', '', 1, '2013-06-20 20:35:00', 2, '2013-09-17 10:56:56', 1),
(663, 307, 'DIAGUISSA', '', 1, '2013-06-20 20:37:03', 2, '2013-06-20 20:37:03', 2),
(664, 307, 'HERMAKONON', '', 1, '2013-06-20 20:37:23', 2, '2013-06-20 20:37:23', 2),
(666, 307, 'PELLEL YERO', '', 1, '2013-06-20 20:39:45', 2, '2013-06-20 20:39:45', 2),
(667, 307, 'SILY', '', 1, '2013-06-20 20:40:13', 2, '2013-06-20 20:40:13', 2),
(668, 307, 'TANGAMA', '', 1, '2013-06-20 20:40:34', 2, '2013-06-20 20:40:34', 2),
(669, 309, 'DJAMBROUYA', '', 1, '2013-06-20 20:40:58', 2, '2013-09-17 11:02:03', 1),
(670, 309, 'DITINN CENTRE', '', 1, '2013-06-20 20:41:18', 2, '2013-06-20 20:41:18', 2),
(671, 309, 'KOUROU', '', 1, '2013-06-20 20:41:40', 2, '2013-06-20 20:41:40', 2),
(672, 310, 'KAALA CENTRE', '', 1, '2013-06-20 20:42:01', 2, '2013-06-20 20:42:01', 2),
(673, 310, 'N\\\'DANTARY', '', 1, '2013-06-20 20:42:27', 2, '2013-06-20 20:42:27', 2),
(674, 310, 'KOIN HENERE', '', 1, '2013-06-20 20:44:21', 2, '2013-06-20 20:44:21', 2),
(675, 311, 'GOBIRE', '', 1, '2013-06-20 20:45:16', 2, '2013-06-20 20:45:16', 2),
(676, 311, 'KANKALABE CENTRE', '', 1, '2013-06-20 20:46:36', 2, '2013-06-20 20:46:36', 2),
(677, 311, 'SEFOURE', '', 1, '2013-06-20 20:47:11', 2, '2013-06-20 20:47:11', 2),
(678, 312, 'BANGA', '', 1, '2013-06-20 20:47:56', 2, '2013-06-20 20:47:56', 2),
(679, 311, 'THIORO', '', 1, '2013-06-20 20:48:22', 2, '2013-09-17 11:10:22', 1),
(680, 312, 'KAHEL', '', 1, '2013-06-20 20:48:44', 2, '2013-06-20 20:48:44', 2),
(681, 312, 'KEBALY CENTRE', '', 1, '2013-06-20 20:49:39', 2, '2013-06-20 20:49:39', 2),
(682, 312, 'MIRIRE', '', 1, '2013-06-20 20:52:42', 2, '2013-06-20 20:52:42', 2),
(684, 313, 'HORE DJOLY', '', 1, '2013-06-20 20:54:21', 2, '2013-09-17 11:25:24', 1),
(685, 313, 'KOBA CENTRE', '', 1, '2013-06-20 20:55:08', 2, '2013-06-20 20:55:08', 2),
(686, 313, 'LELE', '', 1, '2013-06-20 20:55:33', 2, '2013-06-20 20:55:33', 2),
(687, 314, 'DONDE', '', 1, '2013-06-20 20:55:58', 2, '2013-06-20 20:55:58', 2),
(688, 314, 'KETIGUIA', '', 1, '2013-06-20 20:56:29', 2, '2013-06-20 20:56:29', 2),
(689, 314, 'MAFARA CENTRE', '', 1, '2013-06-20 20:57:07', 2, '2013-06-20 20:57:07', 2),
(690, 315, 'BINDY', '', 1, '2013-06-20 20:57:50', 2, '2013-06-20 20:57:50', 2),
(691, 315, 'DIANGOLO', '', 1, '2013-06-20 20:58:11', 2, '2013-06-20 20:58:11', 2),
(692, 315, 'FONFOYA', '', 1, '2013-06-20 20:58:40', 2, '2013-06-20 20:58:40', 2),
(693, 315, 'MITTY CENTRE', '', 1, '2013-06-20 20:59:01', 2, '2013-06-20 20:59:01', 2),
(694, 315, 'PETTY', '', 1, '2013-06-20 20:59:27', 2, '2013-06-20 20:59:27', 2),
(695, 315, 'SEBHORY', '', 1, '2013-06-20 21:01:50', 2, '2013-09-17 10:35:35', 1),
(696, 316, 'GALLY', '', 1, '2013-06-20 21:02:21', 2, '2013-06-20 21:02:21', 2),
(697, 316, 'GNEKEMA', '', 1, '2013-06-20 21:03:04', 2, '2013-06-20 21:03:04', 2),
(698, 316, 'KENENE', '', 1, '2013-06-20 21:03:42', 2, '2013-06-20 21:03:42', 2),
(699, 316, 'MONBEYA CENTRE', '', 1, '2013-06-20 21:04:11', 2, '2013-06-20 21:04:11', 2),
(700, 318, 'BOULIWEL CENTRE', '', 1, '2013-06-20 21:04:59', 2, '2013-06-20 21:04:59', 2),
(701, 318, 'BOUNANYA', '', 1, '2013-06-20 21:05:22', 2, '2013-06-20 21:05:22', 2),
(702, 318, 'DIANYAH', '', 1, '2013-06-20 21:05:42', 2, '2013-06-20 21:05:42', 2),
(703, 318, 'DOUNKI', '', 1, '2013-06-20 21:06:03', 2, '2013-09-17 16:17:34', 1),
(704, 318, 'KELLIWOL', '', 1, '2013-06-20 21:06:22', 2, '2013-06-20 21:06:22', 2),
(705, 318, 'KENDOUMA', '', 1, '2013-06-20 21:06:45', 2, '2013-06-20 21:06:45', 2),
(706, 318, 'LOOPI', '', 1, '2013-06-20 21:07:07', 2, '2013-06-20 21:07:07', 2),
(707, 318, 'SENNADE', '', 1, '2013-06-20 21:07:32', 2, '2013-06-20 21:07:32', 2),
(708, 318, 'SORIYA', '', 1, '2013-06-20 21:07:55', 2, '2013-06-20 21:07:55', 2),
(709, 319, 'ALPHAYA', '', 1, '2013-06-20 21:08:14', 2, '2013-06-20 21:08:14', 2),
(710, 319, 'BASSAMBAYA', '', 1, '2013-06-20 21:08:36', 2, '2013-06-20 21:08:36', 2),
(711, 319, 'DIATABAYA', '', 1, '2013-06-20 21:08:55', 2, '2013-06-20 21:08:55', 2),
(712, 319, 'DINDEYA', '', 1, '2013-06-20 21:09:22', 2, '2013-06-20 21:09:22', 2),
(713, 319, 'DOUNET CENTRE', '', 1, '2013-06-20 21:09:47', 2, '2013-06-20 21:09:47', 2),
(714, 319, 'HADJI', '', 1, '2013-06-20 21:10:11', 2, '2013-06-20 21:10:11', 2),
(715, 319, 'SOUMBALAKO-MAOUNDE', '', 1, '2013-06-20 21:10:29', 2, '2013-09-17 12:03:10', 1),
(716, 320, 'DOUGOU WOULEN', '', 1, '2013-06-20 21:10:48', 2, '2013-09-17 11:57:02', 1),
(717, 320, 'GONGORET CENTRE', '', 1, '2013-06-20 21:11:07', 2, '2013-09-17 11:58:11', 1),
(718, 320, 'KOUROU', '', 1, '2013-06-20 21:11:35', 2, '2013-06-20 21:11:35', 2),
(719, 321, 'DALA OULEN', '', 1, '2013-06-20 21:11:59', 2, '2013-06-20 21:14:09', 2),
(720, 321, 'HAROUNAYA', '', 1, '2013-06-20 21:12:21', 2, '2013-06-20 21:13:26', 2),
(721, 321, 'HERIKO', '', 1, '2013-06-20 21:12:53', 2, '2013-06-20 21:12:53', 2),
(722, 320, 'POUKOU', '', 1, '2013-06-20 21:14:23', 2, '2013-06-20 21:14:23', 2),
(723, 321, 'KEGNEKO CENTRE', '', 1, '2013-06-20 21:15:01', 2, '2013-06-20 21:15:01', 2),
(724, 321, 'MISSIRA', '', 1, '2013-06-20 21:15:21', 2, '2013-06-20 21:15:21', 2),
(725, 322, 'KONKOURE CENTRE', '', 1, '2013-06-20 21:15:46', 2, '2013-06-20 21:15:46', 2),
(726, 322, 'TAMAGALY', '', 1, '2013-06-20 21:17:25', 2, '2013-06-20 21:17:25', 2),
(727, 317, 'ABATTOIR II', '', 1, '2013-06-20 21:17:45', 2, '2013-09-17 12:13:33', 1),
(728, 317, 'ALMAMYA TERRAIN', '', 1, '2013-06-20 21:18:10', 2, '2013-09-17 12:22:42', 1),
(729, 317, 'BOULBINET', '', 1, '2013-06-20 21:20:01', 2, '2013-06-20 21:20:01', 2),
(730, 317, 'HORE FELLO II', '', 1, '2013-06-20 21:20:22', 2, '2013-09-17 12:06:06', 1),
(731, 317, 'HORE MAMOU', '', 1, '2013-06-20 21:20:47', 2, '2013-06-20 21:20:47', 2),
(732, 317, 'KIMBELY I', '', 1, '2013-06-20 21:21:25', 2, '2013-09-17 12:06:50', 1),
(733, 317, 'KOUMI', '', 1, '2013-06-20 21:21:57', 2, '2013-06-20 21:21:57', 2),
(734, 317, 'LOPPET I', '', 1, '2013-06-20 21:22:16', 2, '2013-09-17 12:08:12', 1),
(735, 317, 'MADINA SCIERIE', '', 1, '2013-06-20 21:22:36', 2, '2013-09-17 12:11:47', 1),
(736, 317, 'PETEL I', '', 1, '2013-06-20 21:22:57', 2, '2013-09-17 12:14:46', 1),
(737, 317, 'POUDRIERE I', '', 1, '2013-06-20 21:23:46', 2, '2013-09-17 12:12:32', 1),
(738, 317, 'SERE CENTRE', '', 1, '2013-06-20 21:24:08', 2, '2013-09-17 12:20:38', 1),
(741, 323, 'B&Ouml;T&Ouml;RE', '', 1, '2013-06-20 21:25:00', 2, '2013-09-17 11:48:41', 1),
(742, 323, 'LABIKO', '', 1, '2013-06-20 21:25:20', 2, '2013-06-20 21:25:20', 2),
(743, 323, 'MANGOL', '', 1, '2013-06-20 21:25:46', 2, '2013-06-20 21:25:46', 2),
(744, 323, 'MORIFATANDEN', '', 1, '2013-06-20 21:26:07', 2, '2013-09-17 11:48:00', 1),
(746, 323, 'TOROBHE', '', 1, '2013-06-20 21:26:47', 2, '2013-06-20 21:26:47', 2),
(747, 324, 'DIANDIAN', '', 1, '2013-06-20 21:27:03', 2, '2013-06-20 21:27:03', 2),
(748, 324, 'OURE-KABA CENTRE', '', 1, '2013-06-20 21:27:20', 2, '2013-09-17 11:45:54', 1),
(749, 324, 'KEGNEGBE', '', 1, '2013-06-20 21:28:02', 2, '2013-09-17 11:41:23', 1),
(750, 324, 'MADINA', '', 1, '2013-06-20 21:28:30', 2, '2013-06-20 21:28:30', 2),
(751, 324, 'PORTOFITA', '', 1, '2013-06-20 21:28:51', 2, '2013-06-20 21:28:51', 2),
(752, 324, 'SEBECOTO', '', 1, '2013-06-20 21:29:20', 2, '2013-06-20 21:29:20', 2),
(753, 324, 'SELEYA', '', 1, '2013-06-20 21:29:42', 2, '2013-06-20 21:29:42', 2),
(754, 324, 'SITAKOTO', '', 1, '2013-06-20 21:30:01', 2, '2013-06-20 21:30:01', 2),
(755, 324, 'SOGOROYA', '', 1, '2013-06-20 21:30:20', 2, '2013-06-20 21:30:20', 2),
(756, 324, 'YOMAYA LIMBAN', '', 1, '2013-06-20 21:30:42', 2, '2013-09-17 11:44:55', 1),
(757, 325, 'BHOURIA', '', 1, '2013-06-20 21:31:22', 2, '2013-06-20 21:31:22', 2),
(758, 325, 'DAR- ES-SALAM', '', 1, '2013-06-20 21:31:41', 2, '2013-09-17 11:38:49', 1),
(759, 325, 'DOGHOL DJEIDI', '', 1, '2013-06-20 21:32:03', 2, '2013-09-17 11:37:54', 1),
(760, 325, 'KOLISSOKO', '', 1, '2013-06-20 21:32:22', 2, '2013-06-20 21:32:22', 2),
(761, 325, 'NDIARE', '', 1, '2013-06-20 21:32:47', 2, '2013-06-20 21:32:47', 2),
(762, 325, 'POREDAKA CENTRE', '', 1, '2013-06-20 21:33:41', 2, '2013-06-20 21:33:41', 2),
(763, 325, 'SANKARELA', '', 1, '2013-06-20 21:36:02', 2, '2013-06-20 21:36:02', 2),
(764, 325, 'TOUNKAN', '', 1, '2013-06-20 21:36:30', 2, '2013-06-20 21:36:30', 2),
(765, 326, 'BOUROUWIL', '', 1, '2013-06-20 21:36:56', 2, '2013-06-20 21:37:51', 2),
(766, 326, 'DOUNKIBA', '', 1, '2013-06-20 21:37:31', 2, '2013-06-20 21:37:31', 2),
(767, 326, 'GARANKELA', '', 1, '2013-06-20 21:38:25', 2, '2013-06-20 21:38:25', 2),
(768, 326, 'KENEWOL', '', 1, '2013-06-20 21:38:47', 2, '2013-06-20 21:38:47', 2),
(769, 326, 'KOUROUYA', '', 1, '2013-06-20 21:39:08', 2, '2013-09-17 13:51:51', 1),
(771, 326, 'SARAMOUSSAYA', '', 1, '2013-06-20 21:40:06', 2, '2013-09-17 13:49:14', 1),
(772, 326, 'SARABOWAL', '', 1, '2013-06-20 21:40:32', 2, '2013-09-17 13:52:32', 1),
(773, 327, 'BERTEYA', '', 1, '2013-06-20 21:40:52', 2, '2013-06-20 21:40:52', 2),
(774, 327, 'SOYA CENTRE', '', 1, '2013-06-20 21:42:05', 2, '2013-06-20 21:42:05', 2),
(775, 327, 'BHOULLY', '', 1, '2013-06-20 21:42:24', 2, '2013-06-20 21:42:24', 2),
(776, 327, 'FARENTA', '', 1, '2013-06-20 21:42:50', 2, '2013-06-20 21:42:50', 2),
(777, 327, 'NOBE', '', 1, '2013-06-20 21:43:13', 2, '2013-06-20 21:43:13', 2),
(778, 328, 'BROUWAL', '', 1, '2013-06-20 21:43:41', 2, '2013-06-20 21:43:41', 2),
(779, 328, 'FINALA', '', 1, '2013-06-20 21:44:02', 2, '2013-09-17 13:02:18', 1),
(780, 328, 'MISSDE KOLLEN', '', 1, '2013-06-20 21:44:33', 2, '2013-09-17 13:03:34', 1),
(781, 328, 'N\\\'DIARENDI', '', 1, '2013-06-20 21:44:58', 2, '2013-09-17 13:03:03', 1),
(782, 329, 'DAARA', '', 1, '2013-06-20 21:45:21', 2, '2013-09-17 12:58:24', 1),
(783, 329, 'DJAFOUNA', '', 1, '2013-06-20 21:45:49', 2, '2013-09-17 12:59:01', 1),
(784, 329, 'KIGNA-OURIYA', '', 1, '2013-06-20 21:46:58', 2, '2013-09-17 12:59:45', 1),
(785, 329, 'SE&Iuml;DYA I', '', 1, '2013-06-20 21:47:23', 2, '2013-09-17 13:00:19', 1),
(786, 329, 'TIMBO CENTRE', '', 1, '2013-06-20 21:48:18', 2, '2013-06-20 21:48:18', 2),
(787, 330, 'GOUBA', '', 1, '2013-06-20 21:48:47', 2, '2013-06-20 21:48:47', 2),
(789, 330, 'SOUMBALAKO TOKOSSERE', '', 1, '2013-06-20 21:49:26', 2, '2013-06-20 21:49:26', 2),
(790, 330, 'TOLO', '', 1, '2013-06-20 21:49:50', 2, '2013-09-17 12:56:19', 1),
(791, 332, 'BANTIGNEL MAOUDE', '', 1, '2013-06-20 22:03:13', 2, '2013-06-20 22:03:13', 2),
(792, 332, 'BANTIGNEL TOKOSSERE', '', 1, '2013-06-20 22:03:32', 2, '2013-06-20 22:03:32', 2),
(793, 332, 'BILLE', '', 1, '2013-06-20 22:03:49', 2, '2013-06-20 22:03:49', 2),
(794, 332, 'BROUWAL HOLLANDE', '', 1, '2013-06-20 22:04:08', 2, '2013-09-17 14:31:00', 1),
(795, 332, 'MELIKANSA', '', 1, '2013-06-20 22:04:32', 2, '2013-06-20 22:04:32', 2),
(796, 332, 'SALLIA ECOLE', '', 1, '2013-06-20 22:04:50', 2, '2013-06-20 22:04:50', 2),
(797, 333, 'BOMBOLY', '', 1, '2013-06-20 22:05:12', 2, '2013-09-17 15:43:48', 1),
(798, 333, 'BROUWAL TAPPE CENTRE', '', 1, '2013-06-20 22:05:38', 2, '2013-06-20 22:05:38', 2),
(799, 333, 'GADA BOUNDOUWOL', '', 1, '2013-06-20 22:06:04', 2, '2013-06-20 22:06:04', 2),
(800, 333, 'LEY GNELE', '', 1, '2013-06-20 22:09:28', 2, '2013-06-20 22:09:28', 2),
(801, 340, 'LALIA MAOUNDE', '', 1, '2013-06-20 22:10:01', 2, '2013-06-20 22:10:01', 2),
(802, 334, 'BAMBAYA', '', 1, '2013-06-20 22:10:33', 2, '2013-06-20 22:10:33', 2),
(803, 334, 'BOULLERE', '', 1, '2013-06-20 22:13:15', 2, '2013-06-20 22:13:15', 2),
(804, 334, 'DONGHOL CENTRE', '', 1, '2013-06-20 22:13:53', 2, '2013-06-20 22:13:53', 2),
(805, 334, 'DOUKOUKOU', '', 1, '2013-06-20 22:14:15', 2, '2013-06-20 22:14:15', 2),
(806, 334, 'GUEME', '', 1, '2013-06-20 22:14:41', 2, '2013-06-20 22:14:41', 2),
(807, 334, 'KALILAMBAN', '', 1, '2013-06-20 22:15:01', 2, '2013-06-20 22:15:01', 2),
(808, 334, 'N\\\'DALAO', '', 1, '2013-06-20 22:15:26', 2, '2013-06-20 22:15:26', 2),
(809, 334, 'PELLAL', '', 1, '2013-06-20 22:15:49', 2, '2013-06-20 22:15:49', 2),
(810, 334, 'TAIRE', '', 1, '2013-06-20 22:16:12', 2, '2013-06-20 22:16:12', 2),
(811, 335, 'BAMBETO', '', 1, '2013-06-20 22:16:33', 2, '2013-06-20 22:16:33', 2),
(812, 335, 'DEBEN', '', 1, '2013-06-20 22:17:01', 2, '2013-09-17 15:25:38', 1),
(813, 335, 'DJINDJI', '', 1, '2013-06-20 22:17:30', 2, '2013-06-20 22:17:30', 2),
(814, 335, 'GONGORE CENTRE', '', 1, '2013-06-20 22:18:17', 2, '2013-06-20 22:18:17', 2),
(815, 335, 'THIEHEL', '', 1, '2013-06-20 22:20:33', 2, '2013-06-20 22:20:33', 2),
(816, 336, 'DIOUNKOUN', '', 1, '2013-06-20 22:21:01', 2, '2013-09-17 15:23:57', 1),
(817, 336, 'FARO', '', 1, '2013-06-20 22:21:37', 2, '2013-06-20 22:21:37', 2),
(818, 336, 'KOUYE', '', 1, '2013-06-20 22:22:03', 2, '2013-06-20 22:22:03', 2),
(819, 336, 'LEY DIOHE', '', 1, '2013-06-20 22:22:23', 2, '2013-06-20 22:22:23', 2),
(820, 336, 'LEY MIRO CENTRE', '', 1, '2013-06-20 22:22:43', 2, '2013-06-20 22:22:43', 2),
(821, 336, 'WAREYA', '', 1, '2013-06-20 22:23:05', 2, '2013-06-20 22:23:05', 2),
(822, 337, 'KAMBACO', '', 1, '2013-06-20 22:23:31', 2, '2013-09-17 15:17:36', 1),
(824, 337, 'N\\\'DANTARI', '', 1, '2013-06-20 22:24:24', 2, '2013-06-20 22:24:24', 2),
(825, 337, 'PALAGA', '', 1, '2013-06-20 22:24:41', 2, '2013-06-20 22:24:41', 2),
(826, 337, 'LEY TANGAN', '', 1, '2013-06-20 22:25:05', 2, '2013-09-17 15:09:35', 1),
(827, 337, 'TYEWERE', '', 1, '2013-06-20 22:25:25', 2, '2013-06-20 22:25:25', 2),
(828, 338, 'BOURROURE HAMDALLAYE', '', 1, '2013-06-20 22:25:47', 2, '2013-09-17 15:02:48', 1),
(829, 338, 'DEBEYA PETY', '', 1, '2013-06-20 22:26:09', 2, '2013-09-17 15:04:53', 1),
(830, 338, 'GNINKAN', '', 1, '2013-06-20 22:26:29', 2, '2013-06-20 22:26:29', 2),
(831, 338, 'NINGUELANDE CENTRE', '', 1, '2013-06-20 22:26:47', 2, '2013-06-20 22:26:47', 2),
(832, 338, 'SAFAA', '', 1, '2013-06-20 22:27:04', 2, '2013-09-17 15:01:19', 1),
(833, 338, 'WEENDOU', '', 1, '2013-06-20 22:27:27', 2, '2013-09-17 15:05:57', 1),
(834, 338, 'YORGO PELLEL', '', 1, '2013-06-20 22:27:51', 2, '2013-06-20 22:27:51', 2),
(835, 331, 'BENDOUGOU', '', 1, '2013-06-20 22:28:32', 2, '2013-06-20 22:28:32', 2),
(836, 331, 'DOW SARE', '', 1, '2013-06-20 22:28:56', 2, '2013-06-20 22:28:56', 2),
(837, 331, 'GUEME I', '', 1, '2013-06-20 22:29:20', 2, '2013-09-17 15:36:47', 1),
(839, 331, 'LEY SARE', '', 1, '2013-06-20 22:30:31', 2, '2013-06-20 22:30:31', 2),
(840, 331, 'SEWA', '', 1, '2013-06-20 22:30:55', 2, '2013-06-20 22:30:55', 2),
(841, 339, 'DIANYA', '', 1, '2013-06-20 22:31:30', 2, '2013-06-20 22:31:30', 2),
(842, 339, 'FONFO', '', 1, '2013-06-20 22:32:02', 2, '2013-06-20 22:32:02', 2),
(843, 339, 'NINGUETERE', '', 1, '2013-06-20 22:33:26', 2, '2013-06-20 22:33:26', 2),
(844, 339, 'NIANSO', '', 1, '2013-06-20 22:33:44', 2, '2013-09-17 15:47:53', 1),
(845, 339, 'SAARI', '', 1, '2013-06-20 22:34:19', 2, '2013-06-20 22:34:19', 2),
(846, 339, 'SANGAREYA CENTRE', '', 1, '2013-06-20 22:34:46', 2, '2013-06-20 22:34:46', 2),
(847, 339, 'SANKA', '', 1, '2013-06-20 22:35:15', 2, '2013-06-20 22:35:15', 2),
(848, 339, 'SOLEINTA', '', 1, '2013-06-20 22:35:41', 2, '2013-09-17 15:48:41', 1),
(849, 340, 'BOURKADJE', '', 1, '2013-06-20 22:36:02', 2, '2013-06-20 22:36:02', 2),
(851, 340, 'SARAYA', '', 1, '2013-06-20 22:37:24', 2, '2013-06-20 22:37:24', 2),
(852, 340, 'SINTALY CENTRE', '', 1, '2013-06-20 22:37:46', 2, '2013-06-20 22:37:46', 2),
(854, 341, 'BAMIKOURE', '', 1, '2013-06-20 22:38:26', 2, '2013-06-20 22:38:26', 2),
(855, 341, 'BOUMALOL', '', 1, '2013-06-20 22:38:50', 2, '2013-06-20 22:38:50', 2),
(856, 341, 'DOUMBA', '', 1, '2013-06-20 22:39:12', 2, '2013-06-20 22:39:12', 2),
(857, 341, 'KOUROU REDOUSERE', '', 1, '2013-06-20 22:39:32', 2, '2013-09-17 14:54:03', 1),
(858, 341, 'LABHA', '', 1, '2013-06-20 22:39:56', 2, '2013-09-17 14:58:46', 1),
(859, 341, 'MADINA CENTRE', '', 1, '2013-06-20 22:40:19', 2, '2013-06-20 22:40:19', 2),
(860, 341, 'SONKE', '', 1, '2013-06-20 22:40:37', 2, '2013-06-20 22:40:37', 2),
(861, 341, 'TOKOSSERE', '', 1, '2013-06-20 22:41:02', 2, '2013-06-20 22:41:02', 2),
(862, 341, 'TIAPATA', '', 1, '2013-06-20 22:41:21', 2, '2013-09-17 14:49:25', 1),
(863, 342, 'DIAGA', '', 1, '2013-06-20 22:42:05', 2, '2013-06-20 22:42:05', 2),
(864, 342, 'HORE WOURI', '', 1, '2013-06-20 22:42:26', 2, '2013-06-20 22:42:26', 2),
(865, 342, 'TIMBI TOUNI CENTRE', '', 1, '2013-06-20 22:42:44', 2, '2013-06-20 22:42:44', 2),
(866, 342, 'WANSAN', '', 1, '2013-06-20 22:43:00', 2, '2013-06-20 22:43:00', 2),
(867, 81, 'BASSARA', '', 1, '2013-06-20 22:46:02', 2, '2013-06-20 22:46:02', 2),
(868, 81, 'BOUSSOURA', '', 1, '2013-06-20 22:46:21', 2, '2013-06-20 22:46:21', 2),
(869, 81, 'DADHIABHE', '', 1, '2013-06-20 22:46:55', 2, '2013-09-18 10:11:22', 1),
(870, 81, 'FAFAYA CENTRE', '', 1, '2013-06-20 22:47:19', 2, '2013-06-20 22:47:19', 2),
(871, 81, 'SIMILI', '', 1, '2013-06-20 22:47:42', 2, '2013-09-18 10:09:55', 1),
(872, 82, 'DALABA', '', 1, '2013-06-20 22:48:03', 2, '2013-06-20 22:48:03', 2),
(873, 82, 'FISSAYA', '', 1, '2013-06-20 22:48:35', 2, '2013-06-20 22:48:35', 2),
(874, 81, 'TIMBERING', '', 1, '2013-06-20 22:48:58', 2, '2013-06-20 22:48:58', 2),
(875, 82, 'LEY FELLO', '', 1, '2013-06-20 22:49:18', 2, '2013-06-20 22:49:18', 2),
(876, 80, 'HERICO', '', 1, '2013-06-20 22:49:37', 2, '2013-06-20 22:49:37', 2),
(877, 80, 'KOUBIA II', '', 1, '2013-06-20 22:50:04', 2, '2013-09-18 10:14:37', 1),
(878, 80, 'KIRI', '', 1, '2013-06-20 22:50:25', 2, '2013-06-20 22:50:25', 2),
(879, 80, 'KOUBIA I', '', 1, '2013-06-20 22:50:56', 2, '2013-09-18 10:14:23', 1),
(880, 80, 'TIMBA', '', 1, '2013-06-20 22:51:18', 2, '2013-06-20 22:51:18', 2),
(881, 80, 'MADINA KOSSI', '', 1, '2013-06-20 22:51:39', 2, '2013-06-20 22:51:39', 2),
(882, 80, 'MISSIRA', '', 1, '2013-06-20 22:52:04', 2, '2013-06-20 22:52:04', 2),
(883, 80, 'MOROMY', '', 1, '2013-06-20 22:52:27', 2, '2013-09-18 10:12:38', 1),
(884, 83, 'DARA', '', 1, '2013-06-20 22:52:55', 2, '2013-06-20 22:52:55', 2),
(885, 83, 'GNANNOU', '', 1, '2013-06-20 22:53:16', 2, '2013-06-20 22:53:16', 2),
(886, 83, 'MADINA NIANNOU', '', 1, '2013-06-20 22:53:40', 2, '2013-09-18 10:05:14', 1),
(887, 83, 'SOUMMAH', '', 1, '2013-06-20 22:54:02', 2, '2013-09-18 10:03:09', 1),
(888, 83, 'TELIRE', '', 1, '2013-06-20 22:54:24', 2, '2013-06-20 22:54:24', 2),
(889, 84, 'KOUNDIEYA', '', 1, '2013-06-20 22:55:03', 2, '2013-06-20 22:55:03', 2),
(890, 84, 'MISSIRA CENTRE', '', 1, '2013-06-20 22:55:22', 2, '2013-06-20 22:55:22', 2),
(891, 84, 'NYLA', '', 1, '2013-06-20 22:55:43', 2, '2013-09-18 10:01:15', 1),
(892, 84, 'SARE KINDIA', '', 1, '2013-06-20 22:56:05', 2, '2013-06-20 22:56:05', 2),
(893, 84, 'TOUNTEBA', '', 1, '2013-06-20 22:56:23', 2, '2013-06-20 22:56:23', 2),
(894, 85, 'BAMBA', '', 1, '2013-06-20 22:56:52', 2, '2013-06-20 22:56:52', 2),
(895, 85, 'BANSOUMA', '', 1, '2013-06-20 22:57:36', 2, '2013-06-20 22:57:36', 2),
(896, 85, 'DARA PELLY', '', 1, '2013-06-20 22:58:00', 2, '2013-06-20 22:58:00', 2),
(897, 85, 'KOUNDOU  THYANKOYE', '', 1, '2013-06-20 22:58:22', 2, '2013-06-20 22:58:22', 2),
(898, 85, 'MADINA DONDE', '', 1, '2013-06-20 22:58:44', 2, '2013-06-20 22:58:44', 2),
(899, 85, 'MADINA SOUGUE', '', 1, '2013-06-20 22:59:07', 2, '2013-06-20 22:59:07', 2),
(900, 85, 'NYAKAYA', '', 1, '2013-06-20 22:59:26', 2, '2013-06-20 22:59:26', 2),
(901, 85, 'PILIMINI CENTRE', '', 1, '2013-06-20 23:00:19', 2, '2013-06-20 23:00:19', 2),
(902, 85, 'SILAMAKAYA', '', 1, '2013-06-20 23:00:45', 2, '2013-09-18 09:57:16', 1),
(903, 111, 'FATAKO', '', 1, '2013-06-20 23:05:50', 2, '2013-09-17 17:17:59', 1),
(904, 111, 'FOGO', '', 1, '2013-06-20 23:06:25', 2, '2013-06-20 23:06:25', 2),
(905, 111, 'KORBOYA', '', 1, '2013-06-20 23:07:18', 2, '2013-06-20 23:07:18', 2),
(906, 112, 'BALAGAN', '', 1, '2013-06-20 23:07:41', 2, '2013-06-20 23:07:41', 2),
(907, 112, 'FELLO KOUNDOUA', '', 1, '2013-06-20 23:08:06', 2, '2013-09-17 17:08:54', 1),
(908, 112, 'TAKABARA', '', 1, '2013-06-20 23:08:25', 2, '2013-06-20 23:08:25', 2),
(909, 113, 'KANSAGUI CENTRE', '', 1, '2013-06-20 23:09:02', 2, '2013-06-20 23:09:02', 2),
(910, 113, 'KEMAYA', '', 1, '2013-06-20 23:09:19', 2, '2013-06-20 23:09:19', 2),
(911, 113, 'SOULE', '', 1, '2013-06-20 23:09:40', 2, '2013-09-17 17:03:14', 1),
(912, 114, 'KAFFA', '', 1, '2013-06-20 23:10:04', 2, '2013-06-20 23:10:04', 2),
(913, 114, 'KOIN II', '', 1, '2013-06-20 23:10:25', 2, '2013-09-17 17:00:09', 1),
(914, 114, 'MALIPAN', '', 1, '2013-06-20 23:10:46', 2, '2013-06-20 23:10:46', 2),
(915, 114, 'SIGUIRA', '', 1, '2013-06-20 23:11:15', 2, '2013-06-20 23:11:15', 2),
(917, 115, 'FELLO DIAFOUNABHE', '', 1, '2013-06-20 23:11:58', 2, '2013-09-17 16:53:15', 1),
(918, 115, 'N\\\'HANHARAN', '', 1, '2013-06-20 23:12:55', 2, '2013-09-17 16:53:47', 1),
(919, 110, 'KOLLAGUI', '', 1, '2013-06-20 23:13:19', 2, '2013-06-20 23:13:19', 2),
(920, 115, 'LABHA', '', 1, '2013-06-20 23:13:43', 2, '2013-09-17 16:54:47', 1),
(922, 116, 'KOLLET CENTRE', '', 1, '2013-06-20 23:14:26', 2, '2013-06-20 23:14:26', 2),
(923, 116, 'LAGUI', '', 1, '2013-06-20 23:14:52', 2, '2013-06-20 23:14:52', 2),
(924, 116, 'KEGNEOULA', '', 1, '2013-06-20 23:15:14', 2, '2013-09-25 08:29:26', 1),
(925, 116, 'MOSQUEE', '', 1, '2013-06-20 23:15:32', 2, '2013-06-20 23:15:32', 2),
(926, 117, 'KONAH II', '', 1, '2013-06-20 23:16:00', 2, '2013-09-17 16:41:18', 1),
(927, 117, 'KONAH I', '', 1, '2013-06-20 23:16:24', 2, '2013-09-17 16:41:45', 1),
(928, 117, 'PARAWOL', '', 1, '2013-06-20 23:16:45', 2, '2013-06-20 23:16:45', 2),
(929, 117, 'TOUNKOUROUMA', '', 1, '2013-06-20 23:17:07', 2, '2013-06-20 23:17:07', 2),
(930, 118, 'DAROU', '', 1, '2013-06-20 23:17:38', 2, '2013-06-20 23:17:38', 2),
(931, 118, 'HORE KOLLET', '', 1, '2013-06-20 23:18:07', 2, '2013-06-20 23:18:07', 2),
(932, 118, 'KOURATONGO CENTRE', '', 1, '2013-06-20 23:18:26', 2, '2013-06-20 23:18:26', 2),
(933, 118, 'LALLABARA', '', 1, '2013-06-20 23:19:03', 2, '2013-06-20 23:19:03', 2),
(934, 119, 'BARITA', '', 1, '2013-06-20 23:19:21', 2, '2013-06-20 23:19:21', 2),
(935, 119, 'TANGALY', '', 1, '2013-06-20 23:19:42', 2, '2013-09-17 17:19:25', 1),
(936, 110, 'BALLAMA', '', 1, '2013-06-20 23:20:13', 2, '2013-09-17 17:21:29', 1),
(937, 110, 'KAMBAYAH', '', 1, '2013-06-20 23:20:35', 2, '2013-06-20 23:20:35', 2),
(938, 110, 'KEGNA', '', 1, '2013-06-20 23:20:58', 2, '2013-09-17 17:20:57', 1),
(939, 110, 'PANDIE FELLO', '', 1, '2013-06-20 23:21:22', 2, '2013-06-20 23:21:22', 2),
(940, 110, 'SANDAKE', '', 1, '2013-06-20 23:21:49', 2, '2013-06-20 23:21:49', 2),
(941, 110, 'SOUMETA', '', 1, '2013-06-20 23:22:08', 2, '2013-06-20 23:22:08', 2),
(942, 110, 'SOUMPOURA', '', 1, '2013-06-20 23:22:29', 2, '2013-06-20 23:22:29', 2),
(943, 110, 'TOUGUE I', '', 1, '2013-06-20 23:22:53', 2, '2013-09-17 17:25:03', 1),
(944, 110, 'TOUGUE II', '', 1, '2013-06-20 23:23:26', 2, '2013-09-17 17:22:06', 1),
(945, 110, 'WOULINKO', '', 1, '2013-06-20 23:23:45', 2, '2013-09-24 17:11:00', 1),
(946, 87, 'BALAYA CENTRE', '', 1, '2013-06-20 23:25:09', 2, '2013-06-20 23:25:09', 2),
(947, 87, 'DARA ES SALAM', '', 1, '2013-06-20 23:25:35', 2, '2013-06-20 23:25:35', 2),
(948, 87, 'DJIDALA', '', 1, '2013-06-20 23:25:50', 2, '2013-06-20 23:25:50', 2),
(950, 87, 'LAMBAGUEL', '', 1, '2013-06-20 23:26:43', 2, '2013-06-20 23:26:43', 2),
(951, 87, 'THIAGUEL DICKO', '', 1, '2013-06-20 23:27:06', 2, '2013-06-20 23:27:06', 2),
(952, 88, 'DIOUNTOU CENTRE', '', 1, '2013-06-20 23:27:26', 2, '2013-06-20 23:27:26', 2),
(953, 88, 'FEREYA', '', 1, '2013-06-20 23:27:46', 2, '2013-06-20 23:27:46', 2),
(954, 88, 'KOREGNANI', '', 1, '2013-06-20 23:28:03', 2, '2013-06-20 23:28:03', 2),
(955, 88, 'LABICO', '', 1, '2013-06-20 23:28:23', 2, '2013-06-20 23:28:23', 2),
(956, 88, 'NIAGANTOU', '', 1, '2013-06-20 23:28:43', 2, '2013-06-20 23:28:43', 2),
(957, 88, 'THIALLOU', '', 1, '2013-06-20 23:29:00', 2, '2013-06-20 23:29:00', 2),
(958, 89, 'DJIGUE', '', 1, '2013-06-20 23:29:19', 2, '2013-06-20 23:29:19', 2),
(959, 89, 'HERIKO CENTRE', '', 1, '2013-06-20 23:29:37', 2, '2013-06-20 23:29:37', 2),
(960, 89, 'MADINA BIROUWAL', '', 1, '2013-06-20 23:29:56', 2, '2013-06-20 23:29:56', 2),
(961, 89, 'TOWGO', '', 1, '2013-06-20 23:30:18', 2, '2013-06-20 23:30:18', 2),
(962, 89, 'WENDOU FETO', '', 1, '2013-06-20 23:30:38', 2, '2013-06-20 23:30:38', 2),
(963, 89, 'WENDOU KOULA', '', 1, '2013-06-20 23:30:57', 2, '2013-06-20 23:30:57', 2),
(964, 90, 'KORBE CENTRE', '', 1, '2013-06-20 23:31:15', 2, '2013-06-20 23:31:15', 2),
(965, 90, 'LEY HOOLO', '', 1, '2013-06-20 23:31:32', 2, '2013-09-17 18:20:11', 1),
(966, 90, 'NIEGUERE', '', 1, '2013-06-20 23:31:51', 2, '2013-06-20 23:31:51', 2),
(967, 91, 'BOMBI BOUROU', '', 1, '2013-06-20 23:32:21', 2, '2013-09-17 18:18:25', 1),
(968, 91, 'HORE BOMBI', '', 1, '2013-06-20 23:32:38', 2, '2013-09-17 18:17:30', 1),
(969, 91, 'LAFOU CENTRE', '', 1, '2013-06-20 23:32:56', 2, '2013-06-20 23:32:56', 2),
(970, 91, 'LAREWEL', '', 1, '2013-06-20 23:33:19', 2, '2013-06-20 23:33:19', 2),
(971, 91, 'ZAWIA', '', 1, '2013-06-20 23:33:43', 2, '2013-06-20 23:33:43', 2),
(972, 86, 'DIALA 1', '', 1, '2013-06-20 23:34:02', 2, '2013-09-17 18:27:05', 1),
(973, 86, 'DJINKAN', '', 1, '2013-06-20 23:34:29', 2, '2013-06-20 23:34:29', 2),
(974, 86, 'KENERY', '', 1, '2013-06-20 23:34:49', 2, '2013-06-20 23:34:49', 2),
(975, 86, 'PETEL', '', 1, '2013-06-20 23:35:11', 2, '2013-06-20 23:35:11', 2),
(976, 86, 'POYE', '', 1, '2013-06-20 23:35:28', 2, '2013-06-20 23:35:28', 2),
(977, 92, 'KAGNE GANDE', '', 1, '2013-06-20 23:35:45', 2, '2013-06-20 23:35:45', 2),
(978, 92, 'LINSAN 1', '', 1, '2013-06-20 23:36:05', 2, '2013-09-17 18:15:16', 1),
(979, 92, 'TELI BOFI', '', 1, '2013-06-20 23:36:26', 2, '2013-09-17 18:15:42', 1),
(980, 93, 'MANDA FOULBE', '', 1, '2013-06-20 23:36:59', 2, '2013-06-20 23:36:59', 2),
(982, 94, 'BOKON', '', 1, '2013-06-20 23:37:36', 2, '2013-09-17 18:07:22', 1),
(983, 94, 'DONDE', '', 1, '2013-06-20 23:37:57', 2, '2013-06-20 23:37:57', 2),
(984, 94, 'GOUNDOUPI', '', 1, '2013-06-20 23:38:16', 2, '2013-06-20 23:38:16', 2),
(985, 94, 'PARAWOL CENTRE', '', 1, '2013-06-20 23:38:31', 2, '2013-06-20 23:38:31', 2),
(986, 94, 'SANDALY', '', 1, '2013-06-20 23:38:50', 2, '2013-06-20 23:38:50', 2),
(987, 95, 'BAMIKOUNTOU', '', 1, '2013-06-20 23:39:07', 2, '2013-06-20 23:39:07', 2),
(988, 95, 'MOUMINIA', '', 1, '2013-06-20 23:39:28', 2, '2013-06-20 23:39:28', 2),
(989, 95, 'OURY TOUNNY', '', 1, '2013-06-20 23:39:55', 2, '2013-06-20 23:39:55', 2),
(990, 95, 'SAGALE CENTRE', '', 1, '2013-06-20 23:40:14', 2, '2013-06-20 23:40:14', 2),
(991, 95, 'TELIWEL', '', 1, '2013-06-20 23:40:44', 2, '2013-06-20 23:40:44', 2),
(992, 95, 'THINDOYE', '', 1, '2013-06-20 23:41:16', 2, '2013-06-20 23:41:16', 2),
(993, 96, 'LEY FELLO', '', 1, '2013-06-20 23:41:48', 2, '2013-06-20 23:41:48', 2),
(994, 96, 'LEY LAGUI', '', 1, '2013-06-20 23:42:13', 2, '2013-06-20 23:42:13', 2),
(995, 96, 'NDANTARI OURY', '', 1, '2013-06-20 23:42:44', 2, '2013-06-20 23:42:44', 2),
(996, 96, 'N\\\'DITA', '', 1, '2013-06-20 23:43:04', 2, '2013-06-20 23:43:04', 2),
(997, 96, 'THIANGUEL BORY', '', 1, '2013-06-20 23:43:22', 2, '2013-09-17 18:34:40', 1),
(998, 68, 'DALEIN CENTRE', '', 1, '2013-06-21 18:10:44', 2, '2013-06-21 18:10:44', 2),
(999, 68, 'DOGHI', '', 1, '2013-06-21 18:11:04', 2, '2013-06-21 18:11:04', 2),
(1000, 68, 'KANSAKOUMA', '', 1, '2013-06-21 18:11:54', 2, '2013-06-21 18:11:54', 2),
(1001, 68, 'KOUNDOU DAGGHI', '', 1, '2013-06-21 18:12:15', 2, '2013-06-21 18:12:15', 2),
(1002, 68, 'N\\\'DANTAWI MARI', '', 1, '2013-06-21 18:12:40', 2, '2013-06-21 18:12:40', 2),
(1003, 68, 'SAREKALY', '', 1, '2013-06-21 18:12:57', 2, '2013-06-21 18:12:57', 2),
(1004, 69, 'DARA KETHIOUN', '', 1, '2013-06-21 18:13:19', 2, '2013-06-21 18:14:04', 2),
(1005, 69, 'DARALABE CENTRE', '', 1, '2013-06-21 18:14:18', 2, '2013-06-21 18:14:18', 2),
(1006, 69, 'FELLO BANTAN', '', 1, '2013-06-21 18:14:40', 2, '2013-06-21 18:14:40', 2),
(1007, 69, 'KOURABA', '', 1, '2013-06-21 18:15:01', 2, '2013-09-18 09:31:27', 1),
(1009, 70, 'DIARI CENTRE', '', 1, '2013-06-21 18:16:18', 2, '2013-06-21 18:16:18', 2),
(1010, 70, 'DONTA', '', 1, '2013-06-21 18:17:14', 2, '2013-06-21 18:17:14', 2),
(1011, 71, 'DIONFO CENTRE', '', 1, '2013-06-21 18:17:38', 2, '2013-06-21 18:19:07', 2),
(1012, 70, 'KOULA MAOUDE', '', 1, '2013-06-21 18:17:56', 2, '2013-06-21 18:17:56', 2),
(1013, 70, 'KOULA TOKOSSERE', '', 1, '2013-06-21 18:18:11', 2, '2013-06-21 18:18:11', 2),
(1014, 71, 'BOUROUBOTO', '', 1, '2013-06-21 18:18:37', 2, '2013-06-21 18:18:37', 2),
(1015, 71, 'N\\\'DEYLAL', '', 1, '2013-06-21 18:20:40', 2, '2013-06-21 18:20:40', 2),
(1016, 72, 'GARAMBE CENTRE', '', 1, '2013-06-21 18:21:03', 2, '2013-06-21 18:21:03', 2),
(1017, 72, 'LABE DHEPPERE', '', 1, '2013-06-21 18:21:23', 2, '2013-06-21 18:21:23', 2),
(1018, 72, 'SEGHEN', '', 1, '2013-06-21 18:21:49', 2, '2013-06-21 18:21:49', 2),
(1019, 73, 'BAGNAN', '', 1, '2013-06-21 18:22:11', 2, '2013-06-21 18:22:11', 2),
(1020, 73, 'GONKOU', '', 1, '2013-06-21 18:22:33', 2, '2013-06-21 18:22:33', 2),
(1021, 73, 'HAFIA CENTRE', '', 1, '2013-06-21 18:22:54', 2, '2013-06-21 18:22:54', 2),
(1022, 73, 'HINDE', '', 1, '2013-06-21 18:23:14', 2, '2013-06-21 18:23:14', 2),
(1023, 73, 'SIMPETIN', '', 1, '2013-06-21 18:23:31', 2, '2013-06-21 18:23:31', 2),
(1024, 74, 'DAR-ES-SALAM', '', 1, '2013-06-21 18:24:02', 2, '2013-06-21 18:24:02', 2),
(1025, 74, 'KALAN CENTRE', '', 1, '2013-06-21 18:24:22', 2, '2013-06-21 18:24:22', 2),
(1026, 74, 'MISSIDE TIGA', '', 1, '2013-06-21 18:24:49', 2, '2013-06-21 18:24:49', 2),
(1027, 75, 'BOUROUDJI', '', 1, '2013-06-21 18:25:17', 2, '2013-06-21 18:25:17', 2),
(1028, 75, 'HORE KASSA', '', 1, '2013-06-21 18:25:46', 2, '2013-06-21 18:25:46', 2),
(1029, 75, 'KOURAMANGUI CENTRE', '', 1, '2013-06-21 18:26:04', 2, '2013-06-21 18:26:04', 2),
(1030, 67, 'COMPAYA', '', 1, '2013-06-21 18:26:34', 2, '2013-06-21 18:26:34', 2),
(1031, 67, 'DAKA-1', '', 1, '2013-06-21 18:26:55', 2, '2013-06-21 18:26:55', 2),
(1032, 67, 'DAKA-2', '', 1, '2013-06-21 18:27:17', 2, '2013-06-21 18:27:17', 2),
(1033, 67, 'DONGHOL', '', 1, '2013-06-21 18:27:35', 2, '2013-06-21 18:27:35', 2),
(1034, 67, 'DONGHOL DAYEBHE', '', 1, '2013-06-21 18:27:52', 2, '2013-06-21 18:27:52', 2),
(1035, 67, 'DONGHORA', '', 1, '2013-06-21 18:28:18', 2, '2013-06-21 18:28:18', 2),
(1036, 67, 'DOW SARE', '', 1, '2013-06-21 18:28:41', 2, '2013-06-21 18:28:41', 2),
(1037, 67, 'FADY', '', 1, '2013-06-21 18:29:03', 2, '2013-06-21 18:29:03', 2),
(1038, 67, 'FAFABHE', '', 1, '2013-06-21 18:29:20', 2, '2013-06-21 18:29:20', 2),
(1039, 67, 'FALO BOWE', '', 1, '2013-06-21 18:29:40', 2, '2013-06-21 18:29:40', 2),
(1040, 67, 'HORE SAALA', '', 1, '2013-06-21 18:29:59', 2, '2013-09-18 09:53:45', 1),
(1041, 67, 'KONKOLA', '', 1, '2013-06-21 18:30:21', 2, '2013-06-21 18:30:21', 2),
(1042, 67, 'KOULIDARA', '', 1, '2013-06-21 18:30:42', 2, '2013-06-21 18:30:42', 2),
(1043, 67, 'MADINA', '', 1, '2013-06-21 18:31:05', 2, '2013-06-21 18:31:05', 2),
(1044, 67, 'MAIRIE', '', 1, '2013-06-21 18:31:29', 2, '2013-06-21 18:31:29', 2),
(1045, 67, 'MOSQUEE', '', 1, '2013-06-21 18:31:48', 2, '2013-06-21 18:31:48', 2),
(1046, 67, 'NADHEL', '', 1, '2013-06-21 18:32:04', 2, '2013-06-21 18:32:04', 2),
(1047, 67, 'PETEWEL', '', 1, '2013-06-21 18:32:23', 2, '2013-06-21 18:32:23', 2),
(1048, 67, 'POREKO', '', 1, '2013-06-21 18:32:51', 2, '2013-06-21 18:32:51', 2),
(1049, 67, 'POUNTHIOUN', '', 1, '2013-06-21 18:33:34', 2, '2013-06-21 18:33:34', 2),
(1050, 67, 'SAFATOU-1', '', 1, '2013-06-21 18:33:51', 2, '2013-06-21 18:33:51', 2),
(1051, 67, 'SAFATOU-2', '', 1, '2013-06-21 18:34:40', 2, '2013-06-21 18:34:40', 2),
(1052, 67, 'SAALA N\\\'DOUYEBHE', '', 1, '2013-06-21 18:34:56', 2, '2013-09-18 09:49:56', 1),
(1053, 67, 'TATA-1', '', 1, '2013-06-21 18:35:13', 2, '2013-06-21 18:35:13', 2),
(1054, 67, 'TATA-2', '', 1, '2013-06-21 18:35:41', 2, '2013-06-21 18:35:41', 2),
(1055, 76, 'DIAWOYA', '', 1, '2013-06-21 18:36:17', 2, '2013-06-21 18:36:17', 2),
(1056, 76, 'KASSAGUI', '', 1, '2013-06-21 18:36:44', 2, '2013-06-21 18:36:44', 2),
(1057, 76, 'KOUNDIEYA', '', 1, '2013-06-21 18:37:06', 2, '2013-09-18 09:47:09', 1),
(1058, 76, 'NOUSSY CENTRE', '', 1, '2013-06-21 18:38:07', 2, '2013-06-21 18:38:07', 2),
(1059, 76, 'MOBHI', '', 1, '2013-06-21 18:38:30', 2, '2013-06-21 18:38:30', 2),
(1060, 77, 'POPODARA CENTRE', '', 1, '2013-06-21 18:38:49', 2, '2013-06-21 18:38:49', 2),
(1061, 77, 'SATINA', '', 1, '2013-06-21 18:39:14', 2, '2013-06-21 18:39:14', 2),
(1062, 77, 'SERIMA', '', 1, '2013-06-21 18:39:38', 2, '2013-06-21 18:39:38', 2),
(1063, 76, 'SILORBHE', '', 1, '2013-06-21 18:40:15', 2, '2013-06-21 18:40:15', 2),
(1064, 77, 'SOMBILY', '', 1, '2013-06-21 18:41:49', 2, '2013-06-21 18:41:49', 2),
(1065, 77, 'TOULET', '', 1, '2013-06-21 18:42:19', 2, '2013-06-21 18:42:19', 2),
(1066, 78, 'DAR-ES-SALAM', '', 1, '2013-06-21 18:43:01', 2, '2013-06-21 18:43:01', 2),
(1067, 78, 'DIOGOMA', '', 1, '2013-06-21 18:43:24', 2, '2013-06-21 18:43:24', 2),
(1068, 78, 'HAMDANLAYE', '', 1, '2013-06-21 18:43:45', 2, '2013-06-21 18:43:45', 2),
(1069, 78, 'KONDEL', '', 1, '2013-06-21 18:44:20', 2, '2013-06-21 18:44:20', 2),
(1070, 78, 'SANNOUN CENTRE', '', 1, '2013-06-21 18:44:40', 2, '2013-06-21 18:44:40', 2),
(1071, 78, 'TARAN', '', 1, '2013-06-21 18:44:59', 2, '2013-09-18 09:38:49', 1),
(1072, 79, 'GAMBIE', '', 1, '2013-06-21 18:45:34', 2, '2013-06-21 18:46:26', 2),
(1073, 79, 'TOLOU', '', 1, '2013-06-21 18:46:53', 2, '2013-06-21 18:46:53', 2),
(1074, 79, 'TOUNNY', '', 1, '2013-06-21 18:47:09', 2, '2013-09-18 09:37:34', 1),
(1075, 79, 'TOUNTOUROUN CENTRE', '', 1, '2013-06-21 18:47:25', 2, '2013-06-21 18:47:25', 2),
(1076, 98, 'BALAKI CENTRE', '', 1, '2013-06-21 18:49:59', 2, '2013-06-21 18:49:59', 2),
(1077, 98, 'BHOURIA', '', 1, '2013-06-21 18:50:16', 2, '2013-06-21 18:50:16', 2),
(1078, 98, 'DJOULABAYA', '', 1, '2013-06-21 18:50:41', 2, '2013-06-21 18:50:41', 2),
(1079, 98, 'FOULAYA', '', 1, '2013-06-21 18:51:16', 2, '2013-06-21 18:51:16', 2),
(1080, 98, 'KOPPOU', '', 1, '2013-06-21 18:51:33', 2, '2013-06-21 18:51:33', 2),
(1081, 98, 'MADINA FOULBHE', '', 1, '2013-06-21 18:51:52', 2, '2013-06-21 18:51:52', 2),
(1082, 99, 'BANDEA', '', 1, '2013-06-21 18:52:15', 2, '2013-06-21 18:52:15', 2),
(1083, 99, 'DOUGAYA', '', 1, '2013-06-21 18:52:36', 2, '2013-06-21 18:52:36', 2),
(1084, 99, 'MAYADINE', '', 1, '2013-06-21 18:53:01', 2, '2013-06-21 18:53:01', 2),
(1085, 99, 'SERIA', '', 1, '2013-06-21 18:53:29', 2, '2013-06-21 18:53:29', 2),
(1086, 99, 'SIGON CENTRE', '', 1, '2013-06-21 18:53:57', 2, '2013-06-21 18:53:57', 2),
(1087, 100, 'BADOUGOULA', '', 1, '2013-06-21 18:54:30', 2, '2013-06-21 18:54:30', 2),
(1088, 100, 'BAMBA-SABERE', '', 1, '2013-06-21 18:55:03', 2, '2013-09-17 17:35:59', 1),
(1089, 100, 'BOULLERE', '', 1, '2013-06-21 18:55:35', 2, '2013-06-21 18:55:35', 2),
(1090, 100, 'D&Acirc;RA', '', 1, '2013-06-21 18:56:30', 2, '2013-09-17 17:36:34', 1),
(1091, 100, 'DIENDIEN', '', 1, '2013-06-21 18:56:54', 2, '2013-09-17 17:37:58', 1),
(1092, 100, 'DIOHERE', '', 1, '2013-06-21 18:57:17', 2, '2013-09-17 17:37:23', 1),
(1093, 100, 'DOUGOUNTOUNNY CENTRE', '', 1, '2013-06-21 18:57:41', 2, '2013-06-21 18:57:41', 2),
(1094, 100, 'KOKOUMA', '', 1, '2013-06-21 18:57:59', 2, '2013-06-21 18:57:59', 2),
(1095, 100, 'WANSAN', '', 1, '2013-06-21 18:58:17', 2, '2013-06-21 18:58:17', 2),
(1096, 101, 'FOUGOU CENTRE', '', 1, '2013-06-21 18:58:52', 2, '2013-06-21 18:58:52', 2),
(1097, 101, 'KANSAGHEL', '', 1, '2013-06-21 18:59:09', 2, '2013-09-17 17:35:09', 1),
(1098, 101, 'SAMANTANG', '', 1, '2013-06-21 18:59:29', 2, '2013-06-21 18:59:29', 2),
(1099, 102, 'DARA-BELY', '', 1, '2013-06-21 19:00:02', 2, '2013-09-17 17:34:26', 1),
(1100, 102, 'EMOU-GAYAH', '', 1, '2013-06-21 19:00:33', 2, '2013-09-17 17:33:53', 1),
(1101, 102, 'GAYAH CENTRE', '', 1, '2013-06-21 19:01:20', 2, '2013-06-21 19:01:20', 2),
(1102, 102, 'HOOLO', '', 1, '2013-06-21 19:02:04', 2, '2013-06-21 19:02:04', 2),
(1103, 103, 'DALAMA', '', 1, '2013-06-21 19:02:22', 2, '2013-06-21 19:02:22', 2),
(1104, 103, 'HIDAYATOU CENTRE', '', 1, '2013-06-21 19:02:39', 2, '2013-06-21 19:02:39', 2),
(1105, 103, 'KOUNDA', '', 1, '2013-06-21 19:03:13', 2, '2013-06-21 19:03:13', 2),
(1106, 104, 'LEBEKERE CENTRE', '', 1, '2013-06-21 19:03:55', 2, '2013-06-21 19:03:55', 2),
(1107, 104, 'SINTHIOU-YANDY', '', 1, '2013-06-21 19:04:32', 2, '2013-09-17 17:28:12', 1),
(1108, 106, 'GHAHIRA', '', 1, '2013-06-21 19:04:54', 2, '2013-06-21 19:04:54', 2),
(1109, 105, 'BOUNAYA', '', 1, '2013-06-21 19:05:14', 2, '2013-06-21 19:06:25', 2),
(1110, 106, 'HORE FELLO', '', 1, '2013-06-21 19:06:06', 2, '2013-06-21 19:06:06', 2),
(1111, 106, 'MADINA CENTRE', '', 1, '2013-06-21 19:06:43', 2, '2013-09-17 17:27:27', 1),
(1112, 105, 'CECE', '', 1, '2013-06-21 19:07:10', 2, '2013-06-21 19:07:10', 2),
(1113, 105, 'MADINA WORA CENTRE', '', 1, '2013-06-21 19:07:33', 2, '2013-06-21 19:07:33', 2),
(1114, 105, 'SOUGUE', '', 1, '2013-06-21 19:07:53', 2, '2013-06-21 19:07:53', 2),
(1115, 97, 'BARA', '', 1, '2013-06-21 19:08:20', 2, '2013-06-21 19:08:20', 2),
(1116, 97, 'BHOUNDOU HOLLANDE', '', 1, '2013-06-21 19:08:40', 2, '2013-09-17 17:45:19', 1),
(1117, 97, 'BOGOMA', '', 1, '2013-06-21 19:10:04', 2, '2013-06-21 19:10:04', 2),
(1118, 97, 'SOUGUE', '', 1, '2013-06-21 19:10:29', 2, '2013-06-21 19:10:29', 2),
(1119, 97, 'HORE FELLO YANDI', '', 1, '2013-06-21 19:11:22', 2, '2013-06-21 19:11:22', 2),
(1120, 97, 'KORTEMERE', '', 1, '2013-06-21 19:11:41', 2, '2013-06-21 19:11:41', 2),
(1121, 97, 'KOUMBA', '', 1, '2013-06-21 19:12:03', 2, '2013-06-21 19:12:03', 2),
(1122, 97, 'LEY THIEHEL', '', 1, '2013-06-21 19:12:26', 2, '2013-06-21 19:12:26', 2),
(1123, 97, 'MALI I', '', 1, '2013-06-21 19:12:46', 2, '2013-09-17 17:50:21', 1),
(1124, 97, 'MALI II', '', 1, '2013-06-21 19:13:11', 2, '2013-09-17 17:44:38', 1),
(1125, 97, 'MALI MISSIDE', '', 1, '2013-06-21 19:13:39', 2, '2013-06-21 19:13:39', 2),
(1126, 67, 'MALI MISSIDE', '', 1, '2013-06-21 19:14:05', 2, '2013-06-21 19:14:05', 2),
(1127, 97, 'PAKAYA', '', 1, '2013-06-21 19:14:39', 2, '2013-06-21 19:14:39', 2),
(1128, 97, 'WANWAN', '', 1, '2013-06-21 19:15:17', 2, '2013-06-21 19:15:17', 2),
(1129, 107, 'D&Acirc;RE SALAM', '', 1, '2013-06-21 19:15:37', 2, '2013-09-17 17:58:46', 1),
(1130, 107, 'DARA MERE', '', 1, '2013-06-21 19:16:40', 2, '2013-09-17 17:57:51', 1),
(1131, 107, 'MADINA DIGANADJI', '', 1, '2013-06-21 19:16:59', 2, '2013-06-21 19:16:59', 2),
(1132, 107, 'MELIYA', '', 1, '2013-06-21 19:17:26', 2, '2013-09-17 17:57:24', 1),
(1133, 107, 'SENGUELY', '', 1, '2013-06-21 19:18:04', 2, '2013-09-17 17:58:24', 1),
(1134, 107, 'TELIRE CENTRE', '', 1, '2013-06-21 19:18:28', 2, '2013-06-21 19:18:28', 2),
(1135, 108, 'BANDANI', '', 1, '2013-06-21 19:18:55', 2, '2013-06-21 19:18:55', 2),
(1136, 108, 'KOYA', '', 1, '2013-06-21 19:19:37', 2, '2013-06-21 19:19:37', 2),
(1137, 108, 'SANGUI', '', 1, '2013-06-21 19:20:11', 2, '2013-06-21 19:20:11', 2),
(1138, 108, 'TOUBA CENTRE', '', 1, '2013-06-21 19:20:45', 2, '2013-06-21 19:20:45', 2),
(1139, 109, 'DONGOL', '', 1, '2013-06-21 19:21:06', 2, '2013-06-21 19:21:06', 2),
(1140, 109, 'HORE-N\\\'DALA', '', 1, '2013-06-21 19:21:27', 2, '2013-09-17 17:53:36', 1),
(1141, 109, 'HORE-SARE', '', 1, '2013-06-21 19:22:07', 2, '2013-09-17 17:53:13', 1),
(1142, 109, 'KELEN', '', 1, '2013-06-21 19:22:36', 2, '2013-09-17 17:52:20', 1),
(1143, 109, 'MBARA', '', 1, '2013-06-21 19:22:55', 2, '2013-09-17 17:52:41', 1),
(1144, 109, 'PELLAL', '', 1, '2013-06-21 19:23:13', 2, '2013-06-21 19:23:13', 2),
(1145, 109, 'YIMBERING CENTRE', '', 1, '2013-06-21 19:23:31', 2, '2013-06-21 19:23:31', 2),
(1146, 204, 'ARFAMOUSSAYA CENTRE', '', 1, '2013-06-21 21:21:38', 2, '2013-06-21 21:22:07', 2),
(1147, 204, 'FADAMA', '', 1, '2013-06-22 21:10:20', 1, '2013-06-22 21:10:20', 1),
(1148, 204, 'FELLA-HAMDALLAYE', '', 1, '2013-06-22 21:10:41', 1, '2013-09-12 16:41:45', 1),
(1149, 205, 'HERAKO', '', 1, '2013-06-22 21:11:24', 1, '2013-06-22 21:11:24', 1),
(1150, 205, 'HEREMAKONO', '', 1, '2013-06-22 21:12:14', 1, '2013-09-12 16:43:04', 1),
(1151, 205, 'KEBEYA I', '', 1, '2013-06-22 21:12:37', 1, '2013-09-16 10:39:17', 1),
(1152, 205, 'NAFADJI', '', 1, '2013-06-22 21:13:04', 1, '2013-06-22 21:13:04', 1),
(1153, 205, 'NIANDAN', '', 1, '2013-06-22 21:16:04', 1, '2013-06-22 21:16:04', 1),
(1154, 206, 'BALAYAN', '', 1, '2013-06-22 21:16:31', 1, '2013-06-22 21:16:31', 1),
(1155, 206, 'KAMBAYA', '', 1, '2013-06-22 21:17:03', 1, '2013-06-22 21:17:03', 1),
(1156, 206, 'KANKANFODEYA', '', 1, '2013-06-22 21:17:23', 1, '2013-06-22 21:17:23', 1),
(1157, 206, 'LOPPE', '', 1, '2013-06-22 21:17:40', 1, '2013-06-22 21:17:40', 1),
(1158, 206, 'SAMPOLIA', '', 1, '2013-06-22 21:18:03', 1, '2013-06-22 21:18:03', 1),
(1159, 206, 'TINKISSO', '', 1, '2013-06-22 21:18:23', 1, '2013-06-22 21:18:23', 1),
(1160, 207, 'TOTYA', '', 1, '2013-06-22 21:18:45', 1, '2013-09-16 10:53:59', 1),
(1161, 203, 'FOUNDENG II', '', 1, '2013-06-22 21:19:09', 1, '2013-09-16 10:48:46', 1),
(1162, 203, 'HAMDALLAYE', '', 1, '2013-06-22 21:19:30', 1, '2013-06-22 21:19:30', 1),
(1163, 203, 'HEREMAKONON', '', 1, '2013-06-22 21:20:37', 1, '2013-06-22 21:20:37', 1),
(1164, 203, 'KALELA', '', 1, '2013-06-22 21:21:02', 1, '2013-06-22 21:21:02', 1),
(1165, 203, 'TINKISSO', '', 1, '2013-06-22 21:21:47', 1, '2013-06-22 21:21:47', 1),
(1166, 207, 'DABOLA- BERETE', '', 1, '2013-06-22 21:22:07', 1, '2013-09-16 10:56:01', 1),
(1167, 207, 'DOGOMET CENTRE I', '', 1, '2013-06-22 21:22:25', 1, '2013-09-16 10:54:47', 1),
(1168, 207, 'FELLO-N\\\'DIANDY', '', 1, '2013-06-22 21:22:51', 1, '2013-09-16 10:56:30', 1),
(1169, 207, 'KOBOLONIA', '', 1, '2013-06-22 21:23:12', 1, '2013-06-22 21:23:12', 1),
(1170, 207, 'KOLOKANKAN FODEA', '', 1, '2013-06-22 21:23:39', 1, '2013-06-22 21:23:39', 1),
(1171, 207, 'SARIFOULA-BAFING', '', 1, '2013-06-22 21:24:02', 1, '2013-09-16 10:59:20', 1),
(1172, 207, 'SEGAYA', '', 1, '2013-06-22 21:24:21', 1, '2013-09-16 10:58:28', 1),
(1173, 208, 'DIGUILIN', '', 1, '2013-06-22 21:24:47', 1, '2013-06-22 21:24:47', 1),
(1174, 208, 'KANKAMA CENTRE', '', 1, '2013-06-22 21:25:09', 1, '2013-06-22 21:25:09', 1),
(1175, 209, 'KINDOYE I', '', 1, '2013-06-22 21:25:32', 1, '2013-09-16 11:04:22', 1),
(1176, 209, 'KINDOYE II', '', 1, '2013-06-22 21:25:55', 1, '2013-09-16 11:04:41', 1),
(1177, 209, 'TIGUISSAN', '', 1, '2013-06-22 21:26:20', 1, '2013-06-22 21:26:20', 1),
(1178, 210, 'DANDAKARA', '', 1, '2013-06-22 21:26:50', 1, '2013-06-22 21:26:50', 1),
(1179, 210, 'KONINDOU I', '', 1, '2013-06-22 21:27:20', 1, '2013-09-16 11:05:46', 1),
(1180, 210, 'KONINDOU II', '', 1, '2013-06-22 21:27:44', 1, '2013-09-16 11:06:07', 1),
(1181, 211, 'DIABAKANIA', '', 1, '2013-06-22 21:28:26', 1, '2013-09-16 11:07:38', 1),
(1182, 211, 'FINALA', '', 1, '2013-06-22 21:28:57', 1, '2013-06-22 21:28:57', 1),
(1183, 211, 'KONSO', '', 1, '2013-06-22 21:29:35', 1, '2013-06-22 21:29:35', 1),
(1184, 211, 'N\\\'DEMA', '', 1, '2013-06-22 21:29:56', 1, '2013-09-16 11:08:09', 1),
(1185, 217, 'BABILA', '', 1, '2013-06-22 21:31:50', 1, '2013-06-22 21:31:50', 1),
(1186, 217, 'BOKOTY', '', 1, '2013-06-22 21:32:32', 1, '2013-09-16 11:48:24', 1),
(1187, 217, 'DIABEREMINI', '', 1, '2013-06-22 21:34:35', 1, '2013-06-22 21:34:35', 1),
(1188, 217, 'DJISSOUMA', '', 1, '2013-06-22 21:34:55', 1, '2013-06-22 21:34:55', 1),
(1189, 217, 'FARABATO', '', 1, '2013-06-22 21:35:20', 1, '2013-06-22 21:35:20', 1),
(1190, 217, 'FODEKARIA', '', 1, '2013-06-22 21:35:40', 1, '2013-09-16 11:50:20', 1),
(1191, 217, 'FOGNOKONKO', '', 1, '2013-06-22 21:36:01', 1, '2013-09-16 11:46:59', 1),
(1192, 217, 'KALINKO CENTRE', '', 1, '2013-06-22 21:36:25', 1, '2013-06-22 21:36:25', 1),
(1193, 217, 'KANSATO', '', 1, '2013-06-22 21:36:57', 1, '2013-06-22 21:36:57', 1),
(1194, 217, 'KANSATO SERIYA', '', 1, '2013-06-22 21:37:16', 1, '2013-06-22 21:37:16', 1),
(1195, 217, 'LEPPY THIEWY', '', 1, '2013-06-22 21:37:35', 1, '2013-09-16 11:46:27', 1),
(1196, 217, 'LOUFFA MISSIDE', '', 1, '2013-06-22 21:38:00', 1, '2013-06-22 21:38:00', 1),
(1197, 217, 'NIOGO', '', 1, '2013-06-22 21:38:18', 1, '2013-06-22 21:38:18', 1),
(1198, 217, 'SANTANFARA', '', 1, '2013-06-22 21:38:41', 1, '2013-09-16 11:47:43', 1),
(1199, 217, 'YALAGUERE', '', 1, '2013-06-22 21:39:01', 1, '2013-09-16 11:52:04', 1),
(1200, 218, 'DAYEBHE', '', 1, '2013-06-22 21:39:30', 1, '2013-06-22 21:39:30', 1),
(1201, 218, 'HANSAGUERE', '', 1, '2013-06-22 21:39:48', 1, '2013-09-16 11:58:45', 1),
(1202, 218, 'LANSANAYA', '', 1, '2013-06-22 21:40:06', 1, '2013-09-16 11:56:06', 1),
(1203, 218, 'SANTIGUIA', '', 1, '2013-06-22 21:40:22', 1, '2013-09-16 11:58:13', 1),
(1204, 218, 'TAMBANORO', '', 1, '2013-06-22 21:40:53', 1, '2013-09-16 11:57:21', 1),
(1205, 218, 'WOUYABHE', '', 1, '2013-06-22 21:41:20', 1, '2013-06-22 21:41:20', 1),
(1206, 219, 'BOSSERE', '', 1, '2013-06-22 21:41:42', 1, '2013-06-22 21:41:42', 1),
(1207, 219, 'FADIA', '', 1, '2013-06-22 21:42:02', 1, '2013-06-22 21:42:02', 1),
(1208, 219, 'KOBALA', '', 1, '2013-06-22 21:42:27', 1, '2013-06-22 21:42:27', 1),
(1209, 219, 'SELOUMA', '', 1, '2013-06-22 21:42:45', 1, '2013-09-16 11:59:35', 1),
(1210, 219, 'WALA WALA', '', 1, '2013-06-22 21:43:05', 1, '2013-09-16 12:08:39', 1),
(1211, 213, 'BANORA CENTRE', '', 1, '2013-06-22 21:43:28', 1, '2013-06-22 21:43:28', 1),
(1212, 213, 'BOUBERE', '', 1, '2013-06-22 21:43:51', 1, '2013-06-22 21:43:51', 1),
(1213, 213, 'BOUKARIA', '', 1, '2013-06-22 21:44:14', 1, '2013-06-22 21:44:14', 1),
(1214, 213, 'KOLLA', '', 1, '2013-06-22 21:44:38', 1, '2013-06-22 21:44:38', 1),
(1215, 213, 'LOPPE-SOUNTOU', '', 1, '2013-06-22 21:45:13', 1, '2013-09-16 11:14:26', 1),
(1216, 213, 'MATAGANIA', '', 1, '2013-06-22 21:45:34', 1, '2013-06-22 21:45:34', 1),
(1217, 213, 'M\\\'BOUNET', '', 1, '2013-06-22 21:45:54', 1, '2013-09-16 11:13:27', 1),
(1218, 213, 'M\\\'BALLOUFRA', '', 1, '2013-06-22 21:46:12', 1, '2013-09-16 11:18:14', 1),
(1219, 213, 'NAFADJI', '', 1, '2013-06-22 21:46:43', 1, '2013-06-22 21:46:43', 1),
(1220, 213, 'N\\\'DIARENDI', '', 1, '2013-06-22 21:46:59', 1, '2013-09-16 11:17:51', 1),
(1221, 213, 'KOKOROBANI', '', 1, '2013-06-22 21:47:21', 1, '2013-09-16 11:18:50', 1),
(1222, 214, 'DAR ES SALAM', '', 1, '2013-06-22 21:48:14', 1, '2013-09-16 11:28:20', 1),
(1223, 214, 'DIALAKORO', '', 1, '2013-06-22 21:48:36', 1, '2013-09-16 11:29:42', 1),
(1224, 214, 'FELLO LAMOU', '', 1, '2013-06-22 21:49:08', 1, '2013-06-22 21:49:08', 1),
(1225, 214, 'MOSSOKO', '', 1, '2013-06-22 21:50:24', 1, '2013-06-22 21:50:24', 1),
(1226, 214, 'WATAGALA', '', 1, '2013-06-22 21:50:46', 1, '2013-06-22 21:50:46', 1),
(1227, 215, 'DABATOU', '', 1, '2013-06-22 21:58:16', 1, '2013-06-22 21:58:16', 1),
(1228, 215, 'DIATIFERE CENTRE', '', 1, '2013-06-22 21:58:43', 1, '2013-06-22 21:58:43', 1),
(1229, 215, 'FADOUGOU', '', 1, '2013-06-22 21:59:16', 1, '2013-06-22 21:59:16', 1),
(1230, 215, 'FAMMERE', '', 1, '2013-06-22 21:59:40', 1, '2013-09-16 11:32:31', 1),
(1231, 215, 'FANDANDA', '', 1, '2013-06-22 22:00:38', 1, '2013-06-22 22:00:38', 1),
(1232, 215, 'MAMOUDOUYA II', '', 1, '2013-06-22 22:01:06', 1, '2013-09-16 11:34:58', 1),
(1233, 215, 'MAMOUDOUYA I', '', 1, '2013-06-22 22:01:28', 1, '2013-09-16 11:35:38', 1),
(1234, 215, 'NANAKO', '', 1, '2013-06-22 22:02:57', 1, '2013-06-22 22:02:57', 1),
(1235, 215, 'SOUBEKINDI', '', 1, '2013-06-22 22:03:16', 1, '2013-06-22 22:03:16', 1),
(1236, 215, 'SOUROU', '', 1, '2013-06-22 22:03:42', 1, '2013-06-22 22:03:42', 1),
(1237, 215, 'SYLLAYA', '', 1, '2013-06-22 22:04:06', 1, '2013-06-22 22:04:06', 1),
(1238, 215, 'WONSON', '', 1, '2013-06-22 22:04:30', 1, '2013-06-22 22:04:30', 1),
(1239, 212, 'BALLA GNOUMAYA', '', 1, '2013-06-22 22:04:56', 1, '2013-09-16 11:22:22', 1),
(1240, 212, 'BHOURIA', '', 1, '2013-06-22 22:05:25', 1, '2013-09-16 11:22:52', 1),
(1241, 212, 'MANDEN', '', 1, '2013-06-22 22:05:52', 1, '2013-06-22 22:05:52', 1),
(1242, 212, 'HELLAYABHE', '', 1, '2013-06-22 22:06:10', 1, '2013-06-22 22:06:10', 1),
(1243, 212, 'KAMBAN AINDE', '', 1, '2013-06-22 22:07:28', 1, '2013-09-16 11:25:30', 1),
(1244, 212, 'KAMBAN SABE', '', 1, '2013-06-22 22:08:51', 1, '2013-06-22 22:08:51', 1),
(1245, 212, 'KEBALY', '', 1, '2013-06-22 22:10:54', 1, '2013-06-22 22:10:54', 1),
(1246, 212, 'KOUBY LEY SERE', '', 1, '2013-06-22 22:11:59', 1, '2013-06-22 22:11:59', 1),
(1247, 212, 'KOUMBIYA LEY FELLO', '', 1, '2013-06-22 22:12:31', 1, '2013-09-16 11:26:15', 1),
(1248, 212, 'KOUROULA', '', 1, '2013-06-22 22:16:23', 1, '2013-06-22 22:16:23', 1),
(1249, 212, 'LANKON', '', 1, '2013-06-22 22:16:46', 1, '2013-06-22 22:16:46', 1),
(1250, 212, 'PARADJI', '', 1, '2013-06-22 22:17:13', 1, '2013-06-22 22:17:13', 1),
(1251, 212, 'PARAWOL  DIAGUI', '', 1, '2013-06-22 22:17:35', 1, '2013-06-22 22:17:35', 1),
(1252, 212, 'SEBEKORO', '', 1, '2013-06-22 22:17:59', 1, '2013-06-22 22:17:59', 1),
(1253, 212, 'TINKISSO', '', 1, '2013-06-22 22:18:28', 1, '2013-06-22 22:18:28', 1),
(1254, 216, 'BAGUI', '', 1, '2013-06-22 22:18:45', 1, '2013-06-22 22:18:45', 1),
(1255, 216, 'BELEYA', '', 1, '2013-06-22 22:19:04', 1, '2013-06-22 22:19:04', 1),
(1256, 216, 'BOUSSOURA (WOUMBOU)', '', 1, '2013-06-22 22:19:22', 1, '2013-09-16 11:38:11', 1),
(1257, 216, 'GAGNAKALY CENTRE', '', 1, '2013-06-22 22:19:47', 1, '2013-06-22 22:19:47', 1),
(1258, 216, 'HERAKO', '', 1, '2013-06-22 22:20:24', 1, '2013-06-22 22:20:24', 1),
(1259, 216, 'KALINKO MISSIRA', '', 1, '2013-06-22 22:21:02', 1, '2013-06-22 22:21:02', 1),
(1260, 216, 'KEYLA', '', 1, '2013-06-22 22:21:31', 1, '2013-09-16 11:36:52', 1),
(1261, 216, 'MISSIRA DJALONKE', '', 1, '2013-06-22 22:21:52', 1, '2013-09-16 11:37:31', 1),
(1262, 199, 'DIGUILA', '', 1, '2013-06-22 22:23:57', 1, '2013-06-22 22:23:57', 1),
(1263, 199, 'NIENOUYA', '', 1, '2013-06-22 22:24:23', 1, '2013-06-22 22:24:23', 1),
(1264, 197, 'MARELLA I', '', 1, '2013-06-22 22:28:38', 1, '2013-09-16 13:38:28', 1),
(1265, 199, 'PASSAYAH ALMAMYA', '', 1, '2013-06-22 22:29:05', 1, '2013-09-16 13:57:45', 1),
(1266, 199, 'TOUMANIA', '', 1, '2013-06-22 22:30:32', 1, '2013-06-22 22:30:32', 1),
(1267, 200, 'LAYA SOLIMA', '', 1, '2013-06-22 22:30:56', 1, '2013-06-22 22:31:35', 1),
(1268, 200, 'NIAYA - FORITA', '', 1, '2013-06-22 22:31:48', 1, '2013-09-16 14:09:43', 1),
(1269, 200, 'SANDENIA-MOSQUEE', '', 1, '2013-06-22 22:32:07', 1, '2013-09-16 14:08:49', 1),
(1270, 197, 'BOKETO', '', 1, '2013-06-22 22:32:25', 1, '2013-06-22 22:32:25', 1),
(1271, 197, 'BOUSSOURA', '', 1, '2013-06-22 22:33:12', 1, '2013-06-22 22:33:12', 1),
(1272, 197, 'KALIA I', '', 1, '2013-06-22 22:35:03', 1, '2013-09-16 13:45:41', 1),
(1273, 197, 'SABERE- KALIA', '', 1, '2013-06-22 22:35:50', 1, '2013-09-16 13:43:18', 1),
(1274, 197, 'SOLOYA', '', 1, '2013-06-22 22:36:09', 1, '2013-06-22 22:36:09', 1),
(1275, 197, 'SOUMAYEREYA', '', 1, '2013-06-22 22:36:43', 1, '2013-06-22 22:36:43', 1),
(1276, 198, 'ARFELLA', '', 1, '2013-06-22 22:37:19', 1, '2013-09-16 13:54:38', 1),
(1277, 198, 'BANTOUN', '', 1, '2013-06-22 22:37:45', 1, '2013-06-22 22:37:45', 1),
(1278, 198, 'KAMARA', '', 1, '2013-06-22 22:38:06', 1, '2013-06-22 22:38:06', 1),
(1279, 198, 'NIALIA I', '', 1, '2013-06-22 22:38:28', 1, '2013-09-16 13:53:53', 1),
(1280, 198, 'SILIMY', '', 1, '2013-06-22 22:38:53', 1, '2013-06-22 22:38:53', 1),
(1281, 202, 'KALANKO', '', 1, '2013-06-22 22:40:00', 1, '2013-06-22 22:40:00', 1),
(1282, 201, 'DAMANIA', '', 1, '2013-06-22 22:40:20', 1, '2013-06-22 22:40:20', 1),
(1283, 201, 'KABELEYA', '', 1, '2013-06-22 22:40:39', 1, '2013-09-16 12:29:29', 1),
(1284, 201, 'MONGOCERDOU', '', 1, '2013-06-22 22:41:06', 1, '2013-09-16 12:30:14', 1),
(1285, 201, 'SONGOYAH MARCHE', '', 1, '2013-06-22 22:42:03', 1, '2013-09-16 12:24:11', 1),
(1286, 202, 'KABAYABA', '', 1, '2013-06-22 22:42:33', 1, '2013-06-22 22:42:33', 1),
(1287, 202, 'LAYA SANDO', '', 1, '2013-06-22 22:42:59', 1, '2013-06-22 22:42:59', 1),
(1288, 202, 'SERDOU', '', 1, '2013-06-22 22:43:16', 1, '2013-06-22 22:43:16', 1),
(1289, 202, 'TIRO ALMAMYA', '', 1, '2013-06-22 22:43:56', 1, '2013-06-22 22:43:56', 1),
(1290, 202, 'TIRO MARCHE', '', 1, '2013-06-22 22:44:24', 1, '2013-06-22 22:44:24', 1),
(1291, 193, 'BALAYA', '', 1, '2013-06-22 22:44:55', 1, '2013-09-16 12:17:33', 1),
(1292, 193, 'BAMBAYA', '', 1, '2013-06-22 22:45:18', 1, '2013-06-22 22:45:18', 1),
(1293, 193, 'BANIAN 1', '', 1, '2013-06-22 22:45:47', 1, '2013-09-16 12:10:10', 1),
(1294, 193, 'NIANFOURANDO', '', 1, '2013-06-22 22:46:13', 1, '2013-09-16 12:22:11', 1),
(1295, 193, 'DOUMBAFE', '', 1, '2013-06-22 22:47:17', 1, '2013-06-22 22:47:17', 1),
(1296, 193, 'DOUWOULEMA', '', 1, '2013-06-22 22:47:43', 1, '2013-06-22 22:47:43', 1),
(1297, 193, 'KOURATOU', '', 1, '2013-06-22 22:48:07', 1, '2013-06-22 22:48:07', 1),
(1298, 193, 'SEMBELDO', '', 1, '2013-06-22 22:48:55', 1, '2013-06-22 22:48:55', 1),
(1299, 194, 'BEINDOU CENTRE', '', 1, '2013-06-22 22:49:18', 1, '2013-06-22 22:49:18', 1),
(1300, 194, 'NIAKO', '', 1, '2013-06-22 22:49:47', 1, '2013-06-22 22:49:47', 1),
(1301, 194, 'SEREKORO', '', 1, '2013-06-22 22:50:08', 1, '2013-06-22 22:50:08', 1),
(1302, 196, 'FRANKOUMA', '', 1, '2013-06-22 22:50:35', 1, '2013-06-22 22:50:35', 1),
(1303, 196, 'FOROKONIAH', '', 1, '2013-06-22 22:50:57', 1, '2013-09-16 13:34:31', 1),
(1304, 196, 'KOBIKORO', '', 1, '2013-06-22 22:51:16', 1, '2013-09-16 13:33:55', 1),
(1305, 196, 'KONDELEAH', '', 1, '2013-06-22 22:51:45', 1, '2013-09-16 13:35:14', 1),
(1306, 192, 'ABATTOIR I', '', 1, '2013-06-22 22:52:06', 1, '2013-09-16 12:47:05', 1),
(1307, 192, 'AVIATION', '', 1, '2013-06-22 22:54:39', 1, '2013-06-22 22:54:39', 1),
(1308, 192, 'BAF', '', 1, '2013-06-22 22:54:56', 1, '2013-06-22 22:54:56', 1),
(1309, 192, 'BIRISSA', '', 1, '2013-06-22 22:55:16', 1, '2013-06-22 22:55:16', 1),
(1310, 192, 'DANDAYA', '', 1, '2013-06-22 22:56:26', 1, '2013-06-22 22:56:26', 1),
(1311, 192, 'SASSAMBOU', '', 1, '2013-06-22 22:56:50', 1, '2013-09-16 12:50:27', 1),
(1312, 192, 'MOSQUEE', '', 1, '2013-06-22 22:57:13', 1, '2013-09-16 12:48:08', 1),
(1313, 192, 'SIRIKOLENY I', '', 1, '2013-06-22 22:57:44', 1, '2013-09-16 12:59:00', 1),
(1314, 192, 'SOULEYMANIA', '', 1, '2013-06-22 22:58:14', 1, '2013-06-22 22:58:14', 1),
(1315, 192, 'TONKOLONKO I', '', 1, '2013-06-22 22:58:31', 1, '2013-09-16 12:48:36', 12),
(1316, 192, 'YEREWALIA', '', 1, '2013-06-22 22:58:59', 1, '2013-06-22 22:58:59', 1),
(1317, 195, 'DANTILIA', '', 1, '2013-06-22 22:59:25', 1, '2013-06-22 22:59:25', 1),
(1318, 195, 'HEREMAKONO I', '', 1, '2013-06-22 23:01:04', 1, '2013-09-16 13:01:03', 1),
(1319, 195, 'YATTIYA', '', 1, '2013-06-22 23:01:34', 1, '2013-06-22 23:01:34', 1),
(1320, 180, 'ALBADARIAH CENTRE', '', 1, '2013-06-22 23:35:22', 1, '2013-09-16 14:13:31', 1),
(1321, 180, 'MERNAH', '', 1, '2013-06-22 23:35:45', 1, '2013-09-16 14:16:48', 1),
(1322, 180, 'YOMADOU', '', 1, '2013-06-22 23:36:04', 1, '2013-06-22 23:36:04', 1),
(1323, 181, 'BANAMA', '', 1, '2013-06-22 23:36:26', 1, '2013-09-16 15:19:28', 1),
(1324, 181, 'MANTRANIYA', '', 1, '2013-06-22 23:38:09', 1, '2013-09-16 15:27:14', 1),
(1325, 181, 'OUENDEKERE', '', 1, '2013-06-22 23:38:36', 1, '2013-06-22 23:38:36', 1),
(1326, 182, 'YAADOU', '', 1, '2013-06-22 23:40:32', 1, '2013-09-16 15:29:42', 1),
(1327, 182, 'BARDOU CENTRE', '', 1, '2013-06-22 23:40:52', 1, '2013-06-22 23:40:52', 1),
(1328, 182, 'GBANGBANDOU OUENDE', '', 1, '2013-06-22 23:41:27', 1, '2013-06-22 23:41:27', 1),
(1329, 182, 'KONDIAN', '', 1, '2013-06-22 23:41:44', 1, '2013-06-22 23:41:44', 1),
(1330, 183, 'BEINDOU', '', 1, '2013-06-22 23:42:05', 1, '2013-09-16 15:35:48', 1),
(1331, 183, 'FERMESSADOUBA', '', 1, '2013-06-22 23:42:31', 1, '2013-09-16 15:38:49', 1),
(1332, 183, 'GBANGADOU', '', 1, '2013-06-22 23:43:04', 1, '2013-06-22 23:43:04', 1),
(1333, 183, 'KOMARO', '', 1, '2013-06-22 23:43:43', 1, '2013-06-22 23:43:43', 1),
(1334, 184, 'BOUYE', '', 1, '2013-06-22 23:44:01', 1, '2013-06-22 23:44:01', 1),
(1335, 184, 'DEMBAYARA', '', 1, '2013-06-22 23:44:26', 1, '2013-06-22 23:44:26', 1),
(1336, 184, 'FERMESSADOU', '', 1, '2013-06-22 23:44:52', 1, '2013-09-16 16:26:11', 1),
(1337, 184, 'GBENINKORO', '', 1, '2013-06-22 23:45:09', 1, '2013-06-22 23:45:09', 1),
(1338, 184, 'MASSAKOUNDOU', '', 1, '2013-06-22 23:45:33', 1, '2013-06-22 23:45:33', 1),
(1339, 185, 'DANDOU', '', 1, '2013-06-22 23:46:00', 1, '2013-06-22 23:46:00', 1),
(1340, 185, 'FIRAWA', '', 1, '2013-06-22 23:46:24', 1, '2013-09-16 16:41:33', 1),
(1341, 186, 'FARMAYA', '', 1, '2013-06-22 23:46:43', 1, '2013-06-22 23:46:43', 1),
(1342, 186, 'GBANGBADOU', '', 1, '2013-06-22 23:47:20', 1, '2013-09-16 16:45:45', 1),
(1343, 186, 'KENEMA BOMBA', '', 1, '2013-06-22 23:50:18', 1, '2013-06-22 23:50:18', 1),
(1344, 186, 'YARDO', '', 1, '2013-06-22 23:50:41', 1, '2013-09-16 16:47:02', 1),
(1345, 179, 'DAR ES SALAM', '', 1, '2013-06-22 23:51:29', 1, '2013-06-22 23:51:29', 1),
(1346, 179, 'DOUMINKONO', '', 1, '2013-06-22 23:51:50', 1, '2013-06-22 23:51:50', 1),
(1347, 179, 'FARAKO', '', 1, '2013-06-22 23:52:15', 1, '2013-09-16 16:15:14', 1),
(1348, 179, 'GBANGBAN', '', 1, '2013-06-22 23:52:32', 1, '2013-06-22 23:52:32', 1),
(1349, 179, 'HAMDALLAYE', '', 1, '2013-06-22 23:52:52', 1, '2013-06-22 23:52:52', 1),
(1350, 179, 'HERMAKONON', '', 1, '2013-06-22 23:53:13', 1, '2013-09-16 16:17:42', 1),
(1351, 179, 'KENEMA', '', 1, '2013-06-22 23:54:00', 1, '2013-06-22 23:54:00', 1),
(1352, 179, 'KORODOU I', '', 1, '2013-06-22 23:54:23', 1, '2013-09-16 15:52:38', 1),
(1353, 179, 'LIMANIA', '', 1, '2013-06-22 23:54:40', 1, '2013-06-22 23:54:40', 1),
(1354, 179, 'MADINA I', '', 1, '2013-06-22 23:54:59', 1, '2013-09-16 15:49:06', 1),
(1355, 179, 'SOGBE I', '', 1, '2013-06-22 23:55:17', 1, '2013-09-16 15:59:51', 1),
(1356, 187, 'BALLANSAMA', '', 1, '2013-06-22 23:55:41', 1, '2013-09-16 16:57:09', 1),
(1357, 187, 'BONGORO', '', 1, '2013-06-22 23:56:24', 1, '2013-06-22 23:56:24', 1),
(1358, 187, 'KONDIADOU CENTRE', '', 1, '2013-06-22 23:57:49', 1, '2013-09-16 16:55:02', 1),
(1359, 187, 'SOULAKOLO', '', 1, '2013-06-22 23:58:23', 1, '2013-06-22 23:58:23', 1),
(1360, 188, 'BAMBASSIARYA', '', 1, '2013-06-22 23:58:55', 1, '2013-09-16 14:25:01', 1),
(1361, 188, 'DIALAKORO', '', 1, '2013-06-22 23:59:28', 1, '2013-06-22 23:59:28', 1),
(1362, 188, 'MANFRAN', '', 1, '2013-06-22 23:59:47', 1, '2013-09-16 14:20:44', 1),
(1363, 189, 'FOREAH', '', 1, '2013-06-23 00:00:11', 1, '2013-06-23 00:00:11', 1),
(1364, 188, 'KAMERENDOU', '', 1, '2013-06-23 00:00:32', 1, '2013-06-23 00:00:32', 1),
(1365, 189, 'MERMERIAH', '', 1, '2013-06-23 00:01:04', 1, '2013-06-23 00:01:04', 1),
(1366, 189, 'SANGARDO CENTRE', '', 1, '2013-06-23 00:02:31', 1, '2013-06-23 00:02:31', 1),
(1367, 189, 'WOSSO KORMA', '', 1, '2013-06-23 00:03:05', 1, '2013-09-16 14:35:06', 1),
(1368, 190, 'BAMBA', '', 1, '2013-06-23 00:03:45', 1, '2013-06-23 00:03:45', 1),
(1369, 190, 'WONDETO', '', 1, '2013-06-23 00:04:13', 1, '2013-09-16 15:03:00', 1),
(1370, 190, 'WALTO', '', 1, '2013-06-23 00:04:36', 1, '2013-06-23 00:04:36', 1),
(1371, 190, 'YENDE I', '', 1, '2013-06-23 00:04:57', 1, '2013-09-16 15:00:08', 1),
(1372, 191, 'BAGBE', '', 1, '2013-06-23 00:05:18', 1, '2013-06-23 00:05:18', 1),
(1373, 191, 'DANKALDOU', '', 1, '2013-06-23 00:05:38', 1, '2013-06-23 00:05:38', 1),
(1374, 191, 'FORODOU', '', 1, '2013-06-23 00:06:04', 1, '2013-06-23 00:06:04', 1),
(1375, 191, 'YOMBIRO', '', 1, '2013-06-23 00:06:27', 1, '2013-09-16 15:13:19', 1),
(1376, 121, 'BALANDOU CENTRE', '', 1, '2013-06-23 09:33:59', 1, '2013-06-23 09:33:59', 1),
(1377, 121, 'DJANSSOUMANA CENTRE', '', 1, '2013-06-23 09:34:19', 1, '2013-09-16 17:03:52', 1),
(1378, 121, 'BATE-GBENSO', '', 1, '2013-06-23 09:35:59', 1, '2013-09-16 17:02:53', 1),
(1379, 121, 'KOBA - CENTRE', '', 1, '2013-06-23 09:36:22', 1, '2013-09-16 17:04:44', 1),
(1380, 122, 'BAKONKO CISSELA', '', 1, '2013-06-23 09:36:46', 1, '2013-06-23 09:36:46', 1),
(1381, 122, 'DALABA', '', 1, '2013-06-23 09:37:52', 1, '2013-06-23 09:37:52', 1),
(1382, 122, 'DJELIBAKORO', '', 1, '2013-06-23 09:38:11', 1, '2013-06-23 09:38:11', 1),
(1383, 122, 'FODEKARIAH', '', 1, '2013-06-23 09:38:31', 1, '2013-06-23 09:38:31', 1),
(1384, 122, 'KIGNERO', '', 1, '2013-06-23 09:39:09', 1, '2013-06-23 09:39:09', 1),
(1385, 122, 'KOFILANI', '', 1, '2013-06-23 09:39:44', 1, '2013-06-23 09:39:44', 1),
(1386, 122, 'MADINA', '', 1, '2013-06-23 09:40:18', 1, '2013-06-23 09:40:18', 1),
(1387, 122, 'MOUSSAYAH', '', 1, '2013-06-23 09:40:59', 1, '2013-06-23 09:40:59', 1),
(1388, 122, 'SOILA', '', 1, '2013-06-23 09:41:19', 1, '2013-06-23 09:41:19', 1),
(1389, 122, 'BATE NAFADJI CENTRE', '', 1, '2013-06-23 09:41:39', 1, '2013-06-23 09:41:39', 1),
(1390, 123, 'BOULA CENTRE', '', 1, '2013-06-23 09:41:58', 1, '2013-06-23 09:41:58', 1),
(1391, 123, 'WANDJALADOU', '', 1, '2013-06-23 09:42:30', 1, '2013-09-24 08:58:05', 1),
(1392, 123, 'KALAFILILA', '', 1, '2013-06-23 09:42:48', 1, '2013-06-23 09:42:48', 1),
(1393, 123, 'KODJANA', '', 1, '2013-06-23 09:44:11', 1, '2013-06-23 09:44:11', 1),
(1394, 123, 'KOSSA', '', 1, '2013-06-23 09:44:57', 1, '2013-06-23 09:44:57', 1),
(1395, 123, 'KOTRONA', '', 1, '2013-06-23 09:45:56', 1, '2013-06-23 09:45:56', 1),
(1396, 124, 'DALABANI', '', 1, '2013-06-23 09:48:09', 1, '2013-09-24 09:41:51', 1),
(1397, 124, 'FADOU', '', 1, '2013-06-23 09:49:01', 1, '2013-06-23 09:49:01', 1),
(1398, 124, 'BARANAMA CENTRE I', '', 1, '2013-06-23 09:49:21', 1, '2013-09-24 09:36:29', 1),
(1399, 124, 'TAKOURA', '', 1, '2013-06-23 09:49:44', 1, '2013-06-23 09:49:44', 1),
(1400, 120, 'BANANKORODA', '', 1, '2013-06-23 09:50:22', 1, '2013-06-23 09:51:00', 1),
(1401, 120, 'BRIQUETERIE', '', 1, '2013-06-23 09:53:55', 1, '2013-06-23 09:53:55', 1),
(1402, 120, 'CAMP HERMAKONO', '', 1, '2013-06-23 09:54:15', 1, '2013-06-23 09:54:15', 1),
(1403, 120, 'DALAKO', '', 1, '2013-06-23 09:54:31', 1, '2013-06-23 09:54:31', 1),
(1404, 120, 'DAR ES SALAM', '', 1, '2013-06-23 09:54:55', 1, '2013-06-23 09:54:55', 1),
(1405, 120, 'ENERGIE', '', 1, '2013-06-23 09:55:14', 1, '2013-06-23 09:55:14', 1),
(1406, 120, 'FARAKO 1', '', 1, '2013-06-23 09:55:43', 1, '2013-06-23 09:55:43', 1),
(1407, 120, 'FARAKO 2', '', 1, '2013-06-23 09:55:57', 1, '2013-06-23 09:55:57', 1),
(1408, 120, 'GARE', '', 1, '2013-06-23 09:56:23', 1, '2013-06-23 09:56:23', 1),
(1409, 120, 'HERMAKONON 1', '', 1, '2013-06-23 09:56:47', 1, '2013-06-23 09:56:47', 1),
(1410, 120, 'HERMAKONON 2', '', 1, '2013-06-23 09:57:02', 1, '2013-06-23 09:57:02', 1),
(1411, 120, 'KABADA 1', '', 1, '2013-06-23 09:57:29', 1, '2013-06-23 09:57:29', 1),
(1412, 120, 'KABADA 2', '', 1, '2013-06-23 09:57:45', 1, '2013-06-23 09:57:45', 1),
(1413, 120, 'KANKANCOURA', '', 1, '2013-06-23 09:58:10', 1, '2013-06-23 09:58:10', 1),
(1414, 120, 'KORIALEN', '', 1, '2013-06-23 09:58:31', 1, '2013-06-23 09:58:31', 1),
(1415, 120, 'MADINA', '', 1, '2013-06-23 09:58:53', 1, '2013-06-23 09:58:53', 1),
(1416, 120, 'METEO', '', 1, '2013-06-23 10:02:47', 1, '2013-06-23 10:02:47', 1),
(1417, 120, 'MISSIRAN', '', 1, '2013-06-23 10:03:09', 1, '2013-06-23 10:03:09', 1),
(1418, 120, 'SALAMANIDA', '', 1, '2013-06-23 10:03:37', 1, '2013-09-24 09:21:47', 1),
(1419, 120, 'SENKEFARA I', '', 1, '2013-06-23 10:04:06', 1, '2013-09-24 09:31:56', 1),
(1420, 120, 'SOGBE', '', 1, '2013-06-23 10:04:31', 1, '2013-06-23 10:04:31', 1),
(1421, 120, 'TIMBO', '', 1, '2013-06-23 10:04:54', 1, '2013-06-23 10:04:54', 1),
(1422, 125, 'KARFAMORIAH', '', 1, '2013-06-23 10:05:33', 1, '2013-09-17 10:45:43', 1),
(1423, 125, 'DIANKANA', '', 1, '2013-06-23 10:05:55', 1, '2013-06-23 10:06:25', 1),
(1424, 125, 'BANKALAN', '', 1, '2013-06-23 10:06:55', 1, '2013-06-23 10:06:55', 1),
(1425, 125, 'SOFONKO', '', 1, '2013-06-23 10:07:22', 1, '2013-06-23 10:07:22', 1),
(1426, 125, 'SOUMANKOI', '', 1, '2013-06-23 10:07:45', 1, '2013-06-23 10:07:45', 1),
(1427, 125, 'TENKELEN', '', 1, '2013-06-23 10:08:08', 1, '2013-06-23 10:08:08', 1),
(1428, 126, 'KANDAYA', '', 1, '2013-06-23 10:08:40', 1, '2013-06-23 10:09:15', 1),
(1429, 126, 'KOUMBAN I', '', 1, '2013-06-23 10:09:40', 1, '2013-09-17 10:52:49', 1),
(1430, 126, 'MAKONON', '', 1, '2013-06-23 10:10:02', 1, '2013-06-23 10:10:02', 1),
(1431, 127, 'KARIARDOU', '', 1, '2013-06-23 10:10:29', 1, '2013-09-17 10:55:05', 1),
(1432, 127, 'MORIGBEYA', '', 1, '2013-06-23 10:10:50', 1, '2013-06-23 10:10:50', 1),
(1433, 128, 'DJIMBALA', '', 1, '2013-06-23 10:11:12', 1, '2013-06-23 10:11:12', 1),
(1434, 128, 'MISSAMANA CENTRE', '', 1, '2013-06-23 10:11:40', 1, '2013-06-23 10:11:40', 1),
(1435, 128, 'SOLO', '', 1, '2013-06-23 10:12:00', 1, '2013-06-23 10:12:00', 1),
(1436, 129, 'DALAGNA', '', 1, '2013-06-23 10:12:28', 1, '2013-09-23 15:14:23', 1),
(1437, 129, 'GBALAKO', '', 1, '2013-06-23 10:12:54', 1, '2013-06-23 10:12:54', 1),
(1438, 129, 'IRADOU', '', 1, '2013-06-23 10:13:14', 1, '2013-06-23 10:13:14', 1),
(1439, 129, 'MORIBAYA CENTRE I', '', 1, '2013-06-23 10:13:37', 1, '2013-09-16 17:09:30', 1),
(1440, 130, 'SABADOU - BARANAMA', '', 1, '2013-06-23 10:14:27', 1, '2013-09-16 17:19:37', 1),
(1441, 130, 'MORIAH', '', 1, '2013-06-23 10:14:50', 1, '2013-09-16 17:19:50', 1),
(1442, 130, 'WOROKORO', '', 1, '2013-06-23 10:15:07', 1, '2013-09-16 17:20:04', 1),
(1443, 130, 'BANANKOH', '', 1, '2013-06-23 10:15:28', 1, '2013-09-16 17:20:27', 1),
(1444, 130, 'SANSANDOH', '', 1, '2013-06-23 10:15:51', 1, '2013-09-16 17:21:01', 1),
(1445, 130, 'DJAMONA', '', 1, '2013-06-23 10:16:09', 1, '2013-09-16 17:21:21', 1),
(1446, 131, 'TINTIOULEN CENTRE', '', 1, '2013-06-23 10:16:29', 1, '2013-09-16 17:26:16', 1),
(1447, 131, 'BORIA', '', 1, '2013-06-23 10:16:52', 1, '2013-06-23 10:16:52', 1),
(1448, 131, 'OUREMBAYA', '', 1, '2013-06-23 10:17:13', 1, '2013-09-16 17:29:55', 1),
(1449, 132, 'FINSANKORO', '', 1, '2013-06-23 10:53:37', 1, '2013-06-23 10:53:37', 1),
(1450, 132, 'GNALENKO', '', 1, '2013-06-23 10:54:04', 1, '2013-06-23 10:54:04', 1),
(1451, 132, 'KOUDOU', '', 1, '2013-06-23 10:54:32', 1, '2013-06-23 10:54:32', 1),
(1452, 132, 'MANICELIA', '', 1, '2013-06-23 10:55:07', 1, '2013-06-23 10:55:07', 1),
(1453, 132, 'SIRAKORO', '', 1, '2013-06-23 10:55:32', 1, '2013-06-23 10:55:32', 1),
(1454, 132, 'TOKOUNOU CENTRE', '', 1, '2013-06-23 10:56:15', 1, '2013-06-23 10:56:15', 1),
(1455, 132, 'MISSADOU', '', 1, '2013-06-23 10:56:35', 1, '2013-06-23 10:56:35', 1),
(1456, 159, 'BANANKORO I', '', 1, '2013-06-23 15:03:14', 1, '2013-09-17 11:07:55', 1),
(1457, 159, 'FODESSIAYA', '', 1, '2013-06-23 15:03:35', 1, '2013-06-23 15:03:35', 1),
(1458, 159, 'SIRGNALDOU', '', 1, '2013-06-23 15:04:00', 1, '2013-06-23 15:04:00', 1),
(1459, 159, 'SOMASSANIAH', '', 1, '2013-06-23 15:04:22', 1, '2013-09-17 11:11:12', 1),
(1460, 159, 'TINSINKORO', '', 1, '2013-06-23 15:04:49', 1, '2013-09-27 17:42:52', 1),
(1461, 159, 'WAROU CONDERO', '', 1, '2013-06-23 15:05:17', 1, '2013-09-17 11:13:33', 1),
(1462, 160, 'BALLAGBEDOU', '', 1, '2013-06-23 15:05:47', 1, '2013-06-23 15:06:57', 1),
(1464, 160, 'DIOMANDOU', '', 1, '2013-06-23 15:07:24', 1, '2013-06-23 15:07:24', 1),
(1465, 160, 'SANANKORONI', '', 1, '2013-06-23 15:07:53', 1, '2013-06-23 15:07:53', 1),
(1466, 158, 'DIALA', '', 1, '2013-06-23 15:08:41', 1, '2013-06-23 15:08:41', 1),
(1467, 158, 'KAMANDOU', '', 1, '2013-06-23 15:09:06', 1, '2013-06-23 15:09:06', 1),
(1468, 158, 'MANIFADOU', '', 1, '2013-06-23 15:09:37', 1, '2013-06-23 15:09:37', 1),
(1469, 158, 'M\\\'BALIA', '', 1, '2013-06-23 15:10:01', 1, '2013-06-23 15:10:01', 1),
(1470, 158, 'NASSER MARCHE', '', 1, '2013-06-23 15:10:55', 1, '2013-09-17 11:17:20', 1),
(1471, 158, 'NESSER MOSQUEE', '', 1, '2013-06-23 15:11:20', 1, '2013-09-17 11:16:55', 1),
(1472, 158, 'NOUNY TOURE', '', 1, '2013-06-23 15:11:45', 1, '2013-06-23 15:11:45', 1),
(1473, 158, 'IRAYAH', '', 1, '2013-06-23 15:12:12', 1, '2013-09-17 11:18:05', 1),
(1474, 161, 'DIARADOU', '', 1, '2013-06-23 15:12:46', 1, '2013-06-23 15:12:46', 1),
(1475, 161, 'FABALA', '', 1, '2013-06-23 15:13:16', 1, '2013-06-23 15:13:16', 1),
(1476, 158, 'KOMODOU CENTRE', '', 1, '2013-06-23 15:13:39', 1, '2013-06-23 15:13:39', 1),
(1477, 162, 'FREBORIDOU', '', 1, '2013-06-23 15:14:12', 1, '2013-09-17 11:34:46', 1),
(1478, 162, 'KEKOURADOU', '', 1, '2013-06-23 15:14:40', 1, '2013-06-23 15:14:40', 1),
(1479, 162, 'KONSANKORO', '', 1, '2013-06-23 15:15:39', 1, '2013-09-17 11:34:35', 1),
(1480, 163, 'TALENKO', '', 1, '2013-06-23 15:15:58', 1, '2013-09-17 11:36:29', 1),
(1481, 163, 'DELA', '', 1, '2013-06-23 15:16:25', 1, '2013-09-17 11:35:44', 1),
(1482, 163, 'KISSIDOU', '', 1, '2013-06-23 15:16:49', 1, '2013-09-17 11:36:13', 1),
(1483, 163, 'LINKO', '', 1, '2013-06-23 15:17:22', 1, '2013-09-17 11:35:25', 1),
(1484, 164, 'DIARRADOU MANDOU', '', 1, '2013-06-23 15:17:41', 1, '2013-06-23 15:17:41', 1),
(1485, 164, 'FINARIAH', '', 1, '2013-06-23 15:18:18', 1, '2013-06-23 15:18:18', 1),
(1486, 164, 'GBEDOU', '', 1, '2013-06-23 15:18:47', 1, '2013-06-23 15:18:47', 1),
(1487, 164, 'KABARADOU', '', 1, '2013-06-23 15:19:37', 1, '2013-06-23 15:19:37', 1),
(1488, 164, 'SIBIRIBARO', '', 1, '2013-06-23 15:20:04', 1, '2013-09-17 11:45:22', 1),
(1489, 165, 'SOROMAYA', '', 1, '2013-06-23 15:20:31', 1, '2013-09-17 11:47:16', 1),
(1490, 165, 'SOULKOULDOU', '', 1, '2013-06-23 15:20:59', 1, '2013-06-23 15:20:59', 1),
(1491, 165, 'FALANKO-WAROU', '', 1, '2013-06-23 15:21:31', 1, '2013-09-17 11:47:59', 1),
(1492, 165, 'KOULIA', '', 1, '2013-06-23 15:21:53', 1, '2013-06-23 15:21:53', 1),
(1493, 165, 'MAKA-FEREDOU', '', 1, '2013-06-23 15:22:23', 1, '2013-09-17 11:48:39', 1),
(1494, 165, 'MENINCELIA', '', 1, '2013-06-23 15:22:49', 1, '2013-06-23 15:22:49', 1),
(1495, 178, 'BOKORO', '', 1, '2013-06-23 15:30:02', 1, '2013-06-23 15:30:02', 1),
(1496, 178, 'MOUSSAYA', '', 1, '2013-06-23 15:30:44', 1, '2013-06-23 15:30:44', 1),
(1497, 178, 'SANACIA', '', 1, '2013-06-23 15:31:07', 1, '2013-06-23 15:31:07', 1),
(1498, 178, 'SANGUIANA I', '', 1, '2013-06-23 15:31:56', 1, '2013-09-17 12:02:26', 1),
(1499, 178, 'SARAYA', '', 1, '2013-06-23 15:32:19', 1, '2013-06-23 15:32:19', 1),
(1500, 168, 'BABILA CENTRE', '', 1, '2013-06-23 15:32:41', 1, '2013-06-23 15:32:41', 1),
(1501, 168, 'SANANKORO', '', 1, '2013-06-23 15:33:10', 1, '2013-06-23 15:33:10', 1),
(1502, 169, 'BALATO', '', 1, '2013-06-23 15:33:31', 1, '2013-09-17 12:05:35', 1),
(1503, 169, 'KOBANI', '', 1, '2013-06-23 15:33:57', 1, '2013-09-17 12:05:41', 1),
(1504, 169, 'KOURALA', '', 1, '2013-06-23 15:34:27', 1, '2013-06-23 15:34:27', 1),
(1505, 169, 'MANFARA', '', 1, '2013-06-23 15:34:50', 1, '2013-06-23 15:34:50', 1),
(1506, 170, 'BANFELE', '', 1, '2013-06-23 15:35:15', 1, '2013-09-17 12:06:26', 1),
(1507, 170, 'KAMSERIYA', '', 1, '2013-06-23 15:36:13', 1, '2013-09-17 12:11:52', 1),
(1508, 170, 'LANDY', '', 1, '2013-06-23 15:36:42', 1, '2013-06-23 15:36:42', 1),
(1509, 170, 'NAFADJI', '', 1, '2013-06-23 15:37:10', 1, '2013-06-23 15:37:10', 1),
(1510, 171, 'BARO', '', 1, '2013-06-23 15:37:50', 1, '2013-09-17 12:13:49', 1),
(1511, 171, 'MO&Iuml;KIGNEBA', '', 1, '2013-06-23 15:38:23', 1, '2013-09-17 12:15:24', 1),
(1512, 171, 'MORIGNOUMALA', '', 1, '2013-06-23 15:38:43', 1, '2013-09-17 12:15:02', 1),
(1513, 172, 'CISSELA', '', 1, '2013-06-23 15:39:10', 1, '2013-09-17 12:17:11', 1),
(1514, 172, 'FADOU SABA', '', 1, '2013-06-23 15:39:36', 1, '2013-06-23 15:39:36', 1),
(1515, 172, 'KANKAYA', '', 1, '2013-06-23 15:40:00', 1, '2013-06-23 15:40:00', 1),
(1516, 172, 'KOUROUKORO', '', 1, '2013-06-23 15:40:29', 1, '2013-06-23 15:40:29', 1),
(1517, 172, 'LOROMBO', '', 1, '2013-06-23 15:40:56', 1, '2013-06-23 15:40:56', 1),
(1518, 172, 'NONO', '', 1, '2013-06-23 15:41:21', 1, '2013-06-23 15:41:21', 1),
(1519, 174, 'DOURA', '', 1, '2013-06-23 15:41:47', 1, '2013-09-17 13:04:21', 1),
(1520, 174, 'FARAKOBA', '', 1, '2013-06-23 15:42:57', 1, '2013-06-23 15:42:57', 1),
(1521, 174, 'HEREMAKONO', '', 1, '2013-06-23 15:43:24', 1, '2013-06-23 15:43:24', 1),
(1522, 174, 'YARA', '', 1, '2013-06-23 15:44:08', 1, '2013-06-23 15:44:08', 1),
(1523, 174, 'YARAKOUDA', '', 1, '2013-06-23 15:44:45', 1, '2013-06-23 15:44:45', 1),
(1524, 175, 'BALLAN', '', 1, '2013-06-23 15:46:20', 1, '2013-09-17 13:45:14', 1),
(1525, 175, 'DJIRILAN', '', 1, '2013-06-23 15:46:38', 1, '2013-06-23 15:46:38', 1),
(1526, 175, 'KIGNERO I', '', 1, '2013-06-23 15:46:56', 1, '2013-09-17 13:44:17', 1),
(1527, 175, 'MANSONYA', '', 1, '2013-06-23 15:47:42', 1, '2013-09-17 13:46:22', 1),
(1528, 176, 'HEREMAKONO', '', 1, '2013-06-23 15:48:02', 1, '2013-09-17 11:54:30', 1),
(1529, 176, 'KOMOLAKOURA', '', 1, '2013-06-23 15:48:28', 1, '2013-09-17 11:54:10', 1),
(1530, 176, 'SAMBAYA', '', 1, '2013-06-23 15:48:55', 1, '2013-06-23 15:48:55', 1),
(1531, 176, 'TOURETA FOULA', '', 1, '2013-06-23 15:49:40', 1, '2013-09-17 11:55:45', 1),
(1533, 177, 'FADOU', '', 1, '2013-06-23 15:50:25', 1, '2013-06-23 15:50:25', 1),
(1535, 167, 'DIARAGBELA', '', 1, '2013-06-23 15:51:15', 1, '2013-06-23 15:51:15', 1),
(1536, 167, 'DOULA', '', 1, '2013-06-23 15:51:46', 1, '2013-06-23 15:51:46', 1),
(1537, 167, 'KOUROUSSA KOUDA', '', 1, '2013-06-23 15:53:17', 1, '2013-06-23 15:53:17', 1),
(1538, 167, 'SAMAN', '', 1, '2013-06-23 15:53:43', 1, '2013-09-17 12:54:08', 1),
(1539, 167, 'SANDO CENTRE', '', 1, '2013-06-23 15:54:09', 1, '2013-09-17 12:47:44', 1),
(1540, 167, 'WASSABADA', '', 1, '2013-06-23 15:54:31', 1, '2013-09-17 12:48:18', 1),
(1541, 173, 'DOUAKO', '', 1, '2013-06-23 15:54:50', 1, '2013-09-17 12:57:11', 1),
(1542, 173, 'FLOWARO', '', 1, '2013-06-23 15:55:14', 1, '2013-06-23 15:55:14', 1),
(1543, 173, 'MISSIRA', '', 1, '2013-06-23 15:55:39', 1, '2013-06-23 15:55:39', 1),
(1544, 173, 'SIDIA', '', 1, '2013-06-23 15:56:03', 1, '2013-06-23 15:56:03', 1),
(1545, 173, 'TINDO', '', 1, '2013-06-23 15:56:24', 1, '2013-06-23 15:56:24', 1),
(1546, 173, 'WOELA', '', 1, '2013-06-23 15:58:51', 1, '2013-06-23 15:58:51', 1),
(1547, 147, 'BALANDOUGOUBA I', '', 1, '2013-06-23 16:00:19', 1, '2013-09-17 13:52:00', 1),
(1548, 147, 'BOUGOU', '', 1, '2013-06-23 16:00:39', 1, '2013-06-23 16:00:39', 1),
(1549, 147, 'KINIENKOURA I', '', 1, '2013-06-23 16:01:12', 1, '2013-09-17 13:56:31', 1),
(1550, 147, 'NIANI', '', 1, '2013-06-23 16:02:17', 1, '2013-06-23 16:02:17', 1),
(1551, 147, 'SIDIKILA I', '', 1, '2013-06-23 16:02:38', 1, '2013-09-17 13:57:36', 1),
(1552, 147, 'WOLOLA', '', 1, '2013-06-23 16:03:18', 1, '2013-06-23 16:03:18', 1),
(1553, 148, 'ALPHA YAYA', '', 1, '2013-06-23 16:03:47', 1, '2013-09-17 14:27:05', 1),
(1554, 148, 'BAKOU', '', 1, '2013-06-23 16:04:09', 1, '2013-06-23 16:04:09', 1),
(1555, 148, 'BANANFRA', '', 1, '2013-06-23 16:05:14', 1, '2013-09-17 14:31:12', 1),
(1556, 148, 'DIARADOU', '', 1, '2013-06-23 16:06:10', 1, '2013-09-17 14:32:01', 1),
(1557, 148, 'FARASSABABEN', '', 1, '2013-06-23 16:06:55', 1, '2013-09-17 14:33:45', 1),
(1558, 148, 'KAMARENA', '', 1, '2013-06-23 16:08:09', 1, '2013-09-17 14:34:15', 1),
(1560, 148, 'KONKOYI', '', 1, '2013-06-23 16:08:55', 1, '2013-09-17 14:27:40', 1),
(1561, 148, 'SAMORY', '', 1, '2013-06-23 16:09:18', 1, '2013-06-23 16:09:18', 1),
(1562, 148, 'SIRAMANA', '', 1, '2013-06-23 16:09:42', 1, '2013-06-23 16:09:42', 1),
(1563, 149, 'DIARAKOUROU', '', 1, '2013-06-23 16:10:03', 1, '2013-06-23 16:10:03', 1),
(1564, 149, 'FALAMA', '', 1, '2013-06-23 16:10:43', 1, '2013-06-23 16:10:43', 1),
(1566, 149, 'MARENA', '', 1, '2013-06-23 16:11:27', 1, '2013-06-23 16:11:27', 1),
(1567, 149, 'SOUNTOUDIANA', '', 1, '2013-06-23 16:11:52', 1, '2013-06-23 16:11:52', 1),
(1568, 150, 'KANTOUMANINA', '', 1, '2013-06-23 16:12:37', 1, '2013-06-23 16:14:11', 1),
(1569, 150, 'ORIALEN', '', 1, '2013-06-23 16:12:59', 1, '2013-06-23 16:15:13', 1),
(1570, 150, 'SOKOURABA', '', 1, '2013-06-23 16:15:36', 1, '2013-06-23 16:15:36', 1),
(1571, 151, 'BANANKORO', '', 1, '2013-06-23 16:16:04', 1, '2013-09-17 15:10:05', 1),
(1572, 151, 'KODJARANINDA', '', 1, '2013-06-23 16:16:26', 1, '2013-09-17 15:07:09', 1),
(1573, 151, 'M\\\'BALIA I', '', 1, '2013-06-23 16:16:52', 1, '2013-09-17 15:08:51', 1),
(1574, 151, 'NAMISSA I', '', 1, '2013-06-23 16:17:25', 1, '2013-09-17 15:06:00', 1),
(1575, 151, 'OUDOUMANKORO', '', 1, '2013-06-23 16:17:52', 1, '2013-09-17 15:10:43', 1),
(1576, 152, 'DJILENGBE I', '', 1, '2013-06-23 16:18:13', 1, '2013-09-17 15:16:35', 1),
(1577, 152, 'BANKOUMANA I', '', 1, '2013-06-23 16:18:42', 1, '2013-09-17 15:18:58', 1),
(1578, 152, 'BALANDOU', '', 1, '2013-06-23 16:19:07', 1, '2013-06-23 16:19:07', 1),
(1579, 152, 'GBENSO', '', 1, '2013-06-23 16:19:35', 1, '2013-06-23 16:19:35', 1),
(1580, 152, 'KAMA', '', 1, '2013-06-23 16:21:02', 1, '2013-06-23 16:21:02', 1),
(1581, 152, 'KONDIANAKORO I', '', 1, '2013-06-23 16:21:27', 1, '2013-09-17 15:18:07', 1),
(1582, 152, 'KONDIANAKORO II', '', 1, '2013-06-23 16:21:55', 1, '2013-09-17 15:18:12', 1),
(1583, 153, 'FRANINDOUN', '', 1, '2013-06-23 16:22:42', 1, '2013-09-17 15:26:46', 1),
(1584, 153, 'KANIFRA', '', 1, '2013-06-23 16:23:14', 1, '2013-09-17 15:26:09', 1),
(1585, 153, 'KOUNDJAN I', '', 1, '2013-06-23 16:23:43', 1, '2013-09-17 15:24:41', 1),
(1586, 153, 'KOUNDJAN II', '', 1, '2013-06-23 16:23:56', 1, '2013-09-17 15:24:47', 1),
(1587, 153, 'LOILAKORO', '', 1, '2013-06-23 16:24:23', 1, '2013-06-23 16:24:23', 1),
(1588, 146, 'NOUMOUSSOULOU', '', 1, '2013-06-23 16:24:43', 1, '2013-09-17 14:24:41', 1),
(1589, 146, 'MANDIANA I', '', 1, '2013-06-23 16:25:07', 1, '2013-09-17 14:24:05', 1),
(1590, 146, 'HEREMAKONO', '', 1, '2013-06-23 16:25:20', 1, '2013-09-17 14:24:23', 1),
(1591, 154, 'BALANDOU', '', 1, '2013-06-23 16:25:39', 1, '2013-06-23 16:25:39', 1),
(1592, 154, 'DALAKAN', '', 1, '2013-06-23 16:26:31', 1, '2013-06-23 16:26:31', 1),
(1593, 154, 'FARABA KOURA', '', 1, '2013-06-23 16:26:55', 1, '2013-09-17 15:35:13', 1),
(1594, 154, 'KINIENIN', '', 1, '2013-06-23 16:27:35', 1, '2013-06-23 16:27:35', 1),
(1595, 154, 'LIMBANA', '', 1, '2013-06-23 16:28:11', 1, '2013-06-23 16:28:11', 1),
(1596, 154, 'MISSIMAN', '', 1, '2013-06-23 16:28:39', 1, '2013-06-23 16:28:39', 1),
(1597, 154, 'MORODOU I', '', 1, '2013-06-23 16:29:03', 1, '2013-09-17 15:30:07', 1),
(1598, 154, 'MORODOU II', '', 1, '2013-06-23 16:29:16', 1, '2013-09-17 15:30:13', 1),
(1599, 154, 'NAFADJILEN', '', 1, '2013-06-23 16:29:37', 1, '2013-06-23 16:29:37', 1),
(1600, 155, 'DJELIMALA', '', 1, '2013-06-23 16:29:59', 1, '2013-09-17 14:08:44', 1),
(1601, 155, 'NIANTANINA I', '', 1, '2013-06-23 16:30:19', 1, '2013-09-17 14:08:08', 1),
(1602, 155, 'WASSA', '', 1, '2013-06-23 16:30:47', 1, '2013-06-23 16:30:47', 1),
(1603, 156, 'BOUGOULA', '', 1, '2013-06-23 16:31:09', 1, '2013-06-23 16:31:09', 1),
(1604, 156, 'MALETOUMANINA', '', 1, '2013-06-23 16:31:29', 1, '2013-06-23 16:31:29', 1),
(1605, 156, 'NOUMOUDJILA', '', 1, '2013-06-23 16:31:51', 1, '2013-06-23 16:31:51', 1),
(1606, 156, 'NIAKO', '', 1, '2013-06-23 16:32:48', 1, '2013-09-17 14:11:19', 1),
(1607, 156, 'OURALA', '', 1, '2013-06-23 16:33:24', 1, '2013-06-23 16:33:24', 1),
(1608, 156, 'SALADOU', '', 1, '2013-06-23 16:33:46', 1, '2013-09-17 14:10:52', 1),
(1609, 156, 'TINDILA', '', 1, '2013-06-23 16:34:07', 1, '2013-06-23 16:34:07', 1),
(1610, 157, 'KASSAN', '', 1, '2013-06-23 16:34:31', 1, '2013-09-17 14:21:49', 1),
(1611, 157, 'KARAKOURA', '', 1, '2013-06-23 16:34:52', 1, '2013-06-23 16:34:52', 1),
(1612, 157, 'KIKO KARAKORO', '', 1, '2013-06-23 16:35:37', 1, '2013-06-23 16:35:37', 1),
(1614, 157, 'KONOMAKORO', '', 1, '2013-06-23 16:36:48', 1, '2013-06-23 16:36:48', 1),
(1615, 157, 'NIAMINA', '', 1, '2013-06-23 16:37:14', 1, '2013-06-23 16:37:14', 1),
(1617, 157, 'SOGBE', '', 1, '2013-06-23 16:38:25', 1, '2013-09-17 14:17:10', 1),
(1618, 134, 'BANKON', '', 1, '2013-06-23 16:39:47', 1, '2013-09-17 15:37:45', 1),
(1619, 134, 'DALAGBEDA', '', 1, '2013-06-23 16:40:21', 1, '2013-09-17 15:38:18', 1),
(1620, 134, 'LENKEKORO KINYEBA', '', 1, '2013-06-23 16:41:16', 1, '2013-09-17 15:39:31', 1),
(1621, 134, 'KOMAKOLENDA', '', 1, '2013-06-23 16:41:50', 1, '2013-06-23 16:41:50', 1),
(1622, 134, 'KOUMANDJAN BOUGOU', '', 1, '2013-06-23 16:42:12', 1, '2013-09-17 15:39:04', 1),
(1623, 134, 'LEYBA', '', 1, '2013-06-23 16:43:01', 1, '2013-06-23 16:43:01', 1),
(1624, 134, 'NAFADJI', '', 1, '2013-06-23 16:43:23', 1, '2013-06-23 16:43:23', 1),
(1625, 135, 'ALAHINA', '', 1, '2013-06-23 16:44:13', 1, '2013-09-17 16:23:21', 1),
(1626, 135, 'BOURENFE', '', 1, '2013-06-23 16:44:33', 1, '2013-06-23 16:44:33', 1),
(1627, 135, 'MANSALA', '', 1, '2013-06-23 16:45:02', 1, '2013-06-23 16:45:02', 1),
(1628, 135, 'DALANBAN', '', 1, '2013-06-23 16:46:01', 1, '2013-09-17 16:24:22', 1),
(1629, 135, 'DOKO', '', 1, '2013-06-23 16:46:57', 1, '2013-09-17 16:21:53', 1),
(1630, 135, 'KOLITA', '', 1, '2013-06-23 16:47:18', 1, '2013-06-23 16:47:18', 1),
(1631, 135, 'KINIEBAKOURA', '', 1, '2013-06-23 16:47:51', 1, '2013-06-23 16:47:51', 1),
(1632, 135, 'KODIARANI', '', 1, '2013-06-23 16:48:42', 1, '2013-06-23 16:48:42', 1),
(1633, 135, 'KOLENDA', '', 1, '2013-06-23 16:49:00', 1, '2013-06-23 16:49:00', 1),
(1634, 135, 'KOUREMALE', '', 1, '2013-06-23 16:49:19', 1, '2013-06-23 16:49:19', 1),
(1635, 135, 'OUDOULA', '', 1, '2013-06-23 16:50:02', 1, '2013-06-23 16:50:02', 1),
(1636, 135, 'SOULOUKOUNI', '', 1, '2013-06-23 16:50:24', 1, '2013-06-23 16:50:24', 1),
(1637, 135, 'SOUMBARAKOBA', '', 1, '2013-06-23 16:50:43', 1, '2013-06-23 16:50:43', 1),
(1638, 135, 'TOMBOKO', '', 1, '2013-06-23 16:51:17', 1, '2013-09-17 16:31:53', 1),
(1639, 135, 'TOMBONI', '', 1, '2013-06-23 16:51:48', 1, '2013-06-23 16:51:48', 1),
(1640, 136, 'BENDOUGOU', '', 1, '2013-06-23 16:52:16', 1, '2013-09-17 16:38:23', 1),
(1641, 136, 'FRANWALIA', '', 1, '2013-06-23 16:52:40', 1, '2013-09-17 16:36:14', 1),
(1642, 136, 'SAMBAYA', '', 1, '2013-06-23 16:52:58', 1, '2013-06-23 16:52:58', 1),
(1643, 136, 'BOUGOUROU', '', 1, '2013-06-23 16:53:23', 1, '2013-09-17 16:36:45', 1),
(1644, 136, 'KOFILANI', '', 1, '2013-06-23 16:53:46', 1, '2013-06-23 16:53:46', 1),
(1645, 136, 'DIAMBAYA', '', 1, '2013-06-23 16:54:15', 1, '2013-06-23 16:54:15', 1),
(1646, 136, 'KOUDEDI', '', 1, '2013-06-23 16:54:36', 1, '2013-06-23 16:54:36', 1),
(1647, 136, 'KAMAYA', '', 1, '2013-06-23 16:54:58', 1, '2013-06-23 16:54:58', 1),
(1648, 136, 'KOMA', '', 1, '2013-06-23 16:55:29', 1, '2013-06-23 16:55:29', 1),
(1649, 136, 'SOBATA', '', 1, '2013-06-23 16:56:03', 1, '2013-06-23 16:56:03', 1),
(1650, 137, 'BAFINKOBA', '', 1, '2013-06-23 16:56:41', 1, '2013-06-23 16:56:41', 1),
(1651, 137, 'BALADOUGOU', '', 1, '2013-06-23 16:56:59', 1, '2013-09-17 16:49:44', 1),
(1652, 137, 'DJEYA', '', 1, '2013-06-23 16:57:29', 1, '2013-09-17 16:49:06', 1),
(1653, 137, 'DIOUMABANA', '', 1, '2013-06-23 16:57:58', 1, '2013-09-17 16:41:19', 1),
(1654, 137, 'KARAKORO', '', 1, '2013-06-23 16:58:20', 1, '2013-06-23 16:58:20', 1),
(1655, 137, 'KINIEBAKOURA', '', 1, '2013-06-23 16:59:39', 1, '2013-09-17 16:40:13', 1),
(1656, 137, 'KONOMAKOURA', '', 1, '2013-06-23 17:00:03', 1, '2013-06-23 17:00:03', 1),
(1657, 137, 'TOGUIOULEN', '', 1, '2013-06-23 17:00:44', 1, '2013-09-17 16:40:35', 1),
(1658, 138, 'ALAHINA', '', 1, '2013-06-23 22:20:07', 1, '2013-09-17 17:16:22', 1),
(1659, 138, 'DIDI', '', 1, '2013-06-23 22:20:30', 1, '2013-06-23 22:20:30', 1),
(1660, 138, 'BALATO', '', 1, '2013-06-23 22:20:56', 1, '2013-06-23 22:20:56', 1),
(1661, 138, 'BOUKARIA', '', 1, '2013-06-23 22:21:40', 1, '2013-06-23 22:21:40', 1),
(1662, 138, 'DOUBAYA', '', 1, '2013-06-23 22:22:17', 1, '2013-06-23 22:22:17', 1),
(1663, 138, 'FATOYA', '', 1, '2013-06-23 22:23:00', 1, '2013-09-17 17:15:11', 1),
(1664, 138, 'FIFA', '', 1, '2013-06-23 22:23:28', 1, '2013-06-23 22:23:28', 1),
(1665, 138, 'KAMATIGUIA', '', 1, '2013-06-23 22:23:48', 1, '2013-09-17 17:02:04', 1),
(1666, 138, 'KINTINIAN I', '', 1, '2013-06-23 22:24:10', 1, '2013-09-17 17:10:34', 1),
(1667, 138, 'NAFADJI', '', 1, '2013-06-23 22:24:32', 1, '2013-06-23 22:24:32', 1),
(1668, 138, 'SAMANI', '', 1, '2013-06-23 22:25:12', 1, '2013-09-17 17:08:45', 1),
(1669, 138, 'SETIGUIA', '', 1, '2013-06-23 22:27:37', 1, '2013-09-17 17:12:27', 1),
(1670, 138, 'TINTISABANI', '', 1, '2013-06-23 22:28:11', 1, '2013-06-23 22:28:11', 1),
(1671, 139, 'DANTINIA', '', 1, '2013-06-23 22:28:48', 1, '2013-06-23 22:28:48', 1),
(1672, 139, 'DJATELA', '', 1, '2013-06-23 22:29:27', 1, '2013-09-17 17:23:32', 1),
(1673, 139, 'FOULATA', '', 1, '2013-06-23 22:30:15', 1, '2013-06-23 22:30:15', 1),
(1674, 139, 'GOUFOUDE', '', 1, '2013-06-23 22:30:46', 1, '2013-09-17 17:23:01', 1),
(1675, 139, 'HAFIA', '', 1, '2013-06-23 22:31:09', 1, '2013-06-23 22:31:09', 1),
(1676, 139, 'KOBEDARA', '', 1, '2013-06-23 22:31:27', 1, '2013-06-23 22:31:27', 1),
(1677, 139, 'MALEAH', '', 1, '2013-06-23 22:32:33', 1, '2013-09-17 17:20:01', 1),
(1681, 139, 'SARAYA', '', 1, '2013-06-23 22:35:03', 1, '2013-06-23 22:35:03', 1),
(1682, 140, 'BOUKARYA', '', 1, '2013-06-23 22:37:17', 1, '2013-09-17 17:29:02', 1),
(1683, 140, 'DIBIYA', '', 1, '2013-06-23 22:38:00', 1, '2013-06-23 22:38:00', 1),
(1684, 140, 'NABOU', '', 1, '2013-06-23 22:38:44', 1, '2013-09-17 17:28:32', 1),
(1685, 140, 'SOUMBARAYA', '', 1, '2013-06-23 22:39:05', 1, '2013-06-23 22:39:05', 1),
(1686, 144, 'BALANDOUGOU', '', 1, '2013-06-23 22:39:35', 1, '2013-06-23 22:39:35', 1),
(1687, 144, 'BANANIKORO', '', 1, '2013-06-23 22:40:02', 1, '2013-09-17 17:30:45', 1),
(1688, 144, 'DIALAWASSA', '', 1, '2013-06-23 22:40:26', 1, '2013-06-23 22:40:26', 1),
(1689, 144, 'KOUROUBALA', '', 1, '2013-06-23 22:41:21', 1, '2013-06-23 22:41:21', 1),
(1690, 144, 'FARABALEN', '', 1, '2013-06-23 22:42:28', 1, '2013-06-23 22:42:28', 1),
(1691, 144, 'FIDAKO', '', 1, '2013-06-23 22:42:56', 1, '2013-06-23 22:42:56', 1),
(1692, 144, 'KEDALA', '', 1, '2013-06-23 22:43:20', 1, '2013-06-23 22:43:20', 1),
(1693, 144, 'KINYEKOUROU', '', 1, '2013-06-23 22:43:42', 1, '2013-09-17 17:34:16', 1),
(1694, 144, 'NIAGASSOLA', '', 1, '2013-06-23 22:44:22', 1, '2013-09-17 17:30:13', 1),
(1695, 144, 'FETEKOU', '', 1, '2013-06-23 22:44:45', 1, '2013-06-23 22:44:45', 1),
(1696, 144, 'KOUYAKOUYA', '', 1, '2013-06-23 22:45:10', 1, '2013-09-17 17:33:00', 1),
(1697, 141, 'BANFARAN', '', 1, '2013-06-23 22:45:40', 1, '2013-09-17 15:42:18', 1),
(1698, 141, 'DAMISSAKOURA', '', 1, '2013-06-23 22:46:01', 1, '2013-06-23 22:46:01', 1),
(1699, 141, 'FARADA', '', 1, '2013-06-23 22:46:47', 1, '2013-09-17 15:41:58', 1),
(1700, 141, 'NIANDANKORO I', '', 1, '2013-06-23 22:47:32', 1, '2013-09-17 15:40:24', 1),
(1701, 141, 'WARAN', '', 1, '2013-06-23 22:52:28', 1, '2013-06-23 22:52:28', 1),
(1702, 142, 'DALANINKAN', '', 1, '2013-06-23 22:54:31', 1, '2013-06-23 22:54:31', 1),
(1703, 142, 'LELEDA', '', 1, '2013-06-23 22:55:58', 1, '2013-09-17 15:44:40', 1),
(1704, 142, 'FANDIA', '', 1, '2013-06-23 22:56:22', 1, '2013-09-17 15:45:59', 1),
(1705, 142, 'GBENKROKRO', '', 1, '2013-06-23 22:57:01', 1, '2013-09-17 15:45:34', 1),
(1706, 142, 'KOSSOKOBA', '', 1, '2013-06-23 22:57:31', 1, '2013-06-23 22:57:31', 1),
(1707, 142, 'NANEN KOUROUMA', '', 1, '2013-06-23 22:57:50', 1, '2013-09-17 15:44:19', 1),
(1708, 142, 'NANEN TRAORE', '', 1, '2013-06-23 22:58:18', 1, '2013-06-23 22:58:18', 1),
(1709, 142, 'NORAKODO', '', 1, '2013-06-23 22:58:41', 1, '2013-06-23 22:58:41', 1),
(1710, 142, 'TASSILIMAN', '', 1, '2013-06-23 22:59:14', 1, '2013-06-23 22:59:14', 1),
(1711, 143, 'BANFELE KOURA', '', 1, '2013-06-23 22:59:42', 1, '2013-09-17 15:49:24', 1),
(1712, 143, 'BALANDOUGOU', '', 1, '2013-06-23 23:00:03', 1, '2013-09-17 15:50:12', 1),
(1713, 143, 'NOUNKOUNKAN I', '', 1, '2013-06-23 23:00:28', 1, '2013-09-17 15:48:21', 1),
(1714, 133, 'BAMBALA', '', 1, '2013-06-23 23:01:36', 1, '2013-06-23 23:01:36', 1),
(1715, 133, 'KOUROUDAKORO II', '', 1, '2013-06-23 23:02:28', 1, '2013-09-17 16:15:33', 1),
(1716, 133, 'KOUROUDAKORO I', '', 1, '2013-06-23 23:03:01', 1, '2013-09-17 16:15:38', 1),
(1717, 133, 'DANKAKORO', '', 1, '2013-06-23 23:03:28', 1, '2013-06-23 23:03:28', 1),
(1718, 133, 'DANKAKOURA', '', 1, '2013-06-23 23:03:48', 1, '2013-06-23 23:03:48', 1),
(1719, 133, 'DIATELA', '', 1, '2013-06-23 23:04:08', 1, '2013-06-23 23:04:08', 1),
(1720, 133, 'DILENGBE', '', 1, '2013-06-23 23:06:15', 1, '2013-09-17 16:11:14', 1),
(1721, 133, 'FALAMA', '', 1, '2013-06-23 23:06:39', 1, '2013-06-23 23:06:39', 1),
(1722, 133, 'KINIEBAKORO', '', 1, '2013-06-23 23:07:00', 1, '2013-06-23 23:07:00', 1),
(1723, 133, 'SOUGOULA', '', 1, '2013-06-23 23:07:19', 1, '2013-06-23 23:07:19', 1),
(1724, 133, 'KOFILANI', '', 1, '2013-06-23 23:07:41', 1, '2013-06-23 23:07:41', 1),
(1725, 133, 'NIANDAKOURA', '', 1, '2013-06-23 23:09:27', 1, '2013-09-17 16:12:45', 1),
(1726, 133, 'SAOUROU', '', 1, '2013-06-23 23:09:53', 1, '2013-06-23 23:09:53', 1),
(1727, 133, 'SEBEKORO', '', 1, '2013-06-23 23:11:37', 1, '2013-06-23 23:11:37', 1),
(1728, 133, 'SIGUIRIKORO I', '', 1, '2013-06-23 23:12:14', 1, '2013-09-17 16:08:27', 1),
(1729, 133, 'SIGUIRIKORO II', '', 1, '2013-06-23 23:12:31', 1, '2013-09-17 16:08:32', 1),
(1730, 133, 'SIGUIRI KOURA I', '', 1, '2013-06-23 23:13:04', 1, '2013-09-17 16:09:20', 1),
(1731, 133, 'SIGUIRI KOURA II', '', 1, '2013-06-23 23:13:19', 1, '2013-09-17 16:08:41', 1),
(1732, 133, 'TIGUIBIRI', '', 1, '2013-06-23 23:14:05', 1, '2013-09-17 16:10:26', 1),
(1733, 145, 'BALANDOU', '', 1, '2013-06-23 23:14:30', 1, '2013-09-17 15:58:02', 1),
(1734, 145, 'BARKERE', '', 1, '2013-06-23 23:15:21', 1, '2013-06-23 23:15:21', 1),
(1735, 145, 'DIGUIBANIA', '', 1, '2013-06-23 23:15:44', 1, '2013-06-23 23:15:44', 1),
(1736, 145, 'DIGUILIN', '', 1, '2013-06-23 23:16:08', 1, '2013-09-17 15:57:12', 1),
(1737, 145, 'KAKAMA', '', 1, '2013-06-23 23:16:28', 1, '2013-06-23 23:16:28', 1),
(1738, 145, 'MAKANDJAN', '', 1, '2013-06-23 23:16:48', 1, '2013-09-17 15:55:03', 1),
(1739, 145, 'LERO', '', 1, '2013-06-23 23:17:09', 1, '2013-09-17 15:53:58', 1),
(1740, 145, 'SIGUIRINI', '', 1, '2013-06-23 23:18:13', 1, '2013-09-17 15:53:48', 1),
(1741, 145, 'SOKODO', '', 1, '2013-06-23 23:18:55', 1, '2013-09-17 15:56:14', 1),
(1742, 145, 'TOMBA', '', 1, '2013-06-23 23:19:22', 1, '2013-09-17 15:57:37', 1),
(1743, 28, 'BANANKORO', '', 1, '2013-06-24 21:20:16', 1, '2013-06-24 21:20:16', 1),
(1744, 28, 'BEYLA SOBAKONO', '', 1, '2013-06-24 21:20:37', 1, '2013-06-24 21:20:37', 1),
(1745, 28, 'DABADOU', '', 1, '2013-06-24 21:21:10', 1, '2013-06-24 21:21:10', 1),
(1746, 28, 'DIAKOLIDOU SOBAKONO', '', 1, '2013-06-24 21:21:29', 1, '2013-06-24 21:21:29', 1),
(1747, 28, 'DIAKOLIDOU TINIKAN', '', 1, '2013-06-24 21:22:11', 1, '2013-06-24 21:22:11', 1),
(1748, 29, 'BOOLA I', '', 1, '2013-06-24 21:22:56', 1, '2013-09-18 10:14:43', 1),
(1749, 29, 'BRIKO&Iuml;DOU', '', 1, '2013-06-24 21:23:17', 1, '2013-09-18 10:17:06', 1),
(1750, 29, 'FOUAMA', '', 1, '2013-06-24 21:23:39', 1, '2013-06-24 21:23:39', 1),
(1751, 29, 'OUINZOU', '', 1, '2013-06-24 21:25:48', 1, '2013-09-18 10:18:22', 1),
(1752, 29, 'SAOUSSOUDOU', '', 1, '2013-06-24 21:26:16', 1, '2013-06-24 21:26:16', 1),
(1753, 29, 'SIBAMOU', '', 1, '2013-06-24 21:28:20', 1, '2013-06-24 21:28:20', 1),
(1754, 29, 'YAPANGAYE', '', 1, '2013-06-24 21:32:23', 1, '2013-06-24 21:32:23', 1),
(1755, 30, 'DIARRAGUERELA', '', 1, '2013-06-24 21:32:39', 1, '2013-09-18 10:56:04', 1),
(1756, 30, 'DOUBADOU', '', 1, '2013-06-24 21:32:59', 1, '2013-06-24 21:32:59', 1),
(1757, 30, 'DOUGBELA', '', 1, '2013-06-24 21:33:21', 1, '2013-06-24 21:33:21', 1),
(1758, 30, 'FEREBORIDOU', '', 1, '2013-06-24 21:33:44', 1, '2013-06-24 21:33:44', 1),
(1759, 31, 'BEMBEYA', '', 1, '2013-06-24 21:34:08', 1, '2013-06-24 21:34:08', 1),
(1760, 31, 'DIASSODOU', '', 1, '2013-06-24 21:34:28', 1, '2013-09-18 10:58:44', 1),
(1761, 31, 'SORIBADOU', '', 1, '2013-06-24 21:34:52', 1, '2013-06-24 21:34:52', 1),
(1762, 32, 'FARABANA', '', 1, '2013-06-24 21:35:13', 1, '2013-06-24 21:35:13', 1),
(1763, 32, 'FOUALAN CENTRE', '', 1, '2013-06-24 21:35:40', 1, '2013-09-18 11:00:31', 1),
(1764, 32, 'MALLEDOU', '', 1, '2013-06-24 21:36:13', 1, '2013-06-24 21:36:13', 1),
(1765, 32, 'ZOGBODOU', '', 1, '2013-06-24 21:36:43', 1, '2013-06-24 21:36:43', 1),
(1766, 33, 'BROMADOU', '', 1, '2013-06-24 21:56:33', 1, '2013-06-24 21:56:33', 1),
(1767, 33, 'DIAKOFOMODOU', '', 1, '2013-06-24 21:56:54', 1, '2013-09-18 11:04:05', 1),
(1768, 33, 'FOUARO', '', 1, '2013-06-24 21:57:14', 1, '2013-06-24 21:57:14', 1),
(1769, 33, 'GBACKEDOU', '', 1, '2013-06-24 21:57:48', 1, '2013-09-18 11:03:29', 1),
(1770, 33, 'KAFOBARO', '', 1, '2013-06-24 21:58:16', 1, '2013-06-24 21:58:16', 1),
(1771, 33, 'MISSIBORO', '', 1, '2013-06-24 21:58:43', 1, '2013-06-24 21:58:43', 1),
(1772, 33, 'MORIDOU', '', 1, '2013-06-24 21:59:11', 1, '2013-06-24 21:59:11', 1),
(1773, 33, 'SANGBANDOU', '', 1, '2013-06-24 21:59:45', 1, '2013-09-18 11:04:47', 1),
(1774, 34, 'DJIFFA', '', 1, '2013-06-24 22:00:09', 1, '2013-09-18 11:10:20', 1),
(1775, 34, 'FONODOU', '', 1, '2013-06-24 22:00:35', 1, '2013-06-24 22:00:35', 1),
(1776, 34, 'GBESSOBA', '', 1, '2013-06-24 22:01:15', 1, '2013-09-18 11:07:12', 1),
(1777, 34, 'GLANGBA', '', 1, '2013-06-24 22:01:38', 1, '2013-06-24 22:01:38', 1),
(1778, 34, 'KABADOU', '', 1, '2013-06-24 22:02:04', 1, '2013-06-24 22:02:04', 1),
(1779, 34, 'SEYA', '', 1, '2013-06-24 22:02:24', 1, '2013-06-24 22:02:24', 1),
(1780, 34, 'TANANTOU', '', 1, '2013-06-24 22:03:03', 1, '2013-06-24 22:03:03', 1),
(1781, 34, 'TINKORO', '', 1, '2013-06-24 22:03:26', 1, '2013-09-18 11:08:53', 1),
(1782, 35, 'DORELA', '', 1, '2013-06-24 22:03:53', 1, '2013-06-24 22:03:53', 1),
(1783, 35, 'KARALA I', '', 1, '2013-06-24 22:04:14', 1, '2013-09-18 11:12:46', 1),
(1784, 35, 'KOBALA', '', 1, '2013-06-24 22:04:38', 1, '2013-06-24 22:04:38', 1),
(1785, 35, 'W&Ouml;R&Ouml;', '', 1, '2013-06-24 22:05:08', 1, '2013-09-18 11:13:24', 1),
(1786, 36, 'BELEKOKO', '', 1, '2013-06-24 22:05:33', 1, '2013-06-24 22:05:33', 1),
(1787, 36, 'DJEMOU', '', 1, '2013-06-24 22:05:57', 1, '2013-06-24 22:05:57', 1),
(1788, 36, 'KOUMANDOU CENTRE', '', 1, '2013-06-24 22:06:35', 1, '2013-06-24 22:06:35', 1),
(1789, 36, 'SARAN', '', 1, '2013-06-24 22:06:57', 1, '2013-09-18 11:15:00', 1),
(1790, 36, 'TOGOBALA', '', 1, '2013-06-24 22:07:46', 1, '2013-06-24 22:07:46', 1),
(1791, 37, 'DIAKRO', '', 1, '2013-06-24 22:08:11', 1, '2013-09-18 10:23:46', 1),
(1792, 37, 'FAMOILA', '', 1, '2013-06-24 22:09:09', 1, '2013-06-24 22:09:09', 1),
(1793, 37, 'FROMAR&Ouml;', '', 1, '2013-06-24 22:09:29', 1, '2013-09-18 10:22:38', 1),
(1794, 37, 'MOUSSADOU CENTRE', '', 1, '2013-06-24 22:10:07', 1, '2013-06-24 22:10:07', 1),
(1795, 37, 'SIDIKIDOU', '', 1, '2013-06-24 22:10:30', 1, '2013-06-24 22:10:30', 1),
(1796, 37, 'WANINO', '', 1, '2013-06-24 22:11:20', 1, '2013-06-24 22:11:20', 1),
(1797, 38, 'MORIBADOU I', '', 1, '2013-06-24 22:11:43', 1, '2013-09-18 10:27:32', 1),
(1798, 38, 'NIONSOMORIDOU CENTRE', '', 1, '2013-06-24 22:12:03', 1, '2013-06-24 22:12:03', 1),
(1799, 38, 'SONDOU', '', 1, '2013-06-24 22:12:41', 1, '2013-06-24 22:12:41', 1),
(1800, 38, 'SOSSABA', '', 1, '2013-06-24 22:13:03', 1, '2013-06-24 22:13:03', 1),
(1801, 38, 'YENTEDOU', '', 1, '2013-06-24 22:13:34', 1, '2013-09-18 10:25:42', 1),
(1802, 39, 'DJIBADOU', '', 1, '2013-06-24 22:13:55', 1, '2013-06-24 22:13:55', 1),
(1803, 39, 'FAKOUROUDOU', '', 1, '2013-06-24 22:14:23', 1, '2013-06-24 22:14:23', 1),
(1804, 39, 'KOBALA', '', 1, '2013-06-24 22:14:46', 1, '2013-06-24 22:14:46', 1),
(1805, 39, 'SINEDOU', '', 1, '2013-06-24 22:15:13', 1, '2013-06-24 22:15:13', 1),
(1806, 39, 'SOGBORO', '', 1, '2013-06-24 22:16:12', 1, '2013-06-24 22:16:12', 1),
(1807, 39, 'SOKODOU', '', 1, '2013-06-24 22:16:36', 1, '2013-06-24 22:16:36', 1),
(1808, 39, 'TAMANKO', '', 1, '2013-06-24 22:17:00', 1, '2013-06-24 22:17:00', 1),
(1809, 40, 'BELEBORO', '', 1, '2013-06-24 22:17:29', 1, '2013-09-18 10:43:26', 1),
(1810, 40, 'BIRAMADOU BADA', '', 1, '2013-06-24 22:17:48', 1, '2013-09-18 10:40:25', 1),
(1811, 40, 'BRONKEDOU', '', 1, '2013-06-24 22:18:07', 1, '2013-06-24 22:18:07', 1),
(1812, 40, 'HEREMAKONO', '', 1, '2013-06-24 22:18:46', 1, '2013-09-18 10:45:38', 1),
(1813, 40, 'KONELA', '', 1, '2013-06-24 22:19:07', 1, '2013-06-24 22:19:07', 1),
(1814, 40, 'KOULOUNDOU', '', 1, '2013-06-24 22:19:31', 1, '2013-06-24 22:19:31', 1),
(1815, 40, 'N\\\'GOMANDOU', '', 1, '2013-06-24 22:19:57', 1, '2013-06-24 22:19:57', 1),
(1816, 40, 'OUSOUMORIDOU', '', 1, '2013-06-24 22:20:19', 1, '2013-06-24 22:20:19', 1),
(1817, 40, 'SABOUYA', '', 1, '2013-06-24 22:20:39', 1, '2013-06-24 22:20:39', 1),
(1818, 40, 'SIRYA', '', 1, '2013-06-24 22:21:06', 1, '2013-09-18 10:39:07', 1),
(1819, 40, 'SUE', '', 1, '2013-06-24 22:21:24', 1, '2013-06-24 22:21:24', 1),
(1821, 41, 'FOROMARO', '', 1, '2013-06-24 22:22:48', 1, '2013-06-24 22:22:48', 1),
(1822, 41, 'SOKOURALA CENTRE', '', 1, '2013-06-24 22:23:05', 1, '2013-06-24 22:23:05', 1),
(1823, 41, 'TAMANTOU', '', 1, '2013-06-24 22:24:13', 1, '2013-06-24 22:24:13', 1),
(1824, 41, 'WOROCIA', '', 1, '2013-06-24 22:24:33', 1, '2013-06-24 22:24:33', 1),
(1825, 43, 'BEDDOU', '', 1, '2013-06-24 22:26:53', 1, '2013-06-24 22:26:53', 1),
(1826, 43, 'BOLODOU', '', 1, '2013-06-24 22:27:11', 1, '2013-09-18 12:02:32', 1),
(1827, 43, 'FA&Iuml;NDOU', '', 1, '2013-06-24 22:27:34', 1, '2013-09-18 12:02:52', 1),
(1828, 43, 'GBANDOU', '', 1, '2013-06-24 22:27:55', 1, '2013-06-24 22:27:55', 1),
(1829, 43, 'KOLEADOU', '', 1, '2013-06-24 22:28:16', 1, '2013-06-24 22:28:16', 1),
(1830, 43, 'SOUNTOU', '', 1, '2013-06-24 22:28:54', 1, '2013-09-18 12:04:23', 1),
(1831, 43, 'KONGOMA', '', 1, '2013-06-24 22:29:16', 1, '2013-06-24 22:29:16', 1),
(1832, 44, 'BASSEDOU', '', 1, '2013-06-24 22:29:48', 1, '2013-06-24 22:29:48', 1),
(1833, 44, 'DAK&Ouml;NG&Ouml;', '', 1, '2013-06-24 22:30:31', 1, '2013-09-18 12:23:28', 1),
(1834, 44, 'FANGAMANDOU', '', 1, '2013-06-24 22:30:51', 1, '2013-09-18 12:22:17', 1),
(1835, 44, 'KANGAMA', '', 1, '2013-06-24 22:31:12', 1, '2013-09-18 12:25:51', 1),
(1836, 44, 'KIESSENEYE', '', 1, '2013-06-24 22:31:35', 1, '2013-09-18 12:25:17', 1),
(1837, 44, 'KOLOMBA', '', 1, '2013-06-24 22:32:44', 1, '2013-06-24 22:32:44', 1),
(1838, 44, 'K&Ouml;&Ouml;NIN', '', 1, '2013-06-24 22:33:03', 1, '2013-09-18 12:23:54', 1),
(1839, 44, 'SOWADOU', '', 1, '2013-06-24 22:33:34', 1, '2013-06-24 22:33:34', 1),
(1840, 44, 'TONGOLO', '', 1, '2013-06-24 22:33:58', 1, '2013-09-18 12:24:17', 1),
(1841, 42, 'BOYADA', '', 1, '2013-06-24 22:34:29', 1, '2013-09-18 12:12:29', 1),
(1842, 42, 'CARRIERE', '', 1, '2013-06-24 22:34:50', 1, '2013-06-24 22:34:50', 1),
(1845, 42, 'GNOUMOULOU', '', 1, '2013-06-24 22:36:45', 1, '2013-06-24 22:36:45', 1),
(1846, 42, 'GUEKEDOU-LELE', '', 1, '2013-06-24 22:37:06', 1, '2013-06-24 22:37:06', 1),
(1847, 42, 'SOK&Ouml;R&Ouml;', '', 1, '2013-06-24 22:37:24', 1, '2013-09-18 12:17:31', 1),
(1848, 42, 'HEREMAK&Ouml;N&Ouml;', '', 1, '2013-06-24 22:37:44', 1, '2013-09-18 12:14:28', 1),
(1849, 42, 'KIASSENEYE', '', 1, '2013-06-24 22:38:03', 1, '2013-06-24 22:38:03', 1),
(1850, 42, 'MACENTA- KOURA', '', 1, '2013-06-24 22:38:24', 1, '2013-09-18 12:18:01', 1),
(1851, 42, 'MADINA', '', 1, '2013-06-24 22:38:45', 1, '2013-06-24 22:38:45', 1),
(1852, 42, 'MANGALA', '', 1, '2013-06-24 22:39:08', 1, '2013-09-18 12:14:58', 1),
(1853, 42, 'N&Ouml;NGOLO', '', 1, '2013-06-24 22:39:27', 1, '2013-09-18 12:16:50', 1),
(1854, 42, 'NYALENKO', '', 1, '2013-06-24 22:39:50', 1, '2013-06-24 22:39:50', 1),
(1855, 42, 'SANDIA', '', 1, '2013-06-24 22:40:21', 1, '2013-06-24 22:40:21', 1),
(1856, 42, 'YENDENIN', '', 1, '2013-06-24 22:41:17', 1, '2013-06-24 22:41:17', 1),
(1857, 45, 'BADALA', '', 1, '2013-06-24 22:42:01', 1, '2013-06-24 22:42:27', 1),
(1858, 45, 'BOUKOUSSOU', '', 1, '2013-06-24 22:42:52', 1, '2013-06-24 22:42:52', 1),
(1859, 45, 'DANDOU-BENDOU', '', 1, '2013-06-24 22:43:33', 1, '2013-09-18 12:34:25', 1),
(1860, 45, 'GUENDEMBOU', '', 1, '2013-06-24 22:43:52', 1, '2013-09-18 12:31:32', 1),
(1861, 45, 'GUELO', '', 1, '2013-06-24 22:44:37', 1, '2013-06-24 22:44:37', 1),
(1862, 45, 'GUEMALO', '', 1, '2013-06-24 22:44:57', 1, '2013-06-24 22:44:57', 1),
(1863, 45, 'KAT-KAMA', '', 1, '2013-06-24 22:45:46', 1, '2013-06-24 22:45:46', 1),
(1864, 46, 'BANDADOU', '', 1, '2013-06-24 22:46:09', 1, '2013-06-24 22:46:09', 1),
(1865, 46, 'KASSADOU CENTRE', '', 1, '2013-06-24 22:46:27', 1, '2013-06-24 22:46:27', 1),
(1866, 46, 'KOINDOU', '', 1, '2013-06-24 22:48:00', 1, '2013-06-24 22:48:00', 1),
(1867, 46, 'KOLONKALA', '', 1, '2013-06-24 22:48:17', 1, '2013-06-24 22:48:17', 1),
(1868, 46, 'KOUNTE', '', 1, '2013-06-24 22:48:38', 1, '2013-06-24 22:48:38', 1),
(1869, 46, 'OULAKO', '', 1, '2013-06-24 22:49:28', 1, '2013-06-24 22:49:28', 1),
(1870, 46, 'SEREDOU', '', 1, '2013-06-24 22:49:55', 1, '2013-06-24 22:49:55', 1),
(1871, 46, 'TOUMANDOU', '', 1, '2013-06-24 22:50:16', 1, '2013-06-24 22:50:16', 1),
(1872, 46, 'YOMADOU', '', 1, '2013-06-24 22:50:45', 1, '2013-06-24 22:50:45', 1),
(1873, 47, 'BALLADOU-PEBAL', '', 1, '2013-06-24 22:51:20', 1, '2013-09-18 12:48:13', 1),
(1874, 47, 'DANDOU', '', 1, '2013-06-24 22:51:50', 1, '2013-06-24 22:51:50', 1),
(1875, 47, 'SOFEDOU-KAMBADOU', '', 1, '2013-06-24 22:52:22', 1, '2013-09-18 12:41:14', 1),
(1876, 47, 'KOUNDOU I', '', 1, '2013-06-24 22:52:50', 1, '2013-09-18 12:41:20', 1),
(1877, 47, 'KOUNDOU II', '', 1, '2013-06-24 22:53:07', 1, '2013-09-18 12:41:27', 1),
(1879, 47, 'LENGO', '', 1, '2013-06-24 22:54:06', 1, '2013-09-18 12:40:02', 1),
(1880, 47, 'SANGUEDOU', '', 1, '2013-06-24 22:54:33', 1, '2013-06-24 22:54:33', 1),
(1881, 47, 'TANG&Ouml;L&Ouml;', '', 1, '2013-06-24 22:54:52', 1, '2013-09-18 12:46:19', 1),
(1882, 47, 'TEMESSADOU M\\\'BOKE', '', 1, '2013-06-24 22:55:29', 1, '2013-06-24 22:55:29', 1),
(1883, 47, 'TEMESSADOU-LENGOBENG', '', 1, '2013-06-24 22:56:02', 1, '2013-09-18 12:47:43', 1),
(1884, 48, 'KOLIGNIND&Ouml;', '', 1, '2013-06-24 22:56:30', 1, '2013-09-18 12:49:55', 1),
(1885, 48, 'NONGOA', '', 1, '2013-06-24 22:56:55', 1, '2013-09-18 12:49:30', 1),
(1886, 48, 'OULADEN', '', 1, '2013-06-24 22:57:30', 1, '2013-09-18 12:50:19', 1),
(1887, 48, 'TAMANDOU', '', 1, '2013-06-24 22:58:37', 1, '2013-09-18 12:50:58', 1),
(1888, 49, 'BENDOU', '', 1, '2013-06-24 22:59:00', 1, '2013-06-24 22:59:42', 1),
(1889, 49, 'OWET-DJIBA', '', 1, '2013-06-24 23:00:00', 1, '2013-09-18 12:53:13', 1),
(1890, 49, 'WOUNDEDOU', '', 1, '2013-06-24 23:00:31', 1, '2013-06-24 23:00:31', 1),
(1891, 49, 'DENGUEDOU', '', 1, '2013-06-24 23:01:24', 1, '2013-06-24 23:01:24', 1),
(1892, 49, 'KENEMA', '', 1, '2013-06-24 23:01:43', 1, '2013-09-18 12:52:57', 1),
(1893, 49, 'KOUNDOU-TOH', '', 1, '2013-06-24 23:02:09', 1, '2013-09-18 12:56:01', 1),
(1894, 49, 'N\\\'GOUAHOU', '', 1, '2013-06-24 23:02:41', 1, '2013-09-24 10:26:19', 1),
(1895, 50, 'BAWA', '', 1, '2013-06-24 23:04:52', 1, '2013-06-24 23:04:52', 1),
(1896, 50, 'TOUMANDOU', '', 1, '2013-06-24 23:05:10', 1, '2013-06-24 23:05:10', 1),
(1897, 51, 'MONGO', '', 1, '2013-06-24 23:06:20', 1, '2013-06-24 23:06:20', 1),
(1898, 50, 'KONDEMBADOU', '', 1, '2013-06-24 23:06:44', 1, '2013-06-24 23:06:44', 1),
(1899, 50, 'OWET-KAMA', '', 1, '2013-06-24 23:07:11', 1, '2013-09-18 12:57:49', 1),
(1900, 50, 'TALLO-BENGOU', '', 1, '2013-06-24 23:07:52', 1, '2013-06-24 23:07:52', 1),
(1902, 50, 'YARADOUKONGONANNY', '', 1, '2013-06-24 23:09:06', 1, '2013-09-18 12:59:37', 1),
(1903, 51, 'BAGBE-DAYE', '', 1, '2013-06-24 23:09:28', 1, '2013-09-18 12:11:07', 1),
(1904, 51, 'BANDALO-KILAKA', '', 1, '2013-06-24 23:09:47', 1, '2013-09-18 12:09:29', 1),
(1905, 51, 'BEINDOU-BOODOU', '', 1, '2013-06-24 23:10:20', 1, '2013-09-18 12:07:02', 1),
(1906, 51, 'TEDOU', '', 1, '2013-06-24 23:11:00', 1, '2013-06-24 23:11:00', 1),
(1907, 51, 'TEMMESSADOU', '', 1, '2013-06-24 23:11:21', 1, '2013-09-18 12:06:29', 1),
(1908, 51, 'YARADOU-KAO', '', 1, '2013-06-24 23:11:41', 1, '2013-06-24 23:11:41', 1),
(1909, 51, 'YOMADOUKOUNDOUFAMA', '', 1, '2013-06-24 23:12:07', 1, '2013-09-18 12:10:14', 1),
(1910, 51, 'LEWA-MAMADOU', '', 1, '2013-06-24 23:12:33', 1, '2013-09-18 12:08:27', 1),
(1911, 20, 'BOSSOU CENTRE', '', 1, '2013-06-25 14:01:14', 1, '2013-06-25 14:01:14', 1),
(1912, 20, 'GBAH', '', 1, '2013-06-25 14:01:37', 1, '2013-06-25 14:01:37', 1),
(1913, 20, 'GBENEMOU', '', 1, '2013-06-25 14:02:01', 1, '2013-06-25 14:02:01', 1),
(1914, 20, 'SOROMIATA II', '', 1, '2013-06-25 14:02:54', 1, '2013-09-17 18:27:34', 1),
(1915, 20, 'THUO', '', 1, '2013-06-25 14:03:24', 1, '2013-06-25 14:03:24', 1),
(1916, 21, 'FOUMBADOU I', '', 1, '2013-06-25 14:03:59', 1, '2013-09-18 09:46:27', 1),
(1917, 21, 'MANANKO', '', 1, '2013-06-25 14:04:32', 1, '2013-06-25 14:04:32', 1),
(1918, 21, 'MANASSOBA', '', 1, '2013-06-25 14:05:01', 1, '2013-06-25 14:05:01', 1),
(1919, 21, 'MORIGBEDOU', '', 1, '2013-06-25 14:05:34', 1, '2013-06-25 14:05:34', 1),
(1920, 22, 'FANGA', '', 1, '2013-06-25 14:06:24', 1, '2013-09-18 09:52:50', 1),
(1921, 22, 'GAMA BEREMA CENTRE  ', '', 1, '2013-06-25 14:07:00', 1, '2013-09-18 09:51:01', 1),
(1922, 22, 'GUELEMATA', '', 1, '2013-06-25 14:08:28', 1, '2013-06-25 14:08:28', 1),
(1923, 22, 'KASSIETA', '', 1, '2013-06-25 14:10:09', 1, '2013-09-18 09:53:07', 1),
(1924, 22, 'PINE', '', 1, '2013-06-25 14:10:34', 1, '2013-06-25 14:10:34', 1),
(1925, 23, 'GBOTORO', '', 1, '2013-06-25 14:10:57', 1, '2013-06-25 14:10:57', 1),
(1926, 23, 'GONOTA', '', 1, '2013-06-25 14:11:23', 1, '2013-06-25 14:11:23', 1),
(1927, 23, 'GUEASSO CENTRE  I', '', 1, '2013-06-25 14:12:13', 1, '2013-09-18 09:54:39', 1),
(1928, 23, 'MORIBADOU', '', 1, '2013-06-25 14:12:39', 1, '2013-06-25 14:12:39', 1),
(1929, 23, 'TONO', '', 1, '2013-06-25 14:13:07', 1, '2013-09-18 09:56:04', 1),
(1930, 23, 'ZESSOU', '', 1, '2013-06-25 14:13:46', 1, '2013-09-18 09:55:31', 1),
(1931, 24, 'DIAWASSOU', '', 1, '2013-06-25 14:14:23', 1, '2013-06-25 14:15:18', 1),
(1932, 24, 'KANI', '', 1, '2013-06-25 14:14:51', 1, '2013-09-18 09:57:35', 1),
(1933, 24, 'KEOULENTA', '', 1, '2013-06-25 14:15:43', 1, '2013-06-25 14:15:43', 1),
(1934, 24, 'KOKOTA', '', 1, '2013-06-25 14:16:20', 1, '2013-09-18 09:57:16', 1),
(1935, 24, 'LEAPELETA', '', 1, '2013-06-25 14:16:36', 1, '2013-06-25 14:16:36', 1),
(1936, 24, 'YENETA', '', 1, '2013-06-25 14:16:56', 1, '2013-06-25 14:16:56', 1),
(1937, 24, 'DOULOUBA', '', 1, '2013-06-25 14:17:18', 1, '2013-09-18 09:58:51', 1),
(1938, 25, 'KENIENTA', '', 1, '2013-06-25 14:18:04', 1, '2013-09-18 10:02:08', 1),
(1939, 25, 'LAINE CENTRE II', '', 1, '2013-06-25 14:18:21', 1, '2013-09-18 10:00:33', 1),
(1940, 25, 'YOKPOTA', '', 1, '2013-06-25 14:18:41', 1, '2013-06-25 14:18:41', 1),
(1941, 19, 'BALEMOU', '', 1, '2013-06-25 14:18:59', 1, '2013-06-25 14:18:59', 1),
(1942, 19, 'FLAYAPO', '', 1, '2013-06-25 14:19:21', 1, '2013-09-17 18:28:38', 1),
(1943, 19, 'FORCES ARMEES', '', 1, '2013-06-25 15:04:18', 1, '2013-06-25 15:04:18', 1),
(1944, 19, 'GAMA KONIKONI', '', 1, '2013-06-25 15:04:43', 1, '2013-09-17 18:41:17', 1),
(1945, 19, 'GBECKE', '', 1, '2013-06-25 15:05:35', 1, '2013-06-25 15:05:35', 1),
(1946, 19, 'GOH', '', 1, '2013-06-25 15:06:01', 1, '2013-09-17 18:41:40', 1),
(1947, 19, 'GOGOTA I', '', 1, '2013-06-25 15:06:36', 1, '2013-09-17 18:33:56', 1),
(1948, 19, 'GOTEKOLY', '', 1, '2013-06-25 15:06:56', 1, '2013-09-17 18:38:01', 1),
(1949, 26, 'KEOULENTA', '', 1, '2013-06-25 15:07:18', 1, '2013-06-25 15:07:44', 1),
(1950, 26, 'N\\\'ZOO CENTRE I', '', 1, '2013-06-25 15:08:16', 1, '2013-09-18 10:03:15', 1),
(1952, 27, 'IRO', '', 1, '2013-06-25 15:09:03', 1, '2013-06-25 15:09:03', 1),
(1953, 24, 'GOBOUTA', '', 1, '2013-06-25 15:09:33', 1, '2013-09-18 09:58:08', 1),
(1954, 27, 'KPINITA', '', 1, '2013-06-25 15:10:15', 1, '2013-09-18 10:08:27', 1),
(1956, 19, 'MAGHA-MO', '', 1, '2013-06-25 15:11:16', 1, '2013-09-17 18:29:20', 1),
(1957, 19, 'HOMIAKOLY I', '', 1, '2013-06-25 15:12:13', 1, '2013-09-17 18:43:31', 1),
(1958, 19, 'KPELEKOLY', '', 1, '2013-06-25 15:12:31', 1, '2013-09-17 18:42:13', 1),
(1959, 19, 'N\\\'ZON', '', 1, '2013-06-25 15:13:03', 1, '2013-06-25 15:13:03', 1),
(1960, 19, 'SOUOWALAKOLY I', '', 1, '2013-06-25 15:13:44', 1, '2013-09-17 18:45:35', 1),
(1961, 19, 'WEYAKORE', '', 1, '2013-06-25 15:14:07', 1, '2013-06-25 15:14:07', 1),
(1962, 19, 'ZOUGOUETA II', '', 1, '2013-06-25 15:14:26', 1, '2013-09-17 18:32:39', 12),
(1963, 26, 'DOROMOU', '', 1, '2013-06-25 15:14:48', 1, '2013-06-25 15:14:48', 1),
(1964, 26, 'GAAH', '', 1, '2013-06-25 15:15:07', 1, '2013-09-18 10:04:06', 1),
(1965, 26, 'GBAKORE', '', 1, '2013-06-25 15:15:35', 1, '2013-06-25 15:15:35', 1),
(1966, 27, 'TOUNKARATA', '', 1, '2013-06-25 15:15:54', 1, '2013-09-18 10:06:51', 1),
(1967, 53, 'BALIZIA', '', 1, '2013-06-25 15:19:19', 1, '2013-09-18 09:47:21', 1),
(1968, 53, 'BEZEREGA', '', 1, '2013-06-25 15:19:35', 1, '2013-06-25 15:19:35', 1),
(1969, 53, 'KOLOUMA', '', 1, '2013-06-25 15:19:54', 1, '2013-06-25 15:19:54', 1),
(1970, 53, 'KOTIDOU', '', 1, '2013-06-25 15:20:14', 1, '2013-06-25 15:20:14', 1),
(1971, 53, 'LASSAOU', '', 1, '2013-06-25 15:20:30', 1, '2013-06-25 15:20:30', 1),
(1972, 53, 'ROUEZOU', '', 1, '2013-06-25 15:20:50', 1, '2013-06-25 15:20:50', 1),
(1973, 53, 'SANGASSOU', '', 1, '2013-06-25 15:21:09', 1, '2013-06-25 15:21:09', 1),
(1974, 53, 'VOLOA', '', 1, '2013-06-25 15:21:27', 1, '2013-06-25 15:21:27', 1),
(1975, 53, 'ZARABOROZOU', '', 1, '2013-06-25 15:22:23', 1, '2013-06-25 15:22:23', 1),
(1976, 19, 'BINIKALA CENTRE', '', 1, '2013-06-25 15:22:52', 1, '2013-06-25 15:22:52', 1),
(1977, 54, 'GOHOME', '', 1, '2013-06-25 15:23:29', 1, '2013-06-25 15:23:29', 1),
(1978, 54, 'BINIKALA CENTRE', '', 1, '2013-06-25 15:43:46', 1, '2013-06-25 15:43:46', 1),
(1980, 54, 'KPAVELEGBAOU', '', 1, '2013-06-25 15:45:08', 1, '2013-09-18 09:49:45', 1),
(1981, 54, 'LEMENESSOU', '', 1, '2013-06-25 15:45:27', 1, '2013-06-25 15:45:27', 1),
(1982, 54, 'NIESSOU', '', 1, '2013-06-25 15:46:13', 1, '2013-06-25 15:46:13', 1),
(1983, 54, 'SOUAME', '', 1, '2013-06-25 15:46:36', 1, '2013-06-25 15:46:36', 1),
(1984, 55, 'BOFOSSOU CENTRE', '', 1, '2013-06-25 15:47:23', 1, '2013-09-18 09:55:36', 1),
(1985, 55, 'DOIZEA', '', 1, '2013-06-25 15:47:42', 1, '2013-06-25 15:47:42', 1),
(1986, 55, 'KPOVOOLAOU', '', 1, '2013-06-25 15:50:06', 1, '2013-09-18 09:57:38', 1),
(1987, 55, 'NYANGUEZAZOU', '', 1, '2013-06-25 15:50:29', 1, '2013-09-18 09:56:59', 1),
(1988, 55, 'OZAOLAZOU', '', 1, '2013-06-25 15:50:50', 1, '2013-09-18 09:55:21', 1),
(1989, 55, 'SOVAOU', '', 1, '2013-06-25 15:51:15', 1, '2013-06-25 15:51:15', 1),
(1990, 55, 'ZIPO&Iuml;ZEBA', '', 1, '2013-06-25 15:51:50', 1, '2013-09-18 09:56:21', 1),
(1991, 56, 'BADIARO', '', 1, '2013-06-25 15:52:28', 1, '2013-06-25 15:52:28', 1),
(1992, 56, 'DARO CENTRE', '', 1, '2013-06-25 15:52:44', 1, '2013-06-25 15:52:44', 1),
(1993, 56, 'DIOMANDOU', '', 1, '2013-06-25 15:53:40', 1, '2013-06-25 15:53:40', 1),
(1994, 56, 'DOUSSOUYARADOU', '', 1, '2013-06-25 15:54:09', 1, '2013-09-18 10:00:57', 1),
(1995, 56, 'FOLOOU', '', 1, '2013-06-25 15:54:42', 1, '2013-06-25 15:54:42', 1),
(1996, 56, 'KARO', '', 1, '2013-06-25 15:55:18', 1, '2013-06-25 15:55:18', 1),
(1997, 56, 'KOVELEDOU', '', 1, '2013-06-25 15:55:56', 1, '2013-06-25 15:55:56', 1),
(1999, 57, 'FASSANKONI CENTRE', '', 1, '2013-06-25 15:56:42', 1, '2013-09-18 10:10:01', 1),
(2000, 57, 'NOBOROTONO', '', 1, '2013-06-25 16:02:05', 1, '2013-09-18 10:09:30', 1),
(2001, 57, 'TILIBAYE', '', 1, '2013-06-25 16:02:24', 1, '2013-06-25 16:02:24', 1),
(2002, 57, 'YEZOU', '', 1, '2013-06-25 16:03:13', 1, '2013-06-25 16:03:13', 1),
(2003, 58, 'BONODOU', '', 1, '2013-06-25 16:03:29', 1, '2013-06-25 16:03:52', 1),
(2005, 58, 'GOBOELA', '', 1, '2013-06-25 16:04:50', 1, '2013-06-25 16:04:50', 1),
(2006, 58, 'DANDANO II', '', 1, '2013-06-25 16:05:14', 1, '2013-09-18 10:10:57', 1),
(2007, 58, 'BANKO', '', 1, '2013-06-25 16:05:45', 1, '2013-06-25 16:05:45', 1),
(2008, 58, 'KOUANKAN II', '', 1, '2013-06-25 16:06:05', 1, '2013-09-18 10:12:10', 1),
(2009, 59, 'BODEZIA', '', 1, '2013-06-25 16:06:35', 1, '2013-06-25 16:06:59', 1),
(2010, 59, 'BREBEZOU', '', 1, '2013-06-25 16:07:37', 1, '2013-06-25 16:07:37', 1),
(2011, 59, 'KOYAMAH 1', '', 1, '2013-06-25 16:07:53', 1, '2013-09-18 10:24:21', 1),
(2012, 59, 'LOOH', '', 1, '2013-06-25 16:08:33', 1, '2013-09-18 10:18:34', 1),
(2013, 59, 'N\\\'ZAPPAH I', '', 1, '2013-06-25 16:09:11', 1, '2013-09-18 10:16:32', 1),
(2014, 59, 'ZATIOULA', '', 1, '2013-06-25 16:09:34', 1, '2013-06-25 16:09:34', 1),
(2015, 52, 'BAMALA', '', 1, '2013-06-25 16:10:03', 1, '2013-06-25 16:10:03', 1),
(2016, 52, 'BANIZE', '', 1, '2013-06-25 16:10:20', 1, '2013-06-25 16:10:20', 1),
(2017, 52, 'BOKONY', '', 1, '2013-06-25 16:10:51', 1, '2013-06-25 16:10:51', 1),
(2018, 52, 'BONGOMADOU', '', 1, '2013-06-25 16:11:17', 1, '2013-06-25 16:11:17', 1),
(2019, 52, 'BOUZIE', '', 1, '2013-06-25 16:11:37', 1, '2013-06-25 16:11:37', 1),
(2020, 52, 'BOWA I', '', 1, '2013-06-25 16:11:54', 1, '2013-09-18 10:29:25', 1),
(2021, 52, 'BOWA II', '', 1, '2013-06-25 16:12:09', 1, '2013-09-18 10:29:09', 1),
(2022, 52, 'HERMAKONON', '', 1, '2013-06-25 16:12:32', 1, '2013-06-25 16:12:32', 1),
(2023, 52, 'KAMANDOU CITE', '', 1, '2013-06-25 16:12:56', 1, '2013-06-25 16:12:56', 1),
(2025, 52, 'KAMANDOU KOURA', '', 1, '2013-06-25 16:13:29', 1, '2013-06-25 16:13:29', 1),
(2026, 52, 'MACENTA KOURA', '', 1, '2013-06-25 16:13:56', 1, '2013-06-25 16:13:56', 1),
(2027, 52, 'MADINA', '', 1, '2013-06-25 16:14:13', 1, '2013-06-25 16:14:13', 1),
(2028, 52, 'MOHAMED 5', '', 1, '2013-06-25 16:14:42', 1, '2013-09-18 10:26:20', 1),
(2029, 52, 'MOINLAMINIDOU', '', 1, '2013-06-25 16:15:17', 1, '2013-09-18 10:25:14', 1),
(2030, 52, 'NYANVALAZOU', '', 1, '2013-06-25 16:15:40', 1, '2013-09-18 10:27:05', 1),
(2031, 52, 'PATRICE', '', 1, '2013-06-25 16:16:17', 1, '2013-06-25 16:16:17', 1),
(2032, 52, 'ZEZE BOKONY', '', 1, '2013-06-25 16:16:40', 1, '2013-06-25 16:16:40', 1),
(2033, 60, 'DOUMOU', '', 1, '2013-06-25 16:17:00', 1, '2013-06-25 16:17:00', 1),
(2034, 60, 'N\\\'ZEBELA CENTRE', '', 1, '2013-06-25 16:17:51', 1, '2013-06-25 16:17:51', 1),
(2035, 61, 'KASSANKA', '', 1, '2013-06-25 16:21:00', 1, '2013-06-25 16:21:00', 1),
(2036, 61, 'SEDIMAI', '', 1, '2013-06-25 16:21:29', 1, '2013-06-25 16:21:29', 1),
(2038, 61, 'ZOBROMA', '', 1, '2013-06-25 16:22:39', 1, '2013-06-25 16:22:39', 1),
(2039, 62, 'BAKAMA', '', 1, '2013-06-25 16:22:56', 1, '2013-06-25 16:22:56', 1),
(2040, 62, 'GOZOMBOU', '', 1, '2013-06-25 16:23:15', 1, '2013-06-25 16:23:15', 1),
(2041, 62, 'GUILAOTAZOU', '', 1, '2013-06-25 16:23:35', 1, '2013-06-25 16:23:35', 1),
(2042, 62, 'PANZIAZOU CENTRE', '', 1, '2013-06-25 16:23:56', 1, '2013-06-25 16:23:56', 1),
(2043, 62, 'TAOULELA', '', 1, '2013-06-25 16:24:23', 1, '2013-06-25 16:24:23', 1),
(2044, 62, 'ZEMBEZOU', '', 1, '2013-06-25 16:24:50', 1, '2013-06-25 16:24:50', 1),
(2045, 62, 'ZOULAKORO', '', 1, '2013-06-25 16:25:24', 1, '2013-06-25 16:25:24', 1),
(2047, 63, 'SANGOLOMAI', '', 1, '2013-06-25 16:26:07', 1, '2013-06-25 16:26:07', 1),
(2048, 63, 'SENGBEDOU', '', 1, '2013-06-25 16:36:50', 1, '2013-09-18 10:37:56', 1),
(2049, 64, 'BOO', '', 1, '2013-06-25 16:37:36', 1, '2013-06-25 16:37:36', 1),
(2050, 64, 'BOUSSEDOU', '', 1, '2013-06-25 16:37:56', 1, '2013-06-25 16:37:56', 1),
(2051, 64, 'IRIE', '', 1, '2013-06-25 16:38:15', 1, '2013-06-25 16:38:15', 1),
(2052, 64, 'SEREDOU I', '', 1, '2013-06-25 16:38:40', 1, '2013-09-18 10:45:08', 1),
(2053, 64, 'SEREDOU II', '', 1, '2013-06-25 16:39:02', 1, '2013-09-18 10:42:50', 1),
(2054, 65, 'VASSEREDOU CENTRE', '', 1, '2013-06-25 16:39:45', 1, '2013-09-18 10:45:54', 1),
(2055, 66, 'B&Ouml;TEMA', '', 1, '2013-06-25 16:40:14', 1, '2013-09-18 10:47:59', 1),
(2056, 66, 'SOGOROHOU', '', 1, '2013-06-25 16:40:28', 1, '2013-06-25 16:40:28', 1),
(2057, 66, 'WATANKA', '', 1, '2013-06-25 16:41:09', 1, '2013-09-18 10:50:04', 1),
(2058, 66, 'VASSAZIAZOU', '', 1, '2013-06-25 16:41:34', 1, '2013-06-25 16:41:34', 1),
(2059, 2, 'BOUNAMA', '', 1, '2013-06-25 16:42:29', 1, '2013-09-18 10:53:43', 1),
(2060, 2, 'DOURAPA', '', 1, '2013-06-25 16:42:51', 1, '2013-06-25 16:42:51', 1),
(2061, 2, 'GBELEYE', '', 1, '2013-06-25 16:43:08', 1, '2013-06-25 16:43:08', 1),
(2062, 2, 'GONON', '', 1, '2013-06-25 16:43:30', 1, '2013-06-25 16:43:30', 1),
(2063, 2, 'GOSSOPA', '', 1, '2013-06-25 16:43:54', 1, '2013-06-25 16:43:54', 1),
(2064, 2, 'KANKORE', '', 1, '2013-06-25 16:44:16', 1, '2013-06-25 16:44:16', 1),
(2065, 2, 'KEREMA', '', 1, '2013-06-25 16:44:32', 1, '2013-06-25 16:44:32', 1),
(2066, 2, 'KPAO', '', 1, '2013-06-25 16:44:47', 1, '2013-06-25 16:44:47', 1),
(2067, 2, 'PELEDEYE', '', 1, '2013-06-25 16:45:08', 1, '2013-06-25 16:45:08', 1),
(2068, 2, 'TEYEHON', '', 1, '2013-06-25 16:45:36', 1, '2013-09-18 10:53:27', 1),
(2069, 3, 'BANZOU-NORD', '', 1, '2013-06-25 16:46:01', 1, '2013-09-18 10:56:29', 1),
(2070, 3, 'CEOBA', '', 1, '2013-06-25 16:46:37', 1, '2013-06-25 16:46:37', 1),
(2071, 3, 'KEAYEBA', '', 1, '2013-06-25 16:46:53', 1, '2013-09-18 10:54:55', 1),
(2072, 3, 'NONA', '', 1, '2013-06-25 16:47:17', 1, '2013-06-25 16:47:17', 1),
(2073, 3, 'TAKOLETA', '', 1, '2013-06-25 16:47:36', 1, '2013-06-25 16:47:36', 1),
(2074, 3, 'TAMOE', '', 1, '2013-06-25 16:48:01', 1, '2013-06-25 16:48:01', 1),
(2075, 4, 'KOBELA I', '', 1, '2013-06-25 16:48:16', 1, '2013-09-18 10:58:37', 1),
(2076, 4, 'KONIPARA', '', 1, '2013-06-25 16:49:46', 1, '2013-06-25 16:49:46', 1),
(2077, 4, 'MAOUON', '', 1, '2013-06-25 16:50:15', 1, '2013-06-25 16:50:15', 1),
(2078, 4, 'NIENH', '', 1, '2013-06-25 16:50:38', 1, '2013-09-18 10:59:03', 1),
(2079, 4, 'ZOWOTA', '', 1, '2013-06-25 16:51:08', 1, '2013-09-18 10:59:23', 1),
(2091, 6, 'KEREMANDA', '', 1, '2013-06-25 17:16:46', 1, '2013-06-25 17:17:11', 1),
(2092, 6, 'KEREZAGAYE', '', 1, '2013-06-25 17:17:29', 1, '2013-06-25 17:17:29', 1),
(2094, 6, 'KPAYE', '', 1, '2013-06-25 17:18:37', 1, '2013-06-25 17:18:37', 1),
(2095, 6, 'PAMPARA', '', 1, '2013-06-25 17:18:56', 1, '2013-06-25 17:18:56', 1),
(2096, 6, 'PAMPORE', '', 1, '2013-06-25 17:19:12', 1, '2013-06-25 17:19:12', 1),
(2097, 1, 'COMMERCIAL', '', 1, '2013-06-25 17:19:30', 1, '2020-08-14 13:26:31', 1),
(2098, 1, 'DOROTA II', '', 1, '2013-06-25 17:22:34', 1, '2013-09-18 11:24:06', 1),
(2099, 1, 'GBANGHANA', '', 1, '2013-06-25 17:22:59', 1, '2013-09-18 11:21:00', 1),
(2101, 1, 'GONIA III', '', 1, '2013-06-25 17:23:38', 1, '2013-09-18 11:21:33', 1),
(2103, 1, 'HOROYA II', '', 1, '2013-06-25 17:24:36', 1, '2013-09-18 11:16:32', 1),
(2104, 1, 'KOLIYEBA', '', 1, '2013-06-25 17:25:38', 1, '2013-09-18 11:18:57', 1),
(2105, 1, 'KWITEYAPOULOU', '', 1, '2013-06-25 17:26:05', 1, '2013-09-18 11:25:05', 1),
(2106, 1, 'MOHOMOU', '', 1, '2013-06-25 17:26:24', 1, '2013-06-25 17:26:24', 1),
(2108, 1, 'TILEPOULOU', '', 1, '2013-06-25 17:27:38', 1, '2013-06-25 17:27:38', 1),
(2109, 7, 'GBEANTA', '', 1, '2013-06-25 17:28:14', 1, '2013-06-25 17:29:32', 1),
(2111, 7, 'PALE I', '', 1, '2013-06-25 17:30:10', 1, '2013-09-18 11:44:10', 1),
(2113, 8, 'GBAMBA', '', 1, '2013-06-25 17:36:17', 1, '2013-06-25 17:36:44', 1),
(2114, 8, 'GBAYA', '', 1, '2013-06-25 17:37:03', 1, '2013-06-25 17:37:03', 1),
(2115, 8, 'GBILY', '', 1, '2013-06-25 17:37:18', 1, '2013-09-18 11:51:34', 1),
(2116, 8, 'KOMOU', '', 1, '2013-06-25 17:38:06', 1, '2013-06-25 17:38:06', 1),
(2118, 8, 'NIAMPARA', '', 1, '2013-06-25 17:39:09', 1, '2013-09-18 11:52:32', 1),
(2119, 8, 'NYEMA SUD', '', 1, '2013-06-25 17:39:24', 1, '2013-09-18 11:50:23', 1),
(2120, 8, 'SAMOE', '', 1, '2013-06-25 17:39:45', 1, '2013-09-18 11:51:54', 1),
(2121, 8, 'WEYA SUD', '', 1, '2013-06-25 17:42:17', 1, '2013-06-25 17:42:17', 1),
(2122, 9, 'KOLAKPATA', '', 1, '2013-06-25 17:42:42', 1, '2013-09-18 11:57:25', 1),
(2123, 9, 'KOMATA', '', 1, '2013-06-25 17:43:03', 1, '2013-06-25 17:43:03', 1),
(2124, 9, 'KPAGALAYE', '', 1, '2013-06-25 17:43:42', 1, '2013-06-25 18:12:26', 1),
(2125, 9, 'KPOULO', '', 1, '2013-06-25 17:44:02', 1, '2013-09-18 11:33:05', 1),
(2126, 9, 'SOUHOULE', '', 1, '2013-06-25 17:44:19', 1, '2013-06-25 17:44:19', 1),
(2127, 9, 'GBONO', '', 1, '2013-06-25 17:44:38', 1, '2013-09-18 11:56:17', 1),
(2128, 10, 'BOWE NORD', '', 1, '2013-06-25 18:03:15', 1, '2013-09-18 12:04:23', 1),
(2129, 10, 'FOOZOU', '', 1, '2013-06-25 18:04:00', 1, '2013-09-18 12:04:05', 1),
(2130, 10, 'KABIETA', '', 1, '2013-06-25 18:05:56', 1, '2013-06-25 18:05:56', 1),
(2131, 10, 'TOKPATA', '', 1, '2013-06-25 18:06:28', 1, '2013-06-25 18:06:28', 1),
(2132, 10, 'WOMEY II', '', 1, '2013-06-25 18:07:01', 1, '2013-09-18 12:02:46', 1),
(2133, 10, 'YOMATA', '', 1, '2013-06-25 18:10:55', 1, '2013-06-25 18:10:55', 1),
(2134, 10, 'ZENIMONTA', '', 1, '2013-06-25 18:11:27', 1, '2013-09-18 12:03:09', 1),
(2135, 10, 'WOMEY I', '', 1, '2013-06-25 18:11:54', 1, '2013-09-18 12:01:56', 1),
(2136, 11, 'GALAKPAYE', '', 1, '2013-06-25 18:13:02', 1, '2013-06-25 18:13:02', 1),
(2137, 11, 'GBOTTOYE', '', 1, '2013-06-25 18:13:25', 1, '2013-06-25 18:13:25', 1),
(2138, 11, 'KARANAH', '', 1, '2013-06-25 18:13:42', 1, '2013-09-18 12:05:59', 1),
(2139, 11, 'KONIA AVIATION', '', 1, '2013-06-25 18:14:23', 1, '2013-06-25 18:14:23', 1),
(2140, 11, 'KOTOZOU', '', 1, '2013-06-25 18:14:44', 1, '2013-06-25 18:14:44', 1),
(2141, 11, 'YALENZOU CENTRE', '', 1, '2013-06-25 18:15:01', 1, '2013-06-25 18:15:01', 1),
(2142, 1, 'BANIE CENTRE', '', 1, '2013-06-25 18:16:46', 1, '2013-06-25 18:16:46', 1),
(2143, 1, 'DONGOUETA', '', 1, '2013-06-25 18:17:02', 1, '2013-09-18 12:11:54', 1),
(2144, 1, 'GOTTOYE', '', 1, '2013-06-25 18:17:28', 1, '2013-06-25 18:17:28', 1),
(2145, 1, 'KOLIYE', '', 1, '2013-06-25 18:17:48', 1, '2013-06-25 18:17:48', 1),
(2146, 1, 'MELEKPOMA', '', 1, '2013-06-25 18:18:25', 1, '2013-06-25 18:18:25', 1),
(2147, 1, 'YOWA', '', 1, '2013-06-25 18:18:44', 1, '2013-06-25 18:18:44', 1),
(2148, 1, 'BH&Ecirc;TA', '', 1, '2013-06-25 18:19:04', 1, '2013-09-18 12:13:37', 1),
(2149, 1, 'BEMEYE', '', 1, '2013-06-25 18:19:59', 1, '2013-09-18 12:14:07', 1),
(2150, 1, 'KPAOLE', '', 1, '2013-06-25 18:20:24', 1, '2013-06-25 18:20:24', 1),
(2151, 1, 'LAGBARA', '', 1, '2013-06-25 18:21:04', 1, '2013-06-25 18:21:04', 1),
(2152, 1, 'OROYAKORE', '', 1, '2013-06-25 18:21:30', 1, '2013-06-25 18:21:30', 1),
(2153, 15, 'BALLAN', '', 1, '2013-06-25 18:21:50', 1, '2013-06-25 18:21:50', 1),
(2154, 15, 'BIGNAMOU', '', 1, '2013-06-25 18:23:02', 1, '2013-09-18 12:18:47', 1),
(2155, 15, 'GALAKPAYE', '', 1, '2013-06-25 18:23:20', 1, '2013-06-25 18:23:20', 1),
(2156, 15, 'GBAMOU', '', 1, '2013-06-25 18:23:40', 1, '2013-06-25 18:23:40', 1),
(2157, 15, 'KP&Ocirc;O', '', 1, '2013-06-25 18:24:31', 1, '2013-09-18 12:14:55', 1),
(2158, 15, 'NAWEY', '', 1, '2013-06-25 18:28:26', 1, '2013-09-18 12:15:20', 1),
(2159, 16, 'BALLO', '', 1, '2013-06-25 18:28:50', 1, '2013-06-25 18:28:50', 1),
(2160, 16, 'BAMAKAMA', '', 1, '2013-06-25 18:29:06', 1, '2013-06-25 18:29:06', 1),
(2162, 16, 'LONHONDIA', '', 1, '2013-06-25 18:29:46', 1, '2013-09-18 12:40:48', 1),
(2163, 15, 'BANZOU', '', 1, '2013-06-25 18:31:52', 1, '2013-09-18 12:16:33', 1),
(2164, 16, 'OURO II', '', 1, '2013-06-25 18:32:32', 1, '2013-09-18 12:37:53', 1),
(2165, 16, 'YALAKPALE', '', 1, '2013-06-25 18:32:53', 1, '2013-09-18 12:39:14', 1),
(2166, 17, 'BAALA', '', 1, '2013-06-25 18:33:12', 1, '2013-06-25 18:33:12', 1),
(2167, 17, 'DIECKE II', '', 1, '2013-06-25 18:33:37', 1, '2013-09-18 12:51:55', 1),
(2168, 17, 'KO&Iuml;MPA', '', 1, '2013-06-25 18:34:13', 1, '2013-09-18 12:47:35', 1),
(2169, 17, 'NAAPA', '', 1, '2013-06-25 18:34:29', 1, '2013-06-25 18:34:29', 1),
(2170, 17, 'SOOPA', '', 1, '2013-06-25 18:34:53', 1, '2013-06-25 18:34:53', 1),
(2171, 17, 'SAORO', '', 1, '2013-06-25 18:35:18', 1, '2013-06-25 18:35:18', 1),
(2172, 18, 'BEREGNA', '', 1, '2013-06-25 18:36:00', 1, '2013-09-18 12:55:13', 1),
(2173, 18, 'GALAYE', '', 1, '2013-06-25 18:36:18', 1, '2013-06-25 18:36:18', 1),
(2174, 18, 'NONAH', '', 1, '2013-06-25 18:36:51', 1, '2013-09-18 12:48:56', 1),
(2175, 18, 'OUETA', '', 1, '2013-06-25 18:37:18', 1, '2013-06-25 18:37:18', 1),
(2177, 18, 'YONOH', '', 1, '2013-06-25 18:37:50', 1, '2013-09-18 12:54:24', 1),
(2178, 1, 'GBANAKOLY', '', 1, '2013-06-25 18:38:08', 1, '2013-06-25 18:38:08', 1),
(2179, 1, 'GBOKOMEYE', '', 1, '2013-06-25 18:38:34', 1, '2013-06-25 18:38:34', 1),
(2180, 1, 'GBAMOU', '', 1, '2013-06-25 18:38:53', 1, '2013-09-18 13:00:44', 1),
(2181, 1, 'KPAOLE', '', 1, '2013-06-25 18:39:09', 1, '2013-06-25 18:39:09', 1),
(2182, 1, 'KWALA-KOLY', '', 1, '2013-06-25 18:39:26', 1, '2013-09-18 13:01:22', 1),
(2183, 1, 'KOLIPILITA', '', 1, '2013-06-25 18:39:49', 1, '2013-06-25 18:39:49', 1),
(2184, 1, 'MONEKOLY', '', 1, '2013-06-25 18:40:21', 1, '2013-09-18 12:59:25', 1),
(2189, 254, 'ALMAMYA II', '', 1, '2013-09-10 16:55:13', 1, '2013-09-12 11:02:07', 1),
(2190, 235, 'ALPHA YAYA DIALLO', '', 1, '2013-09-11 16:10:52', 1, '2013-09-11 16:10:52', 1),
(2191, 222, 'HAFIA 3', '', 1, '2013-09-11 16:11:41', 1, '2013-09-11 16:11:41', 1),
(2192, 235, 'TIGUE LAKO', '', 1, '2013-09-11 16:12:07', 1, '2013-09-11 16:12:07', 1),
(2193, 235, 'SABENDE 2', '', 1, '2013-09-11 16:17:32', 1, '2013-09-11 16:17:32', 1),
(2194, 222, 'HAFIA MINIERE 1', '', 1, '2013-09-11 16:17:48', 1, '2013-09-11 16:17:48', 1),
(2195, 235, 'AVIATION II', '', 1, '2013-09-11 16:18:59', 1, '2013-09-11 16:18:59', 1),
(2196, 235, 'TABOSSY II', '', 1, '2013-09-11 16:20:07', 1, '2013-09-11 16:20:07', 1),
(2197, 222, 'HAFIA MINIERE CENTRE', '', 1, '2013-09-11 16:20:34', 1, '2013-09-11 16:20:34', 1),
(2198, 235, 'KATOUROU I ECOLE', '', 1, '2013-09-11 16:22:30', 1, '2013-09-11 16:22:30', 1),
(2199, 235, 'KATOUROU I MOSQUEE', '', 1, '2013-09-11 16:24:41', 1, '2013-09-11 16:24:41', 1),
(2200, 222, 'HAFIA CH&Acirc;TEAU ', '', 1, '2013-09-11 16:25:25', 1, '2013-09-11 16:25:25', 1),
(2201, 235, 'KATOUROU II', '', 1, '2013-09-11 16:26:20', 1, '2013-09-11 16:26:20', 1),
(2204, 222, 'BELLE-VUE MARCHE 2', '', 1, '2013-09-11 16:35:06', 1, '2013-09-11 16:35:06', 1),
(2205, 239, 'DARES SALAM', '', 1, '2013-09-11 16:43:42', 1, '2013-09-11 16:43:42', 1),
(2206, 239, 'BOUSSOURA', '', 1, '2013-09-11 16:46:27', 1, '2013-09-11 16:46:27', 1),
(2207, 239, 'ATHIABALY', '', 1, '2013-09-11 16:47:16', 1, '2013-09-11 16:47:16', 1),
(2208, 239, 'KANDAIDA', '', 1, '2013-09-11 16:48:47', 1, '2013-09-11 16:48:47', 1),
(2209, 224, 'ALMAMYA 1', '', 1, '2013-09-11 16:49:00', 1, '2013-09-11 16:49:00', 1),
(2210, 224, 'ALMAMYA 2', '', 1, '2013-09-11 16:49:54', 1, '2013-09-11 16:49:54', 1),
(2211, 224, 'CORONTHIE 2', '', 1, '2013-09-11 16:50:56', 1, '2013-09-11 16:50:56', 1),
(2212, 240, 'KOUDIAN', '', 1, '2013-09-11 16:57:57', 1, '2013-09-11 16:57:57', 1),
(2213, 240, 'LONDAL', '', 1, '2013-09-11 17:00:27', 1, '2013-09-11 17:00:27', 1),
(2214, 240, 'POUGHAR', '', 1, '2013-09-11 17:01:09', 1, '2013-09-11 17:01:09', 1),
(2215, 223, 'HERMAKONON MOSQUEE', '', 1, '2013-09-11 17:01:21', 1, '2013-09-11 17:01:21', 1),
(2216, 240, 'ACKOUL', '', 1, '2013-09-11 17:01:53', 1, '2013-09-11 17:01:53', 1),
(2217, 241, 'KAMABY II', '', 1, '2013-09-11 17:05:16', 1, '2013-09-11 17:05:16', 1),
(2218, 241, 'DOUKOURELLA', '', 1, '2013-09-11 17:05:59', 1, '2013-09-11 17:05:59', 1),
(2219, 241, 'TABADEL', '', 1, '2013-09-11 17:06:35', 1, '2013-09-11 17:06:35', 1),
(2220, 241, 'AKADASSO', '', 1, '2013-09-11 17:07:04', 1, '2013-09-11 17:07:04', 1),
(2221, 241, 'SINTHIAN BORI', '', 1, '2013-09-11 17:09:19', 1, '2013-09-11 17:09:19', 1),
(2223, 242, 'SAMBALDE', '', 1, '2013-09-12 09:10:38', 1, '2013-09-12 09:10:38', 1),
(2224, 242, 'SALEMATA', '', 1, '2013-09-12 09:11:34', 1, '2013-09-12 09:11:34', 1),
(2225, 243, 'SAREBOIDO I', '', 1, '2013-09-12 09:15:04', 1, '2013-09-12 09:15:04', 1),
(2226, 242, 'MAROU', '', 1, '2013-09-12 09:15:58', 1, '2013-09-12 09:15:58', 1),
(2227, 243, 'MADINA BADIAR', '', 1, '2013-09-12 09:17:12', 1, '2013-09-12 15:04:09', 1),
(2228, 243, 'SOUNKOUTOU', '', 1, '2013-09-12 09:18:31', 1, '2013-09-12 15:07:35', 1),
(2229, 243, 'BARKERE', '', 1, '2013-09-12 09:19:29', 1, '2013-09-12 14:59:31', 1),
(2230, 243, 'ALTOU', '', 1, '2013-09-12 09:21:21', 1, '2013-09-12 09:21:21', 1),
(2231, 243, 'SANKA', '', 1, '2013-09-12 09:23:36', 1, '2013-09-12 15:05:34', 1),
(2232, 250, 'KENERY', '', 1, '2013-09-12 09:28:13', 1, '2013-09-12 15:26:30', 1),
(2233, 243, 'SINTHIAN SEKOU', '', 1, '2013-09-12 09:28:46', 1, '2013-09-12 15:07:11', 1),
(2234, 243, 'KATHIAOUROU', '', 1, '2013-09-12 09:29:14', 1, '2013-09-12 15:01:53', 1),
(2235, 243, 'BESSEOURO', '', 1, '2013-09-12 09:29:42', 1, '2013-09-12 15:00:43', 1),
(2236, 223, 'CARRIERE CITE', '', 1, '2013-09-12 09:29:49', 1, '2013-09-12 09:29:49', 1),
(2237, 243, 'SAREKALY', '', 1, '2013-09-12 09:30:24', 1, '2013-09-12 15:06:45', 1),
(2239, 244, 'HAMDALLAYE', '', 1, '2013-09-12 09:33:46', 1, '2013-09-12 09:33:46', 1),
(2240, 244, 'NANDOUMBA', '', 1, '2013-09-12 09:35:48', 1, '2013-09-12 09:35:48', 1),
(2242, 244, 'LEY - KONE', '', 1, '2013-09-12 09:37:31', 1, '2013-09-12 09:37:31', 1),
(2243, 244, 'IDHAR', '', 1, '2013-09-12 09:41:57', 1, '2013-09-12 09:41:57', 1),
(2244, 244, 'LAMBAGOL', '', 1, '2013-09-12 09:42:35', 1, '2013-09-12 09:42:35', 1),
(2245, 244, 'KOSSI', '', 1, '2013-09-12 09:44:28', 1, '2013-09-12 09:44:28', 1),
(2246, 223, 'BONFI ROUTIERE', '', 1, '2013-09-12 09:45:27', 1, '2013-09-12 09:45:27', 1),
(2247, 223, 'MATAM CENTRE', '', 1, '2013-09-12 09:48:33', 1, '2013-09-12 09:48:33', 1),
(2248, 245, 'OUYANE', '', 1, '2013-09-12 09:53:31', 1, '2013-09-12 09:53:31', 1),
(2249, 245, 'KIDACK', '', 1, '2013-09-12 09:54:04', 1, '2013-09-12 09:54:04', 1),
(2250, 245, 'ITHIOU', '', 1, '2013-09-12 09:54:28', 1, '2013-09-12 09:54:28', 1),
(2251, 246, 'BASSANTO', '', 1, '2013-09-12 10:00:10', 1, '2013-09-12 10:00:10', 1),
(2252, 246, 'BARKERE', '', 1, '2013-09-12 10:00:44', 1, '2013-09-12 10:00:44', 1),
(2253, 246, 'DANDOU', '', 1, '2013-09-12 10:01:37', 1, '2013-09-12 10:01:37', 1),
(2254, 246, 'KANYAN', '', 1, '2013-09-12 10:02:08', 1, '2013-09-12 10:02:08', 1),
(2255, 246, 'MADINA KEMBERA', '', 1, '2013-09-12 10:02:37', 1, '2013-09-12 10:02:37', 1),
(2256, 246, 'TOULON', '', 1, '2013-09-12 10:03:03', 1, '2013-09-12 10:03:03', 1),
(2257, 247, 'TABANDJAN', '', 1, '2013-09-12 10:06:55', 1, '2013-09-12 10:06:55', 1),
(2258, 248, 'KAKONI CENTRE', '', 1, '2013-09-12 10:07:30', 1, '2013-09-12 10:13:57', 1),
(2259, 248, 'KASSAYA BAMBA', '', 1, '2013-09-12 10:07:59', 1, '2013-09-12 10:16:41', 1),
(2260, 248, 'KABOBO', '', 1, '2013-09-12 10:08:28', 1, '2013-09-12 10:20:05', 1),
(2261, 248, 'N\\\'DANTARI', '', 1, '2013-09-12 10:09:07', 1, '2013-09-12 10:18:31', 1),
(2262, 251, 'N\\\'DANTABA', '', 1, '2013-09-12 10:32:25', 1, '2013-09-12 10:32:25', 1),
(2263, 251, 'HILIME', '', 1, '2013-09-12 10:33:14', 1, '2013-09-12 10:33:14', 1),
(2264, 251, 'KOUNSI', '', 1, '2013-09-12 10:34:29', 1, '2013-09-12 10:34:29', 1),
(2265, 252, 'NATA', '', 1, '2013-09-12 10:37:08', 1, '2013-09-12 10:37:08', 1),
(2266, 252, 'KOLOSSA', '', 1, '2013-09-12 10:37:39', 1, '2013-09-12 10:37:39', 1),
(2267, 220, 'ENTA MARCHE', '', 1, '2013-09-12 10:44:35', 1, '2013-09-12 10:44:35', 1),
(2268, 253, 'MAWBA', '', 1, '2013-09-12 10:46:29', 1, '2013-09-12 10:46:29', 1),
(2269, 253, 'SINTHIROU - TOUMBE', '', 1, '2013-09-12 10:48:19', 1, '2013-09-12 10:48:19', 1),
(2270, 253, 'PARAWALI', '', 1, '2013-09-12 10:49:13', 1, '2013-09-12 10:49:13', 1),
(2271, 220, 'KISSOSSO PLATEAU', '', 1, '2013-09-12 10:50:17', 1, '2013-09-12 10:50:17', 1),
(2272, 220, 'LANSANAYAH', '', 1, '2013-09-12 10:51:59', 1, '2013-09-12 10:51:59', 1),
(2273, 254, 'KHATIA', '', 1, '2013-09-12 10:53:27', 1, '2013-09-12 10:53:27', 1),
(2274, 254, 'FARENGHIA', '', 1, '2013-09-12 10:55:13', 1, '2013-09-12 10:55:13', 1),
(2275, 254, 'YIMMAYA', '', 1, '2013-09-12 10:56:57', 1, '2013-09-12 10:56:57', 1),
(2276, 254, 'KOSSINSING', '', 1, '2013-09-12 10:59:37', 1, '2013-09-12 10:59:37', 1),
(2277, 254, 'BALANDOUGOU', '', 1, '2013-09-12 11:01:40', 1, '2013-09-12 11:01:40', 1),
(2278, 254, 'BOLONDE II', '', 1, '2013-09-12 11:04:16', 1, '2013-09-12 11:04:16', 1),
(2279, 254, 'DOMINGHIA', '', 1, '2013-09-12 11:05:20', 1, '2013-09-12 11:05:20', 1),
(2280, 254, 'TORODOYAH', '', 1, '2013-09-12 11:07:22', 1, '2013-09-12 11:07:22', 1),
(2281, 254, 'WEREYAH', '', 1, '2013-09-12 11:08:41', 1, '2013-09-12 11:08:41', 1),
(2282, 254, 'SEKHEBADE', '', 1, '2013-09-12 11:09:30', 1, '2013-09-12 11:09:30', 1),
(2283, 220, 'SIMBAYA ECOLE', '', 1, '2013-09-12 11:31:13', 1, '2013-09-12 11:31:13', 1),
(2287, 220, 'TOMBOLIA PLATEAU', '', 1, '2013-09-12 11:34:23', 1, '2013-09-12 11:34:23', 1),
(2288, 220, 'YIMBAYA PERMANENCE', '', 1, '2013-09-12 11:35:37', 1, '2013-09-12 11:35:37', 1),
(2289, 220, 'YIMBAYA PORT', '', 1, '2013-09-12 11:36:13', 1, '2013-09-12 11:36:13', 1),
(2292, 220, 'DABOMPA PLATEAU', '', 1, '2013-09-12 11:37:55', 1, '2013-09-12 11:37:55', 1),
(2311, 221, 'YATTAYA FOSSIDET', '', 1, '2013-09-12 12:07:02', 1, '2013-09-12 12:07:02', 1),
(2316, 221, 'WAREYAH', '', 1, '2013-09-12 12:12:38', 1, '2013-09-12 12:12:38', 1),
(2319, 221, 'WANINDARA 3', '', 1, '2013-09-12 12:14:13', 1, '2013-09-12 12:14:13', 1),
(2323, 221, 'WANINDARA 1', '', 1, '2013-09-12 12:19:12', 1, '2013-09-12 12:19:12', 1),
(2328, 221, 'SOUMANBOSSIA', '', 1, '2013-09-12 12:20:47', 1, '2013-09-12 12:20:47', 1),
(2331, 221, 'SONFONIA GARE 2', '', 1, '2013-09-12 12:24:26', 1, '2013-09-12 12:24:26', 1),
(2338, 221, 'SONFONIA CENTRE 2', '', 1, '2013-09-12 12:30:55', 1, '2013-09-12 12:30:55', 1),
(2343, 221, 'BANTOUNKA 2', '', 1, '2013-09-12 12:32:51', 1, '2013-09-12 12:32:51', 1),
(2344, 221, 'NONGO', '', 1, '2013-09-12 12:34:14', 1, '2013-09-12 12:34:14', 1),
(2345, 221, 'NASSOUROULAYE', '', 1, '2013-09-12 12:35:10', 1, '2013-09-12 12:35:10', 1),
(2351, 221, 'KOLOMA SOLOPRIMO', '', 1, '2013-09-12 12:38:28', 1, '2013-09-12 12:38:28', 1),
(2359, 221, 'BANTOUNKA 1', '', 1, '2013-09-12 12:45:01', 1, '2013-09-12 12:45:01', 1),
(2375, 221, 'YEMBEYA', '', 1, '2013-09-12 13:07:29', 1, '2013-09-12 13:07:29', 1),
(2376, 221, 'DAR ES SALAM 2', '', 1, '2013-09-12 13:11:58', 1, '2013-09-12 13:11:58', 1),
(2377, 242, 'SAMBAILO CENTRE', '', 1, '2013-09-12 15:08:31', 1, '2013-09-12 15:08:31', 1),
(2389, 205, 'KALLELA', '', 1, '2013-09-12 16:43:47', 1, '2013-09-16 10:37:56', 1),
(2390, 205, 'BANDANKELEN', '', 1, '2013-09-12 16:44:39', 1, '2013-09-12 16:44:39', 1),
(2391, 205, 'DIABARY - DALADO', '', 1, '2013-09-12 16:45:30', 1, '2013-09-12 16:45:30', 1),
(2392, 205, 'KEBEYA II', '', 1, '2013-09-12 16:47:23', 1, '2013-09-12 16:47:23', 1),
(2393, 205, 'MORIGBEYA', '', 1, '2013-09-12 16:47:47', 1, '2013-09-12 16:47:47', 1),
(2394, 205, 'DALADO', '', 1, '2013-09-12 16:48:31', 1, '2013-09-12 16:48:31', 1),
(2395, 205, 'BADIKO', '', 1, '2013-09-12 16:49:34', 1, '2013-09-12 16:49:34', 1),
(2396, 205, 'SOUARELA', '', 1, '2013-09-12 16:50:22', 1, '2013-09-12 16:50:22', 1),
(2397, 206, 'TOUMANIA', '', 1, '2013-09-16 10:41:52', 1, '2013-09-16 10:41:52', 1),
(2398, 206, 'KOLON', '', 1, '2013-09-16 10:43:31', 1, '2013-09-16 10:43:31', 1),
(2399, 206, 'DIBAMBA', '', 1, '2013-09-16 10:44:15', 1, '2013-09-16 10:44:15', 1),
(2400, 206, 'HAMDALLAYE', '', 1, '2013-09-16 10:44:53', 1, '2013-09-16 10:44:53', 1),
(2401, 206, 'BASSY', '', 1, '2013-09-16 10:45:11', 1, '2013-09-16 10:45:11', 1),
(2402, 203, 'BANIRE', '', 1, '2013-09-16 10:47:11', 1, '2013-09-16 10:47:11', 1),
(2403, 203, 'BABILAYA', '', 1, '2013-09-16 10:48:09', 1, '2013-09-16 10:48:09', 1),
(2404, 203, 'FOUNDENG I', '', 1, '2013-09-16 10:48:59', 1, '2013-09-16 10:48:59', 1),
(2405, 203, 'KAMBAYA', '', 1, '2013-09-16 10:49:37', 1, '2013-09-16 10:49:37', 1),
(2406, 203, 'SINCERY', '', 1, '2013-09-16 10:50:17', 1, '2013-09-16 10:50:17', 1),
(2407, 203, 'KONKRONYA', '', 1, '2013-09-16 10:50:56', 1, '2013-09-16 10:50:56', 1),
(2408, 203, 'SOGNESSA', '', 1, '2013-09-16 10:51:35', 1, '2013-09-16 10:51:35', 1),
(2409, 203, 'DABOLAKORO', '', 1, '2013-09-16 10:51:48', 1, '2013-09-16 10:51:48', 1),
(2410, 207, 'DOGOMET CENTRE II', '', 1, '2013-09-16 10:55:19', 1, '2013-09-16 10:55:19', 1),
(2411, 207, 'KOOLO-HINDE', '', 1, '2013-09-16 10:57:52', 1, '2013-09-16 10:57:52', 1),
(2412, 207, 'SITA - KOTO', '', 1, '2013-09-16 10:59:57', 1, '2013-09-16 10:59:57', 1),
(2413, 208, 'BOUKA', '', 1, '2013-09-16 11:00:33', 1, '2013-09-16 11:01:50', 1),
(2414, 208, 'SAKOLA', '', 1, '2013-09-16 11:02:33', 1, '2013-09-16 11:02:33', 1),
(2415, 209, 'SARIFOULA WALAN', '', 1, '2013-09-16 11:03:42', 1, '2013-09-16 11:03:42', 1),
(2416, 211, 'SEMBAKOUNIA', '', 1, '2013-09-16 11:07:51', 1, '2013-09-16 11:07:51', 1),
(2417, 214, 'SANDAFARA', '', 1, '2013-09-16 11:30:35', 1, '2013-09-16 11:30:35', 1),
(2418, 272, 'KAROUBA TOUGANDE', '', 1, '2013-09-16 11:34:05', 1, '2013-09-16 11:34:05', 1),
(2419, 272, 'NORD I', '', 1, '2013-09-16 11:38:59', 1, '2013-09-16 11:38:59', 1),
(2420, 216, 'NOUHOUYA', '', 1, '2013-09-16 11:39:05', 1, '2013-09-16 11:39:05', 1),
(2421, 272, 'NORD II', '', 1, '2013-09-16 11:39:33', 1, '2013-09-16 11:39:33', 1),
(2422, 272, 'SOMAYAH MOSQUEE', '', 1, '2013-09-16 11:41:42', 1, '2013-09-16 11:41:42', 1),
(2423, 272, 'SOMAYAH PLATEAU', '', 1, '2013-09-16 11:43:33', 1, '2013-09-16 11:43:33', 1),
(2424, 272, 'LABO', '', 1, '2013-09-16 11:44:16', 1, '2013-09-16 11:44:16', 1),
(2425, 272, 'NAKIRI', '', 1, '2013-09-16 11:44:39', 1, '2013-09-16 11:44:39', 1),
(2426, 272, 'DOUMBOUYAH ECOLE', '', 1, '2013-09-16 11:49:12', 1, '2013-09-16 11:49:12', 1),
(2427, 217, 'WALANDAMA', '', 1, '2013-09-16 11:49:35', 1, '2013-09-16 11:49:35', 1),
(2428, 217, 'MISSIRA', '', 1, '2013-09-16 11:50:57', 1, '2013-09-16 11:50:57', 1),
(2429, 272, 'FILY I', '', 1, '2013-09-16 11:51:08', 1, '2013-09-16 11:51:08', 1),
(2430, 217, 'DJANKOUROU', '', 1, '2013-09-16 11:53:44', 1, '2013-09-16 11:53:44', 1),
(2431, 272, 'LAMINAYAH BATOUYAH', '', 1, '2013-09-16 11:56:26', 1, '2013-09-16 11:56:26', 1),
(2432, 219, 'WALAN MOSQUEE', '', 1, '2013-09-16 12:08:53', 1, '2013-09-16 12:08:53', 1),
(2433, 273, 'GOLEAH', '', 1, '2013-09-16 12:09:47', 1, '2013-09-16 12:09:47', 1),
(2434, 193, 'BANANKORO', '', 1, '2013-09-16 12:11:47', 1, '2013-09-16 12:11:47', 1),
(2435, 193, 'KOSSABA', '', 1, '2013-09-16 12:13:01', 1, '2013-09-16 12:13:01', 1),
(2436, 193, 'SAMOUDOU', '', 1, '2013-09-16 12:13:40', 1, '2013-09-16 12:13:40', 1),
(2437, 193, 'SOKOURALA', '', 1, '2013-09-16 12:14:19', 1, '2013-09-16 12:14:19', 1),
(2438, 193, 'MANDOU', '', 1, '2013-09-16 12:14:53', 1, '2013-09-16 12:14:53', 1),
(2439, 274, 'TANENE I', '', 1, '2013-09-16 12:16:13', 1, '2013-09-16 12:16:13', 1),
(2440, 193, 'BANIAN 2', '', 1, '2013-09-16 12:16:19', 1, '2013-09-16 12:16:19', 1),
(2441, 193, 'KAOLA', '', 1, '2013-09-16 12:17:03', 1, '2013-09-16 12:17:03', 1),
(2442, 193, 'YARAWADOU KOURA', '', 1, '2013-09-16 12:18:26', 1, '2013-09-16 12:18:26', 1),
(2443, 193, 'KONKOWA', '', 1, '2013-09-16 12:20:24', 1, '2013-09-16 12:20:24', 1),
(2444, 193, 'BAOUROUYA', '', 1, '2013-09-16 12:21:24', 1, '2013-09-16 12:21:24', 1),
(2445, 201, 'MENINKO', '', 1, '2013-09-16 12:25:22', 1, '2013-09-16 12:25:22', 1),
(2446, 193, 'LANCERDOU', '', 1, '2013-09-16 12:25:50', 1, '2013-09-16 12:25:50', 1),
(2447, 274, 'SANOYAH RAIL', '', 1, '2013-09-16 12:26:39', 1, '2013-09-16 12:26:39', 1),
(2448, 201, 'SONGOYAH HOPITAL', '', 1, '2013-09-16 12:26:41', 1, '2013-09-16 12:26:41', 1),
(2449, 274, 'SANOYAH KM 36', '', 1, '2013-09-16 12:27:04', 1, '2013-09-16 12:27:04', 1),
(2450, 201, 'SIRAMAYA', '', 1, '2013-09-16 12:27:18', 1, '2013-09-16 12:27:18', 1),
(2451, 201, 'SALIAH', '', 1, '2013-09-16 12:27:51', 1, '2013-09-16 12:27:51', 1),
(2452, 201, 'TINTERBA', '', 1, '2013-09-16 12:28:34', 1, '2013-09-16 12:28:34', 1),
(2453, 201, 'SONKONYAH', '', 1, '2013-09-16 12:28:55', 1, '2013-09-16 12:28:55', 1),
(2454, 274, 'KOUNTIAH', '', 1, '2013-09-16 12:29:26', 1, '2013-09-16 12:29:26', 1),
(2455, 274, 'C B A', '', 1, '2013-09-16 12:30:40', 1, '2013-09-16 12:30:40', 1),
(2456, 274, 'KALOKHOYAH', '', 1, '2013-09-16 12:31:12', 1, '2013-09-16 12:31:12', 1),
(2461, 274, 'TANENE II', '', 1, '2013-09-16 12:38:17', 1, '2013-09-16 12:38:17', 1),
(2465, 274, 'HERMAKONO', '', 1, '2013-09-16 12:39:00', 1, '2013-09-16 12:39:25', 1),
(2467, 274, 'BENTOURAYAH', '', 1, '2013-09-16 12:40:49', 1, '2013-09-16 12:40:49', 1),
(2468, 274, 'GOMBOYAH', '', 1, '2013-09-16 12:41:33', 1, '2013-09-16 12:41:33', 1),
(2469, 202, 'SELEN', '', 1, '2013-09-16 12:41:37', 1, '2013-09-16 12:41:37', 1),
(2470, 274, 'FASSIAN', '', 1, '2013-09-16 12:41:53', 1, '2013-09-16 12:41:53', 1),
(2471, 202, 'SANANKORO', '', 1, '2013-09-16 12:42:01', 1, '2013-09-16 12:42:01', 1),
(2472, 274, 'KASSOGNAH', '', 1, '2013-09-16 12:42:21', 1, '2013-09-16 12:42:21', 1),
(2473, 202, 'KABAYAKORO', '', 1, '2013-09-16 12:42:26', 1, '2013-09-16 12:42:26', 1),
(2474, 275, 'KENDOUMAYAH', '', 1, '2013-09-16 12:44:19', 1, '2013-09-16 12:44:19', 1),
(2475, 194, 'DIANAH', '', 1, '2013-09-16 12:44:44', 1, '2013-09-16 12:44:44', 1),
(2476, 194, 'KOUMANDI-KORO', '', 1, '2013-09-16 12:44:59', 1, '2013-09-16 12:44:59', 1),
(2477, 194, 'DALAFILANY', '', 1, '2013-09-16 12:46:01', 1, '2013-09-16 12:46:01', 1),
(2478, 192, 'TONKOLONKO II', '', 1, '2013-09-16 12:48:52', 1, '2013-09-16 12:48:52', 1),
(2479, 192, 'SASSANKO', '', 1, '2013-09-16 12:49:40', 1, '2013-09-16 12:49:40', 1),
(2480, 192, 'MILIDALA', '', 1, '2013-09-16 12:50:59', 1, '2013-09-16 12:50:59', 1),
(2481, 275, 'YENGUIAKHORY', '', 1, '2013-09-16 12:51:11', 1, '2013-09-16 12:51:11', 1),
(2482, 192, 'SOKOURALA', '', 1, '2013-09-16 12:51:40', 1, '2013-09-16 12:51:40', 1),
(2483, 275, 'LAMINAYAH', '', 1, '2013-09-16 12:51:57', 1, '2013-09-16 12:51:57', 1),
(2484, 192, 'MAGNA', '', 1, '2013-09-16 12:52:12', 1, '2013-09-16 12:52:12', 1),
(2485, 275, 'NASSER', '', 1, '2013-09-16 12:52:44', 1, '2013-09-16 12:52:44', 1),
(2486, 192, 'SAMBOUYA', '', 1, '2013-09-16 12:53:00', 1, '2013-09-16 12:53:00', 1),
(2487, 275, 'BONFE', '', 1, '2013-09-16 12:53:44', 1, '2013-09-16 12:53:44', 1),
(2488, 192, 'ABATTOIR II', '', 1, '2013-09-16 12:54:05', 1, '2013-09-16 12:54:05', 1),
(2489, 275, 'BALAMODOUYAH', '', 1, '2013-09-16 12:54:29', 1, '2013-09-16 12:54:29', 1),
(2490, 192, 'MODIA', '', 1, '2013-09-16 12:54:56', 1, '2013-09-16 12:54:56', 1),
(2491, 192, 'LAMINIYA KONDEBOUN', '', 1, '2013-09-16 12:55:58', 1, '2013-09-16 12:55:58', 1),
(2492, 192, 'KHORIA KOURA', '', 1, '2013-09-16 12:56:42', 1, '2013-09-16 12:56:42', 1),
(2493, 192, 'YARAWALIA', '', 1, '2013-09-16 12:57:25', 1, '2013-09-16 12:57:25', 1),
(2494, 192, 'FARANAH KOURA', '', 1, '2013-09-16 12:58:22', 1, '2013-09-16 12:58:22', 1),
(2495, 192, 'SIRIKOLENY II', '', 1, '2013-09-16 12:59:13', 1, '2013-09-16 12:59:13', 1),
(2496, 192, 'MARCHE I', '', 1, '2013-09-16 12:59:56', 1, '2013-09-16 12:59:56', 1),
(2497, 192, 'MARCHE II', '', 1, '2013-09-16 13:00:07', 1, '2013-09-16 13:00:07', 1),
(2498, 192, 'HEREMAKONO II', '', 1, '2013-09-16 13:01:40', 1, '2013-09-16 13:01:40', 1),
(2499, 195, 'TANGAYA', '', 1, '2013-09-16 13:02:27', 1, '2013-09-16 13:02:27', 1),
(2500, 195, 'GBETAYA', '', 1, '2013-09-16 13:02:53', 1, '2013-09-16 13:02:53', 1),
(2501, 195, 'GUEYAFARI', '', 1, '2013-09-16 13:03:15', 1, '2013-09-16 13:03:15', 1),
(2502, 195, 'BIRI', '', 1, '2013-09-16 13:03:58', 1, '2013-09-16 13:03:58', 1),
(2503, 196, 'BALLADOU', '', 1, '2013-09-16 13:35:30', 1, '2013-09-16 13:35:30', 1),
(2504, 196, 'SAFIGNA', '', 1, '2013-09-16 13:36:08', 1, '2013-09-16 13:36:08', 1),
(2505, 196, 'SANTOH', '', 1, '2013-09-16 13:36:56', 1, '2013-09-16 13:36:56', 1),
(2506, 197, 'FRIQUIYA', '', 1, '2013-09-16 13:39:07', 1, '2013-09-16 13:39:38', 1),
(2507, 197, 'HEREMAKONO-FOULBE', '', 1, '2013-09-16 13:40:29', 1, '2013-09-16 13:40:29', 1),
(2508, 197, 'KASSA-BOUNNA', '', 1, '2013-09-16 13:41:22', 1, '2013-09-16 13:41:22', 1),
(2509, 197, 'LOLIN', '', 1, '2013-09-16 13:41:38', 1, '2013-09-16 13:41:38', 1),
(2510, 197, 'KALIA II', '', 1, '2013-09-16 13:42:24', 1, '2013-09-16 13:42:24', 1),
(2511, 197, 'TAGANYA', '', 1, '2013-09-16 13:44:04', 1, '2013-09-16 13:44:04', 1),
(2512, 197, 'MARELLA II', '', 1, '2013-09-16 13:45:07', 1, '2013-09-16 13:45:07', 1),
(2513, 197, 'MISSIDE-BOLIA', '', 1, '2013-09-16 13:47:56', 1, '2013-09-16 13:47:56', 1),
(2514, 197, 'SOLONYEREYA', '', 1, '2013-09-16 13:52:23', 1, '2013-09-16 13:52:23', 1),
(2515, 198, 'NIALIA II', '', 1, '2013-09-16 13:54:06', 1, '2013-09-16 13:54:06', 1),
(2516, 198, 'GNONA', '', 1, '2013-09-16 13:55:25', 1, '2013-09-16 13:55:25', 1),
(2517, 198, 'LAYA DOULA', '', 1, '2013-09-16 13:56:26', 1, '2013-09-16 13:56:26', 1),
(2518, 199, 'BELEYA', '', 1, '2013-09-16 13:58:46', 1, '2013-09-16 13:58:46', 1),
(2519, 199, 'PASSAYAH MARCHE', '', 1, '2013-09-16 13:59:08', 1, '2013-09-16 13:59:08', 1),
(2520, 199, 'DANDA', '', 1, '2013-09-16 14:00:16', 1, '2013-09-16 14:00:16', 1),
(2521, 199, 'N\\\'GUENEYA', '', 1, '2013-09-16 14:00:33', 1, '2013-09-16 14:00:33', 1),
(2522, 199, 'KOLOWALIA', '', 1, '2013-09-16 14:00:51', 1, '2013-09-16 14:00:51', 1),
(2523, 199, 'KOUTAWALIA', '', 1, '2013-09-16 14:01:09', 1, '2013-09-16 14:01:09', 1),
(2524, 199, 'SOUNGBAYA', '', 1, '2013-09-16 14:01:29', 1, '2013-09-16 14:01:29', 1),
(2525, 200, 'SANDENIA-MARCHE', '', 1, '2013-09-16 14:09:08', 1, '2013-09-16 14:09:08', 1),
(2526, 200, 'BONTALA', '', 1, '2013-09-16 14:10:22', 1, '2013-09-16 14:10:22', 1),
(2527, 200, 'KOMBONYA', '', 1, '2013-09-16 14:10:36', 1, '2013-09-16 14:10:36', 1),
(2528, 200, 'KAMBAMBOUN', '', 1, '2013-09-16 14:11:02', 1, '2013-09-16 14:11:02', 1),
(2529, 180, 'MOREAH', '', 1, '2013-09-16 14:17:01', 1, '2013-09-16 14:17:01', 1),
(2530, 180, 'FARAWAYA', '', 1, '2013-09-16 14:17:23', 1, '2013-09-16 14:17:23', 1),
(2531, 180, 'YARSSADOU', '', 1, '2013-09-16 14:17:44', 1, '2013-09-16 14:17:44', 1),
(2532, 180, 'DAWA FARKO', '', 1, '2013-09-16 14:18:00', 1, '2013-09-16 14:18:00', 1),
(2533, 188, 'SILKOULDOU', '', 1, '2013-09-16 14:21:06', 1, '2013-09-16 14:21:06', 1),
(2534, 188, 'KONARDO', '', 1, '2013-09-16 14:22:52', 1, '2013-09-16 14:22:52', 1),
(2535, 188, 'DJIRDOU', '', 1, '2013-09-16 14:23:27', 1, '2013-09-16 14:23:27', 1),
(2536, 188, 'FANCELDOU', '', 1, '2013-09-16 14:24:17', 1, '2013-09-16 14:24:17', 1),
(2537, 188, 'BAMBAYELEMAN', '', 1, '2013-09-16 14:25:18', 1, '2013-09-16 14:25:18', 1),
(2538, 188, 'GNAMANA', '', 1, '2013-09-16 14:25:44', 1, '2013-09-16 14:25:44', 1),
(2539, 189, 'KAMERENDOU', '', 1, '2013-09-16 14:35:32', 1, '2013-09-16 14:35:32', 1),
(2540, 189, 'BOROKORO', '', 1, '2013-09-16 14:39:43', 1, '2013-09-16 14:39:43', 1),
(2541, 189, 'DEYAH', '', 1, '2013-09-16 14:41:20', 1, '2013-09-16 14:41:20', 1),
(2542, 189, 'SANDAYA', '', 1, '2013-09-16 14:42:33', 1, '2013-09-16 14:42:33', 1),
(2543, 189, 'DAGNORO', '', 1, '2013-09-16 14:43:26', 1, '2013-09-16 14:43:26', 1),
(2544, 189, 'YENDE I', '', 1, '2013-09-16 14:45:36', 1, '2013-09-16 14:45:36', 1),
(2545, 190, 'KOUMASSAN', '', 1, '2013-09-16 15:00:50', 1, '2013-09-16 15:00:50', 1),
(2546, 190, 'HEYAKO', '', 1, '2013-09-16 15:01:40', 1, '2013-09-16 15:01:40', 1),
(2547, 190, 'YENDE II', '', 1, '2013-09-16 15:02:01', 1, '2013-09-16 15:02:01', 1),
(2548, 190, 'BAGBE', '', 1, '2013-09-16 15:03:35', 1, '2013-09-16 15:03:35', 1),
(2549, 190, 'FIRADOU', '', 1, '2013-09-16 15:04:10', 1, '2013-09-16 15:05:37', 1),
(2550, 190, 'TOUFFOUDOU', '', 1, '2013-09-16 15:06:13', 1, '2013-09-16 15:06:13', 1),
(2551, 190, 'FAINDOU', '', 1, '2013-09-16 15:07:53', 1, '2013-09-16 15:07:53', 1),
(2552, 191, 'TRAKORE', '', 1, '2013-09-16 15:13:35', 1, '2013-09-16 15:13:35', 1),
(2553, 191, 'BONGARDOU', '', 1, '2013-09-16 15:17:14', 1, '2013-09-16 15:17:14', 1),
(2554, 191, 'BAMBAKORDOU', '', 1, '2013-09-16 15:17:34', 1, '2013-09-16 15:17:34', 1),
(2555, 191, 'KOINDOU', '', 1, '2013-09-16 15:17:51', 1, '2013-09-16 15:17:51', 1),
(2556, 181, 'KERO', '', 1, '2013-09-16 15:21:48', 1, '2013-09-16 15:22:41', 1),
(2557, 181, 'KOUMASSAN', '', 1, '2013-09-16 15:24:46', 1, '2013-09-16 15:24:46', 1),
(2558, 181, 'MASSAFENDOU', '', 1, '2013-09-16 15:25:05', 1, '2013-09-16 15:25:05', 1),
(2559, 181, 'TELEBODOU', '', 1, '2013-09-16 15:27:26', 1, '2013-09-16 15:27:26', 1),
(2560, 182, 'FONIADOU', '', 1, '2013-09-16 15:30:05', 1, '2013-09-16 15:30:05', 1),
(2561, 182, 'SOFFEDOU', '', 1, '2013-09-16 15:30:47', 1, '2013-09-16 15:30:47', 1),
(2562, 183, 'YOROMANDOU', '', 1, '2013-09-16 15:37:48', 1, '2013-09-16 15:37:48', 1),
(2563, 183, 'KAMAKOUNANDOU', '', 1, '2013-09-16 15:40:03', 1, '2013-09-16 15:42:20', 1),
(2564, 183, 'SANGALABADOU', '', 1, '2013-09-16 15:43:42', 1, '2013-09-16 15:43:42', 1),
(2565, 183, 'KOUNDOPOMBO', '', 1, '2013-09-16 15:44:19', 1, '2013-09-16 15:44:19', 1),
(2566, 183, 'KOLDOU', '', 1, '2013-09-16 15:44:42', 1, '2013-09-16 15:44:42', 1),
(2567, 183, 'KAORO', '', 1, '2013-09-16 15:45:19', 1, '2013-09-16 15:45:19', 1),
(2568, 183, 'LELA', '', 1, '2013-09-16 15:45:37', 1, '2013-09-16 15:45:37', 1),
(2569, 183, 'GNAMANDOU', '', 1, '2013-09-16 15:45:53', 1, '2013-09-16 15:45:53', 1),
(2570, 179, 'MADINA II', '', 1, '2013-09-16 15:49:20', 1, '2013-09-16 15:49:20', 1),
(2571, 179, 'ERNESTO', '', 1, '2013-09-16 15:51:45', 1, '2013-09-16 15:51:45', 1),
(2572, 179, 'KORODOU II', '', 1, '2013-09-16 15:53:02', 1, '2013-09-16 15:53:02', 1),
(2573, 179, 'KEREDOU', '', 1, '2013-09-16 15:56:49', 1, '2013-09-16 15:56:49', 1),
(2574, 179, 'T.P', '', 1, '2013-09-16 15:58:18', 1, '2013-09-16 15:58:18', 1),
(2575, 179, 'SOGBE II', '', 1, '2013-09-16 16:00:01', 1, '2013-09-16 16:00:01', 1),
(2576, 179, 'SOGBE III', '', 1, '2013-09-16 16:00:13', 1, '2013-09-16 16:00:13', 1),
(2577, 295, 'KOBE', '', 1, '2013-09-16 16:00:53', 1, '2013-09-16 16:00:53', 1),
(2578, 179, 'YASSAFEKOURA', '', 1, '2013-09-16 16:01:43', 1, '2013-09-16 16:01:43', 1),
(2579, 179, 'YASSAFEKORO', '', 1, '2013-09-16 16:03:30', 1, '2013-09-16 16:03:30', 1),
(2580, 295, 'KEWOYE', '', 1, '2013-09-16 16:03:57', 1, '2013-09-16 16:03:57', 1),
(2581, 295, 'BEMBOU SILATY', '', 1, '2013-09-16 16:07:29', 1, '2013-09-16 16:07:29', 1),
(2582, 295, 'LAMBA', '', 1, '2013-09-16 16:09:55', 1, '2013-09-16 16:09:55', 1),
(2583, 295, 'DARAKOURA', '', 1, '2013-09-16 16:10:21', 1, '2013-09-16 16:10:21', 1),
(2584, 295, 'BHOUNDOU EDDA', '', 1, '2013-09-16 16:10:40', 1, '2013-09-17 16:22:43', 1),
(2585, 179, 'MARAH', '', 1, '2013-09-16 16:11:04', 1, '2013-09-16 16:11:04', 1),
(2586, 295, 'DIANDIAN', '', 1, '2013-09-16 16:11:05', 1, '2013-09-16 16:11:05', 1),
(2587, 295, 'DJOUGOUROU', '', 1, '2013-09-16 16:12:31', 1, '2013-09-16 16:12:31', 1),
(2588, 295, 'KOUNDA', '', 1, '2013-09-16 16:12:58', 1, '2013-09-16 16:12:58', 1),
(2590, 179, 'M\\\'BALIA', '', 1, '2013-09-16 16:16:02', 1, '2013-09-16 16:16:02', 1),
(2591, 179, 'MISSIRA', '', 1, '2013-09-16 16:16:43', 1, '2013-09-16 16:16:43', 1),
(2593, 295, 'MASSI', '', 1, '2013-09-16 16:22:26', 1, '2013-09-16 16:22:26', 1),
(2594, 296, 'KAFFIMA', '', 1, '2013-09-16 16:33:02', 1, '2013-09-16 16:33:02', 1),
(2595, 296, 'K&Acirc;ABA', '', 1, '2013-09-16 16:33:25', 1, '2013-09-16 16:33:25', 1),
(2596, 296, 'N\\\'GOUMA', '', 1, '2013-09-16 16:33:42', 1, '2013-09-16 16:33:42', 1),
(2597, 296, 'MISSIDE KEBOU', '', 1, '2013-09-16 16:34:04', 1, '2013-09-16 16:34:04', 1),
(2598, 296, 'N\\\'DANTARI BAKOLO', '', 1, '2013-09-16 16:35:21', 1, '2013-09-16 16:35:21', 1),
(2599, 297, 'TELIRE', '', 1, '2013-09-16 16:37:45', 1, '2013-09-16 16:37:45', 1),
(2600, 297, 'MAMOUDA', '', 1, '2013-09-16 16:38:05', 1, '2013-09-16 16:38:05', 1),
(2601, 297, 'SAAPY', '', 1, '2013-09-16 16:38:34', 1, '2013-09-16 16:38:34', 1),
(2602, 184, 'KONGOLA LOUNDY', '', 1, '2013-09-16 16:39:09', 1, '2013-09-16 16:39:09', 1),
(2603, 184, 'SALDOU', '', 1, '2013-09-16 16:39:23', 1, '2013-09-16 16:39:23', 1),
(2604, 184, 'OUENDE BEINDOU', '', 1, '2013-09-16 16:39:38', 1, '2013-09-16 16:39:38', 1),
(2605, 184, 'YARADOU', '', 1, '2013-09-16 16:39:58', 1, '2013-09-16 16:39:58', 1),
(2606, 298, 'WAARA', '', 1, '2013-09-16 16:40:18', 1, '2013-09-16 16:40:18', 1),
(2607, 298, 'BOUMA', '', 1, '2013-09-16 16:40:45', 1, '2013-09-16 16:40:45', 13),
(2608, 298, 'MAMBYA', '', 1, '2013-09-16 16:42:13', 1, '2013-09-16 16:42:13', 1),
(2609, 185, 'DONDIAN', '', 1, '2013-09-16 16:42:30', 1, '2013-09-16 16:42:30', 1),
(2610, 185, 'FONDAMBADOU', '', 1, '2013-09-16 16:42:49', 1, '2013-09-16 16:42:49', 1),
(2611, 185, 'SANDIA', '', 1, '2013-09-16 16:43:08', 1, '2013-09-16 16:43:08', 1),
(2612, 298, 'KOUKOUKOURE', '', 1, '2013-09-16 16:43:11', 1, '2013-09-16 16:43:11', 1),
(2613, 185, 'DOMBADOU', '', 1, '2013-09-16 16:43:40', 1, '2013-09-16 16:43:40', 1),
(2614, 298, 'KOURIA', '', 1, '2013-09-16 16:43:48', 1, '2013-09-16 16:43:48', 1),
(2615, 185, 'BELEDOU - KAMADOU', '', 1, '2013-09-16 16:44:10', 1, '2013-09-16 16:44:10', 1),
(2616, 298, 'SILIKOUN', '', 1, '2013-09-16 16:44:22', 1, '2013-09-16 16:44:22', 1),
(2617, 298, 'GARAMA', '', 1, '2013-09-16 16:45:20', 1, '2013-09-16 16:45:20', 1),
(2618, 186, 'KISSI YALLANKORO', '', 1, '2013-09-16 16:47:27', 1, '2013-09-16 16:47:27', 1),
(2619, 298, 'BAMBOUGOU', '', 1, '2013-09-16 16:47:31', 1, '2013-09-16 16:47:31', 1),
(2620, 186, 'NIANDOU', '', 1, '2013-09-16 16:47:45', 1, '2013-09-16 16:47:45', 1),
(2621, 298, 'SYMBALIA', '', 1, '2013-09-16 16:47:55', 1, '2013-09-16 16:47:55', 1),
(2622, 186, 'DAWA', '', 1, '2013-09-16 16:47:58', 1, '2013-09-16 16:47:58', 1),
(2623, 186, 'FOURDOU KOURA', '', 1, '2013-09-16 16:48:18', 1, '2013-09-16 16:48:18', 1),
(2624, 186, 'YALLAKALAN', '', 1, '2013-09-16 16:48:32', 1, '2013-09-16 16:48:32', 1),
(2625, 299, 'NAMPOUGOU', '', 1, '2013-09-16 16:50:05', 1, '2013-09-16 16:50:05', 1),
(2626, 299, 'DOMBE', '', 1, '2013-09-16 16:50:25', 1, '2013-09-16 16:50:25', 1),
(2627, 299, 'TOUMA', '', 1, '2013-09-16 16:50:55', 1, '2013-09-16 16:50:55', 1),
(2628, 299, 'THIMMEWI', '', 1, '2013-09-16 16:54:09', 1, '2013-09-16 16:54:09', 1),
(2629, 299, 'HOUNSIREGUILE', '', 1, '2013-09-16 16:55:41', 1, '2013-09-16 16:55:41', 1),
(2630, 187, 'BEMBERE', '', 1, '2013-09-16 16:56:20', 1, '2013-09-16 16:56:20', 1),
(2631, 187, 'MAKOLON', '', 1, '2013-09-16 16:58:15', 1, '2013-09-16 16:58:15', 1),
(2632, 187, 'MAFENDOU', '', 1, '2013-09-16 16:58:30', 1, '2013-09-16 16:58:30', 1),
(2633, 187, 'TENKIA', '', 1, '2013-09-16 16:58:48', 1, '2013-09-16 16:58:48', 1),
(2634, 187, 'KOSSA', '', 1, '2013-09-16 16:59:13', 1, '2013-09-16 16:59:13', 1),
(2635, 187, 'YENDE-SORY', '', 1, '2013-09-16 16:59:42', 1, '2013-09-16 16:59:42', 1),
(2636, 187, 'SOLONTOH', '', 1, '2013-09-16 17:00:07', 1, '2013-09-16 17:00:07', 1),
(2637, 300, 'DAROUL', '', 1, '2013-09-16 17:01:55', 1, '2013-09-16 17:01:55', 1),
(2638, 300, 'M\\\'BOROU', '', 1, '2013-09-16 17:04:37', 1, '2013-09-16 17:04:37', 1),
(2639, 121, 'GBONKO - CENTRE', '', 1, '2013-09-16 17:06:12', 1, '2013-09-16 17:06:12', 1),
(2640, 121, 'KAGAN - CENTRE', '', 1, '2013-09-16 17:06:57', 1, '2013-09-16 17:06:57', 1),
(2641, 300, 'BOUSSOURA', '', 1, '2013-09-16 17:07:06', 1, '2013-09-16 17:07:06', 1),
(2642, 121, 'SANFINA - CENTRE', '', 1, '2013-09-16 17:07:22', 1, '2013-09-16 17:07:22', 1),
(2643, 121, 'LOBA - CENTRE', '', 1, '2013-09-16 17:07:42', 1, '2013-09-16 17:07:42', 1),
(2644, 300, 'DONDE LOPOYE', '', 1, '2013-09-16 17:08:43', 1, '2013-09-16 17:08:43', 1),
(2645, 129, 'MORIBAYA CENTRE II', '', 1, '2013-09-16 17:09:57', 1, '2013-09-16 17:09:57', 1),
(2646, 300, 'MADINA FASS', '', 1, '2013-09-16 17:10:17', 1, '2013-09-16 17:10:17', 1),
(2647, 129, 'MANFRAN', '', 1, '2013-09-16 17:10:56', 1, '2013-09-16 17:10:56', 1),
(2648, 301, 'PARADJI', '', 1, '2013-09-16 17:20:12', 1, '2013-09-16 17:20:12', 1),
(2649, 130, 'DJOUGNA', '', 1, '2013-09-16 17:22:33', 1, '2013-09-16 17:22:33', 1),
(2650, 130, 'KOMAH', '', 1, '2013-09-16 17:23:02', 1, '2013-09-16 17:23:02', 1),
(2651, 130, 'KALANKALAN', '', 1, '2013-09-16 17:23:24', 1, '2013-09-16 17:23:24', 1),
(2652, 130, 'BRONBALLA', '', 1, '2013-09-16 17:23:49', 1, '2013-09-16 17:23:49', 1),
(2653, 130, 'KONSAN', '', 1, '2013-09-16 17:24:20', 1, '2013-09-16 17:24:20', 1),
(2654, 302, 'FILO', '', 1, '2013-09-16 17:24:28', 1, '2013-09-16 17:24:28', 1),
(2655, 130, 'KOMOUKOH', '', 1, '2013-09-16 17:24:41', 1, '2013-09-16 17:24:41', 1),
(2656, 302, 'HOLLANDE DIAN', '', 1, '2013-09-16 17:25:12', 1, '2013-09-16 17:25:12', 1),
(2657, 303, 'HASSANA', '', 1, '2013-09-16 17:26:33', 1, '2013-09-16 17:26:33', 1),
(2658, 131, 'SANAH', '', 1, '2013-09-16 17:26:54', 1, '2013-09-16 17:26:54', 1),
(2659, 131, 'DJINDO', '', 1, '2013-09-16 17:27:18', 1, '2013-09-16 17:27:18', 1),
(2660, 131, 'BISSANDOU', '', 1, '2013-09-16 17:27:54', 1, '2013-09-16 17:27:54', 1),
(2661, 303, 'TONDON', '', 1, '2013-09-16 17:28:14', 1, '2013-09-16 17:28:14', 1),
(2662, 303, 'TOULDE', '', 1, '2013-09-16 17:28:49', 1, '2013-09-16 17:28:49', 1),
(2663, 131, 'GBANANKOURA', '', 1, '2013-09-16 17:28:53', 1, '2013-09-16 17:28:53', 1),
(2664, 131, 'BORIFIGNA', '', 1, '2013-09-16 17:29:35', 1, '2013-09-16 17:29:35', 1),
(2665, 303, 'BOUDAYE', '', 1, '2013-09-16 17:32:09', 1, '2013-09-16 17:32:09', 1),
(2666, 303, 'KAMBANYA', '', 1, '2013-09-16 17:32:34', 1, '2013-09-16 17:32:34', 1),
(2667, 303, 'SANSANDJI', '', 1, '2013-09-16 17:33:02', 1, '2013-09-16 17:33:02', 1),
(2669, 132, 'GBALAKO', '', 1, '2013-09-16 17:34:00', 1, '2013-09-16 17:41:14', 1),
(2670, 132, 'FANTOGNA', '', 1, '2013-09-16 17:37:27', 1, '2013-09-16 17:42:14', 1),
(2671, 132, 'KOUWAN NAFADJI', '', 1, '2013-09-16 17:38:35', 1, '2013-09-16 17:42:57', 1),
(2672, 132, 'SANSAMBAYA', '', 1, '2013-09-16 17:39:08', 1, '2013-09-16 17:43:13', 1),
(2673, 132, 'TOKOUNOU I', '', 1, '2013-09-16 17:39:31', 1, '2013-09-16 17:43:54', 1),
(2674, 132, 'TOKOUNOU II', '', 1, '2013-09-16 17:40:01', 1, '2013-09-16 17:44:03', 1),
(2675, 303, 'BIRO', '', 1, '2013-09-16 17:41:28', 1, '2013-09-16 17:41:28', 1),
(2676, 132, 'DELDOU', '', 1, '2013-09-16 17:44:47', 1, '2013-09-16 17:44:47', 1),
(2678, 132, 'TOUNMANIA', '', 1, '2013-09-16 17:45:48', 1, '2013-09-16 17:45:48', 1),
(2679, 304, 'BARALANDE', '', 1, '2013-09-17 10:24:17', 1, '2013-09-17 10:24:17', 1),
(2680, 304, 'SOUGUE', '', 1, '2013-09-17 10:25:26', 1, '2013-09-17 10:25:26', 1),
(2681, 305, 'HORE WENDOU', '', 1, '2013-09-17 10:30:00', 1, '2013-09-17 10:30:00', 1),
(2682, 305, 'BOUSSOURA', '', 1, '2013-09-17 10:30:21', 1, '2013-09-17 10:30:21', 1),
(2683, 305, 'LEY-BALLA', '', 1, '2013-09-17 10:30:43', 1, '2013-09-17 10:30:43', 1),
(2684, 305, 'KOURABONGUEL', '', 1, '2013-09-17 10:31:11', 1, '2013-09-17 10:31:11', 1),
(2685, 305, 'SONGHE', '', 1, '2013-09-17 10:31:45', 1, '2013-09-17 10:31:45', 1),
(2686, 315, 'PARAWI', '', 1, '2013-09-17 10:32:33', 1, '2013-09-17 10:32:33', 1),
(2687, 315, 'DJIGUIWEL', '', 1, '2013-09-17 10:34:18', 1, '2013-09-17 10:34:18', 1),
(2688, 306, 'THIONTHIAN CENTRE', '', 1, '2013-09-17 10:35:23', 1, '2013-09-17 10:35:23', 1),
(2689, 306, 'TOUNOU', '', 1, '2013-09-17 10:35:49', 1, '2013-09-17 10:35:49', 1),
(2690, 315, 'LELATO', '', 1, '2013-09-17 10:36:23', 1, '2013-09-17 10:36:23', 1),
(2691, 306, 'MADINADJAN', '', 1, '2013-09-17 10:36:25', 1, '2013-09-22 14:47:03', 1),
(2692, 306, 'LEY-BIRO', '', 1, '2013-09-17 10:36:46', 1, '2013-09-17 10:36:46', 1),
(2693, 306, 'HAMDALAYE', '', 1, '2013-09-17 10:37:06', 1, '2013-09-17 10:37:06', 1),
(2694, 306, 'MISSIDE', '', 1, '2013-09-17 10:37:27', 1, '2013-09-17 10:37:27', 1),
(2696, 315, 'YALAGUE', '', 1, '2013-09-17 10:38:18', 1, '2013-09-17 10:38:18', 1),
(2698, 308, 'MANTA', '', 1, '2013-09-17 10:43:43', 1, '2013-09-17 10:43:43', 1),
(2699, 308, 'MARANDA', '', 1, '2013-09-17 10:44:18', 1, '2013-09-17 10:44:18', 1),
(2700, 293, 'SODIO', '', 1, '2013-09-17 10:45:34', 1, '2013-09-17 10:45:34', 1),
(2701, 293, 'GOMBOYA', '', 1, '2013-09-17 10:46:20', 1, '2013-09-17 10:46:20', 1),
(2702, 125, 'ALIAMOUNOU - KANDRAL', '', 1, '2013-09-17 10:46:52', 1, '2013-09-17 10:46:52', 1),
(2703, 316, 'KIGNA', '', 1, '2013-09-17 10:46:54', 1, '2013-09-17 10:46:54', 1),
(2704, 316, 'FOGO', '', 1, '2013-09-17 10:47:54', 1, '2013-09-17 10:47:54', 1),
(2705, 293, 'SO&Iuml;NDE', '', 1, '2013-09-17 10:47:57', 1, '2013-09-17 10:47:57', 1),
(2706, 125, 'DJIRLAN', '', 1, '2013-09-17 10:48:35', 1, '2013-09-17 10:48:35', 1),
(2707, 293, 'KOLLY', '', 1, '2013-09-17 10:48:43', 1, '2013-09-17 10:49:09', 1),
(2708, 316, 'DOUNKI', '', 1, '2013-09-17 10:48:56', 1, '2013-09-17 10:48:56', 1),
(2709, 125, 'FOUSSEN', '', 1, '2013-09-17 10:48:59', 1, '2013-09-17 10:48:59', 1),
(2710, 125, 'KOBA - SANDO', '', 1, '2013-09-17 10:49:22', 1, '2013-09-17 10:49:22', 1),
(2711, 316, 'DOUGAYA', '', 1, '2013-09-17 10:49:34', 1, '2013-09-17 10:49:34', 1),
(2712, 293, 'MEGNERE', '', 1, '2013-09-17 10:49:43', 1, '2013-09-17 10:49:43', 1),
(2713, 125, 'M\\\'BODOU', '', 1, '2013-09-17 10:49:57', 1, '2013-09-17 10:49:57', 1),
(2714, 305, 'BAGUIRE', '', 1, '2013-09-17 10:50:00', 1, '2013-09-17 10:50:00', 1),
(2715, 125, 'MOIKO', '', 1, '2013-09-17 10:50:23', 1, '2013-09-17 10:50:23', 1),
(2716, 316, 'HAFIA', '', 1, '2013-09-17 10:50:27', 1, '2013-09-17 10:50:27', 1),
(2717, 126, 'KOUMBAN II', '', 1, '2013-09-17 10:53:09', 1, '2013-09-17 10:53:09', 1),
(2718, 126, 'LANI - NINKI', '', 1, '2013-09-17 10:53:40', 1, '2013-09-17 10:53:40', 1),
(2719, 127, 'MAMOUROUDOU', '', 1, '2013-09-17 10:55:33', 1, '2013-09-17 10:56:46', 1),
(2720, 127, 'FANKONO', '', 1, '2013-09-17 10:55:56', 1, '2013-09-17 10:55:56', 1),
(2721, 307, 'KOLLANGUEL', '', 1, '2013-09-17 10:56:26', 1, '2013-09-17 10:56:26', 1),
(2722, 127, 'FARABANA', '', 1, '2013-09-17 10:57:12', 1, '2013-09-17 10:57:12', 1),
(2723, 127, 'BALLAKOYA', '', 1, '2013-09-17 10:57:33', 1, '2013-09-17 10:57:33', 1),
(2724, 128, 'SONTILA', '', 1, '2013-09-17 10:58:53', 1, '2013-09-17 10:58:53', 1),
(2725, 128, 'NOUMISSAYA', '', 1, '2013-09-17 10:59:13', 1, '2013-09-17 10:59:13', 1),
(2726, 128, 'KIGNEBA', '', 1, '2013-09-17 10:59:33', 1, '2013-09-17 10:59:33', 1),
(2727, 128, 'DOUMAWALIYA', '', 1, '2013-09-17 11:00:03', 1, '2013-09-17 11:00:03', 1),
(2728, 309, 'FOUGOUMBA', '', 1, '2013-09-17 11:03:15', 1, '2013-09-17 11:03:15', 1),
(2729, 309, 'BOTOBOFEL', '', 1, '2013-09-17 11:04:03', 1, '2013-09-17 11:04:03', 1),
(2730, 277, 'GBEGNEN', '', 1, '2013-09-17 11:04:22', 1, '2013-09-17 11:04:22', 1),
(2732, 310, 'HERICO', '', 1, '2013-09-17 11:06:06', 1, '2013-09-17 11:06:06', 1),
(2733, 310, 'PELLAL', '', 1, '2013-09-17 11:06:47', 1, '2013-09-17 11:06:47', 1),
(2734, 277, 'SAKHOURE', '', 1, '2013-09-17 11:06:58', 1, '2013-09-17 11:06:58', 1),
(2735, 310, 'KOLLAKOYE', '', 1, '2013-09-17 11:07:35', 1, '2013-09-17 11:07:35', 1),
(2736, 277, 'MADINA SAGALE', '', 1, '2013-09-17 11:07:58', 1, '2013-09-17 11:07:58', 1),
(2737, 277, 'KOUNSITA', '', 1, '2013-09-17 11:08:21', 1, '2013-09-17 11:08:21', 1),
(2738, 159, 'WOROKORO', '', 1, '2013-09-17 11:08:49', 1, '2013-09-17 11:08:49', 1),
(2739, 277, 'TOUGUIKHOURE', '', 1, '2013-09-17 11:09:00', 1, '2013-09-17 11:09:00', 1),
(2740, 311, 'N\\\'DANTABA', '', 1, '2013-09-17 11:09:28', 1, '2013-09-17 11:09:28', 1),
(2741, 159, 'BANANKORO II', '', 1, '2013-09-17 11:09:29', 1, '2013-09-17 11:09:29', 1),
(2742, 159, 'COMMANDANYA', '', 1, '2013-09-17 11:10:00', 1, '2013-09-17 11:10:00', 1),
(2743, 311, 'KOUFFA', '', 1, '2013-09-17 11:10:03', 1, '2013-09-17 11:10:03', 1),
(2744, 159, 'FALANDO', '', 1, '2013-09-17 11:10:23', 1, '2013-09-17 11:10:23', 1),
(2745, 159, 'KALAMANDO - MASANDO', '', 1, '2013-09-17 11:10:52', 1, '2013-09-17 11:10:52', 1),
(2746, 311, 'DIAWLEKO', '', 1, '2013-09-17 11:11:09', 1, '2013-09-17 11:11:09', 1),
(2747, 311, 'DONGHOL', '', 1, '2013-09-17 11:11:39', 1, '2013-09-17 11:11:39', 1),
(2748, 276, 'SAMATRAN PLATEAU', '', 1, '2013-09-17 11:12:57', 1, '2013-09-17 11:18:49', 1),
(2749, 312, 'DIOURIAH', '', 1, '2013-09-17 11:13:12', 1, '2013-09-17 11:13:12', 1),
(2750, 312, 'HERICO', '', 1, '2013-09-17 11:13:47', 1, '2013-09-17 11:13:47', 1),
(2751, 276, 'TOUMANIAH', '', 1, '2013-09-17 11:13:57', 1, '2013-09-17 11:13:57', 1),
(2752, 276, 'KAGBELEN VILLAGE', '', 1, '2013-09-17 11:14:21', 1, '2013-09-17 11:14:21', 1),
(2753, 276, 'ANSOUMANIYAH PLATEAU', '', 1, '2013-09-17 11:14:40', 1, '2013-09-17 11:14:40', 1),
(2754, 312, 'BOUSSOURA', '', 1, '2013-09-17 11:14:41', 1, '2013-09-17 11:14:41', 1),
(2755, 159, 'DAMANGBEDOU', '', 1, '2013-09-17 11:14:50', 1, '2013-09-17 11:14:50', 1),
(2756, 276, 'TOBOLON', '', 1, '2013-09-17 11:15:02', 1, '2013-09-17 11:15:02', 1),
(2757, 158, 'MATENENMORIDOU', '', 1, '2013-09-17 11:16:11', 1, '2013-09-27 17:56:33', 1),
(2758, 276, 'KOLOGNET N\\\'SIRA', '', 1, '2013-09-17 11:16:58', 1, '2013-09-17 11:16:58', 1),
(2759, 276, 'ANSOUMANIYAH VILLAGE', '', 1, '2013-09-17 11:18:01', 1, '2013-09-17 11:18:01', 1),
(2760, 158, 'KOUNDJAN', '', 1, '2013-09-17 11:18:55', 1, '2013-09-17 11:23:00', 1),
(2761, 313, 'HAFIA KOKOU', '', 1, '2013-09-17 11:20:04', 1, '2013-09-17 11:20:04', 1),
(2762, 276, 'KAGBELEN PLATEAU', '', 1, '2013-09-17 11:21:12', 1, '2013-09-17 11:21:12', 1),
(2763, 276, 'KEITAYA', '', 1, '2013-09-17 11:21:32', 1, '2013-09-17 11:21:32', 1),
(2764, 276, 'KENENDE', '', 1, '2013-09-17 11:21:49', 1, '2013-09-17 11:21:49', 1),
(2765, 313, 'HOLLANDE', '', 1, '2013-09-17 11:22:08', 1, '2013-09-17 11:22:08', 1),
(2766, 276, 'SIMBAYA', '', 1, '2013-09-17 11:22:09', 1, '2013-09-17 11:22:09', 1),
(2767, 276, 'TERSE', '', 1, '2013-09-17 11:22:28', 1, '2013-09-17 11:22:28', 1),
(2768, 276, 'BONDABON', '', 1, '2013-09-17 11:22:48', 1, '2013-09-17 11:22:48', 1),
(2769, 313, 'HAFIA', '', 1, '2013-09-17 11:22:56', 1, '2013-09-17 11:22:56', 1),
(2770, 276, 'MAFOUDIA', '', 1, '2013-09-17 11:23:20', 1, '2013-09-17 11:23:20', 1),
(2771, 313, 'KAKORY', '', 1, '2013-09-17 11:23:33', 1, '2013-09-17 11:23:33', 1),
(2772, 276, 'BAILOBAYAH PLATEAU', '', 1, '2013-09-17 11:23:36', 1, '2013-09-17 11:23:36', 1),
(2773, 276, 'YOROKOGUEYAH', '', 1, '2013-09-17 11:23:58', 1, '2013-09-17 11:23:58', 1),
(2774, 313, 'LOOPE', '', 1, '2013-09-17 11:24:17', 1, '2013-09-17 11:24:17', 1),
(2775, 160, 'DAMARO', '', 1, '2013-09-17 11:24:31', 1, '2013-09-17 11:24:31', 1),
(2776, 313, 'TYIEOUNGOL', '', 1, '2013-09-17 11:24:53', 1, '2013-09-17 11:24:53', 1),
(2777, 160, 'DIARAGBRELA', '', 1, '2013-09-17 11:25:04', 1, '2013-09-17 11:25:04', 1),
(2778, 160, 'FOUNDOU', '', 1, '2013-09-17 11:25:44', 1, '2013-09-17 11:25:44', 1),
(2779, 160, 'KOUROUDOU', '', 1, '2013-09-17 11:26:04', 1, '2013-09-17 11:26:04', 1),
(2780, 160, 'MANDOU', '', 1, '2013-09-17 11:26:29', 1, '2013-09-17 11:26:29', 1),
(2781, 313, 'FELLO MALANGA', '', 1, '2013-09-17 11:26:33', 1, '2013-09-17 11:26:33', 1),
(2782, 160, 'MONODALA', '', 1, '2013-09-17 11:26:57', 1, '2013-09-17 11:26:57', 1),
(2783, 161, 'GNALEMORIDOU', '', 1, '2013-09-17 11:29:11', 1, '2013-09-17 11:29:11', 1),
(2784, 161, 'KOMODOU', '', 1, '2013-09-17 11:31:12', 1, '2013-09-17 11:31:12', 1),
(2785, 161, 'GBODOU', '', 1, '2013-09-17 11:31:37', 1, '2013-09-17 11:31:37', 1),
(2786, 161, 'KANFRANDOU', '', 1, '2013-09-17 11:31:52', 1, '2013-09-17 11:31:52', 1),
(2787, 161, 'DIASSAKOUNA', '', 1, '2013-09-17 11:32:09', 1, '2013-09-17 11:32:09', 1),
(2788, 161, 'FRANDOU', '', 1, '2013-09-17 11:32:25', 1, '2013-09-17 11:32:25', 1),
(2789, 161, 'FRANFINA', '', 1, '2013-09-17 11:32:43', 1, '2013-09-17 11:32:43', 1),
(2790, 161, 'SANANKORONI', '', 1, '2013-09-17 11:32:58', 1, '2013-09-17 11:32:58', 1),
(2791, 278, 'FALESSADE CENTRE II', '', 1, '2013-09-17 11:34:23', 1, '2013-09-17 11:34:23', 1),
(2792, 278, 'WALIA', '', 1, '2013-09-17 11:34:54', 1, '2013-09-17 11:34:54', 1),
(2793, 278, 'YALAYA', '', 1, '2013-09-17 11:35:12', 1, '2013-09-17 11:35:12', 1),
(2794, 278, 'BADY FARENYAH', '', 1, '2013-09-17 11:35:29', 1, '2013-09-17 11:35:29', 1),
(2795, 278, 'KAMBALIA', '', 1, '2013-09-17 11:35:46', 1, '2013-09-17 11:35:46', 1),
(2796, 163, 'BOOKO', '', 1, '2013-09-17 11:37:12', 1, '2013-09-17 11:37:12', 1),
(2797, 163, 'DIARRAGBERELA', '', 1, '2013-09-17 11:37:29', 1, '2013-09-17 11:37:29', 1),
(2798, 163, 'KOGNENY', '', 1, '2013-09-17 11:37:46', 1, '2013-09-17 11:37:46', 1),
(2799, 279, 'GBINSINKE', '', 1, '2013-09-17 11:37:52', 1, '2013-09-17 11:37:52', 1),
(2800, 163, 'BOIDOU', '', 1, '2013-09-17 11:37:59', 1, '2013-09-17 11:37:59', 1),
(2801, 163, 'KOUROUKO', '', 1, '2013-09-17 11:38:19', 1, '2013-09-17 11:38:19', 1),
(2802, 279, 'KONDEYIRE', '', 1, '2013-09-17 11:39:35', 1, '2013-09-17 11:39:35', 1),
(2803, 324, 'BANEKOTO', '', 1, '2013-09-17 11:42:36', 1, '2013-09-17 11:42:36', 1),
(2804, 280, 'KHOUNTOUN', '', 1, '2013-09-17 11:42:48', 1, '2013-09-17 11:42:48', 1),
(2805, 324, 'BANTAMAYA', '', 1, '2013-09-17 11:43:30', 1, '2013-09-17 11:43:30', 1),
(2806, 280, 'TAFORY SOSSO', '', 1, '2013-09-17 11:43:51', 1, '2013-09-17 11:43:51', 1),
(2807, 280, 'DIKIA', '', 1, '2013-09-17 11:44:09', 1, '2013-09-17 11:44:09', 1),
(2808, 324, 'ALPHAYA', '', 1, '2013-09-17 11:44:20', 1, '2013-09-17 11:44:20', 1),
(2809, 280, 'GBEREIRE', '', 1, '2013-09-17 11:44:29', 1, '2013-09-17 11:44:29', 1),
(2810, 280, 'GUEMETEDE', '', 1, '2013-09-17 11:44:51', 1, '2013-09-17 11:44:51', 1),
(2811, 164, 'BOURO', '', 1, '2013-09-17 11:45:59', 1, '2013-09-17 11:45:59', 1),
(2812, 164, 'FEREDOU', '', 1, '2013-09-17 11:46:24', 1, '2013-09-17 11:46:24', 1),
(2813, 280, 'SARAYAH', '', 1, '2013-09-17 11:46:49', 1, '2013-09-17 11:46:49', 1),
(2814, 323, 'NIAGARA', '', 1, '2013-09-17 11:47:23', 1, '2013-09-17 11:47:23', 1),
(2815, 165, 'DAMBAYA', '', 1, '2013-09-17 11:47:38', 1, '2013-09-17 11:47:38', 1),
(2816, 165, 'DOUBAYA', '', 1, '2013-09-17 11:48:19', 1, '2013-09-17 11:48:19', 1),
(2817, 165, 'GBENDEWAYA', '', 1, '2013-09-17 11:49:08', 1, '2013-09-17 11:49:08', 1),
(2818, 281, 'TANENE I', '', 1, '2013-09-17 11:49:28', 1, '2013-09-17 11:49:28', 1),
(2819, 281, 'BENNA', '', 1, '2013-09-17 11:49:44', 1, '2013-09-17 11:49:44', 1),
(2820, 165, 'BRINDO', '', 1, '2013-09-17 11:50:18', 1, '2013-09-17 11:50:18', 1),
(2821, 165, 'BALADOU', '', 1, '2013-09-17 11:50:32', 1, '2013-09-17 11:50:32', 1),
(2822, 281, 'TANENE II', '', 1, '2013-09-17 11:50:44', 1, '2013-09-17 11:50:44', 1),
(2823, 322, 'BILIMA MISSIDE', '', 1, '2013-09-17 11:51:57', 1, '2013-09-17 11:51:57', 1),
(2824, 281, 'MADINA', '', 1, '2013-09-17 11:52:02', 1, '2013-09-17 11:52:02', 1),
(2825, 168, 'SANGBARALA', '', 1, '2013-09-17 11:52:04', 1, '2013-09-17 11:52:04', 1),
(2826, 281, 'DIXINN', '', 1, '2013-09-17 11:52:20', 1, '2013-09-17 11:52:20', 1),
(2827, 322, 'BILIMA KANTE', '', 1, '2013-09-17 11:52:27', 1, '2013-09-17 11:52:27', 1),
(2828, 322, 'H&Ouml;&Ouml;L&Ouml;', '', 1, '2013-09-17 11:53:06', 1, '2013-09-17 11:53:06', 1),
(2829, 322, 'TAMBABETE', '', 1, '2013-09-17 11:53:53', 1, '2013-09-17 11:53:53', 1),
(2830, 322, 'FOYE', '', 1, '2013-09-17 11:54:20', 1, '2013-09-17 11:54:20', 1),
(2831, 176, 'NONO DJENIA', '', 1, '2013-09-17 11:55:03', 1, '2013-09-17 11:55:03', 1),
(2832, 321, 'BANIRE HAFIA', '', 1, '2013-09-17 11:56:03', 1, '2013-09-17 11:56:03', 1),
(2833, 177, 'KOUMANA I', '', 1, '2013-09-17 11:56:37', 1, '2013-09-17 11:56:37', 1),
(2834, 177, 'KOUMANA II', '', 1, '2013-09-17 11:57:02', 1, '2013-09-17 11:59:24', 1),
(2835, 177, 'BOFILANI', '', 1, '2013-09-17 11:57:39', 1, '2013-09-17 11:59:29', 1),
(2837, 319, 'FATOUYA', '', 1, '2013-09-17 12:00:45', 1, '2013-09-17 12:00:45', 1),
(2838, 319, 'HINDE', '', 1, '2013-09-17 12:01:34', 1, '2013-09-17 12:01:34', 1),
(2839, 319, 'SOBEYA', '', 1, '2013-09-17 12:02:23', 1, '2013-09-17 12:02:23', 1),
(2840, 178, 'SANGUIANA II', '', 1, '2013-09-17 12:02:38', 1, '2013-09-17 12:02:38', 1),
(2841, 178, 'KOMOYA', '', 1, '2013-09-17 12:03:20', 1, '2013-09-17 12:03:20', 1),
(2842, 178, 'SENKOUNGNA', '', 1, '2013-09-17 12:03:33', 1, '2013-09-17 12:03:33', 1),
(2843, 317, 'KIMBELY II', '', 1, '2013-09-17 12:07:28', 1, '2013-09-17 12:07:28', 1),
(2844, 282, 'WALIA', '', 1, '2013-09-17 12:08:23', 1, '2013-09-17 12:08:23', 1),
(2845, 317, 'LOPPET II', '', 1, '2013-09-17 12:08:43', 1, '2013-09-17 12:08:43', 1),
(2846, 170, 'KOUROUFE SIDIYA', '', 1, '2013-09-17 12:09:15', 1, '2013-09-17 12:09:15', 1),
(2847, 317, 'LOPPET ECOLE', '', 1, '2013-09-17 12:09:16', 1, '2013-09-17 12:09:16', 1),
(2848, 282, 'MALEAH', '', 1, '2013-09-17 12:09:18', 1, '2013-09-17 12:09:18', 1),
(2849, 170, 'SININKORO', '', 1, '2013-09-17 12:09:48', 1, '2013-09-17 12:09:48', 1),
(2850, 317, 'TYEWNGOL', '', 1, '2013-09-17 12:10:27', 1, '2013-09-17 12:10:27', 1),
(2851, 282, 'KOUYEYA', '', 1, '2013-09-17 12:10:40', 1, '2013-09-17 12:10:40', 1),
(2852, 317, 'MADINA MOSQUEE', '', 1, '2013-09-17 12:11:12', 1, '2013-09-17 12:11:12', 1),
(2853, 170, 'MARNA', '', 1, '2013-09-17 12:11:17', 1, '2013-09-17 12:11:17', 1),
(2854, 170, 'WASSAYA', '', 1, '2013-09-17 12:12:25', 1, '2013-09-17 12:12:25', 1),
(2855, 317, 'POUDRIERE II', '', 1, '2013-09-17 12:14:20', 1, '2013-09-17 12:14:20', 1),
(2856, 317, 'PETEL II', '', 1, '2013-09-17 12:15:20', 1, '2013-09-17 12:15:20', 1),
(2857, 171, 'SEREKORONI', '', 1, '2013-09-17 12:16:01', 1, '2013-09-17 12:16:01', 1),
(2858, 317, 'SABOU', '', 1, '2013-09-17 12:16:01', 1, '2013-09-17 12:16:01', 1),
(2859, 172, 'NIEMEN', '', 1, '2013-09-17 12:17:25', 1, '2013-09-17 12:17:25', 1),
(2860, 317, 'TELICO', '', 1, '2013-09-17 12:17:33', 1, '2013-09-17 12:17:33', 1),
(2861, 172, 'KAKIDI', '', 1, '2013-09-17 12:21:34', 1, '2013-09-17 12:21:34', 1),
(2862, 317, 'MADINA KM 15', '', 1, '2013-09-17 12:21:49', 1, '2013-09-17 12:21:49', 1),
(2863, 317, 'ALMAMYA MOSQUEE', '', 1, '2013-09-17 12:23:41', 1, '2013-09-17 12:23:41', 1),
(2864, 317, 'ALMAMYA RESIDENCE', '', 1, '2013-09-17 12:24:11', 1, '2013-09-17 12:24:11', 1),
(2865, 317, 'ALMAMYA DUMEZ', '', 1, '2013-09-17 12:24:49', 1, '2013-09-17 12:24:49', 1),
(2866, 317, 'MADINA TAMBASSA', '', 1, '2013-09-17 12:26:20', 1, '2013-09-17 12:26:20', 1),
(2867, 172, 'SOMOKORO', '', 1, '2013-09-17 12:26:53', 1, '2013-09-17 12:26:53', 1),
(2868, 317, 'HORE FELLO I', '', 1, '2013-09-17 12:27:46', 1, '2013-09-17 12:27:46', 1),
(2869, 282, 'KHIMBELI', '', 1, '2013-09-17 12:29:21', 1, '2013-09-17 12:29:21', 1),
(2870, 282, 'KHOBRIAH', '', 1, '2013-09-17 12:30:43', 1, '2013-09-17 12:31:21', 1),
(2871, 317, 'ABATTOIR I', '', 1, '2013-09-17 12:32:23', 1, '2013-09-17 12:32:23', 1),
(2872, 282, 'SONFON', '', 1, '2013-09-17 12:34:21', 1, '2013-09-17 12:34:21', 1),
(2873, 282, 'BAMBAYA', '', 1, '2013-09-17 12:34:41', 1, '2013-09-17 12:34:41', 1),
(2874, 282, 'GOMBABHE', '', 1, '2013-09-17 12:35:36', 1, '2013-09-17 12:35:36', 1),
(2875, 282, 'BOURAMAYA', '', 1, '2013-09-17 12:48:24', 1, '2013-09-17 12:48:24', 1),
(2876, 282, 'BOUBOUYA', '', 1, '2013-09-17 12:52:45', 1, '2013-09-17 12:52:45', 1),
(2877, 282, 'DEMBAYA', '', 1, '2013-09-17 12:53:05', 1, '2013-09-17 12:53:05', 1),
(2878, 282, 'SIMBAYA', '', 1, '2013-09-17 12:54:29', 1, '2013-09-17 12:54:29', 1),
(2879, 282, 'LONGORI', '', 1, '2013-09-17 12:55:17', 1, '2013-09-17 12:55:17', 1),
(2880, 330, 'M&Ouml;R&Ouml;DE', '', 1, '2013-09-17 12:55:29', 1, '2013-09-17 12:55:29', 1),
(2881, 282, 'SILIKHOUN', '', 1, '2013-09-17 12:56:20', 1, '2013-09-17 12:56:20', 1),
(2882, 173, 'SILAMANA', '', 1, '2013-09-17 12:57:58', 1, '2013-09-17 12:57:58', 1),
(2883, 173, 'TENINMAMOUDOUYAH CEN', '', 1, '2013-09-17 12:58:32', 1, '2013-09-17 12:59:26', 1),
(2884, 173, 'YARAYA', '', 1, '2013-09-17 12:59:03', 1, '2013-09-17 12:59:03', 1),
(2885, 173, 'FRANDOU', '', 1, '2013-09-17 13:00:18', 1, '2013-09-17 13:00:18', 1),
(2886, 173, 'KARAKO', '', 1, '2013-09-17 13:00:43', 1, '2013-09-17 13:00:43', 1),
(2887, 329, 'SE&Iuml;DYA II', '', 1, '2013-09-17 13:00:56', 1, '2013-09-17 13:00:56', 1),
(2888, 173, 'FARADOU', '', 1, '2013-09-17 13:01:02', 1, '2013-09-17 13:01:02', 1),
(2889, 173, 'GBOSSOKORIYA', '', 1, '2013-09-17 13:01:27', 1, '2013-09-17 13:01:27', 1),
(2890, 173, 'KOLOMANGBEYA', '', 1, '2013-09-17 13:01:45', 1, '2013-09-17 13:01:45', 1),
(2891, 328, 'TEGUEREYA CENTRE', '', 1, '2013-09-17 13:01:57', 1, '2013-09-17 13:01:57', 1),
(2892, 284, 'HERICO', '', 1, '2013-09-17 13:02:03', 1, '2013-09-17 13:02:03', 1),
(2893, 173, 'LEYAH', '', 1, '2013-09-17 13:02:37', 1, '2013-09-17 13:02:37', 1),
(2894, 328, 'BOKO', '', 1, '2013-09-17 13:04:08', 1, '2013-09-17 13:04:08', 1),
(2895, 174, 'KARIKARISA', '', 1, '2013-09-17 13:05:12', 1, '2013-09-17 13:05:12', 1),
(2896, 327, 'KENTEN', '', 1, '2013-09-17 13:06:38', 1, '2013-09-17 13:06:38', 1),
(2897, 174, 'MANANKOUROU', '', 1, '2013-09-17 13:07:05', 1, '2013-09-17 13:07:05', 1),
(2898, 174, 'KEROUANE', '', 1, '2013-09-17 13:07:50', 1, '2013-09-17 13:07:50', 1),
(2899, 175, 'KIGNERO II', '', 1, '2013-09-17 13:44:33', 1, '2013-09-17 13:44:33', 1),
(2900, 175, 'KIGNERO III', '', 1, '2013-09-17 13:44:43', 1, '2013-09-17 13:44:43', 1),
(2901, 175, 'MISSAMANA', '', 1, '2013-09-17 13:45:45', 1, '2013-09-17 13:45:45', 1),
(2902, 175, 'BAGBE', '', 1, '2013-09-17 13:46:45', 1, '2013-09-17 13:46:45', 1),
(2903, 175, 'KONSON', '', 1, '2013-09-17 13:47:09', 1, '2013-09-17 13:47:09', 1),
(2904, 326, 'FODE HADJI', '', 1, '2013-09-17 13:50:42', 1, '2013-09-17 13:50:42', 1),
(2905, 147, 'BALANDOUGOUBA II', '', 1, '2013-09-17 13:52:36', 1, '2013-09-17 13:52:36', 1),
(2906, 147, 'TABATEFOUWA', '', 1, '2013-09-17 13:53:29', 1, '2013-09-17 13:53:29', 1),
(2907, 326, 'SOKOTORO', '', 1, '2013-09-17 13:53:30', 1, '2013-09-17 13:53:30', 1),
(2908, 147, 'FARAGBEKORO', '', 1, '2013-09-17 13:54:11', 1, '2013-09-17 13:54:11', 1),
(2909, 326, 'DERMELA', '', 1, '2013-09-17 13:54:14', 1, '2013-09-17 13:54:14', 1),
(2910, 147, 'SIDIKILA II', '', 1, '2013-09-17 13:56:52', 1, '2013-09-17 13:57:41', 1),
(2911, 318, 'BHAWO FELLO', '', 1, '2013-09-17 14:03:59', 1, '2013-09-17 14:03:59', 1),
(2912, 318, 'LAAPOUWOL', '', 1, '2013-09-17 14:05:05', 1, '2013-09-17 14:05:05', 1),
(2913, 155, 'NIANTANINA II', '', 1, '2013-09-17 14:08:20', 1, '2013-09-17 14:08:20', 1),
(2914, 155, 'DANDELA', '', 1, '2013-09-17 14:09:22', 1, '2013-09-17 14:09:22', 1),
(2915, 155, 'GBONKO', '', 1, '2013-09-17 14:09:45', 1, '2013-09-17 14:09:45', 1),
(2916, 155, 'BAGAFEA', '', 1, '2013-09-17 14:10:07', 1, '2013-09-17 14:10:07', 1),
(2917, 156, 'WAHIRY', '', 1, '2013-09-17 14:11:46', 1, '2013-09-17 14:11:46', 1),
(2918, 156, 'LENSORON', '', 1, '2013-09-17 14:12:12', 1, '2013-09-17 14:12:12', 1),
(2919, 157, 'M\\\'BALIA', '', 1, '2013-09-17 14:15:49', 1, '2013-09-17 14:15:49', 1),
(2920, 157, 'MADINA', '', 1, '2013-09-17 14:16:40', 1, '2013-09-17 14:16:40', 1),
(2921, 314, 'KOUROU SERIABHE', '', 1, '2013-09-17 14:17:33', 1, '2013-09-17 14:17:33', 1),
(2922, 314, 'PENNOUN', '', 1, '2013-09-17 14:18:38', 1, '2013-09-17 14:18:38', 1),
(2923, 157, 'TANDO', '', 1, '2013-09-17 14:19:27', 1, '2013-09-17 14:19:27', 1),
(2924, 157, 'SOUNKOULOUN', '', 1, '2013-09-17 14:19:57', 1, '2013-09-17 14:19:57', 1),
(2925, 292, 'DEGUI DEGUI', '', 1, '2013-09-17 14:23:31', 1, '2013-09-17 14:23:31', 1),
(2926, 292, 'GOMBOKHORI', '', 1, '2013-09-17 14:24:04', 1, '2013-09-17 14:24:04', 1),
(2927, 146, 'OUDIALA', '', 1, '2013-09-17 14:24:57', 1, '2013-09-17 14:24:57', 1),
(2928, 292, 'TABEKHOURE', '', 1, '2013-09-17 14:25:18', 1, '2013-09-17 14:25:18', 1),
(2929, 146, 'KISSIDOUGOU KOURA', '', 1, '2013-09-17 14:25:23', 1, '2013-09-17 14:25:23', 1),
(2930, 146, 'KODIARAN', '', 1, '2013-09-17 14:25:53', 1, '2013-09-17 14:25:53', 1),
(2931, 292, 'KHALANTOU', '', 1, '2013-09-17 14:25:58', 1, '2013-09-17 14:25:58', 1),
(2932, 146, 'ZANGBELE', '', 1, '2013-09-17 14:26:08', 1, '2013-09-17 14:26:08', 1),
(2933, 292, 'DAFIRA', '', 1, '2013-09-17 14:26:29', 1, '2013-09-17 14:26:29', 1),
(2934, 292, 'MAMOUDOU CAMARA', '', 1, '2013-09-17 14:26:53', 1, '2013-09-17 14:26:53', 1),
(2935, 148, 'KOUDI', '', 1, '2013-09-17 14:27:56', 1, '2013-09-17 14:29:56', 1),
(2936, 292, 'WALIAH', '', 1, '2013-09-17 14:28:06', 1, '2013-09-17 14:28:06', 1),
(2937, 148, 'BALANDOU I', '', 1, '2013-09-17 14:28:45', 1, '2013-09-17 14:29:22', 1),
(2938, 332, 'MISSIDE HAMDALAYE', '', 1, '2013-09-17 14:29:56', 1, '2013-09-17 14:33:03', 1),
(2939, 332, 'DONGHEL', '', 1, '2013-09-17 14:30:30', 1, '2013-09-17 14:30:30', 1),
(2940, 148, 'BALANDOU II', '', 1, '2013-09-17 14:30:45', 1, '2013-09-17 14:30:45', 1),
(2941, 332, 'BROUWAL LAHEDJI', '', 1, '2013-09-17 14:32:24', 1, '2013-09-17 14:32:24', 1),
(2942, 148, 'MAKALIFRABA', '', 1, '2013-09-17 14:33:06', 1, '2013-09-17 14:33:06', 1),
(2943, 332, 'DAR ES-SALAM', '', 1, '2013-09-17 14:33:50', 1, '2013-09-17 14:33:50', 1),
(2944, 285, 'MAKARE', '', 1, '2013-09-17 14:35:05', 1, '2013-09-17 14:35:05', 1),
(2945, 285, 'KOUNSSOUTA', '', 1, '2013-09-17 14:35:20', 1, '2013-09-17 14:35:20', 1),
(2946, 285, 'PALATOUGOU', '', 1, '2013-09-17 14:46:47', 1, '2013-09-17 14:46:47', 1),
(2947, 332, 'MISSIDE HINDE', '', 1, '2013-09-17 14:46:48', 1, '2013-09-17 14:46:48', 1),
(2948, 149, 'FARALAKO', '', 1, '2013-09-17 14:47:23', 1, '2013-09-17 14:48:13', 1),
(2949, 285, 'BOURAMAYAH', '', 1, '2013-09-17 14:49:09', 1, '2013-09-17 14:49:09', 1),
(2950, 341, 'SEREBOURE', '', 1, '2013-09-17 14:50:21', 1, '2013-09-17 14:50:21', 1),
(2951, 341, 'DJOUNGOL', '', 1, '2013-09-17 14:51:07', 1, '2013-09-17 14:51:07', 1),
(2952, 341, 'AIumNDE', '', 1, '2013-09-17 14:52:11', 1, '2022-07-05 11:01:21', 51),
(2953, 149, 'KANGBELA', '', 1, '2013-09-17 14:52:45', 1, '2013-09-17 14:52:45', 1),
(2954, 341, 'DAMPO', '', 1, '2013-09-17 14:53:14', 1, '2013-09-17 14:53:14', 1),
(2955, 149, 'MAMADIANA', '', 1, '2013-09-17 14:53:19', 1, '2013-09-17 14:53:19', 1),
(2956, 286, 'HOWOUROU', '', 1, '2013-09-17 14:54:40', 1, '2013-09-17 14:54:40', 1),
(2957, 149, 'KOROMADOU', '', 1, '2013-09-17 14:54:41', 1, '2013-09-17 14:54:41', 1),
(2958, 341, 'KOUROU MANGUI', '', 1, '2013-09-17 14:54:50', 1, '2013-09-17 14:54:50', 1),
(2959, 149, 'KOMANA', '', 1, '2013-09-17 14:54:54', 1, '2013-09-17 14:54:54', 1),
(2960, 286, 'DAARA', '', 1, '2013-09-17 14:55:22', 1, '2013-09-17 14:55:22', 1),
(2961, 286, 'MOUSSAFANGAMAYAH', '', 1, '2013-09-17 14:55:50', 1, '2013-09-17 14:55:50', 1),
(2962, 286, 'SIRAMODIA', '', 1, '2013-09-17 14:56:37', 1, '2013-09-17 14:56:37', 1),
(2963, 150, 'MOUSSADOU', '', 1, '2013-09-17 14:57:13', 1, '2013-09-17 14:57:13', 1),
(2964, 286, 'TAMBAYAH', '', 1, '2013-09-17 14:57:54', 1, '2013-09-17 14:57:54', 1),
(2965, 338, 'PELLAL TOKOSSERE', '', 1, '2013-09-17 15:00:53', 1, '2013-09-17 15:00:53', 1),
(2966, 338, 'FOYE BOUROUWAL', '', 1, '2013-09-17 15:02:20', 1, '2013-09-17 15:02:20', 1),
(2967, 338, 'LOUKOUTA', '', 1, '2013-09-17 15:04:27', 1, '2013-09-17 15:04:27', 1),
(2968, 286, 'DABOYA', '', 1, '2013-09-17 15:06:10', 1, '2013-09-17 15:06:10', 1),
(2969, 338, 'LEY FITA', '', 1, '2013-09-17 15:06:45', 1, '2013-09-17 15:06:45', 1),
(2970, 151, 'NAMISSA II', '', 1, '2013-09-17 15:06:48', 1, '2013-09-17 15:06:48', 1),
(2971, 151, 'FILANINDIALAKORO', '', 1, '2013-09-17 15:07:36', 1, '2013-09-17 15:07:36', 1),
(2972, 151, 'KINIERANKOURA', '', 1, '2013-09-17 15:08:02', 1, '2013-09-17 15:08:02', 1),
(2973, 283, 'TATAGUI II', '', 1, '2013-09-17 15:08:15', 1, '2013-09-17 15:08:15', 1),
(2974, 283, 'FATAKO II', '', 1, '2013-09-17 15:08:38', 1, '2013-09-17 15:08:38', 1),
(2975, 337, 'MADINA LEBERE', '', 1, '2013-09-17 15:08:40', 1, '2013-09-17 15:08:40', 1),
(2976, 151, 'MAGANA', '', 1, '2013-09-17 15:09:11', 1, '2013-09-17 15:09:11', 1),
(2977, 151, 'M\\\'BALIA II', '', 1, '2013-09-17 15:09:32', 1, '2013-09-17 15:09:32', 1),
(2978, 337, 'TANGAN', '', 1, '2013-09-17 15:10:36', 1, '2013-09-17 15:10:36', 1),
(2979, 337, 'N\\\'DIRE', '', 1, '2013-09-17 15:11:07', 1, '2013-09-17 15:11:07', 1),
(2980, 151, 'KODJAMBA', '', 1, '2013-09-17 15:11:29', 1, '2013-09-17 15:11:29', 1),
(2981, 151, 'KODJAMBA MARCHE', '', 1, '2013-09-17 15:11:55', 1, '2013-09-17 15:11:55', 1),
(2982, 151, 'KARAKANI', '', 1, '2013-09-17 15:12:08', 1, '2013-09-17 15:12:08', 1),
(2983, 337, 'MACI II', '', 1, '2013-09-17 15:12:46', 1, '2013-09-17 15:12:46', 1),
(2984, 337, 'LITTY', '', 1, '2013-09-17 15:13:27', 1, '2013-09-17 15:13:27', 1),
(2985, 337, 'DONGHOL', '', 1, '2013-09-17 15:14:09', 1, '2013-09-17 15:14:09', 1),
(2986, 337, 'DJEREINNA', '', 1, '2013-09-17 15:14:46', 1, '2013-09-17 15:14:46', 1),
(2987, 152, 'KIGNEROBA', '', 1, '2013-09-17 15:15:34', 1, '2013-09-17 15:15:34', 1),
(2988, 337, 'BHOULLY', '', 1, '2013-09-17 15:15:36', 1, '2013-09-17 15:15:36', 1),
(2989, 152, 'KOLOMOKO', '', 1, '2013-09-17 15:16:06', 1, '2013-09-17 15:16:06', 1),
(2990, 337, 'MACI I', '', 1, '2013-09-17 15:16:10', 1, '2013-09-17 15:16:10', 1),
(2991, 152, 'DJILENGBE II', '', 1, '2013-09-17 15:16:52', 1, '2013-09-17 15:16:52', 1),
(2992, 152, 'FRAGBEKOURA', '', 1, '2013-09-17 15:17:31', 1, '2013-09-17 15:17:31', 1),
(2993, 152, 'BANKOUMANA II', '', 1, '2013-09-17 15:19:09', 1, '2013-09-17 15:19:09', 1),
(2994, 152, 'DOUNOKOLO', '', 1, '2013-09-17 15:20:03', 1, '2013-09-17 15:20:03', 1),
(2995, 152, 'KONDIANAKOURA', '', 1, '2013-09-17 15:20:17', 1, '2013-09-17 15:20:17', 1),
(2996, 336, 'FETOWEL', '', 1, '2013-09-17 15:23:02', 1, '2013-09-17 15:23:02', 1),
(2997, 153, 'FOUADJOU', '', 1, '2013-09-17 15:25:40', 1, '2013-09-17 15:25:40', 1),
(2998, 335, 'MADINA LEGUE', '', 1, '2013-09-17 15:26:20', 1, '2013-09-17 15:26:20', 1),
(2999, 335, 'KOURA WOURE', '', 1, '2013-09-17 15:26:53', 1, '2013-09-17 15:26:53', 1),
(3000, 153, 'FRAMADIA', '', 1, '2013-09-17 15:27:11', 1, '2013-09-17 15:27:11', 1),
(3001, 335, 'AIumGUEL', '', 1, '2013-09-17 15:27:44', 1, '2022-07-05 10:57:40', 51),
(3002, 153, 'TADIBAKOUROU', '', 1, '2013-09-17 15:28:16', 1, '2013-09-17 15:28:16', 1),
(3003, 335, 'HAMDALLAYE', '', 1, '2013-09-17 15:28:29', 1, '2013-09-17 15:28:29', 1),
(3004, 153, 'SAIMANA', '', 1, '2013-09-17 15:28:41', 1, '2013-09-17 15:28:41', 1),
(3005, 153, 'GBILIN', '', 1, '2013-09-17 15:28:56', 1, '2013-09-17 15:28:56', 1),
(3006, 154, 'MASSAKODA', '', 1, '2013-09-17 15:30:56', 1, '2013-09-17 15:30:56', 1),
(3007, 334, 'KADIEL', '', 1, '2013-09-17 15:31:55', 1, '2013-09-17 15:31:55', 1),
(3008, 287, 'BOLIMANDA CENTRE', '', 1, '2013-09-17 15:32:01', 1, '2013-09-17 15:32:01', 1),
(3009, 287, 'BOSSIMIYAH', '', 1, '2013-09-17 15:32:26', 1, '2013-09-17 15:32:26', 1),
(3010, 154, 'KANAGALA', '', 1, '2013-09-17 15:32:44', 1, '2013-09-17 15:32:44', 1),
(3011, 287, 'TONGUIRON', '', 1, '2013-09-17 15:32:46', 1, '2013-09-17 15:32:46', 1),
(3012, 287, 'YOULANYEN', '', 1, '2013-09-17 15:33:04', 1, '2013-09-17 15:33:04', 1),
(3013, 154, 'SAMAKOFARA', '', 1, '2013-09-17 15:33:12', 1, '2013-09-17 15:33:12', 1),
(3014, 334, 'DOUDLY', '', 1, '2013-09-17 15:33:19', 1, '2013-09-17 15:33:19', 1),
(3015, 287, 'MANCKE', '', 1, '2013-09-17 15:33:27', 1, '2013-09-17 15:33:27', 1),
(3016, 154, 'SAKODOU SINKO', '', 1, '2013-09-17 15:33:43', 1, '2013-09-17 15:33:43', 1),
(3017, 287, 'YELIBANET', '', 1, '2013-09-17 15:33:48', 1, '2013-09-17 15:33:48', 1),
(3018, 287, 'SEYDOUYA', '', 1, '2013-09-17 15:34:05', 1, '2013-09-17 15:34:05', 1),
(3019, 154, 'FADOU', '', 1, '2013-09-17 15:34:43', 1, '2013-09-17 15:34:43', 1),
(3020, 288, 'YENIAH', '', 1, '2013-09-17 15:35:32', 1, '2013-09-17 15:35:32', 1),
(3021, 154, 'MANFELE', '', 1, '2013-09-17 15:35:49', 1, '2013-09-17 15:35:49', 1),
(3022, 288, 'SAMBOUYA', '', 1, '2013-09-17 15:35:53', 1, '2013-09-17 15:35:53', 1),
(3023, 331, 'MARCHE I', '', 1, '2013-09-17 15:35:53', 1, '2013-09-17 15:35:53', 1),
(3024, 288, 'WONDIFERI', '', 1, '2013-09-17 15:36:12', 1, '2013-09-17 15:36:44', 1),
(3025, 331, 'SALLOUBHE', '', 1, '2013-09-17 15:36:23', 1, '2013-09-17 15:36:23', 1),
(3026, 331, 'GADHA KOUBI', '', 1, '2013-09-17 15:37:28', 1, '2013-09-17 15:37:28', 1),
(3027, 331, 'MARCHE II', '', 1, '2013-09-17 15:38:03', 1, '2013-09-17 15:38:03', 1),
(3028, 331, 'MISSIRA', '', 1, '2013-09-17 15:38:45', 1, '2013-09-17 15:38:45', 1),
(3029, 289, 'MALIGUIA FORY', '', 1, '2013-09-17 15:39:10', 1, '2013-09-17 15:39:10', 1),
(3030, 331, 'N\\\'DOUYEBHE SALLY', '', 1, '2013-09-17 15:39:40', 1, '2013-09-17 15:39:40', 1),
(3031, 289, 'YENKISSA', '', 1, '2013-09-17 15:39:59', 1, '2013-09-17 15:39:59', 1),
(3032, 331, 'GUEME II', '', 1, '2013-09-17 15:40:13', 1, '2013-09-17 15:40:13', 1),
(3033, 289, 'SINKINET', '', 1, '2013-09-17 15:40:25', 1, '2013-09-17 15:40:25', 1),
(3034, 141, 'NIANDANKORO II', '', 1, '2013-09-17 15:40:37', 1, '2013-09-17 15:40:37', 1),
(3035, 289, 'KALAKO', '', 1, '2013-09-17 15:40:41', 1, '2013-09-17 15:40:41', 1),
(3036, 331, 'HAFIA', '', 1, '2013-09-17 15:40:47', 1, '2013-09-17 15:40:47', 1),
(3037, 141, 'DAMISSAKORO', '', 1, '2013-09-17 15:41:33', 1, '2013-09-17 15:41:33', 1),
(3038, 333, 'HAKKOUNDE MITTY', '', 1, '2013-09-17 15:42:51', 1, '2013-09-17 15:42:51', 1),
(3039, 333, 'HOORE GNELE', '', 1, '2013-09-17 15:44:29', 1, '2013-09-17 15:44:29', 1),
(3040, 290, 'MAFERENYAH CENTRE II', '', 1, '2013-09-17 15:45:09', 1, '2013-09-17 15:45:09', 1),
(3041, 290, 'SENGUELEN', '', 1, '2013-09-17 15:45:53', 1, '2013-09-17 15:45:53', 1),
(3042, 340, 'KOKOULO', '', 1, '2013-09-17 15:45:57', 1, '2013-09-17 15:45:57', 1),
(3043, 290, 'YINDI', '', 1, '2013-09-17 15:46:32', 1, '2013-09-17 15:47:26', 1),
(3044, 340, 'FITABA', '', 1, '2013-09-17 15:46:45', 1, '2013-09-17 15:46:45', 1),
(3045, 290, 'MORIBAYA', '', 1, '2013-09-17 15:46:51', 1, '2013-09-17 15:46:51', 1),
(3046, 142, 'LANDI', '', 1, '2013-09-17 15:47:00', 1, '2013-09-17 15:47:00', 1),
(3047, 290, 'MADINAGBE', '', 1, '2013-09-17 15:47:08', 1, '2013-09-17 15:47:08', 1),
(3048, 290, 'MORIFINDIA', '', 1, '2013-09-17 15:47:46', 1, '2013-09-17 15:47:46', 1),
(3049, 143, 'NOUNKOUNKAN II', '', 1, '2013-09-17 15:48:48', 1, '2013-09-17 15:48:48', 1),
(3050, 143, 'BANFELE KORO', '', 1, '2013-09-17 15:49:45', 1, '2013-09-17 15:49:45', 1),
(3051, 291, 'MOUSSAYAH CENTRE I', '', 1, '2013-09-17 15:50:10', 1, '2013-09-17 15:50:10', 1),
(3052, 291, 'MOUSSAYAH CENTRE II', '', 1, '2013-09-17 15:50:21', 1, '2013-09-17 15:50:21', 1),
(3053, 143, 'MAKONO', '', 1, '2013-09-17 15:50:50', 1, '2013-09-17 15:50:50', 1),
(3054, 143, 'SOKOURA', '', 1, '2013-09-17 15:51:08', 1, '2013-09-17 15:51:08', 1),
(3055, 143, 'SOUNSOUNKOUDOU', '', 1, '2013-09-17 15:51:25', 1, '2013-09-17 15:51:25', 1),
(3056, 342, 'BENDEKOURE', '', 1, '2013-09-17 15:51:27', 1, '2013-09-17 15:51:27', 1),
(3057, 291, 'MORIBAYAH', '', 1, '2013-09-17 15:51:50', 1, '2013-09-17 15:51:50', 1),
(3058, 342, 'TYOUKOU', '', 1, '2013-09-17 15:51:59', 1, '2013-09-17 15:51:59', 1),
(3059, 291, 'DIANEAH', '', 1, '2013-09-17 15:52:45', 1, '2013-09-17 15:52:45', 1),
(3060, 342, 'DIABERE YARE', '', 1, '2013-09-17 15:52:51', 1, '2013-09-17 15:52:51', 1),
(3061, 291, 'KALIAH', '', 1, '2013-09-17 15:53:03', 1, '2013-09-17 15:53:03', 1),
(3062, 291, 'SINEYAH', '', 1, '2013-09-17 15:53:26', 1, '2013-09-17 15:53:26', 1),
(3063, 342, 'PELLEL MODIADBHE', '', 1, '2013-09-17 15:53:28', 1, '2013-09-17 15:53:28', 1),
(3064, 342, 'DIONGASSI', '', 1, '2013-09-17 15:54:08', 1, '2013-09-17 15:54:08', 1),
(3065, 145, 'NIMISSATOU', '', 1, '2013-09-17 15:54:31', 1, '2013-09-17 15:54:31', 1),
(3066, 342, 'PELLEL BANTAN', '', 1, '2013-09-17 15:54:43', 1, '2013-09-17 15:54:43', 1),
(3067, 342, 'MANGOL', '', 1, '2013-09-17 15:55:18', 1, '2013-09-17 15:55:18', 1),
(3068, 145, 'MOUSSALA', '', 1, '2013-09-17 15:55:48', 1, '2013-09-17 15:55:48', 1),
(3069, 342, 'AYDE BOUSSOURA', '', 1, '2013-09-17 15:55:55', 1, '2013-09-17 15:55:55', 1),
(3070, 145, 'TALABE', '', 1, '2013-09-17 15:56:46', 1, '2013-09-17 15:56:46', 1),
(3071, 145, 'BOUGOULAN', '', 1, '2013-09-17 15:58:33', 1, '2013-09-17 15:58:33', 1),
(3072, 145, 'NORA', '', 1, '2013-09-17 15:58:58', 1, '2013-09-17 15:58:58', 1),
(3073, 145, 'NETEMAFARA', '', 1, '2013-09-17 15:59:37', 1, '2013-09-17 15:59:37', 1),
(3074, 145, 'KOTE', '', 1, '2013-09-17 16:00:07', 1, '2013-09-17 16:00:07', 1),
(3075, 263, 'SIMINIYA', '', 1, '2013-09-17 16:01:37', 1, '2013-09-17 16:01:37', 1),
(3076, 263, 'KANSA', '', 1, '2013-09-17 16:02:21', 1, '2013-09-17 16:02:21', 1),
(3077, 263, 'KOUNDA-BALLAYA', '', 1, '2013-09-17 16:03:35', 1, '2013-09-17 16:03:35', 1),
(3078, 263, 'GARAFIRI', '', 1, '2013-09-17 16:08:28', 1, '2013-09-17 16:08:28', 1),
(3079, 263, 'MADINA FANTA', '', 1, '2013-09-17 16:10:31', 1, '2013-09-17 16:10:31', 1),
(3080, 263, 'MADINA FOULA', '', 1, '2013-09-17 16:10:50', 1, '2013-09-17 16:10:50', 1),
(3081, 133, 'BOLIBANA I', '', 1, '2013-09-17 16:15:50', 1, '2013-09-17 16:15:50', 1),
(3082, 133, 'BOLIBANA II', '', 1, '2013-09-17 16:16:20', 1, '2013-09-17 16:16:20', 1),
(3083, 264, 'KALIYAKHORY', '', 1, '2013-09-17 16:19:56', 1, '2013-09-17 16:19:56', 1),
(3084, 135, 'NAFADJI', '', 1, '2013-09-17 16:25:10', 1, '2013-09-17 16:25:10', 1),
(3085, 264, 'GOLEYA', '', 1, '2013-09-17 16:26:14', 1, '2013-09-17 16:26:14', 1),
(3086, 135, 'TATAKOUROU', '', 1, '2013-09-17 16:26:42', 1, '2013-09-17 16:26:42', 1),
(3087, 135, 'BEMBETA', '', 1, '2013-09-17 16:32:46', 1, '2013-09-17 16:32:46', 1),
(3088, 135, 'KOURAKO', '', 1, '2013-09-17 16:34:06', 1, '2013-09-17 16:34:06', 1),
(3089, 135, 'GAREMA', '', 1, '2013-09-17 16:34:50', 1, '2013-09-17 16:34:50', 1),
(3090, 265, 'FOULAYA', '', 1, '2013-09-17 16:35:09', 1, '2013-09-17 16:35:09', 1),
(3091, 118, 'FELLO MADINA', '', 1, '2013-09-17 16:35:39', 1, '2013-09-17 16:35:39', 1),
(3092, 265, 'CAMARABOUNYI', '', 1, '2013-09-17 16:35:40', 1, '2013-09-17 16:35:40', 1),
(3093, 265, 'FRIGUIAGBE I', '', 1, '2013-09-17 16:36:40', 1, '2013-09-17 16:36:40', 1),
(3094, 118, 'LAAFA- BOUBE', '', 1, '2013-09-17 16:36:55', 1, '2013-09-17 16:36:55', 1),
(3095, 265, 'KANTY', '', 1, '2013-09-17 16:37:18', 1, '2013-09-17 16:37:18', 1),
(3096, 118, 'KOLLET MISSIDE', '', 1, '2013-09-17 16:37:53', 1, '2013-09-17 16:37:53', 1),
(3097, 118, 'KOUMBAMA', '', 1, '2013-09-17 16:38:29', 1, '2013-09-17 16:38:29', 1),
(3098, 118, 'KOUNET', '', 1, '2013-09-17 16:38:55', 1, '2013-09-17 16:38:55', 1),
(3099, 117, 'BOUROUAL', '', 1, '2013-09-17 16:39:51', 1, '2013-09-17 16:39:51', 1),
(3100, 117, 'FERIGANDE', '', 1, '2013-09-17 16:40:18', 1, '2013-09-17 16:40:18', 1),
(3101, 117, 'HAMEDANLAYE', '', 1, '2013-09-17 16:40:52', 1, '2013-09-17 16:40:52', 1),
(3102, 137, 'TOGUIFIN', '', 1, '2013-09-17 16:41:00', 1, '2013-09-17 16:41:00', 1),
(3103, 137, 'FRENKAMAYA', '', 1, '2013-09-17 16:41:54', 1, '2013-09-17 16:41:54', 1),
(3104, 262, 'FEREFOU 2', '', 1, '2013-09-17 16:42:22', 1, '2013-09-17 16:42:22', 1),
(3105, 116, 'DEMOUKO', '', 1, '2013-09-17 16:42:46', 1, '2013-09-17 16:42:46', 1),
(3106, 262, 'FEREFOU 1', '', 1, '2013-09-17 16:43:36', 1, '2013-09-17 16:43:36', 1),
(3107, 116, 'FELLO KOLLET', '', 1, '2013-09-17 16:43:45', 1, '2013-09-17 16:43:45', 1),
(3108, 262, 'FILIGBE', '', 1, '2013-09-17 16:44:03', 1, '2013-09-17 16:44:03', 1),
(3109, 116, 'KIRFI', '', 1, '2013-09-17 16:44:18', 1, '2013-09-17 16:44:18', 1),
(3110, 116, 'DABALAYA', '', 1, '2013-09-17 16:44:49', 1, '2013-09-17 16:44:49', 1),
(3111, 116, 'KABARY', '', 1, '2013-09-17 16:45:31', 1, '2013-09-17 16:45:31', 1),
(3112, 262, 'FISSA H&Ouml;PITAL', '', 1, '2013-09-17 16:46:19', 1, '2013-09-17 16:46:19', 1),
(3113, 116, 'BELAKOURE', '', 1, '2013-09-17 16:46:59', 1, '2013-09-17 16:46:59', 1),
(3114, 116, 'FAGHAN', '', 1, '2013-09-17 16:47:32', 1, '2013-09-17 16:47:32', 1),
(3115, 116, 'DIAWLEKO', '', 1, '2013-09-17 16:48:00', 1, '2013-09-17 16:48:00', 1),
(3116, 262, 'GADAWAWA', '', 1, '2013-09-17 16:48:18', 1, '2013-09-17 16:48:18', 1),
(3117, 116, 'NIENIEMERE', '', 1, '2013-09-17 16:48:33', 1, '2013-09-17 16:48:33', 1),
(3118, 262, 'GARANGUELAYA', '', 1, '2013-09-17 16:48:45', 1, '2013-09-17 16:48:45', 1),
(3119, 116, 'DARAH', '', 1, '2013-09-17 16:49:03', 1, '2013-09-17 16:49:03', 1),
(3120, 116, 'DOUROUN', '', 1, '2013-09-17 16:49:30', 1, '2013-09-17 16:49:30', 1),
(3121, 262, 'ABATTOIR 2', '', 1, '2013-09-17 16:49:52', 1, '2022-10-16 17:55:15', 51),
(3122, 262, 'KOLIADY 1', '', 1, '2013-09-17 16:50:11', 1, '2013-09-17 16:50:11', 1),
(3123, 262, 'MANQUEPAS MOSQUEE', '', 1, '2013-09-17 16:51:41', 1, '2013-09-17 16:51:41', 1),
(3124, 115, 'AFIA', '', 1, '2013-09-17 16:52:45', 1, '2013-09-17 16:52:45', 1),
(3125, 262, 'SAMBAYA', '', 1, '2013-09-17 16:53:02', 1, '2013-09-17 16:53:02', 1),
(3126, 115, 'KOLLAGUI CENTRE', '', 1, '2013-09-17 16:55:33', 1, '2013-09-17 16:55:33', 1),
(3127, 114, 'WEDOU MALANGA', '', 1, '2013-09-17 16:58:37', 1, '2013-09-17 16:58:37', 1),
(3128, 114, 'SOLOKOURE', '', 1, '2013-09-17 16:59:07', 1, '2013-09-17 16:59:07', 1),
(3129, 114, 'TYAGUEL', '', 1, '2013-09-17 16:59:39', 1, '2013-09-17 16:59:39', 1),
(3130, 138, 'FARABA', '', 1, '2013-09-17 17:00:48', 1, '2013-09-17 17:00:48', 1),
(3131, 114, 'KOIN I', '', 1, '2013-09-17 17:00:50', 1, '2013-09-17 17:00:50', 1),
(3132, 113, 'KONDIEYA', '', 1, '2013-09-17 17:02:07', 1, '2013-09-17 17:02:07', 1),
(3133, 138, 'KOUROUNI', '', 1, '2013-09-17 17:02:46', 1, '2013-09-17 17:02:46', 1),
(3134, 262, 'SEKOUYA', '', 1, '2013-09-17 17:03:43', 1, '2013-09-17 17:03:43', 1),
(3135, 113, 'SANGOUYA', '', 1, '2013-09-17 17:04:25', 1, '2013-09-17 17:04:25', 1),
(3136, 262, 'TAFORY METEO', '', 1, '2013-09-17 17:04:50', 1, '2013-09-17 17:04:50', 1),
(3137, 113, 'LAREKO', '', 1, '2013-09-17 17:04:57', 1, '2013-09-17 17:04:57', 1),
(3138, 138, 'KOREKORE', '', 1, '2013-09-17 17:05:04', 1, '2013-09-17 17:05:04', 1),
(3139, 138, 'MANKITIN', '', 1, '2013-09-17 17:05:39', 1, '2013-09-17 17:05:39', 1),
(3140, 112, 'N\\\'GUESSA WOULA', '', 1, '2013-09-17 17:08:16', 1, '2013-09-17 17:08:16', 1),
(3142, 262, 'BAGUEYA', '', 1, '2013-09-17 17:09:36', 1, '2013-09-17 17:09:36', 1),
(3146, 138, 'KINTINIAN II', '', 1, '2013-09-17 17:11:42', 1, '2013-09-17 17:11:42', 1),
(3147, 262, 'CACIA 1', '', 1, '2013-09-17 17:12:24', 1, '2013-09-17 17:12:24', 1),
(3148, 262, 'CACIA 2', '', 1, '2013-09-17 17:14:03', 1, '2013-09-17 17:14:03', 1),
(3149, 262, 'CONDETTA 3', '', 1, '2013-09-17 17:14:56', 1, '2013-09-17 17:14:56', 1),
(3150, 262, 'DAR-SALAM', '', 1, '2013-09-17 17:15:12', 1, '2013-09-17 17:15:12', 1),
(3151, 138, 'HEREMAKONON', '', 1, '2013-09-17 17:16:06', 1, '2013-09-17 17:16:06', 1),
(3152, 111, 'BOUMEKO', '', 1, '2013-09-17 17:16:17', 1, '2013-09-17 17:16:17', 1),
(3153, 111, 'KORBONYA', '', 1, '2013-09-17 17:16:45', 1, '2013-09-17 17:16:45', 1),
(3154, 111, 'WENDOU', '', 1, '2013-09-17 17:17:17', 1, '2013-09-17 17:17:17', 1),
(3155, 138, 'DAABA', '', 1, '2013-09-17 17:17:19', 1, '2013-09-17 17:17:19', 1),
(3156, 138, 'DIALAKO', '', 1, '2013-09-17 17:17:54', 1, '2013-09-17 17:17:54', 1),
(3157, 138, 'DIARAYA', '', 1, '2013-09-17 17:18:06', 1, '2013-09-17 17:18:06', 1),
(3158, 119, 'BADY', '', 1, '2013-09-17 17:18:39', 1, '2013-09-17 17:18:39', 1),
(3159, 119, 'KORFO', '', 1, '2013-09-17 17:19:05', 1, '2013-09-17 17:19:05', 1),
(3160, 110, 'WOURETIMBE', '', 1, '2013-09-17 17:20:33', 1, '2013-09-17 17:20:33', 1),
(3161, 139, 'MINYADA', '', 1, '2013-09-17 17:21:45', 1, '2013-09-17 17:21:45', 1),
(3162, 139, 'LAYE BAYA', '', 1, '2013-09-17 17:22:36', 1, '2013-09-17 17:22:36', 1),
(3163, 110, 'KALANKA', '', 1, '2013-09-17 17:22:48', 1, '2013-09-17 17:22:48', 1),
(3164, 110, 'KELELA', '', 1, '2013-09-17 17:23:19', 1, '2013-09-17 17:23:19', 1),
(3165, 110, 'BOLE', '', 1, '2013-09-17 17:23:56', 1, '2013-09-17 17:23:56', 1),
(3166, 139, 'SEYLA', '', 1, '2013-09-17 17:24:10', 1, '2013-09-17 17:24:10', 1),
(3167, 110, 'GANFATA', '', 1, '2013-09-17 17:24:32', 1, '2013-09-17 17:24:32', 1),
(3168, 262, 'CONDETTA MOSQUEE', '', 1, '2013-09-17 17:26:10', 1, '2013-09-17 17:26:10', 1),
(3169, 106, 'DENGHEN', '', 1, '2013-09-17 17:26:30', 1, '2013-09-17 17:26:30', 1),
(3170, 106, 'KOYAH', '', 1, '2013-09-17 17:27:02', 1, '2013-09-17 17:27:02', 1),
(3171, 104, 'KANTA-THIOUDY', '', 1, '2013-09-17 17:28:53', 1, '2013-09-17 17:28:53', 1),
(3172, 104, 'SABE', '', 1, '2013-09-17 17:29:21', 1, '2013-09-17 17:29:21', 1),
(3173, 104, 'KEROUANE', '', 1, '2013-09-17 17:30:00', 1, '2013-09-17 17:30:00', 1),
(3174, 104, 'FINA', '', 1, '2013-09-17 17:30:27', 1, '2013-09-17 17:30:27', 1),
(3175, 104, 'KORIHOYE', '', 1, '2013-09-17 17:30:58', 1, '2013-09-17 17:30:58', 1),
(3176, 144, 'TENDO', '', 1, '2013-09-17 17:31:29', 1, '2013-09-17 17:31:29', 1),
(3177, 103, 'TEIMBOU', '', 1, '2013-09-17 17:31:52', 1, '2013-09-17 17:31:52', 1),
(3178, 103, 'FERIFETO', '', 1, '2013-09-17 17:32:28', 1, '2013-09-17 17:32:28', 1),
(3179, 103, 'KENSEYA', '', 1, '2013-09-17 17:32:57', 1, '2013-09-17 17:32:57', 1),
(3180, 102, 'SEOU', '', 1, '2013-09-17 17:33:33', 1, '2013-09-17 17:33:33', 1),
(3181, 144, 'TOMBALEN', '', 1, '2013-09-17 17:33:52', 1, '2013-09-17 17:33:52', 1),
(3182, 144, 'SINIKO', '', 1, '2013-09-17 17:35:25', 1, '2013-09-17 17:35:25', 1),
(3183, 99, 'SARA HERY', '', 1, '2013-09-17 17:38:47', 1, '2013-09-17 17:38:47', 1),
(3184, 99, 'YARI KOLY', '', 1, '2013-09-17 17:39:14', 1, '2013-09-17 17:39:14', 1),
(3185, 99, 'FETORE', '', 1, '2013-09-17 17:39:49', 1, '2013-09-17 17:39:49', 1),
(3186, 99, 'HORE LITY', '', 1, '2013-09-17 17:40:36', 1, '2013-09-17 17:40:36', 1),
(3187, 97, 'DOGHOL AMOROYABHE', '', 1, '2013-09-17 17:42:37', 1, '2013-09-17 17:42:37', 1),
(3188, 97, 'MALI MOSQUEE', '', 1, '2013-09-17 17:43:33', 1, '2013-09-17 17:43:33', 1),
(3189, 97, 'MALI III', '', 1, '2013-09-17 17:44:10', 1, '2013-09-17 17:44:10', 1),
(3190, 97, 'TENSIRA', '', 1, '2013-09-17 17:45:48', 1, '2013-09-17 17:45:48', 1),
(3191, 97, 'N\\\'DANTAWI', '', 1, '2013-09-17 17:47:42', 1, '2013-09-17 17:47:42', 1),
(3192, 97, 'BANDOUYA', '', 1, '2013-09-17 17:48:40', 1, '2013-09-17 17:48:40', 1),
(3193, 97, 'BEREBERE', '', 1, '2013-09-17 17:49:15', 1, '2013-09-17 17:49:15', 1),
(3194, 97, 'SOPARI', '', 1, '2013-09-17 17:49:50', 1, '2013-09-17 17:49:50', 1),
(3195, 266, 'KOLENTE CENTRE', '', 1, '2013-09-17 17:50:25', 1, '2013-09-17 17:50:25', 1),
(3196, 109, 'TENKETA', '', 1, '2013-09-17 17:51:19', 1, '2013-09-17 17:51:19', 1),
(3197, 266, 'MALEYA', '', 1, '2013-09-17 17:51:31', 1, '2013-09-17 17:51:31', 1),
(3198, 109, 'SINTYOUROU', '', 1, '2013-09-17 17:51:52', 1, '2013-09-17 17:51:52', 1),
(3199, 266, 'LAMBEYA', '', 1, '2013-09-17 17:51:54', 1, '2013-09-17 17:51:54', 1),
(3200, 266, 'KINSSANYA', '', 1, '2013-09-17 17:54:18', 1, '2013-09-17 17:54:18', 1),
(3201, 109, 'GOUMBA', '', 1, '2013-09-17 17:54:21', 1, '2013-09-17 17:54:21', 1),
(3202, 266, 'BAGUIA', '', 1, '2013-09-17 17:54:53', 1, '2013-09-17 17:54:53', 1),
(3203, 266, 'SANDA', '', 1, '2013-09-17 17:55:16', 1, '2013-09-17 17:55:16', 1),
(3204, 108, 'NAGOYE', '', 1, '2013-09-17 17:55:46', 1, '2013-09-17 17:55:46', 1),
(3205, 266, 'BEKILO', '', 1, '2013-09-17 17:56:06', 1, '2013-09-17 17:56:06', 1),
(3206, 108, 'FANGA', '', 1, '2013-09-17 17:56:14', 1, '2013-09-17 17:56:14', 1),
(3207, 266, 'TANENE', '', 1, '2013-09-17 17:57:26', 1, '2013-09-17 17:57:26', 1),
(3208, 266, 'KOUYEYA', '', 1, '2013-09-17 17:58:55', 1, '2013-09-17 17:58:55', 1),
(3209, 266, 'YONKAYA', '', 1, '2013-09-17 17:59:17', 1, '2013-09-17 17:59:17', 1),
(3210, 107, 'CAMBAYA', '', 1, '2013-09-17 17:59:21', 1, '2013-09-17 17:59:21', 1),
(3211, 105, 'WORA MISSIDE', '', 1, '2013-09-17 18:00:21', 1, '2013-09-17 18:00:21', 1),
(3212, 105, 'PELISSARE', '', 1, '2013-09-17 18:00:56', 1, '2013-09-17 18:00:56', 1),
(3213, 105, 'HAMDALLAYE', '', 1, '2013-09-17 18:01:27', 1, '2013-09-17 18:01:27', 1),
(3214, 266, 'KONDOYA', '', 1, '2013-09-17 18:01:50', 1, '2013-09-17 18:01:50', 1),
(3215, 105, 'DALY', '', 1, '2013-09-17 18:02:02', 1, '2013-09-17 18:02:02', 1),
(3216, 105, 'BAKONY', '', 1, '2013-09-17 18:02:35', 1, '2013-09-17 18:02:35', 1),
(3217, 105, 'HAFIA KAEDIORA', '', 1, '2013-09-17 18:03:13', 1, '2013-09-17 18:03:13', 1),
(3218, 98, 'NIAFOU', '', 1, '2013-09-17 18:04:18', 1, '2013-09-17 18:04:18', 1),
(3219, 98, 'KOUNSSI', '', 1, '2013-09-17 18:04:57', 1, '2013-09-17 18:04:57', 1),
(3220, 94, 'THIAE TORMOSSO', '', 1, '2013-09-17 18:06:59', 1, '2013-09-17 18:06:59', 1),
(3221, 94, 'LONNA', '', 1, '2013-09-17 18:07:51', 1, '2013-09-17 18:07:51', 1),
(3222, 93, 'SERNE', '', 1, '2013-09-17 18:08:48', 1, '2013-09-17 18:08:48', 1),
(3223, 93, 'KAMATINGUE', '', 1, '2013-09-17 18:09:13', 1, '2013-09-17 18:09:13', 1),
(3224, 93, 'DIAFOUNOUN', '', 1, '2013-09-17 18:09:43', 1, '2013-09-17 18:09:43', 1),
(3225, 93, 'MALEAH', '', 1, '2013-09-17 18:10:15', 1, '2013-09-17 18:10:15', 1),
(3226, 93, 'BHOUNDOU BARKE', '', 1, '2013-09-17 18:11:36', 1, '2013-09-17 18:11:36', 1),
(3227, 92, 'KOLIA', '', 1, '2013-09-17 18:13:24', 1, '2013-09-17 18:13:24', 1),
(3228, 92, 'KOKOLOU', '', 1, '2013-09-17 18:13:56', 1, '2013-09-17 18:13:56', 1),
(3229, 92, 'LINSAN 2', '', 1, '2013-09-17 18:14:44', 1, '2013-09-17 18:14:44', 1),
(3230, 91, 'PEGUETY', '', 1, '2013-09-17 18:16:34', 1, '2013-09-17 18:16:34', 1),
(3231, 91, 'DOGHOL TIMBOBHE', '', 1, '2013-09-17 18:17:12', 1, '2013-09-17 18:17:12', 1),
(3232, 91, 'TOWNDE', '', 1, '2013-09-17 18:17:58', 1, '2013-09-17 18:17:58', 1),
(3233, 90, 'KENTE', '', 1, '2013-09-17 18:19:11', 1, '2013-09-17 18:19:11', 14),
(3234, 89, 'POUNTA N\\\'DEYLEL', '', 1, '2013-09-17 18:21:09', 1, '2013-09-17 18:21:09', 1),
(3235, 89, 'THIELIRE', '', 1, '2013-09-17 18:21:59', 1, '2013-09-17 18:21:59', 1),
(3236, 267, 'BEYEN-BEYEN', '', 1, '2013-09-17 18:22:26', 1, '2013-09-17 18:22:26', 1),
(3237, 89, 'HENERE', '', 1, '2013-09-17 18:22:35', 1, '2013-09-17 18:22:35', 1),
(3238, 88, 'TINKIN', '', 1, '2013-09-17 18:23:29', 1, '2013-09-17 18:23:29', 1),
(3239, 88, 'N\\\'DANTARY THIOBHOYE', '', 1, '2013-09-17 18:24:01', 1, '2013-09-17 18:24:01', 1),
(3240, 267, 'BADET KANTY', '', 1, '2013-09-17 18:24:21', 1, '2013-09-17 18:24:21', 1),
(3241, 267, 'WASSOU', '', 1, '2013-09-17 18:24:43', 1, '2013-09-17 18:24:43', 1),
(3242, 88, 'DIOUNTOU PETOYE', '', 1, '2013-09-17 18:25:16', 1, '2013-09-17 18:25:16', 1),
(3243, 267, 'SAMIENKHOURE', '', 1, '2013-09-17 18:25:57', 1, '2013-09-17 18:25:57', 1),
(3244, 20, 'SOROMIATA I', '', 1, '2013-09-17 18:26:02', 1, '2013-09-17 18:26:02', 1),
(3245, 86, 'SANAMA', '', 1, '2013-09-17 18:26:13', 1, '2013-09-17 18:26:13', 1),
(3246, 20, 'SERENGBARA', '', 1, '2013-09-17 18:26:32', 1, '2013-09-17 18:26:32', 1),
(3247, 86, 'DIALA 2', '', 1, '2013-09-17 18:26:52', 1, '2013-09-17 18:26:52', 1),
(3248, 267, 'SEKOUSORIA', '', 1, '2013-09-17 18:26:52', 1, '2013-09-17 18:26:52', 1),
(3249, 20, 'THIASSOU', '', 1, '2013-09-17 18:26:57', 1, '2013-09-17 18:26:57', 1),
(3250, 267, 'HAUT-SIMBARAYA', '', 1, '2013-09-17 18:27:45', 1, '2013-09-17 18:27:45', 1),
(3252, 267, 'LANSANAYA', '', 1, '2013-09-17 18:28:23', 1, '2013-09-17 18:28:23', 1),
(3253, 96, 'HORE HOLLANDE', '', 1, '2013-09-17 18:29:04', 1, '2013-09-17 18:29:04', 1),
(3254, 96, 'SENTOU', '', 1, '2013-09-17 18:29:36', 1, '2013-09-17 18:29:36', 1),
(3255, 19, 'TIETA', '', 1, '2013-09-17 18:29:56', 1, '2013-09-17 18:29:56', 1),
(3256, 268, 'GBINKILY', '', 1, '2013-09-17 18:30:15', 1, '2013-09-17 18:30:15', 1),
(3257, 268, 'KHOLIBAYAH', '', 1, '2013-09-17 18:31:14', 1, '2013-09-17 18:31:14', 1),
(3258, 19, 'WOROYA-PO', '', 1, '2013-09-17 18:31:15', 1, '2013-09-17 18:31:15', 1),
(3259, 96, 'KIMBELY', '', 1, '2013-09-17 18:31:58', 1, '2013-09-17 18:31:58', 1),
(3260, 19, 'TOKPANATA', '', 1, '2013-09-17 18:32:07', 1, '2013-09-17 18:32:07', 1),
(3261, 96, 'DENA', '', 1, '2013-09-17 18:32:33', 1, '2013-09-17 18:32:33', 1),
(3262, 268, 'KHALIGORO', '', 1, '2013-09-17 18:32:50', 1, '2013-09-17 18:32:50', 1),
(3263, 96, 'MISSIRA', '', 1, '2013-09-17 18:33:09', 1, '2013-09-17 18:33:09', 1),
(3264, 19, 'ZOUGOUETA I', '', 1, '2013-09-17 18:33:15', 1, '2013-09-17 18:33:15', 1),
(3265, 96, 'BOSSE', '', 1, '2013-09-17 18:33:38', 1, '2013-09-17 18:33:38', 1),
(3266, 96, 'N\\\'DANTARY OURY', '', 1, '2013-09-17 18:34:05', 1, '2013-09-17 18:34:05', 1),
(3267, 19, 'GOGOTA II', '', 1, '2013-09-17 18:34:12', 1, '2013-09-17 18:34:12', 1),
(3268, 269, 'MOLOTA II', '', 1, '2013-09-17 18:35:34', 1, '2013-09-17 18:35:34', 1),
(3269, 94, 'THIEWE', '', 1, '2013-09-17 18:35:40', 1, '2013-09-17 18:35:40', 1),
(3270, 95, 'THIEWE', '', 1, '2013-09-17 18:36:07', 1, '2013-09-17 18:36:07', 1),
(3271, 269, 'KOUNDAYA', '', 1, '2013-09-17 18:36:47', 1, '2013-09-17 18:36:47', 1),
(3272, 87, 'MADINA DIAN', '', 1, '2013-09-17 18:37:17', 1, '2013-09-17 18:37:17', 1),
(3273, 269, 'BAKHAYAKHORY I', '', 1, '2013-09-17 18:37:52', 1, '2013-09-17 18:37:52', 1),
(3274, 87, 'HOORE DIOLI', '', 1, '2013-09-17 18:37:55', 1, '2013-09-17 18:37:55', 1),
(3275, 269, 'MAMBIA', '', 1, '2013-09-17 18:38:15', 1, '2013-09-17 18:38:15', 1),
(3276, 19, 'L&Ouml;MOU', '', 1, '2013-09-17 18:38:33', 1, '2013-09-17 18:38:33', 1),
(3277, 269, 'SAANYA', '', 1, '2013-09-17 18:38:56', 1, '2013-09-17 18:38:56', 1),
(3278, 75, 'BOWE BHOUBHA', '', 1, '2013-09-17 18:39:15', 1, '2013-09-17 18:39:15', 1),
(3279, 269, 'KALEKHOURE', '', 1, '2013-09-17 18:39:27', 1, '2013-09-17 18:39:27', 1),
(3280, 75, 'LEY THIANDHY', '', 1, '2013-09-17 18:40:20', 1, '2013-09-17 18:40:20', 1),
(3281, 75, 'TEGUEGNEN', '', 1, '2013-09-17 18:40:45', 1, '2013-09-17 18:40:45', 1),
(3282, 19, 'GAMA YALE', '', 1, '2013-09-17 18:40:50', 1, '2013-09-17 18:40:50', 1),
(3283, 75, 'HORE FELLO', '', 1, '2013-09-17 18:41:25', 1, '2013-09-17 18:41:25', 1),
(3284, 270, 'DANTOUMAYA', '', 1, '2013-09-17 18:42:07', 1, '2013-09-17 18:42:07', 1),
(3285, 74, 'MADINATOU SALAM', '', 1, '2013-09-17 18:42:15', 1, '2013-09-17 18:42:15', 1),
(3286, 270, 'MISSIRA', '', 1, '2013-09-17 18:42:48', 1, '2013-09-17 18:42:48', 1),
(3287, 73, 'SOFOYA', '', 1, '2013-09-17 18:43:00', 1, '2013-09-17 18:43:00', 1),
(3288, 73, 'DAMBATA', '', 1, '2013-09-17 18:43:26', 1, '2013-09-17 18:43:26', 1),
(3289, 270, 'YEMBETA', '', 1, '2013-09-17 18:43:59', 1, '2013-09-17 18:43:59', 1),
(3290, 73, 'HANSAGUERE', '', 1, '2013-09-17 18:44:05', 1, '2013-09-17 18:44:05', 1),
(3291, 19, 'HOMIAKOLY II', '', 1, '2013-09-17 18:44:36', 1, '2013-09-17 18:44:36', 1),
(3292, 270, 'CONDETTA', '', 1, '2013-09-17 18:44:44', 1, '2013-09-17 18:44:44', 1),
(3293, 71, 'HAFIA MADINA', '', 1, '2013-09-17 18:45:14', 1, '2013-09-17 18:45:14', 1),
(3294, 71, 'SENGOUMA', '', 1, '2013-09-17 18:45:48', 1, '2013-09-17 18:45:48', 1),
(3295, 71, 'BESSEYA', '', 1, '2013-09-17 18:46:12', 1, '2013-09-17 18:46:12', 1),
(3296, 270, 'SORONDO', '', 1, '2013-09-17 18:46:16', 1, '2013-09-17 18:46:16', 1),
(3297, 19, 'SOUOWALAKOLY II', '', 1, '2013-09-17 18:46:37', 1, '2013-09-17 18:46:37', 1),
(3298, 270, 'KHONIA', '', 1, '2013-09-17 18:47:05', 1, '2013-09-17 18:47:05', 1),
(3299, 19, 'TIGHEN-MO I', '', 1, '2013-09-17 18:48:24', 1, '2013-09-17 18:48:24', 1),
(3300, 19, 'TIGHEN-MO II', '', 1, '2013-09-17 18:48:37', 1, '2013-09-17 18:48:37', 1),
(3301, 270, 'MALEAH', '', 1, '2013-09-17 18:48:49', 1, '2013-09-17 18:48:49', 1),
(3302, 70, 'DOUKA GNOGUEYABHE', '', 1, '2013-09-18 09:28:41', 1, '2013-09-18 09:28:41', 1),
(3303, 69, 'GAYA', '', 1, '2013-09-18 09:30:42', 1, '2013-09-18 09:30:42', 1),
(3304, 69, 'MADINA N\\\'DIRE', '', 1, '2013-09-18 09:32:03', 1, '2013-09-18 09:32:03', 1),
(3305, 271, 'SOUGUETA I', '', 1, '2013-09-18 09:33:00', 1, '2013-09-18 09:33:00', 1),
(3306, 68, 'HORE WOULOUN', '', 1, '2013-09-18 09:33:01', 1, '2013-09-18 09:33:01', 1),
(3307, 68, 'DALEIN HINDE', '', 1, '2013-09-18 09:33:35', 1, '2013-09-18 09:33:35', 1),
(3308, 68, 'BAMBE', '', 1, '2013-09-18 09:34:05', 1, '2013-09-18 09:34:05', 1),
(3309, 68, 'MADINA KANSAGHI', '', 1, '2013-09-18 09:34:57', 1, '2013-09-18 09:34:57', 1),
(3310, 271, 'KHALYA', '', 1, '2013-09-18 09:35:41', 1, '2013-09-18 09:35:41', 1),
(3311, 79, 'NIAWORO', '', 1, '2013-09-18 09:35:43', 1, '2013-09-18 09:35:43', 1),
(3312, 79, 'BALAYA', '', 1, '2013-09-18 09:36:07', 1, '2013-09-18 09:36:07', 1),
(3313, 79, 'LARIAH', '', 1, '2013-09-18 09:36:34', 1, '2013-09-18 09:36:34', 1),
(3314, 271, 'WALYA', '', 1, '2013-09-18 09:36:38', 1, '2013-09-18 09:36:38', 1),
(3315, 79, 'KAMBAYA', '', 1, '2013-09-18 09:37:01', 1, '2013-09-18 09:37:01', 1),
(3316, 271, 'BOUBOUYAH', '', 1, '2013-09-18 09:37:13', 1, '2013-09-18 09:37:13', 1),
(3317, 271, 'KAMBA', '', 1, '2013-09-18 09:37:45', 1, '2013-09-18 09:37:45', 1),
(3318, 78, 'DIGUILIN', '', 1, '2013-09-18 09:38:26', 1, '2013-09-18 09:38:26', 1),
(3319, 271, 'BALANDOUGOU', '', 1, '2013-09-18 09:38:41', 1, '2013-09-18 09:38:41', 1),
(3320, 271, 'DONYA', '', 1, '2013-09-18 09:39:43', 1, '2013-09-18 09:39:43', 1),
(3321, 77, 'KIGNA', '', 1, '2013-09-18 09:39:49', 1, '2013-09-18 09:39:49', 1),
(3322, 77, 'DOUKA SELEYABHE', '', 1, '2013-09-18 09:40:15', 1, '2013-09-18 09:40:15', 1),
(3323, 77, 'SILORBHE', '', 1, '2013-09-18 09:40:58', 1, '2013-09-18 09:40:58', 1),
(3324, 271, 'YOMBOYAH', '', 1, '2013-09-18 09:41:04', 1, '2013-09-18 09:41:04', 1),
(3325, 77, 'POPODARA II', '', 1, '2013-09-18 09:41:44', 1, '2013-09-18 09:41:44', 1),
(3326, 77, 'GARKI', '', 1, '2013-09-18 09:42:15', 1, '2013-09-18 09:42:15', 1),
(3327, 77, 'POPODARA I', '', 1, '2013-09-18 09:42:46', 1, '2013-09-18 09:42:46', 1),
(3328, 76, 'KOURE', '', 1, '2013-09-18 09:43:40', 1, '2013-09-18 09:43:40', 1),
(3329, 76, 'TOMBON', '', 1, '2013-09-18 09:44:18', 1, '2013-09-18 09:44:18', 1),
(3330, 76, 'N\\\'DANTAWI', '', 1, '2013-09-18 09:44:50', 1, '2013-09-18 09:44:50', 1),
(3331, 76, 'MOLOKO', '', 1, '2013-09-18 09:45:17', 1, '2013-09-18 09:45:17', 1),
(3332, 53, 'ZIPOVA&Iuml;ZEA', '', 1, '2013-09-18 09:45:37', 1, '2013-09-18 09:45:37', 1),
(3333, 67, 'KANKADY', '', 1, '2013-09-18 09:46:01', 1, '2013-09-18 09:46:01', 1),
(3334, 53, 'DIGUILAZOU', '', 1, '2013-09-18 09:46:11', 1, '2013-09-18 09:46:11', 1),
(3335, 21, 'FOUMBADOU II', '', 1, '2013-09-18 09:46:39', 1, '2013-09-18 09:46:39', 1),
(3336, 76, 'KANKADY', '', 1, '2013-09-18 09:46:39', 1, '2013-09-18 09:46:39', 1),
(3337, 21, 'FAKROUDOUBA', '', 1, '2013-09-18 09:47:21', 1, '2013-09-18 09:47:21', 1),
(3338, 53, 'MASSAME', '', 1, '2013-09-18 09:47:32', 1, '2013-09-18 09:47:32', 1),
(3339, 21, 'FABORIDOU', '', 1, '2013-09-18 09:47:42', 1, '2013-09-18 09:47:42', 1),
(3340, 76, 'KOURAKO', '', 1, '2013-09-18 09:47:48', 1, '2013-09-18 09:47:48', 1),
(3341, 53, 'PASSIMA', '', 1, '2013-09-18 09:47:58', 1, '2013-09-18 09:47:58', 1),
(3342, 21, 'VAMORODOU', '', 1, '2013-09-18 09:48:58', 1, '2013-09-18 09:48:58', 1),
(3343, 54, 'DIODOU', '', 1, '2013-09-18 09:50:02', 1, '2013-09-18 09:50:02', 1),
(3344, 54, 'KONESSEREDOU', '', 1, '2013-09-18 09:51:07', 1, '2013-09-18 09:51:07', 1),
(3345, 22, 'GAMA BEREMA CENTRE  ', '', 1, '2013-09-18 09:51:20', 1, '2013-09-18 09:51:20', 1),
(3346, 67, 'LOMBONNA', '', 1, '2013-09-18 09:51:46', 1, '2013-09-18 09:51:46', 1),
(3347, 54, 'SAMPORIA', '', 1, '2013-09-18 09:51:50', 1, '2013-09-18 09:51:50', 1),
(3348, 22, 'GBAATA', '', 1, '2013-09-18 09:52:15', 1, '2013-09-18 09:52:15', 1),
(3349, 67, 'KOUROULA', '', 1, '2013-09-18 09:53:09', 1, '2013-09-18 09:53:09', 1),
(3350, 67, 'BAMBAYA', '', 1, '2013-09-18 09:54:31', 1, '2013-09-18 09:54:31', 1),
(3351, 23, 'GUEASSO CENTRE  II', '', 1, '2013-09-18 09:54:54', 1, '2013-09-18 09:54:54', 1),
(3352, 23, 'GARASSOU', '', 1, '2013-09-18 09:55:43', 1, '2013-09-18 09:55:43', 1),
(3353, 85, 'THIEWIRE', '', 1, '2013-09-18 09:56:00', 1, '2013-09-18 09:56:00', 1),
(3354, 85, 'MADINA BELLY', '', 1, '2013-09-18 09:56:42', 1, '2013-09-18 09:56:42', 1),
(3355, 85, 'TOLIN', '', 1, '2013-09-18 09:57:53', 1, '2013-09-18 09:57:53', 1),
(3356, 85, 'BAGATA', '', 1, '2013-09-18 09:58:23', 1, '2013-09-18 09:58:23', 1),
(3357, 55, 'GBELELAZOU', '', 1, '2013-09-18 09:58:28', 1, '2013-09-18 09:58:28', 1),
(3358, 85, 'MBOUDARE', '', 1, '2013-09-18 09:58:54', 1, '2013-09-18 09:58:54', 1),
(3359, 85, 'SARE LENGUE', '', 1, '2013-09-18 09:59:23', 1, '2013-09-18 09:59:23', 1),
(3360, 56, 'KOTIZOU', '', 1, '2013-09-18 09:59:32', 1, '2013-09-18 09:59:32', 1),
(3361, 85, 'LEY SOUGUE', '', 1, '2013-09-18 09:59:51', 1, '2013-09-18 09:59:51', 1),
(3362, 56, 'DELEOU', '', 1, '2013-09-18 09:59:52', 1, '2013-09-18 09:59:52', 1),
(3363, 56, 'SAKPAOU', '', 1, '2013-09-18 10:00:13', 1, '2013-09-18 10:00:13', 1),
(3364, 25, 'LAINE CENTRE I', '', 1, '2013-09-18 10:00:43', 1, '2013-09-18 10:00:43', 1),
(3365, 56, 'SENGBEDOU I', '', 1, '2013-09-18 10:00:44', 1, '2013-09-18 10:00:44', 1),
(3366, 84, 'BOLE N\\\'DANTABA', '', 1, '2013-09-18 10:00:45', 1, '2013-09-18 10:00:45', 1),
(3367, 25, 'DEEN', '', 1, '2013-09-18 10:01:04', 1, '2013-09-18 10:01:04', 1),
(3368, 25, 'KOLATA', '', 1, '2013-09-18 10:01:34', 1, '2013-09-18 10:01:34', 1),
(3369, 25, 'DIDITA', '', 1, '2013-09-18 10:01:47', 1, '2013-09-18 10:01:47', 1),
(3370, 56, 'KPANDEWALADOU', '', 1, '2013-09-18 10:02:15', 1, '2013-09-18 10:02:15', 1),
(3371, 83, 'BASSARA', '', 1, '2013-09-18 10:02:40', 1, '2013-09-18 10:02:40', 1),
(3372, 56, 'PAZIAZOU', '', 1, '2013-09-18 10:03:02', 1, '2013-09-18 10:03:02', 1),
(3374, 26, 'N\\\'ZOO CENTRE II', '', 1, '2013-09-18 10:03:43', 1, '2013-09-18 10:03:43', 1),
(3375, 56, 'KOMODOU', '', 1, '2013-09-18 10:03:53', 1, '2013-09-18 10:03:53', 1),
(3376, 83, 'KONTOMA', '', 1, '2013-09-18 10:04:23', 1, '2013-09-18 10:04:23', 1),
(3377, 83, 'MATAKAOU CENTRE', '', 1, '2013-09-18 10:04:54', 1, '2013-09-18 10:04:54', 1),
(3378, 83, 'NIANNOU MISSIDE', '', 1, '2013-09-18 10:05:48', 1, '2013-09-18 10:05:48', 1),
(3379, 82, 'GNAARA', '', 1, '2013-09-18 10:06:59', 1, '2013-09-18 10:06:59', 1),
(3380, 57, 'ZINIKOROZOU', '', 1, '2013-09-18 10:07:06', 1, '2013-09-18 10:07:06', 1),
(3381, 27, 'KOGOTA', '', 1, '2013-09-18 10:07:10', 1, '2013-09-18 10:07:49', 1),
(3382, 82, 'BORIKO', '', 1, '2013-09-18 10:07:27', 1, '2013-09-18 10:07:27', 1),
(3383, 82, 'N\\\'DIRE', '', 1, '2013-09-18 10:07:50', 1, '2013-09-18 10:07:50', 1),
(3384, 82, 'TIMBERING', '', 1, '2013-09-18 10:08:19', 1, '2013-09-18 10:08:19', 1),
(3385, 57, 'MAKABOU', '', 1, '2013-09-18 10:08:53', 1, '2013-09-18 10:08:53', 1),
(3386, 27, 'BOUZOUTA', '', 1, '2013-09-18 10:09:08', 1, '2013-09-18 10:09:08', 1),
(3387, 81, 'SOULOUNDE', '', 1, '2013-09-18 10:09:16', 1, '2013-09-18 10:09:16', 1),
(3388, 81, 'PALET', '', 1, '2013-09-18 10:09:39', 1, '2013-09-18 10:09:39', 1),
(3389, 81, 'MADINA BAMBAYA', '', 1, '2013-09-18 10:10:19', 1, '2013-09-18 10:10:19', 1),
(3390, 81, 'DAROU', '', 1, '2013-09-18 10:10:46', 1, '2013-09-18 10:10:46', 1),
(3391, 58, 'DANDANO I', '', 1, '2013-09-18 10:11:25', 1, '2013-09-18 10:11:25', 1),
(3392, 81, 'MARWATA', '', 1, '2013-09-18 10:11:47', 1, '2013-09-18 10:11:47', 1),
(3393, 58, 'KOUANKAN I', '', 1, '2013-09-18 10:12:24', 1, '2013-09-18 10:12:24', 1),
(3394, 80, 'MALAMMA', '', 1, '2013-09-18 10:13:04', 1, '2013-09-18 10:13:04', 1),
(3395, 80, 'MISSIRA TIMBHOBHE', '', 1, '2013-09-18 10:13:38', 1, '2013-09-18 10:13:38', 1),
(3396, 58, 'KORELA', '', 1, '2013-09-18 10:13:49', 1, '2013-09-18 10:13:49', 1),
(3397, 58, 'SAKOEDOU', '', 1, '2013-09-18 10:14:14', 1, '2013-09-18 10:14:14', 1),
(3398, 58, 'KAMENA', '', 1, '2013-09-18 10:14:42', 1, '2013-09-18 10:14:42', 1),
(3399, 29, 'BOOLA II', '', 1, '2013-09-18 10:15:06', 1, '2013-09-18 10:15:06', 1),
(3400, 80, 'KABELEYA', '', 1, '2013-09-18 10:15:10', 1, '2013-09-18 10:15:10', 1),
(3401, 80, 'MADINA KORBE', '', 1, '2013-09-18 10:15:53', 1, '2013-09-18 10:15:53', 1),
(3402, 29, 'DIABAMORIDOU', '', 1, '2013-09-18 10:16:14', 1, '2013-09-18 10:16:14', 1),
(3403, 80, 'GORDIO', '', 1, '2013-09-18 10:16:22', 1, '2013-09-18 10:16:22', 1),
(3404, 29, 'DOMANIDOU', '', 1, '2013-09-18 10:16:40', 1, '2013-09-18 10:16:40', 1),
(3405, 80, 'BASSARATA', '', 1, '2013-09-18 10:16:54', 1, '2013-09-18 10:16:54', 1),
(3406, 59, 'OREGUIZEZOU', '', 1, '2013-09-18 10:16:56', 1, '2013-09-18 10:16:56', 1),
(3407, 29, 'KOIDOU', '', 1, '2013-09-18 10:17:40', 1, '2013-09-18 10:17:40', 1),
(3408, 59, 'N\\\'ZAPPAH II', '', 1, '2013-09-18 10:17:50', 1, '2013-09-18 10:17:50', 1),
(3409, 59, 'OULEMAI', '', 1, '2013-09-18 10:18:52', 1, '2013-09-18 10:18:52', 1),
(3410, 29, 'ORATA', '', 1, '2013-09-18 10:18:56', 1, '2013-09-18 10:18:56', 1),
(3411, 59, 'ZEOULEMAI', '', 1, '2013-09-18 10:19:39', 1, '2013-09-18 10:19:39', 1),
(3412, 59, 'ZOUE', '', 1, '2013-09-18 10:19:58', 1, '2013-09-18 10:19:58', 1),
(3413, 59, 'GOZOGUIZEA', '', 1, '2013-09-18 10:21:03', 1, '2013-09-18 10:21:03', 1),
(3414, 59, 'LOPKOOU', '', 1, '2013-09-18 10:21:32', 1, '2013-09-18 10:21:32', 1),
(3415, 59, 'KOYOMAH 2', '', 1, '2013-09-18 10:22:35', 1, '2013-09-18 10:22:35', 1),
(3416, 37, 'SUERO', '', 1, '2013-09-18 10:24:09', 1, '2013-09-18 10:24:09', 1),
(3417, 37, 'SARABEDOU', '', 1, '2013-09-18 10:24:27', 1, '2013-09-18 10:24:27', 1),
(3418, 38, 'KISSIBOULA', '', 1, '2013-09-18 10:26:18', 1, '2013-09-18 10:26:48', 1),
(3419, 52, 'KPANGBALAMAI', '', 1, '2013-09-18 10:27:26', 1, '2013-09-18 10:27:26', 1),
(3420, 38, 'MORIBADOU II', '', 1, '2013-09-18 10:28:00', 1, '2013-09-18 10:28:00', 1),
(3421, 38, 'MAFINDOU', '', 1, '2013-09-18 10:28:56', 1, '2013-09-18 10:28:56', 1),
(3422, 38, 'TRAORELA', '', 1, '2013-09-18 10:29:15', 1, '2013-09-18 10:29:15', 1),
(3423, 39, 'SAMANA I', '', 1, '2013-09-18 10:30:49', 1, '2013-09-18 10:30:49', 1),
(3424, 60, 'BALAGOLAYE', '', 1, '2013-09-18 10:30:59', 1, '2013-09-18 10:30:59', 1),
(3425, 39, 'SABOUYA', '', 1, '2013-09-18 10:31:15', 1, '2013-09-18 10:31:15', 1),
(3426, 60, 'BAYAMAH', '', 1, '2013-09-18 10:31:21', 1, '2013-09-18 10:31:21', 1),
(3427, 39, 'GNANAMANKOUFEREDOU', '', 1, '2013-09-18 10:31:35', 1, '2013-09-18 10:31:35', 1),
(3428, 60, 'OYAFERO', '', 1, '2013-09-18 10:31:40', 1, '2013-09-18 10:31:40', 1),
(3429, 60, 'SILISSOU', '', 1, '2013-09-18 10:31:56', 1, '2013-09-18 10:31:56', 1),
(3430, 39, 'SAMANA CENTRE II', '', 1, '2013-09-18 10:32:00', 1, '2013-09-18 10:32:00', 1),
(3431, 60, 'SIBATA I', '', 1, '2013-09-18 10:32:12', 1, '2013-09-18 10:32:12', 1),
(3432, 61, 'OREMAI CENTRE', '', 1, '2013-09-18 10:34:58', 1, '2013-09-18 10:34:58', 1),
(3433, 61, 'DIOMAI', '', 1, '2013-09-18 10:35:46', 1, '2013-09-18 10:35:46', 1),
(3434, 62, 'LOUYAZOU', '', 1, '2013-09-18 10:36:47', 1, '2013-09-18 10:36:47', 1),
(3435, 63, 'NIALESSOU', '', 1, '2013-09-18 10:38:09', 1, '2013-09-18 10:38:09', 1),
(3436, 40, 'DIANY', '', 1, '2013-09-18 10:38:21', 1, '2013-09-18 10:38:21', 1),
(3437, 63, 'MAKABALADOU', '', 1, '2013-09-18 10:38:48', 1, '2013-09-18 10:38:48', 1),
(3438, 63, 'SIEDOU', '', 1, '2013-09-18 10:39:11', 1, '2013-09-18 10:39:11', 1),
(3439, 63, 'GBOKORODOU', '', 1, '2013-09-18 10:39:31', 1, '2013-09-18 10:39:31', 1),
(3440, 40, 'BIADOU', '', 1, '2013-09-18 10:39:40', 1, '2013-09-18 10:39:40', 1),
(3441, 63, 'FREWALA', '', 1, '2013-09-18 10:39:51', 1, '2013-09-18 10:39:51', 1),
(3442, 63, 'N\\\'ZOYARO', '', 1, '2013-09-18 10:40:16', 1, '2013-09-18 10:40:16', 1),
(3443, 40, 'SORIDOU', '', 1, '2013-09-18 10:40:56', 1, '2013-09-18 10:40:56', 1),
(3444, 40, 'BOKOMESSIN', '', 1, '2013-09-18 10:41:32', 1, '2013-09-18 10:41:32', 1),
(3445, 40, 'MOAKO', '', 1, '2013-09-18 10:42:00', 1, '2013-09-18 10:42:00', 1),
(3446, 40, 'NAFAYA', '', 1, '2013-09-18 10:42:20', 1, '2013-09-18 10:42:20', 1),
(3447, 40, 'DOUGBE', '', 1, '2013-09-18 10:42:42', 1, '2013-09-18 10:42:42', 1),
(3448, 64, 'AVILISSOU', '', 1, '2013-09-18 10:43:22', 1, '2013-09-18 10:43:22', 1),
(3449, 40, 'N\\\'KRUMAH', '', 1, '2013-09-18 10:44:02', 1, '2013-09-18 10:44:02', 1),
(3450, 64, 'BALOMA', '', 1, '2013-09-18 10:44:17', 1, '2013-09-18 10:44:17', 1),
(3451, 64, 'KOIMA', '', 1, '2013-09-18 10:44:36', 1, '2013-09-18 10:44:36', 1),
(3452, 40, 'M\\\'BALIA', '', 1, '2013-09-18 10:44:46', 1, '2013-09-18 10:44:46', 1),
(3453, 40, 'LUMUMBA', '', 1, '2013-09-18 10:45:17', 1, '2013-09-18 10:45:17', 1),
(3454, 65, 'WAMADOU', '', 1, '2013-09-18 10:46:09', 1, '2013-09-18 10:46:09', 1),
(3455, 40, 'BENGOA', '', 1, '2013-09-18 10:46:09', 1, '2013-09-18 10:46:09', 1),
(3456, 65, 'BROGNADOU', '', 1, '2013-09-18 10:46:32', 1, '2013-09-18 10:46:32', 1),
(3457, 65, 'KABAKORO', '', 1, '2013-09-18 10:46:49', 1, '2013-09-18 10:46:49', 1),
(3458, 65, 'KOULODOU', '', 1, '2013-09-18 10:47:06', 1, '2013-09-18 10:47:06', 1),
(3459, 66, 'AOLAZOU', '', 1, '2013-09-18 10:48:24', 1, '2013-09-18 10:48:24', 1),
(3460, 28, 'MORISANGAREDOU', '', 1, '2013-09-18 10:48:55', 1, '2013-09-18 10:48:55', 1),
(3461, 66, 'KOZEZOU', '', 1, '2013-09-18 10:49:09', 1, '2013-09-18 10:49:09', 1),
(3462, 28, 'KO&Iuml;MORIDOU', '', 1, '2013-09-18 10:49:18', 1, '2013-09-18 10:49:18', 1),
(3463, 66, 'KOBALAWA', '', 1, '2013-09-18 10:49:27', 1, '2013-09-18 10:49:27', 1),
(3464, 28, 'DIAKORO', '', 1, '2013-09-18 10:49:59', 1, '2013-09-18 10:49:59', 1),
(3465, 66, 'GOYALA', '', 1, '2013-09-18 10:50:19', 1, '2013-09-18 10:50:19', 1),
(3466, 28, 'DOUKOURELA', '', 1, '2013-09-18 10:50:22', 1, '2013-09-18 10:50:22', 1),
(3467, 28, 'GBORO', '', 1, '2013-09-18 10:50:44', 1, '2013-09-18 10:50:44', 1),
(3468, 28, 'KISSIBOU', '', 1, '2013-09-18 10:51:13', 1, '2013-09-18 10:51:13', 1),
(3469, 28, 'KEME BOUREMA', '', 1, '2013-09-18 10:52:45', 1, '2013-09-18 10:52:45', 1),
(3470, 28, 'FEREBORY CAMARA', '', 1, '2013-09-18 10:53:06', 1, '2013-09-18 10:53:06', 1),
(3471, 28, 'DRAME OUMAR', '', 1, '2013-09-18 10:53:40', 1, '2013-09-18 10:53:40', 1),
(3472, 28, 'SAMORY TOURE', '', 1, '2013-09-18 10:54:09', 1, '2013-09-18 10:54:09', 1),
(3473, 3, 'GBAHAYE', '', 1, '2013-09-18 10:55:13', 1, '2013-09-18 10:55:13', 1),
(3474, 3, 'VAKAMOTA-SAGNO', '', 1, '2013-09-18 10:56:14', 1, '2013-09-18 10:56:14', 1),
(3475, 30, 'VAFEREDOU', '', 1, '2013-09-18 10:57:21', 1, '2013-09-18 10:57:21', 1),
(3476, 30, 'TOUBAKON&Ouml;', '', 1, '2013-09-18 10:57:49', 1, '2013-09-18 10:57:49', 1),
(3477, 4, 'KOBILA II', '', 1, '2013-09-18 10:58:16', 1, '2013-09-18 10:58:16', 1),
(3478, 31, 'WANZONA', '', 1, '2013-09-18 10:59:02', 1, '2013-09-18 10:59:02', 1),
(3479, 31, 'DIARRADOU', '', 1, '2013-09-18 10:59:19', 1, '2013-09-18 10:59:19', 1),
(3480, 31, 'TANGODOU', '', 1, '2013-09-18 10:59:35', 1, '2013-09-18 10:59:35', 1),
(3482, 32, 'ALLAMADOU', '', 1, '2013-09-18 11:00:58', 1, '2013-09-18 11:00:58', 1),
(3483, 32, 'DOUBADOU', '', 1, '2013-09-18 11:01:39', 1, '2013-09-18 11:01:39', 1),
(3484, 33, 'KOUBEDOU', '', 1, '2013-09-18 11:05:36', 1, '2013-09-18 11:05:36', 1),
(3485, 34, 'BIRAMADOU', '', 1, '2013-09-18 11:08:17', 1, '2013-09-18 11:08:17', 1),
(3486, 34, 'FAKOUROUSSO', '', 1, '2013-09-18 11:09:07', 1, '2013-09-18 11:09:07', 1),
(3487, 6, 'KOULE II', '', 1, '2013-09-18 11:09:17', 1, '2013-09-18 11:09:17', 1),
(3488, 34, 'MANGBA', '', 1, '2013-09-18 11:09:23', 1, '2013-09-18 11:09:23', 1),
(3489, 6, 'KOULE I', '', 1, '2013-09-18 11:09:40', 1, '2013-09-18 11:09:40', 1),
(3491, 34, 'BLANGBA', '', 1, '2013-09-18 11:10:34', 1, '2013-09-18 11:10:34', 1),
(3493, 34, 'DJEMENE', '', 1, '2013-09-18 11:10:50', 1, '2013-09-18 11:10:50', 1),
(3494, 7, 'OUEYE', '', 1, '2013-09-18 11:10:53', 1, '2013-09-18 11:46:41', 1),
(3496, 7, 'ZOGBEANTA', '', 1, '2013-09-18 11:11:30', 1, '2013-09-18 11:46:17', 1),
(3497, 35, 'KARALA II', '', 1, '2013-09-18 11:12:55', 1, '2013-09-18 11:12:55', 1),
(3498, 35, 'GBONA', '', 1, '2013-09-18 11:13:41', 1, '2013-09-18 11:13:41', 1),
(3499, 1, 'NAKOYAKPALA', '', 1, '2013-09-18 11:14:21', 1, '2013-09-18 11:14:21', 1),
(3500, 1, 'SOKOURA II', '', 1, '2013-09-18 11:15:05', 1, '2013-09-18 11:15:05', 1),
(3501, 1, 'SOKOURA I', '', 1, '2013-09-18 11:15:22', 1, '2013-09-18 11:15:22', 1),
(3502, 36, 'FAMORODOU', '', 1, '2013-09-18 11:15:38', 1, '2013-09-18 11:15:38', 1),
(3503, 1, 'NYEN I', '', 1, '2013-09-18 11:15:41', 1, '2013-09-18 11:15:41', 1),
(3504, 1, 'NYEN II', '', 1, '2013-09-18 11:15:54', 1, '2013-09-18 11:15:54', 1),
(3505, 36, 'TOUBAKORO', '', 1, '2013-09-18 11:16:01', 1, '2013-09-18 11:16:01', 1),
(3506, 1, 'HOROYA I', '', 1, '2013-09-18 11:16:45', 1, '2013-09-18 11:16:45', 1),
(3507, 1, 'WESSOUA', '', 1, '2013-09-18 11:17:29', 1, '2013-09-18 11:17:29', 1),
(3508, 1, 'KPOYEBA', '', 1, '2013-09-18 11:20:26', 1, '2013-09-18 11:20:26', 1),
(3509, 1, 'GONIA II', '', 1, '2013-09-18 11:21:47', 1, '2013-09-18 11:21:47', 1),
(3510, 1, 'GONIA I', '', 1, '2013-09-18 11:22:01', 1, '2013-09-18 11:22:01', 1),
(3511, 1, 'ZEBELA TOGBA', '', 1, '2013-09-18 11:23:14', 1, '2013-09-18 11:23:14', 1),
(3512, 1, 'DOROTA I', '', 1, '2013-09-18 11:24:25', 1, '2013-09-18 11:24:25', 1),
(3513, 1, 'BELLE VUE', '', 1, '2013-09-18 11:25:50', 1, '2013-09-18 11:25:50', 1),
(3514, 7, 'KEORAH', '', 1, '2013-09-18 11:45:01', 1, '2013-09-18 11:45:01', 1),
(3515, 8, 'KONALA', '', 1, '2013-09-18 11:50:10', 1, '2013-09-18 11:50:10', 1),
(3516, 8, 'KOULE SUD', '', 1, '2013-09-18 11:51:06', 1, '2013-09-18 11:51:06', 1),
(3517, 9, 'SOULOUTA', '', 1, '2013-09-18 11:54:37', 1, '2013-09-18 11:54:37', 1),
(3518, 9, 'KOLA', '', 1, '2013-09-18 11:55:06', 1, '2013-09-18 11:55:06', 1),
(3519, 9, 'GOUH', '', 1, '2013-09-18 11:56:38', 1, '2013-09-18 11:56:38', 1),
(3520, 43, 'MAFENDOU', '', 1, '2013-09-18 12:03:35', 1, '2013-09-18 12:03:35', 1),
(3521, 43, 'KONGOTE', '', 1, '2013-09-18 12:04:37', 1, '2013-09-18 12:04:37', 1),
(3522, 11, 'LOULE NORD', '', 1, '2013-09-18 12:05:12', 1, '2013-09-18 12:05:12', 1),
(3523, 11, 'N\\\'ZAO', '', 1, '2013-09-18 12:06:13', 1, '2013-09-18 12:06:13', 1),
(3524, 11, 'TOULEMOU', '', 1, '2013-09-18 12:07:05', 1, '2013-09-18 12:07:05', 1),
(3525, 11, 'BANGOUETA', '', 1, '2013-09-18 12:07:28', 1, '2013-09-18 12:07:28', 1),
(3526, 51, 'KINDIA', '', 1, '2013-09-18 12:08:01', 1, '2013-09-18 12:08:01', 1),
(3527, 11, 'MAOTA', '', 1, '2013-09-18 12:08:09', 1, '2013-09-18 12:08:09', 1),
(3528, 11, 'LOUKELE', '', 1, '2013-09-18 12:08:50', 1, '2013-09-18 12:08:50', 1),
(3529, 43, 'KOUAKORO', '', 1, '2013-09-18 12:08:52', 1, '2013-09-18 12:08:52', 1),
(3530, 1, 'DIECKENY', '', 1, '2013-09-18 12:12:17', 1, '2013-09-18 12:12:17', 1),
(3531, 42, 'BALLADOU', '', 1, '2013-09-18 12:12:43', 1, '2013-09-18 12:12:43', 1),
(3532, 42, 'GNALENKO', '', 1, '2013-09-18 12:13:05', 1, '2013-09-18 12:13:05', 1),
(3533, 42, 'BAFILABEN', '', 1, '2013-09-18 12:13:29', 1, '2013-09-18 12:13:29', 1),
(3534, 42, 'GBANGBA&Iuml;SSA', '', 1, '2013-09-18 12:14:01', 1, '2013-09-18 12:14:01', 1),
(3535, 42, 'BAMBO', '', 1, '2013-09-18 12:15:08', 1, '2013-09-18 12:15:08', 1),
(3536, 42, 'KANG&Ouml;', '', 1, '2013-09-18 12:15:52', 1, '2013-09-18 12:15:52', 1),
(3537, 42, 'WAOUT&Ocirc;H', '', 1, '2013-09-18 12:16:19', 1, '2013-09-18 12:16:19', 1),
(3538, 42, 'FARAK&Ouml;', '', 1, '2013-09-18 12:18:59', 1, '2013-09-18 12:18:59', 1),
(3539, 16, 'BOWE II', '', 1, '2013-09-18 12:20:00', 1, '2013-09-18 12:20:00', 1),
(3540, 16, 'BOWE I', '', 1, '2013-09-18 12:20:14', 1, '2013-09-18 12:20:14', 1),
(3541, 44, 'YENGUEMA YOMBOU', '', 1, '2013-09-18 12:22:55', 1, '2013-09-18 12:22:55', 1),
(3542, 44, 'GB&Ouml;NDOU', '', 1, '2013-09-18 12:24:57', 1, '2013-09-18 12:24:57', 1),
(3543, 45, 'KRIGBEMA', '', 1, '2013-09-18 12:32:33', 1, '2013-09-18 12:32:33', 1),
(3544, 45, 'KIESSENEYE', '', 1, '2013-09-18 12:33:48', 1, '2013-09-18 12:33:48', 1),
(3545, 45, 'FERO SAYANIN', '', 1, '2013-09-18 12:34:54', 1, '2013-09-18 12:34:54', 1),
(3546, 45, 'SANGBAWALY', '', 1, '2013-09-18 12:35:20', 1, '2013-09-18 12:35:20', 1),
(3547, 46, 'LELESSA', '', 1, '2013-09-18 12:37:01', 1, '2013-09-18 12:37:01', 1),
(3548, 46, 'FARAWANDOU', '', 1, '2013-09-18 12:37:23', 1, '2013-09-18 12:37:23', 1),
(3549, 46, 'K&Iuml;NDOU', '', 1, '2013-09-18 12:37:59', 1, '2013-09-18 12:37:59', 1),
(3550, 16, 'OURO I', '', 1, '2013-09-18 12:38:25', 1, '2013-09-18 12:38:25', 1),
(3551, 46, 'TEMESSADOU', '', 1, '2013-09-18 12:38:38', 1, '2013-09-18 12:38:38', 1),
(3552, 16, 'OUETOA', '', 1, '2013-09-18 12:41:25', 1, '2013-09-18 12:41:25', 1),
(3553, 16, 'WEYA', '', 1, '2013-09-18 12:42:35', 1, '2013-09-18 12:42:35', 1),
(3554, 17, 'DIECKE I', '', 1, '2013-09-18 12:43:44', 1, '2013-09-18 12:43:44', 1),
(3555, 17, 'KOROHOUAN', '', 1, '2013-09-18 12:45:59', 1, '2013-09-18 12:45:59', 1),
(3556, 17, 'GUEPAH', '', 1, '2013-09-18 12:46:45', 1, '2013-09-18 12:46:45', 1),
(3557, 47, 'FOEDOU KOLLET', '', 1, '2013-09-18 12:47:06', 1, '2013-09-18 12:47:06', 1),
(3558, 47, 'YENDE-BAWA', '', 1, '2013-09-18 12:47:59', 1, '2013-09-18 12:47:59', 1),
(3559, 17, 'GAMPA', '', 1, '2013-09-18 12:48:06', 1, '2013-09-18 12:48:06', 1),
(3560, 48, 'KOLIAN', '', 1, '2013-09-18 12:51:24', 1, '2013-09-18 12:51:24', 1),
(3561, 17, 'DANIE', '', 1, '2013-09-18 12:53:01', 1, '2013-09-18 12:53:01', 1),
(3562, 49, 'BAWA', '', 1, '2013-09-18 12:53:42', 1, '2013-09-18 12:53:42', 1),
(3563, 49, 'BOUMBOUK&Ouml;R&Ouml', '', 1, '2013-09-18 12:54:16', 1, '2013-09-18 12:54:16', 1),
(3564, 18, 'YILATA', '', 1, '2013-09-18 12:54:40', 1, '2013-09-18 12:54:40', 1),
(3565, 49, 'DOGBODOU', '', 1, '2013-09-18 12:54:45', 1, '2013-09-18 12:54:45', 1),
(3566, 18, 'PELA II', '', 1, '2013-09-18 12:55:35', 1, '2013-09-18 12:55:35', 1),
(3567, 49, 'KOLOUADOU', '', 1, '2013-09-18 12:55:35', 1, '2013-09-18 12:55:35', 1),
(3568, 18, 'PELA I', '', 1, '2013-09-18 12:57:26', 1, '2013-09-18 12:57:26', 1),
(3569, 50, 'TEKOULO', '', 1, '2013-09-18 12:57:31', 1, '2013-09-18 12:57:31', 1),
(3570, 50, 'KOLLE-BARRET', '', 1, '2013-09-18 12:58:27', 1, '2013-09-18 12:58:27', 1),
(3571, 50, 'MASSABANGA', '', 1, '2013-09-18 12:59:23', 1, '2013-09-18 12:59:23', 1),
(3572, 1, 'KOMOU', '', 1, '2013-09-18 13:00:07', 1, '2013-09-18 13:00:07', 1),
(3573, 50, 'BAKAMA-LELA', '', 1, '2013-09-18 13:00:36', 1, '2013-09-18 13:00:36', 1),
(3574, 50, 'NEMIA-T&Ouml;LY', '', 1, '2013-09-18 13:01:01', 1, '2013-09-18 13:01:01', 1),
(3575, 50, 'T&Ouml;LY-SOKA', '', 1, '2013-09-18 13:01:24', 1, '2013-09-18 13:01:24', 1),
(3576, 50, 'KOUELDOU', '', 1, '2013-09-18 13:01:52', 1, '2013-09-18 13:01:52', 1),
(3577, 50, 'WABENGOU', '', 1, '2013-09-18 13:02:14', 1, '2013-09-18 13:02:14', 1),
(3578, 50, 'SASSAMA-KAMA', '', 1, '2013-09-18 13:02:30', 1, '2013-09-18 13:02:30', 1),
(3579, 271, 'LINSSA II', '', 1, '2013-09-20 15:53:17', 1, '2013-09-20 15:53:17', 1),
(3580, 271, 'DAMAKHANYAH', '', 1, '2013-09-20 15:55:57', 1, '2013-09-20 15:55:57', 1),
(3581, 271, 'SIMINIYAH', '', 1, '2013-09-20 15:56:46', 1, '2013-09-20 15:56:46', 1),
(3582, 262, 'SINANIYA', '', 1, '2013-09-22 10:24:39', 1, '2013-09-22 10:24:39', 1),
(3583, 262, 'WOLIA', '', 1, '2013-09-22 13:21:23', 1, '2013-09-22 13:21:23', 1),
(3584, 225, 'LAMBAGNI', '', 1, '2013-09-22 16:24:34', 1, '2013-09-22 16:24:34', 1),
(3585, 225, 'KOUGNEWADE II', '', 1, '2013-09-22 16:28:11', 1, '2013-09-22 16:28:11', 1),
(3587, 242, 'KAPPARABINA', '', 1, '2013-09-23 13:09:51', 1, '2013-09-23 13:09:51', 1),
(3588, 243, 'PAOUNKA', '', 1, '2013-09-23 14:49:55', 1, '2013-09-23 14:49:55', 1),
(3589, 193, 'BANDAYA', '', 1, '2013-09-23 14:50:49', 1, '2013-09-23 14:50:49', 1),
(3590, 201, 'LANCERDOU', '', 1, '2013-09-23 15:14:55', 1, '2013-09-23 15:14:55', 1),
(3591, 195, 'HEREMAKONO II', '', 1, '2013-09-23 15:45:05', 1, '2013-09-23 15:45:05', 1),
(3592, 198, 'MARADOU', '', 1, '2013-09-23 16:04:11', 1, '2013-09-23 16:04:11', 1),
(3593, 132, 'TALIKORO', '', 1, '2013-09-23 16:24:55', 1, '2013-09-23 16:24:55', 1),
(3594, 132, 'FOUNKOURAN', '', 1, '2013-09-23 16:38:26', 1, '2013-09-23 16:38:26', 1),
(3595, 51, 'KOUAKORO', '', 1, '2013-09-23 16:41:36', 1, '2013-09-23 16:41:36', 1),
(3596, 122, 'TASSILIMA', '', 1, '2013-09-24 08:34:22', 1, '2013-09-24 08:34:22', 1),
(3597, 122, 'BATE SOILA', '', 1, '2013-09-24 08:36:48', 1, '2013-09-24 08:36:48', 1),
(3598, 122, 'DOUTILABA', '', 1, '2013-09-24 08:40:47', 1, '2013-09-24 08:40:47', 1),
(3599, 122, 'BAKONKO KORO', '', 1, '2013-09-24 08:45:29', 1, '2013-09-24 08:45:29', 1),
(3600, 123, 'SALASSILA', '', 1, '2013-09-24 08:55:31', 1, '2013-09-24 08:55:31', 1),
(3601, 123, 'MANIANKO', '', 1, '2013-09-24 09:07:37', 1, '2013-09-24 09:07:37', 1),
(3602, 120, 'AVIATION', '', 1, '2013-09-24 09:09:31', 1, '2013-09-24 09:09:31', 1),
(3603, 120, 'KONKONIKORO', '', 1, '2013-09-24 09:15:12', 1, '2013-09-24 09:15:12', 1),
(3604, 120, 'DJODON', '', 1, '2013-09-24 09:17:25', 1, '2013-09-24 09:17:25', 1),
(3605, 120, 'BORDO', '', 1, '2013-09-24 09:18:41', 1, '2013-09-24 09:18:41', 1),
(3606, 120, 'FOURBAN', '', 1, '2013-09-24 09:20:33', 1, '2013-09-24 09:20:33', 1),
(3607, 120, 'SENKEFARA II', '', 1, '2013-09-24 09:32:14', 1, '2013-09-24 09:32:14', 1),
(3608, 124, 'BOUSSOURAN', '', 1, '2013-09-24 09:37:32', 1, '2013-09-24 09:37:32', 1),
(3609, 124, 'BINKO', '', 1, '2013-09-24 09:40:12', 1, '2013-09-24 09:40:12', 1),
(3610, 124, 'SANANA', '', 1, '2013-09-24 09:43:22', 1, '2013-09-24 09:43:22', 1),
(3611, 124, 'TAMONI', '', 1, '2013-09-24 09:46:44', 1, '2013-09-24 09:46:44', 1),
(3612, 124, 'KANIMISSAYA', '', 1, '2013-09-24 09:47:31', 1, '2013-09-24 09:49:13', 1),
(3613, 179, 'TIMBO', '', 1, '2013-09-24 10:25:03', 1, '2013-09-24 10:25:03', 1),
(3616, 274, 'Maneah Centre', '', 1, '2015-07-05 00:00:00', 1, '2015-07-06 00:00:00', 1),
(3617, 124, 'Baranama centre II', '', 1, '2015-10-08 00:00:00', 1, '2015-10-29 00:00:00', 1),
(3618, 130, 'Womalen ', '', 1, '2015-10-08 00:00:00', 1, '2015-10-29 00:00:00', 1),
(3619, 130, 'Kariandou', '', 1, '2015-10-08 00:00:00', 1, '2015-10-29 00:00:00', 1),
(3620, 132, 'Massarena Banankoro', '', 1, '2015-10-08 00:00:00', 1, '2015-10-29 00:00:00', 1),
(3621, 131, 'massarena banankor', '', 1, '2015-10-07 00:00:00', 1, '2015-10-29 00:00:00', 1),
(3622, 279, 'lanyankou', '', 1, '2015-10-21 00:00:00', 1, '2015-10-21 00:00:00', 1),
(3623, 62, 'bovoguizezou', '', 1, '2015-10-07 00:00:00', 1, '2015-10-21 00:00:00', 1),
(3624, 62, 'ziaouvassama', '', 1, '2015-10-15 00:00:00', 1, '2015-10-22 00:00:00', 1),
(3625, 52, 'gnoumamoridou', '', 1, '2015-10-14 00:00:00', 1, '2015-10-02 00:00:00', 1),
(3626, 52, 'kpokolofassama', '', 1, '2015-10-16 00:00:00', 1, '2015-10-22 00:00:00', 1),
(3627, 52, 'kolakodou', '', 1, '2015-10-06 00:00:00', 1, '2015-10-01 00:00:00', 1),
(4001, 67, 'Daka', '', 1, '2020-07-27 12:39:45', 1, '2020-07-27 12:39:45', 1),
(4002, 67, 'Tata', '', 1, '2020-07-29 15:14:03', 1, '2020-07-29 15:14:03', 1),
(4004, 262, 'ABATTOIR', '', 0, '2020-08-14 13:19:49', 1, '2020-08-14 13:20:51', 1),
(4005, 468, 'quartierFrance', '', 1, '2020-07-02 00:00:00', 1, '2020-07-29 00:00:00', 1),
(4006, 249, 'Koumbia1', '', 0, '2021-11-02 11:29:44', 1, '2021-11-02 11:34:05', 1),
(4007, 473, 'Kokaya Port', '', 1, '2023-07-07 15:44:25', 1, '2023-07-07 15:44:25', 1),
(4008, 254, 'Soumbouyady', '', 1, '2023-07-24 13:17:32', 1, '2023-07-24 13:17:32', 1);

-- --------------------------------------------------------

--
-- Structure de la table `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `paysId` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `code` varchar(5) DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `regions`
--

INSERT INTO `regions` (`id`, `paysId`, `libelle`, `code`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 1, 'Conakry', '', 1, '0000-00-00 00:00:00', 0, '2022-06-06 10:08:13', 51),
(2, 1, 'Boké', NULL, 1, '0000-00-00 00:00:00', 0, '2013-05-27 14:35:31', 2),
(3, 1, 'Kindia', NULL, 1, '0000-00-00 00:00:00', 0, '2013-05-27 14:35:36', 2),
(4, 1, 'Mamou', NULL, 1, '0000-00-00 00:00:00', 0, '2013-05-27 14:35:39', 2),
(5, 1, 'Labé', NULL, 1, '0000-00-00 00:00:00', 0, '2013-05-27 14:35:46', 2),
(6, 1, 'Faranah', NULL, 1, '0000-00-00 00:00:00', 0, '2013-05-27 14:35:50', 2),
(7, 1, 'Kankan', 'kanka', 1, '0000-00-00 00:00:00', 0, '2022-05-08 09:23:48', 51),
(8, 1, 'N\'zérekoré', NULL, 1, '0000-00-00 00:00:00', 0, '2013-05-27 14:36:24', 2),
(14, 3, 'Bas-Rhin', NULL, 1, '2017-01-23 13:17:50', 0, '2017-01-23 13:17:50', 0),
(15, 3, 'Haut-Rhin', NULL, 1, '2017-01-23 13:17:50', 0, '2017-01-23 13:17:50', 0),
(16, 3, 'Dordogne', NULL, 1, '2017-01-23 13:17:50', 0, '2017-01-23 13:17:50', 0),
(17, 3, 'Gironde', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(18, 3, 'Landes', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(19, 3, 'Lot-et-Garonne', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(20, 3, 'Pyrénées-Atlantiques', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(21, 3, 'Allier', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(22, 3, 'Cantal', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(23, 3, 'Haute-Loire', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(24, 3, 'Puy-de-Dôme', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(25, 3, 'Calvados', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(26, 3, 'Orne', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(27, 3, 'Côte d\'Or', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(28, 3, 'Nièvre', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(29, 3, 'Saône-et-Loire', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(30, 3, 'Yonne', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(31, 3, 'Côtes d\'Armor', NULL, 1, '2017-01-23 13:17:51', 0, '2017-01-23 13:17:51', 0),
(32, 3, 'Finistère', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(33, 3, 'Ille-et-Vilaine', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(34, 3, 'Morbihan', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(36, 3, 'Eure-et-Loir', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(37, 3, 'Indre', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(38, 3, 'Indre-et-Loire', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(39, 3, 'Loiret', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(40, 3, 'Loir-et-Cher', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(41, 3, 'Ardennes', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(42, 3, 'Aube', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(43, 3, 'Haute-Marne', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(44, 3, 'Marne', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(45, 3, 'Corse du Sud', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(46, 3, 'Haute-Corse', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(47, 3, 'Doubs', NULL, 1, '2017-01-23 13:17:52', 0, '2017-01-23 13:17:52', 0),
(48, 3, 'Haute-Saône', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(49, 3, 'Jura', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(50, 3, 'Territoire-de-Belfort', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(51, 3, 'Eure', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(52, 3, 'Seine-Maritime', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(53, 3, 'Essonne', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(54, 3, 'Hauts-de-Seine', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(55, 3, 'Paris', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(56, 3, 'Seine-et-Marne', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(57, 3, 'Seine-St-Denis', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(58, 3, 'Val-de-Marne', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(59, 3, 'Val-d\'Oise', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(60, 3, 'Yvelines', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(61, 3, 'Aude', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(62, 3, 'Gard', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(63, 3, 'Hérault', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(64, 3, 'Lozère', NULL, 1, '2017-01-23 13:17:53', 0, '2017-01-23 13:17:53', 0),
(65, 3, 'Pyrénées-Orientales', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(66, 3, 'Corrèze', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(67, 3, 'Creuse', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(68, 3, 'Haute-Vienne', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(69, 3, 'Meurthe-et-Moselle', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(70, 3, 'Meuse', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(71, 3, 'Moselle', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(72, 3, 'Vosges', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(73, 3, 'Ariège', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:25:42', 1),
(74, 3, 'Aveyron', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(75, 3, 'Gers', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(76, 3, 'Haute-Garonne', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(77, 3, 'Hautes-Pyrénées', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(78, 3, 'Lot', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(79, 3, 'Tarn', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(80, 3, 'Tarn-et-Garonne', NULL, 1, '2017-01-23 13:17:54', 0, '2017-01-23 13:17:54', 0),
(81, 3, 'Nord', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(82, 3, 'Pas-de-Calais', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(83, 3, 'Manche', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(84, 3, 'Loire-Atlantique', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(85, 3, 'Maine-et-Loire', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(86, 3, 'Mayenne', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(87, 3, 'Sarthe', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(88, 3, 'Vendée', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(89, 3, 'AISNE', NULL, 1, '2017-01-23 13:17:55', 0, '2022-10-16 17:55:30', 51),
(90, 3, 'Oise', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(91, 3, 'Somme', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(92, 3, 'Charente', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(93, 3, 'Charente Maritime', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(94, 3, 'Deux-Sèvres', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(95, 3, 'Vienne', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(96, 3, 'Alpes de Haute-Provence', NULL, 1, '2017-01-23 13:17:55', 0, '2017-01-23 13:17:55', 0),
(97, 3, 'Alpes-Maritimes', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(98, 3, 'Bouches du Rhône', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(99, 3, 'Hautes-Alpes', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(100, 3, 'Var', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(101, 3, 'Vaucluse', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(102, 3, 'AIR', NULL, 1, '2017-01-23 13:17:56', 0, '2020-08-14 10:05:47', 1),
(103, 3, 'Ardèche', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:25:33', 1),
(104, 3, 'Drôme', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(105, 3, 'Haute-Savoie', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(106, 3, 'Isère', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(107, 3, 'Loire', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(108, 3, 'Rhône', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(109, 3, 'Savoie', NULL, 1, '2017-01-23 13:17:56', 0, '2017-01-23 13:17:56', 0),
(110, 47, 'Xang Xi', NULL, 1, '2017-02-12 11:51:21', 1, '2017-02-12 11:51:21', 1),
(111, 201, 'Szsz', NULL, 1, '2017-03-10 16:34:17', 0, '2017-03-10 16:34:17', 0),
(112, 6, 'Kjjoioiiooi', NULL, 1, '2017-03-10 17:59:34', 1, '2017-03-10 17:59:34', 1),
(113, 10, 'Luos', NULL, 1, '2017-03-10 18:18:44', 1, '2017-03-10 18:18:44', 1),
(114, 14, 'Las', NULL, 1, '2017-03-10 18:32:40', 1, '2017-03-10 18:32:40', 1),
(115, 193, 'Rias', NULL, 1, '2017-03-10 18:41:28', 1, '2017-03-10 18:41:28', 1),
(116, 231, 'Washington D.c', NULL, 1, '2017-03-10 18:57:53', 1, '2017-03-10 18:57:53', 1),
(117, 193, 'Koundouz', NULL, 1, '2017-03-11 11:27:31', 1, '2017-03-11 11:27:31', 1),
(118, 231, 'New Jersey', NULL, 1, '2017-03-13 18:04:34', 1, '2017-03-13 18:04:34', 1),
(119, 86, 'Ruhr', NULL, 1, '2017-03-13 19:03:04', 1, '2017-03-13 19:03:04', 1),
(120, 129, 'Luxo', NULL, 1, '2017-03-24 22:15:33', 1, '2017-03-24 22:15:33', 1),
(121, 201, 'Xhossa', NULL, 1, '2017-08-17 17:35:11', 1, '2017-08-17 17:35:11', 1),
(122, 19, 'Kileti', NULL, 1, '2017-08-18 10:08:01', 1, '2017-08-18 10:08:01', 1),
(123, 1, 'CONAK', NULL, 0, '2020-08-14 10:02:08', 1, '2020-08-14 10:03:24', 1),
(124, 4, 'Lll', NULL, 0, '2021-11-01 12:06:32', 1, '2021-11-01 12:07:28', 1),
(125, 1, 'Sonfonia', NULL, 0, '2021-11-01 12:13:18', 1, '2021-11-01 12:23:23', 1),
(126, 1, 'Boulliwel', NULL, 0, '2021-11-01 13:48:41', 1, '2021-11-01 13:49:26', 1);

-- --------------------------------------------------------

--
-- Structure de la table `secteurs`
--

CREATE TABLE `secteurs` (
  `id` int(11) NOT NULL,
  `quartierDistrictId` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `code` varchar(5) DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `smsenvoyes`
--

CREATE TABLE `smsenvoyes` (
  `id` int(11) NOT NULL,
  `objet` varchar(100) NOT NULL,
  `description` tinyint(4) NOT NULL DEFAULT 1,
  `destinataire` varchar(45) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `storysales`
--

CREATE TABLE `storysales` (
  `id` int(11) NOT NULL,
  `eleveId` int(11) NOT NULL,
  `trancheId` int(11) DEFAULT NULL,
  `prestationId` int(11) DEFAULT NULL,
  `typePayements` enum('partiel','totalite','modulaire') NOT NULL DEFAULT 'totalite',
  `mois` varchar(45) DEFAULT NULL,
  `prix` double UNSIGNED ZEROFILL NOT NULL,
  `datePayement` varchar(45) DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `storysales`
--

INSERT INTO `storysales` (`id`, `eleveId`, `trancheId`, `prestationId`, `typePayements`, `mois`, `prix`, `datePayement`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(1, 88, NULL, 4, '', 'Mais', 0000000000000000300000, '', 1, '2023-11-10 20:30:10', 5, '2023-11-10 20:30:10', 5),
(2, 88, 5, 4, '', 'Octobre', 0000000000000000300000, '', 1, '2023-11-10 22:31:40', 5, '2023-11-10 22:31:40', 5),
(3, 88, 6, 4, '', '', 0000000000000000900000, '', 1, '2023-11-10 23:18:45', 5, '2023-11-10 23:18:45', 5),
(4, 88, 8, 4, '', '', 0000000000000000600000, '', 1, '2023-11-10 23:25:21', 5, '2023-11-10 23:25:21', 5),
(5, 88, 6, 4, '', '', 0000000000000000900000, '', 1, '2023-11-10 23:30:01', 5, '2023-11-10 23:30:01', 5),
(6, 88, 6, 4, '', '', 0000000000000000900000, '', 1, '2023-11-10 23:36:51', 5, '2023-11-10 23:36:51', 5),
(7, 88, NULL, 4, 'totalite', '', 0000000000000002700000, '', 1, '2023-11-10 23:46:30', 5, '2023-11-10 23:46:30', 5),
(8, 88, NULL, 4, 'totalite', '', 0000000000000002700000, '2023-11-10 23:49:15', 1, '2023-11-10 23:49:15', 5, '2023-11-10 23:49:15', 5),
(9, 88, NULL, 4, 'totalite', '', 0000000000000002700000, '2023-11-11 02:14:38', 1, '2023-11-11 02:14:38', 5, '2023-11-11 02:14:38', 5),
(10, 104, 5, 4, '', 'Octobre', 0000000000000000240000, '2023-11-11 02:20:53', 1, '2023-11-11 02:20:53', 5, '2023-11-11 02:20:53', 5),
(11, 88, 5, 4, '', 'Octobre', 0000000000000000900000, '2023-11-11 22:54:10', 1, '2023-11-11 22:54:10', 5, '2023-11-11 22:54:10', 5),
(12, 105, 5, 4, '', 'Octobre', 0000000000000000900000, '2023-11-11 23:07:45', 1, '2023-11-11 23:07:45', 5, '2023-11-11 23:07:45', 5),
(13, 103, NULL, 4, '', 'Fevrier', 0000000000000000040000, '2023-11-12 09:12:29', 1, '2023-11-12 09:12:29', 5, '2023-11-12 09:12:29', 5),
(14, 88, NULL, 4, '', 'Novembre', 0000000000000000300000, '2023-11-12 10:58:53', 1, '2023-11-12 10:58:53', 5, '2023-11-12 10:58:53', 5),
(15, 91, NULL, 4, '', 'Novembre', 0000000000000000040000, '2023-11-12 11:00:43', 1, '2023-11-12 11:00:43', 5, '2023-11-12 11:00:43', 5),
(16, 108, NULL, 4, '', 'Novembre', 0000000000000000500000, '2023-11-12 16:56:07', 1, '2023-11-12 16:56:07', 5, '2023-11-12 16:56:07', 5),
(17, 110, NULL, 4, '', 'Octobre', 0000000000000000500000, '2023-11-12 17:06:41', 1, '2023-11-12 17:06:41', 5, '2023-11-12 17:06:41', 5),
(18, 92, NULL, 4, '', 'Novembre', 0000000000000000040000, '2023-11-12 17:23:49', 1, '2023-11-12 17:23:49', 5, '2023-11-12 17:23:49', 5);

-- --------------------------------------------------------

--
-- Structure de la table `tranches`
--

CREATE TABLE `tranches` (
  `id` int(11) NOT NULL,
  `ecoleId` int(11) NOT NULL,
  `prestationId` int(11) DEFAULT NULL,
  `libelle` varchar(45) NOT NULL,
  `pourcentage` int(11) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `tranches`
--

INSERT INTO `tranches` (`id`, `ecoleId`, `prestationId`, `libelle`, `pourcentage`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(5, 2, 4, '1ere tranche', 20, 1, '2023-10-22 00:07:05', 5, '2023-11-06 22:50:28', 5),
(6, 2, 4, '2eme tranche', 40, 1, '2023-10-22 00:07:40', 5, '2023-11-06 22:50:39', 5),
(8, 2, 4, '3eme tranche', 40, 1, '2023-10-22 00:10:42', 5, '2023-11-06 22:53:11', 5),
(9, 2, 3, '1ere tranche', 50, 1, '2023-11-06 23:42:02', 5, '2023-11-06 23:42:02', 5),
(10, 2, 3, '2eme tranche', 20, 1, '2023-11-06 23:42:39', 5, '2023-11-06 23:43:41', 5),
(11, 2, 3, '3eme tranche', 30, 1, '2023-11-06 23:45:07', 5, '2023-11-06 23:45:07', 5),
(12, 2, 2, '1er module', 50, 1, '2023-11-09 22:55:37', 5, '2023-11-09 22:55:37', 5),
(13, 2, 2, '2eme module', 50, 1, '2023-11-09 22:56:04', 5, '2023-11-09 22:56:04', 5);

-- --------------------------------------------------------

--
-- Structure de la table `tranches_mois`
--

CREATE TABLE `tranches_mois` (
  `id` int(11) NOT NULL,
  `trancheId` int(11) NOT NULL,
  `mois` varchar(30) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `unites`
--

CREATE TABLE `unites` (
  `id` int(11) NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `symbole` varchar(5) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `userconnexions`
--

CREATE TABLE `userconnexions` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `adressIp` varchar(20) DEFAULT NULL,
  `fin` datetime DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `usergroupes`
--

CREATE TABLE `usergroupes` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `groupeId` int(11) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `usergroupes`
--

INSERT INTO `usergroupes` (`id`, `userId`, `groupeId`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(10, 68, 2, 1, '2022-04-26 12:14:35', 51, '2022-04-26 12:14:35', 51),
(12, 70, 2, 1, '2022-04-26 12:19:36', 51, '2022-04-26 12:19:36', 51),
(13, 87, 2, 1, '2022-04-27 16:26:38', 51, '2022-04-27 16:26:38', 51),
(15, 84, 4, 1, '2022-04-29 12:40:00', 51, '2022-04-29 12:40:00', 51),
(16, 86, 2, 1, '2022-04-29 12:44:08', 51, '2022-04-29 12:44:08', 51),
(34, 93, 15, 1, '2022-06-02 12:27:57', 51, '2022-06-02 12:27:57', 51),
(35, 51, 2, 1, '2022-06-07 11:34:55', 51, '2022-06-07 11:34:55', 51),
(36, 51, 9, 1, '2022-06-07 11:35:13', 51, '2022-06-07 11:35:13', 51),
(37, 1, 2, 1, '2023-06-23 14:21:41', 1, '2023-06-23 14:21:41', 1),
(38, 2, 16, 1, '2023-07-07 16:02:54', 1, '2023-07-07 16:02:54', 1),
(39, 3, 17, 1, '2023-07-09 18:24:32', 1, '2023-07-09 18:24:32', 1),
(40, 1, 2, 1, '2023-10-14 23:35:09', 1, '2023-10-14 23:35:09', 1),
(41, 5, 16, 1, '2023-10-15 08:04:28', 1, '2023-10-15 08:04:28', 1),
(42, 5, 18, 1, '2023-10-15 08:05:23', 1, '2023-10-15 08:05:23', 1),
(43, 6, 16, 1, '2023-10-15 17:18:32', 1, '2023-10-15 17:18:32', 1),
(46, 7, 18, 1, '2023-10-15 17:23:12', 1, '2023-10-15 17:23:12', 1),
(47, 7, 2, 1, '2023-10-16 23:43:05', 1, '2023-10-16 23:43:05', 1),
(48, 5, 2, 1, '2023-10-16 23:43:42', 1, '2023-10-16 23:43:42', 1),
(49, 8, 18, 1, '2023-10-18 22:08:15', 5, '2023-10-18 22:08:15', 5),
(50, 9, 18, 1, '2023-10-18 22:35:12', 5, '2023-10-18 22:35:12', 5),
(51, 10, 18, 1, '2023-10-18 23:18:52', 5, '2023-10-18 23:18:52', 5),
(52, 11, 18, 1, '2023-10-19 19:51:56', 5, '2023-10-19 19:51:56', 5);

-- --------------------------------------------------------

--
-- Structure de la table `userpasswords`
--

CREATE TABLE `userpasswords` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `type` enum('Auto','Perso') DEFAULT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `ecoleId` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `prenoms` varchar(150) NOT NULL,
  `fonction` varchar(45) DEFAULT NULL,
  `telephone` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  `adresse` int(11) NOT NULL,
  `estActif` tinyint(4) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL,
  `creationUserId` int(11) NOT NULL,
  `modifDate` datetime NOT NULL,
  `modifUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `ecoleId`, `name`, `prenoms`, `fonction`, `telephone`, `password`, `adresse`, `estActif`, `creationDate`, `creationUserId`, `modifDate`, `modifUserId`) VALUES
(5, 2, 'soumah', 'Fatoumata', NULL, '621196376', '5f4dcc3b5aa765d61d8327deb882cf99', 50, 1, '2023-10-15 08:04:28', 1, '2023-10-16 21:44:57', 5),
(7, 2, 'Barry', 'Amadou', NULL, '622000000', '5f4dcc3b5aa765d61d8327deb882cf99', 4007, 0, '2023-10-15 17:23:12', 1, '2023-10-15 17:34:50', 1),
(8, 2, 'Sidibé', 'Moussa', NULL, '628112588', '5f4dcc3b5aa765d61d8327deb882cf99', 50, 1, '2023-10-18 22:08:15', 5, '2023-10-18 22:08:15', 5),
(9, 1, 'Barry', 'Amintou', NULL, '628153310', '5f4dcc3b5aa765d61d8327deb882cf99', 12, 1, '2023-10-18 22:35:12', 5, '2023-10-18 22:35:12', 5),
(10, 1, 'Sylla', 'Seydouba', NULL, '621121212', '5f4dcc3b5aa765d61d8327deb882cf99', 597, 1, '2023-10-18 23:18:52', 5, '2023-10-18 23:18:52', 5),
(11, 1, 'Yansané', 'Abdoulaye', NULL, '628101010', '5f4dcc3b5aa765d61d8327deb882cf99', 828, 1, '2023-10-19 19:51:56', 5, '2023-10-19 19:51:56', 5);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_applications_couleur1Id_idx` (`couleur1Id`),
  ADD KEY `fk_applications_couleur2Id_idx` (`couleur2Id`);

--
-- Index pour la table `classses`
--
ALTER TABLE `classses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_classses_enseignantId_idx` (`enseignantId`),
  ADD KEY `fk_classses_ecoleId_idx` (`ecoleId`);

--
-- Index pour la table `communes`
--
ALTER TABLE `communes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_commune_prefectureId_idx` (`prefectureId`);

--
-- Index pour la table `couleurs`
--
ALTER TABLE `couleurs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `devises`
--
ALTER TABLE `devises`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ecoles`
--
ALTER TABLE `ecoles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_eleves_classeId_idx` (`classeId`);

--
-- Index pour la table `fiche_renseignements`
--
ALTER TABLE `fiche_renseignements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_fiche_renseigments_classeId_idx` (`classeId`),
  ADD KEY `fk_fiche_renseigments_prestationId_idx` (`prestationId`),
  ADD KEY `fk_fiche_renseigments_ecoleId_idx` (`ecoleId`);

--
-- Index pour la table `groupes`
--
ALTER TABLE `groupes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `modeaccess`
--
ALTER TABLE `modeaccess`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `onglets`
--
ALTER TABLE `onglets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_onglet_menuId_idx` (`menuId`);

--
-- Index pour la table `payements`
--
ALTER TABLE `payements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_payements_eleveId_idx` (`eleveId`),
  ADD KEY `fk_payements_trancheId_idx` (`trancheId`),
  ADD KEY `fk_payements_prestationId_idx` (`prestationId`);

--
-- Index pour la table `payss`
--
ALTER TABLE `payss`
  ADD PRIMARY KEY (`id`,`estActif`),
  ADD KEY `fk_pays_deviseId_idx` (`deviseId`);

--
-- Index pour la table `prefectures`
--
ALTER TABLE `prefectures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_prefecture_regionId_idx` (`regionId`);

--
-- Index pour la table `prestations`
--
ALTER TABLE `prestations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_privilege_menuId_idx` (`menuId`),
  ADD KEY `fk_privilege_ongletId_idx` (`ongletId`),
  ADD KEY `fk_privilege_groupeId_idx` (`groupeId`),
  ADD KEY `fk_privilege_modeAccesId_idx` (`modeAccesId`);

--
-- Index pour la table `quartierdistricts`
--
ALTER TABLE `quartierdistricts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_quartier_communeId_idx` (`communeId`);

--
-- Index pour la table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_region_paysId_idx` (`paysId`);

--
-- Index pour la table `secteurs`
--
ALTER TABLE `secteurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_secteurs_districtId_idx` (`quartierDistrictId`);

--
-- Index pour la table `smsenvoyes`
--
ALTER TABLE `smsenvoyes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `storysales`
--
ALTER TABLE `storysales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_storySales_eleveId_idx` (`eleveId`),
  ADD KEY `fk_storySales_prestationId_idx` (`prestationId`),
  ADD KEY `fk_storySales_trancheId_idx` (`trancheId`);

--
-- Index pour la table `tranches`
--
ALTER TABLE `tranches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tranches_ecoleId_idx` (`ecoleId`),
  ADD KEY `fk_tranches_prestationId_idx` (`prestationId`);

--
-- Index pour la table `tranches_mois`
--
ALTER TABLE `tranches_mois`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tranches_mois_trancheId_idx` (`trancheId`);

--
-- Index pour la table `unites`
--
ALTER TABLE `unites`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `userconnexions`
--
ALTER TABLE `userconnexions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userconnexionUserId_idx` (`userId`);

--
-- Index pour la table `usergroupes`
--
ALTER TABLE `usergroupes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usergroupe_userId_idx` (`userId`),
  ADD KEY `fk_usergroupe_groupeId_idx` (`groupeId`);

--
-- Index pour la table `userpasswords`
--
ALTER TABLE `userpasswords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userconnexionUserId_idx` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_ecoleId_idx` (`ecoleId`),
  ADD KEY `fk_users_quartierDistrickId_idx` (`adresse`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `classses`
--
ALTER TABLE `classses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `communes`
--
ALTER TABLE `communes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=475;

--
-- AUTO_INCREMENT pour la table `couleurs`
--
ALTER TABLE `couleurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `devises`
--
ALTER TABLE `devises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `ecoles`
--
ALTER TABLE `ecoles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `eleves`
--
ALTER TABLE `eleves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT pour la table `fiche_renseignements`
--
ALTER TABLE `fiche_renseignements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `groupes`
--
ALTER TABLE `groupes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT pour la table `modeaccess`
--
ALTER TABLE `modeaccess`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `onglets`
--
ALTER TABLE `onglets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT pour la table `payements`
--
ALTER TABLE `payements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT pour la table `payss`
--
ALTER TABLE `payss`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT pour la table `prefectures`
--
ALTER TABLE `prefectures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT pour la table `prestations`
--
ALTER TABLE `prestations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `privileges`
--
ALTER TABLE `privileges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;

--
-- AUTO_INCREMENT pour la table `quartierdistricts`
--
ALTER TABLE `quartierdistricts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4009;

--
-- AUTO_INCREMENT pour la table `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT pour la table `secteurs`
--
ALTER TABLE `secteurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `smsenvoyes`
--
ALTER TABLE `smsenvoyes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `storysales`
--
ALTER TABLE `storysales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `tranches`
--
ALTER TABLE `tranches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `tranches_mois`
--
ALTER TABLE `tranches_mois`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `unites`
--
ALTER TABLE `unites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `userconnexions`
--
ALTER TABLE `userconnexions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=514;

--
-- AUTO_INCREMENT pour la table `usergroupes`
--
ALTER TABLE `usergroupes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `userpasswords`
--
ALTER TABLE `userpasswords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `fk_applications_couleur1Id` FOREIGN KEY (`couleur1Id`) REFERENCES `couleurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_applications_couleur2Id` FOREIGN KEY (`couleur2Id`) REFERENCES `couleurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `classses`
--
ALTER TABLE `classses`
  ADD CONSTRAINT `fk_classses_ecoleId` FOREIGN KEY (`ecoleId`) REFERENCES `ecoles` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_classses_enseignantId` FOREIGN KEY (`enseignantId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `communes`
--
ALTER TABLE `communes`
  ADD CONSTRAINT `fk_commune_prefectureId` FOREIGN KEY (`prefectureId`) REFERENCES `prefectures` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD CONSTRAINT `fk_eleves_classeId` FOREIGN KEY (`classeId`) REFERENCES `classses` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `fiche_renseignements`
--
ALTER TABLE `fiche_renseignements`
  ADD CONSTRAINT `fk_fiche_renseigments_classeId` FOREIGN KEY (`classeId`) REFERENCES `classses` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_fiche_renseigments_ecoleId` FOREIGN KEY (`ecoleId`) REFERENCES `ecoles` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `onglets`
--
ALTER TABLE `onglets`
  ADD CONSTRAINT `fk_onglet_menuId` FOREIGN KEY (`menuId`) REFERENCES `menus` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `payements`
--
ALTER TABLE `payements`
  ADD CONSTRAINT `fk_payements_eleveId` FOREIGN KEY (`eleveId`) REFERENCES `eleves` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_payements_prestationId` FOREIGN KEY (`prestationId`) REFERENCES `prestations` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_payements_trancheId` FOREIGN KEY (`trancheId`) REFERENCES `tranches` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `payss`
--
ALTER TABLE `payss`
  ADD CONSTRAINT `fk_pays_deviseId` FOREIGN KEY (`deviseId`) REFERENCES `devises` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `prefectures`
--
ALTER TABLE `prefectures`
  ADD CONSTRAINT `fk_prefecture_regionId` FOREIGN KEY (`regionId`) REFERENCES `regions` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `privileges`
--
ALTER TABLE `privileges`
  ADD CONSTRAINT `fk_privilege_groupeId` FOREIGN KEY (`groupeId`) REFERENCES `groupes` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_privilege_menuId` FOREIGN KEY (`menuId`) REFERENCES `menus` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_privilege_modeAccesId` FOREIGN KEY (`modeAccesId`) REFERENCES `modeaccess` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_privilege_ongletId` FOREIGN KEY (`ongletId`) REFERENCES `onglets` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `quartierdistricts`
--
ALTER TABLE `quartierdistricts`
  ADD CONSTRAINT `fk_quartier_communeId` FOREIGN KEY (`communeId`) REFERENCES `communes` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `regions`
--
ALTER TABLE `regions`
  ADD CONSTRAINT `fk_region_paysId` FOREIGN KEY (`paysId`) REFERENCES `payss` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `secteurs`
--
ALTER TABLE `secteurs`
  ADD CONSTRAINT `fk_secteurs_districtId` FOREIGN KEY (`quartierDistrictId`) REFERENCES `quartierdistricts` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `storysales`
--
ALTER TABLE `storysales`
  ADD CONSTRAINT `fk_storySales_eleveId` FOREIGN KEY (`eleveId`) REFERENCES `eleves` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_storySales_prestationId` FOREIGN KEY (`prestationId`) REFERENCES `prestations` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_storySales_trancheId` FOREIGN KEY (`trancheId`) REFERENCES `tranches` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `tranches`
--
ALTER TABLE `tranches`
  ADD CONSTRAINT `fk_tranches_ecoleId` FOREIGN KEY (`ecoleId`) REFERENCES `ecoles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tranches_prestationId` FOREIGN KEY (`prestationId`) REFERENCES `prestations` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `tranches_mois`
--
ALTER TABLE `tranches_mois`
  ADD CONSTRAINT `fk_tranches_mois_trancheId` FOREIGN KEY (`trancheId`) REFERENCES `tranches` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `userconnexions`
--
ALTER TABLE `userconnexions`
  ADD CONSTRAINT `fk_userconnexionUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `usergroupes`
--
ALTER TABLE `usergroupes`
  ADD CONSTRAINT `fk_usergroupe_groupeId` FOREIGN KEY (`groupeId`) REFERENCES `groupes` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usergroupe_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `userpasswords`
--
ALTER TABLE `userpasswords`
  ADD CONSTRAINT `fk_userpassword_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_ecoleId` FOREIGN KEY (`ecoleId`) REFERENCES `ecoles` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_quartierDistrickId` FOREIGN KEY (`adresse`) REFERENCES `quartierdistricts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
