ALTER TABLE `prestataires` CHANGE `telephone` `telephone` VARCHAR(16) NOT NULL; 
ALTER TABLE `prestataires` CHANGE `adresse` `adresse` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL; 



USE `suiviprojetpublic`;
DROP procedure IF EXISTS `prestataires_selectBy`;



DELIMITER $$

CREATE  PROCEDURE `prestataires_selectBy`(`id` INT, `type` VARCHAR(20), `categorie` VARCHAR(20), `localisation` VARCHAR(20), `nom` VARCHAR(45), `sigle` VARCHAR(10), `telephone` varchar(16), `email` VARCHAR(45), `adresse` VARCHAR(45), `localiteId` INT, `partenaireLocalId` INT, `observations` TEXT, `estActif` TINYINT, `creationDate` DATETIME, `creationUserId` INT, `modifDate` DATETIME, `modifUserId` INT, `debutDonnees` INT, `finDonnees` INT)
BEGIN
	DECLARE requeteSql varchar(500);
	SET @requeteSql := 'SELECT
		`prestataires`.`id`,
		`prestataires`.`type`,
		`prestataires`.`categorie`,
		`prestataires`.`localisation`,
		`prestataires`.`nom`,
		`prestataires`.`sigle`,
		`prestataires`.`telephone`,
		`prestataires`.`email`,
		`prestataires`.`adresse`,
		`prestataires`.`localiteId`,
		`prestataires`.`partenaireLocalId`,
		`prestataires`.`observations`,
		`prestataires`.`estActif`,
		`prestataires`.`creationDate`,
		`prestataires`.`creationUserId`,
		`prestataires`.`modifDate`,
		`prestataires`.`modifUserId`
		FROM `prestataires`
		WHERE 1';
		IF id IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`id` = ',id);
		END IF;
		IF type IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`type` = "',type,'"');
		END IF;
		IF categorie IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`categorie` = "',categorie,'"');
		END IF;
		IF localisation IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`localisation` = "',localisation,'"');
		END IF;
		IF nom IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`nom` = "',nom,'"');
		END IF;
		IF sigle IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`sigle` = "',sigle,'"');
		END IF;
		IF telephone IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`telephone` = "',telephone,'"');
		END IF;
		IF email IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`email` = "',email,'"');
		END IF;
		IF adresse IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`adresse` = "',adresse,'"');
		END IF;
		IF localiteId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`localiteId` = ',localiteId);
		END IF;
		IF partenaireLocalId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`partenaireLocalId` = ',partenaireLocalId);
		END IF;
		IF observations IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`observations` = "',observations,'"');
		END IF;
		IF estActif IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`estActif` = ',estActif);
		END IF;
		IF creationDate IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`creationDate` = "',creationDate,'"');
		END IF;
		IF creationUserId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`creationUserId` = ',creationUserId);
		END IF;
		IF modifDate IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`modifDate` = "',modifDate,'"');
		END IF;
		IF modifUserId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `prestataires`.`modifUserId` = ',modifUserId);
		END IF;
		IF debutDonnees IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ', debutDonnees, ',', finDonnees);
		END IF;

		PREPARE statement FROM @requeteSql;
		EXECUTE statement;
		DEALLOCATE PREPARE statement;

END$$

DELIMITER ;



USE `suiviprojetpublic`;
DROP procedure IF EXISTS `prestataires_insert`;

DELIMITER $$

CREATE  PROCEDURE `prestataires_insert`(IN `type` VARCHAR(20), IN `categorie` VARCHAR(20), IN `localisation` VARCHAR(20), IN `nom` VARCHAR(45), IN `sigle` VARCHAR(10), IN `telephone` VARCHAR(16), IN `email` VARCHAR(45), IN `adresse` VARCHAR(45), IN `localiteId` INT, IN `partenaireLocalId` INT, IN `observations` TEXT, IN `creationUserId` INT) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN
	INSERT INTO `prestataires`(
		`id`,
		`type`,
		`categorie`,
		`localisation`,
		`nom`,
		`sigle`,
		`telephone`,
		`email`,
		`adresse`,
		`localiteId`,
		`partenaireLocalId`,
		`observations`,
		`creationDate`,
		`creationUserId`,
		`modifDate`,
		`modifUserId`)
		VALUES
		(
			null,
			type,
			categorie,
			localisation,
			nom,
			sigle,
			telephone,
			email,
			adresse,
			localiteId,
			partenaireLocalId,
			observations,
			CURRENT_TIMESTAMP,
			creationUserId,
			CURRENT_TIMESTAMP,
			creationUserId
		);
END$$

DELIMITER ;



USE `suiviprojetpublic`;
DROP procedure IF EXISTS `prestataires_update`;

DELIMITER $$

CREATE  PROCEDURE `prestataires_update`(IN `id` INT, IN `type` VARCHAR(20), IN `categorie` VARCHAR(20), IN `localisation` VARCHAR(20), IN `nom` VARCHAR(45), IN `sigle` VARCHAR(10), IN `telephone` VARCHAR(16), IN `email` VARCHAR(45), IN `adresse` VARCHAR(45), IN `localiteId` INT, IN `partenaireLocalId` INT, IN `observations` TEXT, IN `modifDate` DATETIME, IN `modifUserId` INT) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN
	UPDATE `prestataires`
	SET
		`type`= type,
		`categorie`= categorie,
		`localisation`= localisation,
		`nom`= nom,
		`sigle`= sigle,
		`telephone`= telephone,
		`email`= email,
		`adresse`= adresse,
		`localiteId`= localiteId,
		`partenaireLocalId`= partenaireLocalId,
		`observations`= observations,
		`modifDate`= CURRENT_TIMESTAMP,
		`modifUserId`= modifUserId
		WHERE `prestataires`.`id` = id 
 		AND `modifDate` = modifDate;
END$$

DELIMITER ;







