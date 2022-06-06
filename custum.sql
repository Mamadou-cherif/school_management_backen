USE `suiviprojetpublic`;
DROP procedure IF EXISTS `financement_selectBy`;

DELIMITER $$
CREATE  PROCEDURE `financement_selectBy`(IN `id` INT, IN `projetId` INT, IN `structureId` INT, IN `type` VARCHAR(20), IN `typeAppui` TEXT, IN `taux` INT, IN `observations` TEXT, IN `estActif` TINYINT, IN `creationDate` DATETIME, IN `creationUserId` INT, IN `modifDate` DATETIME, IN `modifUserId` INT, IN `debutDonnees` INT, IN `finDonnees` INT)  BEGIN
	DECLARE requeteSql varchar(500);
	SET @requeteSql := 'SELECT\r\n\t\t`financement`.`id`,\r\n\t\t`financement`.`projetId`,\r\n        `projets`.`titre` as projet,\r\n        `projets`.`code` as codeProjet,\r\n        `structures`.`nom` as structure,\r\n  `structures`.`telephone1` as telephone,\r\n\t\t`financement`.`structureId`,\r\n\t\t`financement`.`type`,\r\n        `priorites`.`code` as priorite,\r\n        `statutprojets`.`code` as statutProjet,\r\n\t\t`financement`.`typeAppui`,\r\n\t\t`financement`.`taux`,\r\n\t\t`financement`.`observations` \r\n\t\tFROM `financement`\r\n        INNER JOIN `projets` ON `financement`.`projetId`=`projets`.`id`
	\r\nINNER JOIN `structures` ON `financement`.`structureId`=`structures`.`id`
    INNER JOIN `priorites` ON `projets`.`prioriteId` =  `priorites`.`id`\r\n        
	INNER JOIN `statutprojets` ON `projets`.`statutId` =  `statutprojets`.`id`
    \r\n\t\tWHERE 1';
		IF id IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`id` = ',id);
		END IF;
		IF projetId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`projetId` = ',projetId);
		END IF;
		IF structureId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`structureId` = ',structureId);
		END IF;
		IF type IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`type` = "',type,'"');
		END IF;
		IF typeAppui IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`typeAppui` = "',typeAppui,'"');
		END IF;
		IF taux IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`taux` = ',taux);
		END IF;
		IF observations IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`observations` = "',observations,'"');
		END IF;
		IF estActif IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`estActif` = ',estActif);
		END IF;
		IF creationDate IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`creationDate` = "',creationDate,'"');
		END IF;
		IF creationUserId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`creationUserId` = ',creationUserId);
		END IF;
		IF modifDate IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`modifDate` = "',modifDate,'"');
		END IF;
		IF modifUserId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `financement`.`modifUserId` = ',modifUserId);
		END IF;
		IF debutDonnees IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ', debutDonnees, ',', finDonnees);
		END IF;

		PREPARE statement FROM @requeteSql;
		EXECUTE statement;
		DEALLOCATE PREPARE statement;

END$$

DELIMITER ;



