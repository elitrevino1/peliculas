CREATE TABLE Director ( 
	DirectorID int NOT NULL AUTO_INCREMENT, 
	Nombre varchar(70) NOT NULL, 
	PRIMARY KEY (DirectorID)
);

CREATE TABLE Categoria (
	CategoriaID int NOT NULL AUTO_INCREMENT, 
	Descripcion varchar(25) NOT NULL,
	PRIMARY KEY (CategoriaID)
);

CREATE TABLE Pelicula (
	PeliculaID int NOT NULL AUTO_INCREMENT, 
	Nombre varchar(100) NOT NULL,
    Duracion int NOT NULL,
	CategoriaID int NOT NULL,
	DirectorID int NOT NULL,
	PRIMARY KEY (PeliculaID),
	FOREIGN KEY (CategoriaID) REFERENCES Categoria(CategoriaID),
	FOREIGN KEY (DirectorID) REFERENCES Director(DirectorID)
);

CREATE TABLE Actor (
	ActorID int NOT NULL AUTO_INCREMENT, 
	Nombre varchar(75) NOT NULL,
	PRIMARY KEY (ActorID)
);

CREATE TABLE PeliculaActor (
	PeliculaID int NOT NULL,
	ActorID int NOT NULL,
	PRIMARY KEY (PeliculaID, ActorID),
	FOREIGN KEY (PeliculaID) REFERENCES Pelicula(PeliculaID),
	FOREIGN KEY (ActorID) REFERENCES Actor(ActorID)
);

INSERT INTO Director VALUES
(1, 'Quentin Tarantino'),
(2, 'Martin Scorsese'),
(3, 'Nora Ephron'),
(4, 'Sofia Coppola'),
(5, 'Guillermo del Toro'),
(6, 'Kenny Ortega'),
(7, 'Greta Gerwig'),
(8, 'Regina King');

INSERT INTO Categoria VALUES
(1, 'Terror'),
(2, 'Amor'),
(3, 'Acción');

INSERT INTO Pelicula VALUES
(1, 'El Conjuro', 120, 1, 3),
(2, 'Mean Girls', 130, 2, 8),
(3, '10 Things I Hate About You', 140, 2, 4),
(4, 'Shrek', 124, 3, 1),
(5, 'High School Musical', 122, 2, 6),
(6, 'El Conjuro 2', 143, 1, 7),
(7, 'Harry Potter', 135, 3, 6);

INSERT INTO Actor VALUES
(1, 'Andy Samberg'),
(2, 'Melissa Fumero'),
(3, 'Rachel McAdams'),
(4, 'Colin Jost'),
(5, 'Eugenio Derbez'),
(6, 'Gal Gadot');

INSERT INTO PeliculaActor VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 6),
(4, 5),
(5, 1),
(6, 1),
(6, 2),
(7, 1);

SELECT * FROM Pelicula;

SELECT * FROM Director; 

SELECT * FROM PeliculaActor; 

SELECT * FROM Actor; 

DELETE FROM Actor WHERE ActorID = 12;


