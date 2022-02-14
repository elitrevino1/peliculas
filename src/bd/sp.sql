DELIMITER //
CREATE PROCEDURE addPelicula
(IN in_nombre VARCHAR(100), IN in_duracion INT, IN in_categoria INT, IN in_director VARCHAR(70))
BEGIN
	DECLARE d_id INT;
    
	SELECT DirectorID 
	FROM Director
	WHERE Nombre = in_director
    INTO d_id;
    
    IF (d_id != NULL)
    THEN 
		INSERT INTO Pelicula(Nombre, Duracion, CategoriaID, DirectorID) 
		VALUES (in_nombre, in_duracion, in_categoria, d_id);
    ELSE 
		INSERT INTO Director(Nombre) 
		VALUES (in_director);
        
        INSERT INTO Pelicula(Nombre, Duracion, CategoriaID, DirectorID) 
		VALUES (in_nombre, in_duracion, in_categoria, (SELECT MAX(DirectorID) FROM Director));
    END IF;
    
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE editActores
(IN in_pID INT, IN in_actor VARCHAR(75))
BEGIN
	DECLARE a_id INT;
    
	SELECT ActorID 
	FROM Actor
	WHERE Nombre = in_actor
    INTO a_id;
    
    IF (a_id != NULL)
    THEN 
		INSERT INTO PeliculaActor(PeliculaID, ActorID) 
		VALUES (in_pID, a_id);
    ELSE 
		INSERT INTO Actor(Nombre) 
		VALUES (in_actor);
        
        INSERT INTO PeliculaActor(PeliculaID, ActorID) 
		VALUES (in_pID, (SELECT MAX(ActorID) FROM Actor));
    END IF;
    
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE editPelicula
(IN in_nombre VARCHAR(100), IN in_duracion INT, IN in_categoria INT, IN in_director VARCHAR(70), IN in_pID INT)
BEGIN

	DECLARE d_id INT;
    
	SELECT DirectorID 
	FROM Director
	WHERE Nombre = in_director
    INTO d_id;
    
    IF (d_id != NULL)
    THEN 
		UPDATE Pelicula 
        SET Nombre = in_nombre, Duracion = in_duracion, CategoriaID = in_categoria, DirectorID = d_id 
        WHERE PeliculaID = in_pID;
	ELSE
		INSERT INTO Director(Nombre) 
		VALUES (in_director);
		
        UPDATE Pelicula 
        SET Nombre = in_nombre, Duracion = in_duracion, CategoriaID = in_categoria, DirectorID = (SELECT MAX(DirectorID) FROM Director) 
        WHERE PeliculaID = in_pID;
	END IF;
	
    
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE resetActores
(IN in_pID INT)
BEGIN

	DELETE FROM PeliculaActor
	WHERE PeliculaID = in_pID;
    
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE deletePelicula
(IN in_pID INT)
BEGIN

	DELETE FROM PeliculaActor
	WHERE PeliculaID = in_pID;
    
    DELETE FROM Pelicula
	WHERE PeliculaID = in_pID;
    
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE addActores
(IN in_actor VARCHAR(75))
BEGIN
	DECLARE a_id INT;
    
	SELECT ActorID 
	FROM Actor
	WHERE Nombre = in_actor
    INTO a_id;
    
    IF (a_id != NULL)
    THEN 
		INSERT INTO PeliculaActor(PeliculaID, ActorID) 
		VALUES ((SELECT MAX(PeliculaID) FROM Pelicula), a_id);
    ELSE 
		INSERT INTO Actor(Nombre) 
		VALUES (in_actor);
        
        INSERT INTO PeliculaActor(PeliculaID, ActorID) 
		VALUES ((SELECT MAX(PeliculaID) FROM Pelicula), (SELECT MAX(ActorID) FROM Actor));
    END IF;
    
END //
DELIMITER ;