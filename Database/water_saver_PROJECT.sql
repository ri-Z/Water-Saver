create database WaterSaver;
use WaterSaver;

create TABLE User (
idUser INT NOT NULL AUTO_INCREMENT,
Admin BOOLEAN NOT NULL,
Name VARCHAR(60) NOT NULL,
Birth DATE NOT NULL,
Email VARCHAR(60) NOT NULL,
Password TINYTEXT NOT NULL,
CONSTRAINT User_PK PRIMARY KEY (idUser));

CREATE TABLE Post (
    idPost INT NOT NULL AUTO_INCREMENT,
    idUserFK INT,
    Title VARCHAR(60) NOT NULL,
    Description TINYTEXT NOT NULL,
    Floor INT NOT NULL,
    Room TINYTEXT NOT NULL,
    Status BOOLEAN NOT NULL,
    Media varchar(255) NOT NULL,
CONSTRAINT Post_PK PRIMARY KEY (idPost));

CREATE TABLE Place (
    idPlace INT NOT NULL AUTO_INCREMENT,
    idUserFK INT,
    Name VARCHAR(60) NOT NULL,
    Email VARCHAR(60) NOT NULL,
    Contact INT NOT NULL,
    Address TINYTEXT NOT NULL,
    Website varchar(255) NOT NULL,
    ProfilePicture varchar(255) NOT NULL,
CONSTRAINT Place_PK PRIMARY KEY (idPlace));

 create TABLE Media (
	idMedia INT NOT NULL AUTO_INCREMENT,
	idUserFK INT,
	idPostFK INT,
	Media varchar(255) NOT NULL);
    
create TABLE PlacesUsers (
	idUserFK INT NOT NULL,
	idPlaceFK INT NOT NULL);

ALTER TABLE Post ADD CONSTRAINT User_FK FOREIGN KEY (idUserFK) REFERENCES User (idUser);
    
ALTER TABLE Place ADD CONSTRAINT User_FK FOREIGN KEY (idUserFK) REFERENCES User (idUser),
								  ADD CONSTRAINT Post_FK FOREIGN KEY (idPostFK) REFERENCES Post (idPost);

ALTER TABLE Media ADD CONSTRAINT User_FK FOREIGN KEY (idUserFK) REFERENCES User (idUser),
								   ADD CONSTRAINT Post_FK FOREIGN KEY (idPostFK) REFERENCES Post (idPost);
                                             
ALTER TABLE PlacesUsers ADD CONSTRAINT User_FK FOREIGN KEY (idUserFK) REFERENCES User (idUser),
											 ADD CONSTRAINT Place_FK FOREIGN KEY (idPlaceFK) REFERENCES Place (idPlace);
    
    
#INSERT INTO User(Admin, Name, Birth, Email, Password) VALUES (1, Jorge, 20, email@email.com, pass)
#SELECT * FROM User
#DELETE FROM `User` WHERE `User`.`idUser` = 3

#SELECT LAST_INSERT_ID() as user_id
#SELECT idUser, Password FROM User WHERE Name = Jorge

#INSERT INTO Post(Title, Description, Floor, Room) VALUES (Titulo, Descricao, 6, 64);
#SELECT LAST_INSERT_ID() as post_id

#Select * From Post Order by idPost DESC;

ALTER TABLE User CHANGE Birth Birth INT NOT NULL;

ALTER TABLE Post ADD Status BOOLEAN NOT NULL AFTER Room;

ALTER TABLE Media ADD idMedia INT NOT NULL AUTO_INCREMENT FIRST,  ADD CONSTRAINT Media_PK PRIMARY KEY (idMedia);
ALTER TABLE Post ADD idMediaFK INT;
ALTER TABLE Post ADD CONSTRAINT Media_FK FOREIGN KEY (idMediaFK) REFERENCES Media (idMedia);
ALTER TABLE Post DROP COLUMN Media;

#Select session_id From sessions;
#SELECT idUser, Password FROM User WHERE Name = Jorge
#Select * From Media m JOIN Post p ON (m.idPostFK = p.idPost) Group by idPostFK Order by Status, idPost DESC;
#Select * From Post p JOIN Media m ON (p.idPost = m.idPostFK) WHERE idPost = 1;
#DELETE FROM Media WHERE idMedia = 49;
#DELETE FROM Media m JOIN Post p ON (p.idPost = m.idPostFK) WHERE idPost = 1
#UPDATE Post SET Status = 1 WHERE idPost = 1

#INSERT INTO Media(idPostFK, Media) VALUES (?, ?);", [rows.insertId, web/uploads/file-1529345736055.jpg] - this query is used after INSERT INTO Post(Title, Description, Floor, Room, Status), so it inserts the id of the Post that has been inserted to the DB, so it should be the latest idPost created
