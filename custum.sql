ALTER TABLE `prestataires` CHANGE `telephone` `telephone` VARCHAR(16) NOT NULL; 

CREATE  PROCEDURE `prestataires_insert`(IN `type` VARCHAR(20), IN `categorie` VARCHAR(20), IN `localisation` VARCHAR(20), IN `nom` VARCHAR(45), IN `sigle` VARCHAR(10), IN `telephone` VARCHAR(16), IN `email` VARCHAR(45), IN `adresse` VARCHAR(45), IN `localiteId` INT, IN `partenaireLocalId` INT, IN `observations` TEXT, IN `creationUserId` INT) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN
	INSERT INTO `suiviprojetpublic`.`prestataires`(
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
END


DROP PROCEDURE IF EXISTS `prestataires_update`;
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
END


DROP PROCEDURE IF EXISTS `prestataires_selectBy`;
CREATE  PROCEDURE `prestataires_selectBy`(IN `id` INT, IN `type` VARCHAR(20), IN `categorie` VARCHAR(20), IN `localisation` VARCHAR(20), IN `nom` VARCHAR(45), IN `sigle` VARCHAR(10), IN `telephone` VARCHAR(16), IN `email` VARCHAR(45), IN `adresse` VARCHAR(45), IN `localiteId` INT, IN `partenaireLocalId` INT, IN `observations` TEXT, IN `estActif` TINYINT, IN `creationDate` DATETIME, IN `creationUserId` INT, IN `modifDate` DATETIME, IN `modifUserId` INT, IN `debutDonnees` INT, IN `finDonnees` INT) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN
	DECLARE requeteSql varchar(500);
	SET @requeteSql := 'SELECT\r\n\t\t`prestataires`.`id`,\r\n\t\t`prestataires`.`type`,\r\n\t\t`prestataires`.`categorie`,\r\n\t\t`prestataires`.`localisation`,\r\n\t\t`prestataires`.`nom`,\r\n\t\t`prestataires`.`sigle`,\r\n\t\t`prestataires`.`telephone`,\r\n\t\t`prestataires`.`email`,\r\n\t\t`prestataires`.`adresse`,\r\n\t\t`prestataires`.`localiteId`,\r\n\t\t`prestataires`.`partenaireLocalId`,\r\n\t\t`prestataires`.`observations`,\r\n\t\t`prestataires`.`estActif`,\r\n\t\t`prestataires`.`creationDate`,\r\n\t\t`prestataires`.`creationUserId`,\r\n\t\t`prestataires`.`modifDate`,\r\n\t\t`prestataires`.`modifUserId`\r\n\t\tFROM `prestataires`\r\n\t\tWHERE 1';
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

END


ALTER TABLE `prestataires` CHANGE `adresse` `adresse` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL; 