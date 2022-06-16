BEGIN
	DECLARE requeteSql varchar(500);
	SET @requeteSql := 'SELECT\r\n\t\t`interventions`.`id`,\r\n\t\t`interventions`.`prestataireId`,\r\n  
          `prestataires`.`nom` as prestataire,\r\n  `prestataires`.`type`,\r\n    
         `prestataires`.`categorie`,\r\n  `prestataires`.`telephone`,\r\n      
        `projets`.`titre` as projet,\r\n   `statutprojets`.`code` as statutProjet,\r\n\t\t`interventions`.`projetId`,\r\n\t 
         `priorites`.`code` as priorite,\r\n\t\t`interventions`.`categorie`,\r\n\t\t`interventions`.`observations`\r\n\t\tFROM `interventions`\r\n    
        INNER JOIN `prestataires` ON `interventions`.`prestataireId`=`prestataires`.`id`\r\n     
        INNER JOIN `projets` ON `interventions`.`projetId`=`projets`.`id`\r\n    
        INNER JOIN `priorites` ON `projets`.`prioriteId` =  `priorites`.`id`\r\n     
        INNER JOIN `statutprojets` ON `projets`.`statutId` =  `statutprojets`.`id`\r\n\t\tWHERE 1';
		IF id IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `interventions`.`id` = ',id);
		END IF;
		IF prestataireId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `interventions`.`prestataireId` = ',prestataireId);
		END IF;
		IF projetId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `interventions`.`projetId` = ',projetId);
		END IF;
		IF categorie IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `interventions`.`categorie` = "',categorie,'"');
		END IF;
		IF observations IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `interventions`.`observations` = "',observations,'"');
		END IF;
		IF estActif IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `interventions`.`estActif` = ',estActif);
		END IF;
		IF creationDate IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `interventions`.`creationDate` = "',creationDate,'"');
		END IF;
		IF creationUserId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `interventions`.`creationUserId` = ',creationUserId);
		END IF;
		IF modifDate IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `interventions`.`modifDate` = "',modifDate,'"');
		END IF;
		IF modifUserId IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' AND `interventions`.`modifUserId` = ',modifUserId);
		END IF;
		IF debutDonnees IS NOT NULL THEN
			SET @requeteSql := CONCAT(@requeteSql, ' LIMIT ', debutDonnees, ',', finDonnees);
		END IF;
		PREPARE statement FROM @requeteSql;
		EXECUTE statement;
		DEALLOCATE PREPARE statement;

END