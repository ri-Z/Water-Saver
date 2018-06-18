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
    
    
#let sql = 'INSERT INTO User(Admin, Name, Birth, Email, Password) VALUES (?, ?, ?, ?, ?);'; let values = [request.body.admin, request.body.name, request.body.age, request.body.email, hash];
#SELECT * FROM User
#DELETE FROM `User` WHERE `User`.`idUser` = 3 (for example)

#SELECT LAST_INSERT_ID() as user_id
#SELECT idUser, Password FROM User WHERE Name = ?',[username]

#var data = [
      #req.body.title,
      #req.body.description,
      #req.body.floor,
      #req.body.room
    #];
#db.query("INSERT INTO Post(Title, Description, Floor, Room) VALUES (?, ?, ?, ?);" , data
#SELECT LAST_INSERT_ID() as post_id

#Select * From Post Order by idPost DESC;

ALTER TABLE User CHANGE Birth Birth INT NOT NULL;

ALTER TABLE Post ADD Status BOOLEAN NOT NULL AFTER Room;

ALTER TABLE Media ADD idMedia INT NOT NULL AUTO_INCREMENT FIRST,  ADD CONSTRAINT Media_PK PRIMARY KEY (idMedia);
ALTER TABLE Post ADD idMediaFK INT;
ALTER TABLE Post ADD CONSTRAINT Media_FK FOREIGN KEY (idMediaFK) REFERENCES Media (idMedia);
ALTER TABLE Post DROP COLUMN Media;

#Select session_id From sessions;
#db.query('SELECT idUser, Password FROM User WHERE Name = ?',[username]
#Select * From Media m JOIN Post p ON (m.idPostFK = p.idPost) Group by idPostFK Order by idMedia DESC;
#db.query("Select * From Post p JOIN Media m ON (p.idPost = m.idPostFK) WHERE idPost = ?;", [request.params.id]
#db.query("INSERT INTO Media(idPostFK, Media) VALUES (?, ?);", [rows.insertId, req.files[i].path]