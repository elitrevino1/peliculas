SELECT Pelicula.Nombre, Duracion, Descripcion, Director.Nombre, Actor.Nombre
FROM Pelicula
INNER JOIN PeliculaActor ON Pelicula.PeliculaID = PeliculaActor.PeliculaID
INNER JOIN Actor ON PeliculaActor.ActorID = Actor.ActorID
INNER JOIN Categoria ON Categoria.CategoriaID = Pelicula.CategoriaID
INNER JOIN Director ON Director.DirectorID = Pelicula.DirectorID

SELECT Pelicula.Nombre, Duracion, Descripcion, Director.Nombre, Actor.Nombre
FROM Pelicula
INNER JOIN PeliculaActor ON Pelicula.PeliculaID = PeliculaActor.PeliculaID
INNER JOIN Actor ON PeliculaActor.ActorID = Actor.ActorID
INNER JOIN Categoria ON Categoria.CategoriaID = Pelicula.CategoriaID
INNER JOIN Director ON Director.DirectorID = Pelicula.DirectorID
WHERE Pelicula.Nombre LIKE '%{consulta}%' OR Director.Nombre LIKE '%{consulta}%'

SELECT Pelicula.Nombre, Duracion, Descripcion, Director.Nombre, Actor.Nombre
FROM Pelicula
INNER JOIN PeliculaActor ON Pelicula.PeliculaID = PeliculaActor.PeliculaID
INNER JOIN Actor ON PeliculaActor.ActorID = Actor.ActorID
INNER JOIN Categoria ON Categoria.CategoriaID = Pelicula.CategoriaID
INNER JOIN Director ON Director.DirectorID = Pelicula.DirectorID
WHERE Pelicula.CategoriaID = {consulta}

INSERT INTO Director(Nombre) VALUES
({nombre})

INSERT INTO Pelicula(Nombre, Duracion, CategoriaID, DirectorID) VALUES
({nombre}, {duracion}, {categoriaID}, {directorID})

INSERT INTO Actor(Nombre) VALUES
({nombre})

INSERT INTO PeliculaActor(PeliculaID, ActorID) VALUES
({peliculaID}, {actorID})

UPDATE Pelicula
SET Nombre = {nombre}, Duracion = {duracion}, CategoriaID = {categoriaID}, DirectorID = {directorID}
WHERE PeliculaID = {peliculaID}

UPDATE Director
SET Nombre = {nombre}
WHERE DirectorID = {directorID}

UPDATE PeliculaActor
SET ActorID = {actorID}
WHERE PeliculaID = {peliculaID}

DELETE FROM PeliculaActor
WHERE PeliculaID = {peliculaID}

DELETE FROM Pelicula
WHERE PeliculaID = {peliculaID}