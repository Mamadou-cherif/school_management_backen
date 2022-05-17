-- celui code permet de modifier le champ id en auto-increment
ALTER TABLE `suiviprojetpublic`.`categorieactions` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;

UPDATE `suiviprojetpublic`.`menus` SET `url` = 'listeCategorieInvest' WHERE (`id` = '41');

ALTER TABLE `suiviprojetpublic`.`categorieinvestissements` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `devises` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;