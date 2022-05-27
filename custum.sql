DROP PROCEDURE `prestataires_selectById`;
CREATE DEFINER=`root`@`localhost` PROCEDURE `prestataires_selectById`(IN `id` INT) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN
	SELECT
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
         `communes`.`id` as communeId,
         `prefectures`.`id` as prefectureId,
          `regions`.`id` as regionId,
          `regions`.`paysId` as paysId,
		`prestataires`.`partenaireLocalId`,
		`prestataires`.`observations`,
		`prestataires`.`estActif`,
		`prestataires`.`creationDate`,
		`prestataires`.`creationUserId`,
		`prestataires`.`modifDate`,
		`prestataires`.`modifUserId`
	FROM `prestataires`
    INNER JOIN `quartierdistricts` ON `prestataires`.`localiteId`=`quartierdistricts`.`id`
    INNER JOIN `communes` ON `quartierdistricts`.`communeId`=`communes`.`id`
    INNER JOIN `prefectures` ON `communes`.`prefectureId`=`prefectures`.`id`
     INNER JOIN `regions` ON `prefectures`.`regionId`=`regions`.`id`
      INNER JOIN `payss` ON `regions`.`paysId`=`payss`.`id`
	WHERE `prestataires`.`id` = id;
END